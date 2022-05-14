import APIGateway from './apiGateway';

class CompanyAPI extends APIGateway {
  async getAll() {
    try {
      const response = await this._client.get('/companies');

      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default CompanyAPI;
