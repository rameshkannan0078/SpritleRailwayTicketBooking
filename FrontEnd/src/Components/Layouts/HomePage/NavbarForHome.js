
import {Navbar,Nav,Container, Button} from 'react-bootstrap';
import Logo from  '../../Assets/Logo.png';
import {useNavigate} from 'react-router-dom';

function NavbarForHome(){

  const navigate=useNavigate();


    return(     
      <Navbar bg="black" expand="lg" >
      <Container style={{ padding:'10px' }}>
        <Navbar.Brand href="#home" style={{ color:'white'}}><img src={Logo} alt="logo" style={{width:'100px',height:'50px' }}></img></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" style={{ color:'white',fontSize:'20px'  }}>Home</Nav.Link>
            <Nav.Link href="#agentLogin" style={{ color:'white',fontSize:'20px'  }}>Agent Login</Nav.Link>
            <Nav.Link href="#features" style={{ color:'white',fontSize:'20px'  }}>Features</Nav.Link>
            <Nav.Link href="#aboutus" style={{ color:'white',fontSize:'20px'  }}>About Us</Nav.Link>
          
          </Nav>
          <Button style={{ color:'white',fontSize:'20px'  }} onClick={()=>navigate('/SuperAdminLogin')}> Super Admin</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    );
}

export default NavbarForHome;