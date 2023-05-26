<template>
  <v-row>
    <v-col sm="12" cols="12" class="grayBg px-6">
      <v-card color="white" class="pa-3 no_border" elevation="0">
        <div>
          <v-row>
            <v-col sm="8" cols="12" class="py-0">
              <h2 class="mb-0 font_020">{{ $t("invoice_balance_txn") }}</h2>
              <p class="mb-0">{{ $t("invoice_balance_txn_desc") }}</p>
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
              :required="true"
              :placeholder="$t('customer')"
              :loading="loading"
              @filterchange="onFilterChange"
            >
            </dropdownlist>
          </v-col>
          <v-col sm="4" cols="12" class="py-0">
            <v-autocomplete
              class="mt-1 mt-6"
              :items="txnInvoices"
              v-model="txnId"
              item-value="id"
              item-text="referenceNo"
              return-object
              outlined
              :placeholder="$t('invoice_number')"
            >
            </v-autocomplete>
          </v-col>
          <v-col sm="1" cols="1" class="py-0 mt-6">
            <v-btn
              color="primary white--text"
              :loading="loadingSearch"
              @click="onSearch('Invoice-history')"
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
                  ref="gridTransactionInvoiceListDS"
                  :type="'JSON'"
                  :data="transactions"
                  :group="group"
                  :sort="sortDefinition"
                  :server-paging="false"
                />
                <kendo-grid
                  id="gridTransactionInvoiceList"
                  class="grid-function"
                  :data-source-ref="'gridTransactionInvoiceListDS'"
                  :editable="false"
                  :groupable="true"
                  :sortable="true"
                  :column-menu="true"
                  :filterable="true"
                  :resizable="true"
                  @pagechange="pageChangeHandler"
                  :toolbar="['excel']"
                  :excel-file-name="'Invoice Balance Movement.xlsx'"
                  :excel-filterable="true"
                  :excel-all-pages="true"
                  :scrollable-virtual="true"
                >
                  <kendo-grid-column
                    :field="'date'"
                    :title="$t('date')"
                    :template="dateFormat"
                    :group-footer-template="groupFooterTemplate"
                    :width="180"
                    :filterable="true"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'type'"
                    :title="$t('transactions_type')"
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
                      style: 'background-color: #EDF1F5;text-align: center',
                    }"
                  />
                  <kendo-grid-column
                    :field="'customerGroup'"
                    :title="$t('group')"
                    :template="'<span>#=customerGroup#</span>'"
                    :width="180"
                    :hidden="true"
                    :filterable="false"
                    :attributes="{ style: 'text-align: left; ' }"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5;text-align: center',
                    }"
                  />
                  <kendo-grid-column
                    :field="'name'"
                    :title="$t('name')"
                    :attributes="{ class: 'tb_name_td' }"
                    :template="'<span>#=name#</span>'"
                    :width="200"
                    :hidden="true"
                    :group-header-template="'#=value#'"
                    :filterable-multi="true"
                    :filterable-search="true"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'referenceNo'"
                    :title="$t('reference_no')"
                    :template="referenceTemplate"
                    :width="180"
                    :filterable="false"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />

                  <kendo-grid-column
                    :field="'amount'"
                    :title="$t('amount')"
                    :template="'<span>#= kendo.toString(parseFloat(amount || 0), decimalFormat)#</span>'"
                    :width="200"
                    :filterable="false"
                    :attributes="{ style: 'text-align: right; ' }"
                    :aggregates="['sum']"
                    :footerAttributes="{
                      style: 'text-align: right;font-weight: bold;',
                    }"
                    :group-footer-template="'#= kendo.toString(sum, `n2`)#'"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5;text-align: right',
                    }"
                  />
                  <kendo-grid-column
                    :field="'code'"
                    :title="$t('payment_code')"
                    :template="'<span>#=code#</span>'"
                    :width="180"
                    :filterable="false"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'status'"
                    :title="$t('status')"
                    :template="status"
                    :attributes="{
                      class: 'tb_name_td',
                      style: 'text-align: left',
                    }"
                    :filterable="false"
                    :hidden="true"
                    :width="150"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'segment.name'"
                    :title="$t('segment')"
                    :template="'<span>#=segment.name || ``#</span>'"
                    :width="180"
                    :filterable="false"
                    :hidden="true"
                    :attributes="{ style: 'text-align: left; ' }"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5;text-align: left',
                    }"
                  />
                  <kendo-grid-column
                    :field="'location.name'"
                    :title="$t('location')"
                    :template="'<span>#=location.name || ``#</span>'"
                    :width="180"
                    :filterable="false"
                    :hidden="true"
                    :attributes="{ style: 'text-align: left; ' }"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5;text-align: left',
                    }"
                  />
                </kendo-grid>
              </template>
            </gridFullScreen>
          </v-col>
          <div style="overflow: auto" class="invoice-movement-pager"></div>
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

