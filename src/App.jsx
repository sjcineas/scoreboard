import CheckPoints from "./pages/CheckPoints";
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/checkpoints" element={<CheckPoints/>}/>
      </Routes>  
    </BrowserRouter>
  );
};

export default App;