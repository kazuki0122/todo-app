<template>
  <v-app>
    <v-main class="mx-auto mt-4">
      <v-text-field
        v-model="task"
        outlined
        label="Add Task"
        append-icon="mdi-plus"
        hide-details
        clearable
        @click:append="createTask"
      ></v-text-field>
      <v-list dense>
        <v-subheader>My Tasks</v-subheader>
        <v-list-item-group color="primary">
          <div v-for="(task, i) in tasks" :key="i" style="height: 60px">
            <v-list-item>
              <v-list-item-action>
                <v-checkbox :input-value="active"></v-checkbox>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ task.content }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
          </div>
        </v-list-item-group>
      </v-list>
    </v-main>
  </v-app>
</template>

<script>
import { auth, db } from "@/main";
import { mapState } from "vuex";
export default {
  data() {
    return {
      task: "",
    };
  },

  computed: {
    ...mapState(["tasks"]),
  },
  methods: {
    createTask: function () {
      if (this.task === "") {
        return;
      }
      let payload = {
        content: this.task,
        listId: this.$route.params.id,
      };
      this.$store.dispatch("createTask", payload);
      this.task = "";
    },
  },
  created() {
    // querySnapshotが現在のデータ
    // doc.id = ドキュメントのidのこと
    // doc.data()ドキュメントの中のdataのこと
    // .onSnapshot 変更があるたびに発火する
    const listId = this.$route.params.id;
    auth.onAuthStateChanged((user) => {
      console.log(user.uid);
      db.collection("users")
        .doc(user.uid)
        .collection("lists")
        .doc(listId)
        .collection("tasks")
        .orderBy("createdAt")
        .onSnapshot((querySnapshot) => {
          console.log(querySnapshot);
          const task = querySnapshot.docs.map((doc) => {
            return Object.assign(doc.data(), { id: doc.id });
          });
          this.$store.dispatch("reloadTask", task);
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