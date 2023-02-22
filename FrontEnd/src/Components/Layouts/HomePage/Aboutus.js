import { FaInstagram } from "@react-icons/all-files/fa/FaInstagram";
import { FaFacebook} from  "@react-icons/all-files/fa/FaFacebook";
import { FaTwitter} from  "@react-icons/all-files/fa/FaTwitter";
function AboutUs()
{

    return(
        <>
     <div style={{ backgroundColor:'#F3F3F3',height:'350px' }} id="aboutus">
     <h1 style={{ fontFamily: "Arial, sans-serif", textAlign:'center', fontWeight: "bold", textShadow: "2px 2px 4px #ffff",color:'gray',padding:'10px' }}>About Us </h1>
     <h5 style={{ marginLeft:'50px' }}>
     This site was developed by S. Ramesh Kannan. 
               <br></br>
               <br></br>
               <h4>Follow us on</h4>
               <FaInstagram></FaInstagram>  <FaFacebook></FaFacebook>    <FaTwitter></FaTwitter>
               <br></br>
               <br></br>
               Spritle Railway Booking  is official partner of IRCTC to book IRCTC train tickets and Railway train enquiry

               <br></br>
               © 2023 SpritleTicketBooking
     </h5>
     </div>
        
        </>
    );


}

export default AboutUs;