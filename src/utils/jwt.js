import jwt from 'jsonwebtoken'


let secretKey = "codercoder"

const generateToken = ()=>{

    /*
        param1: Objeto a guardar (user en este caso)
        param2 : Clave Privada 
        param3 : Tiempo de Vida del Token
    */


    const token = jwt.sign({user},secretKey,{expiresIn: '1h'})

}

generateToken({
    first_name:"Matias",
    last_name:"Calvar",
    email:"matias.calvar@gmail.com",
    age:18,
    rol:"Usuario"
 })

//export default generateToken;