import React from "react"; 
import { useUserContext } from "../../context/context";
const Schedules = () => {
  const { user } = useUserContext(); 
    return <div>{user.id} Schedules</div>;
  };
  export default Schedules;
   