const express = require('express');
const UsuarioController = require('../controller/usuarioController');

/**
 * Arquivo de rotas responsável por definir os endpoints relacionados à entidade "Usuario".
 * Cada rota chama o método correspondente do controlador para processar as requisições.
 */
const router = express.Router();

/**
 * Endpoint para criar um novo usuário.
 * Método: POST
 * Rota: /usuario
 */
router.post('/', UsuarioController.createUsuario);
/**
 * Endpoint para obter a lista de todos os usuários.
 * Método: GET
 * Rota: /usuario
 */
router.get('/', UsuarioController.getAllUsuarios);
/**
 * Endpoint para obter os dados de um usuário específico pelo ID.
 * Método: GET
 * Rota: /usuario/:id
 */
router.get('/:id', UsuarioController.getUsuario);
/**
 * Endpoint para atualizar os dados de um usuário específico pelo ID.
 * Método: PUT
 * Rota: /usuario/:id
 */
router.put('/:id', UsuarioController.updateUsuario);
/**
 * Endpoint para deletar um usuário específico pelo ID.
 * Método: DELETE
 * Rota: /usuario/:id
 */
router.delete('/:id', UsuarioController.deleteUsuario);
/**
 * Endpoint para realizar o login de um usuário.
 * Método: POST
 * Rota: /usuario/login
 */
router.post('/login', UsuarioController.loginUsuario);

module.exports = router;