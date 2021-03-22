<template>
  <div>
    <button @click="signOut">Log out</button>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  methods: {
    signOut: function () {
      firebase.auth().signOut().then(() => {
      this.$router.push('/signin')
      })
    }
  }
}
</script>