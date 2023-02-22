import AgentNavbar from "./AgentNavbar";
import { Table } from 'react-bootstrap';
import { useState,useEffect } from "react";
import { generateTableData1, generateTableData2 } from "../../../Functions/SuperAdmin/Compartment/AddnewCompartment";
import { MdEventSeat } from '@react-icons/all-files/md/MdEventSeat';
import { AgentUpcomingBookingCount, AgentUpcomingBookingFilled } from "../../../Functions/Agent/AgentBookingTicket";
import { useNavigate } from 'react-router-dom';
function AgentUpcomingBooking() {
    const navigate = useNavigate()

    const [tableData1, settableData1] = useState();
    const [tableData2, settableData2] = useState();
    const [FilledSeats, SetFilledSeats] = useState([]);
    const getTableData = async (rows) => {
        const data1 = await generateTableData1(rows / 6);
        const data2 = await generateTableData2(rows / 6);
        settableData1(data1);
        settableData2(data2);
        return [data1, data2];
    };

    const GetUpcomingBookingAgent = async () => {
        await AgentUpcomingBookingCount().then(async (res) => {
            const ResData = await res.json();
            if (ResData.status === 200) {
                getTableData(ResData.message[0].total);
                AgentUpcomingBookingFilled().then(async (res) => {
                    const ResData2 = await res.json();
                    if (ResData2.status === 200) {
                        const seatNumbers =ResData2.message.map(booking => booking.SeatNumber);
                        SetFilledSeats(seatNumbers);
                    }
                    else if(ResData2.status===401){
                        navigate('/401_Page')
                    }

                }).catch((err) => {
                    console.log(err)
                })
            }
            else if(ResData.status===401){
                navigate('/401_Page')
            }
        }).catch((err) => {
            console.log(err)
        })
    }
    useEffect(() => {
        GetUpcomingBookingAgent();
    }, [])


    const CheckAllocated =(num) =>{
        const num2=parseFloat(num);
        if(FilledSeats.includes(num2)){
            console.log(true)
            return true;
        }
        return false;
    }

    useEffect(() => {
        console.log(FilledSeats);
       
      }, [FilledSeats]);

    return (
        <>
            <AgentNavbar></AgentNavbar>
            {
                tableData1 && tableData2 ? (<div className="row" style={{ padding: '30px' }} >
                    <div className="col">
                        <Table striped bordered>
                            <thead>
                                <tr>
                                    <th>Window Bearth</th>
                                    <th>Middle Bearth</th>
                                    <th>Side Bearth</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData1 && tableData1.map((rowData, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {rowData.map((cellData, cellIndex) => (
                                            <td key={cellIndex}    style={{backgroundColor: CheckAllocated(cellData.split('-')[0]) ? 'green' : 'white',}}><MdEventSeat /> {cellData}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                    <div className="col">
                        <Table striped bordered>
                            <thead>
                                <tr>
                                    <th>Side Bearth</th>
                                    <th>Middle Bearth</th>
                                    <th>Window Bearth</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData2 && tableData2.map((rowData, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {rowData.map((cellData, cellIndex) => (
                                            <td key={cellIndex} style={{backgroundColor:CheckAllocated(cellData.split('-')[0]) ? 'green' : 'white',}}> <MdEventSeat /> {cellData}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
                ) : (<></>)
            }

        </>
    );
}
export default AgentUpcomingBooking;