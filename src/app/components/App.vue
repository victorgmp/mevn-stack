<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <a href="/" class="navbar-brand">MEVN Stack</a>
    </nav>

    <div class="container">
      <div class="row pt-5">
        <div class="col-md-5">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="sendTask">
                <div class="form-group">
                  <input
                    type="text"
                    placeholder="Insert a task"
                    class="form-control"
                    v-model="task.title"
                  />
                </div>
                <div class="form-group">
                  <textarea
                    cols="30"
                    rows="10"
                    class="form-control"
                    placeholder="Inser a description"
                    v-model="task.description"
                  ></textarea>
                </div>
                <template v-if="edit === false">
                  <button class="btn btn-primary btn-block">Add</button>
                </template>
                <template v-else>
                  <button class="btn btn-primary btn-block">Update</button>
                </template>
              </form>
            </div>
          </div>
        </div>
        <div class="col-md-7">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Task</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="task of tasks" v-bind:key="task._id">
                <td>{{ task.title }}</td>
                <td>{{ task.description }}</td>
                <td>
                  <button 
                    @click="deleteTask(task._id)" 
                    class="btn btn-danger"
                  >
                    Delete
                  </button>
                  <button 
                    @click="editTask(task._id)" 
                    class="btn btn-secondary"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TaskService from '../services/TaskService';

class Task {
  constructor(title, description) {
    this.title = title;
    this.description = description;
  }
}

export default {
  data() {
    return {
      task: new Task(),
      tasks: [],
      edit: false,
      taskToEdit: ''
    };
  },
  created() {
    this.getTasks();
  },
  methods: {
    async getTasks() {
      try {
        this.tasks = await TaskService.getTasks();
      } catch (err) {
        this.error = err.message;
      }
    },
    async sendTask() {
      if(this.edit === false) {
        await TaskService.insertTask(this.task);
        this.tasks = await TaskService.getTasks();
      } else {
        await TaskService.updateTask(this.taskToEdit, this.task);
        this.getTasks();
        this.edit = false;
      }
      this.task = new Task();
    },
    async deleteTask(id) {
      await TaskService.deleteTask(id);
      this.tasks = await TaskService.getTasks();
    },
    async editTask(id) {
      const { data } = await TaskService.getTask(id);
      this.task = new Task(data.title, data.description);
      this.taskToEdit = data._id;
      this.edit = true;
    }
  }
};
</script>
