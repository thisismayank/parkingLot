'use strict';

const app = require('../server');
const floors = [
  {
    floorNumber: 1,
    hasFreeSlots: 1,
    maxSlots: 10,
    numberOfFilledSlots: 0
  },
  {
    floorNumber: 2,
    hasFreeSlots: 1,
    maxSlots: 10,
    numberOfFilledSlots: 0
  }
];

app.models.floorDetails.create(floors)
  .then(function () {
    console.log('floor details created successfully!');
    process.exit(0);
  })
  .catch(function (error) {
    console.error(error);
    process.exit(1);
  });
