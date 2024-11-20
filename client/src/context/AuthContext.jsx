import { createContext, useState, useContext } from "react";
import { registerRequest } from '../api/auth'

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const signup = async (user) => {
        try {
            const res = await registerRequest(user) // Haciendo la petición de registro
            console.log(res.data) // Mostrando la respuesta de la petición
            setUser(res.data) // Guardando el usuario en el estado
            setIsAuthenticated(true) // Cambiando el estado de autenticación
        } catch (error) {
            console.error(error);

        }
    }

    return (
        <AuthContext.Provider value={{
            signup,
            user,
            isAuthenticated
        }}>
            {children}
        </AuthContext.Provider>
    )
}