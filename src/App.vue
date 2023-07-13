<template>
  <v-app>
    <MainHeader />
    <router-view />
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MainHeader from "./components/MainHeader.vue";

export default defineComponent({
  name: "App",

  components: {
    MainHeader,
  },

  data: () => ({}),
});
</script>

<style lang="scss" scoped></style>
