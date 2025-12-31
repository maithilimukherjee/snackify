import { useState } from "react";
import Navbar from "../components/navbar";
import Button from "../components/button";
import api from "../api/axios";
import "./ideas.css";

const Ideas = () => {
  const [dishName, setDishName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [type, setType] = useState("veg");
  const [healthy, setHealthy] = useState(false);
  const [directions, setDirections] = useState("");
  const [link, setLink] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!dishName.trim() || !ingredients.trim()) {
      alert("please fill in all required fields");
      return;
    }

    // clean + normalize ingredients
    const ingredientsArray = ingredients
      .split(",")
      .map(i => i.trim().toLowerCase())
      .filter(i => i.length > 0);

    if (ingredientsArray.length === 0) {
      alert("please enter valid ingredients");
      return;
    }

    try {
      await api.post("/ideas", {
        name: dishName.trim().toLowerCase(),
        ingredients: ingredientsArray,
        type,
        healthy,
        directions: directions.trim(),
        recipeLink: link.trim(),
      });

      setSuccess("recipe idea submitted successfully!");
      setDishName("");
      setIngredients("");
      setType("veg");
      setHealthy(false);

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("failed to submit idea", err);
      alert("submission failed");
    }
  };

  return (
    <>
      <Navbar isAuthenticated={true} />

      <div className="ideas-wrapper">
        <div className="ideas-card">
          <h2>submit your recipe idea</h2>
          <p>help snackify get smarter!</p>

          <form onSubmit={handleSubmit} className="ideas-form">
            <label>dish name</label>
            <input
              type="text"
              value={dishName}
              onChange={(e) => setDishName(e.target.value)}
              placeholder="e.g. chicken biryani"
              required
            />

            <label>ingredients (comma separated)</label>
            <input
              type="text"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="e.g. chicken, rice, onion, garlic"
              required
            />

            <label>type</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="veg">veg</option>
              <option value="non-veg">non-veg</option>
              
            </select>

            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={healthy}
                onChange={(e) => setHealthy(e.target.checked)}
              />
              healthy
            </label>

            <label>add directions (optional)</label>
            <input
              type="text"
              value={directions}
              onChange={(e) => setDirections(e.target.value)}
              placeholder="e.g. cook on low heat for 20 mins"
            />

            <label>add youtube/website/instagram link </label>
            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="e.g. https://example.com/recipe"
            />

            <Button variant="olive" text="submit idea" type="submit" />
          </form>

          {success && <p className="success-msg">{success}</p>}
        </div>
      </div>
    </>
  );
};

export default Ideas;
