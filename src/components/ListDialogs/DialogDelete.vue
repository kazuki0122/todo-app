<template>
  <v-dialog :value="true" persistent max-width="290">
    <v-card>
      <v-card-title class="headline"> 削除しますか？ </v-card-title>
      <v-card-text
        >ジャンルを削除すると、ジャンル一覧から削除されます。</v-card-text
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="$emit('close')"> 閉じる </v-btn>
        <v-btn
          color="red darken-1"
          text
          @click="$store.dispatch('deleteGenre', genre.id)"
        >
          削除する
        </v-btn>
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
    };
  },
};
</script>