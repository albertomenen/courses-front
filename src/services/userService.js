import axios from "axios"

class UserService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/user`
    });
    this.api.interceptors.request.use(config => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  getUser(id) {
    return this.api.get(`/${id}`).then(({ data }) => data).catch(err => console.error(err))
  }

  editUser(id, body) {
    return this.api.put(`/edit/${id}`, body).then(({ data }) => data).catch(err => console.error(err))
  }

  deleteUser(id) {
    return this.api.delete(`/delete`).then(({ data }) => data).catch(err => console.error(err))
  }

}

const userService = new UserService();
export default userService;