<template>
  <v-dialog :value="true" persistent max-width="290">
    <v-card>
      <v-card-title class="headline"> 削除しますか？ </v-card-title>
      <v-card-text>タスクを削除すると、タスク一覧から削除されます</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="$emit('close')"> 閉じる </v-btn>
        <v-btn color="red darken-1" text @click="delteTask(task)">
          削除する
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["task", "i"],
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    delteTask: function (task) {
      const payload = {
        id: task.id,
        genreId: this.$route.params.id,
        index: this.i,
      };
      this.$store.dispatch("delteTask", payload);
    },
  },
};
</script>