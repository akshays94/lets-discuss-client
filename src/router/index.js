import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Questions from '../views/Questions.vue'
import Question from '../views/Question.vue'
import AddQuestion from '../views/AddQuestion.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import store from '../store'

Vue.use(VueRouter)

const tryAutoLogin = (next) => {
  store.dispatch('tryAutoLogin')
  if (store.state.authToken) {
    next()
  } else {  
    next('/login')
  }
}

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter (to, from, next) {
      tryAutoLogin(next)
    },
    children: [
      {
        path: '/',
        name: 'questions',
        component: Questions
      },
      {
        path: '/questions/:questionId',
        name: 'question',
        component: Question,
        props: true
      },
      {
        path: '/add-question',
        name: 'add-question',
        component: AddQuestion
      }
    ]
  }  
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
