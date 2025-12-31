import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Button from "../components/button";
import api from "../api/axios";
import "./register.css";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const handleRegister = async (e) => {
    console.log("register clicked");
    e.preventDefault();

    try {
      await api.post("auth/register", {
        name,
        email,
        password,
      });

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("registration failed");
    }
  };

  return (
    <>
      <Navbar isAuthenticated={false} />

      <div className="register-wrapper">
        <div className="register-card">
          <h2>create your account</h2>

          <form className="register-form" >
            <input
              type="text"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button variant="olive" text="register" onClick={handleRegister}/>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
