<template>
  <header>
    <v-app-bar color="white">
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" fixed temporary>
      <v-list nav>
        <v-list-item-group>
          <v-list-item>
            <v-list-item-title>MY PAGE</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title @click="signOut">Sign Out</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </header>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      drawer: false,
    };
  },
  methods: {
    signOut: function () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/signin");
        });
    },
  },
};
</script>