import CheckPoints from "./pages/CheckPoints";
//import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import MembershipForm from "./pages/MembershipForm"
import StudentInfo from "./pages/StudentInfo"
import AddEvent from "./pages/AddEvent";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CheckPoints/>}/>
        <Route path="/Checkpoints" element={<CheckPoints/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/MembershipForm" element={<MembershipForm/>}/>
        <Route path="/StudentInfo/:pantherId" element={<StudentInfo/>}/>
        <Route path="/addEvent" element={<AddEvent/>}/>
      </Routes>  
    </BrowserRouter>
  );
};

export default App;