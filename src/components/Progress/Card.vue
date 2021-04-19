<template>
  <v-card height="420">
    <v-card-title class="justify-center text-subtitle-1 font-weight-medium">
      {{ list.list }}</v-card-title
    >
    <v-divider></v-divider>

    <v-card-subtitle class="mt-5 d-flex justify-center">
      <v-icon color="primary" class="mr-2"> mdi-format-list-checks </v-icon>
      <div class="text-subtitle-2 mt-2">Number of tasks per week:</div>
      <div class="text-h4 ml-3 black--text">
        {{ this.weeklyTasks.length }}
      </div>
    </v-card-subtitle>

    <v-card-subtitle class="success--text d-flex justify-center">
      <v-icon color="red" class="mr-2"> mdi-fire </v-icon>
      <div class="text-subtitle-2 mt-2">Number of tasks completed:</div>
      <div class="text-h4 ml-3 red--text">
        {{ completedTasks }}
      </div>
    </v-card-subtitle>
    <v-row justify="center">
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
