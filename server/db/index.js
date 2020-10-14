const mysql = require('mysql');

const checklists = require ('./checklists');
const config = require('../config');

const connection = mysql.createConnection(config.mysql);

connection.connect(err => {
    if (err) console.log(err)
    else console.log('hi');
});

module.exports = {connection};