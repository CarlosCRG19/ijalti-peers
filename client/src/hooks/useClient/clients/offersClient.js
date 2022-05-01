import APIClient from "./apiClient";

class OffersClient extends APIClient {
  async create(position, salary, location, companyId) {
    try {
      const response = await this._client.post("/offers", {
        position,
        salary,
        location,
        company: companyId,
      });

      return response.data.offer;
    } catch (error) {
      return this._handleError(error);
    }
  }

  async getById(id) {
    try {
      const response = await this._client.get(`/offers/${id}`);

      return response.data.offer;
    } catch (error) {
      return this._handleError(error);
    }
  }

  async getAll() {
    try {
      const response = await this._client.get("/offers");

      return response.data.offers;
    } catch (error) {
      return this._handleError(error);
    }
  }

  async update(id, position, salary, location) {
    try {
      const response = await this._client.put(`/offers/${id}`, {
        position,
        salary,
        location,
      });

      return response.data.offer;
    } catch (error) {
      return this._handleError(error);
    }
  }

  async delete(id) {
    try {
      await this._client.delete(`/offers/${id}`);
    } catch (error) {
      return this._handleError(error);
    }
  }

  _handleError(error) {
    throw new Error(error.message);
  }
}

export default OffersClient;
