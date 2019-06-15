'use strict';

module.exports = function(Userrolemapping) {

    Userrolemapping.login = function (userCode, password, callback) {
        const promise = new Promise(function (resolve, reject) {

          Userrolemapping.findOne({
            where: {
              userCode: userCode
            }
          })
            .then(function (userData) {
              if(!userData || !passwordUtils.comparePassword(password, userData.password)) {
                  return resolve({success: false, message: 'wrong username password'});
              }
              return resolve({ success: true, message: null });
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
    
      Userrolemapping.remoteMethod('login', {
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
