import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import { getTask, getTasks, deleteTasks, updateTasks, createTasks } from '../controllers/tasks.controller.js'
import { validateSchema } from '../middlewares/validator.middlewares.js'
import { createTaskSchema } from '../schemas/task.schema.js';

const router = Router(); // Creando una nueva instancia de Router

router.get('/tasks', authRequired, getTasks)
router.get('/tasks/:id', authRequired, getTask)
router.post('/tasks', authRequired, validateSchema(createTaskSchema), createTasks)
router.delete('/tasks/:id', authRequired, deleteTasks)
router.put('/tasks/:id', authRequired, updateTasks)

export default router;