<template>
  <v-app>
    <v-card
      :width="$vuetify.breakpoint.width - 50"
      class="mx-auto mt-5"
      max-width="600"
      min-height="300"
    >
      <v-card-title class="justify-center">
        <h3>新規登録</h3>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            prepend-icon="mdi-email"
            label="メールアドレスを入力"
            v-model="email"
          />
          <v-text-field
            v-bind:type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
            prepend-icon="mdi-lock"
            v-bind:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            label="パスワードを入力"
            v-model="password"
          />
          <v-btn
            class="info ml-3 mt-7"
            @click="submit"
            max-width="540"
            :width="$vuetify.breakpoint.width - 100"
          >
            登録する
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-app>
</template>

<script>
import { db, auth } from "@/main";
export default {
  name: "app",
  data: () => ({
    showPassword: false,
    email: "",
    password: "",
  }),
  methods: {
    submit() {
      auth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          console.log(user);
          db.collection("users").doc(user.user.uid).set({
            email: this.email,
          });
          this.$router.push("/");
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
};
</script>
