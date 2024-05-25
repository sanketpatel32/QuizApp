// App.js or App.tsx
import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer, toast, Bounce } from 'react-toastify';


import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/authorization/Login';
import Home from './pages/homepage/Home';

import { AuthorizationContext } from './context/AuthorizationContext';

function App() {

  const {isLoggedIn}  = useContext(AuthorizationContext);
  
  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" // Corrected syntax for transition
      />

      <Routes>
        <Route path="/" element={<Login />} />
        {isLoggedIn && <Route path="/home" element={<Home />} />}
        
      </Routes>
    </div>
  );
}

export default App;
