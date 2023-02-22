import { Card, Form, Button, Col } from 'react-bootstrap';
import { useState } from "react";
import person from '../../../Assets/person.png';
import {SuperAdminLoginUserFunction} from '../../../Functions/SuperAdmin/SuperAdminLoginFunctions';
import  {useNavigate} from 'react-router-dom';
import NotAValidAdmin from '../../../Assets/NotAValidAdmin.png';
import MessageModel from '../../Components/MessageModel';

function SuperAdminLogin() {
    const navigate=useNavigate()
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    })

    const ChangeHandle = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    const [ModelMessageAlert,setModelMessageAlert]=useState(false);
    const [HeadingValue,setHeadingValue]=useState("");
  const [DescriptionValue,setDescriptionValue]=useState("");
  const [ImgValue,setImgValue]=useState("");

  const closeModelchange = () => {
    setModelMessageAlert(false);
  };

    const HandleSuperAdmin = async (e) =>{
        e.preventDefault();
        await  SuperAdminLoginUserFunction(inputs.email,inputs.password).then(async res=>{
      
            const ResData= await res.json();
            console.log(ResData)
            if(ResData.status===200){
                window.localStorage.setItem("Access_Token",ResData.access_Token);
                window.localStorage.setItem("SuperAdmin_Email",inputs.email)
                navigate('/SuperAdminHome')
            }else if(ResData.status===404){
          
                setHeadingValue("Invalid Credentials")
                setImgValue(NotAValidAdmin)
                setDescriptionValue("You doesn't has a Valid Credentials to enter");
                setModelMessageAlert(true)
            }else if(ResData.status===401){
                navigate('/401_Page')
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    return (
        <div style={{ padding: '30px', marginTop: '50px' }}>
              
            <Col md={{ span: 4, offset: 4 }}>
                <Card style={{ padding: '30px' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden' }}>
                            <img src={person} alt="person" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    </div>
                    {
                        ModelMessageAlert ? ( <MessageModel closeModel={closeModelchange}  heading={HeadingValue} description={DescriptionValue} imgSrc={ImgValue}> </MessageModel >) :(<></>)
                    }
                    <h3 style={{ textAlign: 'center', fontWeight: 'bold' }}>Super Admin Login</h3>
                    <Form onSubmit={HandleSuperAdmin}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="email" placeholder="Enter email" value={inputs.email} onChange={ChangeHandle} style={{ padding: '10px' }} required />
                        </Form.Group>
                        <br></br>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Password" value={inputs.password} style={{ padding: '10px' }} onChange={ChangeHandle} required />
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
    );
}

export default SuperAdminLogin;
