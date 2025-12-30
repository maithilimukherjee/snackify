import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/navbar";
import Button from "../components/button";
import "./register.css";

const Verify2FA = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email =
    location.state?.email || localStorage.getItem("pendingEmail");

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!email) navigate("/");
  }, [email, navigate]);

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/verify2fa", {
        email,
        code,
      });

      setSuccess(true);
      setError("");
      localStorage.removeItem("pendingEmail");

      setTimeout(() => {
        navigate("/");
      }, 1800);
    } catch (err) {
      console.error(err);
      setError("invalid or expired code");
    }
  };

  return (
    <>
      <Navbar isAuthenticated={false} />

      <div className="register-wrapper">
        <div className="register-card">
          <h2>verify your 2fa</h2>
          <p>we sent a code to {email}</p>

          <form className="register-form" onSubmit={handleVerify}>
            <input
              type="text"
              placeholder="enter 2fa code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />

            {error && (
              <p style={{ color: "red", fontSize: "14px" }}>{error}</p>
            )}

            {success && (
              <p style={{ color: "#588157", fontSize: "14px" }}>
                you are verified. redirecting to login...
              </p>
            )}

            <Button variant="olive" text="verify" onClick={handleVerify}/>
          </form>
        </div>
      </div>
    </>
  );
};

export default Verify2FA;
