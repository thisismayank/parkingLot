'use strict';
// const parkingDetails = require('./parking-details');
module.exports = function(Floordetails) {

    Floordetails.check = function (appUserId, carDetailId, callback) {
        const promise = new Promise(function (resolve, reject) {
          let floorDetails, parkingInformation;
          Floordetails.findOne({
            where: {
              hasFreeSlots: true
            }
          })
            .then(function (floorData) {
              floorDetails = floorData;
              if(!floorData) {
                  return resolve({success: false, message: 'All the parking slots are full'});
              }
              // console.log('floorData', JSON.stringify(floorData, null, 2));
              let slotNumber = floorData.numberOfFilledSlots + 1;
              // console.log(floorData.floorNumber);
              return Floordetails.app.models.parkingDetails.park(slotNumber, floorData.floorNumber, floorData.id, carDetailId, appUserId );
            })
            .then((parkingDetails)=>{
              parkingInformation = parkingDetails;
              if(!parkingDetails) {
                return resolve({success: false, message: 'Some error occured during parking'});
              } else if (parkingDetails.success === false) {
                return resolve({success: false, message: 'Some error occured', data: parkingDetails});
              }
              if(parkingDetails.data) {
                floorDetails.numberOfFilledSlots = floorDetails.numberOfFilledSlots + 1;
                if(floorDetails.numberOfFilledSlots === floorDetails.maxSlots) {
                 floorDetails.hasFreeSlots = false; 
                }
                return floorDetails.save();
              }
              // console.log('parking details', parkingDetails);
            })
            .then((floorData) => {
              return resolve({success: true, message: 'Done', data: parkingInformation.data});
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

      Floordetails.removeCar = function (floorNumber, callback) {
        const promise = new Promise(function (resolve, reject) {
          let floorDetails, parkingInformation;
          Floordetails.findOne({
            where: {
              floorNumber: floorNumber
            }
          })
            .then(function (floorData) {
              // console.log('floorData', floorData);
              floorDetails = floorData;
              if(!floorData.hasFreeSlots) {
                floorData.hasFreeSlots = true;
              }
              floorData.numberOfFilledSlots = floorData.numberOfFilledSlots - 1;

              return floorData.save();
            })
            .then((data)=>{
              return resolve({success: true, message: 'Floor table updated successfully', data: floorDetails});
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
    
      Floordetails.remoteMethod('login', {
        accepts: [
          {
            arg: 'userCode',
            type: 'string',
            required: true,
            http: {
              source: 'form'
            }
          },
          {
            arg: 'password',
            type: 'string',
            required: true,
            http: {
              source: 'form'
            }
          }
        ],
        returns: {
          arg: 'data',
          type: 'object',
          root: true
        },
        http: {
          path: '/login',
          verb: 'POST'
        },
        description: 'API to login'
      });

      Floordetails.check = function (appUserId, carDetailId, callback) {
        const promise = new Promise(function (resolve, reject) {
          let floorDetails, parkingInformation;
          Floordetails.findOne({
            where: {
              hasFreeSlots: true
            }
          })
            .then(function (floorData) {
              floorDetails = floorData;
              if(!floorData) {
                  return resolve({success: false, message: 'All the parking slots are full'});
              }
              // console.log('floorData', JSON.stringify(floorData, null, 2));
              let slotNumber = floorData.numberOfFilledSlots + 1;
              // console.log(floorData.floorNumber);
              return Floordetails.app.models.parkingDetails.park(slotNumber, floorData.floorNumber, floorData.id, carDetailId, appUserId );
            })
            .then((parkingDetails)=>{
              parkingInformation = parkingDetails;
              if(!parkingDetails) {
                return resolve({success: false, message: 'Some error occured during parking'});
              } else if (parkingDetails.success === false) {
                return resolve({success: false, message: 'Some error occured', data: parkingDetails});
              }
              if(parkingDetails.data) {
                floorDetails.numberOfFilledSlots = floorDetails.numberOfFilledSlots + 1;
                if(floorDetails.numberOfFilledSlots === floorDetails.maxSlots) {
                 floorDetails.hasFreeSlots = false; 
                }
                return floorDetails.save();
              }
              // console.log('parking details', parkingDetails);
            })
            .then((floorData) => {
              return resolve({success: true, message: 'Done', data: parkingInformation.data});
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

      Floordetails.stateOfParkingSpace = function (callback) {
        const promise = new Promise(function (resolve, reject) {
          Floordetails.find()
            .then(function (floorData) {
              if(!floorData) {
                return resolve({success: false, message: 'Please contact the Root User'});
              }

              return resolve({success: true, message: 'Done', data: floorData, total: floorData.length});
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
    
      Floordetails.remoteMethod('stateOfParkingSpace', {
        accepts: [],
        returns: {
          arg: 'data',
          type: 'object',
          root: true
        },
        http: {
          path: '/stateofparkingspace',
          verb: 'GET'
        },
        description: 'API to login'
      });
};
