<template>
  <v-row>
    <v-col sm="12" cols="12" :class="isFund ? 'px-4 pt-0' : 'grayBg px-6'">
      <v-card color="white" class="pa-3 no_border" elevation="0">
        <div v-if="isFund">
          <h2 class="mb-0 font_020">{{ $t("fund_contract") }}</h2>
          <p class="mb-1">{{ $t("fund_contract") }}</p>
          <v-btn
            class="float-right text-upper"
            color="primary white--text"
            to="sale_order?funding=true"
          >
            {{ $t("new") }}
          </v-btn>
        </div>
        <div v-else>
          <v-row>
            <v-col sm="8" cols="12" class="py-0">
              <h2 class="mb-0 font_020">{{ $t("sale_by_customers") }}</h2>
              <p class="mb-1">{{ $t("sale_by_customers_desc") }}</p>
            </v-col>
            <v-col sm="4" cols="12" class="py-0">
              <v-btn
                color="primary"
                class="float-right white--text text-upper ml-2"
                to="invoice"
                >{{ $t("new_invoice") }}
              </v-btn>
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
          <v-col sm="3" cols="12" class="py-0">
            <label class="label">{{ $t("dates") }}</label>
            <v-select
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
          <v-col sm="3" cols="12" class="kendo_dropdown_custom py-1">
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
          <v-col sm="12" cols="12" class="py-1 tb_name_td">
            <div
              v-if="
                appType !== 'Supply' && appType !== 'Marketing' && appType !== 'Service'
              "
            >
              <p v-if="!isFund">{{ $t("filter_by") }}</p>
              <v-btn
                v-else
                color="primary white--text"
                :loading="loadingSearch"
                @click="onSearch('Sale Order')"
              >
                <i class="b-search" style="font-size: 18px; color: #fff !important" />
              </v-btn>
            </div>
            <div v-else>
              <v-btn
                color="primary float-right white--text"
                :loading="loadingSearch"
                @click="onSearch('Invoice')"
              >
                <i class="b-search" style="font-size: 18px; color: #fff !important" />
              </v-btn>
            </div>
          </v-col>
        </v-row>
        <v-row
          v-if="
            !isFund &&
            appType !== 'Supply' &&
            appType !== 'Marketing' &&
            appType !== 'Service'
          "
          class="mt-0"
        >
          <v-col sm="3" cols="12" class="pt-0">
            <v-card
              outlined
              dense
              class="pa-3 no_border rounded-4 white--text"
              color="third"
              height="60px"
              @click="onSearch('Invoice')"
            >
              <h3 class="text-left flex-1 font_12 text-uppercase">
                {{ $t("total_revenue") }}
              </h3>
              <h3 class="font_20 mt-0 flex-1 text-right white--text">
                {{ numberFormat(totalRevenue) }}
              </h3>
            </v-card>
          </v-col>
          <v-col sm="3" cols="12" class="pt-0" v-if="!plansNotAccess.includes(4)">
            <v-card
              outlined
              dense
              color="third"
              class="pa-3 rounded-4 no_border white--text"
              height="60px"
              @click="onSearch('Sale Lead')"
            >
              <h3 class="text-left flex-1 font_12 text-uppercase">
                {{ $t("open_lead") }}
              </h3>
              <h3 class="font_20 mt-0 flex-1 text-right white--text">
                {{ numberFormat(totalSaleLead) }}
              </h3>
            </v-card>
          </v-col>
          <v-col sm="3" cols="12" class="pt-0">
            <v-card
              outlined
              dense
              color="third"
              class="pa-3 rounded-4 no_border white--text"
              height="60px"
              @click="onSearch('Sale Quote')"
            >
              <h3 class="text-left flex-1 font_12 text-uppercase">
                {{ $t(saleQuote) }}
              </h3>
              <h3 class="font_20 mt-0 flex-1 text-right white--text">
                {{ numberFormat(totalSaleQuote) }}
              </h3>
            </v-card>
          </v-col>
          <v-col sm="3" cols="12" class="pt-0">
            <v-card
              outlined
              dense
              class="pa-3 rounded-4 no_border white--text"
              color="third"
              height="60px"
              @click="onSearch('Sale Order')"
            >
              <h3 class="text-left flex-1 font_12 text-uppercase">
                {{ $t(saleOrder) }}
              </h3>
              <h3 class="font_20 mt-0 flex-1 text-right white--text">
                {{ numberFormat(totalSaleOrder) }}
              </h3>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col sm="12" cols="12" class="py-0">
            <!-- <v-btn @click="allPrint">Print</v-btn> -->
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
                  ref="gridTransactionDS"
                  :type="'JSON'"
                  :data="transactions"
                  :group="group"
                  :server-paging="false"
                />

                <kendo-grid
                  id="gridTransaction"
                  class="grid-function"
                  :data-source-ref="'gridTransactionDS'"
                  :editable="false"
                  :groupable="true"
                  :sortable="true"
                  :column-menu="true"
                  :filterable="true"
                  :resizable="true"
                  @pagechange="pageChangeHandler"
                  :excel-export="excelExport"
                  :excel-file-name="'SaleAnalysisByCustomer.xlsx'"
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
                    :width="180"
                    :sortable="true"
                    format="dd-MM-yy"
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
                    :group-header-template="'#=value#'"
                    :filterable-search="true"
                    :template="'<span>#=name#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="$t('journalNote')"
                    :title="$t('description')"
                    :width="200"
                    :sortable="false"
                    :template="'<span>#=journalNote || ``#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="$t('transactionType')"
                    :title="$t('type')"
                    :width="180"
                    :sortable="false"
                    :template="transactionTypeTemplate"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'referenceNo'"
                    :title="$t('num')"
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
                    :hidden="true"
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
                    :hidden="true"
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
                    :field="'exchangeOTCAmount'"
                    :title="$t('other_charge')"
                    :width="200"
                    :hidden="true"
                    :group-footer-template="'#= kendo.toString(sum, `n2`)#'"
                    :aggregates="['sum']"
                    :footerAttributes="{ style: 'text-align: right;' }"
                    :attributes="{ style: 'text-align: right; ' }"
                    :template="'<span>#=kendo.toString(exchangeOTCAmount, decimalFormat)#</span>'"
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
                    v-if="!plansNotAccess.includes(4)"
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
                    v-if="!plansNotAccess.includes(4)"
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
                    :attributes="{
                      class: 'tb_name_td',
                    }"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5',
                    }"
                  />
                  <kendo-grid-column
                    :field="''"
                    :title="$t('action')"
                    :width="100"
                    :attributes="{
                      class: action !== 'Invoice' ? 'd-none' : '',
                    }"
                    :command="[{ text: $t('print'), click: goPrint }]"
                    :headerAttributes="{
                      style: 'text-align: left; background-color: #EDF1F5',
                    }"
                  />
                </kendo-grid>
              </template>
            </gridFullScreen>
          </v-col>
        </v-row>
        <div style="overflow: auto" class="bycus-pager"></div>
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
const defaultItem = { ["name"]: i18n.t("select_customer_name"), ["id"]: null };
const emptyItem = { ["name"]: "loading ..." };
import { exportExelFormat, invoicePrintRow } from "@/utils";

