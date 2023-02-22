import { globalUrl } from "../../Global/global";
const ApiUrl = globalUrl.apiUrl;

const data = (obj) => {
    return Object.keys(obj)
      .map((key, index) => `${key}=${encodeURIComponent(obj[key])}`)
      .join('&');
  }

export const SuperAdminLoginUserFunction = (email,password)=>{

      const FormData = {
        email: email,
        password: password
      }
    
      const result = fetch(ApiUrl + 'SuperAdmin/SuperAdminLogin', {
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