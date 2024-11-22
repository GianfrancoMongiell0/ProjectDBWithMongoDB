import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [user, setUser] = useState({ username: "", password: "" });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            await login(user);
            navigate("/tasks"); // Redirige al home si el login es exitoso
        } catch (err) {
            setError(err); // Muestra el mensaje de error lanzado desde AuthContext
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm animate-fade-in">
                <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
                    Bienvenido a la Página de Login
                </h1>
                <p className="text-center text-gray-600 mb-6">
                    Inicia sesión para continuar y explorar nuestras funcionalidades.
                </p>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Nombre de Usuario
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none text-black"
                            placeholder="Ingresa tu nombre de usuario"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none text-black"
                            placeholder="Ingresa tu contraseña"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg shadow-lg hover:scale-105 transform transition duration-300"
                    >
                        Iniciar Sesión
                    </button>
                </form>
                <p className="text-center text-sm text-gray-500 mt-6">
                    ¿No tienes una cuenta?{" "}
                    <a href="/register" className="text-pink-500 font-semibold hover:underline">
                        Regístrate aquí
                    </a>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;