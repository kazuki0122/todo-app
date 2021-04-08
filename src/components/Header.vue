<template>
  <header>
    <v-app-bar absolute color="#fcb69f" dark src="material2.jpg" prominent>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-row class="mt-14">
        <LiveDateTime />
      </v-row>
      <v-spacer></v-spacer>
      <div v-if="authenticatedUser" class="mt-5">
        <div @click="signOut" class="sign_out text-h6">Sign Out</div>
      </div>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" fixed temporary>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title"> Vuetify Todo </v-list-item-title>
          <v-list-item-subtitle> Best Todo Ever! </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list nav>
        <v-list-item-group>
          <v-list-item v-for="item in items" :key="item.title" link>
            <v-list-item-icon>
              <v-icon> {{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </header>
</template>

<script>
import LiveDateTime from "./LiveDateTime";
import firebase from "firebase";
import { auth } from "../main";
export default {
  data() {
    return {
      drawer: null,
      items: [
        { title: " Todo", icon: "mdi-view-dashboard" },
        { title: "About", icon: "mdi-help-box" },
      ],
      authenticatedUser: "",
    };
  },
  components: {
    LiveDateTime,
  },
  mounted() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.authenticatedUser = true;
      } else {
        this.authenticatedUser = false;
      }
    });
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

<style scoped>
.sign_out {
  cursor: pointer;
}
</style>