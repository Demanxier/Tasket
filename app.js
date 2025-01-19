const express = require('express');
const usuarioRoutes = require('./routes/usuarioRoutes');
const roleRoutes = require('./routes/roleRoutes');
const statusRoutes = require('./routes/statusRoutes');
const consultorRoutes = require('./routes/consultorRoutes');
const atendimentoRoutes = require('./routes/atendimentoRoutes');
const tarefaRoutes = require('./routes/tarefaRoutes');
const chamadoRoutes = require('./routes/chamadoRoutes');
const errorHandler = require('./middleware/errorHandler');
const formatDatesMiddleware = require('./middleware/formatDatesMiddleware');

const app = express();

// Aplica o middleware de formatação de datas
app.use(formatDatesMiddleware);

app.use(express.json());
app.use('/api/usuario', usuarioRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/status', statusRoutes);
app.use('/api/consultor', consultorRoutes);
app.use('/api/atendimento', atendimentoRoutes);
app.use('/api/tarefa', tarefaRoutes);
app.use('/api/chamado', chamadoRoutes);
app.use(errorHandler);

module.exports = app;