window.JSZip = JSZip;
export default {
  name: "SaleTransaction",
  props: ["isFund"],
  components: {
    LoadingMe: () => import(`@/components/Loading`),
    "app-datepicker": () => import(`@/components/custom_templates/DatePickerComponent`),
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
    totalSaleOrder: 0,
    group: { field: "name" },
    sort: { field: "referenceNo", dir: "ASC" },
    aggregateDefinition: [
      { field: "exchangeAmount", aggregate: "sum" },
      { field: "exchangeSubTotal", aggregate: "sum" },
      { field: "exchangeDiscountTotal", aggregate: "sum" },
      { field: "exchangeOTCAmount", aggregate: "sum" },
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
    schemaModelFields: {
      date: { type: "date" },
      exchangeAmount: { type: "number" },
    },
    pageIndex: 0,
    laodExcel: false,
    stopped: false,
  }),
  methods: {
    pdfExport: function (e) {
      // const pivot = this.$refs.gridTransactionDS.kendoWidget()
      // pivot.saveAsPDF()
      window.console.log("pdfExport");
      window.console.log(e.data);
    },
    async excelExportBtn() {
      let dataExportExcel = [];
      this.params = {
        search: "",
        type: this.type,
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
              const grid = kendo.jQuery("#gridTransaction").data("kendoGrid");
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
      // const tmpTran =  this.transactions
      let filterExcel = {
        dataFrom: this.startDate,
        dateTo: this.endDate,
        title: i18n.t("sale_by_customers"),
        type: i18n.t(this.action),
      };
      exportExelFormat(e, filterExcel);
    },
    pageChangeHandler: function (event) {
      alert("change", event);
    },
    printInv() {
      invoicePrintRow();
    },
    allPrint() {
      let newData = [];
      this.txnByCustomers.forEach((lp) => {
        newData = newData.concat(lp);
      });
      window.console.log("new data", newData);
      invoicePrintRow(newData);
    },
    goPrint(e) {
      e.preventDefault();
      const grid = kendo.jQuery("#gridTransaction").data("kendoGrid");
      const dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
      invoicePrintRow(dataItem);
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
        url = `sale_order_view/${data.id}?${this.isFund ? "funding=true" : ""}`;
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
      let ds = this.$refs.gridTransactionDS.kendoWidget(),
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
              this.transactions = res.data.data;
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
      this.transactionSummarize(type);
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
          if (type === "Sale Lead") {
            status = i18n.t("qualified");
          } else if (type === "Sale Quote") {
            status = i18n.t("contracted");
          } else if (type === "Sale Order") {
            status = i18n.t("invoiced");
          } else {
            status = i18n.t("partially_paid");
          }
          break;
        case 3:
          if (type === "Sale Lead") {
            status = i18n.t("unqualified");
          } else if (type === "Sale Quote") {
            status = i18n.t("abandon");
          } else if (type === "Sale Order") {
            status = i18n.t("paid_status");
          } else {
            status = i18n.t("paid_status");
          }
          break;
        case 4:
          if (type === "Sale Lead") {
            status = i18n.t("nature");
          } else if (type === "Sale Quote") {
            status = i18n.t("decline");
          } else if (type === "Sale Order") {
            status = i18n.t("void");
          } else {
            status = i18n.t("void");
          }
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
      $(".bycus-pager").html(`
                <label class="label bycus-item-returned">0</label>
                <div style="display: flex; flex-direction: 'row'">
                    <button class="bycus-next-page" title="previous" style="width: 24px; font-size: 19px;"> < </button>
                    <ul class="bycus-page-number" style="display: flex;list-style: none; padding-left: 0px;">
                        <li style="padding: 6px;"  data-page="1" class="bycus-page-link text-bold-link" >1</li>
                    </ul>
                    <button class="bycus-next-page" title="next" style="width: 24px; font-size: 19px;"> > </button>
                </div>
            `);
      $(document).on("click", ".bycus-page-link", function () {
        const page = $(this).data("page");
        $(".bycus-page-link").removeClass("text-bold-link");
        $(this).addClass("text-bold-link");
        that.backToPage(that, page - 1);
        that.pageIndex = page - 1;
        window.console.log(page - 1);
      });
      // $(document).on('click', '.bycus-next-page', function () {
      $(".bycus-next-page").click(function () {
        const page_number = $(this)
          .parent()
          .children(".bycus-page-number")
          .find("li")
          .last()
          .data("page");
        window.console.log("bycus-page_number", page_number);
        that.pageIndex = page_number;
        const isPrevious = $(this).attr("title");
        if (isPrevious == "previous") {
          const currectpage = $(".text-bold-link").data("page");

          if (currectpage == 1) {
            return;
          }
          $(".bycus-page-link").removeClass("text-bold-link");
          $(`.bycus-page-link:eq(${currectpage - 1})`).addClass("text-bold-link");
          that.backToPage(that, currectpage - 2);
          window.console.log("this currectpage back", currectpage - 2);
        } else {
          $(".bycus-page-link").removeClass("text-bold-link");
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
            .children(".bycus-page-number")
            .append(
              `<li class="bycus-page-link text-bold-link" style="padding: 6px;" data-page="${
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
      $(".bycus-item-returned").text("Items returned (" + totalRow + ")");
    },
    disabledNextPage(value) {
      $(".bycus-next-page").prop("disabled", value);
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
      $("#gridTransaction").data("kendoGrid").dataSource.data([]);
      $("#gridTransaction").data("kendoGrid").dataSource.data(data);
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
    saleOrder() {
      return dataStore.saleFormContent.saleOrder;
    },
    saleQuote() {
      return dataStore.saleFormContent.saleQuote;
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
