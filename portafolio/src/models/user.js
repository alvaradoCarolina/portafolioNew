const {Schema, model} = require('mongoose')
const bcrypt = require('bcryptjs')
const portafolio = require('./portafolio')

const userSchema = new Schema(
    {
        name:{
            typer:String,
            require:true
        },
        email:{
            typer:String,
            require:true
        },
        password:{
            typer:String,
            require:true
        },
    },
    {
        timestamps:true
    }
)

//metodo para crifrar el password del usuario
userSchema.methods.encrypPassword = async(password)=>{
    const salt = await bcrypt.genSalt(10)
    const passwordEncryp = await bcrypt.hash(password,salt)
    return passwordEncryp
}

//metodo para verificar si el password ingresado es el mismo de la BDD
userSchema.methods.matchPassword = async(password)=>{
    const response = await bcrypt.compare(password,this.password)
    return response
}

module.exports = model('portafolio',portafolioSchema)

