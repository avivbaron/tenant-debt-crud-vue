import Vue from 'vue';
import Router from 'vue-router';
import Tenants from './views/Tasks.vue';
import New from './views/New.vue';
import Edit from './views/Edit.vue';
import Register from './views/Register.vue';
import Login from './views/Login.vue';
// import Home from './views/Home.vue';
import Show from './views/Show.vue';


Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/users/login'
    },
    // {
    //   path: '/home',
    //   name: 'home',
    //   component: Home
    // },
    {
      path: '/tasks',
      name: 'tasks',
      component: Tenants,
      meta: {
          requiresAuth: true
        }
    },
    {
      path: '/tasks/new',
      name: 'new-task',
      component: New
    },
    {
      path: '/tasks/:id',
      name: 'show',
      component: Show
    },
    {
      path: '/tasks/:id/edit',
      name: 'edit',
      component: Edit
    },
    {
      path: "/users/login",
      name: "login",
      component: Login
    },
    {
      path: "/users/register",
      name: "register",
      component: Register
    }

  ]
});

// check if auth is needed
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("jwt") == null) {
      next({
        path: "/"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
