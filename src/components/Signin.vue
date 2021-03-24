<template>
  <v-app>
    <v-card width="400px" class="mx-auto mt-5">
      <v-card-title>
        <h1 class="dispay-1">Sign in</h1>
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
          label="パスワード" 
          v-model="password"
          />
          <v-card-actions>
            <v-btn class="info" @click="submit">Sign in</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-app>
</template>

<script>
import { auth } from '../main' 
// import { db } from '../main'
export default {
  name: 'app',
  data:() => ({
    showPassword: false,
    email:'',
    password:''
  }),
  methods:{
    submit(){
       auth.signInWithEmailAndPassword(this.email, this.password)
       .then(() => {
          alert('Success!')
          this.$router.push('/')
        },
        err => {
          alert(err.message)
        }
      )
    }
  }
}
</script>
