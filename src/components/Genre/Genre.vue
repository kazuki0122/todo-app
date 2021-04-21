<template>
  <v-app>
    <v-main class="mx-auto mt-4">
      <v-text-field
        v-model="genre"
        outlined
        clearable
        label="Add Genre"
        append-icon="mdi-plus"
        hide-detais
        @click:append="sendGenre"
      ></v-text-field>

      <v-list dense>
        <v-subheader v-if="genres.length">My Genres</v-subheader>
        <v-list-item-group color="primary" v-if="genres.length">
          <div v-for="(genre, i) in genres" :key="i" style="height: 60px">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-format-list-bulleted</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="genre.title"></v-list-item-title>
              </v-list-item-content>
              <GenreMenu :genre="genre" />
            </v-list-item>
            <v-divider></v-divider>
          </div>
        </v-list-item-group>
        <div v-else class="no-genres">
          <div class="text-h5 primary--text">No Genres</div>
        </div>
      </v-list>
    </v-main>
  </v-app>
</template>

<script>
import { auth, db } from "@/main";
import { mapState } from "vuex";
import GenreMenu from "./GenreMenu.vue";
export default {
  data() {
    return {
      genre: "",
    };
  },
  components: {
    GenreMenu,
  },
  computed: {
    ...mapState(["genres"]),
  },
  methods: {
    sendGenre: function () {
      if (this.genre === "") {
        return;
      }
      this.$store.dispatch("createGenre", { genre: this.genre });
      this.genre = "";
    },
    deleteGenre: function (genreId) {
      this.$store.dispatch("deleteGenre", genreId);
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
        .collection("genres")
        .orderBy("createdAt")
        .onSnapshot((querySnapshot) => {
          const list = querySnapshot.docs.map((doc) => {
            return Object.assign(doc.data(), { id: doc.id });
          });
          this.$store.commit("updateGenre", list);
        });
    });
  },
};
</script>

<style scoped>
.no-genres {
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -300%);
}
</style>