import APIGateway from './apiGateway';

class SkillAPI extends APIGateway {
  async getAll() {
    try {
      const response = await this._client.get('/skills');

      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default SkillAPI;
