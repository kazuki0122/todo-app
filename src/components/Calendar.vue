<template>
  <div>
    <v-sheet tile height="54" class="d-flex">
      <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon class="ma-2" @click="$refs.calendar.next()">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-sheet>
    <v-sheet
      :height="testHeight"
      :width="$vuetify.breakpoint.width"
      max-width="900"
      class="mx-auto"
    >
      <v-calendar
        locale="ja-jp"
        :type="type"
        ref="calendar"
        v-model="value"
        :events="events"
        :event-overlap-threshold="30"
      ></v-calendar>
    </v-sheet>
  </div>
</template>
<script>
import { auth, db } from "@/main";
export default {
  data() {
    return {
      type: "month",
      value: "",
      events: [],
      genres: [],
      testHeight: 700,
    };
  },
  computed: {
    tasks() {
      return this.$store.state.tasks;
    },
  },
  methods: {
    getEvents() {
      const events = [];
      this.tasks.forEach((task) => {
        events.push({
          name: task.content,
          start: task.createdAt.toDate(), // 開始時刻
          color: task.isComplete ? "blue" : "red",
          timed: false, //終日ならfalse
        });
      });
      this.events = events;
    },
    getTasks() {
      const user = auth.currentUser;
      this.genres.forEach(async (genre) => {
        const userRef = db
          .collection("users")
          .doc(user.uid)
          .collection("genres")
          .doc(genre.id)
          .collection("tasks")
          .orderBy("createdAt", "asc");
        const userDoc = await userRef.get();
        const task = userDoc.docs.map((doc) => doc.data());
        this.$store.dispatch("reloadCalendarTask", task);
        this.getEvents();
      });
    },
  },
  async mounted() {
    auth.onAuthStateChanged(async (user) => {
      await db
        .collection("users")
        .doc(user.uid)
        .collection("genres")
        .onSnapshot((querySnapshot) => {
          const list = querySnapshot.docs.map((doc) => {
            return Object.assign(doc.data(), { id: doc.id });
          });
          this.genres = list;
        });
    });
  },
  watch: {
    genres() {
      if (this.genres.length) {
        this.getTasks();
      }
    },
  },
};
</script>