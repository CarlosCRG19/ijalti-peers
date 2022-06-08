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

  async filterBySkills(skillSet) {
    try {
      if (skillSet.length === 0) return [];
      let query = '';
      skillSet.forEach((skill, index) => {
        if (index === 0) query += `?skills=${skill}`;
        else query += `&skills=${skill}`;
      });
      const response = await this._client.get(`/aspirants/${query}`);
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
}

export default AspirantAPI;
