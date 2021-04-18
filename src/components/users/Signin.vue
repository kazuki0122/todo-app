<template>
  <v-app>
    <v-card
      :width="$vuetify.breakpoint.width - 50"
      class="mx-auto mt-5"
      max-width="600"
      min-height="300"
    >
      <v-card-title>
        <h3>Sign in to Task App</h3>
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
          <v-card-actions class="mt-5">
            <v-btn class="info mx-auto" @click="submit">Sign in</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
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
