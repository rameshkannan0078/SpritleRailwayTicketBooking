import { globalUrl } from "../../Global/global";
const ApiUrl = globalUrl.apiUrl;
const EmailUrl=globalUrl.emailUrl;

const data = (obj) => {
    return Object.keys(obj)
      .map((key, index) => `${key}=${encodeURIComponent(obj[key])}`)
      .join('&');
  }


export const SuperAddAgentWithEmailExisted = (email)=>{
  const webToken2=window.localStorage.getItem("Access_Token")
  const token2 = `Bearer ${webToken2}`;   
    const FormData = {
        email: email
      }
    
      const result = fetch(ApiUrl + 'SuperAdmin/SuperAdminAddAgentExisted', {
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

export const SuperAddAgentWithEmail = (email,password) =>{
  const webToken2=window.localStorage.getItem("Access_Token")
  const token2 = `Bearer ${webToken2}`;   
    const FormData = {
        email: email,
        password: password
      }
    
      const result = fetch(ApiUrl + 'SuperAdmin/SuperAdminAddAgent', {
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

export const SuperAddAgentWithEmailSendEmail = (email, password) => {
  const formData = new FormData();
  formData.append('email', email);
  formData.append('password', password);

  return fetch(EmailUrl, {
    method: 'POST',
    body: formData
  })
    .then(response =>{
       return response
    })
    .catch(error => {
      console.error(error);
      // Handle any errors here
    });
}


export const SuperAdminAllAgents = ()=>{
  const webToken2=window.localStorage.getItem("Access_Token")
  const token2 = `Bearer ${webToken2}`;   
    const result = fetch(ApiUrl + 'SuperAdmin/SuperAdminAllAgents', {
      method: 'GET',
      headers: { 'content-type': 'application/x-www-form-urlencoded',
      'Authorization': token2 }
    })
      .then(response => response)
    
      .catch((err) => {
        console.log(err)
      });
 
    return result;
}

export const SuperAdminDeleteAgent = (email)=>{
  const webToken2=window.localStorage.getItem("Access_Token")
  const token2 = `Bearer ${webToken2}`;   
  const FormData = {
    email: email
  }

  const result = fetch(ApiUrl + 'SuperAdmin/SuperAdminDeleteAgent ', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded',
    'Authorization': token2 },
    body: data(FormData)
  })
    .then(response => response)
  
    .catch((err) => {
      console.log(err)
    });
    console.log("this is response" + result)
  return result;
}


export const SuperAdminCountChart = () =>{
  const webToken2=window.localStorage.getItem("Access_Token")
  const token2 = `Bearer ${webToken2}`;   
  const result = fetch(ApiUrl + 'SuperAdmin/SuperAdminCountChart ', {
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


export const  SuperAdminCountBookedSeats = () =>{

  const webToken2=window.localStorage.getItem("Access_Token")
  const token2 = `Bearer ${webToken2}`;   

  const result = fetch(ApiUrl + 'SuperAdmin/SuperAdminCountBookedSeats ', {
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