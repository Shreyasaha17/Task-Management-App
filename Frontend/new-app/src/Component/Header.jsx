import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
   

<Navbar expand="lg" className="bg-body-tertiary">
<Container>
  <Navbar.Brand href="#home">Task Management App</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="me-auto">
    <Nav.Link as={Link} to="/register">Register</Nav.Link>
    <Nav.Link as={Link} to="/login">Login</Nav.Link>
    <Nav.Link as={Link} to="/task-dashboard">Task Dashboard</Nav.Link>

    </Nav>
  </Navbar.Collapse>
</Container>
</Navbar>
    );
};

export default Header;
