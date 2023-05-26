<template>
  <v-row class="">
    <v-col sm="12" cols="12" class="pt-0">
      <v-card outlined dense color="white" class="no_border">
        <v-row>
          <v-col sm="12" cols="12" class="py-0">
            <h3 style="line-height: 30px" class="font_020">
              {{ $t("balance_payment") }}
            </h3>
            <p class="mb-0">{{ $t("balance_payment_desc") }}</p>
          </v-col>
        </v-row>
        <LoadingMe
          :isLoading="showLoadingGraph"
          :fullPage="false"
          :myLoading="true"
          :type="'loading'"
        />
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
            <!-- color: "url(#svg-gradient3)", -->
            <linearGradient id="svg-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color: #ed1a3a; stop-opacity: 0.95" />
              <stop offset="100%" style="stop-color: #ed1a3a; stop-opacity: 0.05" />
            </linearGradient>
            <linearGradient id="svg-gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color: #474343; stop-opacity: 0.95" />
              <stop offset="100%" style="stop-color: #474343; stop-opacity: 0.05" />
            </linearGradient>
            <linearGradient id="svg-gradient3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color: #db6a07; stop-opacity: 0.95" />
              <stop offset="100%" style="stop-color: #db6a07; stop-opacity: 0.05" />
            </linearGradient>
          </defs>
        </svg>
      </v-card>
      <v-tabs v-model="tIndex">
        <v-tab>
          <span class="text-uppercase">
            {{ $t("summary") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="text-uppercase">
            {{ $t("detail") }}
          </span>
        </v-tab>

        <v-tab>
          <span class="text-uppercase">
            {{ $t("aging") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="text-uppercase">
            {{ $t("history") }}
          </span>
        </v-tab>
        <v-tab-item>
          <v-card flat eager>
            <v-card-text class="">
              <ReceivableBalanceSummary
                @isViewEmit="isViewValue = $event"
                @nextTab="tIndex = $event"
              />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item eager>
          <v-card flat>
            <v-card-text class="">
              <BalanceDetail
                :isView="isViewValue"
                @isViewEmit="(isViewValue = $event), (isViewValue2 = 1)"
                :tIndex="tIndex"
                @nextTab="tIndex = $event"
              />
            </v-card-text>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-card flat>
            <v-card-text class="">
              <Aging />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item eager>
          <v-card flat>
            <v-card-text class="">
              <InvoiceMovement
                :isViewMain="isViewMain"
                :isView="isViewValue2"
                @isViewEmit="(isViewValue2 = $event), (isViewMain = 0)"
                :tIndex="tIndex"
              />
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-col>
  </v-row>
</template>

<script>
import { Chart } from "@progress/kendo-charts-vue-wrapper";
import { i18n } from "@/i18n";
const dashboardHandler = require("@/scripts/dashboard/customer/handler/dashboardHandler");
export default {
  name: "CustomerDeposits",
  props: ["isViewMain", "isViewMainEmit"],
  components: {
    BalanceDetail: () => import("./BalanceDetail"),
    ReceivableBalanceSummary: () => import("./ReceivableBalanceSummary"),
    InvoiceMovement: () =>
      import("@/views/contacts/receivables/receivable_balances/InvoiceMovement.vue"),
    Aging: () => import("./Aging"),
    chart: Chart,
    LoadingMe: () => import(`@/components/Loading`),
  },
  data: () => ({
    tIndex: 0,
    isViewValue: 0,
    isViewValue2: 0,
    isFirst: 0,
    showLoadingGraph: false,
    tooltip: {
      visible: true,
      template: "#= series.name #: #= kendo.toString(value, `n2`) #",
    },
    // line chart
    seriesLine: [
      {
        type: "line",
        name: "Sale",
        data: [4, 2, 6, 8, 2, 8, 4, 2, 6, 8, 2, 8],
        color: "#4d4848",
      },
      {
        type: "line",
        name: "Purchase",
        data: [1, 6, 9, 5, 4, 5, 4, 2, 6, 8, 2, 8],
        color: "#c80000",
      },
    ],
    categories_line: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    chartArea: {
      background: "transparent",
      height: 260,
    },
    valueAxis_line: [
      {
        max: 1000,
        // visible: false,
        labels: {
          format: "{0}",
        },
      },
    ],
  }),
  computed: {
    isViewInvoiceList() {
      return this.isViewMain;
    },
  },
  watch: {
    isViewInvoiceList() {
      if (this.isViewMain == 1) {
        this.isViewValue2 = 1;
        this.tIndex = 0;
        if (this.isFirst === 0) {
          this.tIndex = 3;
        }
        this.isFirst += 1;
        this.$emit("isViewMainEmit", 0);
      } else {
        this.tIndex = 3;
      }
    },
  },
  methods: {
    // EmitCalBack(){

    // },
    async dashboardSalePaymentGraph() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          let strFilter = "";
          strFilter = "?asOf=" + new Date().toISOString() + "&type=cus";
          this.showLoadingGraph = true;
          dashboardHandler.customerBalanceNPaymentGraph(strFilter).then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoadingGraph = false;
              const response = res.data.data;
              const balance = response.balance || [];
              const payment = response.payment || [];
              const maxAxe = response.max || 0;
              const axeLength = parseInt(maxAxe).toString().length - 1;
              const axeIncre = parseInt("1" + String(1).padStart(axeLength, "0"));
              this.seriesLine = [
                {
                  type: "area",
                  name: i18n.t("balance"),
                  data: balance,
                  color: "url(#svg-gradient)",
                  // color: "#ED1A3A",
                  opacity: 0.7,
                  line: {
                    style: "smooth",
                  },
                },
                {
                  type: "area",
                  name: i18n.t("receipt"),
                  data: payment,
                  color: "url(#svg-gradient2)",
                  // color: "#000",

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
  mounted: async function () {
    this.dashboardSalePaymentGraph();
  },
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
