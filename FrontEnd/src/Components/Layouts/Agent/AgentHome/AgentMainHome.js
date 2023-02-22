import AgentNavbar from "./AgentNavbar";
import { Card, Form, Button, Col } from 'react-bootstrap';
import MessageModel from '../../Components/MessageModel';
import { useEffect, useState } from "react";
import { AgentAvilableTicketsCount } from "../../../Functions/Agent/AgentBookingTicket";
import cart from '../../../Assets/cart.png';
import { useNavigate } from 'react-router-dom';
import NoTicket from '../../../Assets/NoTicket.png';
function AgentMainHome(){

    const navigate = useNavigate()
    const [inputs, setInputs] = useState({
        email: '',
        name: '',
        gender: '',
        Source:'',
        Destination:'',
        dob: '',
        address: '',
        phoneNo: '',

    })

    const [ModelMessageAlert,setModelMessageAlert]=useState(false);
    const [HeadingValue,setHeadingValue]=useState("");
  const [DescriptionValue,setDescriptionValue]=useState("");
  const [ImgValue,setImgValue]=useState("");

  const closeModelchange = () => {
    setModelMessageAlert(false);
  };


    const ChangeHandle = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }




    const [list, setList] = useState([]);
    const [AvilableTickets,SetAvilableTickets]=useState(0);

    const GetBookingList = () =>{
        const storedList = JSON.parse(localStorage.getItem('BookingList'));
        if (storedList && storedList.length) {
          setList(storedList);
        }
        // console.log(window.localStorage.getItem("BookingList"))
    }

    const GetAvilableTicketsCount =async ()=>{
                 let AgentEmail=window.localStorage.getItem("Agent_Email");
               
                await AgentAvilableTicketsCount(AgentEmail).then(async (res)=>{
                    const ResponseData= await res.json();
                    if(ResponseData.status===200){
                        console.log(ResponseData);
                        SetAvilableTickets(ResponseData.message.length);
                    }
                    else if(ResponseData.status===401){
                        navigate('/401_Page')
                    }
                }).catch((err)=>{
                  console.log(err);  
                })
    }

    useEffect(() => {
      
        GetBookingList();
        GetAvilableTicketsCount();
       
    }, []);
  
    const handleAdd = (item) => {
      const newList = [...list, item];
      setList(newList);
      localStorage.setItem('BookingList', JSON.stringify(newList));
    };

    const AddTheTableValues = (e)=>{
        e.preventDefault();
        console.log(list.length)
        console.log(AvilableTickets)
   
        if((AvilableTickets<=list.length)){
            setHeadingValue("Tickets not avilable");
            setDescriptionValue("Passengers list is higher than the avilable tickets");
            setImgValue(NoTicket)
            setModelMessageAlert(true);
        }
        else{
            const newUser = { 
                email:inputs.email,
                phoneNo:inputs.phoneNo,
                name:inputs.name,
                gender:inputs.gender,
                age:inputs.dob,
                address:inputs.address,
                source:inputs.Source,
                destination:inputs.Destination
            };

            handleAdd(newUser);
            setHeadingValue("Check the cart");
            setDescriptionValue("Data has been added to the cart !");
            setImgValue(cart)
            setModelMessageAlert(true);
            setInputs({ email:'', phoneNo:'', name:'', gender:'', dob:'', address:'', Source:'', Destination:'' });
        }
    
       
    }
    



    return(
        <>
<AgentNavbar></AgentNavbar>
<Col md={{ span: 5, offset: 4 }}>
                <Card style={{ padding: '30px' }}>
                    <h3 style={{ textAlign: 'center', fontWeight: 'bold' }}>Avilable Tickets 🎫 {AvilableTickets}</h3>
                </Card>
            </Col>
<div style={{ padding: '30px', marginTop: '50px' }}>
            <Col md={{ span: 5, offset: 4 }}>
                <Card style={{ padding: '30px' }}>
                    <h3 style={{ textAlign: 'center', fontWeight: 'bold' }}>Book Ticket</h3>

                    {
                        ModelMessageAlert ? (  <MessageModel closeModel={closeModelchange}  heading={HeadingValue} description={DescriptionValue} imgSrc={ImgValue}> </MessageModel >) :(<></>)
                    }

                    <Form onSubmit={AddTheTableValues} >

                       


                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" placeholder="Enter email" value={inputs.email} style={{ padding: '10px' }} required onChange={ChangeHandle} />
                        </Form.Group>
                        <br></br>
                        <Form.Group controlId="formBasicPhone">
                            <Form.Label>Phone number (Don't use +91)</Form.Label>
                            <Form.Control
                            style={{ padding: '10px' }}
                                type="tel"
                                name="phoneNo"
                                placeholder="Enter phone number"
                                prefix='+91'
                                value={inputs.phoneNo}
                                onChange={(e) => {
                                    if (e.target.value.length <= 10) {
                                        ChangeHandle(e);
                                    }
                                }}
                                pattern="[0-9]{10}"
                                required
                            />
                        </Form.Group>
                        <br></br>


                        <Form.Group controlId="formBasicname">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="name" name="name" placeholder="name" value={inputs.name} style={{ padding: '10px' }} onChange={ChangeHandle} required />
                        </Form.Group>
                        <br></br>


                        <Form.Group controlId="formBasicGender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Select aria-label="Default select example" name="gender" placeholder="gender" value={inputs.gender} style={{ padding: '10px' }} onChange={ChangeHandle} required>
                                <option value="">Select the gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            
                            </Form.Select>
                        </Form.Group>
                        <br></br>

                        <Form.Group controlId="formBasicdob">
                            <Form.Label>Age</Form.Label>
                            <Form.Control type="number" name="dob" placeholder="Enter Age" value={inputs.dob} style={{ padding: '10px' }} onChange={ChangeHandle} required />
                        </Form.Group>
                        <br></br>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Address</Form.Label>
                            <Form.Control as="textarea" rows={3} name="address" placeholder="address" value={inputs.address} onChange={ChangeHandle} required />
                        </Form.Group>

                        <Form.Group controlId="formBasicSource">
                            <Form.Label>Source</Form.Label>
                            <Form.Control type="Source" name="Source" placeholder="Source" value={inputs.Source} style={{ padding: '10px' }} onChange={ChangeHandle} required />
                        </Form.Group>
                        <br></br>
                        
                        <Form.Group controlId="formBasicDestination">
                            <Form.Label>Confirm Destination</Form.Label>
                            <Form.Control type="Destination" name="Destination" placeholder="Destination" value={inputs.Destination} style={{ padding: '10px' }} onChange={ChangeHandle} required />
                        </Form.Group>
                        <br></br>
                        <Button variant="primary" type="submit" style={{ width: '100%', height: '50px' }}>
                            Submit
                        </Button>
                        <br></br>
                        <div style={{ borderTop: '5px solid white' }}></div>
                        <br></br>
                    </Form>
                </Card>
            </Col>
        </div>
        </>
        
    );

}

export default AgentMainHome;