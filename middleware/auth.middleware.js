const {verifyJWT} = require('../utils/jwt');
const httpError = require('http-errors');

// thins function will check user request from front and verify if user exist

module.exports = (req,res,next) =>{
   

    try{
        let authToken = req.headers.authorization.split(' ');
        
        if( authToken[0].toLowerCase() != 'bearer') 
            throw new httpError(401,'Bad token');
        
        let token = authToken[1];

        if(token.length == 0)
            throw new httpError(401,'Bad token')
        
            const data = verifyJWT(token);

            if(!data) throw httpError(401,"failed to verify")

            req.user = data.id;
    
        next();

    }catch(e){
        throw new httpError(401,'Unauthorized');
    }        
        
}
