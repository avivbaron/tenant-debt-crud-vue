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
    <h1>Edit task</h1>
  <task-form @createOrUpdate= "createOrUpdate" :task=this.task></task-form>
</div>
</template>

<script>
import taskForm from '../components/TaskForm.vue';
import {api} from '../helpers/helpers';

export default {
  name: 'edit',
  components: {
    'task-form': taskForm
  },
  data: function() {
    return {
      task: {}
    };
  },
  methods: {
    createOrUpdate: async function(task) {
      await api.updatetask(task);
      this.flash('task updated sucessfully!', 'success');
      this.$router.push(`/tasks/${task._id}`);
    }
  },
  async mounted() {
    this.task = await api.gettask(this.$route.params.id);
  }
};
</script>
