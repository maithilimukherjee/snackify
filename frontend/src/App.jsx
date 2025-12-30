import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Verify2FA from "./pages/verify2fa";
import Profile from "./pages/profile";
import Recommend from "./pages/recommend";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify" element={<Verify2FA />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/recommend" element={<Recommend />} />
    </Routes>
  );
}

export default App;
