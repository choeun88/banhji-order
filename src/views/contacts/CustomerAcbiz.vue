<template>
      <v-tabs>
        <v-row>
          <v-col
            sm="10"
            cols="10"
            class="py-0 pr-0"
            style="display: inherit;"
          >
            <v-tab :key="1">
              <span>
                {{ $t("customer") }}
              </span>
            </v-tab>
            <v-tab :key="2">
              <span>
                {{ $t("receivable") }}
              </span>
            </v-tab>
            <v-tab :key="3">
              <span >
                {{ $t("sales") }}
              </span>
            </v-tab>
            <v-tab :key="4">
              <span >
                {{ $t("sale_product") }}
              </span>
            </v-tab>

          </v-col>
        </v-row>

        <v-tab-item>
          <v-card flat>
            <v-card-text class="">
              <CustomerDirectory />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="">
              <ReceivablesTabAbbiz />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="">
              <ByCustomer />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="">
              <ByProductsServices />
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
  </template>
  
  <script>
  import { data } from "@/observable/store";
  
  export default {
    name: "CustomerAcbiz",
    components: {
      CustomerDirectory: () => import("@/views/contacts/customer/CustomerDirectory.vue"),
      ReceivablesTabAbbiz: () => import("@/views/contacts/receivables/ReceivablesTabAbbiz.vue"),
      ByCustomer: () => import("@/views/contacts/sales/sale_reports_analysis/ByCustomer.vue"),
      ByProductsServices: () => import("@/views/contacts/sales/sale_reports_analysis/ByProductsServices.vue"),
  
    },
    data: () => ({
      // active_tab: data.customer_tab.main
      active_in_tabs: data.customer_tab_main,
    }),
  };
  </script>
  <style scoped>
  /* .v-menu__content{
    top: 141px !important;
    left: 1098px !important;
  } */
  .v-menu__content .v-list .v-list-item {
    min-height: 35px !important;
  }
  
  .tab_wrapper {
    position: relative;
    display: inherit;
  }
  
  .v-tab {
    min-width: 30px;
    font-size: 20px;
    text-transform: capitalize;
  }
  
  .v-icon--left {
    margin-right: 0px;
  }
  
  .theme--light.v-tabs > .v-tabs-bar {
    border-bottom: 1px solid #ddd !important;
  }
  
  .menuable__content__active {
    right: 40px !important;
    left: auto !important;
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
  