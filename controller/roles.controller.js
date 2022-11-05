const {Role} = require("../models/models");

class RolesController {
    async getRoles(req, res){
        const rolesAll = await Role.findAll();
        return res.json(rolesAll);
    }
    async deleteRoles(req, res){
        const id = req.params.id;
        await Role.destroy({
            where: {
                id
            }
        }).then(function(result) {
            res.json({
                status: 1,
                data: result
            });
        });
    }
    async saveRoles(req, res){
        const {name} = req.body;
        const roles = await Role.findOne({ where: { name } });
        if (roles === null) {
            const rolesName = await Role.create({name});
            res.json(rolesName);
        } else {
            if(roles instanceof Role){
                res.status(400).json({message: `Данная роль: ${roles.name} имеется!`});
            }
        }
    }
    async updateRoles(req, res){
        const {name, id} = req.body;
        const rolesUpdate = await Role.update(
            {name},
            {where:
                    {id}
            });
        res.json(rolesUpdate);
    }
}

module.exports = new RolesController();