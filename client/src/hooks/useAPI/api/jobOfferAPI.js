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
}

export default JobOfferAPI;
