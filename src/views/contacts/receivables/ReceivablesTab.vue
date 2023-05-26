<template>
  <v-row>
    <v-col sm="12" cols="12" class="pt-4 pb-md-0">
      <div style="background-color: #fff">
        <v-tabs
          vertical
          class="tab_setting"
          slider-color="grayBg"
          v-model="active_tab_in"
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
          <!-- <v-tab :key="0">
            <span class="hidden-sm-and-up">
              RI
            </span>
            <span class="hidden-sm-and-down text-capitalize text-left">
              {{ $t("receivable_insight") }}
            </span>
          </v-tab> -->
          <v-tab :key="1">
            <span class="text-capitalize text-left">
              {{ $t("receivable_balances") }}
            </span>
          </v-tab>
          <v-tab :key="2">
            <span class="text-capitalize text-left">
              {{ $t("collection_management") }}
            </span>
          </v-tab>
          <v-tab>
            <span class="text-capitalize text-left">
              {{ $t("invoice_list") }}
            </span>
          </v-tab>

          <v-tab :key="4">
            <span class="text-capitalize text-left">
              {{ $t("payment_options") }}
            </span>
          </v-tab>
          <v-tab v-if="!plansNotAccess.includes(4)">
            <span class="text-capitalize text-left">
              {{ $t("late_fees") }}
            </span>
          </v-tab>
          <!-- <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0">
                <Overview />
              </v-card-text>
            </v-card>
          </v-tab-item> -->

          <v-tab-item eager>
            <v-card flat>
              <v-card-text class="pt-0 pr-0">
                <RecievableBanlances :isViewMain="isView" @isViewMain="isView = $event" />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0 pr-0">
                <CollectionManagement />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item eager>
            <v-card flat>
              <v-card-text class="pt-0 pr-0">
                <InvoiceList @emitTab="emitedTabDetial" />
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0 pr-0">
                <PaymentOptions />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item v-if="!plansNotAccess.includes(4)">
            <v-card flat>
              <v-card-text class="pt-0 pr-0">
                <LateFees />
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { data, dataStore } from "@/observable/store";
export default {
  name: "Sales",
  data: () => ({
    isHide: false,
    // active_tab:  data.customer_tab.sub
    active_tab_in: data.customer_tab_sub,
    isView: 0,
  }),
  props: {},
  computed: {
    appType() {
      return dataStore.productType;
    },
    plansNotAccess() {
      return dataStore.plansNotAccess;
    },

    active_tab() {
      return data.customer_tab_sub;
    },
  },
  watch: {
    active_tab() {
      this.active_tab_in = this.active_tab;
    },
    active_tab_in() {
      data.customer_tab_sub = this.active_tab_in;
      if (this.active_tab_in == 2) {
        this.isView = 0;
      }
    },
  },
  methods: {
    emitedTabDetial(e) {
      this.active_tab_in = e;
      this.isView = 1;
    },
    hideTabs() {
      this.isHide = !this.isHide;
    },
  },
  components: {
    // Overview: () => import("./Overview"),
    RecievableBanlances: () => import("./receivable_balances/RecievableBanlances"),
    CollectionManagement: () => import("./collection_management/CollectionManagement"),
    PaymentOptions: () => import("./payment_option/PaymentOptions"),
    LateFees: () => import("./late_fees/LateFees"),
    InvoiceList: () =>
      import("@/views/contacts/receivables/invoice_list/InvoiceList.vue"),
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
