'use strict';

const app = require('../server');
const roles = [
  {
    name: 'ADMIN',
    createdDate: new Date(),
    lastModifiedDate: new Date()
  },
  {
    name: 'CUSTOMER',
    createdDate: new Date(),
    lastModifiedDate: new Date()
  }
];

app.models.roles.create(roles)
  .then(function () {
    console.log('Roles created successfully!');
    process.exit(0);
  })
  .catch(function (error) {
    console.error(error);
    process.exit(1);
  });
