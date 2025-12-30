import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Button from "../components/button";
import api from "../api/axios"; 
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", { email, password });

      // save JWT token
      localStorage.setItem("token", res.data.token);

      // redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "something went wrong, try again"
      );
    }
  };

  return (
    <>
      <Navbar isAuthenticated={false} />

      <div className="login-wrapper">
        <div className="login-card">
          <h2>welcome back</h2>
          <p>log in to get snack recommendations</p>

          <form onSubmit={handleLogin} className="login-form">
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

            {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

            <Button text="login" onClick={handleLogin}/>
          </form>

          <span className="login-footer">
            don't have an account? <a href="/register">register</a>
          </span>
        </div>
      </div>
    </>
  );
};

export default Login;
