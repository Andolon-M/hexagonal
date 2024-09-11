const jwt = require('jsonwebtoken')

exports.autenticateToken =(req, res, next)=>{
    const authHeader = req.headers['authorization'];
    console.log(authHeader);
    
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);
    

    if (!token) return res.status(401).json({message: "Token no proporcionado.", token:false});

    jwt.verify(token, process.env.JWT_SECRET, (err, payload)=>{
        if (err) return res.status(403).json({message: "Token inválido.", token:false});
        console.log (payload);
        
        req.user = payload;
        next();
    });
}
