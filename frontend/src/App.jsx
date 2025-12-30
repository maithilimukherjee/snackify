import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Verify2FA from "./pages/verify2fa";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/profile";
import Recommend from "./pages/recommend";
import Ideas from "./pages/ideas";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify2fa" element={<Verify2FA />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/recommendRecipes" element={<Recommend />} />
      <Route path="/send-ideas" element={<Ideas />} />
    </Routes>
  );
}

export default App;
