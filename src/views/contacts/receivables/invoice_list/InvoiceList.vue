<template>
  <v-row>
    <v-col sm="12" cols="12" :class="'pl-1 pt-0'">
      <v-card color="white" class="pa-3 no_border" elevation="0">
        <div>
          <v-row>
            <v-col sm="8" cols="12" class="py-0">
              <h2 class="mb-0 font_20">{{ $t("invoice_list_by_customers") }}</h2>
              <p class="mb-0">{{ $t("invoice_list_by_customers_desc") }}</p>
            </v-col>
          </v-row>
        </div>
        <LoadingMe
          :isLoading="showLoading"
          :fullPage="false"
          type="loading"
          :myLoading="true"
        >
        </LoadingMe>
        <v-row>
          <v-col sm="4" cols="12" class="py-0">
            <label class="label">{{ $t("date") }}</label>
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

          <v-col sm="4" cols="12" class="py-0">
            <label class="label">{{ $t("from") }}</label>
            <app-datepicker :initialDate="startDate" @emitDate="startDate = $event" />
          </v-col>
          <v-col sm="4" cols="12" class="py-0">
            <label class="label">{{ $t("to") }}</label>
            <app-datepicker :initialDate="endDate" @emitDate="endDate = $event" />
          </v-col>

          <v-col sm="4" cols="12" class="kendo_dropdown_custom py-1">
            <label class="label">{{ $t("customer_name") }}</label>
            <dropdownlist
              :data-items="customerList"
              @change="onChange"
              :value="customer"
              :data-item-key="dataItemKey"
              :text-field="textField"
              :default-item="defaultItem"
              :filterable="true"
              clearable
              :placeholder="$t('customer')"
              :loading="loading"
              @filterchange="onFilterChange"
            >
            </dropdownlist>
          </v-col>
          <v-col sm="4" cols="1" class="py-0 mt-7">
            <v-btn
              color="primary white--text"
              :loading="loadingSearch"
              @click="onSearch('Invoice-list')"
            >
              <i class="b-search" style="font-size: 18px; color: #fff !important"
            /></v-btn>
            <v-btn color="primary" class="white--text text-upper ml-3" to="invoice"
              >{{ $t("new_invoice") }}
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="12" cols="12" class="py-0">
            <v-btn
              v-show="institute_id === `inst-99999999`"
              class="capitalize"
              @click="allPrint"
            >
              {{ $t("print") }}</v-btn
            >
            <v-btn
              :loading="laodExcel"
              color="primary"
              style="height: 28px !important; border-radius: 2px !important"
              class="text--white capitalize"
              @click="excelExportBtn"
              >Export to Excel</v-btn
            >
            <gridFullScreen>
              <template>
                <kendo-datasource
                  ref="gridTransactionInvoiceListReportDS"
                  :type="'JSON'"
                  :data="transactions"
                  :group="group"
                  :server-paging="false"
                />
                <kendo-grid
                  id="gridTransactionInvoiceListReportReport"
                  class="grid-function"
                  :data-source-ref="'gridTransactionInvoiceListReportDS'"
                  :editable="false"
                  :groupable="true"
                  :sortable="true"
                  :column-menu="true"
                  :filterable="true"
                  :resizable="true"
                  @pagechange="pageChangeHandler"
                  :excel-export="excelExport"
                  :excel-file-name="'Invoice list.xlsx'"
                  :excel-filterable="true"
                  :excel-all-pages="true"
                  :scrollable-virtual="true"
                >
                  <kendo-grid-column
                    :field="'transactionDate'"
                    :title="$t('date')"
                    :template="formatDate"
                    :group-footer-template="$t('total')"
                    :width="180"
                    :filterable="true"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />

                  <kendo-grid-column
                    :field="'customerType'"
                    :title="$t('type')"
                    :template="'<span>#=customerType#</span>'"
                    :width="180"
                    :hidden="true"
                    :filterable="false"
                    :attributes="{ style: 'text-align: left; ' }"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5;text-align: left',
                    }"
                  />
                  <kendo-grid-column
                    :field="'group'"
                    :title="$t('group')"
                    :template="'<span>#=group#</span>'"
                    :width="180"
                    :hidden="true"
                    :filterable="false"
                    :attributes="{ style: 'text-align: left; ' }"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5;text-align: left',
                    }"
                  />
                  <kendo-grid-column
                    :field="'name'"
                    :title="$t('name')"
                    :attributes="{ class: 'tb_name_td' }"
                    :template="'<span>#=name#</span>'"
                    :width="200"
                    :group-header-template="'#=value#'"
                    :filterable-multi="true"
                    :filterable-search="true"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    v-if="!plansNotAccess.includes(4)"
                    :field="'empName'"
                    :title="$t('employee_name')"
                    :template="'<span>#=empName#</span>'"
                    :width="200"
                    :hidden="true"
                    :filterable="{ multi: true }"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'referenceNo'"
                    :title="$t('invoice_no')"
                    :template="referenceTemplate"
                    :width="180"
                    :filterable="false"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'journalNote'"
                    :title="$t('description')"
                    :template="'<span>#=journalNote#</span>'"
                    :width="180"
                    :hidden="true"
                    :filterable="false"
                    :attributes="{ style: 'text-align: left; ' }"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5;text-align: left',
                    }"
                  />
                  <kendo-grid-column
                    v-if="!plansNotAccess.includes(4)"
                    :field="'code'"
                    :title="$t('payment_code')"
                    :template="'<span>#=code#</span>'"
                    :width="180"
                    :filterable="false"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'amount'"
                    :title="$t('amount')"
                    :template="'<span>#= kendo.toString(parseFloat(amount || 0), decimalFormat)#</span>'"
                    :width="180"
                    :filterable="false"
                    :aggregates="['sum']"
                    :footerAttributes="{
                      style: 'text-align: right;font-weight: bold;',
                    }"
                    :group-footer-template="'#= kendo.toString(sum, `n2`)#'"
                    :headerAttributes="{
                      style: 'text-align: right;padding-right:35px;',
                    }"
                    :attributes="{
                      style: 'text-align: right;',
                    }"
                  />
                  <kendo-grid-column
                    :field="'journalNote'"
                    :title="$t('description')"
                    :width="200"
                    :hidden="true"
                    :filterable="false"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'paymentTerm'"
                    :title="$t('term')"
                    :template="'<span>#=paymentTerm#</span>'"
                    :width="150"
                    :filterable="false"
                    :attributes="{ style: 'text-align: left; ' }"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5;text-align: left',
                    }"
                  />
                  <kendo-grid-column
                    :field="'dueDate'"
                    :title="$t('due_date')"
                    :template="'<span>#= kendo.toString(new Date(dueDate), dateFormat)#</span>'"
                    :width="130"
                    :hidden="true"
                    :filterable="false"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'status'"
                    :title="$t('status')"
                    :template="status"
                    :attributes="{
                      class: 'tb_name_td',
                    }"
                    :filterable="false"
                    :width="150"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    v-if="!plansNotAccess.includes(4)"
                    :field="'nrd'"
                    :title="$t('nrd')"
                    :hidden="true"
                    :attributes="{
                      class: 'tb_name_td',
                    }"
                    :filterable="false"
                    :width="150"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'segment.name'"
                    :title="$t('segment')"
                    :template="'<span>#=segment.name || ``#</span>'"
                    :width="180"
                    :filterable="false"
                    :attributes="{ style: 'text-align: left; ' }"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5;text-align: left',
                    }"
                  />
                  <kendo-grid-column
                    v-if="!plansNotAccess.includes(4)"
                    :field="'location.name'"
                    :title="$t('location')"
                    :template="'<span>#=location.name || ``#</span>'"
                    :width="180"
                    :filterable="false"
                    :attributes="{ style: 'text-align: left; ' }"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5;text-align: left',
                    }"
                  />
                  <kendo-grid-column
                    :sortable="false"
                    :attributes="{
                      style: 'text-align: left;',
                    }"
                    :title="$t('action')"
                    :width="140"
                    :command="[
                      {
                        text: $t('detailbtn'),
                        click: goDetial,
                      },
                      {
                        text: $t('print'),
                        click: goPrint,
                      },
                    ]"
                    :headerAttributes="{
                      style: 'text-align: left; background-color: #EDF1F5',
                    }"
                  />
                </kendo-grid>
              </template>
            </gridFullScreen>
          </v-col>
          <div style="overflow: auto" class="invoice-list-pager"></div>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { DropDownList } from "@progress/kendo-vue-dropdowns";
