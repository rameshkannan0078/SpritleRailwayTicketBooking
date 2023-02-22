import { globalUrl } from "../../Global/global";
const ApiUrl = globalUrl.apiUrl;

const data = (obj) => {
    return Object.keys(obj)
      .map((key, index) => `${key}=${encodeURIComponent(obj[key])}`)
      .join('&');
  }


export const AgentLoginWithEmailFunction=(email,password)=>{
    const FormData = {
        email: email,
        password: password
      }
    
      const result = fetch(ApiUrl + 'Agent/AgentLogin', {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: data(FormData)
      })
        .then(response => response)
      
        .catch((err) => {
          console.log(err)
        });
      return result;
}


export const AgentUpdateDetailsFirstTime=(email,password,name,phoneNo,dob,gender,address,avatar)=>{
     


  const formData = new FormData();
  formData.append('email',email);
  formData.append('name',name);    
  formData.append('password',password);
  formData.append('phoneno',phoneNo);
  formData.append('dob',dob)
  formData.append('gender', gender);
  formData.append('address',address);
  formData.append('image',avatar);

  console.log(formData);

  return fetch(ApiUrl+'Agent/AgentFirstTimeUpdate', {
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

export const FindTheAge=(dob)=>{
  const DateofBirth=dob.split('-');
  const CurrentYear= new Date().getFullYear();
  console.log(CurrentYear-DateofBirth[0])
  return CurrentYear-DateofBirth[0];
}

export const FindTheAgentProfile=(email)=>{
  const webToken2=window.localStorage.getItem("Access_Token")
  const token2 = `Bearer ${webToken2}`;
  const FormData = {
      email: email
    }
  
    const result = fetch(ApiUrl + 'Agent/FindTheAgentProfile', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded',
      'Authorization': token2    },
      body: data(FormData)
    })
      .then(response => response)
    
      .catch((err) => {
        console.log(err)
      });
    return result;
}



export const AgentPreviousBookingFilled=(email)=>{
  const webToken2=window.localStorage.getItem("Access_Token")
  const token2 = `Bearer ${webToken2}`;
  const FormData = {
      email: email
    }
  
    const result = fetch(ApiUrl + 'Agent/AgentPreviousBookingFilled', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded', 'Authorization': token2  },
      body: data(FormData)
    })
      .then(response => response)
    
      .catch((err) => {
        console.log(err)
      });
    return result;
}