import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Button from "../components/button";
import "./dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState("");

  const handleRecommend = () => {
    // optionally save ingredients to state/context or pass via navigate
    navigate("/recommend", { state: { ingredients } });
  };

  return (
    <>
      <Navbar isAuthenticated={true} />

      <div className="dashboard-wrapper">
        {/* fridge input section */}
        <div className="fridge-card">
          <h2>what's in the fridge?</h2>
          <p>enter ingredients you have and we'll recommend recipes</p>
          <input
            type="text"
            placeholder="e.g. eggs, tomatoes, spinach"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
          <Button variant="olive" text="recommend" onClick={handleRecommend} />
        </div>

        {/* three info cards */}
        <div className="dashboard-cards">
          <div className="info-card">
            <h3>your past recipes</h3>
            <p>see what you've cooked and your health score</p>
            <Button text="view" onClick={() => navigate("/profile")} />
          </div>

          <div className="info-card">
            <h3>send recipe ideas</h3>
            <p>help us improve your recommendations</p>
            <Button text="send ideas" onClick={() => navigate("/send-ideas")} />
          </div>

          <div className="info-card">
            <h3>profile</h3>
            <p>check your profile and update preferences</p>
            <Button text="view profile" onClick={() => navigate("/profile")} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
