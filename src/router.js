import Vue from 'vue';
import Router from 'vue-router';
import Signup from './components/Users/Signup';
import Signin from './components/Users/Signin';
import Genre from './components/Genre/Genre';
import Task from './components/Tasks/Task';
import Progress from './components/Progress/Progress';
import firebase from 'firebase';
import Calendar from './components/Calendar';



Vue.use(Router)

const router =  new Router({
  mode: "history",
  routes: [
    {
     path: '/',
     name: 'Genre',
      component: Genre,
    },
    {
     path: '/:id/task',
     name: 'Task',
     component: Task,
    },
    {
     path: '/signup',
     name: 'Signup',
     component: Signup
    },
    {
     path: '/signin',
     name: 'Signin',
     component: Signin
    },
    {
      path: '/progress',
      name: 'Progress',
      component: Progress
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: Calendar,
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/' || to.path === '/progress' || to.name === 'Task') {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        next()
      } else {
        next({
          path: '/signin',
        })
      }
    })
  } else {
    next() 
  }
})


export default router