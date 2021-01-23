<template>
 <form action="#" @submit.prevent="onSubmit">
    <p v-if="errorsPresent" class="error">Please fill out both fields!</p>


    <div class="ui labeled input fluid">
      <div class="ui label">
        <i class="calendar plus icon"></i>Name
      </div>
      <input type="text" placeholder="Enter name..." v-model="task.name" />
    </div>

    <div class="ui labeled input fluid">
      <div class="ui label">
        <i class="calendar plus icon"></i>Phone Number
      </div>
      <input type="text" placeholder="Enter phone number" v-model="task.phoneNumber" />
    </div>

    <div class="ui labeled input fluid">
      <div class="ui label">
        <i class="calendar plus icon"></i>Address
      </div>
      <input type="text" placeholder="Enter address" v-model="task.address" />
    </div>


    <div class="ui labeled input fluid">
      <div class="ui label">
   <i class="info circle icon"></i> Debt
      </div>
      <input type="text" placeholder="Enter debt" v-model="task.debt" />
    </div>



    <button class="positive ui button">Submit</button>
  </form>
</template>

<script>
export default {
  name: 'task-form',
  props: {
    task: {
      type: Object,
      required: false,
      default: () => {
        return {
          name: '',
          phoneNumber: '',
          address: '',
          debt: ''
        };
      }
    }
  },
  data() {
    return {
      errorsPresent: false
    };
  },
  methods: {
    onSubmit: function() {
      if (this.task.name === '' || this.task.debt === '' || this.task.address === '' || this.task.phoneNumber === '') {
        this.errorsPresent = true;
      } else {
        this.$emit('createOrUpdate', this.task);
        this.$router.push("/tasks");
      }
    }
  }
};
</script>

<style scoped>
.error {
  color: red;
}
</style>
