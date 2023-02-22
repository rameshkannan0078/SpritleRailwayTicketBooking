import { useEffect, useState } from "react";
import AgentNavbar from "./AgentNavbar";
import { Table, Button, Card } from "react-bootstrap";
import { AgentBookTheTicket } from "../../../Functions/Agent/AgentBookingTicket";
import { useNavigate } from 'react-router-dom';
function AgentCart() {

  const [tableData, setTableData] = useState([]);
  const Flag=window.localStorage.getItem("BookingList");
  const navigate = useNavigate()

  const CartData = () =>{
    const bookingListString = window.localStorage.getItem("BookingList");
    if (bookingListString) {
      const bookingListCopy = JSON.parse(bookingListString);
      setTableData(
        bookingListCopy.sort((a, b) => {
          if (a.gender === "Female" && parseInt(a.age) > 60 && b.gender === "Male" && parseInt(b.age) > 60) {
            return -1; 
          } else if (a.gender === "Female" && parseInt(a.age) > 60) {
            return -1; 
          } else if (b.gender === "Female" && parseInt(b.age) > 60) {
            return 1; 
          } else if (a.gender === "Male" && parseInt(a.age) > 60) {
            return -1; 
          } else {
            return 0; 
          }
        })
      );
    }
    
  }

  useEffect(() => {
    CartData();
  }, []);


  const handleDelete = (index) => {
    const updatedTableData = [...tableData];
    updatedTableData.splice(index, 1);
    setTableData(updatedTableData);
    window.localStorage.setItem("BookingList", JSON.stringify(updatedTableData));
  };

  const handleBooking = async () => {
    const AgentEmail=window.localStorage.getItem("Agent_Email")
    const jsonData = JSON.stringify(tableData);
    await AgentBookTheTicket(jsonData,AgentEmail).then(async (res) => {
      const ResData=await res.json();
      console.log(ResData)
      if(ResData.status===200){
        window.localStorage.removeItem("BookingList");
        setTableData([])
        alert("Ticket has been booked successfully");
      
      }
      else if(ResData.status===404){
        console.log(ResData.seatLength)
        alert("Only "+ResData.seatLength +" memebers are Allocated")
        for (let index = 0; index < ResData.seatLength; index++) {
          tableData.shift();
        }
        window.localStorage.setItem("BookingList",tableData);
        CartData();
      }
      else if(ResData.status===401){
        navigate('/401_Page')
    }
      
    }).catch((err) => {
      console.log(err)
    });
   
  }
  return (
    <>
      <AgentNavbar />
     {
      tableData && tableData.length>0 ?
      (
        <div style={{ padding: "30px" }}>
        <Table striped bordered hover style={{ padding: "10px" }}>
          <thead>
            <tr>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Address</th>
              <th>Source</th>
              <th>Destination</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((person, index) => (
              <tr key={index}>
                <td>{person.email}</td>
                <td>{person.phoneNo}</td>
                <td>{person.name}</td>
                <td>{person.gender}</td>
                <td>{person.age}</td>
                <td>{person.address}</td>
                <td>{person.source}</td>
                <td>{person.destination}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="9" style={{ textAlign: "center" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button variant="success" style={{ padding: '10px' }} onClick={handleBooking}>
                    Book the Ticket
                  </Button>
                </div>
              </td>
            </tr>
          </tbody>

        </Table>
      </div>

      ):(
        <h2 style={{ textAlign:'center' }}>There is no tickets added</h2>
      )
     }

    </>
  );
}

export default AgentCart;
