import './App.css'
import {Route, Routes} from "react-router-dom"
import Login from './pages/authorization/Login'
import Home from './pages/homepage/Home'
function App() {

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<Home/>} />
      </Routes>
    </div>

  )
}

export default App
