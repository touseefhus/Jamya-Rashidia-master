import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Add from './Components/Pages/Add';
import Home from './Components/Pages/Home';
import StudentsRecord from './Components/Pages/StudentsRecord';
import TeachersRecord from './Components/Pages/TeachersRecord';
import EmployersRecord from './Components/Pages/EmployersRecord';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './Components/Pages/Signup';
import Login from './Components/Pages/Login';
import { useAuthContext } from './hooks/useAuthContext';

// const{user}=useAuthContext();

function App() {

  const{user}=useAuthContext();

  return (
    <>
    <BrowserRouter>
    <Navbar/>

    <Routes>

      <Route path='/' element={user? <Home/> : <Navigate to = '/'/>}/>
      <Route path='/Enroll' element={user? <Add/> : <Navigate to='/login'/>}/>
      <Route path='/students' element={user? <StudentsRecord/> : <Navigate to='/login'/>}/>
      <Route path='/teachers' element={user? <TeachersRecord/> : <Navigate to='/login'/>}/>
      <Route path='/labhours' element={user? <EmployersRecord/> : <Navigate to='/login'/>}/>
      <Route path='/signup' element={!user ? <Signup/> : <Navigate to='/'/>}/>
      <Route path='/login' element={!user ? <Login/> : <Navigate to='/'/>}/>

    </Routes>

    </BrowserRouter>
    </>
      );
}

export default App;
