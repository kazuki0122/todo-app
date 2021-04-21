<template>
  <v-dialog :value="true" persistent max-width="290">
    <v-card>
      <v-card-title class="headline"> Edit task </v-card-title>
      <v-card-text>
        Edit the title of a task:
        <v-text-field v-model="taskTitle" />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="$emit('close')"> Cancel </v-btn>
        <v-btn color="red darken-1" text @click="editTask"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["task"],
  data() {
    return {
      dialog: false,
      taskTitle: null,
    };
  },
  mounted() {
    this.taskTitle = this.task.content;
  },
  methods: {
    editTask() {
      if (this.taskTitle === "") {
        return;
      }
      const payload = {
        genreId: this.$route.params.id,
        taskId: this.task.id,
        content: this.taskTitle,
      };
      this.$store.dispatch("editTask", payload);
    },
  },
};
</script>