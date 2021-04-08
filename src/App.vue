<template>
  <v-app class="hidden">
    <Header class="mb-16"></Header>
    <v-main class="mt-16">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import firebase from "firebase";
import Header from "./components/Header.vue";
export default {
  name: "App",
  data: () => ({}),
  mounted() {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log("login");
      } else {
        console.log("logout");
      }
    });
  },
  components: {
    Header,
  },
};
</script>

<style scoped>
.hidden {
  overflow: hidden;
}
</style>