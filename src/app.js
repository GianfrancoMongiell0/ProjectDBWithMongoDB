import express from "express"
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
import tasksRoutes from "./routes/tasks.routes.js"

const app = express() // Creando una nueva aplicación express

app.use(morgan("dev")); // Usando morgan para mostrar los logs de las peticiones HTTP
app.use(express.json()); // Usando express.json() para parsear los datos en formato JSON
app.use(cookieParser()) // Usando cookieParser para manejar las cookies

app.use('/api', authRoutes) // Usando las rutas de autenticación
app.use('/api', tasksRoutes) // Usando las rutas de las tareas

export default app; 