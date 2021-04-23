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
            </v-list-item>
            <v-divider></v-divider>
          </div>
        </v-list-item-group>
        <div v-else class="no-tasks">
          <div class="text-h5 primary--text">No Tasks</div>
        </div>
      </v-list>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import { auth, db } from "@/main";
import TaskMenu from "./TaskMenu.vue";
import AchievementRate from "./AchievementRate.vue";
export default {
  data() {
    return {
      task: "",
    };
  },
  components: {
    TaskMenu,
    AchievementRate,
  },
  computed: {
    ...mapState(["tasks"]),
  },
  methods: {
    createTask: function () {
      if (this.task === "") {
        return;
      }
      let payload = {
        content: this.task,
        genreId: this.$route.params.id,
      };
      this.$store.dispatch("createTask", payload);
      this.task = "";
    },
    completeTask: function (task, i) {
      task.isComplete = !task.isComplete;
      const payload = {
        task: task,
        i: i,
        genreId: this.$route.params.id,
      };
      this.$store.dispatch("completeTask", payload);
    },
  },
  mounted() {
    const genreId = this.$route.params.id;
    auth.onAuthStateChanged(async (user) => {
      const date = new Date();
      const newdate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        0,
        0,
        0
      );
      await db
        .collection("users")
        .doc(user.uid)
        .collection("genres")
        .doc(genreId)
        .collection("tasks")
        .where("createdAt", ">", newdate)
        .orderBy("createdAt", "asc")
        .onSnapshot((querySnapshot) => {
          const task = querySnapshot.docs.map((doc) => {
            return Object.assign(doc.data(), { id: doc.id });
          });
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