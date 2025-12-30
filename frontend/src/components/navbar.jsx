import "./navbar.css";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="nav-logo">snackify</div>
      <nav className="nav-links">
        <span><a href="/register">register</a></span>
        <span><a href="/about">about</a></span>
        <span><a href="/">login</a></span>
      </nav>
    </header>
  );
};

export default Navbar;
