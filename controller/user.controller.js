const db = require('../db');
const bcrypt = require('bcrypt');

class UserController {
    async createUser(req, res){
        const {name, email, phone, password} = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        db.query(`INSERT INTO clients (name, email, phone, password, role_id) VALUES ($1, $2, $3, $4, 2)`,
            [name, email, phone, hashPassword],
            (err, result) => {
                if (err) {
                    if(err.constraint === 'clients_email_key') {
                        res.status(400).json({message: "User have this email"});
                    }

                    if(err.constraint === 'clients_phone_key') {
                        res.status(400).json({message: "User have this phone"});
                    }
                }

                if(result.rows[0] === undefined){
                    res.status(200).json({message: "Thank you for registering!"});
                }
            });
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
    async getAllUser(req,res){
        const data = await db.query('select * from clients');
        const user = data.rows;
        res.json(user);
    }
    async ordersUser(req, res){
        const id = req.params.id;
        const data = await db.query('select *, addresses.address_name from orders JOIN addresses ON orders.address_id = addresses.id_address where client_id = $1', [id]);
        const user = data.rows;
        res.json(user);
    }
    async allOrders(req, res){
        const data = await db.query('select * from orders');
        const user = data.rows;
        res.json(user);
    }
    async deleteOrders(req, res){
        const id = req.params.id;
        db.query(`delete from orders where order_id = ${id}`);
        const data = await db.query('select * from orders');
        const user = data.rows;
        res.json(user);
    }
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
    async successOrder(req, res){
        const {price, client_id, client_name, address_id, products} = req.body;

        const data = await db.query(`INSERT INTO orders (client_id, client_name, products, price, address_id) VALUES ($1, $2, $3, $4, $5)`, [client_id, client_name, products, price, address_id]);
        const newOrder = data.rows[0];
        res.json(newOrder);
    }
}

module.exports = new UserController();