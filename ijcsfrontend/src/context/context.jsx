import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const storedUserData = localStorage.getItem('authedUserData');
  const [authedUserData, setAuthedUserData] = useState(storedUserData ? JSON.parse(storedUserData) : []);
  const [profile_full,setFullUserProfile]=useState(false);

  const CheckProfile = async () => {
    await axios
      .get(`http://localhost:8000/user/employer/check_profile/${authedUserData.id}`)
      .then((val) => {
        console.log(val.data)
        setFullUserProfile(val.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    localStorage.setItem('authedUserData', JSON.stringify(authedUserData));
    CheckProfile();
  }, [authedUserData]);

  return (
    <UserContext.Provider value={{ user: authedUserData, setAuthedUserData,profile_full, CheckProfile }}>
      {children}
    </UserContext.Provider>
  );
};
