import { globalUrl } from "../../Global/global";
const ApiUrl = globalUrl.apiUrl;
const  emailFileUrl=globalUrl.emailFileUrl;



const data = (obj) => {
    return Object.keys(obj)
      .map((key, index) => `${key}=${encodeURIComponent(obj[key])}`)
      .join('&');
  }


  export const AgentBookTheTicket=(tableData,AgentEmail)=>{

    const webToken2=window.localStorage.getItem("Access_Token")
    const token2 = `Bearer ${webToken2}`;

    
    console.log("The Front End will be "+tableData)
    const FormData = {
      AgentEmail:AgentEmail,
      tableData: tableData,
    }
  
    const result = fetch(ApiUrl + 'Agent/AgentBookTheTicket', {
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

  export const AgentAvilableTicketsCount=(AgentEmail)=>{

    const webToken2=window.localStorage.getItem("Access_Token")
    const token2 = `Bearer ${webToken2}`;

    const FormData = {
      email:AgentEmail
    }
    console.log("This is from "+AgentEmail)
   
  
    const result = fetch(ApiUrl + 'Agent/AgentAvilableTicketsCount', {
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


  export const AgentUpcomingBookingCount=()=>{

    const webToken2=window.localStorage.getItem("Access_Token")
    const token2 = `Bearer ${webToken2}`;   
  
    const result = fetch(ApiUrl + 'Agent/AgentUpcomingBookingCount', {
      method: 'GET',
      headers: { 'content-type': 'application/x-www-form-urlencoded',
      'Authorization': token2  },
    })
      .then(response => response)
    
      .catch((err) => {
        console.log(err)
      });
    return result;
  }

  export const AgentUpcomingBookingFilled=()=>{
    const webToken2=window.localStorage.getItem("Access_Token")
    const token2 = `Bearer ${webToken2}`;   
  
  
    const result = fetch(ApiUrl + 'Agent/AgentUpcomingBookingFilled', {
      method: 'GET',
      headers: { 'content-type': 'application/x-www-form-urlencoded',
      'Authorization': token2  },
    })
      .then(response => response)
    
      .catch((err) => {
        console.log(err)
      });
    return result;
  }

  export const SendTicketToTheUser = async (email, fileurl) => {
    const url=(ApiUrl+"TicketPdf/"+fileurl+".pdf");
    console.log(url)
    const formData = new FormData();
    formData.append('email', email);
    formData.append('url', url);
  
    try {
      const response = await fetch(emailFileUrl, {
        method: 'POST',
        body: formData
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  }