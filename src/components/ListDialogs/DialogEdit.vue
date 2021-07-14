<template>
  <v-dialog :value="true" persistent max-width="290">
    <v-card>
      <v-card-title class="headline"> 内容の編集 </v-card-title>
      <v-card-text>
        <v-text-field v-model="genreTitle" />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="$emit('close')"> 閉じる </v-btn>
        <v-btn color="red darken-1" text @click="saveGenre"> 保存する </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["genre"],
  data() {
    return {
      dialog: false,
      genreTitle: null,
    };
  },
  mounted() {
    this.genreTitle = this.genre.title;
  },
  methods: {
    saveGenre() {
      if (this.genreTitle === "") {
        alert("一文字以上入力してください。");
        return;
      }
      if (this.genre.title === this.genreTitle) {
        alert("無効な操作です。");
        return;
      }
      const payload = {
        id: this.genre.id,
        title: this.genreTitle,
      };
      this.$store.dispatch("saveGenre", payload);
    },
  },
};
</script>