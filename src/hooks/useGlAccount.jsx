import React, { useEffect, useState } from "react";
import axios from "axios";
 
import { COST_CENTER } from "store/constant";
 
const useGlAccount = () => {
  const [glAccountId, setGlAccountId] = useState([]);
 
  useEffect(() => {
    const fetchGlAccountId = async () => {
      try {
        const response = await axios.get(`${COST_CENTER}/gl_account`);
        setGlAccountId(response.data);
      } catch (error) {
        console.log("Error fetching cost center data:", error);
      }
    };
    fetchGlAccountId();
  }, []);
  return { glAccountId };
};
 
export default useGlAccount;