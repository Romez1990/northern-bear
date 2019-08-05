import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
  ],
  scrollBehavior(to) {
    const header = document.querySelector('header') as HTMLElement;
    return {
      selector: to.hash,
      offset: {
        x: 0,
        y: header.offsetHeight,
      },
    };
  },
});
