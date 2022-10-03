const db = require('../db');
const bcrypt = require('bcrypt');

class UserController {
    async createUser(req, res){
        const {name, email, phone, password} = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        const data = await db.query(`INSERT INTO clients (name, email, phone, password, role_id) VALUES ($1, $2, $3, $4, 2) RETURNING *`, [name, email, phone, hashPassword]);
        const newPerson = data.rows[0];
        res.json(newPerson);
    }
    async loginUser(req, res){
        const { email, password } = req.body;
        db.query(`SELECT * FROM clients WHERE email= $1`,
            [email],
            (err, result) => {
                if (err) {
                    res.send({err: err});
                }

                if (result.rows[0] !== undefined) {
                    bcrypt.compare(password, result.rows[0].password, (error, response) => {
                        if (response) {
                            res.send(result.rows[0]);
                        } else {
                            res.status(400).json({message: "Wrong email or password"});
                            //res.send({message: "Wrong email or password"});
                        }
                    });
                } else {
                    res.status(400).json({message: "User not found!"});
                    //res.send({message: "User not found!"});
                }
            });
    }
    // async getUsers(req, res){
    //     const data = await db.query('SELECT * FROM person');
    //     const users = data.rows;
    //     res.json(users);
    // }
    // async getOneUser(req, res){
    //     const id = req.params.id;
    //     const data = await db.query(`SELECT * FROM person WHERE id = $1`, [id]);
    //     const user = data.rows;
    //     res.json(user);
    // }
    // async updateUser(req, res){
    //     const {id, name, surname} = req.body;
    //     const data = await db.query('UPDATE person SET name = $1, surname = $2 WHERE id = $3 RETURNING *', [name, surname, id]);
    //     const user = data.rows[0];
    //     res.json(user);
    // }
    async deleteUser(req, res){
        const id = req.params.id;
        const data = await db.query('DELETE FROM clients WHERE id = $1', [id]);
        const user = data.rows[0];
        res.json(user);
    }
}

module.exports = new UserController();