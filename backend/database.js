const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        password TEXT,
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS item (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userid INTEGER,
        name TEXT,
        quantity INTEGER,
        expirydate TEXT,
        category TEXT,
        FOREIGN KEY (userid) REFERENCES user(id)
    )`);
    
    db.run(`CREATE TABLE IF NOT EXISTS recipe (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        items BLOB
    )`);
    
    db.run(`CREATE TABLE IF NOT EXISTS user-recipe (
        userid INTEGER,
        recipeid INTEGER,
        FOREIGN KEY (userid) REFERENCES user(id),
        FOREIGN KEY (recipeid) REFERENCES recipe(id),
        PRIMARY KEY (userid, recipeid)
    )`)
});

module.exports = db;
