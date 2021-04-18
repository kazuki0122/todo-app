<template>
  <v-card height="350">
    <v-card-title>{{ list.list }}</v-card-title>
    <v-card-subtitle>
      Number of tasks per week: {{ this.weeklyTasks.length }}
    </v-card-subtitle>
    <v-card-subtitle class="success--text">
      Number of tasks completed: {{ completedTasks }}
    </v-card-subtitle>
    <v-row class="my-1" justify="center">
      <v-progress-circular
        :rotate="-90"
        :value="progress"
        :size="200"
        :width="18"
        color="primary"
      >
        <h2 v-if="this.completedTasks === 0">0%</h2>
        <h2 v-else>{{ Math.ceil(progress) }}%</h2>
      </v-progress-circular>
    </v-row>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import { auth, db } from "@/main";
export default {
  props: ["list"],
  data() {
    return {
      weeklyTasks: [],
    };
  },
  computed: {
    ...mapState(["tasks"]),
    completedTasks() {
      return this.weeklyTasks.filter((task) => task.isComplete).length;
    },
    progress() {
      if (this.completedTasks === 0) {
        return;
      }
      return (this.completedTasks / this.weeklyTasks.length) * 100;
    },
  },
  created() {
    this.getWeeklyTask();
  },
  methods: {
    getWeeklyTask: async function () {
      const date = new Date();
      date.setDate(date.getDate() - 7);
      const user = auth.currentUser;
      const userRef = db
        .collection("users")
        .doc(user.uid)
        .collection("lists")
        .doc(this.list.id)
        .collection("tasks")
        .where("createdAt", ">", date);
      const userDoc = await userRef.get();
      this.weeklyTasks = userDoc.docs.map((doc) => doc.data());
    },
  },
};
</script>
