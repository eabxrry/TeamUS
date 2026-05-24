import Footer from "./layout/Footer"
import Header from "./layout/Header"
import { Toaster } from "react-hot-toast"
import AppRoutes from "./routes/AppRoutes"
import { BrowserRouter as Router } from "react-router-dom"
import axios from "axios"
import { useEffect } from "react"
import useDataStore from "./store/dataStore"
import Loading from "./components/Loading"
const apiUrl = import.meta.env.VITE_API_URL;
axios.defaults.baseURL = apiUrl
axios.defaults.withCredentials = true
function App() {
     const change = useDataStore((state) => state.change);
     const fetchData = useDataStore((state) => state.fetchData);
     const loading = useDataStore((state) => state.loading);
     useEffect(() => {
          fetchData();
     }, [change])
     if (loading) return <Loading />
  return (
    <Router>
      <Header />
      <Toaster />
      <AppRoutes />
      <Footer />
    </Router>
  )
}

export default App
