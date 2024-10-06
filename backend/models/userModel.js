const db = require('../database');

exports.getAllUsers = (callback) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) {
            callback(err);
        } else {
            callback(null, rows);
        }
    });
};


