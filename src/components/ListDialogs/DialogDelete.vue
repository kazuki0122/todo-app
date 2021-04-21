<template>
  <v-dialog :value="true" persistent max-width="290">
    <v-card>
      <v-card-title class="headline"> Delete genre? </v-card-title>
      <v-card-text
        >Are you sure you wanna delete this gosh darn motherflipping
        genre?</v-card-text
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="$emit('close')"> No </v-btn>
        <v-btn
          color="red darken-1"
          text
          @click="$store.dispatch('deleteGenre', genre.id)"
        >
          Yes
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