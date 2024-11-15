import { TOKEN_SECRET } from "../config.js"
import jwt from "jsonwebtoken"

export function createAccessToken(payload) {

    // Creando un token de autenticación
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            TOKEN_SECRET, {
            expiresIn: "15m"
        }, (err, token) => {
            if (err) reject(err)
            resolve(token)
        }
        )
    })
}