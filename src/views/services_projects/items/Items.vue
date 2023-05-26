<template>
  <v-row>
    <v-col sm="12" cols="12" class="pb-md-0" :class="!this.$store.state.plansNotAccess.includes(4) ? 'pt-4' : 'pt-2'">
      <div style="background-color: #fff">
        <v-tabs
          vertical
          class="tab_setting"
          slider-color="grayBg"
          slider-size="7"
          :class="{
            tab_product_service_hide: isHide,
            tab_product_service_show: !isHide,
          }"
        >
          <span class="hideAbs">
            <v-icon size="16" class="arr_icon" @click="hideTabs" v-if="!isHide"
              >mdi-chevron-left-circle
            </v-icon>
            <v-icon size="16" class="arr_icon1" @click="hideTabs" v-if="isHide"
              >mdi-chevron-right-circle
            </v-icon>
          </span>
          <v-tab>
            <span class="text-capitalize text-left">
              {{ $t("service_center") }}
            </span>
          </v-tab>
          <v-tab>
            <span class="text-capitalize text-left">
              {{ $t("service_report") }}
            </span>
          </v-tab>

          <v-tab v-if="!this.$store.state.plansNotAccess.includes(4)">
            <span class="text-capitalize text-left">
              {{ $t("price_level") }}
            </span>
          </v-tab>

          <v-tab v-if="productType == 'Public Sectors'">
            <span class="text-capitalize">
              {{ $t("serivce_setting") }}
            </span>
          </v-tab>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="py-0 pr-0">
                <ServicesItems />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="py-0 pr-0">
                <ServiceReportTab />
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item v-if="!this.$store.state.plansNotAccess.includes(4)">
            <v-card flat>
              <v-card-text class="py-0 pr-0">
                <PriceLevel />
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item v-if="productType == 'Public Sectors'">
            <v-card flat>
              <v-card-text class="py-0 pr-0">
                <SettingsH />
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { dataStore } from "@/observable/store";
export default {
  name: "Sales",
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
    // ServicesInsight: () => import('./ServicesInsight'),
    // MarginAnalysis: () => import("./MarginAnalysis"),
    // ServicesDirectory: () => import("./ServiceDiretory"),
    PriceLevel: () => import("@/views/products/pricing_management/PriceLevelTab.vue"),
    ServicesItems: () => import("./services_items/ServicesItems"),
    // TransactionItems: () => import("./TransactionItems"),
    ServiceReportTab: () => import("./ServiceReportTab"),
    // CategoriesReports: ()=> import("./CategoriesReports"),
    SettingsH: () => import("../setting/SettingsH"),
  },
  computed: {
    productType() {
      return dataStore.productType;
    },
  },
};
</script>
<style scoped>
.arr_icon {
  color: #2ca01c;
}
.arr_icon1 {
  color: #4c9aff;
  color: #2ca01c;
}
.v-tab {
  justify-content: left;
  font-size: 16px;
}

.v-tab--active {
  background-color: rgb(255, 255, 255);
}

.tab_setting .v-tab--active {
  font-weight: 700;
  color: #000;
}
/* .v-tabs--vertical > .v-tabs-bar .v-tab{
  padding-top: 16px !important;
  padding-bottom: 16px !important;
}

.v-tab--active {
  background-color: #ffffff !important;
  border-bottom: 4px solid #92d050;
  border-left: none;
} */

p {
  color: rgba(0, 0, 0, 0.87);
}
</style>
