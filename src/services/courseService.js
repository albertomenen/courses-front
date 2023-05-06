import axios from "axios";

class CourseService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/course`,
    });
    this.api.interceptors.request.use(config => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
          config.headers = { Authorization: `Bearer ${storedToken}` };
        }
        return config;
      });
  }

  getCourses() {
    return this.api.get('/').then(({ data }) => data).catch(err => console.error(err))
  }

  getCourse(id) {
    return this.api.get(`/${id}`).then(({ data }) => data).catch(err => console.error(err))
  }

  createCourse(body) {
    return this.api.post('/new', body).then(({ data }) => data).catch(err => console.error(err))
  }

  editCourse(id, body) {
    return this.api.put(`/${id}`, body).then(({ data }) => data).catch(err => console.error(err))
  }

  deleteCourse(id) {
    return this.api.delete(`/delete/${id}`).then(({ data }) => data).catch(err => console.error(err))
  }
}

const courseService = new CourseService();
export default courseService;
