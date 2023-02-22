import { Card, Form, Button, Col } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import person from '../../../Assets/Addphoto.png';
import { AgentUpdateDetailsFirstTime, FindTheAge } from '../../../Functions/Agent/AgentLoginFunction';
import MessageModel from '../../Components/MessageModel';
import uploadImage  from '../../../Assets/uploadImage.png';
import PasswordNotMatching from '../../../Assets/PasswordNotMatching.png';
import AgeProblem18 from '../../../Assets/AgeProblem18.png';

function AgentFirstTimeLogin() {

    const navigate = useNavigate()
    const [inputs, setInputs] = useState({
        Image: '',
        email: window.localStorage.getItem("Agent_Email"),
        name: '',
        gender: '',
        dob: '',
        address: '',
        phoneNo: '',
        password: '',
        confirmPassword: ''
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
    const [fileInput, setFileInput] = useState(null);
    const [AvatarImage, setAvatarImage] = useState(person);


    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        setFileInput(selectedFile);

        const imageUrl = URL.createObjectURL(selectedFile);
        setAvatarImage(imageUrl);
    };

    const AgentUpdateDetails =async (e)=>{
        e.preventDefault();
        if(fileInput===null){
            setModelMessageAlert(true);
            setHeadingValue("Kindly! select the Agent Image");
            setDescriptionValue("Your not Selected any image. Select any image.");
            setImgValue(uploadImage);
        }
        else if(inputs.password!==inputs.confirmPassword){
            setModelMessageAlert(true);
            setHeadingValue("Kindly! check the password");
            setDescriptionValue("Your passwords are not matching. ");
            setImgValue(PasswordNotMatching);
        }
        else if(FindTheAge(inputs.dob)<=18){
            setModelMessageAlert(true);
            setHeadingValue("Kindly! check the Date Of Birth");
            setDescriptionValue("Your not eligable as Agent. You need to be above 18 Age. ");
            setImgValue(AgeProblem18);
        }
        else{
               await AgentUpdateDetailsFirstTime(inputs.email,inputs.password,inputs.name,inputs.phoneNo,inputs.dob,inputs.gender,inputs.address,fileInput).then(async (res)=>{
                const resData=await res.json();
                console.log(resData)
                if(resData.status===200){
                    navigate('/AgentMainHome')
                }
                else if(resData.status===401){
                    navigate('/401_Page')
                }
        })
        .catch((err)=>{
            console.log(err)
        })

        }
      

     

    }




    return (
        <div style={{ padding: '30px', marginTop: '50px' }}>
            <Col md={{ span: 5, offset: 4 }}>
                <Card style={{ padding: '30px' }}>
                    <h3 style={{ textAlign: 'center', fontWeight: 'bold' }}>Agent Details</h3>

                    {
                        ModelMessageAlert ? (  <MessageModel closeModel={closeModelchange}  heading={HeadingValue} description={DescriptionValue} imgSrc={ImgValue}> </MessageModel >) :(<></>)
                    }

                    <Form  onSubmit={AgentUpdateDetails}>

                        <Form.Group controlId='fileInput' className="text-center">
                            <label htmlFor="fileInput" >
                                <Image src={AvatarImage} style={{ height: '150px', width: '150px', margin: 'auto', padding: '10px' }} className="rounded-circle" />
                            </label>
                            <input id="fileInput" type="file" style={{ display: 'none' }} onChange={handleImageChange} />
                        </Form.Group>


                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="email" placeholder="Enter email" value={inputs.email} style={{ padding: '10px' }} required disabled />
                        </Form.Group>
                        <br></br>
                        <Form.Group controlId="formBasicPhone">
                            <Form.Label>Phone number (Don't use +91)</Form.Label>
                            <Form.Control
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
                                <option value="Transgender">Transgender</option>
                            </Form.Select>
                        </Form.Group>
                        <br></br>

                        <Form.Group controlId="formBasicdob">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control type="date" name="dob" placeholder="dob" value={inputs.dob} style={{ padding: '10px' }} onChange={ChangeHandle} required />
                        </Form.Group>
                        <br></br>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Address</Form.Label>
                            <Form.Control as="textarea" rows={3} name="address" placeholder="address" value={inputs.address} onChange={ChangeHandle} required />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Password" value={inputs.password} style={{ padding: '10px' }} onChange={ChangeHandle} required />
                        </Form.Group>
                        <br></br>
                        
                        <Form.Group controlId="formBasicConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" name="confirmPassword" placeholder="confirmPassword" value={inputs.confirmPassword} style={{ padding: '10px' }} onChange={ChangeHandle} required />
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

export default AgentFirstTimeLogin;