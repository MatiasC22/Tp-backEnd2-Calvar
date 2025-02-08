import passport from 'passport';
import local from 'passport-local';
import GitHubStrategy from 'passport-github2'
import {validatePassword, createHash} from '../utils/bcript.js';
import userModel from '../models/user.js';
import { githubCliSecret, githubCliId } from '../servidor.js';


const localStrategy = local.Strategy 

const initalizatePassport = () => {
    passport.use('register', new localStrategy({passReqToCallback: true, usernameField:'email'}, async(req,username, password, done)=>{
        try {
            const { first_name, last_name, email, password, age } = req.body;

            const findUser = await userModel.findOne({email: email})

            
            if (!findUser){
                
                const user = await userModel.create({
                    first_name,
                    last_name,
                    email,
                    password: createHash(password),
                    age
                })
                return done(null, user) 
            }else{
                return done(null, false)// noi devuelvo un usuario pero no genero error 
            }                
        } catch (e) {
            console.log(e)
            return done(e)
        }
    }))

    passport.use('login', new localStrategy({usernameField:'email'}, async(username, password, done)=>{
        try {
            const user = await userModel.findOne({ email: username })
            if(user && validatePassword(password, user.password)){
                return done(null, user)
            }else{
                return done(null, false)
            }
        } catch (e) {
            return done(e)
        }
        
    
        
    }))


    passport.use('github', new GitHubStrategy({
        clientID: githubCliId, 
        clientSecret: githubCliSecret,
        callbackURL: "http://localhost:8080/api/sessions/githubcallback"
    }, async(accessToken, refreshToken, profile, done) => {
        try {
            
    
            let user = await userModel.findOne({ email: profile._json.email });
            if (!user) {
                const user = await userModel.create({
                    first_name: profile._json.name,
                    last_name: " ", // Dato no proporcionado por GitHub
                    email: profile._json.email, 
                    password: createHash('defaultPassword'),
                    age: 18 // Dato no proporcionado por GitHub
                });
                done(null, user);
            } else {
                
                done(null, user);
            }
        } catch (e) {
            console.log(e);
            return done(e);
        }
    }));
    

    //Pasos necesarios para trabajar via HTTP
    passport.serializeUser((user,done)=>{
        done(null,user._id)
    })

    passport.deserializeUser(async(id, done)=>{
        const user= await userModel.findById(id)
        done(null, user)

    })
}

export default initalizatePassport;