import { z } from 'zod'

export const registerSchema = z.object({
    email: z.string({ required_error: 'Email is required' }).email(),
    password: z.string({ required_error: 'Password is required' }).min(6, { message: 'Password must be at least 6 characters' }).trim(),
    name: z.string({ required_error: 'Name is required' }).min(3),
    lastname: z.string({ required_error: 'Lastname is required' }).min(3),
    username: z.string({ required_error: 'Username is required' }).min(3),
})

export const loginSchema = z.object({
    username: z.string({ required_error: 'Username is required' }).min(3),
    password: z.string({ required_error: 'Password is required' }).min(6, { message: 'Password must be at least 6 characters' }).trim(),
})