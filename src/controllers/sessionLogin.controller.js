// import userModel from "../models/user.js"
// import { createHash, validatePassword } from "../utils/bcript.js"

export const login = async (req, res) => {
    try {
        if(!req.user){
            return res.status(401).send("Usuario o Contraseña no Validos")
        }
        req.session.user= {
            email:  req.user.email,
            first_name: req.user.first_name
        }
        res.status(200).send("Usuario Logueado Correctamente")
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al loguear Usuario")
    }
   
}


export const register = async (req, res) => {
    try {
        console.log(req.user);
        if(!req.user){// Consulto si en la session se encuentra mi usuario
            return res.status(400).send("El Mail ya se encuentra registrado")
        }            
         res.status(201).send('Usuario Registrado Correctamente'); 
    } catch (e) {
        console.log(e);
        res.status(500).send( "Error al registrar usuario");
    }
};

export const viewRegister = ( req,res)=>{
    res.status(200).render('templates/register',{})
}

export const viewLogin = ( req,res)=>{
    res.status(200).render('templates/Login',{})
}

export const githubLogin = (req,res)=> {
    
    try {
        if(!req.user){
            return res.status(401).send("Usuario o Contraseña no Validos")
        }
        req.session.user= {
            email:  req.user.email,
            first_name: req.user.first_name
        }
        res.status(200).redirect('/');
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al loguear Usuario")
    }
}