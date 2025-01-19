const pool = require('../config/database');

class Role{
    static async create({nome}){
        const [result] = await pool.query(
            `INSERT INTO role (nome) VALUES (?)`,
            [nome]
        );
        return result.insertId;
    }

    static async findById(id){
        const [rows] = await pool.query(`SELECT * FROM role WHERE id = ?`, [id]);
        return rows[0];
    }

    static async findAll(){
        const [rows] = await pool.query(`SELECT * FROM role`);
        return rows;
    }

    static async update(id, {nome}){
        const [result] = await pool.query(
            `UPDATE role SET nome = ? WHERE id = ?`,
            [nome, id]
        );
        return result.affectedRows > 0;
    }

    static async delete(id){
        const [result] = await pool.query(`DELETE FROM role WHERE id = ?`, [id]);
        return result.affectedRows > 0;
    }
}

module.exports = Role;