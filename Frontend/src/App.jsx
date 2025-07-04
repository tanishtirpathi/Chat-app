import { Routes, Route, Navigate } from "react-router-dom"
import Homepage from "./pages/Homepage"
import Signup from "./pages/signup"
import Login from "./pages/Login"
import Toaster from "react-hot-toast"
import Profile from "./pages/profile"
import { useAuthstore } from "./store/useAuthstore"
import Navbar from "./components/navbar"
import { useEffect } from "react"
import {Loader} from "lucide-react"
function App() {
const {authUser, checkAuth } = useAuthstore()
useEffect(()=>{
  checkAuth()
},[checkAuth])
console.log(authUser)
if(!checkAuth && !authUser)return(
  <div className="flex items-center justify-center h-screen ">
    <Loader className="size-10 animate-spin"/>
  </div>
)
  return (
    <>
   <div data-theme="retro"> 
    <Navbar/>
    <Routes>
      <Route path="/" element={authUser? <Homepage/>: <Navigate to="/login"/>}/>

       <Route path="/signup" element={!authUser? <Signup/>:<Navigate to="/"/>} />

        <Route path="/login" element={!authUser? <Login/>:<Navigate to="/"/>}/>

          <Route path="/profile" element={authUser? <Profile/>:<Navigate to="/login"/>}/>

    </Routes>

    <Toaster/>
   </div>
    </>
  )
}

export default App
