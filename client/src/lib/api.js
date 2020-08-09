import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://boardathome.herokuapp.com';

// Configure Axios Header
axios.interceptors.request.use((config) => {
    // Get Items from localStorage and pass to config header
    let token = localStorage.getItem("token")
    let id = localStorage.getItem("userID")

    if (token) {
        config.headers['Authorization'] = `Bearer ${ token }`
    }

    if (id) {
        config.headers['From'] = parseInt(id)
    }

    return config
}, (err) => {
        return Promise.reject(err)
    }
)

//Format Request to Backend
// https://github.com/axios/axios#request-method-aliases
const api = {
  get: (url, filter) => {
    filter = filter || ""
    return axios.get(baseURL + url + filter)
  },
  put: (url, data) => {
    return axios.put(baseURL + url, data)
  },
  post: (url, data) => {
    return axios.post(baseURL + url, data)
  },
  delete: (url) => {
    return axios.delete(baseURL + url)
  },
  patch: (url, data) => {
    return axios.patch(baseURL + url, data)
  }
}

export default api