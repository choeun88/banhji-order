<template>
  <v-row class="">
    <v-col sm="12" cols="12">
      <v-tabs
        vertical
        class="tab_setting tab_product_service_show"
        slider-color="grayBg"
        slider-size="7"
        v-model="active_tab_in"
      >
        <v-tab>
          <span class="text-capitalize">
            {{ $t("customer_type") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="text-capitalize">
            {{ $t("customer_group") }}
          </span>
        </v-tab>

        <!-- <v-tab>
					<span class="hidden-sm-and-up">
						<v-icon left>mdi-pen</v-icon>
					</span>
                    <span class="hidden-sm-and-down text-capitalize">
						{{ $t('sale_channel') }}
					</span>
                </v-tab> -->
        <!-- <v-tab>
					<span class="hidden-sm-and-up">
						<v-icon left>mdi-pen</v-icon>
					</span>
                    <span class="hidden-sm-and-down text-capitalize">
						{{ $t('customer_project') }}
					</span>
                </v-tab> -->
        <v-tab>
          <span class="text-capitalize">
            {{ $t("sale_form_content") }}
          </span>
        </v-tab>
        <!-- <v-tab>
                    <span class="hidden-sm-and-up">
                        <v-icon left>mdi-pen</v-icon>
                    </span>
                    <span class="hidden-sm-and-down text-capitalize">
                        {{ $t('sale_automation') }}
                    </span>
                </v-tab> -->
        <v-tab>
          <span class="text-capitalize">
            {{ $t("payment_terms") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="text-capitalize">
            {{ $t("customer_pice_levels") }}
          </span>
        </v-tab>
        <!-- for cooperative -->
        <!-- for cooperative -->
        <!-- for cooperative -->
        <!-- for cooperative -->
        <v-tab v-if="appType === 'Cooperative'">
          <span class="text-capitalize">
            {{ $t("price_setting") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="text-capitalize">
            {{ $t("price_level_type") }}
          </span>
        </v-tab>
        <v-tab-item>
          <v-row>
            <v-col sm="12" cols="12" class="pl-6 pt-0">
              <CustomerType />
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item>
          <v-row>
            <v-col sm="12" cols="12" class="pl-6 pt-0">
              <CustomerGroup />
            </v-col>
          </v-row>
        </v-tab-item>

        <!-- <v-tab-item>
                    <v-row>
                        <v-col sm="12" cols="12" class="pl-6 pt-0">
                            <SaleChannel/>
                        </v-col>
                    </v-row>
                </v-tab-item> -->
        <!-- <v-tab-item>
                    <v-row>
                        <v-col sm="12" cols="12" class="pl-6 pt-0">
                            <CustomerProject/>
                        </v-col>
                    </v-row>
                </v-tab-item> -->
        <v-tab-item>
          <v-row>
            <v-col sm="12" cols="12" class="pl-6 pt-0">
              <SaleFormContent />
            </v-col>
          </v-row>
        </v-tab-item>
        <!-- <v-tab-item>
                    <v-row>
                        <v-col sm="12" cols="12" class="pl-6 pt-0">
                            <SaleAutomation/>
                        </v-col>
                    </v-row>
                </v-tab-item> -->
        <v-tab-item>
          <v-row>
            <v-col sm="12" cols="12" class="pl-6 pt-0">
              <PaymentTerm />
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item>
          <v-row>
            <v-col sm="12" cols="12" class="pl-6 pt-0">
              <PriceLevelList />
            </v-col>
          </v-row>
        </v-tab-item>
        <!-- for cooperative -->
        <v-tab-item v-if="appType === 'Cooperative'">
          <v-row>
            <v-col sm="12" cols="12" class="pl-6 pt-0">
              <PriceSetting />
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item>
          <v-row>
            <v-col sm="12" cols="12" class="pl-6 pt-0">
              <PriceLevelType />
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs>
    </v-col>
  </v-row>
</template>

<script>
import { dataStore, data } from "@/observable/store";
export default {
  data: () => ({
    active_tab_in: data.customer_tab_setting,
  }),
  methods: {},
  components: {
    SaleFormContent: () => import("./SaleFormContent"),
    CustomerGroup: () => import("./CustomerGroup"),
    CustomerType: () => import("./CustomerType"),
    PaymentTerm: () => import("./PaymentTerm"),
    PriceLevelList: () =>
      import("@/views/products/pricing_management/PriceLevelList.vue"),
    PriceSetting: () => import("@/views/products/pricing_management/PriceLevel.vue"),
    PriceLevelType: () =>
      import("@/views/products/pricing_management/PriceLevelType.vue"),
  },
  watch: {
    active_tab() {
      this.active_tab_in = this.active_tab;
    },
    active_tab_in() {
      data.customer_tab_sub = this.active_tab_in;
    },
  },
  computed: {
    active_tab() {
      return data.customer_tab_setting;
    },
    appType() {
      return dataStore.productType;
    },
  },
};
</script>
<style scoped>
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

.v-tabs-slider {
  background-color: #edf1f5 !important;
  padding-left: 6px;
  height: 100%;
  width: 100%;
}

@media (max-width: 576px) {
}
</style>
