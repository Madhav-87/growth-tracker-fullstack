const jwt=require('jsonwebtoken');

function generateToken(userData){
    const token=jwt.sign(
        {
            name:userData.name,
            id:userData.id
        },
        "security_key",
        {
            expiresIn :"1h"
        }
    )
    return token;
}

function verify(req,res,next){
        if(!req.headers.authorization){
            res.status(401).json({
            message: "Not valid user!"
            });
        }
        const token=req.headers.authorization.split(" ")[1];
        const decode=jwt.decode(token,'security_key');
        req.user=decode;
        next();
}

module.exports={
    generateToken,
    verify
}