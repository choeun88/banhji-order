<template>
  <v-row>
    <v-col sm="12" cols="12" class="grayBg px-6">
      <v-card color="white" class="pa-3 no_border" elevation="0">
        <v-row>
          <v-col sm="12" cols="12" class="pt-0">
            <h2 class="mb-1 font_020">{{ $t("payment_terms") }}</h2>
            <p class="mb-0">{{ $t("payment_term_report_desc") }}</p>
          </v-col>
          <v-col sm="4" cols="12" class="py-0">
            <v-select
              class="mt-1"
              :items="dateSorters"
              v-model="mDateSorter"
              @change="onSorterChanges"
              clearable
              outlined
              placeholder="ALL"
            />
          </v-col>
          <v-col sm="4" cols="12" class="py-0">
            <app-datepicker :initialDate="startDate" @emitDate="startDate = $event" />
          </v-col>
          <v-col sm="4" cols="12" class="py-0">
            <app-datepicker :initialDate="endDate" @emitDate="endDate = $event" />
          </v-col>
          <v-col sm="4" cols="12" class="py-0">
            <v-select
              class="mt-1"
              v-model="paymentTerm"
              :items="paymentTerms"
              :loading="paymentTerms.length === 0"
              placeholder="Term"
              item-text="name"
              item-value="id"
              clearable
              return-object
              outlined
            />
          </v-col>
          <v-col sm="1" cols="12" class="py-0">
            <v-btn
              color="primary"
              class="text-capitalize white--text mt-1"
              @click="onSearch"
            >
              <i class="b-search" style="font-size: 18px; color: #fff !important" />
            </v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col sm="12" cols="12" class="py-0">
            <gridFullScreen>
              <template>
                <LoadingMe
                  :isLoading="showLoading"
                  :fullPage="false"
                  type="loading"
                  :myLoading="true"
                />

                <kendo-datasource
                  ref="gridPaymentTermDS"
                  :group="group"
                  :data="paymentTermList"
                />
                <kendo-grid
                  id="gridPaymentTermReport"
                  class="grid-function"
                  :data-source-ref="'gridPaymentTermDS'"
                  :column-menu="true"
                  :noRecords="true"
                  :groupable="true"
                  :editable="false"
                  :sortable="true"
                  :resizable="true"
                  :excel-file-name="'paymentTermReport.xlsx'"
                  :excel-filterable="true"
                  :excel-all-pages="true"
                  :toolbar="['excel']"
                  :scrollable-virtual="true"
                >
                  <kendo-grid-column
                    :field="'transactionDate'"
                    :title="$t('date')"
                    :template="dateFormat"
                    :attributes="{ style: 'text-align: left; ' }"
                    :width="150"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'referenceNo'"
                    :title="$t('referenceNo')"
                    :template="referenceTemplate"
                    :width="170"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'objName.name'"
                    :title="$t('customer')"
                    :attributes="{ style: 'text-align: left; ' }"
                    :width="150"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'ctype.name'"
                    :title="$t('type')"
                    :hidden="true"
                    :attributes="{ style: 'text-align: left; ' }"
                    :width="150"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'cgroup.name'"
                    :hidden="true"
                    :title="$t('group')"
                    :attributes="{ style: 'text-align: left; ' }"
                    :width="150"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'apterm.name'"
                    :title="$t('approved_term')"
                    :attributes="{ style: 'text-align: left; ' }"
                    :width="200"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'term.name'"
                    :title="$t('invoice_term')"
                    :attributes="{ style: 'text-align: left; ' }"
                    :width="170"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'xSubtotal'"
                    :title="$t('amount')"
                    :attributes="{ style: 'text-align: right; ' }"
                    :template="'<span>#= kendo.toString(xSubtotal, decimalFormat)#</span>'"
                    :width="200"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'appliedTerm'"
                    :title="$t('applied')"
                    :width="120"
                    :column-menu="false"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5;',
                      class: 'text-center',
                    }"
                    :attributes="{ style: 'text-align: center' }"
                  />
                </kendo-grid>
              </template>
            </gridFullScreen>
          </v-col>
        </v-row>
        <div style="overflow: auto" class="paymentterm-report"></div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { i18n } from "@/i18n";