const balanceHandler = require("@/scripts/balance/handler/balanceHandler");
import InvoiceModel from "@/scripts/invoice/model/Invoice";
import kendo from "@progress/kendo-ui";
import LinkTemplate from "@/components/kendo_templates/LinkTemplate";
import { i18n } from "@/i18n";
import { dataStore } from "@/observable/store";

const billingHandler = require("@/scripts/invoice/handler/billingHandler");
const invoiceModel = new InvoiceModel({});
import { exportExelFormat, invoicePrintRow } from "@/utils";
import JSZip from "jszip";
const $ = kendo.jQuery; //require("jquery")
const SECOND_DELAY = 1000;
const defaultItem = { ["name"]: i18n.t("select_customer_name"), ["id"]: null };
const emptyItem = { ["name"]: "loading ..." };
const cookieJS = require("@/cookie.js");
const cookie = cookieJS.getCookie();
const institute_id = cookie ? cookie.instituteId : "";
window.JSZip = JSZip;
export default {
  name: "SaleTransaction",
  props: ["isFund", "emitTab"],
  components: {
    LoadingMe: () => import(`@/components/Loading`),
    "app-datepicker": () => import(`@/components/custom_templates/DatePickerComponent`),
    gridFullScreen: () => import("@/components/gridFullScreen"),
    dropdownlist: DropDownList,
  },
  data: () => ({
    loading: false,
    institute_id: institute_id,
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
    transactions: [],
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
    aggregateDefinition: [{ field: "amount", aggregate: "sum" }],
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
    txnByCustomers: [],
    disabledMe: true,
    action: "",

    customerList: [],
    customer: {},
    textField: "name",
    defaultItem: defaultItem,
    dataItemKey: "id",
    filter: "",
    cusBaseUrl: balanceHandler.customerVendors(),
    // se
    segment: {},
    pageIndex: 0,
    laodExcel: false,
    isEnd: true,
    stopped: false,
  }),
  methods: {
    async excelExportBtn() {
      let dataExportExcel = [];
      this.params = {
        search: "",
        type: "Invoice-list",
        start: this.startDate,
        end: this.endDate,
        key: {},
      };

      let i = 0;
      this.laodExcel = true;
      this.stopped = false;
      try {
        while (!this.stopped) {
          i++;
          let getAll = await billingHandler.list(this.params);
          this.params.key = getAll.data.key;
          dataExportExcel = dataExportExcel.concat(getAll.data.data);
          if (Object.keys(getAll.data.key).length == 0 || getAll.data.key == "") {
            this.stopped = true;
            this.transactions = dataExportExcel;
            setTimeout(() => {
              const grid = kendo
                .jQuery("#gridTransactionInvoiceListReportReport")
                .data("kendoGrid");
              grid.saveAsExcel();
            }, 1000);
            setTimeout(() => {
              this.laodExcel = false;
              const byCustomer = this.txnByCustomers.at(this.pageIndex);
              this.transactions = byCustomer;
              dataExportExcel = [];
            }, 2000);
          }
          if (i > 100) this.stopped = true;
        }
      } catch (e) {
        this.stopped = true;
        window.console.log(e);
      }
    },
    excelExport: function (e) {
      let filterExcel = {
        dataFrom: this.startDate,
        dateTo: this.endDate,
        title: i18n.t("invoice_list_by_customers"),
        type: i18n.t("filtered_by") + this.customer.name,
      };
      e.workbook.sheets[0].title = i18n.t("invoice_list_by");
      exportExelFormat(e, filterExcel);
    },
    formatDate(value) {
      return kendo.toString(
        new Date(value.transactionDate),
        value.dateFormat + ` hh:mm tt`
      );
    },
    allPrint() {
      let newData = [];
      this.txnByCustomers.forEach((lp) => {
        newData = newData.concat(lp);
      });
      // window.console.log('new data' , newData)
      invoicePrintRow(newData);
    },
    goPrint(e) {
      e.preventDefault();
      const grid = kendo
        .jQuery("#gridTransactionInvoiceListReportReport")
        .data("kendoGrid");
      const dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
      invoicePrintRow(dataItem);
    },
    goDetial(e) {
      e.preventDefault();
      let grid = kendo
        .jQuery("#gridTransactionInvoiceListReportReport")
        .data("kendoGrid");
      let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
      dataStore.receivableBalanceRp.txnId = dataItem.id;
      dataStore.receivableBalanceRp.cId = this.customer.id;
      dataStore.receivableBalanceRp.name = this.customer.name;
      this.$emit("emitTab", 0);
    },
    // groupFooterTemplate(dataItem) {
    //   // const str = `<div #if(${dataItem.amount.sum}===0){#class="classzero"#}#>Total:</div>`;
    //   // window.console.log('xxxx', str, dataItem.amount.sum)
    //   return `<div #if(${dataItem.amount.sum}===0){#class="classzero"#}#>Total:</div>`;
    // },
    pdfExport: function (e) {
      // const pivot = this.$refs.gridTransactionInvoiceListReportDS.kendoWidget()
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
      const nrd = data.nrd;
      if (data.type === "Invoice") {
        url = `invoice_view/${data.id}`;
        if (nrd) {
          url = `invoice_view/${data.id}-nrd`;
        }
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
      let ds = kendo.jQuery("#gridTransactionInvoiceListReport").data("kendoGrid"),
        index = ds.indexOf(dataItem);
      return index + 1;
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
            id: this.customer.id || "",
          };
          this.disabledNextPage(true);
          billingHandler.list(this.params).then((res) => {
            if (res.data.statusCode === 200) {
              this.loadingSearch = false;
              this.showLoading = false;
              window.console.log("im search", res);
              let responseData = res.data.data || [];
              if (
                this.appType == "Supply" ||
                this.appType == "Marketing" ||
                this.appType == "Service"
              ) {
                let newData = [];
                responseData.forEach((forD) => {
                  if (forD.segment.id != "") {
                    if (forD.segment.id === this.segment.id) {
                      newData.push(forD);
                    }
                  } else {
                    // for old data
                    if (forD.segment.name === this.segment.name) {
                      newData.push(forD);
                    }
                  }
                });
                responseData = newData;
              }
              this.transactions = responseData;
              this.paging = res.data.key;
              window.console.log("key", res.data.key);
              this.txnByCustomers.push(responseData);
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
                this.isEnd = false;
              }
              this.itemRetuned(this);
              // window.console.log("txnByCustomers", this.txnByCustomers, res.data.key);
            } else {
              this.loadingSearch = false;
              this.showLoading = false;
            }
          });
        }, 10);
      });
    },
    async transactionSummarize(type) {
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
            isSummarize: 1,
            key: {},
            id: this.customer.id || "",
          };
          billingHandler.list(this.params).then((res) => {
            if (res.data.statusCode === 200) {
              this.loadingSearch = false;
              this.showLoading = false;
              const result = res.data.data[0] || {};
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
            } else {
              this.loadingSearch = false;
              this.showLoading = false;
            }
          });
        }, 10);
      });
    },
    onSearch(type) {
      this.action = type;
      this.txnByCustomers = [];
      //   $(".k-pager-wrap").empty();
      //   $(".bycus-page-number").empty();
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
          status = i18n.t("open");
          break;
        case 2:
          if (type === "Sale Lead" || type === "Sale Quote" || type === "Sale Order") {
            status = i18n.t("applied");
          } else {
            status = i18n.t("partially_paid");
          }
          break;
        case 3:
          status = i18n.t("paid_status");
          break;
        case 4:
          status = i18n.t("void");
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
      $(".invoice-list-pager").html(`
                <label class="label invoice-list-item-returned">0</label>
                <div style="display: flex; flex-direction: 'row'">
                    <button class="invoice-list-next-page" title="previous" style="width: 24px; font-size: 19px;"> < </button>
                    <ul class="invoice-list-page-number" style="display: flex;list-style: none; padding-left: 0px;">
                        <li style="padding: 6px;"  data-page="1" class="invoice-list-page-link text-bold-link" >1</li>
                    </ul>
                    <button class="invoice-list-next-page" title="next" style="width: 24px; font-size: 19px;"> > </button>
                </div>
            `);
      $(document).on("click", ".invoice-list-page-link", function () {
        const page = $(this).data("page");
        $(".invoice-list-page-link").removeClass("text-bold-link");
        $(this).addClass("text-bold-link");
        that.backToPage(that, page - 1);
        window.console.log(page - 1);
        that.pageIndex = page - 1;
      });
      // $(document).on('click', '.invoice-list-next-page', function () {
      $(".invoice-list-next-page").click(function () {
        const page_number = $(this)
          .parent()
          .children(".invoice-list-page-number")
          .find("li")
          .last()
          .data("page");
        window.console.log("invoice-list-page_number", page_number);
        that.pageIndex = page_number;
        const isPrevious = $(this).attr("title");
        if (isPrevious == "previous") {
          const currectpage = $(".text-bold-link").data("page");

          if (currectpage == 1) {
            return;
          }
          $(".invoice-list-page-link").removeClass("text-bold-link");
          $(`.invoice-list-page-link:eq(${currectpage - 1})`).addClass("text-bold-link");
          that.backToPage(that, currectpage - 2);
          window.console.log("this currectpage back", currectpage - 2);
        } else {
          $(".invoice-list-page-link").removeClass("text-bold-link");
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
            .children(".invoice-list-page-number")
            .append(
              `<li class="invoice-list-page-link text-bold-link" style="padding: 6px;" data-page="${
                page_number + 1
              }">${page_number + 1}</li>`
            );
        }
        window.console.log("this", page_number + 1);
      });
    },
    itemRetuned(that) {
      let totalRow = 0;
      that.txnByCustomers.forEach((k) => {
        totalRow += k.length;
      });
      $(".invoice-list-item-returned").text("Items returned (" + totalRow + ")");
    },
    disabledNextPage(value) {
      $(".invoice-list-next-page").prop("disabled", value);
    },
    backToPage(that, index) {
      try {
        window.console.log("Length of txnByCustomers", that.txnByCustomers.length);
        const byCustomer = that.txnByCustomers.at(index);
        that.transactions = byCustomer;
        // that.refreshGridData(customer)
        window.console.log("that.txnByCustomers[index]", byCustomer);
      } catch (e) {
        window.console.log("ERROR on backToPage", index);
      }
    },
    refreshGridData(data) {
      $("#gridTransactionInvoiceListReport").data("kendoGrid").dataSource.data([]);
      $("#gridTransactionInvoiceListReport").data("kendoGrid").dataSource.data(data);
    },
    onFilterChange(event) {
      const filter = event.filter.value;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.requestData(0, filter, this.cusBaseUrl);
        this.filter = filter;
        this.loading = false;
      }, SECOND_DELAY);
      this.loading = true;
    },
    requestData(skip, filter, baseUrl) {
      const url = baseUrl + `?pattern=cus-bal&filter=${filter}`;
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then(this.afterFetch);
    },
    afterFetch(json) {
      this.customerList = json.data;
    },
    onChange(event) {
      const value = event.value;
      if (value && value["name"] === emptyItem["name"]) {
        return;
      }
      this.customer = value;
    },
    async loadBizSetting() {
      let bizSetting = localStorage.getItem("@bizSetting");
      let getS = JSON.parse(bizSetting);
      let bizTpe = getS.filter((obj) => {
        return obj.type == dataStore.businessType;
      });
      if (bizTpe.length > 0) {
        this.segment = bizTpe[0].segment;
      }
    },
  },
  async mounted() {
    this.group = [
      {
        field: "name",
        aggregates: this.aggregateDefinition,
      },
    ];
    this.requestData(0, this.filter, this.cusBaseUrl);
    this.loadPage(this);
    this.itemRetuned(this);
    this.disabledNextPage(true);
    if (
      this.appType == "Supply" ||
      this.appType == "Marketing" ||
      this.appType == "Service"
    ) {
      this.loadBizSetting();
    }
    // await this.searchTransaction("");
    $(document).on("click", ".k-pager-nav", function () {
      window.console.log("this", $(this).data("page"));
    });
  },
  computed: {
    appType() {
      return dataStore.productType;
    },
    plansNotAccess() {
      return dataStore.plansNotAccess;
    },
  },
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
