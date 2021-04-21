import Vue from 'vue'
import Vuex from 'vuex'
import { db,auth } from "../main";

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    genres: [],
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
    createGenre(state, payload) {
      state.genres.push(payload)
    },
    updateGenre(state, list) {
      state.genres = list
    },
    deleteGenre(state, genres) {
      state.genres = genres
    },
    saveGenre(state, genres) {
      state.genres = genres
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
      // 第一引数に配列の場所、第二引数に削除する数
      // task.indexの位置の値を一つ削除する
      state.tasks.splice(task.index,1)
    },
    editTask(state, task) {
      state.tasks = task
    },
    sortTask(state) {
      state.sorting = !state.sorting
    },
    updateTask(state, payload) {
      state.tasks = payload.value
    }
  },
  actions: {
    createGenre(context, payload) {
      const user = auth.currentUser;
      db.collection("users")
        .doc(user.uid)
        .collection("genres")
        .add({
          title: payload.genre,
          createdAt: new Date(),
        });
      context.commit('createGenre', payload)
    },
    updateGenre(context, payload) {
      context.commit('updateGenre', payload)
    },
    deleteGenre(context, genreId) {
      const user = auth.currentUser;
      const genres =
        db.collection("users")
          .doc(user.uid)
          .collection("genres")
          .doc(genreId)
          .delete()
      context.commit('deleteGenre', genres)
    },
    saveGenre(context, payload) {
      const user = auth.currentUser;
      const genres =
        db.collection("users")
          .doc(user.uid)
          .collection("genres")
          .doc(payload.id)
          .update({ title: payload.title })
      context.commit('saveGenre',genres)
    },
    createTask(context, payload) {
      const user = auth.currentUser;
        db.collection("users")
          .doc(user.uid)
          .collection("genres")
          .doc(payload.genreId)
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
       db.collection("users")
          .doc(user.uid)
          .collection("genres")
          .doc(payload.genreId)
          .collection("tasks")
          .doc(payload.task.id)
          .update({ isComplete: payload.task.isComplete });
      context.commit('completeTask', payload)
    },
    delteTask(context, payload) {
      const user = auth.currentUser
      db.collection('users')
        .doc(user.uid)
        .collection("genres")
        .doc(payload.genreId)
        .collection("tasks")
        .doc(payload.id)
        .delete()
      context.commit('delteTask', payload)
    },
    editTask(context, payload) {
      const user = auth.currentUser
      db.collection('users')
        .doc(user.uid)
        .collection('genres')
        .doc(payload.genreId)
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
          .collection('genres')
          .doc(payload.genreId)
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