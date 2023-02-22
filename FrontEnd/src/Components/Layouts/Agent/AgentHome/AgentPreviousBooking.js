import AgentNavbar from "./AgentNavbar";
import { useEffect, useState } from "react";
import { AgentPreviousBookingFilled } from "../../../Functions/Agent/AgentLoginFunction";
import { Table,Button } from "react-bootstrap";
import { SendTicketToTheUser } from "../../../Functions/Agent/AgentBookingTicket";
import EmailImage from '../../../Assets/Email.png';
import MessageModel from "../../Components/MessageModel";
import { useNavigate } from 'react-router-dom';

function AgentPreviousBooking() {

    const navigate = useNavigate()
    const [tableData, settableData] = useState();

    const [ModelMessageAlert,setModelMessageAlert]=useState(false);
    const [HeadingValue,setHeadingValue]=useState("");
  const [DescriptionValue,setDescriptionValue]=useState("");
  const [ImgValue,setImgValue]=useState("");
  const closeModelchange = () => {
    setModelMessageAlert(false);
  };

    const FindTheAgentBookedTickets = async () => {
        const email = window.localStorage.getItem("Agent_Email");
        await AgentPreviousBookingFilled(email).then(async (res) => {
            const result = await res.json();
            if (result.status === 200) {
                settableData(result.message);
                console.log(result.message)

            }
            else if(result.status===401){
                navigate('/401_Page')
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    const SendEmailToTheUser = async (email,Seat) =>{
    
        await SendTicketToTheUser(email,Seat).then(async (res)=>{
            const Resdata=await res.json();
            if(Resdata.session_status===200){
                setModelMessageAlert(true);
                setHeadingValue("Email SuccessFul");
                setDescriptionValue("Email has been send to the user Successfully.");
                setImgValue(EmailImage);

            }
            else if(Resdata.status===401){
                navigate('/401_Page')
            }
        })

    }

    useEffect(() => {
        FindTheAgentBookedTickets();
    }, [])


    return (
        <>
            <AgentNavbar>
            </AgentNavbar>

            {
                        ModelMessageAlert ? ( <MessageModel closeModel={closeModelchange}  heading={HeadingValue} description={DescriptionValue} imgSrc={ImgValue}> </MessageModel >) :(<></>)
                    }
            {
                tableData && (
                    <div style={{ padding:'30px' }}>
                    <Table striped bordered >
                        <thead >
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Gender</th>
                                <th>PhoneNo</th>
                                <th>Age</th>
                                <th>Seat Number</th>
                                <th>Seat Details</th>
                                <th>Ticket</th>
                      
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(tableData) && tableData.length > 0 ? (
                                tableData
                                    .map((data, index) => (
                                        <tr key={index}>
                                            <td>{data.Id}</td>
                                            <td>{data.Name}</td>
                                            <td>{data.Email}</td>
    
                                            <td>{data.Gender}</td>
                
                                            <td>{data.PhoneNo}</td>
                                            <td>{data.Age}</td>

                                            <td>{data.SeatNumber}</td>
                                            <td>{data.Seat}</td>
                                           <td style={{ padding:'10px' }}><Button onClick={()=>SendEmailToTheUser(data.Email,data.SeatNumber)} variant="primary">Send</Button></td>
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
    )

}
export default AgentPreviousBooking;