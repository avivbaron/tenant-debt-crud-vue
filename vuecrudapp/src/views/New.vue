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
    <h1>New task</h1>
    <task-form @createOrUpdate="createOrUpdate"></task-form>
  </div>
</template>

<script>
import taskForm from '../components/TaskForm.vue';
import { api } from '../helpers/helpers';

// create new Tenant page
export default {
  name: 'new-task',
  components: {
    'task-form': taskForm
  },
  methods: {
    createOrUpdate: async function(task) {
      const res = await api.createtask(task);
      this.flash('Tenant created', 'success');
      this.$router.push(`/tasks/${res._id}`);
    }
  }
};
</script>
