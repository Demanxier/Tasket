const mysql = require('mysql2/promise'); // Biblioteca para trabalhar com MySQL usando Promises
const dotenv = require('dotenv'); // Biblioteca para gerenciar variáveis de ambiente

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

/**
 * Criação de um pool de conexões com o banco de dados MySQL.
 * O pool gerencia múltiplas conexões simultâneas, permitindo maior eficiência em operações concorrentes.
 */
const pool = mysql.createPool({
    host: process.env.DB_HOST, // Endereço do servidor do banco de dados
    user: process.env.DB_USER, // Usuário para autenticação no banco
    password: process.env.DB_PASSWORD, // Senha do usuário do banco
    database: process.env.DB_NAME, // Nome do banco de dados a ser utilizado
    waitForConnections: true, // Aguarda conexões disponíveis no pool
    connectionLimit: 10, // Limite máximo de conexões simultâneas
    queueLimit: 0, // Tamanho máximo da fila de espera para conexões (0 = sem limite)
});

/**
 * Exporta o pool de conexões para ser utilizado em outras partes da aplicação.
 * Cada operação com o banco de dados deve utilizar esse pool para garantir boas práticas.
 */
module.exports = pool;