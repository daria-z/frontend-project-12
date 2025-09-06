import axios from "axios"

export const login = async (values) => {
  try {
    const response = await axios.post('/api/v1/login', values)
    console.log(response.data)
    return response.data
  } catch (err) {
    console.log("Error:", err);
    // для обработки ошибки сервера || для обработки ошибки от axios
    throw err.response?.data?.error || err.response;
  }
}


