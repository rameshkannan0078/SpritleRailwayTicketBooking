import {Navbar,Nav,Container, Button} from 'react-bootstrap';
import Logo from  '../../../Assets/Logo.png';
import {useNavigate} from 'react-router-dom';

function SuperAdminNavbar(){

    const navigate=useNavigate();

    return(
        <Navbar bg="black" expand="lg"  style={{ color:'white'}}>
        <Container style={{ padding:'10px' }}>
          <Navbar.Brand href="/SuperAdminHome" style={{ color:'white'}}><img src={Logo} alt="logo" style={{width:'100px',height:'50px' }}></img></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ backgroundColor:'white' }} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/SuperAdminHome" style={{ color:'white',fontSize:'20px'  }}>Home</Nav.Link>
              <Nav.Link href="/SuperAdminNewAgent" style={{ color:'white',fontSize:'20px'  }}>New Agent</Nav.Link>
              <Nav.Link href="/SuperAdminCompartment" style={{ color:'white',fontSize:'20px'  }}>New Compartments</Nav.Link>
              <Nav.Link href="/SuperAdminAllocateSeats" style={{ color:'white',fontSize:'20px'  }}>Allocate Seats</Nav.Link>
              
              <Nav.Link href="/SuperAdminSeats" style={{ color:'white',fontSize:'20px'  }}>Seats</Nav.Link>
            </Nav>
            <Button variant='danger' style={{ color:'white',fontSize:'20px'  }} onClick={()=>navigate('/')}>Log Out</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
}

export default SuperAdminNavbar;