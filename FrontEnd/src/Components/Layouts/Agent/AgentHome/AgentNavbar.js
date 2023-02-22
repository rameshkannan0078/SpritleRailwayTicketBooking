import {Navbar,Nav,Container, Button} from 'react-bootstrap';
import Logo from  '../../../Assets/Logo.png';
import {useNavigate} from 'react-router-dom';


function AgentNavbar(){
    const navigate=useNavigate();

    const LogOutFunction = () =>{
      window.localStorage.removeItem("Access_Token");
      window.localStorage.removeItem("Agent_Email");
      navigate('/')

    }

    return(
        <Navbar bg="black" expand="lg"  style={{ color:'white'}}>
        <Container style={{ padding:'10px' }}>
          <Navbar.Brand href="/SuperAdminHome" style={{ color:'white'}}><img src={Logo} alt="logo" style={{width:'100px',height:'50px' }}></img></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ backgroundColor:'white' }} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/AgentMainHome" style={{ color:'white',fontSize:'20px'  }}>Home</Nav.Link>
              <Nav.Link href="/AgentCart" style={{ color:'white',fontSize:'20px'  }}>Cart</Nav.Link>
              <Nav.Link href="/AgentPreviousBooking" style={{ color:'white',fontSize:'20px'  }}>Previous Booking</Nav.Link>
              <Nav.Link href="/AgentUpcomingBooking" style={{ color:'white',fontSize:'20px'  }}>Upcoming Booking</Nav.Link>
              <Nav.Link href="/AgentProfile" style={{ color:'white',fontSize:'20px'  }}>Profile</Nav.Link>
            
            </Nav>
            <Button variant='danger' style={{ color:'white',fontSize:'20px'  }} onClick={LogOutFunction}>Log Out</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
}
export default AgentNavbar;