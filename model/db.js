const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const saltRounds = 10;


// open the database connection
let db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
        console.error(err.message);
    }
});

db.serialize(() => {
    // Queries scheduled here will be serialized.
    db.run('CREATE TABLE IF NOT EXISTS User (' +
        '  ID INTEGER PRIMARY KEY,' +
        '  First_Name TEXT NOT NULL,' +
        '  Last_Name TEXT NOT NULL);', err => {
        if (err)
            return console.error(err.message);
    });
    db.run('CREATE TABLE IF NOT EXISTS Login (' +
        '  Login TEXT PRIMARY KEY,' +
        '  Password TEXT NOT NULL,' +
        '  User_ID INT NOT NULL,' +
        '  Role TEXT NOT NULL,'+
        '  FOREIGN KEY (User_ID)' +
        '    REFERENCES user (ID));', err => {
        if (err)
            return console.error(err.message);
    });
});

db.serialize(() => {
    const sql_insert_user = 'insert into User(First_Name, Last_Name) values (?, ?)';
    db.run(sql_insert_user, ['Jean', 'Tourte'], err => {
        if (err)
            return console.error(err.message);
    });
    db.run(sql_insert_user, ['Alfred', 'De La Sergio'], err => {
        if (err)
            return console.error(err.message);
    });
    db.run(sql_insert_user, ['Roger', 'Toke'],err => {
        if (err)
            return console.error(err.message);
    });

    const sql_insert_login = 'insert into Login(Login, Password, Role, User_ID) values (?, ?, ?, ?)';

    bcrypt.hash("Jtourte", saltRounds, function(err, hash) {
        db.run(sql_insert_login, ['jean.tourte@mail.com', hash, 'Admin', 1], err => {
            if (err)
                return console.error(err.message);
            console.log(`User1: 'jean.tourte@mail.com', password: 'Jtourte', role: 'Admin'`);
        });
    });

    bcrypt.hash("Asergio", saltRounds, function(err, hash) {
        db.run(sql_insert_login, ['alfred.sergio@mail.com', hash, 'Guest', 2], err => {
            if (err)
                return console.error(err.message);
            console.log(`User2: 'alfred.sergio@mail.com', password: 'Asergio', role: 'Guest'`);
        });
    });

    bcrypt.hash("Rtoke", saltRounds, function(err, hash) {
        db.run(sql_insert_login, ['roger.toke@mail.com', hash, 'Ordinary' , 3], err => {
            if (err)
                return console.error(err.message);
            console.log(`User3: 'roger.toke@mail.com', password: 'Rtoke', role: 'Ordinary'`);
        });
    });

});

//list all tables in the database
db.serialize(function () {
    db.all("select name from sqlite_master where type='table'", (err, table) => {
        console.log(table);
    });
    db.all('select * from User', (err, user) =>
    {  console.log(user);
    });
});

module.exports = db