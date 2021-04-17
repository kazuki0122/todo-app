import Vue from 'vue';
import Router from 'vue-router';
import Signup from './components/Users/Signup';
import Signin from './components/Users/Signin';
import List from './components/Lists/List';
import Task from './components/Tasks/Task';
import Progress from './components/Progress/Progress';
import firebase from 'firebase';


Vue.use(Router)

const router =  new Router({
  mode: "history",
  routes: [
    {
     path: '/',
     name: 'List',
     component: List,
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
    }
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth) {
    // このルートはログインされているかどうか認証が必要です。
    // もしされていないならば、ログインページにリダイレクトします。
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
    next() // next() を常に呼び出すようにしてください!
  }
})


export default router