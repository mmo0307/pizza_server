const db = require('../db');

class AddressController {
    async getAddress(req, res){
        const sqlInsertCustomer = "SELECT * FROM addresses";
        db.query(sqlInsertCustomer, (err, result) => {
            res.json(result.rows);
        });
    }
}

module.exports = new AddressController();