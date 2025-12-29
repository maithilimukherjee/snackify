import "./navbar.css";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="nav-logo">snackify</div>
      <nav className="nav-links">
        <span>about</span>
        <span>login</span>
      </nav>
    </header>
  );
};

export default Navbar;
