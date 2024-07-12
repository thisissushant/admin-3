import React, { useEffect, useState } from "react";
import axios from "axios";
 
import { COST_CENTER } from "store/constant";
 
const useCategoryID = () => {
  const [categoryId, setCategoryId] = useState([]);
 
  useEffect(() => {
    const fetchCategoryId = async () => {
      try {
        const response = await axios.get(`${COST_CENTER}/allCategoryIds`);
        setCategoryId(response.data);
      } catch (error) {
        console.log("Error fetching cost center data:", error);
      }
    };
    fetchCategoryId();
  }, []);
  return { categoryId };
};
 
export default useCategoryID;