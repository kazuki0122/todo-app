<template>
  <v-dialog :value="true" persistent max-width="290">
    <v-card>
      <v-card-title class="headline"> 内容の編集 </v-card-title>
      <v-card-text>
        <v-text-field v-model="taskTitle" />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="$emit('close')"> 閉じる </v-btn>
        <v-btn color="red darken-1" text @click="editTask"> 保存する </v-btn>
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
        alert("一文字以上入力してください。");
        return;
      }
      if (this.task.content === this.taskTitle) {
        alert("無効な操作です。");
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