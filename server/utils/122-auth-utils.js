'use strict';

const app = require('../server');
const jwt = require('jsonwebtoken');

module.exports = {
    verifyToken: function(token) {
        // console.log('token in utils', token);
    if(!token) {
      return {success:false}
    } 

    let payload = jwt.verify(token, 'secretKey');
    // console.log(payload);
    if(!payload) {
      return {success: false, message: 'Not authorized', data: null};
    }
    return {success:true, message: 'Authorized', data: payload};
  },

  isAdmin: function(data) {
    //   console.log('isAdmin', data);
      if(data.role === 'ADMIN') {
          return true;
      } else {
          return false;
      }
  },

  isCustomer: function(data) {
    //   console.log('isCustomer', data);
    if(data.role === 'CUSTOMER') {
        return true;
    } else {
        return false;
    }
}
}