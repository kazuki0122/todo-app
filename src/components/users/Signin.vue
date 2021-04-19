<template>
  <v-app>
    <v-card
      :width="$vuetify.breakpoint.width - 50"
      class="mx-auto mt-5"
      max-width="600"
      min-height="300"
    >
      <v-card-title class="justify-center">
        <h3>Sign in to Todo App</h3>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            prepend-icon="mdi-email"
            label="email"
            v-model="email"
          />
          <v-text-field
            v-bind:type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
            prepend-icon="mdi-lock"
            v-bind:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            label="password"
            v-model="password"
          />
          <v-btn
            class="info ml-3 mt-7"
            :width="$vuetify.breakpoint.width - 100"
            max-width="540"
            @click="submit"
            >Sign in</v-btn
          >
        </v-form>
      </v-card-text>
    </v-card>
    <v-card
      :width="$vuetify.breakpoint.width - 50"
      class="mx-auto mt-5 text-center px-4"
      max-width="600"
    >
      <div class="mx-auto justify-center my-3 text-subtitle-2">
        New to Todo App?
        <router-link to="/signup" class="text-decoration-none">
          Create an account.
        </router-link>
      </div>
    </v-card>
  </v-app>
</template>

<script>
import { auth } from "@/main";
// import { db } from '../main'
export default {
  name: "app",
  data: () => ({
    showPassword: false,
    email: "",
    password: "",
  }),
  methods: {
    submit() {
      auth.signInWithEmailAndPassword(this.email, this.password).then(
        () => {
          alert("Success!");
          this.$router.push("/");
        },
        (err) => {
          alert(err.message);
        }
      );
    },
  },
};
</script>
