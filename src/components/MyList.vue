<template>
  <v-app>
    <Header class="mb-10"></Header>
    <v-main class="mx-auto">
      <h1>My Lists</h1>
      <v-list>
        <v-list-item v-for="(list, index) in lists" :key="index">
          <v-item-content>
            <v-list-item-title>
              {{ list }}
            </v-list-item-title>
          </v-item-content>
        </v-list-item>
      </v-list>
      <div class="d-flex">
        <div>
          <v-text-field label="create a new list"> </v-text-field>
        </div>
        <v-btn width="5px" class="mt-4 ml-3">Add</v-btn>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Header from "./Header.vue";
// import todo from "./Todo.vue";
export default {
  data() {
    return {
      lists: ["list1", "list2", "list3"],
    };
  },
  components: {
    Header,
  },
};
</script>

<style scoped>
.v-text-field {
  width: 350px;
  /* margin-right: 50px; */
}
</style>