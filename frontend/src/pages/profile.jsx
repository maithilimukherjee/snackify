import { useState } from "react";
import Navbar from "../components/navbar";
import Button from "../components/button";
import "./profile.css";

const Profile = () => {
  const [pfp, setPfp] = useState(null); // placeholder
  const [name, setName] = useState("dennis ritchie"); // placeholder
  const [email, setEmail] = useState("dennisritchie@abc.com"); // placeholder
  const [foodPref, setFoodPref] = useState("veg"); // placeholder
  const [success, setSuccess] = useState("");

  const handleUpdate = () => {
    // TODO: connect to backend to save food preference
    setSuccess("preferences updated successfully!");
    setTimeout(() => setSuccess(""), 3000);
  };

  return (
    <>
      <Navbar isAuthenticated={true} />

      <div className="profile-wrapper">
        <div className="profile-card">
          <h2>your profile</h2>

          <label>Name</label>
          <input type="text" value={name} disabled />

          <label>Email</label>
          <input type="email" value={email} disabled />

          <label>Food Preference</label>
          <select value={foodPref} onChange={(e) => setFoodPref(e.target.value)}>
            <option value="veg">veg</option>
            <option value="non-veg">non-veg</option>
            <option value="vegan">vegan</option>
          </select>

          {success && <p className="success-msg">{success}</p>}

          <Button variant="olive" text="update preferences" onClick={handleUpdate} />
        </div>
      </div>
    </>
  );
};

export default Profile;