import JSZip from "jszip";
const $ = kendo.jQuery; //require("jquery")
const SECOND_DELAY = 1000;
const defaultItem = { ["name"]: i18n.t("customer_name"), ["id"]: null };
const emptyItem = { ["name"]: "loading ..." };

window.JSZip = JSZip;
export default {
  props: ["tIndex", "isView", "isViewEmit"],
  components: {
    LoadingMe: () => import(`@/components/Loading`),
    gridFullScreen: () => import("@/components/gridFullScreen"),
    dropdownlist: DropDownList,
  },
  data: () => ({
    loading: false,
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
    sortDefinition: [{ field: "date", dir: "asc" }],
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
    txnInvoices: [],
    txnId: {},
  }),
  methods: {
    dateFormat(dataItem) {
      return kendo.toString(new Date(dataItem.date), `${dataItem.dateFormat} h:mm tt`);
    },
    groupFooterTemplate(dataItem) {
      // const str = `<div #if(${dataItem.amount.sum}===0){#class="classzero"#}#>Total:</div>`;
      // window.console.log('xxxx', str, dataItem.amount.sum)
      return `<div #if(${dataItem.amount.sum}===0){#class="classzero"#}#>Total:</div>`;
    },
    pdfExport: function (e) {
      // const pivot = this.$refs.gridTransactionInvoiceListDS.kendoWidget()
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
        url = `cash_receipt/${data.id}`;
      } else if (data.type === "Sale Order") {
        url = `sale_order_view/${data.id}`;
      } else if (data.type === "Purchase Deposit") {
        url = `purchase_deposit_view/${data.id}`;
      } else if (data.type === "Credit Memo" || data.type === "Offset Invoice") {
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
      let ds = this.$refs.gridTransactionInvoiceListDS.kendoWidget(),
        index = ds.indexOf(dataItem);
      return index + 1;
    },
    async searchTransaction(type) {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = true;
          this.loadingSearch = true;
          const objTxnId = this.txnId || [];
          this.params = {
            type: type,
            key: this.paging,
            isSummarize: 0,
            id: objTxnId.id || "",
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

              if (Object.keys(this.paging).length > 0) {
                this.disabledNextPage(false);
              } else {
                this.disabledNextPage(true);
              }
              this.itemRetuned(this);
            } else {
              this.loadingSearch = false;
              this.showLoading = false;
            }
          });
        }, 10);
      });
    },
    async loadInvoiceTransaction(type) {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = true;
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
          this.txnInvoices = [];
          billingHandler.list(this.params).then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoading = false;
              const result = res.data.data;
              this.txnInvoices = result;
            } else {
              this.showLoading = false;
            }
          });
        }, 10);
      });
    },
    onSearch(type) {
      // let cid = "";
      // if (this.customer.hasOwnProperty("id")) {
      //   cid = this.customer.id || "";
      // }
      // if (cid === "") {
      //   this.$snotify.error(i18n.t("select_customer_name")); // by rothny
      //   return;
      // }

      // let tid = "";
      // if (this.txnId.hasOwnProperty("id")) {
      //   tid = this.txnId.id || "";
      // }
      // if (tid === "") {
      //   this.$snotify.error(i18n.t("select_invoice_no")); // by rothny
      //   return;
      // }

      const objTxn = this.txnId || {};
      const id = objTxn.id || "";
      if (id !== "") {
        this.action = type;
        this.txnByCustomers = [];
        this.loadPage(this);
        this.paging = {};
        this.searchTransaction(type);
      }
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
      $(".invoice-movement-pager").html(`
                <label class="label invoice-movement-item-returned">0</label>
                <div style="display: flex; flex-direction: 'row'">
                    <button class="invoice-movement-next-page" title="previous" style="width: 24px; font-size: 19px;"> < </button>
                    <ul class="invoice-movement-page-number" style="display: flex;list-style: none; padding-left: 0px;">
                        <li style="padding: 6px;"  data-page="1" class="invoice-movement-page-link text-bold-link" >1</li>
                    </ul>
                    <button class="invoice-movement-next-page" title="next" style="width: 24px; font-size: 19px;"> > </button>
                </div>
            `);
      $(document).on("click", ".invoice-movement-page-link", function () {
        const page = $(this).data("page");
        $(".invoice-movement-page-link").removeClass("text-bold-link");
        $(this).addClass("text-bold-link");
        that.backToPage(that, page - 1);
        window.console.log(page - 1);
      });
      // $(document).on('click', '.invoice-movement-next-page', function () {
      $(".invoice-movement-next-page").click(function () {
        const page_number = $(this)
          .parent()
          .children(".invoice-movement-page-number")
          .find("li")
          .last()
          .data("page");
        window.console.log("invoice-movement-page_number", page_number);
        const isPrevious = $(this).attr("title");
        if (isPrevious == "previous") {
          const currectpage = $(".text-bold-link").data("page");

          if (currectpage == 1) {
            return;
          }
          $(".invoice-movement-page-link").removeClass("text-bold-link");
          $(`.invoice-movement-page-link:eq(${currectpage - 1})`).addClass(
            "text-bold-link"
          );
          that.backToPage(that, currectpage - 2);
          window.console.log("this currectpage back", currectpage - 2);
        } else {
          $(".invoice-movement-page-link").removeClass("text-bold-link");
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
            .children(".invoice-movement-page-number")
            .append(
              `<li class="invoice-movement-page-link text-bold-link" style="padding: 6px;" data-page="${
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
      $(".invoice-movement-item-returned").text("Items returned (" + totalRow + ")");
    },
    disabledNextPage(value) {
      $(".invoice-movement-next-page").prop("disabled", value);
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
      $("#gridTransactionInvoiceList").data("kendoGrid").dataSource.data([]);
      $("#gridTransactionInvoiceList").data("kendoGrid").dataSource.data(data);
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
      const cusId = value.id || "";
      if (cusId !== "") {
        this.loadInvoiceTransaction("Invoice-number");
      }
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
    async vieDetial() {
      if (this.receivableBalanceRp.txnId) {
        this.customer = {
          id: this.receivableBalanceRp.cId,
          name: this.receivableBalanceRp.name,
        };
        if (this.isView == 1) {
          await this.loadInvoiceTransaction("Invoice-number");
          this.asOf = this.receivableBalanceRp.asOf;
          this.customer.id = this.receivableBalanceRp.cId;
          this.txnId.id = this.receivableBalanceRp.txnId;
          this.onSearch("Invoice-history");
          this.$emit("isViewEmit", 0);
        }
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
    receivableBalanceRp() {
      return dataStore.receivableBalanceRp;
    },
  },
  watch: {
    tIndex() {
      window.console.log(
        "this.receivableBalanceRp.txnId",
        this.receivableBalanceRp.txnId
      );
      this.vieDetial();
    },
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
