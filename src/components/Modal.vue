<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="mx-2" fab dark color="cyan" v-bind="attrs" v-on="on">
          <v-icon dark> mdi-plus </v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title>
          <span class="headline">Please add to the list</span>
        </v-card-title>
        <div class="mx-3">
          <v-text-field
            color="grey darken-1"
            label="Create a new task"
            v-model="newTodoName"
          >
          </v-text-field>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="
              dialog = false;
              addTodo();
            "
          >
            Add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { auth } from "../main";
import { db } from "../main";
export default {
  data: () => ({
    newTodoName: "",
    dialog: false,
  }),
  methods: {
    addTodo() {
      const user = auth.currentUser;
      if (this.newTodoName === "") {
        return;
      }
      let size = db
        .collection("users")
        .doc(user.uid)
        .collection("tasks")
        .get()
        .then((snap) => {
          size = snap.lenght; // will return the collection size
        });

      console.log(size);

      db.collection("users").doc(user.uid).collection("tasks").add({
        content: this.newTodoName,
        isComplete: false,
        editTask: false,
        uid: user.uid,
        createdAt: new Date(),
      });
      this.newTodoName = "";
    },
  },
};
</script>