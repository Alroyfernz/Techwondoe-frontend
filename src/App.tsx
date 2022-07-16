import React, { useEffect } from "react";

import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./screens/Home/Home";
import Login from "./screens/Login/Login";
import { useNavigate } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  const navigate = useNavigate();
  function isLoggedIn(): boolean {
    const userData: string | null = localStorage.getItem("UserData");
    console.log(userData !== null);

    return userData !== null;
  }

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
    } else {
     

      navigate("/home");
    }
  }, [navigate]);
  return (
    <ChakraProvider>
      <div className="App">
        <div className="Box"></div>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </ChakraProvider>
  );
}

export default App;
