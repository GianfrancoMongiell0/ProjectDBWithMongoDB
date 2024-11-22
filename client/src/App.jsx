import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import TaskPage from './pages/TaskPage';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<h1 className='text-center text-4xl font-mono'>Home Page</h1>} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/tasks' element={<TaskPage />} />
          <Route path='/add-tasks' element={<h1 className='text-center text-4xl font-mono'>New Task</h1>} />
          <Route path='/tasks/:id' element={<h1 className='text-center text-4xl font-mono'>Update Task</h1>} />
          <Route path='/profile' element={<h1 className='text-center text-4xl font-mono'>Profile</h1>} />
        </ Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}