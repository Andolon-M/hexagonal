// Define las rutas de la aplicación y mapea las URLs a los controladores.
const express = require('express');
const UserController = require('../controllers/userController');
const UserValidator = require('../validator/userValidator');
const { autenticateToken } = require('../../infrastructure/middlewares/autenticateToken');

const router = express.Router();
const userController = new UserController();
const userValidator = new UserValidator();

router.get('/:id', autenticateToken, userValidator.validateUserId(), (req, res) => userController.getUser(req, res));
router.post('/', userValidator.validateUserData(), (req, res) => userController.createUser(req, res));
router.put('/:id', autenticateToken, userValidator.validateUserUpdateDataById(), (req, res) => userController.updateUser(req, res));
router.delete('/:id', autenticateToken, userValidator.validateUserId(), (req, res) => userController.deleteUser(req, res));
router.get('/search', autenticateToken, (req, res) => userController.searchUsers(req, res));

router.post('/login', (req, res) => userController.login(req, res));
module.exports = router; 