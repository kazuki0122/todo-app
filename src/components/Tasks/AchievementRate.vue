<template>
  <div class="mx-auto mt-8">
    <h2 class="display-1 success--text">
      Tasks:
      {{ tasks.length }}
    </h2>
    <v-divider class="mt-4"></v-divider>
    <v-row class="my-1" align="center">
      <strong class="mx-4 info--text text--darken-2">
        未完了: {{ remainingTasks }}
      </strong>

      <v-divider vertical></v-divider>

      <strong class="mx-4 success--text text--darken-2">
        完了: {{ completedTasks }}
      </strong>

      <v-progress-circular
        :rotate="-90"
        :value="progress"
        :size="60"
        :width="8"
        class="mr-2"
        color="primary"
      >
        <div v-if="this.completedTasks === 0">0 %</div>
        <div v-else>{{ Math.ceil(progress) }}%</div>
      </v-progress-circular>
    </v-row>
  </div>
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
      if (this.completedTasks === 0) {
        return;
      }
      return (this.completedTasks / this.tasks.length) * 100;
    },
    remainingTasks() {
      return this.tasks.length - this.completedTasks;
    },
  },
};
</script>
