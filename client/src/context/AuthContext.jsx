import { createContext, useState, useContext } from "react";
import { registerRequest, loginRequest } from '../api/auth';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación
    const [user, setUser] = useState(null); // Datos del usuario
    const [loading, setLoading] = useState(false); // Indicador de carga

    // Registro de usuario
    const signup = async (user) => {
        try {
            setLoading(true);
            const res = await registerRequest(user); // Llamada al endpoint de registro
            console.log("Registro exitoso:", res.data); // Debugging de respuesta
            setUser(res.data); // Guardando el usuario en el estado
            setIsAuthenticated(true); // Cambiando el estado de autenticación
        } catch (error) {
            console.error("Error en el registro:", error);
            throw error.response?.data?.message || "Error al registrar el usuario";
        } finally {
            setLoading(false);
        }
    };

    // Inicio de sesión
    const login = async (user) => {
        try {
            setLoading(true);
            const res = await loginRequest(user); // Llamada al endpoint de login
            console.log("Login exitoso:", res.data); // Debugging
            setUser(res.data); // Guardando el usuario en el estado
            setIsAuthenticated(true); // Cambiando el estado de autenticación
        } catch (error) {
            console.error("Error en el login:", error);
            // Devolver un mensaje específico según el error
            if (error.response?.status === 400) {
                throw "Contraseña incorrecta.";
            } else if (error.response?.status === 404) {
                throw "Usuario no encontrado. Por favor regístrate.";
            } else {
                throw "Error del servidor. Inténtalo más tarde.";
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{
            signup,
            login,
            user,
            isAuthenticated,
            loading // Indicador de carga para usar en las vistas si es necesario
        }}>
            {children}
        </AuthContext.Provider>
    );
};