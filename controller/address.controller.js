//const db = require('../db');
const {Addresses} = require("../models/models");

class AddressController {
    async getAddress(req, res){
        // const sqlInsertCustomer = "SELECT * FROM addresses";
        // db.query(sqlInsertCustomer, (err, result) => {
        //     res.json(result.rows);
        // });
        const addressesAll = await Addresses.findAll();
        return res.json(addressesAll);
    }
    async deleteAddress(req, res){
        const id = req.params.id;
        // db.query(`delete from addresses where id_addresses = ${id}`);
        // const data = await db.query('select * from addresses');
        // const user = data.rows;
        // res.json(user);
        await Addresses.destroy({
            where: {
                id_address: id
            }
        }).then(function(result) {
            res.json({
                status: 1,
                data: result
            });
        });
    }
    async saveAddress(req, res){
        const {address_name} = req.body;
        const address = await Addresses.findOne({ where: { address_name } });
        if (address === null) {
            const addressName = await Addresses.create({address_name});
            res.json(addressName);
        } else {
            if(address instanceof Addresses){
                res.status(400).json({message: `Данный аддресс: ${address.address_name} имеется!`});
            }
        }
        // db.query('INSERT INTO addresses (address_name) VALUES ($1) RETURNING *', [address]);
        // const data = await db.query('select * from addresses');
        // const user = data.rows;
    }
    async updateAddress(req, res){
        const {address_name, id_address} = req.body;
        const adressUpdate = await Addresses.update(
            {address_name},
            {where:
                    {id_address}
            });
        res.json(adressUpdate);
    }
}

module.exports = new AddressController();