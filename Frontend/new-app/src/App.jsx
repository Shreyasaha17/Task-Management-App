
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Component/Header';
import { Route, Routes } from 'react-router-dom';
import Login from './Component/Login';
import Register from './Component/Register';
import TaskDashboard from './Component/TaskDashboard';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';

function App() {

  return (
    <>
     <Header/>
     <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/task-dashboard" element={<ProtectedRoute><TaskDashboard/></ProtectedRoute>} />
      </Routes>
    
    </>
  )
}

export default App
