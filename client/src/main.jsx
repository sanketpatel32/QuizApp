
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom"
import SideBarContextProvider from './context/SideBarContext.jsx'
import ModalContextProvider from './context/ModalContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <SideBarContextProvider>
    <ModalContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ModalContextProvider>
  </SideBarContextProvider>
)
