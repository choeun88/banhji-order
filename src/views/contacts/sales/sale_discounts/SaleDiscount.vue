<template>
  <v-row>
    <v-col sm="12" cols="12" class="py-0">
      <div class="ml-4" style="background-color: #fff; padding: 0 0 5px;">
        <v-tabs>
          <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-uppercase text-left">
              {{ $t("list") }}
            </span>
          </v-tab>
          <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-uppercase">
              {{ $t("report") }}
            </span>
          </v-tab>

          <v-tab-item>
            <v-row>
              <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
                <DiscountItem />
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item>
            <v-row>
              <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
                <Report />
              </v-col>
            </v-row>
          </v-tab-item>
        </v-tabs>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "SaleDiscount",
  data: () => ({
    isHide: false,
  }),
  props: {},
  methods: {

    hideTabs() {
      this.isHide = !this.isHide;
    },
  },
  components: {
    DiscountItem: () => import("./DiscountItem"),
    Report: () => import("./Report"),
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
  text-transform: uppercase;
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
