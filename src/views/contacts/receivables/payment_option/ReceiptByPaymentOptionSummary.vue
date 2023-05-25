<template>
  <v-row>
    <v-col sm="12" cols="12" class="grayBg px-6">
      <v-card color="white" class="pa-3 no_border" elevation="0">
        <h2 class="mb-0 font_020">{{ $t("customer_payment_option_summary_report") }}</h2>
        <p class="mb-0">{{ $t("customer_payment_option_summary_report_desc") }}</p>
        <!-- loading -->
        <LoadingMe
          :isLoading="showLoading"
          :fullPage="false"
          type="loading"
          :myLoading="true"
        >
        </LoadingMe>
        <v-row class="">
          <v-col sm="4" cols="12" class="pb-0">
            <label class="label">{{ $t("dates") }}</label>
            <v-select
              class="mt-1"
              :items="dateSorters"
              @change="onSorterChanges"
              v-model="mDateSorter"
              outlined
              placeholder="ALL"
            />
          </v-col>

          <v-col sm="4" cols="12" class="pb-0">
            <label class="label">{{ $t("from") }}</label>
            <app-datepicker :initialDate="startDate" @emitDate="startDate = $event" />
          </v-col>

          <v-col sm="4" cols="12" class="pb-0">
            <label class="label">{{ $t("to") }}</label>
            <app-datepicker :initialDate="endDate" @emitDate="endDate = $event" />
          </v-col>
          <v-col sm="4" cols="12" class="pt-0 kendo_dropdown_custom">
            <label class="label">{{ $t("payment_options") }}</label>
            <paymentoption-dropdownlist
              :initPaymentOption="paymentOption"
              :initType="'Customer'"
              @onChange="onPaymentOptionChanged"
            />
          </v-col>
          <v-col sm="1" cols="1" class="py-0 mt-7">
            <v-btn color="primary white--text" @click="onSearch">
              <i class="b-search" style="font-size: 16px; color: #fff" />
            </v-btn>
          </v-col>
        </v-row>
        <gridFullScreen>
          <v-row class="mt-0">
            <v-col sm="12" cols="12" class="py-0">
              <kendo-datasource
                ref="gridPaymentOptionSummaryReportDS"
                :data="transactionList"
              />
              <kendo-grid
                id="gridPaymentOptionReportSummary"
                class="grid-function"
                :data-source-ref="'gridPaymentOptionSummaryReportDS'"
                :sortable="true"
                :resizable="true"
                :filterable="true"
                :column-menu="true"
                :editable="false"
                :groupable="false"
                :noRecords="true"
                :excel-file-name="'Paymentoptionsummary.xlsx'"
                :excel-filterable="true"
                :excel-all-pages="true"
                :toolbar="['excel']"
                :scrollable-virtual="true"
              >
                <kendo-grid-column
                  :field="'name'"
                  :attributes="{ class: 'tb_name_td' }"
                  :title="$t('name')"
                  :width="180"
                  :filterable-multi="true"
                  :filterable-search="true"
                  :template="'<span>#=name || ``#</span>'"
                  :group-footer-template="'Total:'"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'type'"
                  :title="$t('type')"
                  :width="180"
                  :filterable-multi="true"
                  :filterable-search="true"
                  :template="'<span>#=type || ``#</span>'"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'xAmount'"
                  :title="$t('amount')"
                  :width="180"
                  :aggregates="['sum']"
                  :template="'<span>#= kendo.toString(xAmount, decimalFormat)#</span>'"
                  :group-footer-template="'<div style=text-align:right><span class=text-bold>#= kendo.toString(sum, `n2`)#</span>'"
                  :attributes="{ style: 'text-align: right' }"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
              </kendo-grid>
            </v-col>
            <div style="overflow: auto" class="sale-payment-opt-report-summary"></div>
          </v-row>
        </gridFullScreen>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { i18n } from "@/i18n";
import DatePickerComponent from "@/components/custom_templates/DatePickerComponent";
import kendo from "@progress/kendo-ui";

