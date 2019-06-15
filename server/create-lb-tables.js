'use strict';

var server = require('./server');
var ds = server.dataSources.db;
var lbTables =  ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role', 'carDetails', 'appUser', 'roles', 'userRoleMapping','floorDetails', 'parkingDetails'];

ds.automigrate(lbTables, function(er) {
    if (er) throw er;
    console.log('Loopback tables [' - lbTables - '] created in ', ds.adapter.name);
    ds.disconnect();
})