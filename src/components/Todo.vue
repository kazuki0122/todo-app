<template>
  <div>
    <Header />
    <div>
      <v-layout justify-center>
        <img src="../assets/logo.png" style="width: 100px" />
      </v-layout>
    </div>
    <template max-width="600px" class="mx-auto mt-5">
      <v-card-title>
        <v-layout justify-center>
          <h3 class="text-center">To Do App</h3>
        </v-layout>
      </v-card-title>
      <draggable v-model="todos">
        <template v-for="(todo, index) in todos">
          <div v-if="currentUserUid === todo.uid" :key="todo.id">
            <v-layout justify-center>
              <v-card
                width="400px"
                height="40px"
                class="d-flex align-center justify-space-between mt-3"
              >
                <div>
                  <input
                    type="checkbox"
                    v-model="todo.isComplete"
                    @click="completeTodo(todo, index)"
                    class="mr-9 ml-2"
                  />
                  <span
                    v-if="todo.editTask === false"
                    :class="{ complete: todo.isComplete }"
                  >
                    {{ todo.content }}
                  </span>
                  <input
                    v-else
                    ref="focusThis"
                    type="text"
                    v-model="todoContent"
                    @blur="
                      doEdit(todo);
                      updateTodo(todo, todoContent);
                    "
                  />
                </div>
                <div>
                  <v-icon
                    @click="
                      doEdit(todo);
                      focusInput(todo);
                    "
                    v-model="todo.content"
                    class="mr-3"
                  >
                    mdi-pencil
                  </v-icon>
                  <v-icon @click="removeTodo(todo.id)" class="mr-3">
                    mdi-trash-can-outline
                  </v-icon>
                </div>
              </v-card>
            </v-layout>
          </div>
        </template>
      </draggable>
    </template>
    <Modal class="mt-5" />
  </div>
</template>

<script>
import { auth, db } from "../main";
import Header from "./Header.vue";
import Modal from "./Modal.vue";
import draggable from "vuedraggable";

export default {
  data: () => ({
    todos: [],
    edit: false,
    todoContent: "",
    currentUserUid: "",
  }),
  firestore() {
    return {
      task: db.collection("tasks"),
    };
  },
  mounted() {
    // querySnapshotが現在のデータ
    // doc.id = ドキュメントのidのこと
    // doc.data()ドキュメントの中のdataのこと
    db.collection("tasks").onSnapshot((querySnapshot) => {
      this.todos = [];
      querySnapshot.forEach((doc) => {
        // obj[doc.id] = doc.data();
        const object = Object.assign(doc.data(), { id: doc.id });
        this.todos.push(object);
      });
      // Array.isArray(this.todos)
    });
    this.currentUserUid = auth.currentUser.uid;
  },
  methods: {
    completeTodo(todo) {
      todo.isComplete = !todo.isComplete;
      db.collection("tasks")
        .doc(todo.id)
        .update({ isComplete: todo.isComplete });
    },
    // 保留
    // focusInput() {
    //   this.$refs.textInput.focus();
    // },
    doEdit(todo) {
      todo.editTask = !todo.editTask;
      db.collection("tasks").doc(todo.id).update({ editTask: todo.editTask });
    },
    updateTodo(todo, todoContent) {
      if (todoContent === "") {
        return;
      }
      todo.content = todoContent;
      db.collection("tasks").doc(todo.id).update({ content: todo.content });
      this.todoContent = "";
    },
    removeTodo(key) {
      console.log(key);
      db.collection("tasks").doc(key).delete();
    },
  },
  components: {
    Modal,
    Header,
    draggable,
  },
};
</script>
<style scoped>
.complete {
  text-decoration: line-through;
}
</style>