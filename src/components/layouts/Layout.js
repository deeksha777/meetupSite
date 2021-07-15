import classes from "./Layout.module.css";
import MainNavigation from "./MainNavigation";
import Container from "react-bootstrap/Container";

function Layout(props) {
  return (
    <Container fluid>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
    </Container>
  );
}

export default Layout;
