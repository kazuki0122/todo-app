<template>
  <v-app>
    <v-main class="mx-auto mt-4">
      <v-text-field
        v-model="list"
        outlined
        clearable
        label="Add List"
        append-icon="mdi-plus"
        hide-detais
        @click:append="sendList"
      ></v-text-field>

      <v-list dense>
        <v-subheader v-if="lists.length">My Lists</v-subheader>
        <v-list-item-group color="primary" v-if="lists.length">
          <div v-for="(list, i) in lists" :key="i" style="height: 60px">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-format-list-bulleted</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="list.list"></v-list-item-title>
              </v-list-item-content>
              <ListMenu :list="list" />
            </v-list-item>
            <v-divider></v-divider>
          </div>
        </v-list-item-group>
        <div v-else class="no-lists">
          <div class="text-h5 primary--text">No Lists</div>
        </div>
      </v-list>
    </v-main>
  </v-app>
</template>

<script>
import { auth, db } from "@/main";
import { mapState } from "vuex";
import ListMenu from "./ListMenu.vue";
export default {
  data() {
    return {
      list: "",
    };
  },
  components: {
    ListMenu,
  },
  computed: {
    ...mapState(["lists"]),
  },
  methods: {
    sendList: function () {
      if (this.list === "") {
        return;
      }
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
      db.collection("users")
        .doc(user.uid)
        .collection("lists")
        .orderBy("createdAt")
        .onSnapshot((querySnapshot) => {
          const list = querySnapshot.docs.map((doc) => {
            return Object.assign(doc.data(), { id: doc.id });
          });
          this.$store.commit("updateList", list);
        });
    });
  },
};
</script>

<style scoped>
.no-lists {
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
}
</style>