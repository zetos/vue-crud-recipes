import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/add-recipe',
      name: 'addRecipe',
      // route level code-splitting
      // this generates a separate chunk (AddRecipe.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "AddRecipe" */ './views/AddRecipe.vue')
    },
    {
      path: '/edit-recipe/:recipe_slug',
      name: 'editRecipe',
      component: () => import('./views/EditRecipe.vue')
    }
  ]
});
