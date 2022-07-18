const {get_all_todo, get_todo_user, add_todo, update_todo, delete_todo} = require("./todos.query.js")
const auth = require('../../middleware/auth')
const verif_id = require('../../middleware/notFound')

module.exports = function(app) {
    app.get("/todos", auth, (req, res) => {
        let query = "SELECT * FROM todo"
        get_all_todo(res, query)
    });
    app.get("/todos/:id", auth, verif_id, (req, res) => {
        let id = req.params.id
        let query = `SELECT * FROM todo WHERE id = "${id}"`
        get_todo_user(res, query)
    });
    app.post("/todos", auth, (req, res) => {
        let title = req.body.title
        let description = req.body.description
        let due_time = req.body.due_time
        let user_id = req.body.user_id
        let status = req.body.status
        if (title === undefined || description === undefined ||
        due_time === undefined || user_id === undefined ||
        status === undefined) {
            res.status(500).json({msg: "Internal server error"})
            return;
        }
        let query = `INSERT INTO todo (title, description, due_time, user_id, status) VALUES ("${title}", "${description}", "${due_time}", "${user_id}", "${status}")`
        let query2 = `SELECT * FROM todo WHERE title = "${title}"`
        add_todo(res, query, query2)
    });
    app.put("/todos/:id", auth, (req, res) => {
        let id = req.params.id
        let title = req.body.title
        let description = req.body.description
        let due_time = req.body.due_time
        let user_id = req.body.user_id
        let status = req.body.status
        if (id === undefined || title === undefined ||
        description === undefined || due_time === undefined ||
        user_id === undefined || status === undefined) {
            res.status(500).json({ msg: "error"})
            return;
        }
        let query = `UPDATE todo SET title = "${title}", description = "${description}", due_time = "${due_time}", user_id = "${user_id}", status = "${status}" WHERE id = "${id}"`
        let query2 = `SELECT * FROM todo WHERE id = "${id}"`
        update_todo(res, query, query2)

    });
    app.delete("/todos/:id", auth, (req, res) => {
        let id = req.params.id
        let query = `DELETE FROM todo WHERE id = "${id}"`
        delete_todo(res, query, id)
    })
}