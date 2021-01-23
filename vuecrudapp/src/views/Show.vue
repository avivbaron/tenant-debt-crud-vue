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
    <h1>Show Tenant</h1>


    <div class="ui labeled input fluid">
      <div class="ui label">
      <i class="tasks icon"></i>  Name
      </div>
      <input type="text" readonly  :value="task.name"/>
    </div>

    <div class="ui labeled input fluid">
      <div class="ui label">
        <i class="info circle icon"></i> Address
      </div>
    <input type="text" readonly  :value="task.address"/>
    </div>

    <div class="ui labeled input fluid">
     <div class="ui label">
       <i class="info circle icon"></i> Phone Number
     </div>
     <input type="text" readonly  :value="task.phoneNumber"/>
   </div>

     <div class="ui labeled input fluid">
      <div class="ui label">
        <i class="info circle icon"></i> Debt
      </div>
      <input type="text" readonly  :value="task.debt"/>
    </div>
    <div class="actions">
      <router-link :to="{ name: 'edit', params: { id: this.$route.params.id }}">
        Edit task
      </router-link>
    </div>
  </div>
</template>

<script>

//shows tenant details
import { api } from '../helpers/helpers';
export default {
  name: 'show',
  data() {
    return {
      task:''
    };
  },
  async mounted() {
    this.task = await api.gettask(this.$route.params.id);
  }
};
</script>

<style scoped>
.actions a {
  display: block;
  text-decoration: underline;
  margin: 20px 10px;
}
</style>
