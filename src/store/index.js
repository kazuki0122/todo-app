import Vue from 'vue'
import Vuex from 'vuex'
import { db,auth } from "../main";

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    lists: [],
    tasks: [],
  },
  getters: {
    
  },
  mutations: {
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
    }
  },
  actions: {
    createList(context, payload) {
      const user = auth.currentUser;
      console.log(payload)
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
          });
      context.commit('createTask', payload)
    },
    reloadTask(context, task) {
      context.commit('reloadTask', task)
    }
  }
});

export default store
