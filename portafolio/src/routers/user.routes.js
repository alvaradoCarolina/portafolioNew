// invocar la funcion router
const {Router} = require('express')

//invocar las funciones del controlador
const { 
    renderRegisterForm, 
    registerNewUser, 
    renderLoginForm, 
    loginUser, 
    logoutUser } = require('../controllers/user.controller')

//inicializar la funcion en el varibale router
    const router = Router()

//definir las rutas
router.get('/user/register',renderRegisterForm)
router.post('/user/register',registerNewUser)
router.get('/user/login',renderLoginForm)
router.post('/user/login',loginUser)
router.post('/user/logout',logoutUser)

//exportacion por default
module.exports =router