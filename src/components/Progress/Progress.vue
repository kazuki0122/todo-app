<template>
  <v-main>
    <v-container>
      <v-row>
        <v-col
          v-for="(list, index) in lists"
          :key="index"
          cols="12"
          lg="6"
          xl="3"
        >
          <Card :list="list" />
        </v-col>
      </v-row>
    </v-container>
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
    completedTasks() {},
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
  // methods: {
  //   copleteTask: function () {
  //     this.lists.forEach(async (list) => {
  //       const user = auth.currentUser;
  //       console.log(user.uid);
  //       console.log(list.id);
  //       const userRef = db
  //         .collection("users")
  //         .doc(user.uid)
  //         .collection("lists")
  //         .doc(list.id)
  //         .collection("tasks")
  //         .where("isComplete", "==", true);
  //       const userDoc = await userRef.get();
  //       console.log(userDoc);
  //     });
  //   },
  // },
};
</script>