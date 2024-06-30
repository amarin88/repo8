import passport from "passport";
import {request, response} from "express";

export const passportCall = ( strategy ) => {


    return async (req = request, res = response , next ) => {

        passport.authenticate(strategy, (error, user, info) => //done (null, false, {response: "texto"})
            {
                if(error) return next(error);
                if(!user) return res.status(401).json({status: "error", response : info.response ? info.response : info.toString()});//En el caso de haber error lo retornamos como string

                req.user = user; //En caso de no haber error devolvemos el usuario

                next();
        })(req,res,next);
    };
};//Función de orden superior (retornamos una función dentro de una función) que utilizaremos como middleware de autenticación de usuario

export const authorization = ( role ) => {
    
    return async (req = request, res = response , next ) =>{
        if(!req.user) return res.status(401).json({status: "error", response: "User not authorized"});
        if(req.user.role !== role) return res.status(403).json({status: "error", response: "User without permissions"});
        
        next();
    }
};//Función de orden superior que utilizaremos como middleware para validar el role("rol") del usuario.