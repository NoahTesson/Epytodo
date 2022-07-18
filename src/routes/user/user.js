const {get_all_user, get_all_todo_of_user, get_user_information, update_user_information_by_id, delete_user} = require('./user.query.js')
const auth = require('../../middleware/auth');
var bcrypt = require('bcryptjs');

module.exports = function(app) {
    app.get("/user", auth, (req, res) => {
        let query = `SELECT * FROM user`
        get_all_user(res, query)
    });
    app.get("/user/todos", auth, (req, res) => {
        let query = `SELECT * FROM todo`
        get_all_todo_of_user(res, query)
    });
    app.get("/users/:datas", auth, (req, res) => {
        let datas = req.params.datas
        let query = `SELECT * FROM user WHERE id = "${datas}"`
        let query2 = `SELECT * FROM user WHERE email = "${datas}"`
        get_user_information(res, query, query2)
    });
    app.put("/users/:id", auth, (req, res) => {
        let id = req.params.id
        let email = req.body.email
        let password = req.body.password
        let name = req.body.name
        let firstname = req.body.firstname
        if (id === undefined || email === undefined ||
            password === undefined || name === undefined ||
            firstname === undefined) {
            res.statud(500).json({ msg : "internal server error"})
            return;
        }
        password = bcrypt.hashSync(password, 10)
        let query = `UPDATE user SET email = "${email}", password = "${password}", name = "${name}", firstname = "${firstname}" WHERE id = ${id}`
        let query2 = `SELECT * FROM user WHERE id = "${id}"`
        update_user_information_by_id(res, query, query2)
    });
    app.delete("/users/:id", auth, (req, res) => {
        let id = req.params.id
        let query = `DELETE FROM todo WHERE user_id = "${id}"`
        let query2 = `DELETE FROM user WHERE id = "${id}"`
        delete_user(res, query, query2, id)
    });
}