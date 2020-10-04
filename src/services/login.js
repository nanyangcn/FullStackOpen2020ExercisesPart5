import axios from 'axios'
const baseUrl = '/api/login'

const loginService = async (newUser) => {
  const response = await axios.post(baseUrl, newUser)
  return response.data
}

export default loginService
