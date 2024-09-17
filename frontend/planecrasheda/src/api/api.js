import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'planecrasheda.claaskamsdc4.us-east-2.rds.amazonaws.com/api';

export const fetchIncidents = async (params) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/incidents`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching incidents:', error);
    throw error;
  }
};


export default {
  fetchIncidents,
};