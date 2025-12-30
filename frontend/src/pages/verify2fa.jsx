import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/navbar";
import Button from "../components/button";
import "./register.css"; // we can reuse register-card styles

const Verify2FA = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/verify2fa", {
        email,
        twofa_code: code,
      });

      // save JWT token to localStorage
      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Invalid code. Try again!");
    }
  };

  return (
    <>
      <Navbar isAuthenticated={false} />

      <div className="register-wrapper">
        <div className="register-card">
          <h2>verify your 2FA</h2>
          <p>We sent a 2FA code to {email}</p>

          <form className="register-form" onSubmit={handleVerify}>
            <input
              type="text"
              placeholder="Enter 2FA code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />

            {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

            <Button variant="olive" text="verify" />
          </form>
        </div>
      </div>
    </>
  );
};

export default Verify2FA;
