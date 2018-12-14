import axios from 'axios';

export default {
  searchCardName: function(name) {
    return axios.get('/api/card-info/name/' + name);
  }
};
