import axios from 'axios';
import Vue from 'vue';
import VueFlashMessage from 'vue-flash-message';
import 'vue-flash-message/dist/vue-flash-message.min.css';

Vue.use(VueFlashMessage, {
  messageOptions: {
    timeout: 3000,
    pauseOnInteract: true
  }
});

const vm = new Vue();
const baseURL = 'http://localhost:3000/';
const tasks = 'tasks/';

const handleError = fn => (...params) =>
  fn(...params).catch(error => {
    vm.flash(`${error.response.status}: ${error.response.statusText}`, 'error');
  });

export const api = {
  // get one tenant
  gettask: handleError(async id => {
    const res = await axios.get(baseURL + tasks + id);
    return res.data;
  }),
  //get all tenants
  gettasks: handleError(async (token) => {
    const res = await axios.get(baseURL + tasks, {'headers': {'authorization': token}});
    return res.data;
  }),
  //delete tenant
  deletetask: handleError(async id => {
    const res = await axios.delete(baseURL + tasks + id);
    return res.data;
  }),
  //create tenant
  createtask: handleError(async payload => {
    const res = await axios.post(baseURL + tasks, payload);
    return res.data;
  }),
  //edit tenant
  updatetask: handleError(async payload => {
    const res = await axios.put(baseURL + tasks + payload._id, payload);
    return res.data;
  }),
  //search tenant by name
  searchtasks: handleError(async (token, search_query) => {
    const res = await axios.get(baseURL + "search/" + search_query,  {'headers': {'authorization': token}});
    return res.data;
  })
};
