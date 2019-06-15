'use strict';

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

      Parkingdetails.unpark = function (carDetailId, callback) {
        const promise = new Promise(function (resolve, reject) {
          let parkingInformation;
          Parkingdetails.find({
            carDetailId: carDetailId,
            isActive: true
          })
            .then(function (parkingData) {
              parkingInformation = parkingData;
              if(!parkingData) {
                  return resolve({success: false, message: 'This car is not parked'});
              }
              return Parkingdetails.app.models.floorDetails.removeCar(parkingData.floorNumber);
            })
            .then(function(floorInformation) {

              parkingInformation.slotNumber = null;
              parkingInformation.floorNumber = null;
              parkingInformation.floorDetailId = null;
              
              return parkingInformation.save();
            })
            .then(function(data) {
              return resolve({ success: true, message: 'Car unparked successfully', data: data });

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
    
      Parkingdetails.remoteMethod('login', {
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
};
