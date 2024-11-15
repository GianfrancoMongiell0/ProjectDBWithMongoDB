import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const authRequired = (req, res, next) => { // Middleware para validar el token

    const { token } = req.cookies // Obteniendo el token de las cookies
    if (!token)
        return res.status(401).json({ message: "No token, no autorizado :(" })

    jwt.verify(token, TOKEN_SECRET, (err, user) => { // Verificando el token

        if (err) return res.status(403).json({ message: "Token inválido :(" }) 

        req.user = user // Guardando el usuario en el objeto req
        
        next();

    })
}