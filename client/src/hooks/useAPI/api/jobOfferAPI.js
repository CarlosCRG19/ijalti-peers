import APIGateway from './apiGateway';

class JobOfferAPI extends APIGateway {
  async create(jobOffer) {
    try {
      const response = await this._client.post('/job-offers', jobOffer);

      return response.data.offer;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAll() {
    try {
      const response = await this._client.get('/job-offers');

      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }


  async getByPage(page) {
    try {
      const response = await this._client.get(`job-offers/?page=${page}`);

      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getByCompanyID(companyID) {
    try {
      console.log(companyID);
      const response = await this._client.get(`job-offers/?companyId=${companyID}`);

      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default JobOfferAPI;
