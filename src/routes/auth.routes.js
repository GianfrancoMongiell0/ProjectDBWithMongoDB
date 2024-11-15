import { Router } from "express";
import { register, login, logout, profile } from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router() // Creando una nueva instancia de Router

router.post('/register', register) // Creando una nueva ruta POST para registrar un usuario
router.post('/login', login) // Creando una nueva ruta POST para iniciar sesión
router.post('/logout', logout) // Creando una nueva ruta POST para cerrar sesión

router.get('/profile', authRequired, profile) // Creando una nueva ruta GET para obtener el perfil del usuario
export default router;