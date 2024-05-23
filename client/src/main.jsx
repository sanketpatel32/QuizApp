import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"

import App from './App.jsx'
import './index.css'

// --------------------------- CONTEXT ------------------------------
import SideBarContextProvider from './context/SideBarContext.jsx'
import ModalContextProvider from './context/ModalContext.jsx'
import AuthorizationContextProvider from './context/AuthorizationContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(

  <AuthorizationContextProvider>
    <SideBarContextProvider>
      <ModalContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ModalContextProvider>
    </SideBarContextProvider>
  </AuthorizationContextProvider>
)
