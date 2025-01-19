const express = require('express');
const path = require('path');
const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// Servir arquivos estáticos do React
app.use(express.static(path.join(__dirname, 'tasket', 'build')));


// Rota para servir o React em qualquer rota não capturada
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'tasket', 'build', 'index.html'));
});

// Aqui vai a definição do seu React App para gerenciar o React Router
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'tasket', 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});