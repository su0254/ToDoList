import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5093', 
});
axiosInstance.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    console.error('Error occurred:', error.response ? error.response.data : error.message);
    return Promise.reject(error);
  }
);
export default {
  getTasks: async () => {
    const result = await axiosInstance.get(`/tasks`)
    return result;
  },

  addTask: async (name) => {
    console.log('addTask', name)
    const result = await axiosInstance.post(`/tasks`, {
      Name: name,
      IsComplete: false
    })
    return result;
  },

  setCompleted: async (id, isComplete) => {
    console.log('setCompleted', { id, isComplete })
    const result = await axiosInstance.put(`/tasks/${id}`, { IsComplete: isComplete });
    return result;
  },

  deleteTask: async (id) => {
    console.log('deleteTask')
    const result = await axiosInstance.delete(`/tasks/${id}`);
    return result;
  }
};
