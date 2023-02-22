import SuperAdminNavbar from "../Layout/SuperAdminNavbar";
import LineChart from "./SuperAdminHomeChart";
import  {useEffect,useState} from 'react';
import { SuperAdminCountBookedSeats, SuperAdminCountChart } from "../../../Functions/SuperAdmin/SuperAdminAddAgent";
import {  Table, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
function SuperAdminHome(){
    const navigate = useNavigate()
    const [ShowLoader, SetShowLoader] = useState(true);
    const [tableData, settableData] = useState([]);
    const [chartValues,SetChartValues]=useState([]);
    const data = {
        labels: ['UnderAge 20', 'UnderAge 60', 'AboveAge 60'],
        values: chartValues,
        colors: ['red', 'green', 'blue']
      };

      const FindTheChart =async () =>{
        await SuperAdminCountChart().then(async (res)=>{
            const ResData=await res.json();
            if(ResData.status===200){
                const counts = ResData.message.map((item) => item.count);
                SetChartValues(counts)
            }
            else if(ResData.status===401){
                navigate('/401_Page')
            }
        }).catch((err)=>{
            console.log(err)
        })
      }

      const FindTheBookedSeats =async  () =>{
        SuperAdminCountBookedSeats().then(async (res)=>{
            const ResData=await res.json();
            if(ResData.status===200){
                console.log(ResData)
                settableData(ResData.message)
                SetShowLoader(false)
            }
            else if(ResData.status===401){
                navigate('/401_Page')
            }
            
        }).catch((err)=>{
            console.log(err)
        })
      }

      useEffect(()=>{
        FindTheChart();
        FindTheBookedSeats();
      },[])


    return(
        <>
            <SuperAdminNavbar></SuperAdminNavbar>
            <h2 style={{ textAlign:'center',padding:'10px' }}>The Ticket Booked List</h2>
            <div  style={{ width:'40%',height:'40%',margin:'auto' }}><LineChart  data={data} > </LineChart></div> 
            {
                ShowLoader ?(<Spinner></Spinner>) : ( 
                    <div  style={{ padding:'30px' }} >
                    <Table striped bordered>
    <thead  style={{ padding:'30px' }}>
    <tr style={{ padding: "50px" }}>
           <th colSpan="10">
          <h2 style={{ textAlign:'center' }}>Booked Ticket Details</h2>
           </th>
        </tr>
        <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Seat Number</th>
            <th>Seat Details</th>
            <th>Source</th>
            <th>Destination</th>

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
            <td>{data.Age}</td>
            <td>{data.SeatNumber}</td>
            <td>{data.Seat}</td>
            <td>{data.Source}</td>
            <td>{data.Destination}</td>
          
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


export default SuperAdminHome;