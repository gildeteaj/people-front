import axios from 'axios'

const api = axios.create({
    baseURL: "https://people-crud.herokuapp.com/api/v1/",
    headers: {
      "Content-type": "application/json",
      "Authorization": "Basic cGVzQXBpOnNlY3JldEtleVBlc0FwaQ=="
    }
  });

  export default api;


