
import { useContext, useEffect, useState } from "react";
import { Navbar, Nav, Container, Dropdown, Image } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../../config/theme.context";
import logo from "../../../assets/logo.png";
import authSvc from "../../../pages/home/auth/auth.service";
import { toast } from "react-toastify";

const HomeHeaderComponent = () => {
  const [user, setUser] = useState(null);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const changeTheme = (e) => {
    e.preventDefault();
    toggleTheme(theme);
  };

  const getLoggedInUser = async () => {
    try {
      const response = await authSvc.getLoggedInUser();
      setUser(response.result);
    } catch (exception) {
      localStorage.removeItem("_au");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLoggedInUser();
  }, []);

  // Determine theme classes for Navbar based on context theme
  const navbarVariant = theme === "dark" ? "dark" : "light"; // Ensures the text is visible on the bg
  const navbarBg = theme === "dark" ? "dark" : "light"; // Matches Bootstrap's classes for bg color

  return (
    <Navbar expand="lg" bg={navbarBg} variant={navbarVariant} sticky="top" className="shadow-sm">
      <Container>
        <Navbar.Brand>
          <NavLink to="/" className="nav-link d-flex align-items-center text-decoration-none">
            <Image src={logo} alt="logo" height={40} />
            <span className="ms-2 fw-bold">Smart Kishan</span>
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link text-decoration-none">Home</NavLink>
            <NavLink to="/crop-recommendation" className="nav-link text-decoration-none">Crop Recommendation</NavLink>
            <NavLink to="/crop-cure" className="nav-link text-decoration-none">Crop Cure</NavLink>
            <NavLink to="/farmer-market" className="nav-link text-decoration-none">Marketplace</NavLink>
          </Nav>

          <Nav className="ms-auto">
            {user ? (
              <>
                <NavLink to={`/${user.role}`} className="nav-link text-decoration-none">
                  {user.name}
                </NavLink>
                <NavLink to="/cart" className="nav-link text-decoration-none">
                  <i className="fa-solid fa-cart-shopping"></i>
                </NavLink>
                <Dropdown align="end">
                  <Dropdown.Toggle variant="link" id="dropdown-basic" className="text-decoration-none">
                    <i className="fas fa-user fa-fw"></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <NavLink className="dropdown-item" to="/change-password">Change Password</NavLink>
                    <NavLink className="dropdown-item" to="/logout">Logout</NavLink>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <>
                <NavLink to="/login" className="nav-link text-decoration-none">Login</NavLink>
                <NavLink to="/register" className="nav-link text-decoration-none">SignUp</NavLink>
              </>
            )}
            <Nav.Link onClick={changeTheme} className="d-flex align-items-center text-decoration-none">
              <i className="fa-solid fa-circle-half-stroke"></i>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HomeHeaderComponent;