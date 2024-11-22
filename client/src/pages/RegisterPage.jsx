import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // Inicializando el hook useForm
  const { signup } = useAuth(); // Obteniendo la función signup del contexto AuthContext
  const navigate = useNavigate(); // Obteniendo la función navigate de react-router-dom
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = handleSubmit(async (values) => {
    try {
      await signup(values); // Llamando a la función signup con los valores del formulario
      setSuccessMessage("Registro exitoso. Redirigiendo al login...");
      setTimeout(() => {
        navigate("/login"); // Redirigir al usuario al login después de 2 segundos
      }, 2000);
    } catch (error) {
      console.error("Error en el registro:", error); // Manejo de errores en el registro
    }
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 p-4 sm:p-6 lg:p-8">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-xl transform transition-all hover:scale-105 duration-300">
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-green-500 mb-4">
          ¡Bienvenido a la Página de Registro!
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Crea una cuenta para comenzar a gestionar tus tareas y disfrutar de nuestras funcionalidades.
        </p>
        {successMessage && (
          <p className="text-green-500 text-center mb-4">{successMessage}</p>
        )}
        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Ingresa tu nombre"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none text-black"
            />
            {errors.name && <p className="text-red-500">El nombre es obligatorio.</p>}
          </div>
          <div>
            <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
              Apellido
            </label>
            <input
              type="text"
              {...register("lastname", { required: true })}
              placeholder="Ingresa tu apellido"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none text-black"
            />
            {errors.lastname && <p className="text-red-500">El apellido es obligatorio.</p>}
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Nombre de Usuario
            </label>
            <input
              type="text"
              {...register("username", { required: true })}
              placeholder="Elige un nombre de usuario"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none text-black"
            />
            {errors.username && <p className="text-red-500">El nombre de usuario es obligatorio.</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo Electrónico
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Ingresa tu correo electrónico"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none text-black"
            />
            {errors.email && <p className="text-red-500">El correo es obligatorio.</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="Crea una contraseña segura"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none text-black"
            />
            {errors.password && <p className="text-red-500">La contraseña es obligatoria.</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-2 rounded-lg shadow-lg hover:scale-105 transform transition duration-300"
          >
            Crear Cuenta
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-6">
          ¿Ya tienes una cuenta?{" "}
          <a href="/login" className="text-blue-500 font-semibold hover:underline">
            Inicia sesión aquí
          </a>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;