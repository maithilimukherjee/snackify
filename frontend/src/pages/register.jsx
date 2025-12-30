import Navbar from "../components/navbar";
import Button from "../components/button";
import "./register.css";

const Register = () => {
  return (
    <>
      <Navbar isAuthenticated={false}/>

      <div className="register-wrapper">
        <div className="register-card">
          <h2>create your account</h2>

          <form className="register-form">
            <input type="text" placeholder="name" />
            <input type="email" placeholder="email" />
            <input type="password" placeholder="password" />

            <select className="register-select" defaultValue="">
              <option value="" disabled>
                food preference
              </option>
              <option value="veg">veg</option>
              <option value="non-veg">non-veg</option>

            </select>

            <Button variant="olive" text="register" />
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
