import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Button from "../components/button";
import api from "../api/axios";
import "./profile.css";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    food_pref: ""
  });
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // fetch user data on mount
    const fetchProfile = async () => {
      try {
        const res = await api.get("/user/profile"); // backend endpoint should return {name, email, food_pref}
        setUser(res.data);
      } catch (err) {
        console.error("failed to fetch profile", err);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setUser(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleUpdate = async () => {
    try {
      await api.put("/user/profile", user); // backend endpoint to update user profile
      setSuccess("Profile updated successfully!");
      setTimeout(() => setSuccess(""), 3000); // clear message after 3s
    } catch (err) {
      console.error("failed to update profile", err);
      alert("update failed");
    }
  };

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
            onChange={handleChange}
            disabled
          />

          <label htmlFor="email">email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            disabled
          />

          <label htmlFor="food_pref">food preference</label>
          <select
            name="food_pref"
            value={user.food_pref}
            onChange={handleChange}
          >
            <option value="" disabled>select preference</option>
            <option value="veg">veg</option>
            <option value="non-veg">non-veg</option>
            <option value="vegan">vegan</option>
          </select>

          <Button variant="olive" text="update profile" onClick={handleUpdate} />

          {success && <p className="success-msg">{success}</p>}
        </div>
      </div>
    </>
  );
};

export default Profile;
