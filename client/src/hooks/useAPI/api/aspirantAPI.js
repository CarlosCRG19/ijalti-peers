import APIGateway from './apiGateway';

class AspirantAPI extends APIGateway {
  async getAll() {
    try {
      const response = await this._client.get('/aspirants');

      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAspirant(idAspirant) {
    try {
      const response = await this._client.get(`/aspirants/${idAspirant}`);

      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async login(email, password) {
    try {
      const response = await this._client.post('/login/aspirant', { email, password });

      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async signup(email, password, aspirant) {
    try {
      const response = await this._client.post('/signup/aspirant', { email, password, aspirant });

      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async searchAspirants(searchQuery) {
    try {
      const response = await this._client.get(`/aspirants/${searchQuery}`);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async setInterested(idAspirant, idJobOffer) {
    try {
      const response = await this._client.post(`/aspirants/${idAspirant}/interests/${idJobOffer}`);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async setUninterested(idAspirant, idJobOffer) {
    try {
      const response = await this._client.delete(`/aspirants/${idAspirant}/interests/${idJobOffer}`);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default AspirantAPI;
