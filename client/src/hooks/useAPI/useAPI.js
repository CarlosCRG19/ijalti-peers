import axios from 'axios';

import { CompanyAPI, JobOfferAPI } from './api';

const useAPI = () => {
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    headers: { 'Content-Type': 'application/json' },
  });

  return {
    company: new CompanyAPI(axiosInstance),
    jobOffer: new JobOfferAPI(axiosInstance),
  };
};

export default useAPI;
