import { useState } from "react";
import { Row,Col, Form,Button, Card } from "react-bootstrap";
import train from '../../Assets/Ahmedabad.png';
import {useNavigate} from 'react-router-dom';
import { AgentLoginWithEmailFunction } from "../../Functions/Agent/AgentLoginFunction";
import MessageModel from "../Components/MessageModel";
import NotAvalidImg from "./../../Assets/NotAValidUser.png";

function AgentLogin(){

  const navigate=useNavigate();
    const [inputs,setInputs]=useState({
        email:'',
        password:''

    })

    const [ModelMessageAlert,setModelMessageAlert]=useState(false);
    const [HeadingValue,setHeadingValue]=useState("");
  const [DescriptionValue,setDescriptionValue]=useState("");
  const [ImgValue,setImgValue]=useState("");

  const closeModelchange = () => {
    setModelMessageAlert(false);
  };

   const ChangeHandle = (e) =>{
    setInputs({
        ...inputs,
        [e.target.name]:[e.target.value]
    })
    }

    const AgentLoginWithEmail =async (e)=>{
      e.preventDefault();
     await AgentLoginWithEmailFunction(inputs.email,inputs.password).then(async res=>{
      const ResData=await res.json();
      if(ResData.status===200){
        console.log(ResData)
        window.localStorage.setItem("Access_Token",ResData.access_Token);
        window.localStorage.setItem("Agent_Email",inputs.email);
        if(ResData.message.userCreated===0){
          navigate("/AgentFirstTimeLogin")
        }
        else{
          navigate('/AgentMainHome')
        }
      }
      if(ResData.status===404){
        setModelMessageAlert(true)
        setHeadingValue("Not a valid user")
        setImgValue(NotAvalidImg)
        setDescriptionValue("Your not an valid user!  Your data is not presented.")
        
      }
      else if(ResData.status===401){
        navigate('/401_Page')
    }
      })
    }

    return(
      <div style={{ margin: "auto" ,backgroundColor:'#F3F3F3' } }  id="agentLogin">
      <h1 style={{ fontFamily: "Arial, sans-serif", textAlign:'center', fontWeight: "bold", textShadow: "2px 2px 4px #ffff",color:'gray' }}>Our Railways was connecting<br>
        </br>
        More than 20,000 Familys per day.
        </h1>

        {
                        ModelMessageAlert ? (  <MessageModel closeModel={closeModelchange}  heading={HeadingValue} description={DescriptionValue} imgSrc={ImgValue}> </MessageModel >) :(<></>)
                    }
            <Row style={{ marginTop:'30px' }}>
                <Col sm>
                    <img src={train} alt="tri" style={{ width:'90%',objectFit: "cover",padding:'10px' }}></img>
                </Col>
                <Col sm >
         
                <Card style={{ padding:'60px', width:'80%' ,margin:'auto' }}>
              <Form  onSubmit={AgentLoginWithEmail}>
              <h3 style={{ textAlign:'center',fontWeight:'bold' }}>Agent Login</h3>
              <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name="email" placeholder="Enter email"  value={inputs.email} onChange={ChangeHandle}  style={{ padding:'10px' }} required/>
            </Form.Group>
            <br></br>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" placeholder="Password" value={inputs.password}  style={{ padding:'10px' }}  onChange={ChangeHandle} required/>
            </Form.Group>
            <br></br>
            <Button variant="primary" type="submit" style={{ width:'100%',height:'50px' }} >
              Submit
            </Button>
            <br></br>
            <br></br>
            <div style={{ borderTop:'5px solid white' }}></div>
            <br></br>
            {/* <Button variant="danger"  style={{ width:'100%',height:'50px' }} >
            Forget Password
            </Button> */}
         
            <br></br>
                </Form>
                
              </Card>
       
              
                </Col>
            </Row>
      </div>
    );
}

export default AgentLogin;