import React, { useState } from "react";
import { TextField, Checkbox, Button, FormControlLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SecureContent from "./SecureContent";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post(
        "http://localhost:8080/auth/register",
        {
          username: username,
          password: password,
          admin: isChecked,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then(() => {
        navigate("/dashBoard");
      });
  };

  return (
    <SecureContent>
      <div className="flex justify-center items-center h-screen">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-6 bg-gray-100 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold mb-6">Register</h2>
          <div className="mb-4">
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="mb-4">
            <TextField
              type="password"
              label="Password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="mb-4">
            <FormControlLabel
              control={
                <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
              }
              label="est un admin"
            />
          </div>
          <div className="mb-4">
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Register
            </Button>
          </div>
        </form>
      </div>
    </SecureContent>
  );
};

export default RegisterPage;
