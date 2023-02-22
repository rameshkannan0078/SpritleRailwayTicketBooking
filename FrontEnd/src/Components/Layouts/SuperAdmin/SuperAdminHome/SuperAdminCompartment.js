import SuperAdminNavbar from "../Layout/SuperAdminNavbar";
import { Card, Form, Button, Col, Table, Spinner } from 'react-bootstrap';
import { useState,useEffect ,CSSProperties} from "react";
import { generateTableData1, generateTableData2, SuperAddCompartment, SuperCompartmentAgentExisted, SuperCompartmentCount } from "../../../Functions/SuperAdmin/Compartment/AddnewCompartment";
import { MdEventSeat } from '@react-icons/all-files/md/MdEventSeat';
import { SuperAddAgentWithEmailExisted } from "../../../Functions/SuperAdmin/SuperAdminAddAgent";
import AlertMessage from "../../Components/AlertMessage";
import { useNavigate } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

function SuperAdminCompartment() {


    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#ffffff");

    const navigate = useNavigate()
    const [inputs, setInputs] = useState({
        compartment: ''
    });
    const [AvilableCompartments,SetAvilableCompartments]=useState(0);
    const [showAlertMessage,setShowAlertMessage]=useState(false);
    const ChangeHandle = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    };

    const [tableData1, settableData1] = useState();
    const [tableData2, settableData2] = useState();

    const getTableData = async () => {
        const data1 = await generateTableData1(inputs.compartment);
        const data2 = await generateTableData2(inputs.compartment);
        settableData1(data1);
        settableData2(data2);
        return [data1, data2];
    };

    const AddNewCompartments = async (e) => {
        e.preventDefault();
        setLoading(true)
        const [data1, data2] = await getTableData();
        console.log("This is TableData 1" + data1);
        console.log("This is TableData 2" + data2);
        const data3=data1.concat(data2);
        await SuperAddCompartment(data3).then(async (res) => {
            setLoading(false)
            FindTheCompartmentCount();
            setShowAlertMessage(true);
            setTimeout(()=>{
                setShowAlertMessage(false);
            },2000)
        }).catch((err) => {
            console.log(err);
        });
    };


    const FindTheCompartmentCount = async () => {

          const res = await SuperCompartmentCount();
          const ResData = await res.json();
          console.log(ResData);
          if (ResData.status === 200) {
            SetAvilableCompartments(ResData.message);
           
          }
          else if(ResData.status===401){
            navigate('/401_Page')
        }
    
      };
    
      useEffect(() => {
        FindTheCompartmentCount();
      }, []);




    return (
        <>
            <SuperAdminNavbar></SuperAdminNavbar>
        
            <Col md={{ span: 4, offset: 4 }}  style={{ padding: '20px' }}>
                    <Card style={{ padding: '20px' }}>
                        <h3 style={{ textAlign: 'center', fontWeight: 'bold',padding:'10px' }}> Avilable Compartments {AvilableCompartments}  </h3>
                        {
                showAlertMessage ? (<AlertMessage variant="success" message="Compartment has been Added Successfully ✅" ></AlertMessage>) : (<></>)
            }
                    </Card>
                </Col>
            <div style={{ padding: '30px', marginTop: '10px' }}>
                <Col md={{ span: 4, offset: 4 }}>
                    <Card style={{ padding: '30px' }}>
                        <h3 style={{ textAlign: 'center', fontWeight: 'bold' }}>Add Compartment</h3>
                        <Form onSubmit={AddNewCompartments}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Number Of Compartments </Form.Label>
                                <Form.Control type="number" name="compartment" placeholder="Enter compartment" value={inputs.compartment} onChange={ChangeHandle} style={{ padding: '10px' }} required />
                            </Form.Group>
                            <br></br>

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
                            <br></br>
                        </Form>
                    </Card>
                </Col>
            </div>
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
                                            <td key={cellIndex}><MdEventSeat /> {cellData}</td>
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
                                            <td key={cellIndex}> <MdEventSeat /> {cellData}</td>
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

export default SuperAdminCompartment;