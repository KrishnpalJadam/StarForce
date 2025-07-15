import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import MainLayout from './Layout/MainLayout';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import EmployerDash from './Components/Dashboard/EmployerDash';
import EmployeDash from './Components/Dashboard/EmployeDash';
import SearchJob from './Components/Dashboard/StarEmployee.jsx/SearchJob';
import AppliedJobs from './Components/Dashboard/StarEmployee.jsx/AppliedJobs';
import MyProfile from './Components/Dashboard/StarEmployee.jsx/MyProfile';
import EmployeeSettings from './Components/Dashboard/StarEmployee.jsx/EmployeeSettings';
import ManageEmployees from './Components/StarAdmin/ManageEmployees';
import ManageEmployers from './Components/StarAdmin/ManageEmployer';
import AddComponies from './Components/StarAdmin/AddComponies';
import OtherInquiry from './Components/Auth/OtherInquiry';
import CompanyRequsting from './Components/StarEmloyer/CompanyRequsting';
import EmployerSettings from './Components/StarEmloyer/EmployerSettings';
import EmployerProfile from './Components/StarEmloyer/EmployerProfile';
import Settings from './Components/StarAdmin/Settings';


function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes without sidebar */}
        <Route path="/" element={<Login />} />
        <Route path="/OtherInquiry" element={<OtherInquiry />} />
     

        {/* Admin Dashboard routes with MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ManageEmployees" element={<ManageEmployees />} />
          <Route path="/ManageEmployers" element={<ManageEmployers />} />
          <Route path="/addComponies" element={<AddComponies />} />
          <Route path="/Settings" element={<Settings />} />
         
     

          
          {/* Add more nested routes here */}
        </Route>

      
        <Route element={<MainLayout />}>
          <Route path="/employer/employerDash" element={<EmployerDash />} />
          <Route path="/employer/CompanyRequsting" element={<CompanyRequsting />} />
          <Route path="/employer/EmployerSettings" element={<EmployerSettings />} />
          <Route path="/employer/EmployerProfile" element={<EmployerProfile />} />
       
        </Route>

    
        <Route element={<MainLayout />}>
          <Route path="/employee/employeDash" element={<EmployeDash />} />
          <Route path="/employee/SearchJob" element={<SearchJob />} />
          <Route path="/employee/AppliedJobs" element={<AppliedJobs />} />
          <Route path="/employee/MyProfile" element={<MyProfile />} />
          <Route path="/employee/EmployeeSettings" element={<EmployeeSettings />} />
        
          
        </Route>


      </Routes>
    </Router>
  );
}

export default App;
