<template>
  <v-row>
    <v-col sm="12" cols="12" class="grayBg px-6">
      <v-card color="white" class="pa-3 no_border" elevation="0">
        <h2 class="mb-0 font_020">{{ $t("debit_note") }}</h2>
        <p class="mb-2">{{ $t("debit_note_txn_by_customer_desc") }}</p>
        <LoadingMe
          :isLoading="showLoading"
          :fullPage="false"
          type="loading"
          :myLoading="true"
        >
        </LoadingMe>
        <v-row>
          <v-col sm="3" cols="12" class="py-0">
            <label class="label">{{ $t("dates") }}</label>
            <v-select
              class="mt-1"
              :items="dateSorters"
              v-model="mDateSorter"
              @change="onSorterChanges"
              item-value="value"
              item-text="text"
              outlined
              placeholder="ALL"
            />
          </v-col>

          <v-col sm="3" cols="12" class="py-0">
            <label class="label">{{ $t("from") }}</label>
            <app-datepicker :initialDate="startDate" @emitDate="startDate = $event" />
          </v-col>

          <v-col sm="3" cols="12" class="py-0">
            <label class="label">{{ $t("to") }}</label>
            <app-datepicker :initialDate="endDate" @emitDate="endDate = $event" />
          </v-col>

          <v-col sm="2" cols="2" class="pt-0 mt-6">
            <v-btn
              color="primary white--text"
              :loading="loadingSearch"
              @click="onSearch('Invoice-debit-note')"
            >
              <i class="b-search" style="font-size: 18px; color: #fff !important" />
            </v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col sm="12" cols="12" class="py-0">
            <gridFullScreen>
              <template>
                <kendo-datasource
                  ref="gridTransactionDebitNoteDS"
                  :type="'JSON'"
                  :data="debitNoteList"
                  :group="group"
                  :server-paging="false"
                />
                <kendo-grid
                  id="gridTransactionDebitNote"
                  class="grid-function"
                  :data-source-ref="'gridTransactionDebitNoteDS'"
                  :editable="false"
                  :groupable="true"
                  :sortable="true"
                  :column-menu="true"
                  :filterable="true"
                  :resizable="true"
                  @pagechange="pageChangeHandler"
                  :toolbar="['excel']"
                  :excel-file-name="'SaleAnalysisByCustomer.xlsx'"
                  :excel-filterable="true"
                  :excel-all-pages="true"
                  :scrollable-virtual="true"
                >
                  <!--                <kendo-grid-column-->
                  <!--                    :field="'no'"-->
                  <!--                    :title="$t('no')"-->
                  <!--                    :template="rowNumberTmpl"-->
                  <!--                    :width="90"-->
                  <!--                    :column-menu="false"-->
                  <!--                    :headerAttributes="{ style: 'background-color: #EDF1F5;', class: 'text-center'	}"-->
                  <!--                    :attributes="{style: 'text-align: center'}"/>-->
                  <kendo-grid-column
                    :field="'date'"
                    :title="$t('date')"
                    :width="200"
                    :sortable="true"
                    :resizable="true"
                    :group-footer-template="$t('total')"
                    :template="dateFormat"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'name'"
                    :attributes="{ class: 'tb_name_td' }"
                    :title="$t('name')"
                    :width="200"
                    :sortable="false"
                    :filterable-multi="true"
                    :filterable-search="true"
                    :template="'<span>#=name#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="$t('transactionType')"
                    :title="$t('type')"
                    :width="200"
                    :sortable="false"
                    :template="transactionTypeTemplate"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'referenceNo'"
                    :title="$t('number')"
                    :width="150"
                    :sortable="true"
                    :template="referenceTemplate"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5, color: green !important',
                    }"
                  />
                  <kendo-grid-column
                    :field="'refNum'"
                    :title="$t('ref_number')"
                    :width="200"
                    :sortable="true"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5, color: green !important',
                    }"
                  />
                  <!--                                <kendo-grid-column-->
                  <!--                                    :field="'referenceNo'"-->
                  <!--                                    :title="$t('ref_from')"-->
                  <!--                                    :width="180"-->
                  <!--                                    :template="referenceTemplate"-->
                  <!--                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>-->
                  <!--                                <kendo-grid-column-->
                  <!--                                    :field="'referenceNo'"-->
                  <!--                                    :title="$t('ref_to')"-->
                  <!--                                    :width="180"-->
                  <!--                                    :template="referenceTemplate"-->
                  <!--                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>-->
                  <kendo-grid-column
                    :field="'exchangeSubTotal'"
                    :title="$t('sub_total')"
                    :width="200"
                    :group-footer-template="'#= kendo.toString(sum, `n2`)#'"
                    :aggregates="['sum']"
                    :footerAttributes="{ style: 'text-align: right;' }"
                    :attributes="{ style: 'text-align: right; ' }"
                    :template="'<span>#=kendo.toString(exchangeSubTotal, decimalFormat)#</span>'"
                    :headerAttributes="{
                      style: 'text-align: right;background-color: #EDF1F5',
                    }"
                  />
                  <kendo-grid-column
                    :field="'exchangeDiscountTotal'"
                    :title="$t('discount')"
                    :width="200"
                    :group-footer-template="'#= kendo.toString(sum, `n2`)#'"
                    :aggregates="['sum']"
                    :footerAttributes="{ style: 'text-align: right;' }"
                    :attributes="{ style: 'text-align: right; ' }"
                    :template="'<span>#=kendo.toString(exchangeDiscountTotal, decimalFormat)#</span>'"
                    :headerAttributes="{
                      style: 'text-align: right;background-color: #EDF1F5',
                    }"
                  />
                  <kendo-grid-column
                    :field="'exchangeAmount'"
                    :title="$t('amount')"
                    :width="200"
                    :group-footer-template="'#= kendo.toString(sum, `n2`)#'"
                    :aggregates="['sum']"
                    :footerAttributes="{ style: 'text-align: right;' }"
                    :attributes="{ style: 'text-align: right; ' }"
                    :template="'<span>#=kendo.toString(exchangeAmount, decimalFormat)#</span>'"
                    :headerAttributes="{
                      style: 'text-align: right;background-color: #EDF1F5',
                    }"
                  />
                  <kendo-grid-column
                    :field="'segment.name'"
                    :title="$t('segment')"
                    :width="200"
                    :sortable="false"
                    :filterable-multi="true"
                    :filterable-search="true"
                    :attributes="{ style: 'text-align: left; ' }"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'location.name'"
                    :title="$t('location')"
                    :width="200"
                    :sortable="false"
                    :filterable-multi="true"
                    :filterable-search="true"
                    :attributes="{ style: 'text-align: left; ' }"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'project.name'"
                    :title="$t('project')"
                    :width="200"
                    :sortable="false"
                    :filterable-multi="true"
                    :filterable-search="true"
                    :attributes="{ style: 'text-align: left; ' }"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />

                  <!--                <kendo-grid-column-->
                  <!--                    :field="'status'"-->
                  <!--                    :title="$t('progressing_status')"-->
                  <!--                    :width="180"-->
                  <!--                    :template="status"-->
                  <!--                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>-->
                  <kendo-grid-column
                    :field="'status'"
                    :title="$t('status')"
                    :width="180"
                    :sortable="false"
                    :filterable="{ multi: true }"
                    :template="status"
                    :attributes="{ class: 'tb_name_td', style: 'text-align: center' }"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <!--                <kendo-grid-column-->
                  <!--                    :field="''"-->
                  <!--                    :title="$t('action')"-->
                  <!--                    :width="100"-->
                  <!--                    :command="[{  text: 'Convert', click: goToConvert }]"-->
                  <!--                    :headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"/>-->
                </kendo-grid>
              </template>
            </gridFullScreen>
          </v-col>
        </v-row>
        <div style="overflow: auto" class="sale-adjust-invoice-debit-note"></div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import InvoiceModel from "@/scripts/invoice/model/Invoice";
