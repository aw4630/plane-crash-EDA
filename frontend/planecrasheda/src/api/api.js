import axios from 'axios';

const API_BASE_URL = 'https://localhost:3000/api';

export const fetchIncidents = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/incidents`);
    return response.data;
  } catch (error) {
    console.error('Error fetching incidents:', error);
    throw error;
  }
};

export const searchIncidentsByKeyword = async (keyword) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/incidents/search?keyword=${keyword}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching incidents:', error);
      throw error;
    }
  };

export const getIncidentsBySort = async (sortCriteria) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/incidents/sort?sortBy=${sortCriteria}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching incidents:', error);
    throw error;
  }
};

export const getIncidentsByFilter = async (model) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/incidents/filter?model=${model}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching incidents:', error);
    throw error;
  }
};



