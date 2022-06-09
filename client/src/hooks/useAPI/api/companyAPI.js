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

  async getCompany(idCompany) {
    try {
      const response = await this._client.get(`/companies/${idCompany}`);

      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async login(email, password) {
    try {
      const response = await this._client.post('/login/company', { email, password });

      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async signup(email, password, company) {
    try {
      const response = await this._client.post('/signup/company', { email, password, company });

      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default CompanyAPI;
