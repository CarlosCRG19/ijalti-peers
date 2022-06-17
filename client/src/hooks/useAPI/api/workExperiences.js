import APIGateway from './apiGateway';

class WorkExperiencesAPI extends APIGateway {
  async getWorkExperiencesByAspirant(aspirantId) {
    try {
      const response = await this._client.get(`/workExperiences/?aspirantId=${aspirantId}`);

      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default WorkExperiencesAPI;
