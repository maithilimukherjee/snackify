import { useEffect } from "react";
import api from "./api/axios";

function App() {
  useEffect(() => {
    api.get("/auth/health") // or "/health" if you made that route
      .then(res => console.log("backend says:", res.data))
      .catch(err => console.error(err.response?.data || err.message));
  }, []);

  return <h1>snackify frontend running</h1>;
}

export default App;
