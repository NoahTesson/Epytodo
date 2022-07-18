var db = require('./../../config/db');

exports.get_all_todo = function(res, query) {
    db.query(query, function (err, result) {
        if (err) throw err;
        res.status(200).json(result)
    });
}
exports.get_todo_user = function(res, query) {
    db.query(query, function (err, result) {
        if (err) throw err;
        if (result.length > 0)
            res.status(200).json(result)
        else
            res.status(401).json({ msg: "Not found"})
    });
}
exports.add_todo = function(res, query, query2) {
    db.query(query, function(err) {
        if (err) throw err;
        db.query(query2, function(err, result) {
            if (err) throw err;
            res.status(200).json(result)
        });
    });
}
exports.update_todo = function(res, query, query2) {
    db.query(query, function(err) {
        if (err) throw err
        db.query(query2, function(err, result) {
            if (err) throw err
            res.status(200).json(result)
        });
    });
}
exports.delete_todo = function(res, query, id) {
    db.query(query, function (err, result, fields) {
        if (err) throw err;
        res.json({ msg: `Successfully deleted record number: ${id}`})
    });
}