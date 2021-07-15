import { useContext } from "react";
import classes from "./MainNavigation.module.css";
import FavoritesContext from "../../store/favorites-context";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "../../logo.png";
import Image from "react-bootstrap/Image";

function MainNavigation() {
  const favoritesCtx = useContext(FavoritesContext);
  return (
    <Navbar expand="lg" bg="light" variant="light">
      <Navbar.Brand href="/">
        <Image src={logo} width="130" alt="Lets Meetup logo" fluid />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav
          className="ms-auto"
          style={{ fontSize: "25px", fontFamily: "sans-serif" }}
        >
          <Nav.Link href="/">All Meetups</Nav.Link>
          <Nav.Link href="/new-meetup">Add New Meetup</Nav.Link>
          <Nav.Link href="/favorites">
            My Favorites
            <span className={classes.badge}>{favoritesCtx.totalFavorites}</span>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MainNavigation;
