import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Button from "../components/button";
import "./dashboard.css";

const Dashboard = () => {
  const [ingredients, setIngredients] = useState("");
  const [foodPref, setFoodPref] = useState("veg");

  const navigate = useNavigate();

  const handleRecommend = () => {
    if (!ingredients.trim()) {
      alert("enter some ingredients first");
      return;
    }

    navigate("/recommendRecipes", {
      state: {
        ingredients,
        preference: foodPref,
      },
    });
  };

  return (
    <>
      <Navbar isAuthenticated={true} />

      <div className="dashboard-wrapper">
        <div className="fridge-card">
          <h2>what's in the fridge?</h2>
          <p>enter ingredients you have and we'll recommend recipes</p>

          <input
            type="text"
            placeholder="chicken, tomatoes, spinach"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />

          <select
            value={foodPref}
            onChange={(e) => setFoodPref(e.target.value)}
            className="dashboard-select"
          >
            <option value="veg">veg</option>
            <option value="non-veg">non-veg</option>
            <option value="vegan">vegan</option>
          </select>

          <Button
            variant="olive"
            text="recommend"
            onClick={handleRecommend}
          />
        </div>

        <div className="dashboard-cards">
          <div className="info-card">
            <h3>about snackify</h3>
            <p>the "why" behind this app</p>
            <Button text="view" />
          </div>

          <div className="info-card">
            <h3>send recipe ideas</h3>
            <p>help us improve recommendations</p>
            <Button text="send ideas" />
          </div>

          <div className="info-card">
            <h3>profile</h3>
            <p>update preferences later</p>
            <Button text="view profile" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
