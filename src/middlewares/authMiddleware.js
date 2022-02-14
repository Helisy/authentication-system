if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
const { verify } = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    const acessToken = req.header("acessToken");

    if(!acessToken){
        return res.redirect('auth/login');
    }

    try{
        const validToken = verify(acessToken, `${process.env.TOKEN_SECRETE}`);

        if(validToken)
        {
            return next();
        }
    }catch(error)
    {

    }
}

module.exports = { validateToken };