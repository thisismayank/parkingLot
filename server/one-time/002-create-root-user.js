'use strict';

const app = require('../server');
const passwordUtils = require('../utils/111-password-utils');
const user = [
  {
    first_name: 'Mayank',
    last_name: 'Arya',
    name: 'Mayank ' + 'Arya',
    userCode: 'mak',
    email: 'mayank.uiet7@gmail.com',
    password: passwordUtils.hashPassword('mayank123'),
    dob: '15-03-1996',
    gender: 1,
    isActive: true,
    isRoot: true,
    
  }
];
let userDetails;
app.models.appUser.create(user)
  .then(function (userData) {
      userDetails = userData[0];
      return app.models.roles.findOne({
          where: {
              name: 'ADMIN'
          }
      });
    })
    .then(function(rolesData) {
    const userRoleMapping = [
        {
            appUserId: userDetails.id,
            roleId: rolesData.id
        }
    ];

        return app.models.userRoleMapping.create(userRoleMapping);
    })
    .then(function (){
        console.log('Root user created successfully!');
        process.exit(0);
  })
  .catch(function (error) {
    console.error(error);
    process.exit(1);
  });