import JSZip from "jszip";
import kendo from "@progress/kendo-ui";
const customerHandler = require("@/scripts/customerHandler");
import LinkTemplate from "@/components/kendo_templates/LinkTemplate";
const paymentTermHandler = require("@/scripts/settingsHandler");

const $ = kendo.jQuery;
window.JSZip = JSZip;
export default {
  data: () => ({
    showLoading: false,
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
    group: [{ field: "objName.name" }],
    paymentTerms: [],
    paymentTerm: {},
    paymentTermList: [],
    txnPaymentTermList: [],
    totalPaymentTermList: 0,
    totalPaymentTermPerPage: 0,
    paging: {},
    action: "",
    params: {},
  }),
  components: {
    LoadingMe: () => import(`@/components/Loading`),
    "app-datepicker": () => import(`@/components/custom_templates/DatePickerComponent`),
    gridFullScreen: () => import("@/components/gridFullScreen"),
  },
  methods: {
    async loadPaymentTerm() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          const strFilter = "?type=pmt-customer";
          paymentTermHandler.getPaymentTerm(strFilter).then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoading = false;
              this.paymentTerms = res.data.data;
              // if (this.paymentTerms.length > 0) {
              //     this.invoice.paymentTerm = this.paymentTerms[0];
              // }
            }
          });
        }, 10);
      });
    },
    referenceTemplate(data) {
      let url = "";
      if (data.type === "Invoice") {
        url = `invoice_view/${data.id}`;
      } else if (data.type === "Sale Deposit") {
        url = `sale_deposit_view/${data.id}`;
      } else if (data.type === "Purchase") {
        url = `credit_purchase_view/${data.id}`;
      } else if (data.type === "Sale Quote") {
        url = `sale_quote_view/${data.id}`;
      } else if (data.type === "Cash Receipt") {
        url = `cash_receipt_view/${data.id}`;
      } else if (data.type === "Sale Order") {
        url = `sale_order_view/${data.id}`;
      } else if (data.type === "Purchase Deposit") {
        url = `purchase_deposit_view/${data.id}`;
      } else if (data.type === "Credit Memo") {
        url = `sale_return_view/${data.id}`;
      } else if (data.type === "Debit Memo") {
        url = `purchase_return_view/${data.id}`;
      } else if (data.type === "Cash Payment") {
        url = `cash_payment_view/${data.id}`;
      } else if (data.type === "Sale Lead") {
        url = `lead/${data.id}`;
      }
      const refFrom = data.refFrom || [];
      const refTo = data.refTo || [];
      let args = {
        text: data.referenceNo,
        related: !!refFrom.length > 0 || !!refTo.length > 0,
        url: url,
        data: data,
      };
      // window.console.log("related", refFrom, !!refFrom.length > 0);
      return {
        template: LinkTemplate,
        templateArgs: args,
      };
    },
    dateFormat(dataItem) {
      return kendo.toString(
        new Date(dataItem.transactionDate),
        `${dataItem.dateFormat} H:mm`
      );
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
          today = new Date();
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
        default:
          this.startDate = "";
          this.endDate = "";
      }
    },
    // async loadPaymentTermReport() {
    //   new Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve("resolved");
    //       this.showLoading = true;
    //       const strFilter = "?start=" + this.startDate + "&end=" + this.endDate;
    //       this.showLoading = true;
    //       customerHandler.paymentTermReport(strFilter).then((res) => {
    //         if (res.data.statusCode === 200) {
    //           this.transactionList = res.data.data;
    //           this.showLoading = false;
    //         } else {
    //           this.showLoading = false;
    //         }
    //       });
    //     }, 10);
    //   });
    // },
    async loadPage(that) {
      $(".paymentterm-report").html(`
                <label class="label paymentterm-report-page-cus-item-returned">0</label>
                <div style="display: flex; flex-direction: 'row'">
                    <button class="paymentterm-report-page-cus-next-page" title="previous" style="width: 24px; font-size: 19px;"> < </button>
                    <ul class="paymentterm-report-page-cus-page-number" style="display: flex;list-style: none; padding-left: 0px;">
                        <li style="padding: 6px;"  data-page="1" class="paymentterm-report-page-cus-page-link text-bold-link" >1</li>
                    </ul>
                    <button class="paymentterm-report-page-cus-next-page" title="next" style="width: 24px; font-size: 19px;"> > </button>
                </div>
            `);
      $(document).on("click", ".paymentterm-report-page-cus-page-link", function () {
        const page = $(this).data("page");
        $(".paymentterm-report-page-cus-page-link").removeClass("text-bold-link");
        $(this).addClass("text-bold-link");
        that.backToPage(that, page - 1);
        window.console.log(page - 1);
      });
      // $(document).on('click', '.paymentterm-report-page-cus-next-page', function () {
      $(".paymentterm-report-page-cus-next-page").click(function () {
        const page_number = $(this)
          .parent()
          .children(".paymentterm-report-page-cus-page-number")
          .find("li")
          .last()
          .data("page");
        window.console.log("paymentterm-report-page-cus-page_number", page_number);
        const isPrevious = $(this).attr("title");
        if (isPrevious == "previous") {
          const currectpage = $(".text-bold-link").data("page");

          if (currectpage == 1) {
            return;
          }
          $(".paymentterm-report-page-cus-page-link").removeClass("text-bold-link");
          $(`.paymentterm-report-page-cus-page-link:eq(${currectpage - 1})`).addClass(
            "text-bold-link"
          );
          that.backToPage(that, currectpage - 2);
          window.console.log("this currectpage back", currectpage - 2);
        } else {
          $(".paymentterm-report-page-cus-page-link").removeClass("text-bold-link");
          window.console.log("params", that.params);
          that.loadPaymentTermReport(that.action);
          $(this)
            .parent()
            .children(".paymentterm-report-page-cus-page-number")
            .append(
              `<li class="paymentterm-report-page-cus-page-link text-bold-link" style="padding: 6px;" data-page="${
                page_number + 1
              }">${page_number + 1}</li>`
            );
        }
        window.console.log("this", page_number + 1);
      });
    },
    itemRetuned(that) {
      let totalRow = 0;
      that.txnPaymentTermList.forEach((k) => {
        totalRow += k.length;
      });
      $(".paymentterm-report-page-cus-item-returned").text(
        "Items returned (" + totalRow + ")"
      );
    },
    disabledNextPage(value) {
      $(".paymentterm-report-page-cus-next-page").prop("disabled", value);
    },
    backToPage(that, index) {
      try {
        window.console.log(
          "Length of txnPaymentTermList",
          that.txnPaymentTermList.length
        );
        const byCustomer = that.txnPaymentTermList.at(index);
        that.transactions = byCustomer;
        // that.refreshGridData(customer)
        window.console.log("that.txnPaymentTermList[index]", byCustomer);
      } catch (e) {
        window.console.log("ERROR on backToPage", index);
      }
    },
    onSearch(search) {
      this.txnPaymentTermList = [];
      this.loadPage(this);
      this.paging = {};
      this.loadPaymentTermReport(search);
      //   this.loadCreditLimitUsage();
    },
    async loadPaymentTermReport() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.paymentTermList = [];
          const term = this.paymentTerm || {};
          const termId = term.id || "";
          this.params = {
            start: this.startDate,
            end: this.endDate,
            key: this.paging,
            type: "cus",
            termId: termId,
          };
          this.showLoading = true;
          this.disabledNextPage(true);
          customerHandler.paymentTermReport(this.params).then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoading = false;
              const responseData = res.data.data || [];
              const total = res.data.total || 0;
              this.showLoading = false;
              this.paymentTermList = responseData;
              this.paging = res.data.key;
              window.console.log("key", res.data.key);
              this.txnPaymentTermList.push(responseData);

              this.totalPaymentTermPerPage = this.paymentTermList.length;
              this.totalPaymentTermList = total;

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
  computed: {},
  mounted: async function () {
    this.loadPaymentTerm();
    this.loadPage(this);
    this.itemRetuned(this);
    this.disabledNextPage(true);
  },
};
</script>
<style scoped>
.theme--light.v-data-table {
  background-color: transparent !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  height: 32px !important;
  border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr:first-child > td {
  border-top: thin solid rgba(0, 0, 0, 0.12) !important;
}

.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background-color: transparent !important;
}
</style>
