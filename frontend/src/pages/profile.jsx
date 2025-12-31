import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import api from "../api/axios";
import "./profile.css";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: ""
  });
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // fetch user data on mount
    const fetchProfile = async () => {
      try {
        const res = await api.get("/user/profile"); // backend endpoint should return {name, email}
        setUser(res.data);
      } catch (err) {
        console.error("failed to fetch profile", err);
      }
    };

    fetchProfile();
  }, []);




  return (
    <>
      <Navbar isAuthenticated={true} />
      <div className="profile-wrapper">
        <div className="profile-card">
          <h2>your profile</h2>

          <label htmlFor="name">name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            disabled
          />

          <label htmlFor="email">email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            disabled
          />

        </div>
      </div>
    </>
  );
};

export default Profile;
