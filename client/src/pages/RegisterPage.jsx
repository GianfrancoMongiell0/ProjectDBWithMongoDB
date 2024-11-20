import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function RegisterPage() {
    const { register, handleSubmit, formState: {
        errors
    } } = useForm() // Inicializando el hook useForm
    const { signup, isAuthenticated } = useAuth() // Obteniendo la función signup del contexto AuthContext
    const navigate = useNavigate() // Obteniendo la función navigate de react-router-dom

    useEffect(() => {
        if (isAuthenticated)  // Si el usuario está autenticado
            navigate('/tasks') // Redirigir al usuario a la página de perfil
    }, [isAuthenticated])

    const onSubmit = handleSubmit(async (values) => { // Creando la función onSubmit
        signup(values) // Llamando a la función signup con los valores del formulario
    })

    return (
        <div className='flex items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8'>
            <div className='bg-zinc-800 w-full max-w-md p-6 sm:p-8 lg:p-10 rounded-md shadow-lg'>
                <form className='space-y-4' onSubmit={onSubmit}>

                    <input type="text" {...register('name', { required: true })} placeholder='Name' className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' />
                    {errors.name && (<p className='text-red-500'>name is requiered</p>)}
                    <input type="text" {...register('lastname', { required: true })} placeholder='Last Name' className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' />
                    {errors.lastname && (<p className='text-red-500'>lastname is requiered</p>)}
                    <input type="text" {...register('username', { required: true })} placeholder='Username' className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' />
                    {errors.username && (<p className='text-red-500'>Username is requiered</p>)}
                    <input type="email" {...register('email', { required: true })} placeholder='Email' className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' />
                    {errors.email && (<p className='text-red-500'>Email is requiered</p>)}
                    <input type="password" {...register('password', { required: true })} placeholder='Password' className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' />
                    {errors.password && (<p className='text-red-500'>password is requiered</p>)}

                    <button type='submit' className='w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors'>Register</button>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage
