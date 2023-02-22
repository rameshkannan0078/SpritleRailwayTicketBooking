import AboutUs from "./Aboutus";
import AgentLogin from "./AgentLogin";
import Features from "./Features";
import NavbarForHome from "./NavbarForHome";
import VideoBackGroundMainPage from "./videoBackGroundMainPage";

function MainHomePage(){
    return(
        <>
        <NavbarForHome/>
        <VideoBackGroundMainPage></VideoBackGroundMainPage>
        <AgentLogin></AgentLogin>
        <Features></Features>
        <AboutUs></AboutUs>
        </>
    );    
}

export default MainHomePage;