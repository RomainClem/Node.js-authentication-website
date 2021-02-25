const db = require('./db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class Login {
    //fetch all registered Login
    static all(callback)
    {   const sql = "SELECT * FROM Login ORDER BY Login"
        db.all(sql, [], (err, rows) => {
            if (err)
                return console.error(err.message);
            callback(rows);
        });
    }

    //select a specific Login
    static find(id, callback){
        db.get('select * from Login where Login = ?', id, (err, row) => {
            if (err)
                return console.error(err.message);
            callback(row);
        });
    }

    //create a new Login
    static create(data, callback){
        const sql = 'insert into Login(Login, Password, User_ID, Role) values (?, ?, ?, ?)';
        bcrypt.hash(data.password, saltRounds, function(err, hash) {
            const params = [data.email, hash, data.id, data.role];
            let login =  db.prepare(sql);
            login.run(params, err => {
                if (err)
                    return console.error(err.message);
                    // res.status(401).render('../views/pages/lost', {nav: "Wrong Wae", errorMsg: err});
                callback(login);
            });
        });
    }

    //update password, role or both
    static update(data, callback){
        if (data.password !== '')
            data.hashed = bcrypt.hashSync(data.password, saltRounds);
        const password = (data.password !== '') ? `Password = '${data.hashed}'` : '';
        const role = (data.role !== '') ? `Role = '${data.role}'` : '';
        const comma = (password && role !== '') ? ', ' : '';
        const sql = `UPDATE Login SET ${password}${comma}${role} WHERE User_ID = ${data.id}`;
        db.run(sql, callback);
    }

    //delete a Login
    static delete(id, callback){
        if (!id)
            return callback(new Error('Please provide a Login id'));
        db.run('delete from Login where User_ID = ?', id, callback);
    }
}

module.exports = db;
module.exports.Login = Login;