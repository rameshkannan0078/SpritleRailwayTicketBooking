import { Card, Form, Button, Col, Table, Spinner } from 'react-bootstrap';
import { useState, useEffect,CSSProperties } from "react";
import SuperAdminNavbar from '../Layout/SuperAdminNavbar';
import { SuperAddAgentWithEmail, SuperAddAgentWithEmailExisted, SuperAddAgentWithEmailSendEmail, SuperAdminAllAgents, SuperAdminDeleteAgent } from '../../../Functions/SuperAdmin/SuperAdminAddAgent';
import MessageModel from '../../Components/MessageModel';
import AlertMessage from "../../Components/AlertMessage";
import UserAlreadExited from '../../../Assets/UserAlreadExited.png';
import { useNavigate } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };




function SuperAdminNewAgent() {
    const navigate = useNavigate()
    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#ffffff");


    const [inputs, setInputs] = useState({
        email: '',
        password: 100000 + Math.floor(Math.random() * 900000),
        Search_Text:'',
    });

    const ChangeHandle = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    };

    const [inputValue, setInputValue] =useState("");
    const  [varient,SetVarient]=useState("");
    const [MessageForAlert,SetMessageForAlert]=useState("");

    function handleInputChange(event) {
        setInputValue(event.target.value);
    }

    const [ModelMessageAlert,setModelMessageAlert]=useState(false);
    const [HeadingValue,setHeadingValue]=useState("");
  const [DescriptionValue,setDescriptionValue]=useState("");
  const [ImgValue,setImgValue]=useState("");

  const closeModelchange = () => {
    setModelMessageAlert(false);
  };

  const [showAlertMessage,setShowAlertMessage]=useState(false);
    const [tableData, settableData] = useState([]);
    const [ShowLoader, SetShowLoader] = useState(true);

    const fetchData = async () => {
        await SuperAdminAllAgents().then(async (data) => {
            const responseData = await data.json();
            if (responseData.status === 200) {
                console.log(responseData.message);
                settableData(responseData.message);
              
                console.log("this is the length"+tableData.length)
                SetShowLoader(false);
            }
            else if(responseData.status===401){
              
                navigate('/401_Page')
            }
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const SuperDeleteTheAgent=(email)=>{
        setLoading(true)
        SuperAdminDeleteAgent(email).then(async res=>{
            const responseData = await res.json();
            if(responseData.status===200){
                fetchData();
                setLoading(false)
            }
            else if(responseData.status===401){
                setLoading(false)
                navigate('/401_Page')
            }

        }).catch(err=>{
            console.log(err);
        })
    }

    const AddNewAgent = async (e) => {
        e.preventDefault();
        setLoading(true)

        await SuperAddAgentWithEmailExisted(inputs.email)
            .then(async (res) => {
                const resData = await res.json();
              
                if(resData.status===401){
                    setLoading(false)
                    navigate('/401_Page')
                }
                else if (resData.status === 200) {
                    setLoading(false)
                    setModelMessageAlert(true)
                    setHeadingValue("Email Found")
                    setImgValue(UserAlreadExited)
                    setDescriptionValue("Email id is already existed with other Agent");
                }
                else {
                    SuperAddAgentWithEmail(inputs.email, inputs.password)
                        .then((res) => {
                            console.log(res);
                            if (res.status === 200) {
                                SuperAddAgentWithEmailSendEmail(inputs.email, inputs.password)
                                    .then(async (res) => {
                                        const ResData=await res.json();
                                        if(ResData.session_status===200){
                                            setLoading(false)
                                            SetVarient('success');
                                            SetMessageForAlert("Email has been send Successfully 📧");
                                            setShowAlertMessage(true)
                                            setTimeout(()=>{
                                                setModelMessageAlert(false)
                                            },3000)
                                        }
                                    
                                       
                                        fetchData();
                                   
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                    });
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <SuperAdminNavbar></SuperAdminNavbar>
            <div style={{ padding: '30px', marginTop: '30px' }}>
                <Col md={{ span: 4, offset: 4 }}>
                    <Card style={{ padding: '30px' }}>
                        <h3 style={{ textAlign: 'center', fontWeight: 'bold' }}>Add Agent</h3>
                        <Form onSubmit={AddNewAgent}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                          <Form.Control type="email" name="email" placeholder="Enter email" value={inputs.email} onChange={ChangeHandle} style={{ padding: '10px' }} required />
                        </Form.Group>
                        <br></br>
                        {
                        ModelMessageAlert ? ( <MessageModel closeModel={closeModelchange}  heading={HeadingValue} description={DescriptionValue} imgSrc={ImgValue}> </MessageModel >) :(<></>)
                    }
    
                        <Button variant="primary" type="submit" style={{ width: '100%', height: '50px' }}>
                            Submit
                        </Button>
                        <br></br>
                        <ClipLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
          
                        <div style={{ borderTop: '5px solid white' }}></div>
                        <br></br>
                        {
                showAlertMessage ? (<AlertMessage variant={varient} message={MessageForAlert}></AlertMessage>) : (<></>)
            }

                    </Form>
                </Card>
            </Col>
        </div>
        {
                ShowLoader ?(<Spinner></Spinner>) : ( 
            <div style={{ padding:'20px' }}>
            <Table striped bordered>
    <thead >
    <tr >
           <th colSpan="6">
          <h2 style={{ textAlign:'center' }}>All The Agent Details</h2>
           </th>
          <td colSpan="4" style={{ textAlign: "right" }}>
          <input value={ inputValue } onChange={ handleInputChange } style={{ padding:'10px' }} placeholder="Email id"></input>
          </td>
        </tr>
        <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Image</th>
            <th>Gender</th>
            <th>userCreated</th>
            <th>PhoneNo</th>
            <th>Delete</th>

        </tr>
    </thead>
    <tbody>
    {Array.isArray(tableData) && tableData.length > 0 ? (
        tableData.filter((data)=>{
                    if(inputValue===""){
                        return data
                    }
                    else if(data.Email.toLowerCase().includes(inputValue.toLowerCase())){
                        return data
                    }

                })
                
    .map((data, index) => (
        <tr key={index}>
            <td>{data.Id}</td>
            <td>{data.Name}</td>
            <td>{data.Email}</td>
            <td>{data.Image}</td>
            <td>{data.Gender}</td>
            <td>{data.userCreated}</td>
            <td>{data.PhoneNo}</td>
            <td><Button variant='danger' onClick={()=>SuperDeleteTheAgent(data.Email)}>Delete</Button></td>
        </tr>
    ))
) : (
    <tr>
        <td colSpan="10" style={{ textAlign: "center" }}>
            No data found
        </td>
    </tr>
)} 


</tbody>

</Table>
            </div>
                )
              }
        </>
    );

}

export default SuperAdminNewAgent;