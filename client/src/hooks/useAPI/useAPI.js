import axios from 'axios';

import { JobOfferAPI } from './api';

const useAPI = () => {
  // TODO: define baseURL on compilation
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/',
    headers: { 'Content-Type': 'application/json' },
  });

  return {
    jobOffer: new JobOfferAPI(axiosInstance),
  };
};

export default useAPI;
