// import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect,useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import RegisterEmployer from "./pages/Employer/registerEmployer";
import { UserProvider } from "./context/context";
// import { UserProvider } from "./context/context";
import RegistrationSuccess from "./pages/registrationCompletion";
import HomePage from "./pages/homePage";
import Login from "./pages/login";
import AdminDashboard from "./pages/Admin/adminDashboard";
// import AdminDashboard from "./pages/Admin/adminDashboard";
import Footer from "./components/footer/Footer";
import JobDetail from "./pages/job_detail";
import Register from "./pages/register";
import About from "./pages/about_us";

import TermsAndConditions from "./pages/terms_and_conditions";
import MemoizedJobSeekerDashboard from "./components/dashboards/jobseeker/JobSeekerDashboard";
import RegisterCandidate from "./pages/Candidate/RegisterCandidate";
import RecommendJobList from "./components/body/RecommendJobList";
import EmployerDashboard from "./pages/Employer/employerDashboard";
import JobDetails from "./components/body/JobDetails";
import EmailVerification from "./components/auth/verify_email/VerifyEmail";

import ResetPassword from "./pages/reset-password";
import FindJob from "./components/job/FindJob";
import Contact_us from "./pages/contact_us";


function App() {
  
  const location = useLocation();
  const currentPath = location.pathname;
  console.log(currentPath);

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (currentPath.includes("/jobseeker-dashboard") && !user) {
      navigate("/login");
    }
  }, [currentPath, user, navigate]);

  return (
    <UserProvider>
      <div className="flex flex-col min-h-screen">
        {!currentPath.includes("/EmployerDashboard") && <Header/>}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="find-job" element={<FindJob/>} />
            {/* <Route path="jobseeker-dashboard" element={<JobSeekerDashbord />} /> */}

            {user ? (
              <Route
                path="jobseeker-dashboard"
                element={<MemoizedJobSeekerDashboard />}
              />
            ) : (
              <Route path="login" element={<Login />} />
            )}

            <Route
              path="jobseeker-dashboard/job-detail/:jobId"
              element={<JobDetails />}
            />
            <Route path="jobseeker_signup" element={<RegisterCandidate />} />
            <Route path="registerEmployer" element={<RegisterEmployer />} />
            <Route
              path="recommended_job"
              element={<RecommendJobList employerId={2} />}
            />
            <Route path="verify" element={<RegistrationSuccess />} />
            <Route path="EmployerDashboard/*" element={<EmployerDashboard />} />
            <Route path="AdminDashboard/*" element={<AdminDashboard />} />
            <Route path="find-job/job-detail/:id" element={<JobDetail />} />
            <Route path="job_detail/:id" element={<JobDetail />} />

            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="verify/:email" element={<EmailVerification />} />
            <Route path="terms_conditions" element={<TermsAndConditions />} />
            <Route path="resetPassword" element={<ResetPassword />} />
            <Route path="about_ijcs" element={<About />} />
            <Route path="contact_us" element={<Contact_us />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </UserProvider>
  );
}

export default App;
