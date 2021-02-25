const db = require('./db');

class Admin {
    //fetch all registered Login and User
    static all(callback)
    {   const sql = "SELECT * FROM Login l INNER JOIN User ON User_ID = ID ORDER BY User_ID"
        db.all(sql, [], (err, rows) => {
            if (err)
                return console.error(err.message);
            callback(rows);
        });
    }
}

module.exports = db;
module.exports.Admin = Admin;