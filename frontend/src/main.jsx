import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.jsx"

// React Router Dom
import { BrowserRouter as Router } from "react-router-dom"

// Redux
import { Provider } from "react-redux"
import store from "./store/store.js"

// Sonner Toast | Notification Alert
import { Toaster } from "sonner"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <App />
        <Toaster richColors position="top-right" />
      </Router>
    </Provider>
  </StrictMode>
)
