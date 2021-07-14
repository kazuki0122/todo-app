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
          <v-list-item-title class="title"> Todo App </v-list-item-title>
          <v-list-item-subtitle> Welcome to my app! </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list nav>
        <v-list-item-group>
          <div v-if="this.authenticatedUser === true">
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
          </div>
          <div v-if="this.authenticatedUser === false">
            <v-list-item @click="gotosSignin">
              <v-list-item-icon>
                <v-icon> mdi-login </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>ログイン</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="gotoSignup">
              <v-list-item-icon>
                <v-icon> mdi-account-plus </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>新規登録</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
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
          title: "ジャンル一覧",
          icon: "mdi-format-list-bulleted",
          click() {
            if (this.$route.path === "/") {
              alert("無効な操作です。");
              return;
            }
            if (this.authenticatedUser === false) {
              alert("無効な操作です。");
              return;
            }
            this.$router.push("/");
          },
        },
        {
          title: "進捗一覧",
          icon: "mdi-progress-check",
          click() {
            if (this.$route.path === "/progress") {
              alert("無効な操作です。");
              return;
            }
            if (this.authenticatedUser === false) {
              alert("無効な操作です。");
              return;
            }
            this.$router.push("/progress");
          },
        },
        {
          title: "カレンダー",
          icon: "mdi-calendar",
          click() {
            if (this.$route.path === "/calendar") {
              alert("無効な操作です。");
              return;
            }
            if (this.authenticatedUser === false) {
              alert("無効な操作です。");
              return;
            }
            this.$router.push({
              name: "Calendar",
            });
          },
        },
        {
          title: "ログアウト",
          icon: "mdi-logout",
          click() {
            if (this.authenticatedUser === false) {
              alert("無効な操作です。");
              return;
            }
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
    gotoSignup: function () {
      if (this.$route.path === "/signup") {
        alert("無効な操作です。");
        return;
      }
      this.$router.push("/signup");
    },
    gotosSignin: function () {
      if (this.$route.path === "/signin") {
        alert("無効な操作です。");
        return;
      }
      this.$router.push("/signin");
    },
  },
};
</script>

<style scoped>
.sign_out {
  cursor: pointer;
}
</style>