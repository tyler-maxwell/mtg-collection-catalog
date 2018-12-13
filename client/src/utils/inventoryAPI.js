import axios from "axios";

export default {
  getCardsByPage: function(id, page) {
    return axios.get(`/api/inventory/${id}/${page}`);
  },
  submitBatch: function(id, batch) {
    return axios.put(`/api/inventory/${id}`, batch);
  }
};
