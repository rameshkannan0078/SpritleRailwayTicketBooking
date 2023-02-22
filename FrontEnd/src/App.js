import {BrowserRouter,Route,Routes} from 'react-router-dom';
import MainHomePage from './Components/Layouts/HomePage/MainHomePage';
import './App.css';
import SuperAdminLogin from './Components/Layouts/SuperAdmin/SuperAdminLogin/SuperAdminLogin';
import SuperAdminHome from './Components/Layouts/SuperAdmin/SuperAdminHome/SuperAdminHome';
import SuperAdminNewAgent from './Components/Layouts/SuperAdmin/SuperAdminHome/SuperAdminNewAgent';
import SuperAdminCompartment from './Components/Layouts/SuperAdmin/SuperAdminHome/SuperAdminCompartment';
import AgentFirstTimeLogin from './Components/Layouts/Agent/AgentFirstTimeLogin/AgentFirstTimeLogin';
import AgentMainHome from './Components/Layouts/Agent/AgentHome/AgentMainHome';
import AgentProfile from './Components/Layouts/Agent/AgentHome/AgentProfile';
import AgentUpcomingBooking from './Components/Layouts/Agent/AgentHome/AgentUpcomingBooking';
import AgentPreviousBooking from './Components/Layouts/Agent/AgentHome/AgentPreviousBooking';
import AgentCart from './Components/Layouts/Agent/AgentHome/AgentCart';
import SuperAdminAllocateSeats from './Components/Layouts/SuperAdmin/SuperAdminHome/SuperAdminAllocateSeats';
import Page_401 from './Components/Layouts/Components/401';
import ProtectedRouteSuperAdmin from './Components/Routes/ProtectedRoute/ProtectedRouteSuperAdmin';
import ProtectedRouteAgent from './Components/Routes/ProtectedRoute/ProtectedRouteAgent';
import SuperAdminSeats from './Components/Layouts/SuperAdmin/SuperAdminHome/SuperAdminSeats';


function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route exact path='/' element={<MainHomePage></MainHomePage>}></Route>
      <Route exact path='/SuperAdminLogin' element={<SuperAdminLogin></SuperAdminLogin>}></Route>
      <Route exact path='/SuperAdminHome' element={<ProtectedRouteSuperAdmin><SuperAdminHome></SuperAdminHome></ProtectedRouteSuperAdmin>}></Route>
      <Route exact path='/SuperAdminNewAgent' element={<ProtectedRouteSuperAdmin><SuperAdminNewAgent></SuperAdminNewAgent></ProtectedRouteSuperAdmin>}></Route>
      <Route exact path='/SuperAdminCompartment' element={<ProtectedRouteSuperAdmin><SuperAdminCompartment></SuperAdminCompartment></ProtectedRouteSuperAdmin>}></Route>
      <Route exact path='/SuperAdminSeats' element={<ProtectedRouteSuperAdmin><SuperAdminSeats></SuperAdminSeats></ProtectedRouteSuperAdmin>}></Route>
      <Route exact path='/AgentFirstTimeLogin' element={<ProtectedRouteAgent><AgentFirstTimeLogin></AgentFirstTimeLogin></ProtectedRouteAgent>}></Route>
      <Route exact path='/AgentMainHome' element={<ProtectedRouteAgent><AgentMainHome></AgentMainHome></ProtectedRouteAgent>}></Route>
      <Route exact path='/AgentPreviousBooking' element={<ProtectedRouteAgent><AgentPreviousBooking></AgentPreviousBooking></ProtectedRouteAgent>}></Route>
      <Route exact path='/AgentUpcomingBooking' element={<ProtectedRouteAgent><AgentUpcomingBooking></AgentUpcomingBooking></ProtectedRouteAgent>}></Route>
      <Route exact path='/AgentProfile' element={<ProtectedRouteAgent><AgentProfile></AgentProfile></ProtectedRouteAgent>}></Route>
      <Route exact path='/SuperAdminAllocateSeats' element={<ProtectedRouteSuperAdmin><SuperAdminAllocateSeats></SuperAdminAllocateSeats></ProtectedRouteSuperAdmin>}></Route>
      <Route exact path='/AgentCart' element={<ProtectedRouteAgent><AgentCart></AgentCart></ProtectedRouteAgent>}></Route>
      <Route exact path='/401_Page' element={<Page_401></Page_401>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
