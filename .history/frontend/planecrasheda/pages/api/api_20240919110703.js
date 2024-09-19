import axios from 'axios';

const API_BASE_URL = process.env.POSTGRES__URL_NON_POOLING || '/api';

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