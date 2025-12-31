import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/navbar";
import api from "../api/axios";
import "./recommend.css";

const Recommend = () => {
  const location = useLocation();

  const ingredientsInput = location.state?.ingredients || "";
  const preference = location.state?.preference || "";

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!ingredientsInput || !preference) {
        setError("missing ingredients or preference");
        setLoading(false);
        return;
      }

      const ingredientsArray = ingredientsInput
        .split(",")
        .map(i => i.trim().toLowerCase())
        .filter(Boolean);

      try {
        const res = await api.post("/recommend", {
          ingredients: ingredientsArray,
          preference,
        });

        setRecipes(res.data);
      } catch (err) {
        console.error(err);
        setError("failed to fetch recommendations");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [ingredientsInput, preference]);

  return (
    <>
      <Navbar isAuthenticated={true} />

      <div className="recommend-wrapper">
        <h2>snackify recommends: </h2>
        <p className="sub">
          based on what’s in your fridge
        </p>

        {loading && <p>cooking ideas...</p>}

        {error && <p className="error">{error}</p>}

        {!loading && recipes.length === 0 && !error && (
          <p>no good matches found. try adding more ingredients.</p>
        )}

        <div className="recipe-list">
          {recipes.map((recipe, idx) => (
            <div className="recipe-card" key={idx}>
              <h3>{recipe.name}</h3>

              <p>
                <strong>ingredients:</strong>{" "}
                {recipe.ingredients.join(", ")}
              </p>

              <p>
                <strong>health:</strong>{" "}
                {recipe.healthy ? "healthy" : "comfort food"}
              </p>
              {recipe.directions && (
                <p>
                  <strong>directions:</strong>{" "}
                  {recipe.directions}
                </p>
              )}
              {recipe.recipeLink && (
                <p>
                  <strong>recipe link:</strong>{" "}
                  <a
                    href={recipe.recipeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    view recipe
                  </a>
                </p>
              )}

              {recipe.missingIngredients.length > 0 && (
                <div className="missing-ingredients">
                  <strong>missing ingredients:</strong>
                  <ul>
                    {recipe.missingIngredients.map((ing, i) => (
                      <li key={i} >
                        {ing} -{" "}
                        <a
                          href={recipe.buySuggestions[i].links.blinkit}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          buy on blinkit
                        </a>{" "}
                        |{" "}
                        <a
                          href={recipe.buySuggestions[i].links.instamart}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          buy on instamart
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Recommend;
