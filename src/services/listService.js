import axios from "axios"

class ListService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/list`,
    });
    this.api.interceptors.request.use(config => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
          config.headers = { Authorization: `Bearer ${storedToken}` };
        }
        return config;
      });
  }

  getList(id) {
    return this.api.get(`/${id}`).then(({ data }) => data).catch(err => console.error(err))
  }

  getLists() {
    return this.api.get('/').then(({ data }) => data).catch(err => console.error(err))
  }

  createList(body) {
    console.log('Calling API to create a new list:', body); // Debugging line
    return this.api.post(`/`, body).then(({ data }) => data).catch(err => console.error(err))
  }

  deleteList(id) {
    return this.api.delete(`/${id}`).then(({ data }) => data).catch(err => console.error(err))
  }

  async addList(listData) {
    try {
      const response = await this.api.post('/new', listData);
      return response.data;
    } catch (error) {
      console.error('Error adding list:', error);
      throw error;
    }
  }

  // async getCourses2() {
  //   try {
  //     const response = await this.api.get('/');
  //     return response.data
  //   } catch (error) {
  //     console.error(err)
  //   }
  // }


}

const listService = new ListService();
export default listService;