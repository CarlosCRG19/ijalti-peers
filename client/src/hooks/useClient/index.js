import axios from "axios";

import { CompaniesClient, OffersClient } from "./clients";

const useClient = () => {
  // TODO: define baseURL on compilation
  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/",
    headers: { "Content-Type": "application/json" },
  });

  return {
    companies: new CompaniesClient(axiosInstance),
    offers: new OffersClient(axiosInstance),
  };
};

export default useClient;
