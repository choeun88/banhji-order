<template>
  <div>
	
    <div v-if="validUser">
		<router-view></router-view>
	</div>
  <div v-else style="background: #F8F8F9 !important;height:100vh">
      <NotAuthentication />
    </div>
  </div>
</template>

<script>
import { dataStore } from "@/observable/store";
import NotAuthentication from "@/components/NotAuthentication.vue";
const authJS = require("@/auth.js");
export default {
  name: "App",
  data: () => ({}),
  props: {},
  methods: {},
  components: {
    NotAuthentication,
  },
  computed: {
    validUser() {
      return dataStore.isValidUser;
    },
  },
  mounted() {

  },
  created(){
    authJS.init()
  }
};
</script>
