import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.jsx"

// React Router Dom
import { BrowserRouter as Router } from "react-router-dom"

// Sonner Toast | Notification Alert
import { Toaster, toast } from "sonner"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <App />
      <Toaster richColors position="top-right" />
    </Router>
  </StrictMode>
)
