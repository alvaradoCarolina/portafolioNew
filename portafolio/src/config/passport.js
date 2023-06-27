
//importacion de passport
const passport = require('passport')
//importar el modelo user
const User = require('../models/User')
//definicion de la estrategia
const LocalStrategy = require('passport-local').Strategy


//configuracion de la estrategia
passport.use(new LocalStrategy({
    usernameField:'email',
    passwordField:'password'
},async(email,password,done)=>{
    //traer al usuario en base al email
    const userBDD = await User.findOne({email})
    //validacion del usuario
    if(!userBDD) return done("Lo sentimos, el email no se encuentra registrado",false,)
    //validacion de las contraseñas
    const passwordUser = await userBDD.matchPassword(password)
    //validacion del pasword del formulario vs el de la bdd
    if(!passwordUser) return done("Lo sentimos, los passwords no coinciden",false)
    //retornar el usuario 
    return done(null,userBDD)
}))


//serializacion del usuario
passport.serializeUser((user,done)=>{
    done(null,user.id)
})

//deserializacion del usuario
passport.deserializeUser(async (id, done) => {
    //traer el usuario en base al id de la sesion
    const userDB  = await User.findById(id).exec();
    return done(null,userDB)
});