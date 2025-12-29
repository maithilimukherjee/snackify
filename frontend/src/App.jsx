import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Verify2FA from "./pages/verify2fa";
import Profile from "./pages/profile";
import Recommend from "./pages/recommend";
import Navbar from "./components/navbar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/verify" element={<Verify2FA />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/recommend" element={<Recommend />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
