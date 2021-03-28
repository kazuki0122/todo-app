<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import firebase from "firebase";

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
};
</script>
