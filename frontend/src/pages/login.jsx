import Navbar from "../components/navbar";
import Button from "../components/button";
import "./login.css";

const Login = () => {
  return (
    <>
      <Navbar isAuthenticated={false}/>

      <div className="login-wrapper">
        <div className="login-card">
          <h2>welcome back</h2>
          <p>log in to get snack recommendations</p>

          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />

          <Button text="login" />
          <span className="login-footer">
          don't have an account? <a href="/register">register</a>
          </span>
        </div>
      </div>
    </>
  );
};

export default Login;
