import "./navbar.css";

const Navbar = ({ isAuthenticated }) => {
  return (
    <header className="navbar">
      <div className="nav-logo">snackify</div>

      <nav className="nav-links">
        {isAuthenticated ? (
          <>
            <span><a href="/profile">profile</a></span>
            <span><a href="/send-ideas">send ideas</a></span>
          </>
        ) : (
          <>
            <span><a href="/register">register</a></span>
            <span><a href="/about">about</a></span>
            <span><a href="/">login</a></span>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
