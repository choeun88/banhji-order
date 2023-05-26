<template>
  <v-row>
    <v-col sm="12" cols="12" class="pt-0">
      <div style="background-color: #fff; padding: 0 0 5px">
        <h2 class="mb-1 font_020">{{ $t("sale_transactions") }}</h2>
        <p class="mb-0">{{ $t("invoicing_sale_order_desc") }}</p>
        <chart
          ref="chart"
          :legend-position="'bottom'"
          :legend-visible="true"
          :tooltip="tooltip"
          :series-defaults-style="'smooth'"
          :series="seriesLine"
          :chartArea="chartArea"
          :category-axis-categories="categories_line"
          :value-axis="valueAxis_line"
          :theme="'sass'"
        />
        <svg version="1.1" width="0" height="0" style="visibility: hidden">
          <defs>
            <!-- color: "url(#svg-gradient)", -->
            <linearGradient id="svg-gradient-sale" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color: #ed1a3a; stop-opacity: 0.95" />
              <stop offset="100%" style="stop-color: #ed1a3a; stop-opacity: 0.05" />
            </linearGradient>
            <linearGradient id="svg-gradient-so" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color: #474343; stop-opacity: 0.95" />
              <stop offset="100%" style="stop-color: #474343; stop-opacity: 0.05" />
            </linearGradient>
            <linearGradient id="svg-gradient-do" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color: #db6a07; stop-opacity: 0.95" />
              <stop offset="100%" style="stop-color: #db6a07; stop-opacity: 0.05" />
            </linearGradient>
          </defs>
        </svg>
        <v-tabs class="tabs_2">
          <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-uppercase text-left">
              {{ $t("customers") }}
            </span>
          </v-tab>
          <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-uppercase">
              {{ $t("product_service") }}
            </span>
          </v-tab>
          <v-tab v-if="!this.$store.state.plansNotAccess.includes(4)">
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-uppercase">
              {{ $t("sale_tax") }}
            </span>
          </v-tab>

          <!-- <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-uppercase">
              {{ $t("recurring") }}
            </span>
          </v-tab> -->

          <v-tab-item>
            <v-row>
              <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
                <ByCustomer />
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item>
            <v-row>
              <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
                <ByProductsServices />
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item v-if="!this.$store.state.plansNotAccess.includes(4)">
            <v-row>
              <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
                <SaleTax />
              </v-col>
            </v-row>
          </v-tab-item>
          <!-- <v-tab-item>
            <v-row>
              <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
                <RecurringInvoices />
              </v-col>
            </v-row>
          </v-tab-item> -->
        </v-tabs>
      </div>
    </v-col>
  </v-row>
</template>

<script>
const dashboardHandler = require("@/scripts/dashboard/customer/handler/dashboardHandler");
import { Chart } from "@progress/kendo-charts-vue-wrapper";
import { i18n } from "@/i18n";
import { dataStore } from "@/observable/store";
export default {
  name: "Sales",
  data: () => ({
    isHide: false,
    showLoadingGraph: false,
    tooltip: {
      visible: true,
      template: "#= series.name #: #= kendo.toString(value, `n2`) #",
    },
    // line chart
    seriesLine: [
      {
        type: "line",
        name: i18n.t("sale"),
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        color: "#ed1a3a",
      },
      {
        type: "line",
        name: i18n.t("sale_order"),
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        color: "#474343",
      },
      {
        type: "line",
        name: i18n.t("delivery_order"),
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        color: "#db6a07",
      },
    ],
    categories_line: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    chartArea: {
      background: "transparent",
      height: 280,
    },
    valueAxis_line: [
      {
        max: 10,
        // visible: false,
        labels: {
          format: "{0}",
        },
      },
    ],
  }),
  props: {},
  methods: {
    hideTabs() {
      this.isHide = !this.isHide;
    },
    async dashboardInvoiceSaleOrderGraph() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          let strFilter = "";
          strFilter = "?asOf=" + new Date().toISOString() + "&type=cus";
          this.showLoadingGraph = true;
          dashboardHandler.invoiceSaleOrderGraph(strFilter).then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoadingGraph = false;
              const response = res.data.data;
              const balance = response.invoice || [];
              const saleOrder = response.saleOrder || [];
              const deliveryOrder = response.deliveryOrder || [];
              const maxAxe = response.max || 0;
              const axeLength = parseInt(maxAxe).toString().length - 1;
              const axeIncre = parseInt("1" + String(1).padStart(axeLength, "0"));
              this.seriesLine = [
                {
                  type: "area",
                  name: i18n.t("sale"),
                  data: balance,
                  color: "url(#svg-gradient-sale)",
                  // color: "#ED1A3A",
                  opacity: 0.7,
                  line: {
                    style: "smooth",
                  },
                },
                {
                  type: "area",
                  name: i18n.t("sale_order"),
                  data: saleOrder,
                  color: "url(#svg-gradient-so)",
                  // color: "#4d4848",
                  opacity: 0.5,
                  line: {
                    style: "smooth",
                  },
                },
                {
                  type: "area",
                  name: i18n.t("delivery_order"),
                  data: deliveryOrder,
                  color: "url(#svg-gradient-do)",
                  // color: "#db6a07",
                  opacity: 0.5,
                  line: {
                    style: "smooth",
                  },
                },
              ];
              this.valueAxis_line = [
                {
                  max: maxAxe + axeIncre,
                  labels: {
                    format: "{0}",
                  },
                },
              ];
            }
          });
        }, 10);
      });
    },
  },
  components: {
    ByCustomer: () => import("./ByCustomer"),
    SaleTax: () => import("./BySaleTax"),
    ByProductsServices: () => import("./ByProductsServices"),
    // RecurringInvoices: () => import("./RecurringInvoices"),
    chart: Chart,
  },
  computed: {
    appType() {
      return dataStore.productType;
    },
  },
  mounted: async function () {
    this.dashboardInvoiceSaleOrderGraph();
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
