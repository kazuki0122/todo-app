<template>
  <v-app>
    <v-card width="400px" class="mx-auto mt-5">
      <v-card-title>
        <h1 class="dispay-1">Sign up</h1>
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
            <v-btn class="info" @click="submit">Sign up</v-btn>
            <v-btn  class="info" router-link to="/signin">sign in画面へ</v-btn>
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
      auth.createUserWithEmailAndPassword(this.email, this.password)
      .then(user => {
        console.log(user)
        // db.collection('users').doc(user.user.uid).set({
        //   email: this.email
        // })
        alert('Create account')
        this.$router.push('/')
      })
      .catch(error => {
        alert(error.message)
      })
    }
  }
}
</script>
