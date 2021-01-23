<template>
  <div>
    <div class="ui inverted segment navbar">
      <div class="ui center aligned container">
        <div class="ui large secondary inverted pointing menu compact">
          <router-link to="/tasks" exact class="item">
           <i class="tasks icon"></i> Tenants
          </router-link>
          <router-link to="/tasks/new" class="item">
            <i class="plus circle icon"></i> New
          </router-link>

        </div>
      </div>
    </div>
    <h1>Tenants</h1>
    <div width="75" class="center aligned" @click.prevent="onDebt()">

    </div>

    <div>
      <input type="text" class="filterBtn" placeholder="Filter By Name" @change="onSearch($event)"/>
      <button width="75" class="filterBtn center aligned" @click.prevent="onDebt()">Get All With Debt</button>
      <button width="75" class="filterBtn center aligned" @click.prevent="onNoDebt()">Get All Without Debt</button>
      <button width="75" class="filterBtn center aligned" @click.prevent="onShowAllTasks()">Get All Tasks</button>
    </div>
    <table id="tasks" class="ui celled compact table">
      <thead>
        <tr>
          <th>  <i class="calendar plus icon"></i>Name</th>
          <th> <i class="info circle icon"></i>Debt</th>
          <th> <i class="lock open icon"></i></th>
          <th> <i class="edit icon"></i></th>
          <th> <i class="trash icon"></i></th>
        </tr>
      </thead>
      <tr v-for="(task, i) in tasks" :key="i">
        <td>{{ task.name }}</td>
        <td>{{ task.debt }}</td>
        <td width="75" class="center aligned">
          <router-link :to="{ name: 'show', params: { id: task._id }}">Show</router-link>
        </td>
        <td width="75" class="center aligned">
          <router-link :to="{ name: 'edit', params: { id: task._id }}">Edit</router-link>
        </td>
        <td width="75" class="center aligned" @click.prevent="onDestroy(task._id)">
          <a :href="`/tasks/${task._id}`">Delete</a>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { api } from '../helpers/helpers';
export default {
  name: 'tasks',
  data() {
    return {
      tasks: []
    };
  },
  methods: {
    // delete task
    async onDestroy(id) {
      const sure = window.confirm('Are you sure?');
      if (!sure) return;
      await api.deletetask(id);
      this.flash('tenant deleted sucessfully!', 'success');
      const newtasks = this.tasks.filter(task => task._id !== id);
      this.tasks = newtasks;
    },
    // filter those who have debt
    async onDebt() {
      let newtasks = await api.gettasks(this.token);
      this.tasks = newtasks.filter(task => task.debt > 0);
    },
    // filter those who havn't debt
    async onNoDebt() {
      let newtasks = await api.gettasks(this.token);
      this.tasks = newtasks.filter(task => task.debt == '0');
    },
    // show all tenants
    async onShowAllTasks() {
      let alltasks = await api.gettasks(this.token);
      this.tasks = alltasks;
    },
    //search tenant by name
    async onSearch(event) {
      if(this.token, event.target.value !== ""){
        let searchresult = await api.searchtasks(this.token, event.target.value);
        this.tasks = searchresult;
      }
      else this.tasks = await api.gettasks(this.token);

    }
  },
  async mounted() {
    this.token = localStorage.getItem("jwt");
    this.search_query = "";
    this.tasks = await api.gettasks(this.token);
  }
};

</script>
<style scooped>
.filterBtn {
  margin: 20px 10px;
}
</style>
