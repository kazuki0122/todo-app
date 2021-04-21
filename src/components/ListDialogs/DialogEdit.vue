<template>
  <v-dialog :value="true" persistent max-width="290">
    <v-card>
      <v-card-title class="headline"> Edit genre </v-card-title>
      <v-card-text>
        Edit the title of a genre:
        <v-text-field v-model="genreTitle" />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="$emit('close')"> Cancel </v-btn>
        <v-btn color="red darken-1" text @click="saveGenre"> Save </v-btn>
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
      const payload = {
        id: this.genre.id,
        title: this.genreTitle,
      };
      this.$store.dispatch("saveGenre", payload);
    },
  },
};
</script>