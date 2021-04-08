import Vue from 'vue';
import Router from 'vue-router';
import Todo from './components/Todo';
import Signup from './components/users/Signup';
import Signin from './components/users/Signin';
import List from './components/Lists/List';
import Task from './components/Tasks/Task';
import firebase from 'firebase';

// import header from './components/Header';


Vue.use(Router)

let router =  new Router({
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
      path: '/todo',
      name: 'Todo',
      component: Todo,
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