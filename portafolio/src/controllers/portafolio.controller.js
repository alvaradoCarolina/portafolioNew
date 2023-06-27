//1hacer importacion del modelo
const Portfolio = require('../models/Portfolio')


const renderAllPortafolios = async(req,res)=>{
    const portfolios = await Portfolio.find().lean()
    res.render("portafolio/allPortfolios",{portfolios})
}

const renderPortafolio = (req,res)=>{
    res.send('Mostrar el detalle de un portafolio')
}

//presentar formulario
const renderPortafolioForm = (req,res)=>{
    res.render('portafolio/newFormPortafolio')
}

//capturar datos del formulari para almacenar en bdd
const createNewPortafolio =async (req,res)=>{
    //2 desestructurar
    const {title, category,description} = req.body
    //3 crear una nueva instancia
    const newPortfolio = new Portfolio({title,category,description})
    //4 ejecutar el metodo save
    await newPortfolio.save()
    res.redirect('/portafolios')
}

const renderEditPortafolioForm =async(req,res)=>{
    //a paritr del modelo llamara al metodo findByid
    const portfolio = await Portfolio.findById(req.params.id).lean()
    //con la variable portafolio pintar en la vista del formulario
    res.render('portafolio/editPortfolio',{portfolio})
}

const updatePortafolio = async(req,res)=>{
    //capturamos datos del formulario
    const {title,category,description}= req.body
    //a partir del modelo llamar al metodo findbyidandupdate
    //pasando a la funcion el id del portafolio y los datos a modificar
    await Portfolio.findByIdAndUpdate(req.params.id,{title,category,description})
    //redirect
    res.redirect('/portafolios')
}

const deletePortafolio = async(req,res)=>{
    await Portfolio.findByIdAndDelete(req.params.id)
    res.redirect('/portafolios')
}


//export nombrado
module.exports ={
    renderAllPortafolios,
    renderPortafolio,
    renderPortafolioForm,
    createNewPortafolio,
    renderEditPortafolioForm,
    updatePortafolio,
    deletePortafolio
}