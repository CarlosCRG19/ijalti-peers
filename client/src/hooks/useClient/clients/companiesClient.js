import APIClient from "./apiClient";

class CompaniesClient extends APIClient {
  async create(businessName, password) {
    try {
      const response = await this._client.post("/companies", {
        businessName,
        password,
      });

      return response.data.company;
    } catch (error) {
      return this._handleError(error);
    }
  }

  async getById(id) {
    try {
      const response = await this._client.get(`/companies/${id}`);

      return response.data.company;
    } catch (error) {
      return this._handleError(error);
    }
  }

  async getAll() {
    try {
      const response = await this._client.get("/companies");

      return response.data.companies;
    } catch (error) {
      return this._handleError(error);
    }
  }

  async update(id, businessName, password) {
    try {
      const response = await this._client.put(`/companies/${id}`, {
        businessName,
        password,
      });

      return response.data.company;
    } catch (error) {
      return this._handleError(error);
    }
  }

  async delete(id) {
    try {
      await this._client.delete(`/companies/${id}`);
    } catch (error) {
      return this._handleError(error);
    }
  }

  _handleError(error) {
    throw new Error(error.message);
  }
}

export default CompaniesClient;
