<template>
  <div class="text-h6">{{ date }}</div>
</template>

<script>
import { format } from "date-fns";
export default {
  data() {
    return {
      date: "",
    };
  },
  methods: {
    getDate() {
      this.date = format(new Date(), "MM/d  H:mm:ss");
      setTimeout(this.getDate, 200);
    },
  },
  mounted() {
    this.getDate();
  },
};
</script>

