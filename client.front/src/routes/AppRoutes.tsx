import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import Admin from "../pages/Admin"
import Error from "../pages/Error"
import Login from "../pages/Login"
import ProtectedRoute from "./ProtectedRoute"
function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<ProtectedRoute />} >
          <Route path="/admin" element={<Admin />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error />} />
    </Routes>
  )
}

export default AppRoutes