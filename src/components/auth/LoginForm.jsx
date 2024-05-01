import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenValid } from "../../functions/utiles";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [setError] = useState("");
  const [ValidToken, setValidToken] = useState(false);

  const navigate = useNavigate();
  const isVtoken = async () => {
    const isvalid = await isTokenValid();
    setValidToken(isvalid);
  };
  useEffect(() => {
    isVtoken();
    if (ValidToken) {
      navigate("/dashBoard");
    }
  }, [ValidToken]);

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        username,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      navigate("/dashBoard");
    } catch (err) {
      setError("Erreur lors de la connexion.");
      console.error("Erreur de connexion :", err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <div className="mb-4">
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
