const envReader = require("../../envReader.js")
const { get } = require('./../../../config/config.js')

envReader();

module.exports = {
  "development": {
    "username": get('MYSQLDB_USER', 'root'),
    "password": get('MYSQLDB_ROOT_PASSWORD', null),
    "database": get('MYSQLDB_DATABASE', "staff_scheduler"),
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "staff_scheduler_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": get('MYSQLDB_USER', 'root'),
    "password": get('MYSQLDB_ROOT_PASSWORD', null),
    "database": get('MYSQLDB_DATABASE', "staff_scheduler"),
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
