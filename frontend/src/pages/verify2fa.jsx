import Navbar from "../components/navbar";
import Button from "../components/button";
import "./verify2fa.css";

const Verify2FA = () => {
  return (
    <>
      <Navbar />

      <div className="verify-wrapper">
        <div className="verify-card">
          <h2>verify your identity</h2>
          <p>enter the 6-digit code sent to your device</p>

          <form className="verify-form">
            <input
              type="text"
              maxLength="6"
              placeholder="••••••"
              className="otp-input"
            />

            <Button variant="olive" text="verify" />
          </form>

          <div className="verify-footer">
            didn’t receive the code? <span>resend</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Verify2FA;
