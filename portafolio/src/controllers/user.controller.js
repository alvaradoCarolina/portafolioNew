
//presentar dormulario para le registro
const renderRegisterForm =(req,res)=>{
    res.render('user/registerForm')
}

//capturar los datos del formulario y guardar en bdd
const registerNewUser = async(req,res)=>{
    //desestructurar los datos del formulario
    const{name,email,password,confirmpassword} = req.body
    //validar si todos los campos estan completos
    if (Object.values(req.body).includes("")) return res.send("Lo sentimos, debes llenar todos los campos")
    //validacion de contraseñas
    if(password != confirmpassword) return res.send("Lo sentimos, los passwords no coinciden")
    //traer el usuario en base al email
    const userBDD = await User.findOne({email})
    //verificar si existe el usuario
    if(userBDD) return res.send("Lo sentimos, el email ya se encuentra registrado")
    //guardar el resgistro en la bdd
    const newUser = await new User({name,email,password,confirmpassword})
    //encriptar el pasword
    newUser.password = await newUser.encrypPassword(password)
    newUser.save()
    res.redirect('/user/login')
}



//presentar el formulario para el login
const renderLoginForm =(req,res)=>{
    res.render('user/loginForm')
}

//cpturar los datos del formulario y hacer el login en bdd
const loginUser =(req,res)=>{
    res.send('login user')
}

//capturar los datos del formulario y hacer el logout en bdd
const logoutUser =(req,res)=>{
    req.logout((err)=>{
        if (err) return res.send("Ocurrio un error") 
        res.redirect('/');
    });
}

module.exports={
    renderRegisterForm,
    registerNewUser,
    renderLoginForm,
    loginUser,
    logoutUser
}