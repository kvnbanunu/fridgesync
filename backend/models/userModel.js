const db = require('../database');

exports.getUserByUsername = (email, callback) => {
    const query = `SELECT * FROM user WHERE username = ?`;
    db.get(query, [username], (err, user) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, user);
        }
    });
};

exports.getAllUsers = (callback) => {
    db.all('SELECT * FROM user', [], (err, rows) => {
        if (err) {
            callback(err);
        } else {
            callback(null, rows);
        }
    });
};

exports.addUser = (username, password, callback) => {
    const query = `INSERT INTO user (username, password) VALUES (?, ?, ?)`;
    db.run(query, [username, password], function (err) {
        if (err) {
            callback(err);
        } else {
            callback(null, { id: this.lastID });
        }
    });
};
