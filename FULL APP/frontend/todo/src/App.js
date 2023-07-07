import "./App.css";
import Signup from "./components/Signup"
import Login from "./components/Login"
import Home from "./components/Home"
import Navbar from "./components/Navbar"
import {Routes, Route} from 'react-router-dom'

function App() {

     return (
       <div>
         <Navbar />
         <Routes>
           <Route exact path="/" element={<Home />} />
           <Route path="/signup" element={<Signup />} />
           <Route path="/login" element={<Login />} />
         </Routes>
       </div>
     );
}

export default App;