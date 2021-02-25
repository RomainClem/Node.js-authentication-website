const db = require('./db');

class User {
    //fetch all registered user
    static all(callback)
    {   const sql = "SELECT * FROM User ORDER BY Type"
        db.all(sql, [], (err, rows) => {
            if (err)
                return console.error(err.message);
            callback(rows);
        });
    }

    //select a specific user
    static find(id, callback)
    {   db.get('select * from User where ID = ?', id, (err, row) => {
        if (err)
            return console.error(err.message);
        callback(row);
    });
    }

    //create a new User
    static create(data, callback)
    {  const sql = 'insert into User(First_Name, Last_Name) values (?, ?)';
        const params = [data.firstName, data.lastName];
        let user = db.prepare(sql);
        user.run(params, err => {
            if (err)
                return res.status(401).render('../views/pages/lost', {nav: "Wrong Wae", errorMsg: err});
            callback(user)
        });
    }

    //delete a User
    static delete(id, callback)
    {  if (!id)
        return callback(new Error('Please provide a User id'));
        db.run('delete from User where ID = ?', id, callback);
    }
}

module.exports = db;
module.exports.User = User;