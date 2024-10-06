const db = require('../database');

exports.getUserItems = (userid, callback) => {
    const query = `SELECT * FROM useritem WHERE userid = ?`;
    db.all(query, [userid], (err, rows) => {
        if (err) {
            callback(err);
        } else {
            callback(null, rows);
        }
    });
};

exports.getItemById = (itemid, callback) => {
    const query = `SELECT * FROM item WHERE id = ?`;
    db.get(query, [itemid], (err, item) => {
        if (err) {
            callback(err);
        } else {
            callback(null, item);
        }
    });
};