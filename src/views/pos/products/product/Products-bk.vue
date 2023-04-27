<template>
  <v-row class="">
    <v-col sm="12" cols="12" class="pt-4 pb-md-0">
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
          <v-icon size="16" class="arr_icon" @click="hideTabs" v-if="!isHide">
            mdi-chevron-left-circle
          </v-icon>
          <v-icon size="16" class="arr_icon1" @click="hideTabs" v-if="isHide">
            mdi-chevron-right-circle
          </v-icon>
        </span>
        <v-tab>
          <span class="text-capitalize text-left">
            {{ $t("product_center") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="text-capitalize text-left">
            {{ $t("product_varaint") }}
          </span>
        </v-tab>
        <!-- <v-tab>
          <span class="text-capitalize text-left">
            {{ $t("variant_directory") }}
          </span>
        </v-tab> -->
        <!-- <v-tab>
          <span class="text-capitalize text-left">
            {{ $t("price_margin") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="text-capitalize text-left">
            {{ $t("balance_report") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
          <span class="hidden-sm-and-down text-capitalize text-left">
            {{ $t("product_analysis") }}
          </span>
        </v-tab> -->
        <!-- <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-attachment</v-icon>
          </span>
          <span class="hidden-sm-and-down text-capitalize text-left">
            {{ $t("item_modifiers") }}
          </span>
        </v-tab> -->
        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 pr-0">
              <ProudctCenter />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 pr-0">
              <ProductVariants />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <!-- <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 pr-0">
              <ProductDiretory />
            </v-card-text>
          </v-card>
        </v-tab-item> -->
        <!-- <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 pr-0">
              <PriceMargin />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 pr-0">
              <StockReport />
            </v-card-text>
          </v-card>
        </v-tab-item> -->
        <!-- <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 pr-0">
              <ProductAnalysisTab />
            </v-card-text>
          </v-card>
        </v-tab-item> -->
        <!-- <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 pr-0">
              <ItemModifiers />
            </v-card-text>
          </v-card>
        </v-tab-item> -->
      </v-tabs>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "",
  components: {
    ProductVariants: () => import("./product_variants/ProductVariants"),
    ProudctCenter: () => import("./product_center/ProudctCenter"),
    // ItemModifiers: () => import("./ItemModifiers"),
    // ProductDiretory: ()=> import("./ProductDiretory"),
    // StockReport: () => import("./StockReport"),
    // PriceMargin: () => import("./price_margin/PriceMargin"),
    // ProductAnalysisTab: () => import("./product_analysis/ProductAnalysisTab"),
     // CatalogsBundledTab: () => import("./product_list_catalog/CatalogsBundledTab"),
    // BundledProducts: () => import("@/views/products/product/product_variants/products/Products.vue"),

  },
  data: () => ({
    isHide: false,
  }),
  watch: {},
  methods: {
    hideTabs() {
      this.isHide = !this.isHide;
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

.v-tab--active {
  background-color: #ffffff !important;
  border-bottom: 4px solid #92d050;
  border-left: none;
}

.tab_product_service_show.theme--light .v-slide-group__content {
  width: 140px !important;
}

p {
  color: rgba(0, 0, 0, 0.87);
}

@media (max-width: 576px) {
  .tab_setting.theme--light.v-tabs.tab_setting > .v-tabs-bar {
    width: 55px !important;
  }

  .hideAbs {
    display: none !important;
  }
}
</style>
