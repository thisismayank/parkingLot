'use strict';
const _ = require('underscore');

module.exports = function(Parkingdetails) {

    Parkingdetails.park = function (slotNumber, floorNumber, floorDetailId, carDetailId, appUserId, callback) {
        const promise = new Promise(function (resolve, reject) {

          Parkingdetails.create({
            slotNumber: slotNumber,
            floorNumber: floorNumber,
            floorDetailsId: floorDetailId,
            appUserId: appUserId,
            carDetailId: carDetailId,
            isActive: true
          })
            .then(function (parkingData) {
              // console.log('here');
              if(!parkingData) {
                  return resolve({success: false, message: 'Error while issuing parking ticket'});
              }
              return resolve({ success: true, message: null, data: parkingData });
            })
            .catch(function (err) {
              return reject(err);
            });
        });
    
        if (callback !== null && typeof callback === 'function') {
          promise.then(function (data) { return callback(null, data); }).catch(function (err) { return callback(err); });
        } else {
          return promise;
        }
      };

      Parkingdetails.unpark = function (carDetailId, appUserId, callback) {
        const promise = new Promise(function (resolve, reject) {
          let parkingInformation, details;
          Parkingdetails.findOne({
            where: {
              carDetailId: carDetailId,
              appUserId: appUserId,
              isActive: true
            }
          })
            .then(function (parkingData) {
              // console.log('parkingData', parkingData);
              
              parkingInformation = parkingData;
              if(!parkingData) {
                  return resolve({success: false, message: 'This car is not parked'});
              }
              return Parkingdetails.app.models.floorDetails.removeCar(parkingData.floorNumber);
            })
            .then(function(floorInformation) {
              // console.log('floorInfo',floorInformation.data);
              details = {
                slotNumber: parkingInformation.slotNumber,
                floorNumber: parkingInformation.floorNumber
              }
              parkingInformation.isActive = false;
              // console.log('parkingInformation', parkingInformation);
              
              return parkingInformation.save();
            })
            .then(function(data) {
              // console.log('details', details);
              return resolve({ success: true, message: 'Car unparked successfully', data: details });

            })
            .catch(function (err) {
              return reject(err);
            });
        });
    
        if (callback !== null && typeof callback === 'function') {
          promise.then(function (data) { return callback(null, data); }).catch(function (err) { return callback(err); });
        } else {
          return promise;
        }
      };
    
      Parkingdetails.fetchCars = function (appUserId, callback) {
        const promise = new Promise(function (resolve, reject) {
          let parkingInformation;
          Parkingdetails.find({
            where: {
              appUserId: appUserId,
              isActive: true
            },
            include: [{
              relation: 'carDetails'
            }]
          })
            .then(function (parkingData) {
              parkingInformation = parkingData;
              if(!parkingData) {
                  return resolve({success: false, message: 'This car is not parked'});
              }
              let parkedCars = _.map(parkingInformation, (cars)=>{
                let tempObj = {
                  slotNumber: cars.slotNumber,
                  floorNumber: cars.floorNumber,
                  carRegistrationNumber: cars.carDetails() ? cars.carDetails().registrationNo : null,
                  carColor: cars.carDetails() ? cars.carDetails().color: null,
                  carModel: cars.carDetails() ? cars.carDetails().modelOfCar: null
                };
                return tempObj;
              })
              return resolve({success: true, message: 'done', data: parkedCars, total: parkedCars.length});
            })
            .catch(function (err) {
              return reject(err);
            });
        });
    
        if (callback !== null && typeof callback === 'function') {
          promise.then(function (data) { return callback(null, data); }).catch(function (err) { return callback(err); });
        } else {
          return promise;
        }
      };
      Parkingdetails.remoteMethod('fetchCars', {
        accepts: [
          {
            arg: 'appUserId',
            type: 'string',
            required: true,
            http: {
              source: 'query'
            }
          }
        ],
        returns: {
          arg: 'data',
          type: 'object',
          root: true
        },
        http: {
          path: '/fetchcars',
          verb: 'POST'
        },
        description: 'API to fetch cars of a user'
      });
};