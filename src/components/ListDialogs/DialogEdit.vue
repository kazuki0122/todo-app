<template>
  <v-dialog :value="true" persistent max-width="290">
    <v-card>
      <v-card-title class="headline"> Edit list </v-card-title>
      <v-card-text>
        Edit the title of a list:
        <v-text-field v-model="listTitle" />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="$emit('close')"> Cancel </v-btn>
        <v-btn color="red darken-1" text @click="saveList"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["list"],
  data() {
    return {
      dialog: false,
      listTitle: null,
    };
  },
  mounted() {
    this.listTitle = this.list.list;
  },
  methods: {
    saveList() {
      let payload = {
        id: this.list.id,
        list: this.listTitle,
      };
      this.$store.dispatch("saveList", payload);
    },
  },
};
</script>