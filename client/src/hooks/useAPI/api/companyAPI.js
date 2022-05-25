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

  async login(email, password) {
    console.log(this._client);
    try {
      const response = await this._client.post('/companies/login', { email, password });

      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default CompanyAPI;
