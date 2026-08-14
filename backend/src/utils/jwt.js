const jwt=require("jsonwebtoken");

const{
jwtAccessSecret,
jwtRefreshSecret,
jwtAccessExpiresIn,
jwtRefreshExpiresIn
}=require("../config/env");


const generateAccessToken=(userId)=>{
    return jwt.sign(
        {userId},
        jwtAccessSecret,
        {
            expiresIn:jwtAccessExpiresIn
        }
    );
};

const generateRefreshToken=(userId)=>{

    return jwt.sign(
        {userId},
        jwtRefreshSecret,
        {
            expiresIn:jwtRefreshExpiresIn,
        }
    );
};


const verifyAccessToken=(token)=>{
    return jwt.verify(token,jwtAccessSecret);
};

const verifyRefreshToken=(token)=>{
    return jwt.verify(token,jwtRefreshSecret);
};


module.exports={
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
}