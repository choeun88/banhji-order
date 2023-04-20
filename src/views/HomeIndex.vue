<template>
  <div id="app">
    <v-app id="inspire" class="custom_theme">
      <v-main>
          <div >
            <Header/>
          </div>
         
        <router-view />
        <vue-snotify />
        <!-- <Footer/> -->
        <Resource />
      </v-main>
    </v-app>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  name: "Homeindex",
  components: {
    Header,
    // Footer
    Resource: () => import("@/components/Resource"),
  },
  data: () => ({
    my_part: "",
    show:true,
    isHead: 1
  }),
  created() {
  },
  methods: {
  },
  computed: {
    part() {
      return window.location.pathname;
    },
  },
  watch: {
  },
  mounted() {
  },
};
</script>
