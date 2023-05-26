<template>
  <v-row>
    <v-col sm="12" cols="12" class="pt-0">
      <div style="background-color: #fff; padding: 0 0 5px">
        <v-tabs class="tabs_2">
          <v-tab v-if="!plansNotAccess.includes(4)">
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-uppercase text-left">
              {{ $t("sale_lead") }}
            </span>
          </v-tab>
          <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-uppercase">
              {{ $t("sale_quote") }}
            </span>
          </v-tab>
          <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-uppercase">
              {{ $t("sale_order") }}
            </span>
          </v-tab>
          <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-uppercase">
              {{ $t("delivery_order") }}
            </span>
          </v-tab>
          <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-uppercase">
              {{ $t("invoice") }}
            </span>
          </v-tab>
          <v-tab-item v-if="!plansNotAccess.includes(4)">
            <v-row>
              <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
                <ByLead />
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item>
            <v-row>
              <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
                <SaleQuoteTab />
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item>
            <v-row>
              <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
                <SaleOrderTab />
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item>
            <v-row>
              <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
                <DOTab />
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item>
            <v-row>
              <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
                <InvoicesTab />
              </v-col>
            </v-row>
          </v-tab-item>
        </v-tabs>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { dataStore } from "@/observable/store";
export default {
  name: "SaleFunnelTabs",
  data: () => ({
    isHide: false,
    showLoading: false,
  }),
  props: {},
  methods: {
    hideTabs() {
      this.isHide = !this.isHide;
    },
  },
  components: {
    ByLead: () => import("./ByLead"),
    SaleQuoteTab: () => import("./SaleQuoteTab"),
    SaleOrderTab: () => import("./SaleOrderTab"),
    DOTab: () => import("./DOTab"),
    InvoicesTab: () => import("./InvoicesTab")
  },
  computed: {
    appType() {
      return dataStore.productType;
    },
    plansNotAccess() {
      return dataStore.plansNotAccess;
    },
  },
  mounted: async function () {
    // this.dashboardInvoiceSaleOrderGraph();
  },
};
</script>
<style scoped>
.v-tab {
  min-width: 30px;
  font-size: 16px;
  text-transform: uppercase;
}

.v-tab--active {
  background-color: rgb(255, 255, 255);
}

.tab_setting .v-tab--active {
  font-weight: 700;
  color: #000;
  background-color: #ffffff !important;
  border-bottom: 4px solid #92d050;
  border-left: none;
}
.tabs_2 .v-tab--active {
  background-color: #f8f8f9 !important;
  border-bottom: 4px solid #92d050;
  border-left: none;
}

/* .v-tab--active {
    } */

p {
  color: rgba(0, 0, 0, 0.87);
}
</style>
