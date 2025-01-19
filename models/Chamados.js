const pool = require('../config/database');

class Chamados{
    static async create({ titulo, descricao, id_status, ticket_id, ticket_titulo, ticket_status, ticket_dataCriacao, ticket_responsavel, ticket_time, ticket_cliente }){
        const [result] = await pool.query(
            `INSERT INTO chamados (titulo, descricao, id_status, ticket_id, ticket_titulo, ticket_status, ticket_dataCriacao, ticket_responsavel, ticket_time, ticket_cliente) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [titulo, descricao, id_status, ticket_id, ticket_titulo, ticket_status, ticket_dataCriacao, ticket_responsavel, ticket_time, ticket_cliente]
        );
        return result.insertId;
    }
    static async findById(id){
        const [rows] = await pool.query(`SELECT * FROM chamados WHERE id = ?`, [id]);
        return rows[0];
    }
    static async findChamadoByTicket(ticket_id){
        const [rows] = await pool.query(`select * from chamados where ticket_id = ?`, [ticket_id]);
        return rows[0];
    }
    static async findChamadoByStatus(id_status){
        const [rows] = await pool.query(`select * from chamados where id_status = ?`, [id_status]);
        return rows;
    }
    static async findAll(){
        const [rows] = await pool.query(`SELECT * FROM chamados`);
        return rows;
    }
    static async update(id, {titulo, descricao, id_status, ticket_id, ticket_titulo, ticket_status, ticket_dataCriacao, ticket_responsavel, ticket_time, ticket_cliente}){
        const [result] = await pool.query(
            `UPDATE chamados SET titulo = ?, descricao = ?, id_status = ?, ticket_id = ?, ticket_titulo = ?, ticket_status = ?, ticket_dataCriacao = ?, ticket_responsavel = ?, ticket_time = ?, ticket_cliente = ? WHERE id = ?`,
            [titulo, descricao, id_status, ticket_id, ticket_titulo, ticket_status, ticket_dataCriacao, ticket_responsavel, ticket_time, ticket_cliente, id]
        );
        return result.affectedRows > 0;
    }
    static async delete(id){
        const [result] = await pool.query(`DELETE FROM chamados WHERE id = ?`, [id]);
        return result.affectedRows > 0;
    }
}
module.exports = Chamados;