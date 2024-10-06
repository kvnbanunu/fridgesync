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
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS item (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE,
        category TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS useritem (
        userid INTEGER,
        itemid INTEGER,
        quantity INTEGER,
        expirydate TEXT,
        FOREIGN KEY (userid) REFERENCES user(id),
        FOREIGN KEY (itemid) REFERENCES item(id),
        PRIMARY KEY (userid, itemid)
    )`)
    
    db.run(`CREATE TABLE IF NOT EXISTS recipe (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS recipeitems (
        recipeid INTEGER,
        itemid INTEGER,
        quantity INTEGER,
        FOREIGN KEY (recipeid) REFERENCES recipe(id),
        FOREIGN KEY (itemid) REFERENCES item(id),
        PRIMARY KEY (recipeid, itemid )
    )`)
    
    db.run(`CREATE TABLE IF NOT EXISTS userrecipe (
        userid INTEGER,
        recipeid INTEGER,
        FOREIGN KEY (userid) REFERENCES user(id),
        FOREIGN KEY (recipeid) REFERENCES recipe(id),
        PRIMARY KEY (userid, recipeid)
    )`)
});

module.exports = db;