import Vue from 'vue'
import Vuex from 'vuex'
import { db,auth } from "../main";

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    lists: [],
    tasks: [],
    sorting: false,
    lastSortId: 0,
  },
  getters: {
    
  },
  mutations: {
    updateSortId(state, size) {
      state.lastSortId = size
    },
    createList(state, payload) {
      state.lists.push(payload)
    },
    updateList(state, list) {
      state.lists = list
    },
    deleteList(state, lists) {
      state.lists = lists
    },
    saveList(state, lists) {
      state.lists = lists
    },
    createTask(state, payload) {
      state.tasks.push(payload)
    },
    reloadTask(state, task) {
      state.tasks = task
    },
    completeTask(state, task) {
      state.tasks[task.i].task = task
    },
    delteTask(state, task) {
      state.tasks = task
    },
    editTask(state, task) {
      state.tasks = task
    },
    sortTask(state) {
      state.sorting = !state.sorting
    },
    updateTask(state, payload) {
      // console.log('tasks: ',value)
      state.tasks = payload.value
    }
  },
  actions: {
    createList(context, payload) {
      const user = auth.currentUser;
      db.collection("users")
        .doc(user.uid)
        .collection("lists")
        .add({
          list: payload.list,
          createdAt: new Date(),
        });
      context.commit('createList', payload)
    },
    updateList(context, payload) {
      context.commit('updateList', payload)
    },
    deleteList(context, listId) {
      const user = auth.currentUser;
      const lists =
        db.collection("users")
          .doc(user.uid)
          .collection("lists")
          .doc(listId)
          .delete()
      context.commit('deleteList', lists)
    },
    saveList(context, payload) {
      const user = auth.currentUser;
      const lists =
        db.collection("users")
          .doc(user.uid)
          .collection("lists")
          .doc(payload.id)
          .update({ list: payload.list })
      context.commit('saveList',lists)
    },
    createTask(context, payload) {
      const user = auth.currentUser;
        db.collection("users")
          .doc(user.uid)
          .collection("lists")
          .doc(payload.listId)
          .collection("tasks")
          .add({
            content: payload.content,
            createdAt: new Date(),
            editTask: false,
            isComplete: false,
            sortId: this.state.lastSortId
          });
      context.commit('createTask', payload)
    },
    reloadTask(context, task) {
      context.commit('reloadTask', task)
    },
    completeTask(context, payload) {
      const user = auth.currentUser;
      // let taskUpdate = {}
       db.collection("users")
          .doc(user.uid)
          .collection("lists")
          .doc(payload.listId)
          .collection("tasks")
          .doc(payload.task.id)
          .update({ isComplete: payload.task.isComplete });
      context.commit('completeTask', payload)
    },
    delteTask(context, payload) {
      const user = auth.currentUser
      db.collection('users')
        .doc(user.uid)
        .collection("lists")
        .doc(payload.listId)
        .collection("tasks")
        .doc(payload.id)
        .delete()
      context.commit('delteTask', payload)
    },
    editTask(context, payload) {
      const user = auth.currentUser
      db.collection('users')
        .doc(user.uid)
        .collection('lists')
        .doc(payload.listId)
        .collection("tasks")
        .doc(payload.taskId)
        .update({ content: payload.content })
      context.commit('editTask', payload)
    },
    updateTask(context, payload) {
      payload.value.forEach((task , index) => {
        const user = auth.currentUser
        db.collection('users')
          .doc(user.uid)
          .collection('lists')
          .doc(payload.listId)
          .collection("tasks")
          .doc(task.id)
          .update({ sortId: index })
      });
        
      context.commit('updateTask',payload)
    }
  },
})

export default store

// .where("createdAt", ">", 今日の日付-7))