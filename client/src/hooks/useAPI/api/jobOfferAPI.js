import APIGateway from './apiGateway';

class JobOfferAPI extends APIGateway {
  async create(jopOffer) {
    try {
      const response = await this._client.post('/job-offers', jopOffer);

      return response.data.offer;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default JobOfferAPI;
