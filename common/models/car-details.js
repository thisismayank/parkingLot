'use strict';
const _ = require('underscore');
const authUtils = require('../../server/utils/122-auth-utils');

module.exports = function(Cardetails) {

    Cardetails.registerCar = function (registrationNumber, color, makeOfCar, modelOfCar, token, callback) {
        const promise = new Promise(function (resolve, reject) {

          // check for Authorization
          let authData = authUtils.verifyToken(token).data;
          if(!authUtils.isCustomer(authData)) {
            return resolve({success: false, message: 'Unauthorized to access', data: 401})
          }

          let appUserId = authData.id;

          let carInformation, parkingInformation;
          color = color.toLowerCase();
          Cardetails.findOne({
            where: {
              registrationNumber: registrationNumber,
              isActive: true
            }
          })
            .then(function (carDetails) {
              if(carDetails) {
                  return resolve({success: false, message: 'car is already parked'});
              }
              return Cardetails.create({
                registrationNumber: registrationNumber,
                color: color,
                modelOfCar: modelOfCar,
                makeOfCar: makeOfCar,
                isActive: true,
                parkingDetailsId: null,
                parkingTime: new Date()
            });
            })
            .then(function(carDetails){
              carInformation = carDetails;
              // console.log('carDetails', JSON.stringify(carDetails, null, 2));

              return Cardetails.app.models.floorDetails.check(appUserId, carDetails.id);
            })
            .then(function (carDetails) {
              if(!carDetails) {
                return resolve({sucess: true, message: 'Some error occured'});
              } else if(carDetails.success === false) {
                return resolve({success: false, message: 'Some error occured', data: carDetails});
              }
              // console.log('above save', carDetails);
              parkingInformation = carDetails.data;
              carInformation.parkingDetailsId = carDetails.data.id;
              return carInformation.save();
            })
            .then((data)=>{
              if(!data) {
                return resolve({success: false, message: 'Some error occured in saving parking info in car details table'});
              }
              let ticketDetails = {
                registrationNumber: data.registrationNumber,
                color: data.color,
                modelOfCar: data.modelOfCar,
                makeOfCar: data.makeOfCar,
                slotNumber: parkingInformation.slotNumber,
                floorNumber: parkingInformation.floorNumber,
                parkingTime: data.parkingTime
              }
              return resolve({success: true, message: 'Car successfully parked', data: ticketDetails});
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
    
      Cardetails.remoteMethod('registerCar', {
        accepts: [
          {
            arg: 'registrationNumber',
            type: 'string',
            required: true,
            http: {
              source: 'form'
            }
          },
          {
            arg: 'color',
            type: 'string',
            required: true,
            http: {
              source: 'form'
            }
          },
          {
            arg: 'makeOfCar',
            type: 'string',
            required: true,
            http: {
              source: 'form'
            }
          },
          {
            arg: 'modelOfCar',
            type: 'string',
            required: true,
            http: {
              source: 'form'
            }
          },
          {
            arg: 'token',
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
          path: '/registercar',
          verb: 'POST'
        },
        description: 'API to register car details'
      });


      Cardetails.unparkCar = function (registrationNumber, token, callback) {
        const promise = new Promise(function (resolve, reject) {

          // check for Authorization
          let authData = authUtils.verifyToken(token).data;
          if(!authUtils.isCustomer(authData)) {
            return resolve({success: false, message: 'Unauthorized to access', data: 401})
          }

          let appUserId = authData.id;

          let carInformation, parkingInformation;
          Cardetails.findOne({
            where: {
              registrationNumber: registrationNumber,
              isActive: true
            }
          })
            .then(function (carDetails) {
              // console.log(carDetails);
              // carInformation = carDetails;
              carInformation = carDetails;
              return Cardetails.app.models.parkingDetails.unpark(carDetails.id, appUserId);
            })
            .then(function (parkingData) {
              // console.log('parkingData in CarDetails', parkingData.data);
              parkingInformation = parkingData.data;
              if(parkingData.success === true) {
                  carInformation.isActive = false;
                  carInformation.unparkingTime = new Date();
                  // console.log('carInformation', carInformation);
                  return carInformation.save();
                  }
                })
                .then(carData=>{
                  // console.log('car data', carData);
              let details = {
                registrationNumber: carData.registrationNumber,
                parkingTime: carData.parkingTime,
                unparkingTime: carData.unparkingTime,
                slotNumber: parkingInformation.slotNumber,
                floorNumber: parkingInformation.floorNumber
              };
              // console.log('details', details);
              return resolve({success: true, message: 'Car unparked successfully', data: details});
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
    
      Cardetails.remoteMethod('unparkCar', {
        accepts: [
          {
            arg: 'registrationNumber',
            type: 'string',
            required: true,
            http: {
              source: 'form'
            }
          },
          {
            arg: 'token',
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
          path: '/unparkcar',
          verb: 'POST'
        },
        description: 'API to unpark car'
      });

      Cardetails.fetchAllCarsOfAParticularColor = function (color, token, callback) {
        const promise = new Promise(function (resolve, reject) {

            // check for Authorization
            let authData = authUtils.verifyToken(token).data;
            if(!authUtils.isAdmin(authData)) {
              return resolve({success: false, message: 'Unauthorized to access', data: 401})
            }

          color = color.toLowerCase();
          let carInformation;
          // console.log('color', color);
          Cardetails.find({
            where: {
              color: color,
              isActive: true
            }
          })
            .then(function (carDetails) {
              carInformation = _.pluck(carDetails, 'registrationNumber');
              return resolve({success: true, message: 'Done', data: carInformation});
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
    
      Cardetails.remoteMethod('fetchAllCarsOfAParticularColor', {
        accepts: [
          {
            arg: 'color',
            type: 'string',
            required: true,
            http: {
              source: 'form'
            }
          },
          {
            arg: 'token',
            type: 'string',
            required: false,
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
          path: '/fetchallcarsofaparticularcolor',
          verb: 'POST'
        },
        description: 'API to fetch all cars of a particular color'
      });

      Cardetails.fetchSlotNumber = function (registrationNumber, token, callback) {
        const promise = new Promise(function (resolve, reject) {

          // check for Authorization
          let authData = authUtils.verifyToken(token).data;
          if(!authUtils.isAdmin(authData)) {
            return resolve({success: false, message: 'Unauthorized to access', data: 401})
          }

          let slotNumber, carDetails; 
            Cardetails.findOne({
              where: {
                registrationNumber: registrationNumber,
                isActive: true
              }
            })
            .then(carData => {
              carDetails = carData;
              return Cardetails.app.models.parkingDetails.findOne({
                where: {
                  carDetailId: carData.id,
                  isActive: true
                }
              });
            })
            .then(parkingData => {
              let data = {
                registrationNumber: carDetails.registrationNumber,
                parkingTime: carDetails.parkingTime,
                slotNumber: parkingData.slotNumber,
                floorNumber: parkingData.floorNumber
              };
              slotNumber = parkingData.slotNumber;
            return resolve({sucess: true, message: 'slots fetched successfully', data: data, total: data.length});
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
    
      Cardetails.remoteMethod('fetchSlotNumber', {
        accepts: [
          {
            arg: 'registrationNumber',
            type: 'string',
            required: false,
            http: {
              source: 'form'
            }
          },
          {
            arg: 'token',
            type: 'string',
            required: false,
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
          path: '/fetchslotnumber',
          verb: 'POST'
        },
        description: 'API to fetch all slot numbers of parked car'
      });

      Cardetails.fetchSlotNumbersOfColor = function (color, token, callback) {
        const promise = new Promise(function (resolve, reject) {
          // check for Authorization
          let authData = authUtils.verifyToken(token).data;
          if(!authUtils.isAdmin(authData)) {
            return resolve({success: false, message: 'Unauthorized to access', data: 401})
          }

          color = color.toLowerCase();

          let slotNumber; 
          Cardetails.find({
            where: {
              color: color,
              isActive: true
            }
          })
          .then(carData => {
            let carDetailIds = _.pluck(carData, 'id');
            return Cardetails.app.models.parkingDetails.find({
              where: {
                carDetailId: {
                  inq: carDetailIds
                },
                isActive: true
              }
            });
          })
          .then(parkingData => {
            slotNumber = _.pluck(parkingData, 'slotNumber');
            return resolve({sucess: true, message: 'slots fetched successfully', data: slotNumber, total: slotNumber.length});
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
    
      Cardetails.remoteMethod('fetchSlotNumbersOfColor', {
        accepts: [
          {
            arg: 'color',
            type: 'string',
            required: false,
            http: {
              source: 'form'
            }
          },
          {
            arg: 'token',
            type: 'string',
            required: false,
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
          path: '/fetchslotnumbersofcolor',
          verb: 'POST'
        },
        description: 'API to fetch all slot numbers of parked car'
      });

      Cardetails.carsParkedBy = function (registrationNumber, token, callback) {
        const promise = new Promise(function (resolve, reject) {
            // check for Authorization
            let authData = authUtils.verifyToken(token).data;
            if(!authUtils.isCustomer(authData)) {
              return resolve({success: false, message: 'Unauthorized to access', data: 401})
            }
  
          let slotNumber; 
          Cardetails.findOne({
            where: {
              registrationNumber: registrationNumber,
              isActive: true
            }
          })
          .then(carData => {
            return Cardetails.app.models.parkingDetails.findOne({
              where: {
                carDetailId: carData.id
              }
            });
          })
          .then(parkingData=>{
            slotNumber = parkingData.slotNumber;
            let floorNumber = parkingData.floorNumber;

            return Cardetails.app.models.parkingDetails.find({
              where: {
                floorNumber: floorNumber,
                isActive: true,
              },
              include: [{
                relation: 'carDetails'
              }]
            })
          })
          .then(data=>{
            let carsParkedNearBy = [];
            let getOut = false;
            let lessThanIterations = 2;
            let moreThanIterations = 3;
            _.each(data, item=>{

              if(lessThanIterations > 0 && slotNumber <= item.slotNumber) {
                lessThanIterations = lessThanIterations - 1;
              } else if(moreThanIterations > 0 && slotNumber >= item.slotNumber) {
                moreThanIterations = moreThanIterations - 1;
              } else {
                return;
              }
            let tempObj = {};

              tempObj['registrationNumber'] = item.Cardetails ? item.Cardetails.registrationNumber: null;
              tempObj['color'] = item.Cardetails ? item.Cardetails.color : null;
              tempObj['slotNumber'] = item.slotNumber;
              tempObj['floorNumber'] = item.floorNumber;

              carsParkedNearBy.push(tempObj);
            });
            return resolve({sucess: true, message: 'Done', data: carsParkedNearBy, total: carsParkedNearBy.length});
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
    
      Cardetails.remoteMethod('carsParkedBy', {
        accepts: [
          {
            arg: 'registrationNumber',
            type: 'string',
            required: false,
            http: {
              source: 'form'
            }
          },
          {
            arg: 'token',
            type: 'string',
            required: false,
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
          path: '/carsparkedby',
          verb: 'POST'
        },
        description: 'API to fetch details of cars parked nearby'
      });
};