const billingHandler = require("@/scripts/invoice/handler/billingHandler");
const $ = kendo.jQuery;
export default {
  name: "CustomerPaymentOptionSummaryReports",
  components: {
    LoadingMe: () => import(`@/components/Loading`),
    "app-datepicker": DatePickerComponent,
    gridFullScreen: () => import("@/components/gridFullScreen"),
    "paymentoption-dropdownlist": () =>
      import("@/components/dropdownlist/PaymentOptionsDropDownList"),
  },
  data: () => ({
    startDate: new Date().toISOString().substring(0, 10),
    endDate: new Date().toISOString().substring(0, 10),
    dateSorters: [
      {
        text: i18n.t("today"),
        value: "Today",
      },
      {
        text: i18n.t("this_week"),
        value: "This Week",
      },
      {
        text: i18n.t("this_month"),
        value: "This Month",
      },
      {
        text: i18n.t("this_year"),
        value: "This Year",
      },
      {
        text: i18n.t("last_month"),
        value: "Last Month",
      },
      {
        text: i18n.t("last_year"),
        value: "Last Year",
      },
    ],
    mDateSorter: "Today",
    journal_entries: [],
    // transactions: [],
    showLoading: false,
    isLoaded: false,
    aggregateDefinition: [{ field: "xAmount", aggregate: "sum" }],

    transactionList: [],
    txnTransactionList: [],
    totalTransaction: 0,
    totalTransactionPerPage: 0,
    paging: {},
    action: "",
    params: {},
    paymentOption: {},
  }),
  methods: {
    onPaymentOptionChanged(value) {
      this.paymentOption = value;
    },
    rowNumberTmpl(dataItem) {
      let ds = this.$refs.gridPaymentOptionSummaryReportDS.kendoWidget(),
        index = ds.indexOf(dataItem);
      return index + 1;
    },
    onSorterChanges(val) {
      let today = new Date();
      switch (val) {
        case "Today":
          this.startDate = kendo.toString(today, "yyyy-MM-dd");
          this.endDate = kendo.toString(today, "yyyy-MM-dd");

          break;
        case "This Week":
          var first = today.getDate() - today.getDay(),
            last = first + 6;

          this.startDate = kendo.toString(new Date(today.setDate(first)), "yyyy-MM-dd");
          this.endDate = kendo.toString(new Date(today.setDate(last)), "yyyy-MM-dd");

          break;
        case "This Month":
          this.startDate = kendo.toString(
            new Date(today.getFullYear(), today.getMonth(), 1),
            "yyyy-MM-dd"
          );
          this.endDate = kendo.toString(
            new Date(today.getFullYear(), today.getMonth(), 31),
            "yyyy-MM-dd"
          );
          break;
        case "Last Month":
          this.startDate = kendo.toString(
            new Date(today.getFullYear(), today.getMonth(), -30),
            "yyyy-MM-dd"
          );
          this.endDate = kendo.toString(
            new Date(today.getFullYear(), today.getMonth() - 1, +31),
            "yyyy-MM-dd"
          );

          break;
        case "Last Year":
          this.startDate = kendo.toString(
            new Date(today.getFullYear(), -11, -30),
            "yyyy-MM-dd"
          );
          this.endDate = kendo.toString(
            new Date(today.getFullYear(), -1, +31),
            "yyyy-MM-dd"
          );
          break;
        case "This Year":
          this.startDate = kendo.toString(
            new Date(today.getFullYear(), 0, 1),
            "yyyy-MM-dd"
          );
          this.endDate = kendo.toString(
            new Date(today.getFullYear(), 11, 31),
            "yyyy-MM-dd"
          );

          break;
        default:
          this.startDate = "";
          this.endDate = "";
      }
    },
    // exportToExcel() {
    //   const grid = $("#gridPaymentOptionReportSummary").data("kendoGrid");
    //   grid.saveAsExcel();
    // },
    excelExport: function () {
      const grid = $("#gridPaymentOptionReportSummary").data("kendoGrid");
      grid.saveAsExcel();
    },
    async loadPage(that) {
      $(".sale-payment-opt-report-summary").html(`
                <span class="mt-2 sale-payment-opt-summary-item-returned">0</span><br/>
                <div style="display: flex; flex-direction: 'row'">
                    <button class="sale-payment-opt-summary-next-page" title="previous" style="width: 24px; font-size: 19px; margin-top: -6px;"> < </button>
                    <ul class="sale-payment-opt-summary-page-number page_scroll" style="display: flex;list-style: none; padding-left: 0px;">
                        <li style="padding: 6px; padding-bottom: 0px;"  data-page="1" class="sale-payment-opt-summary-page-link text-bold-link" >1</li>
                    </ul>
                    <button class="sale-payment-opt-summary-next-page" title="next" style="width: 24px; font-size: 19px;margin-top: -6px;"> > </button>
                </div>
            `);
      $(document).on("click", ".sale-payment-opt-summary-page-link", function () {
        const page = $(this).data("page");
        $(".sale-payment-opt-summary-page-link").removeClass("text-bold-link");
        $(this).addClass("text-bold-link");
        that.backToPage(that, page - 1);
        window.console.log(page - 1);
      });
      // $(document).on('click', '.bycus-next-page', function () {
      $(".sale-payment-opt-summary-next-page").click(function () {
        const page_number = $(this)
          .parent()
          .children(".sale-payment-opt-summary-page-number")
          .find("li")
          .last()
          .data("page");
        window.console.log("sale-payment-opt-summary-page_number", page_number);
        const isPrevious = $(this).attr("title");
        if (isPrevious == "previous") {
          const currectpage = $(".text-bold-link").data("page");

          if (currectpage == 1) {
            return;
          }
          $(".sale-payment-opt-summary-page-link").removeClass("text-bold-link");
          $(`.sale-payment-opt-summary-page-link:eq(${currectpage - 1})`).addClass(
            "text-bold-link"
          );
          that.backToPage(that, currectpage - 2);
          window.console.log("this currectpage back", currectpage - 2);
        } else {
          $(".sale-payment-opt-summary-page-link").removeClass("text-bold-link");
          that.loadSalePaymentOptionReport(that.search);
          $(this)
            .parent()
            .children(".sale-payment-opt-summary-page-number")
            .append(
              `<li class="sale-payment-opt-summary-page-link text-bold-link" style="padding: 6px; padding-bottom: 0px;" data-page="${
                page_number + 1
              }">${page_number + 1}</li>`
            );
        }
        window.console.log("this", page_number + 1);
      });
    },
    itemRetuned(that) {
      let totalRow = 0;
      that.txnTransactionList.forEach((k) => {
        totalRow += k.length;
      });
      $(".sale-payment-opt-summary-item-returned").text(
        "Items returned (" + totalRow + ")"
      );
    },
    disabledNextPage(value) {
      $(".sale-payment-opt-summary-next-page").prop("disabled", value);
    },
    backToPage(that, index) {
      try {
        const byProduct = that.txnTransactionList.at(index);
        that.transactionList = byProduct;
        // that.refreshGridData(customer)
        window.console.log("that.txnTransactionList[index]", byProduct);
      } catch (e) {
        window.console.log("ERROR on backToPage", index);
      }
    },
    onSearch(search) {
      this.txnTransactionList = [];
      this.loadPage(this);
      this.paging = {};
      this.loadSalePaymentOptionReport(search);
    },
    async loadSalePaymentOptionReport() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.transactionList = [];
          this.params = {
            asOf: this.asOf,
            key: this.paging,
            start: this.startDate,
            end: this.endDate,
            type: "sale",
            summarize: 1,
            id: this.paymentOption.id || "",
          };
          this.showLoading = true;
          this.disabledNextPage(true);
          billingHandler.paymentOptionReport(this.params).then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoading = false;
              const responseData = res.data.data || [];
              const total = res.data.total || 0;
              this.showLoading = false;
              this.transactionList = responseData;
              this.paging = res.data.key;
              window.console.log("key", res.data.key);
              this.txnTransactionList.push(responseData);

              this.totalTransactionPerPage = this.transactionList.length;
              this.totalTransaction = total;

              if (Object.keys(this.paging).length > 0) {
                this.disabledNextPage(false);
              } else {
                this.disabledNextPage(true);
              }
              this.itemRetuned(this);
            } else {
              this.showLoading = false;
            }
          });
        }, 10);
      });
    },
  },
  mounted: async function () {
    this.loadPage(this);
    this.itemRetuned(this);
    this.disabledNextPage(true);
  },
  computed: {},
};
</script>
<style scoped>
@media (max-width: 576px) {
  .paddingTop {
    padding-top: 0 !important;
  }
}

.b-search:before {
  color: #fff !important;
}
</style>
