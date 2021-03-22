import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router';
import firebase from 'firebase'

Vue.config.productionTip = false

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
  apiKey: "AIzaSyBecLHNpPYKBLZhLxE6hhsF-tr4Eoart_A",
  authDomain: "todo-app-d5250.firebaseapp.com",
  projectId: "todo-app-d5250",
  storageBucket: "todo-app-d5250.appspot.com",
  messagingSenderId: "315696190139",
  appId: "1:315696190139:web:9dd5a1f3414ebb49f5cf9e",
  measurementId: "G-8TZM9MDZYY"
};

firebase.initializeApp(config);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