import kendo from "@progress/kendo-ui";
import LinkTemplate from "@/components/kendo_templates/LinkTemplate";
import { i18n } from "@/i18n";

const billingHandler = require("@/scripts/invoice/handler/billingHandler");
const invoiceModel = new InvoiceModel({});

import JSZip from "jszip";
const $ = kendo.jQuery; //require("jquery")

window.JSZip = JSZip;
export default {
  name: "SaleTransaction",
  components: {
    LoadingMe: () => import(`@/components/Loading`),
    "app-datepicker": () => import(`@/components/custom_templates/DatePickerComponent`),
    gridFullScreen: () => import("@/components/gridFullScreen"),
  },
  data: () => ({
    loadingSearch: false,
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
    showLoading: false,
    debitNoteList: [],
    tranDS: [],
    saleFormContent: {},
    isLoaded: false,
    invoice: invoiceModel,
    totalRevenue: 0,
    totalSaleLead: 0,
    totalSaleQuote: 0,
    totalSaleOrder: 0,
    group: { field: "name" },
    sort: { field: "referenceNo", dir: "ASC" },
    aggregateDefinition: [
      { field: "exchangeAmount", aggregate: "sum" },
      { field: "exchangeSubTotal", aggregate: "sum" },
      { field: "exchangeDiscountTotal", aggregate: "sum" },
    ],
    pageable: {
      buttonCount: 5,
      info: false,
      type: "numeric",
      pageSizes: false,
      previousNext: true,
    },
    params: {
      isDonor: false,
      search: "",
      type: "cus",
      key: {},
    },
    paging: {},
    txnByDebitNotes: [],
    disabledMe: true,
    action: "",
  }),
  methods: {
    pdfExport: function (e) {
      // const pivot = this.$refs.gridTransactionDebitNoteDS.kendoWidget()
      // pivot.saveAsPDF()
      window.console.log("pdfExport");
      window.console.log(e.data);
    },
    pageChangeHandler: function (event) {
      alert("change", event);
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
    numberFormat(value) {
      return kendo.toString(value, `n${this.saleFormContent.decimal}`);
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
    transactionTypeTemplate(data) {
      return `<span> ${i18n.t(data.transactionType)}</span>`;
    },
    goToConvert(e) {
      this.newClick = false;
      e.preventDefault();
      // let grid = kendo.jQuery("#gridAddress").data("kendoGrid")
      // let dataItem = grid.dataItem($(e.currentTarget).closest("tr"))
      // this.address = dataItem
      // this.mCountry = dataItem.country
      // this.dialogM2 = true
    },
    rowNumberTmpl(dataItem) {
      let ds = this.$refs.gridTransactionDebitNoteDS.kendoWidget(),
        index = ds.indexOf(dataItem);
      return index + 1;
    },
    async loadTransactions() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = true;
          billingHandler.list().then((res) => {
            if (res.data.statusCode === 200) {
              window.console.log(res);
              this.debitNoteList = res.data.data;
              const result = res.data.result;
              this.totalRevenue = kendo.toString(result.Revenue, result.decimalFormat);
              this.totalSaleLead = kendo.toString(result.SaleLead, result.decimalFormat);
              this.totalSaleOrder = kendo.toString(
                result.SaleOrder,
                result.decimalFormat
              );
              this.totalSaleQuote = kendo.toString(
                result.SaleQuote,
                result.decimalFormat
              );
            }
            this.showLoading = false;
          });
        }, 10);
      });
    },

    async searchTransaction(type) {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = true;
          this.loadingSearch = true;
          const startDate = this.startDate;
          const endDate = this.endDate;
          this.params = {
            search: "",
            type: type,
            start: startDate,
            end: endDate,
            key: this.paging,
            isSummarize: 0,
          };
          this.disabledNextPage(true);
          billingHandler.list(this.params).then((res) => {
            if (res.data.statusCode === 200) {
              this.loadingSearch = false;
              this.showLoading = false;
              window.console.log("im search", res);
              const responseData = res.data.data || [];
              this.debitNoteList = responseData;
              this.paging = res.data.key;
              window.console.log("key", res.data.key);
              this.txnByDebitNotes.push(responseData);
              //   const result = res.data.result;
              //   this.totalRevenue = kendo.toString(
              //     result.Revenue,
              //     result.decimalFormat
              //   );
              //   this.totalSaleLead = kendo.toString(
              //     result.SaleLead,
              //     result.decimalFormat
              //   );
              //   this.totalSaleOrder = kendo.toString(
              //     result.SaleOrder,
              //     result.decimalFormat
              //   );
              //   this.totalSaleQuote = kendo.toString(
              //     result.SaleQuote,
              //     result.decimalFormat
              //   );

              if (Object.keys(this.paging).length > 0) {
                this.disabledNextPage(false);
              } else {
                this.disabledNextPage(true);
              }
              this.itemRetuned(this);
              // window.console.log("txnByDebitNotes", this.txnByDebitNotes, res.data.key);
            } else {
              this.loadingSearch = false;
              this.showLoading = false;
            }
          });
        }, 10);
      });
    },
    // async transactionSummarize(type) {
    //   new Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve("resolved");
    //       this.showLoading = true;
    //       this.loadingSearch = true;
    //       const startDate = this.startDate;
    //       const endDate = this.endDate;
    //       this.params = {
    //         search: "",
    //         type: type,
    //         start: startDate,
    //         end: endDate,
    //         isSummarize: 1,
    //         key: {},
    //       };
    //       billingHandler.list(this.params).then((res) => {
    //         if (res.data.statusCode === 200) {
    //           this.loadingSearch = false;
    //           this.showLoading = false;
    //           const result = res.data.data[0] || {};
    //           this.totalRevenue = kendo.toString(result.Revenue, result.decimalFormat);
    //           this.totalSaleLead = kendo.toString(result.SaleLead, result.decimalFormat);
    //           this.totalSaleOrder = kendo.toString(
    //             result.SaleOrder,
    //             result.decimalFormat
    //           );
    //           this.totalSaleQuote = kendo.toString(
    //             result.SaleQuote,
    //             result.decimalFormat
    //           );
    //         } else {
    //           this.loadingSearch = false;
    //           this.showLoading = false;
    //         }
    //       });
    //     }, 10);
    //   });
    // },
    onSearch(type) {
      this.action = type;
      this.txnByDebitNotes = [];
      //   $(".k-pager-wrap").empty();
      //   $(".sale-adjust-invoice-debitnote-page-number").empty();
      this.loadPage(this);
      this.paging = {};
      //   this.params = {
      //     search: "",
      //     type: type,
      //     start: this.startDate,
      //     end: this.endDate,
      //     key: {},
      //   };
      this.searchTransaction(type);
      // this.transactionSummarize(type);
    },
    dateFormat(dataItem) {
      return kendo.toString(
        new Date(dataItem.date),
        `${this.invoice.dateFormat} h:mm tt`
      );
    },
    // linkTo(dataItem) {
    //     window.console.log(dataItem)
    //     this.$router.push({
    //         path: 'invoice' + `/${dataItem.id}`,
    //         params: {id: dataItem.id},
    //         query: {type: 'edit'}
    //     })
    // },
    status(dataItem) {
      let status = "",
        type = dataItem.type || "";
      switch (dataItem.status) {
        case 1:
          status = "Open";
          break;
        case 2:
          if (type === "Sale Lead" || type === "Sale Quote" || type === "Sale Order") {
            status = "Applied";
          } else {
            status = "Partially Paid";
          }
          break;
        case 3:
          status = "Paid";
          break;
        case 4:
          status = "Void";
          break;
      }
      return status;
    },
    callback() {
      if (this.$route.params !== null && this.$route.params.hasOwnProperty("data")) {
        const data = this.$route.params.data;
        if (data.transactionType === "delete") {
          this.loadTransactions();
        }
      }
      window.console.log("im changed", this.$route.params);
    },
    async loadPage(that) {
      $(".sale-adjust-invoice-debit-note").html(`
                <label class="label sale-adjust-invoice-debitnote-item-returned">0</label>
                <div style="display: flex; flex-direction: 'row'">
                    <button class="sale-adjust-invoice-debitnote-next-page" title="previous" style="width: 24px; font-size: 19px;"> < </button>
                    <ul class="sale-adjust-invoice-debitnote-page-number" style="display: flex;list-style: none; padding-left: 0px;">
                        <li style="padding: 6px;"  data-page="1" class="sale-adjust-invoice-debitnote-page-link text-bold-link" >1</li>
                    </ul>
                    <button class="sale-adjust-invoice-debitnote-next-page" title="next" style="width: 24px; font-size: 19px;"> > </button>
                </div>
            `);
      $(document).on("click", ".sale-adjust-invoice-debitnote-page-link", function () {
        const page = $(this).data("page");
        $(".sale-adjust-invoice-debitnote-page-link").removeClass("text-bold-link");
        $(this).addClass("text-bold-link");
        that.backToPage(that, page - 1);
        window.console.log(page - 1);
      });
      // $(document).on('click', '.sale-adjust-invoice-debitnote-next-page', function () {
      $(".sale-adjust-invoice-debitnote-next-page").click(function () {
        const page_number = $(this)
          .parent()
          .children(".sale-adjust-invoice-debitnote-page-number")
          .find("li")
          .last()
          .data("page");
        window.console.log("sale-adjust-invoice-debitnote-page_number", page_number);
        const isPrevious = $(this).attr("title");
        if (isPrevious == "previous") {
          const currectpage = $(".text-bold-link").data("page");

          if (currectpage == 1) {
            return;
          }
          $(".sale-adjust-invoice-debitnote-page-link").removeClass("text-bold-link");
          $(`.sale-adjust-invoice-debitnote-page-link:eq(${currectpage - 1})`).addClass(
            "text-bold-link"
          );
          that.backToPage(that, currectpage - 2);
          window.console.log("this currectpage back", currectpage - 2);
        } else {
          $(".sale-adjust-invoice-debitnote-page-link").removeClass("text-bold-link");
          that.params = {
            search: that.search || "",
            type: that.action,
            start: that.startDate,
            end: that.endDate,
            key: that.paging,
          };
          window.console.log("params", that.params);
          that.searchTransaction(that.action);
          $(this)
            .parent()
            .children(".sale-adjust-invoice-debitnote-page-number")
            .append(
              `<li class="sale-adjust-invoice-debitnote-page-link text-bold-link" style="padding: 6px;" data-page="${
                page_number + 1
              }">${page_number + 1}</li>`
            );
        }
        window.console.log("this", page_number + 1);
      });
    },
    itemRetuned(that) {
      let totalRow = 0;
      that.txnByDebitNotes.forEach((k) => {
        totalRow += k.length;
      });
      $(".sale-adjust-invoice-debitnote-item-returned").text(
        "Items returned (" + totalRow + ")"
      );
    },
    disabledNextPage(value) {
      $(".sale-adjust-invoice-debitnote-next-page").prop("disabled", value);
    },
    backToPage(that, index) {
      try {
        window.console.log("Length of txnByDebitNotes", that.txnByDebitNotes.length);
        const byCustomer = that.txnByDebitNotes.at(index);
        that.debitNoteList = byCustomer;
        // that.refreshGridData(customer)
        window.console.log("that.txnByDebitNotes[index]", byCustomer);
      } catch (e) {
        window.console.log("ERROR on backToPage", index);
      }
    },
    refreshGridData(data) {
      $("#gridTransaction").data("kendoGrid").dataSource.data([]);
      $("#gridTransaction").data("kendoGrid").dataSource.data(data);
    },
  },
  async mounted() {
    this.group = [
      {
        field: "name",
        aggregates: this.aggregateDefinition,
      },
    ];
    this.loadPage(this);
    this.itemRetuned(this);
    this.disabledNextPage(true);
    // await this.searchTransaction("");
    $(document).on("click", ".k-pager-nav", function () {
      window.console.log("this", $(this).data("page"));
    });
  },
  computed: {},
  watch: {
    // $route: "callback",
  },
};
</script>
<style scoped>
.k-pdf-export .k-grid {
  font-family: "DejaVu Sans", "Arial", sans-serif;
}

/* Hide the Grid header and pager during export */
.k-pdf-export .k-grid-toolbar,
.k-pdf-export .k-pager-wrap {
  display: none;
}
</style>
