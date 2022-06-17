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

  async getByCompanyID(companyID, page) {
    try {
      const response = await this._client.get(`job-offers/?companyId=${companyID}&page=${page}`);

      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getInterestedAspirants(jobOfferId) {
    try {
      const response = await this._client.get(`/job-offers/${jobOfferId}/interested-aspirants`);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async delete(jobOfferId) {
    try {
      const response = await this._client.delete(`/job-offers/${jobOfferId}`);

      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default JobOfferAPI;
