import Dashboard from "./pages/Dashboard";
import LandingPage from './components/LandingPage';
import { Divide } from "lucide-react";
import {  Routes, Route,useNavigate } from 'react-router-dom';
import Navbar from "./components/Navbar";
import ResearchPage from "./pages/ResearchPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { useState } from "react";
import ForgotPassword from "./pages/ForgotPassword"
// import userRoutes from "./"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <div className="min-h-screen flex flex-col bg-blue-50 dark:bg-gray-900 text-blue-900 dark:text-white transition-colors duration-300">

      <div className="fixed w-full top-0 left-0 z-50">
          <Navbar 
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
          />
      </div>
      <div className="pt-10 flex-1 overflow-hidden">
        <Routes>
          <Route path="/signup" element={<SignupPage setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated}/>} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/" element={<LandingPage/>} />
          <Route path="/research" element={<ResearchPage/>} />

        </Routes>
      </div>
    </div>
  );
}

export default App;
