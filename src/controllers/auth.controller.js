import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';

export const register = async (req, res) => {
    const { name, lastname, username, email, password } = req.body // Obteniendo los datos del usuario

    try {
        const userFound = await User.findOne({ $or: [{ username }, { email }] }) // Buscando el usuario en la base de datos
        if (userFound) return res.status(400).json(["El nombre de usuario o el correo electrónico ya están en uso"]) // Verificando si el usuario ya existe

        const passwordHash = await bcrypt.hash(password, 10) // Hasheando la contraseña

        // Creando un nuevo usuario
        const newUser = new User({
            name,
            lastname,
            username,
            email,
            password: passwordHash
        })

        // Guardando el usuario en la base de datos
        const userSaved = await newUser.save()
        const token = await createAccessToken({ id: userSaved._id })
        res.cookie('token', token)

        // Respondiendo con el usuario guardado
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt

        })

    } catch (error) {
        res.status(500).json({ message: "Error al registrar el usuario" })
    }
}

export const login = async (req, res) => {
    const { username, password } = req.body // Obteniendo los datos del usuario

    try {
        const userFound = await User.findOne({ username }) // Buscando el usuario en la base de datos
        if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" }) // Verificando si el usuario existe

        const isMatch = await bcrypt.compare(password, userFound.password) // Comparando las contraseñas
        if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" }) // Verificando si la contraseña es correcta

        const token = await createAccessToken({ id: userFound._id })
        res.cookie('token', token)

        // Respondiendo con el usuario guardado
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt

        })

    } catch (error) {
        res.status(500).json({ message: "Error al registrar el usuario" })
    }
}

export const logout = async (req, res) => {
    // Eliminando la cookie
    res.cookie('token', "", {
        expires: new Date(0),
    })
    return res.sendStatus(200)
}

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id) // Buscando el usuario en la base de datos
    if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" }) // Verificando si el usuario

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    })

}