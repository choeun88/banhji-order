<template>
  <v-row class="">
    <v-col sm="12" cols="12" class="py-0">
      <Variants :productId="productId" />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "",
  components: {
    // Catalog: () => import(`./Catalog`),
    // Products: () => import(`./products/Products`),
    Variants: () => import(`./variants/Variants`),
  },
  data: () => ({
    productId: "helloooo",
  }),
  watch: {
    // productId(){
    //     window.console.log('from Product', this.productId)
    // }
  },
  methods: {
    onProductSelected(id) {
      this.productId = id;
      window.console.log("from product", id);
    },
  },
};
</script>
<style scoped>
.v-menu__content .v-list .v-list-item {
  min-height: 35px !important;
}

.tab_wrapper {
  position: relative;
  display: inherit;
}

.v-tab {
  min-width: 30px;
  font-size: 17px;
  text-transform: capitalize;
}

.v-icon--left {
  margin-right: 0px;
}

.theme--light.v-tabs > .v-tabs-bar {
  border-bottom: 1px solid #ddd !important;
}

.menuable__content__active {
  left: 448px !important;
}

.v-tab--active {
  background-color: #e5effa;
  color: #000;
}

.theme--light.v-tabs >>> .v-tabs-bar {
  border-bottom: 1px solid #ddd !important;
}

.v-card__text {
  padding: 0 !important;
}
</style>
