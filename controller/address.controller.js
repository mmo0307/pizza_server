const db = require('../db');

class AddressController {
    async getAddress(req, res){
        const sqlInsertCustomer = "SELECT * FROM addresses";
        db.query(sqlInsertCustomer, (err, result) => {
            res.json(result.rows);
        });
    }
    async deleteAddress(req, res){
        const id = req.params.id;
        db.query(`delete from addresses where id_addresses = ${id}`);
        const data = await db.query('select * from addresses');
        const user = data.rows;
        res.json(user);
    }
    async saveAddress(req, res){
        const {address} = req.body;
        db.query('INSERT INTO addresses (address_name) VALUES ($1) RETURNING *', [address]);
        const data = await db.query('select * from addresses');
        const user = data.rows;
        res.json(user);
    }
}

module.exports = new AddressController();