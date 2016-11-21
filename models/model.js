'use strict';

var db = require('./database');
var Sequelize = require('sequelize');

var Students = db.define('Students', {
  name: {
    type: Sequelize.STRING,
  },
  rfid: {
    type: Sequelize.INTEGER,
  },
  numOfBeers: {
    type: Sequelize.INTEGER,
    defaultValue: 2
  }
}, {
  instanceMethods: {
    decrementBeers: function(){
      if (this.numOfBeers < 1) return false
      else {
        this.numOfBeers--;
        return true;
      }
    }
  }
});

module.exports = Students;
