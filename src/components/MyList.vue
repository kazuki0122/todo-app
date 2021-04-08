<template>
  <v-app>
    <v-main class="mx-auto mt-4">
      <v-text-field
        v-model="list"
        outlined
        label="Add List"
        append-icon="mdi-plus"
        hide-details
        clearable
        @click:append="sendList"
      ></v-text-field>

      <v-list dense>
        <v-subheader>My Lists</v-subheader>
        <v-list-item-group color="primary">
          <div v-for="(list, i) in lists" :key="i" style="height: 60px">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-format-list-bulleted</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="list.list"></v-list-item-title>
              </v-list-item-content>
              <TaskMenu :list="list" />
            </v-list-item>
            <v-divider></v-divider>
          </div>
        </v-list-item-group>
      </v-list>
    </v-main>
  </v-app>
</template>

<script>
import { auth, db } from "../main";
import { mapState } from "vuex";
import TaskMenu from "./TaskMenu.vue";
export default {
  data() {
    return {
      list: "",
    };
  },
  components: {
    TaskMenu,
  },
  computed: {
    ...mapState(["lists"]),
  },
  methods: {
    sendList: function () {
      this.$store.dispatch("createList", { list: this.list });
      this.list = "";
    },
    deleteList: function (listId) {
      this.$store.dispatch("deleteList", listId);
    },
  },
  firestore() {
    return {
      task: db.collection("tasks"),
    };
  },
  created() {
    // querySnapshotが現在のデータ
    // doc.id = ドキュメントのidのこと
    // doc.data()ドキュメントの中のdataのこと
    // .onSnapshot 変更があるたびに発火する
    auth.onAuthStateChanged((user) => {
      console.log(user.uid);
      db.collection("users")
        .doc(user.uid)
        .collection("lists")
        .orderBy("createdAt")
        .onSnapshot((querySnapshot) => {
          console.log(querySnapshot);
          const list = querySnapshot.docs.map((doc) => {
            return Object.assign(doc.data(), { id: doc.id });
          });
          console.log(list);
          this.$store.commit("updateList", list);
        });
    });
  },
};
</script>

<style scoped>
.v-text-field {
  width: 350px;
}
</style>