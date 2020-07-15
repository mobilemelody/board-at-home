import axios from 'axios';

// Configure Axios Header
axios.interceptors.request.use((config) => {
    // Get Items from localStorage and pass to config header

    let token = localStorage.getItem("token")

    if (token) {
        config.headers['Authorization'] = `Bearer ${ token }`
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
    return axios.get(process.env.REACT_APP_API_URL + url + filter)
  },
  put: (url, data) => {
    return axios.put(process.env.REACT_APP_API_URL + url, data)
  },
  post: (url, data) => {
    return axios.post(process.env.REACT_APP_API_URL + url, data)
  },
  delete: (url) => {
    return axios.delete(process.env.REACT_APP_API_URL + url)
  }
}

export default api