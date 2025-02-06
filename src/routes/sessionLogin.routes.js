import { Router } from "express";
import { githubLogin, login, register, viewLogin, viewRegister } from "../controllers/sessionLogin.controller.js";
import passport from "passport";

const sessionLogin = Router()

sessionLogin.get('/viewlogin', viewLogin)
sessionLogin.get('/viewregister', viewRegister)
sessionLogin.post('/login',passport.authenticate('login'), login)
sessionLogin.post('/register',passport.authenticate('register'),register)
sessionLogin.get('/github',passport.authenticate('github',{scope:['user:email']}),  async (req,res)=>{})
sessionLogin.get('/githubcallback', passport.authenticate('github', {failureRedirect:'/login'}), githubLogin)

export default sessionLogin;
