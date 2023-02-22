import { useEffect,useState } from "react";
import { Card } from "react-bootstrap";
import { FindTheAgentProfile } from "../../../Functions/Agent/AgentLoginFunction";
import AgentNavbar from "./AgentNavbar";
import global from "../../../Global/global";
import { useNavigate } from 'react-router-dom';
function AgentProfile(){
    const navigate = useNavigate()
    const [tableData, settableData] = useState();

    const FindTheuserDetails = async ()=>{
        const email=window.localStorage.getItem("Agent_Email");
        await FindTheAgentProfile(email).then(async (res)=>{
            const result=await res.json();
            if(result.status===200){
                settableData(result.message);
                console.log(result.message)
         
            }
            else if(result.status===401){
                navigate('/401_Page')
            }
        }).catch((err)=>{
            console.log(err)
        })
    }
    useEffect(()=>{
        FindTheuserDetails();
    },[])

    return(
        <>
            <AgentNavbar></AgentNavbar>
            {
                tableData && (
                    <Card style={{ padding: '50px' }} >
    <Card.Img variant="top" style={{ height:'150px',width:'150px',margin:'auto' }} src={(global.globalUrl.apiUrl)+"Agent/uploads/AgentsImages/"+(tableData.Image)} />
    <Card.Body>
        <Card.Title style={{ textAlign:'center' }}>{tableData.Name}</Card.Title>
        <Card.Text style={{ textAlign:'center' }}>
            <p>Email: {tableData.Email}</p>
            <p>Gender: {tableData.Gender}</p>
            <p>Date of Birth: {tableData.Dob}</p>
            <p>Address: {tableData.Address}</p>
            <p>Phone Number: {tableData.PhoneNo}</p>
        </Card.Text>
    </Card.Body>
</Card>
                )
            }


        </>
    );
}
export default AgentProfile;