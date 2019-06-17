'use strict';

const passwordUtils = require('../../server/utils/111-password-utils');

module.exports = function(Appuser) {
    Appuser.login = function (userCode, password, callback) {
        const promise = new Promise(function (resolve, reject) {

          Appuser.findOne({
            where: {
              userCode: userCode
            }
          })
            .then(function (userData) {
              if(!userData || !passwordUtils.comparePassword(password, userData.password)) {
                  return resolve({success: false, message: 'wrong username password'});
              }
              return Appuser.app.models.userRoleMapping.findOne({
                where: {
                  appUserId: userData.id
                },
                include: 'roles'
              });
            })
              .then((roleDetails)=>{
                if(roleDetails.roles().name === 'ADMIN') {
                  return resolve({success: true, message: 'successfull', data: {role: 'ADMIN', id: roleDetails.appUserId} });
                } else {
                  return resolve({ success: true, message: 'successfull', data: {role: 'CUSTOMER', id: roleDetails.appUserId} });
                }
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
    
      Appuser.remoteMethod('login', {
        accepts: [
          {
            arg: 'userCode',
            type: 'string',
            required: true,
            http: {
              source: 'query'
            }
          },
          {
            arg: 'password',
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
          path: '/login',
          verb: 'POST'
        },
        description: 'API to login'
      });

      Appuser.register = function (firstName, lastName, userCode, email, password, dob, gender, role, roleOfLoggedInUser, callback) {
        const promise = new Promise(function (resolve, reject) {
          role = role.toUpperCase();
          let userData;
          Appuser.findOne({
            where: {
              userCode: userCode,
              email:email,
              isActive:true
            }
          })
            .then(function (user) {
              userData = user;
              if(userData) {
                  return resolve({success: false, message: 'userCode exists'});
              }
              if(roleOfLoggedInUser !== 'ADMIN' && role === 'ADMIN') {
                return resolve({success: false, message: 'Only admin can create an admin'});
              } 
              return Appuser.create({
                  firstName: firstName,
                  lastName: lastName,
                  name: firstName + ' ' + lastName,
                  userCode: userCode,
                  email: email,
                  password: passwordUtils.hashPassword(password),
                  dob: dob,
                  gender: gender,
                  isActive: true,
                  isRoot: false 
              });
            })
            .then(function (userDetails) {
              userData = userDetails;
                if(!userDetails) {
                  return resolve({success: false, meessage: 'User not created'});
                }
                return Appuser.app.models.roles.findOne({
                  where: {
                    name: role
                  }
                });
              })
              .then(function(roleData) {
                return Appuser.app.models.userRoleMapping.create({
                  appUserId: userData.id,
                  roleId: roleData.id
                });
            })
            .then((details)=>{
              if(!details) {
                return resolve({success: false, message: 'Some error in role mapping creation'});
              }
              return resolve({success: true, message: 'User and role Created Successfully'});
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
    
      Appuser.remoteMethod('register', {
        accepts: [
            {
                arg: 'firstName',
                type: 'string',
                required: true,
                http: {
                  source: 'query'
                }
              },
              {
                arg: 'lastName',
                type: 'string',
                required: true,
                http: {
                  source: 'query'
                }
              },
          {
            arg: 'userCode',
            type: 'string',
            required: true,
            http: {
              source: 'query'
            }
          },
          {
            arg: 'email',
            type: 'string',
            required: true,
            http: {
              source: 'query'
            }
          },  
          {
            arg: 'password',
            type: 'string',
            required: true,
            http: {
              source: 'query'
            }
          },
          {
            arg: 'dob',
            type: 'string',
            required: true,
            http: {
              source: 'query'
            }
          },
          {
            arg: 'gender',
            type: 'string',
            required: true,
            http: {
              source: 'query'
            }
          },
          {
            arg: 'role',
            type: 'string',
            required: true,
            http: {
              source: 'query'
            }
          },
          {
            arg: 'roleOfLoggedInUser',
            type: 'string',
            required: true,
            http: {
              source: 'query'
            }
          },
        ],
        returns: {
          arg: 'data',
          type: 'object',
          root: true
        },
        http: {
          path: '/register',
          verb: 'POST'
        },
        description: 'API to register'
      });


      Appuser.disableUser = function ( userCode, email, roleOfLoggedInUser, callback) {
        const promise = new Promise(function (resolve, reject) {
          if(roleOfLoggedInUser !== 'ADMIN') {
            return resolve({success: false, message: 'Only an admin user is authorized'});
          }
          let userData;
          Appuser.findOne({
            where: {
              userCode: userCode,
              email: email,
              isActive: true,
              isRoot: false
            }
          })
            .then(function (user) {
              userData = user;
              if(!userData) {
                  return resolve({success: false, message: 'user does not exist'});
              }
              user.isActive = false;
              return user.save();
            })
            .then(function (userDetails) { 
              return resolve({success: true, message: 'User was successfully disabled'});
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
    
      Appuser.remoteMethod('disableUser', {
        accepts: [
          {
            arg: 'userCode',
            type: 'string',
            required: true,
            http: {
              source: 'query'
            }
          },
          {
            arg: 'email',
            type: 'string',
            required: true,
            http: {
              source: 'query'
            }
          },  
          {
            arg: 'roleOfLoggedInUser',
            type: 'string',
            required: true,
            http: {
              source: 'query'
            }
          },
        ],
        returns: {
          arg: 'data',
          type: 'object',
          root: true
        },
        http: {
          path: '/disableuser',
          verb: 'POST'
        },
        description: 'API to disable any user'
      });

      Appuser.fetchAllUsers = function (roleOfLoggedInUser, callback) {
        const promise = new Promise(function (resolve, reject) {
          if(roleOfLoggedInUser !== 'ADMIN') {
            return resolve({success: false, message: 'Only an admin user is authorized'});
          }
          let userData;
          Appuser.find({
            where: {
              isActive: true
            }
          })
            .then(function (user) {
              userData = user;
              if(!userData) {
                  return resolve({success: false, message: 'users does not exist'});
              }
              return resolve({success: true, message: 'User details fetched', data: userData, total: userData.length});
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
    
      Appuser.remoteMethod('fetchAllUsers', {
        accepts: [
          {
            arg: 'roleOfLoggedInUser',
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
          path: '/fetchAllUsers',
          verb: 'GET'
        },
        description: 'API to fetch all user data'
      });

      Appuser.forgotPassword = function (userCode, email, callback) {
        const promise = new Promise(function (resolve, reject) {
          let message = '123456';
          let subject = 'OTP for password reset';
          let userData;
          console.log('here....', email);
          
          let envelope = {
            to: 'mayank.uiet7@gmail.com',
            from: [],
            message: ''
          };

          envelope['from'][0] = 'mayank.uiet7@gmail.com';
          envelope['message'] = message
          Appuser.app.models.Email.send(envelope, function(err) {
            if (err) return console.log('> error sending password reset email', err);
            console.log('> sending password reset email to:', email);
            });
        });
    
        if (callback !== null && typeof callback === 'function') {
          promise.then(function (data) { return callback(null, data); }).catch(function (err) { return callback(err); });
        } else {
          return promise;
        }
      };
    
      Appuser.remoteMethod('forgotPassword', {
        accepts: [
          {
            arg: 'userCode',
            type: 'string',
            required: true,
            http: {
              source: 'query'
            }
          },
          {
            arg: 'email',
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
          path: '/forgotPassword',
          verb: 'POST'
        },
        description: 'API to fetch all user data'
      });

};