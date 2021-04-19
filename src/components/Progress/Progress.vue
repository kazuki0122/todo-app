<template>
  <v-main>
    <v-container v-if="lists.length">
      <v-row>
        <v-col v-for="(list, index) in lists" :key="index" cols="12" lg="6">
          <Card :list="list" />
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
    ...mapState(["lists", "tasks"]),
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
        .collection("lists")
        .orderBy("createdAt")
        .onSnapshot((querySnapshot) => {
          const list = querySnapshot.docs.map((doc) => {
            return Object.assign(doc.data(), { id: doc.id });
          });
          this.$store.commit("updateList", list);
          // this.copleteTask();
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