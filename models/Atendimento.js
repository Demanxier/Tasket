const pool = require('../config/database');

class Atendimento {
    static async create({ data, horaInicio, horaFim, resumo, id_chamado, id_consultor }){
        const [result] = await pool.query(
            `INSERT INTO atendimento (data, horaInicio, horaFim, resumo, id_chamado, id_consultor) VALUES (?, ?, ?, ?, ?, ?)`,
            [data, horaInicio, horaFim, resumo, id_chamado, id_consultor]
        );
        return result.insertId;
    }
    static async findById(id){
        const [rowns] = await pool.query(`SELECT * FROM atendimento WHERE id = ?`, [id]);
        return rowns[0];
    }
    static async findByAtendimentoHoje(data){
        const [rows] = await pool.query(`select c.titulo, c.ticket_id, c.ticket_responsavel, c.ticket_dataCriacao, a.data, a.horaInicio, c2.nome from atendimento a  join chamados c on a.id_chamado = c.id join consultor c2 on a.id_consultor = c2.id where a.data= ?`, [data]);
        return rows;
    }
    static async findBySemana(datIni, datFim){
        const [rows] = await pool.query(`select c.titulo, c.ticket_id, c.ticket_responsavel, c.ticket_dataCriacao, a.data, a.horaInicio, c2.nome from atendimento a join chamados c on a.id_chamado = c.id join consultor c2 on a.id_consultor = c2.id where a.data between ? and ?`, [datIni, datFim]);
        return rows;
    }
    static async findAll(){
        const [rowns] = await pool.query(`SELECT * FROM atendimento`);
        return rowns;
    }
    static async update(id, { data, horaInicio, horaFim, resumo, id_chamado, id_consultor }){
        const [result] = await pool.query(
            `UPDATE atendimento SET data = ?, horaInicio = ?, horaFim = ?, resumo = ?, id_chamado = ?, id_consulto = ? WHERE id= ?`,
            [data, horaInicio, horaFim, resumo, id_chamado, id_consultor, id]
        );
        return result.affectedRows > 0;
    }
    static async delete(id){
        const [result] = await pool.query(`DELETE FROM atendimento WHERE id = ?`, [id]);
        return result.affectedRows > 0;
    }
}

module.exports = Atendimento;