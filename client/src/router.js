import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'add-article',
          component: () => import('./components/AddArticle.vue')
        },
        {
          path: '/',
          component: () => import('./components/Article.vue')
        },
        {
          path: '/edit-article/:id',
          component: () => import('./components/EditArticle.vue')
        },
        {
          path: '/article/:id',
          component: () => import('./components/fullPageArticle.vue')
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
