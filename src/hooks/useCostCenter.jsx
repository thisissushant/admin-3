import { useEffect, useState } from 'react';
import axios from 'axios';
import { COST_CENTER } from 'store/constant';

const useCostCenter = () => {
  const [costCenter, setCostCenter] = useState([]);

  useEffect(() => {
    const fetchCostCenter = async () => {
      try {
        const response = await axios.get(`${COST_CENTER}/cost_centers`);
        setCostCenter(response.data);
      } catch (error) {
        console.error('Error fetching cost center data: ', error);
      }
    };

    fetchCostCenter();
  }, []);

  return { costCenter };
};

export default useCostCenter;
