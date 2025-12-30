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
  const [foodPref, setFoodPref] = useState("");

  const handleRegister = async (e) => {
    console.log("register clicked");
    e.preventDefault();

    try {
      await api.post("auth/register", {
        name,
        email,
        password,
        food_pref: foodPref,
      });

      navigate("/verify2fa", { state: { email } });
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
          <p>we’ll send a 2fa code to your email</p>

          <form className="register-form" onSubmit={handleRegister}>
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

            <select
              className="register-select"
              value={foodPref}
              onChange={(e) => setFoodPref(e.target.value)}
              required
            >
              <option value="" disabled>
                food preference
              </option>
              <option value="veg">veg</option>
              <option value="non-veg">non-veg</option>
              <option value="vegan">vegan</option>
            </select>

            <Button variant="olive" text="register" onClick={handleRegister}/>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
