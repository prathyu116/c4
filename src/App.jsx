import { Link, Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Logout } from "./components/Logout";
import { NewOrder } from "./components/NewOrder";
import { Orders } from "./components/Orders";
import { ProtectedRoute } from "./components/ProtextedRoute";

import './App.css'
import { AuthContext } from "./context/Authcontext";
import { useContext } from "react";


function App() {    
  const { isAuth } = useContext(AuthContext);

  return (
    <div className="App">
      <div>
        <Link className="nav-home" to="/">
          Home
        </Link>
        {/* Show either login or logout below */}
        {!isAuth ? (
          <Link className="nav-login" to="/login">
            Login
          </Link>
        ) : (
          <Link className="nav-logout" to="/logout">
            Logout
          </Link>
        )}
      </div>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Logout" element={<Logout />}></Route>
        <Route path="/Orders" element={<Orders />}></Route>
        <Route path="/NewOrder" element={<NewOrder />}></Route>

        {/* Routes are as follows:
        Route      Component
        /           Home
        /login      Login
        /logout     Logout
        /orders     Orders    Protected
        /neworder   NewOrder  Protected
        */}
      </Routes>
    </div>
  );
}

export default App;
