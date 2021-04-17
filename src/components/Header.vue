<template>
  <header>
    <v-app-bar
      absolute
      color="#fcb69f"
      dark
      src="@/assets/material2.jpg"
      prominent
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-row class="mt-14">
        <LiveDateTime />
      </v-row>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" fixed temporary>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title"> Task App </v-list-item-title>
          <v-list-item-subtitle> Best Todo Ever! </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list nav>
        <v-list-item-group>
          <v-list-item
            v-for="(item, index) in items"
            :key="item.title"
            link
            @click="handleClick(index)"
          >
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
        {
          title: "Go To List",
          icon: "mdi-format-list-bulleted",
          click() {
            if (this.$route.path === "/") {
              alert("Already on the list page");
              return;
            }
            this.$router.push("/");
          },
        },
        {
          title: "Progress Check",
          icon: "mdi-progress-check",
          click() {
            if (this.$route.path === "/progress") {
              alert("Already on the progress page");
              return;
            }
            this.$router.push("/progress");
          },
        },
        {
          title: "Sign Out",
          icon: "mdi-logout",
          click() {
            firebase
              .auth()
              .signOut()
              .then(() => {
                this.$router.push("/signin");
              });
          },
        },
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
    handleClick: function (index) {
      this.items[index].click.call(this);
    },
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