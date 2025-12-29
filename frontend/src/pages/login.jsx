import Navbar from "../components/navbar";
import "./login.css";

const Login = () => {
  return (
    <>
      <Navbar />

      <div className="login-wrapper">
        <div className="login-card">
          <h2>welcome back</h2>
          <p>log in to get snack recommendations</p>

          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />

          <button>login</button>
        </div>
      </div>
    </>
  );
};

export default Login;
