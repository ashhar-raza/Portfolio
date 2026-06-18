import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Portfolio from './Portfolio.jsx'
import Portfolio3 from './Portfolio3.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <Portfolio/>
    {/* <Portfolio3 /> */}
  </StrictMode>,
)
