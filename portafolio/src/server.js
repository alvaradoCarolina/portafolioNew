const express = require('express')
const path = require('path');
const {engine} = require('express-handlebars')
const methodOverride = require('method-override');
const passport = require('passport');
const session = require('express-session');


//inicializacion
const app = express()
//invocar el archivo passport
require('./config/passport')


//configuraciones
app.set('port',process.env.port || 3000)
app.set('views',path.join(__dirname,'views'))

app.engine('.hbs',engine({
    defaultLayout:'main',
    layoutsDir:path.join(app.get('views'),'layouts'),
    partialsDir:path.join(app.get('views'),'partials'),
    extname:'.hbs'
}))
app.set('views engine','.hbs')


//middlewares
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))
//creamos la key para el servidor -secret
app.use(session({ 
    secret: 'secret',
    resave:true,
    saveUninitialized:true
}));
//inicalizar passport
app.use(passport.initialize())
//inicalizar session
app.use(passport.session())


//variables globales
app.use((req,res,next)=>{
    res.locals.user = req.user?.name || null
    next()
})


//rutas
app.use(require('./routers/portafolio.routes'))
app.use(require('./routers/user.routes'))



//archivos estaticos
app.use(express.static(path.join(__dirname,'public')))

module.exports = app