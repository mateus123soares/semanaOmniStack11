
const connection = require("../database/connection");
const crytop = require("crypto");

module.exports = {
    async create(req, res) {
        const { name, email, whatsapp, uf, city } = req.body;

        const id = crytop.randomBytes(4).toString('HEX');

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })

        return res.json({ id });
    },
    async index(req,res){
        const ongs = await connection('ongs').select('*');

        return res.json(ongs);
    }
}