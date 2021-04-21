<template>
  <v-main>
    <v-container v-if="genres.length">
      <v-row>
        <v-col v-for="(genre, index) in genres" :key="index" cols="12" lg="6">
          <Card :genre="genre" />
        </v-col>
      </v-row>
    </v-container>
    <div v-else class="no-tasks">
      <div class="text-h5 primary--text">No Tasks</div>
    </div>
  </v-main>
</template>

<script>
import { auth, db } from "@/main";
import { mapState } from "vuex";
import Card from "./Card.vue";
export default {
  components: {
    Card,
  },
  computed: {
    ...mapState(["genres", "tasks"]),
    progress() {
      if (this.completedTasks === 0) {
        return;
      }
      return (this.completedTasks / this.tasks.length) * 100;
    },
  },
  created() {
    auth.onAuthStateChanged((user) => {
      db.collection("users")
        .doc(user.uid)
        .collection("genres")
        .orderBy("createdAt")
        .onSnapshot((querySnapshot) => {
          const genre = querySnapshot.docs.map((doc) => {
            return Object.assign(doc.data(), { id: doc.id });
          });
          this.$store.commit("updateGenre", genre);
        });
    });
  },
};
</script>

<style scoped>
.no-tasks {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, +500%);
}
</style>