import { globalUrl } from "../../../Global/global";
const ApiUrl = globalUrl.apiUrl;

const data = (obj) => {
    return Object.keys(obj)
      .map((key, index) => `${key}=${encodeURIComponent(obj[key])}`)
      .join('&');
  }


export const generateTableData1=(numRows)=>{
    const tableData = [];
    let seats=1;
    let Name=['WindowSeat','MiddleSeat','AisleSeat'];
    for (let i = 0; i < numRows; i++) {
      const rowData = [];
  
      for (let j = 0; j < 6/2; j++) {
        rowData.push(seats+ " - " + Name[j]);
        seats++;
      }
      seats=seats+4-1;
  
      tableData.push(rowData);
    }
  
    return tableData;
  }

  export const generateTableData2=(numRows)=>{
    const tableData = [];
    let seats=4;
    let Name=['AisleSeat','MiddleSeat','WindowSeat'];
    for (let i = 0; i < numRows; i++) {
      const rowData = [];
  
      for (let j = 0; j < 6/2; j++) {
        rowData.push(seats + " - " + Name[j]);
        seats++;
      }
      seats=seats+4-1;
  
      tableData.push(rowData);
    }
  
    return tableData;
  }
  

  export const SuperAddCompartment = (tableData) =>{
    const webToken2=window.localStorage.getItem("Access_Token")
    const token2 = `Bearer ${webToken2}`;   
    const FormData = {
        tableData:tableData
      }
      console.log(tableData)
      const result = fetch(ApiUrl + 'compartment/SuperAddCompartment', {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded',
        'Authorization': token2 },
        body: data(FormData)
      })
        .then(response => response)
      
        .catch((err) => {
          console.log(err)
        });
      return result;
}



export const SuperCompartmentAgentExisted = (AgentEmail) =>{
  const webToken2=window.localStorage.getItem("Access_Token")
  const token2 = `Bearer ${webToken2}`;   
  const FormData = {
      email:AgentEmail
    }
  
    const result = fetch(ApiUrl + 'compartment/SuperCompartmentAgentExisted', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' ,
      'Authorization': token2},
      body: data(FormData)
    })
      .then(response => response)
    
      .catch((err) => {
        console.log(err)
      });
    return result;
}



export const SuperCompartmentCount = () =>{
  const webToken2=window.localStorage.getItem("Access_Token")
  const token2 = `Bearer ${webToken2}`;   
  
    const result = fetch(ApiUrl + 'compartment/SuperCompartmentCount', {
      method: 'GET',
      headers: { 'content-type': 'application/x-www-form-urlencoded',
      'Authorization': token2 },
    })
      .then(response => response)
    
      .catch((err) => {
        console.log(err)
      });
    return result;
}

export const SuperAllocateSeatsToAgent = (NumberOfSeats,AgentEmail) =>{
  const webToken2=window.localStorage.getItem("Access_Token")
  const token2 = `Bearer ${webToken2}`;   

  const FormData = {
    AgentEmail:AgentEmail,
    NumberOfSeats:NumberOfSeats,
  
  }
  
  const result = fetch(ApiUrl + 'compartment/SuperAllocateSeatsToAgent', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' ,
    'Authorization': token2},
    body: data(FormData)
  })
    .then(response => response)
  
    .catch((err) => {
      console.log(err)
    });
  return result;
}
