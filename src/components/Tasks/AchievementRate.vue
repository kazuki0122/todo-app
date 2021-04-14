<template>
  <v-container style="max-width: 350px">
    <v-row class="my-1" align="center">
      <strong class="mx-4 info--text text--darken-2">
        Remaining: {{ remainingTasks }}
      </strong>

      <v-divider vertical></v-divider>

      <strong class="mx-4 success--text text--darken-2">
        Completed: {{ completedTasks }}
      </strong>

      <v-spacer></v-spacer>

      <v-progress-circular
        :rotate="-90"
        :value="progress"
        :size="58"
        :width="8"
        class="mr-2"
        color="primary"
      >
        {{ Math.ceil(progress) }}%
      </v-progress-circular>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["tasks"]),
    completedTasks() {
      return this.tasks.filter((task) => task.isComplete).length;
    },
    progress() {
      return (this.completedTasks / this.tasks.length) * 100;
    },
    remainingTasks() {
      return this.tasks.length - this.completedTasks;
    },
  },
};
</script>
