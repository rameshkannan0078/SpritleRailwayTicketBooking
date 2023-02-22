import SuperAdminNavbar from "../Layout/SuperAdminNavbar";
import { Card, Form, Button, Col, Table, Spinner } from 'react-bootstrap';
import { useEffect, useState } from "react";
import { SuperAddAgentWithEmailExisted } from "../../../Functions/SuperAdmin/SuperAdminAddAgent";
import { MdEventSeat } from '@react-icons/all-files/md/MdEventSeat';
import { SuperCompartmentCount,SuperAllocateSeatsToAgent } from "../../../Functions/SuperAdmin/Compartment/AddnewCompartment";
import AlertMessage from "../../Components/AlertMessage";
import { useNavigate } from 'react-router-dom';
function SuperAdminAllocateSeats(){
    const navigate = useNavigate()
    const [inputs, setInputs] = useState({
        email: '',
        numberOfseats:''
    });
    const [showAlertMessage,setShowAlertMessage]=useState(false);
    const  [varient,SetVarient]=useState("");
    const [MessageForAlert,SetMessageForAlert]=useState("");
    const [AvilableSeats,SetAvilableSeats]=useState(0);

    const FetchCount = async ()=>{
       await SuperCompartmentCount().then(async res=>{
            const ResPonseData=await res.json();
            if(ResPonseData.status===200){
                SetAvilableSeats(ResPonseData.message);
            }
            else if(ResPonseData.status===401){
                navigate('/401_Page')
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        FetchCount();
    },[])

    const ChangeHandle = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    };

    const AllocateSeatsToAgent = async (e)=>{
        e.preventDefault();
    await SuperAddAgentWithEmailExisted(inputs.email).then(async res=>{
                const resData = await res.json();
                console.log(resData)
                if(resData.status===200){ 
                    await SuperAllocateSeatsToAgent(inputs.numberOfseats,inputs.email).then(async (res)=>{
                        const ResponseData= await res.json();
                        if(ResponseData.status===200){
                            FetchCount();
                            setShowAlertMessage(true);
                            SetMessageForAlert("Data added Successfully  😊 ."  );
                            SetVarient("success");
                            setTimeout(()=>{
                                setShowAlertMessage(false);
                            },2000)
                           
                        }                    }).catch((err)=>{
                        console.log(err);
                    });
                   
                }
                else{
                    setShowAlertMessage(true);
                    SetMessageForAlert("Email id doesn't existed 📢." );
                    SetVarient("danger");
                    setTimeout(()=>{
                        setShowAlertMessage(false);
                    },2000)
                }
            }).catch(err=>{
                console.log(err)
            })
    }



    return(
        <>
             <SuperAdminNavbar></SuperAdminNavbar>
             <Col md={{ span: 4, offset: 4 }}  style={{ padding: '20px' }}> 
                    <Card style={{ padding: '20px' }}>
                        <h3 style={{ textAlign: 'center', fontWeight: 'bold',padding:'10px' }}> Avilable Seats For Agent  {AvilableSeats}  <MdEventSeat></MdEventSeat></h3>
                        {
                showAlertMessage ? (<AlertMessage variant={varient} message={MessageForAlert}></AlertMessage>) : (<></>)
            }
                    </Card>
                </Col>
                {}
             <div style={{ padding: '30px', marginTop: '10px' }}>
                <Col md={{ span: 4, offset: 4 }}>
                    <Card style={{ padding: '30px' }}>
                        <h3 style={{ textAlign: 'center', fontWeight: 'bold',padding:'10px' }}>Allocate Seats To Agent</h3>
                        <Form onSubmit={AllocateSeatsToAgent}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" name="email" placeholder="Enter email" value={inputs.email} onChange={ChangeHandle} style={{ padding: '10px' }} required />
                            </Form.Group>
                            <br></br>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Number Of Seats </Form.Label>
                                <Form.Control type="number" name="numberOfseats" placeholder="Enter number of seats" value={inputs.numberOfseats} onChange={ChangeHandle} style={{ padding: '10px' }} required />
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

export default SuperAdminAllocateSeats;