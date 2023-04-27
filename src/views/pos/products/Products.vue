<template>
    <v-app class="zoom-in">
        <v-container>
            <v-row>
                <v-col sm="12" cols="12" class="pb-0">
                    <v-card color="white" class="pa-4 no_border" elevation="0">
                        <v-row>
                            <v-col sm="12" cols="12" class="tab_wrapper py-0">
                                <v-tabs>
                                    <v-row>
                                        <v-col sm="10" cols="10" class="py-0 pr-0" style="display: inherit;">
                                      
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
                                                <span>
                                                    {{ $t('price') }}
                                                </span>
                                            </v-tab>
                                            <v-tab>
                                                <span>
                                                    {{ $t('sale_unit') }}
                                                </span>
                                            </v-tab>
                                            <v-tab>
                                                <span>
                                                    {{ $t('count_adjustment') }}
                                                </span>
                                            </v-tab>
                                            <v-tab>
                                                <span>
                                                    {{ $t('barcode_print') }}
                                                </span>
                                            </v-tab>
                                            <v-tab>
                                                <span>
                                                    {{ $t('transfer') }}
                                                </span>
                                            </v-tab> -->
                                      
                                        </v-col>
                                        <!-- <v-col sm="2" cols="2" class="px-0">
                                            Dropdown New
                                            <v-menu
                                                nudge-bottom="4"
                                                bottom
                                                offset-y
                                                origin="bottom top"
                                                transition="scroll-y-reverse-transition"
                                            >
                                                <template v-slot:activator="{ on }">
                                                    <span class="hidden-sm-and-up">
                                                        <div class="dropdown_transactions ml-6">
                                                            <v-icon v-on="on" left>mdi-plus</v-icon>
                                                        </div>
                                                    </span>
                                                    <span class="hidden-sm-and-down">
                                                        <v-btn icon v-on="on" class="dropdown_transactions" style="right: 0;">
                                                            <v-icon size="17" class="ma-1">mdi-plus</v-icon>
                                                                {{ $t('new') }}
                                                            <v-icon size="" class="ma-1">expand_more</v-icon>
                                                        </v-btn>
                                                    </span>
                                                </template>
        
                                                <v-list>
                                                    <v-list-item link route to="inventory_adjustment">
                                                        <v-list-item-title>{{ $t('inventory_adjustment') }}</v-list-item-title>
                                                    </v-list-item>
                                                    <v-list-item link route to="product">
                                                        <v-list-item-title>{{ $t('add_product') }}</v-list-item-title>
                                                    </v-list-item>
                                                    <v-list-item link route to="product_import">
                                                        <v-list-item-title>{{ $t('import_product') }}</v-list-item-title>
                                                    </v-list-item>
                                                    <v-list-item link route to="catalog">
                                                        <v-list-item-title>{{ $t('add_catalog') }}</v-list-item-title>
                                                    </v-list-item>
                                                </v-list>
                                            </v-menu>
                                        </v-col> -->
                                    </v-row>
                                    <v-tab-item>
                                        <v-card flat>
                                            <v-card-text class="pl-0">
                                            <ProudctCenter />
                                            </v-card-text>
                                        </v-card>
                                        
                                        </v-tab-item>
                                        <v-tab-item>
                                        <v-card flat>
                                            <v-card-text class="">
                                            <ProductVariants />
                                            </v-card-text>
                                        </v-card>
                                    </v-tab-item>
                                    <!-- <v-tab-item>
                                        <v-card flat>
                                            <v-card-text class="">
                                                <PriceTab/>
                                            </v-card-text>
                                        </v-card>
                                    </v-tab-item>
                                    <v-tab-item>
                                        <v-card flat>
                                            <v-card-text class="">
                                                <SaleUnitTab/>
                                            </v-card-text>
                                        </v-card>
                                    </v-tab-item>
                                    <v-tab-item>
                                        <v-card flat>
                                            <v-card-text class="">
                                                <CountAdjustment/>
                                            </v-card-text>
                                        </v-card>
                                    </v-tab-item>
                                    <v-tab-item>
                                        <v-card flat>
                                            <v-card-text class="">
                                                <BarcodePrint/>
                                            </v-card-text>
                                        </v-card>
                                    </v-tab-item>
                                    <v-tab-item>
                                        <v-card flat>
                                            <v-card-text class="">
                                                <BarcodePrint/>
                                            </v-card-text>
                                        </v-card>
                                    </v-tab-item> -->


                        
                                </v-tabs>
                                
                            </v-col>

                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
export default {
  name: "",
  components: {
    ProductVariants: () => import("./product/product_variants/ProductVariants"),
    ProudctCenter: () => import("./product/product_center/ProudctCenter"),
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