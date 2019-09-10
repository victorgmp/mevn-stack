import axios from 'axios';

const url = 'http://localhost:3000/api/tasks/';

class TaskService {
  // get tasks
  static getTasks() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data;
        resolve(
          data.map(task => ({
            ...task
          }))
        );
      } catch (err) {
        reject(err);
      }
    });
  }

  // get task
  static getTask(id) {
    return axios.get(`${url}${id}`);
    // const data = res.data;
  }

  // create task
  static insertTask(task) {
    // console.log(task);
    return axios.post(url, {
      title: task.title,
      description: task.description
    });
  }

  // update task
  static updateTask(id, task) {
    // console.log(task);
    return axios.put(`${url}${id}`, {
      title: task.title,
      description: task.description
    });
  }

  // delete task
  static deleteTask(id) {
    return axios.delete(`${url}${id}`);
  }
}

export default TaskService;