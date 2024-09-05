import React, { useEffect, useState } from "react";
import success from "../assets/images/success.jpg";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
const RegistrationSuccess = () => {
  const [verificationError, setVerificationError] = useState(null);
  const [email, setEmail] = useState();
  const [token, setToken] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [emailVerified, setEmailVerified] = useState(false);
  useEffect(() => {
    const email = searchParams.get("email");
    const token = searchParams.get("token");
    const verifyEmail = async () => {
      await axios
        .patch(`http://127.0.0.1:8000/verify/${email}/${token}/`)
        .then((val) => {
          console.log(val.data.message);

          setEmailVerified(true);
        })
        .catch((err) => {
          if (err.response) {
            setVerificationError(true);
          } else {
            console.log(err);
          }
        });
    };
    console.log(email, token);
    verifyEmail();
  }, [location.search]);

  return (
    <div className="flex justify-center mt-24 h-screen ">
      {emailVerified ? (
        <div className="px-7 md:px-20 lg:px-0 lg:w-1/3 flex flex-col items-center text-center gap-5">
          <div className="flex justify-center">
            <img src={success} alt="successfull" width={150} />
          </div>
          <div className="flex">
            <h1 className="font-bold ">
              Congratulation , Account Verified Successfully 
            </h1>
          </div>
          <p className="text-start text-sm">
             Dear user , your email is verifed successfully ,<br /> Now you can enjoy features provided by IJC 
          </p>
          <div className="flex gap-5 justify-center">
            <Link to={"/"}>
              <button className="bg-blue-500 px-4 py-2 text-white">
               Home
              </button>
            </Link>
            <Link to={"/login"}>
              <button className="bg-blue-500 px-4 py-2 text-white">
                Login
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <h1>Email Verification failed</h1>
      )}
    </div>
  );
};
export default RegistrationSuccess;
