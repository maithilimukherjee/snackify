import Navbar from "../components/navbar";
import "./dashboard.css";

const Dashboard = () => {
  return (
    <>
      <Navbar isAuthenticated={true}/>

      <div className="dashboard-wrapper">
        <div className="dashboard-header">
          <h2>hola, foodie</h2>
          <p>here’s what’s cooking today</p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card primary">
            <h3>food recommendations</h3>
            <p>get meals based on your preference and mood</p>
          </div>

          <div className="dashboard-card">
            <h3>profile</h3>
            <p>update your details and food choices</p>
          </div>

          <div className="dashboard-card">
            <h3>history</h3>
            <p>view past recommendations</p>
          </div>

          <div className="dashboard-card muted">
            <h3>coming soon</h3>
            <p>more features loading ✨</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
