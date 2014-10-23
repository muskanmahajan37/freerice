var sqlite3         = require('sqlite3').verbose();
var _               = require('underscore');
var DBHelper       = require('./db_helper');
var db_helper = new DBHelper();

function DB() {
    'use strict';
    return;
}

DB.prototype.errorHandler = function (err) {
    'use strict';
    if (err !== null) {
        throw err;
    }
};

DB.prototype.getById = function (user_id, callback) {
    'use strict';
    var db = new sqlite3.Database("dev.db");
    db.all("SELECT * FROM user WHERE id = " + user_id, function (err, rows) {
        DB.prototype.errorHandler(err);
        db.close();
        callback(rows);
    });
};

DB.prototype.getByName = function (user_name, callback) {
    'use strict';
    var sql = "SELECT * FROM user WHERE name = '" + user_name + "'LIMIT 1";

    var db = new sqlite3.Database("dev.db");
    db.all(sql, function (err, rows) {
        DB.prototype.errorHandler(err);
        db.close();
        callback(rows);
    });
};

DB.prototype.findAllAccount = function (callback) {
    'use strict';
    var sql = "SELECT * FROM user";

    var db = new sqlite3.Database("dev.db");
    db.all(sql, function (err, rows) {
        DB.prototype.errorHandler(err);
        db.close();
        callback(rows);
    });
};

DB.prototype.findAllRice = function (callback) {
    'use strict';
    var sql = "SELECT * FROM rice";

    var db = new sqlite3.Database("dev.db");
    db.all(sql, function (err, rows) {
        DB.prototype.errorHandler(err);
        db.close();
        callback(rows);
    });
};

DB.prototype.createAccount = function (account, callback) {
    'use strict';

    DB.prototype.getByName(account.name, function(result){
        if(!_.isEmpty(result)){
            callback({
                "error": "user exist"
            });
        }
    });
    var sql = "insert or replace into  user (" + db_helper.getKey(account) + ") VALUES (" + db_helper.getValue(account) + ");";

    var db = new sqlite3.Database("dev.db");
    db.all(sql, function (err, rows) {
        DB.prototype.errorHandler(err);
        db.close();
        if(_.isEmpty(rows)){
            rows = {
                "status": "success"
            };
        }
        callback(rows);
    });
};

module.exports = DB;