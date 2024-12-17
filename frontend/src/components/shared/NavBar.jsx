// src/components/shared/NavBar.jsx
import { Link } from "react-router-dom";
import AuthContextModule from "../../context/AuthContext";
import Logo from "./Logo";
import { GuestNavItems, UserNavItems } from "./NavItems";
import ButtonLink from "../buttons/ButtonLink";

const NavBar = () => {
  const { user, logout } = AuthContextModule.useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <ul className="navbar-elements">
        {!user ? (
          <GuestNavItems />
        ) : (
          <UserNavItems user={user} onLogout={handleLogout} />
        )}
        <li>
          <ButtonLink to="/post-service" className="btn-primary">
            Pide un Servicio
          </ButtonLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
