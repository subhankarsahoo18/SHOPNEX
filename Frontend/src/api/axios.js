import axios from 'axios'
const api=axios.create({
baseURL:"https://shopnex-gb3i.onrender.com/api"
})

export default api;