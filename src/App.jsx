import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

// Auth Context + Protected Route
import { AuthProvider } from '../src/Components/Auth/AuthContext.jsx';

import ProtectedRoute from '../src/Components/Auth/ProtectedRoute.jsx';
import Inquires from './Components/StarAdmin/Inquires.jsx';
import AddAdmin from './Components/StarAdmin/AddAdmin.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Login />} />
          <Route path="/OtherInquiry" element={<OtherInquiry />} />

          {/* Admin Routes */}
          <Route
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ManageEmployees" element={<ManageEmployees />} />
            <Route path="/ManageEmployers" element={<ManageEmployers />} />
            <Route path="/addComponies" element={<AddComponies />} />
            <Route path="/AddAdmin" element={<AddAdmin />} />
          
            <Route path="/Inquires" element={<Inquires />} />
            <Route path="/Settings" element={<Settings />} />
          </Route>

          {/* Employer Routes */}
          <Route
            element={
              <ProtectedRoute allowedRoles={["employer"]}>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/employer/employerDash" element={<EmployerDash />} />
            <Route path="/employer/CompanyRequsting" element={<CompanyRequsting />} />
            <Route path="/employer/EmployerSettings" element={<Settings />} />
            <Route path="/employer/EmployerProfile" element={<EmployerProfile />} />
          </Route>

          {/* Employee Routes */}
          <Route
            element={
              <ProtectedRoute allowedRoles={["employee"]}>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/employee/employeDash" element={<EmployeDash />} />
            <Route path="/employee/SearchJob" element={<SearchJob />} />
            <Route path="/employee/AppliedJobs" element={<AppliedJobs />} />
            <Route path="/employee/MyProfile" element={<MyProfile />} />
            <Route path="/employee/EmployeeSettings" element={<Settings />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;