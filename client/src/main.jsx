
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom"
import SideBarContextProvider from './context/SideBarContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <SideBarContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </SideBarContextProvider>
)
