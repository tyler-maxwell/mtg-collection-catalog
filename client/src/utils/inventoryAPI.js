import axios from "axios";

export default {
  submitBatch: function(id, batch) {
    console.log();
    console.log("submitBatch");
    console.log();
    return axios.put("/api/inventory/" + id, batch);
  }
};
