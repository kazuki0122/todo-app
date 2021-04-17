<template>
  <v-app>
    <AchievementRate />
    <v-main class="mx-auto mt-4">
      <v-text-field
        v-model="task"
        outlined
        label="Add Task"
        append-icon="mdi-plus"
        hide-details
        clearable
        @click:append="createTask"
      ></v-text-field>
      <v-list dense>
        <v-subheader v-if="tasks.length">My Tasks</v-subheader>
        <v-list-item-group color="primary" v-if="tasks.length">
          <draggable v-model="tasks" handle=".handle">
            <div v-for="(task, i) in tasks" :key="i" style="height: 60px">
              <v-list-item
                @click="completeTask(task, i)"
                :class="{
                  'blue lighten-5': task.isComplete,
                }"
              >
                <v-list-item-action>
                  <v-checkbox :input-value="task.isComplete"></v-checkbox>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title
                    :class="{ 'text-decoration-line-through': task.isComplete }"
                    >{{ task.content }}</v-list-item-title
                  >
                </v-list-item-content>
                <TaskMenu :task="task" :i="i" />
                <v-list-item-action v-if="$store.state.sorting">
                  <v-btn color="primary" class="handle" icon>
                    <v-icon>mdi-drag-horizontal-variant</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
              <v-divider></v-divider>
            </div>
          </draggable>
        </v-list-item-group>
        <div v-else class="no-tasks">
          <div class="text-h5 primary--text">No Tasks</div>
        </div>
      </v-list>
    </v-main>
  </v-app>
</template>

<script>
import { auth, db } from "@/main";
import TaskMenu from "./TaskMenu.vue";
import draggable from "vuedraggable";
import AchievementRate from "./AchievementRate.vue";
export default {
  data() {
    return {
      task: "",
    };
  },
  components: {
    TaskMenu,
    draggable,
    AchievementRate,
  },
  computed: {
    tasks: {
      get() {
        return this.$store.state.tasks;
      },
      set(value) {
        let payload = {
          listId: this.$route.params.id,
          value: value,
        };
        this.$store.dispatch("updateTask", payload);
      },
    },
  },
  methods: {
    createTask: function () {
      if (this.task === "") {
        return;
      }
      let payload = {
        content: this.task,
        listId: this.$route.params.id,
      };
      this.$store.dispatch("createTask", payload);
      this.task = "";
    },
    completeTask: function (task, i) {
      task.isComplete = !task.isComplete;
      const payload = {
        task: task,
        i: i,
        listId: this.$route.params.id,
      };
      this.$store.dispatch("completeTask", payload);
    },
  },
  created() {
    const listId = this.$route.params.id;
    auth.onAuthStateChanged((user) => {
      const date = new Date();
      date.setDate(date.getDate() - 1);
      db.collection("users")
        .doc(user.uid)
        .collection("lists")
        .doc(listId)
        .collection("tasks")
        .where("createdAt", ">", date)
        .onSnapshot((querySnapshot) => {
          const task = querySnapshot.docs.map((doc) => {
            return Object.assign(doc.data(), { id: doc.id });
          });
          const size = querySnapshot.size;
          this.$store.commit("updateSortId", size);
          this.$store.dispatch("reloadTask", task);
        });
    });
  },
};
</script>

<style scoped>
.no-tasks {
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
}
</style>