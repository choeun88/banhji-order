<template>
  <v-row>
    <v-col
      sm="12"
      cols="12"
      :class="
        appType !== 'Supply' && appType !== 'Marketing' && appType !== 'Service'
          ? 'grayBg px-6'
          : ''
      "
    >
      <v-card min-height="565" color="white" class="pa-3 no_border" elevation="0">
        <v-row>
          <v-col sm="10" class="py-0">
            <h2 class="mb-0 font_020">{{ $t("customer_payment_report") }}</h2>
            <p class="mb-0">{{ $t("customer_payment_report_desc") }}</p>
          </v-col>
          <v-col sm="2" class="py-0"> </v-col>
          <v-col sm="12" cols="12" class="pb-0">
            <div class="mt-0">
              <date-search
                :initStartDate="startDate"
                @emitStartDate="startDate = $event"
                :initEndDate="endDate"
                @emitEndDate="endDate = $event"
              />
            </div>
          </v-col>
          <v-col sm="4" cols="12" class="pt-0">
            <label class="label">{{ $t("customer_name") }}</label>
            <dropdownlist
              class="kendo_dropdown_custom mt-1"
              style="height: 40px; width: 100%"
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
          <v-col sm="4" cols="12" class="pt-0">
            <label class="label">{{ $t("filter") }}</label>
            <v-select
              class="mt-1"
              item-text="text"
              item-value="value"
              outlined
              v-model="switchModel"
              :items="[
                { value: 1, text: $t('all') },
                { value: 0, text: $t('overdue') },
              ]"
            />
          </v-col>
          <v-col sm="4" cols="12" class="pt-0 mt-6">
            <v-btn
              color="primary"
              class="text-capitalize white--text mt-1"
              :loading="loadingSearch"
              @click="onSearch('Cash Receipt')"
            >
              <i class="b-search" style="font-size: 18px; color: #fff !important" />
            </v-btn>
            <v-btn
              to="cash_receipt"
              color="primary"
              class="text-upper white--text mt-1 ml-3"
              >{{ $t("new_receipt") }}</v-btn
            >
          </v-col>
        </v-row>

        <!-- <v-col sm="4" cols="12" class="pt-0">
            <v-card
              outlined
              dense
              class="pa-3 rounded-4 no_border white--text"
              color="third"
              height="60px"
            >
              <h3 class="text-left flex-1 font_13 text-uppercase">
                {{ $t("invoices_to_be_collected") }}
              </h3>
              <h3 class="text-right flex-1 font_20">
                {{ collectedInvoice }}
              </h3>
            </v-card>
          </v-col>
          <v-col sm="4" cols="12" class="pt-0">
            <v-card
              outlined
              dense
              class="pa-3 rounded-4 no_border white--text"
              color="third"
              height="60px"
            >
              <h3 class="text-left flex-1 font_12 text-uppercase">
                {{ $t("total_collected_amount") }}
              </h3>
              <h3 class="text-right flex-1 font_20">
                {{ numberFormat(collectedAmount) }}
              </h3>
            </v-card>
          </v-col>
          <v-col sm="4" cols="12" class="pt-0">
            <v-card
              outlined
              dense
              class="pa-3 rounded-4 no_border white--text"
              color="third"
              height="60px"
            >
              <h3 class="text-left flex-1 font_12 text-uppercase">
                {{ $t("overdue_invoice_collected") }}
              </h3>
              <h3 class="text-right flex-1 font_20">
                {{ collectedInvoiceOverDue }}
              </h3>
            </v-card>
          </v-col> -->
        <v-row>
          <v-col sm="12" cols="12" class="py-0 custom_pagination receivable-collection">
            <gridFullScreen>
              <template>
                <LoadingMe
                  :isLoading="showLoading"
                  :fullPage="false"
                  :myLoading="true"
                  type="loading"
                  :alertMessage="loadingAlert"
                  :color="loadingColorAlert"
                  :alertText="loadingTextAlert"
                />
                <kendo-datasource
                  ref="gridCollectionDS"
                  :type="'JSON'"
                  :data="transactionCollections"
                  :group="group"
                  :server-paging="false"
                />
                <kendo-grid
                  id="gridCollection"
                  class="grid-function"
                  :data-source-ref="'gridCollectionDS'"
                  :editable="false"
                  :groupable="true"
                  :column-menu="true"
                  :resizable="true"
                  :noRecords="true"
                  :hidden="true"
                  :pageable="true"
                  :sortable="true"
                  :filterable="true"
                  :excel-export="excelExport"
                  :excel-file-name="'Cash collection report.xlsx'"
                  :excel-all-pages="true"
                  :toolbar="['excel']"
                  :scrollable-virtual="true"
                >
                  <!--                                <kendo-grid-column-->
                  <!--                                    :field="'no'"-->
                  <!--                                    :title="$t('no')"-->
                  <!--                                    :template="rowNumberTmpl"-->
                  <!--                                    :width="90"-->
                  <!--                                    :column-menu="false"-->
                  <!--                                    :headerAttributes="{ style: 'background-color: #EDF1F5;', class: 'text-center'	}"-->
                  <!--                                    :attributes="{style: 'text-align: center'}"/>-->
                  <kendo-grid-column
                    :field="'transactionDate'"
                    :title="$t('receipt_date')"
                    :width="150"
                    :group-footer-template="$t('total')"
                    :template="transactionDate"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'invDate'"
                    :title="$t('invoice_date')"
                    :width="150"
                    :hidden="true"
                    :template="invoiceDate"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'name'"
                    :attributes="{ class: 'tb_name_td' }"
                    :title="$t('name')"
                    :width="200"
                    :group-header-template="'#=value#'"
                    :filterable-multi="true"
                    :filterable-search="true"
                    :template="'<span>#=name#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'receiptReferenceNo'"
                    :title="$t('receipt_number')"
                    :width="190"
                    :template="receiptRefTemplate"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5, color: green !important',
                    }"
                  />
                  <kendo-grid-column
                    :field="'txnReferenceNo'"
                    :title="$t('invoice_number')"
                    :width="190"
                    :template="invoiceRefTemplate"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5, color: green !important',
                    }"
                  />

                  <kendo-grid-column
                    :field="'txnExchangeAmount'"
                    :title="$t('invoice_amount')"
                    :width="200"
                    :template="'<span>#= kendo.toString(txnExchangeAmount, decimalFormat)#</span>'"
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
                    :field="'exchangePaidAmount'"
                    :title="$t('receipt_amount')"
                    :width="200"
                    :template="'<span>#= kendo.toString(exchangePaidAmount, decimalFormat)#</span>'"
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
                    :field="'currency'"
                    :title="$t('currency')"
                    :width="130"
                    :hidden="true"
                    :template="currencyTemplate"
                    :attributes="{ style: 'text-align: left; ' }"
                    :headerAttributes="{
                      style: 'text-align: left; background-color: #EDF1F5',
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

                  <kendo-grid-column
                    :field="'exchangePenalty'"
                    :title="$t('penalty')"
                    :width="200"
                    :hidden="true"
                    :template="'<span>#= kendo.toString(exchangePenalty, decimalFormat)#</span>'"
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
                    :field="'exchangeDiscount'"
                    :title="$t('discount')"
                    :width="200"
                    :hidden="true"
                    :template="'<span>#= kendo.toString(exchangeDiscount *-1, decimalFormat)#</span>'"
                    :aggregates="['sum']"
                    :footerAttributes="{
                      style: 'text-align: right;font-weight: bold;',
                    }"
                    :group-footer-template="'#= kendo.toString(sum*-1, `n2`)#'"
                    :headerAttributes="{
                      style: 'text-align: right;padding-right:35px;',
                    }"
                    :attributes="{
                      style: 'text-align: right;',
                    }"
                  />
                  <kendo-grid-column
                    :field="'gainOrLoss'"
                    :title="$t('gain_or_loss')"
                    :width="200"
                    :hidden="true"
                    :template="'<span>#= kendo.toString(gainOrLoss *-1, decimalFormat)#</span>'"
                    :aggregates="['sum']"
                    :footerAttributes="{
                      style: 'text-align: right;font-weight: bold;',
                    }"
                    :group-footer-template="'#= kendo.toString(sum*-1, `n2`)#'"
                    :headerAttributes="{
                      style: 'text-align: right;padding-right:35px;',
                    }"
                    :attributes="{
                      style: 'text-align: right;',
                    }"
                  />
                  <kendo-grid-column
                    v-if="!plansNotAccess.includes(4)"
                    :field="'objTax.vatAmt'"
                    :title="$t('vat_amount')"
                    :width="200"
                    :hidden="true"
                    :template="'<span>#= kendo.toString(parseFloat(objTax.vatAmt) * rateTobase, decimalFormat)#</span>'"
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
                  <!-- <kendo-grid-column
                    :field="'objTax.sptax'"
                    :title="$t('invoice_spt')"
                    :width="200"
                    :attributes="{ style: 'text-align: right; ' }"
                    :template="'<span>#= kendo.toString(parseFloat(objTax.sptax) * rateTobase, decimalFormat)#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  /> -->
                  <kendo-grid-column
                    v-if="!plansNotAccess.includes(4)"
                    :field="'objTax.spAmt'"
                    :title="$t('spt_amount')"
                    :width="200"
                    :hidden="true"
                    :template="'<span>#= kendo.toString(parseFloat(objTax.spAmt) * rateTobase, decimalFormat)#</span>'"
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
                    v-if="!plansNotAccess.includes(4)"
                    :field="'objTax.plAmt'"
                    :title="$t('plt_amount')"
                    :width="200"
                    :hidden="true"
                    :template="'<span>#= kendo.toString(parseFloat(objTax.plAmt) * rateTobase, decimalFormat)#</span>'"
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
                  <!-- <kendo-grid-column
                    :field="'objTax.ottax'"
                    :title="$t('invoice_ott')"
                    :width="200"
                    :attributes="{ style: 'text-align: right; ' }"
                    :template="'<span>#= kendo.toString(parseFloat(objTax.ottax) * rateTobase, decimalFormat)#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  /> -->
                  <kendo-grid-column
                    v-if="!plansNotAccess.includes(4)"
                    :field="'objTax.otAmt'"
                    :title="$t('ott_amount')"
                    :width="200"
                    :hidden="true"
                    :template="'<span>#= kendo.toString(parseFloat(objTax.otAmt) * rateTobase, decimalFormat)#</span>'"
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
                  <!-- <kendo-grid-column
                    :field="'objTax.pltax'"
                    :title="$t('invoice_pltax')"
                    :width="200"
                    :attributes="{ style: 'text-align: right; ' }"
                    :template="'<span>#= kendo.toString(parseFloat(objTax.pltax) * rateTobase, decimalFormat)#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  /> -->
                  <kendo-grid-column
                    :field="'paymentOption.type'"
                    :title="$t('source')"
                    :width="200"
                    :hidden="true"
                    :filterable-multi="true"
                    :filterable-search="true"
                    :template="source"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5, color: green !important',
                    }"
                  />
                  <kendo-grid-column
                    :field="'bankReferenceNo'"
                    :title="$t('bank_reference_no')"
                    :width="200"
                    :hidden="true"
                    :template="'<span>#= bankReferenceNo#</span>'"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5, color: green !important',
                    }"
                  />
                  <kendo-grid-column
                    :field="'transactionNote'"
                    :title="$t('memo')"
                    :width="200"
                    :hidden="true"
                    :template="'<span>#= transactionNote #</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'segment'"
                    :title="$t('segment')"
                    :width="200"
                    :template="'<span>#= segment #</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    v-if="!plansNotAccess.includes(4)"
                    :field="'location'"
                    :title="$t('location')"
                    :width="200"
                    :template="'<span>#= location #</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                </kendo-grid>
              </template>
            </gridFullScreen>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { DropDownList } from "@progress/kendo-vue-dropdowns";
import LinkTemplate from "@/components/kendo_templates/LinkTemplate";
import kendo from "@progress/kendo-ui";
import ItemLineModel from "@/scripts/cash-receipt/model/ItemLine";
import { i18n } from "@/i18n";
import { dataStore } from "@/observable/store";
import { exportExelFormat } from "@/utils";

const billingHandler = require("@/scripts/invoice/handler/billingHandler");
const billingReportHandler = require("@/scripts/invoice/handler/billingReportHandler");
const balanceHandler = require("@/scripts/balance/handler/balanceHandler");
const itemLineModel = new ItemLineModel({});
const $ = kendo.jQuery;
import JSZip from "jszip";
const defaultItem = { ["name"]: "Select customer...", ["id"]: null };
const emptyItem = { ["name"]: "loading ..." };
const SECOND_DELAY = 1000;
window.JSZip = JSZip;
export default {
  data: () => ({
    loading: false,
    loadingSearch: false,
    startDate: "",
    endDate: "",
    group: { field: "name" },
    transactionCollections: [],
    dateFormat: itemLineModel.dateFormat,
    showLoading: false,
    loadingAlert: false,
    loadingColorAlert: "",
    loadingTextAlert: "",
    collectedAmount: 0,
    collectedInvoice: 0,
    collectedInvoiceOverDue: 0,
    decimalFormat: "n2",
    params: {},
    paging: {},
    txnCollections: [],
    disabledMe: true,
    action: "",
    aggregateDefinition: [
      { field: "txnExchangeAmount", aggregate: "sum" },
      { field: "exchangePaidAmount", aggregate: "sum" },
      { field: "exchangePenalty", aggregate: "sum" },
      { field: "exchangeDiscount", aggregate: "sum" },
      { field: "gainOrLoss", aggregate: "sum" },
      { field: "objTax.vatAmt", aggregate: "sum" },
      { field: "objTax.spAmt", aggregate: "sum" },
      { field: "objTax.plAmt", aggregate: "sum" },
      { field: "objTax.otAmt", aggregate: "sum" },
    ],
    switchModel: 1,
    customerList: [],
    customer: {},
    textField: "name",
    defaultItem: defaultItem,
    dataItemKey: "id",
    filter: "",
    cusBaseUrl: balanceHandler.customerVendors(),
    segment: {},
  }),
  components: {
    "date-search": () => import(`@/components/custom_templates/DateSearch`),
    LoadingMe: () => import(`@/components/Loading`),
    gridFullScreen: () => import("@/components/gridFullScreen"),
    dropdownlist: DropDownList,
  },
  methods: {
    excelExport: function (e) {
      let filterExcel = {
        dataFrom: kendo.toString(new Date(this.startDate), `${this.dateFormat}`),
        dateTo: kendo.toString(new Date(this.endDate), `${this.dateFormat}`),
        title: i18n.t("customer_payment_report"),
      };
      exportExelFormat(e, filterExcel);
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
    onSwicthChange() {
      window.console.log("swicth", this.switchModel);
    },
    numberFormat(value) {
      return kendo.toString(value, `${this.decimalFormat}`);
    },
    transactionDate(dataItem) {
      return kendo.toString(new Date(dataItem.transactionDate), `${this.dateFormat}`);
    },
    currencyTemplate(data) {
      return `<span> ${i18n.t(data.currency)}</span>`;
    },
    invoiceDate(dataItem) {
      return kendo.toString(new Date(dataItem.invDate), `${this.dateFormat}`);
    },
    goToConvert() {},
    source(dataItem) {
      if (dataItem.hasOwnProperty("paymentOption")) {
        if (dataItem.paymentOption.hasOwnProperty("type")) {
          return dataItem.paymentOption.type;
        }
      }
      return "";
    },
    rowNumberTmpl(dataItem) {
      let ds = this.$refs.gridCollectionDS.kendoWidget(),
        index = ds.indexOf(dataItem);
      return index + 1;
    },
    receiptRefTemplate(data) {
      let url = `cash_receipt/${data.id}`;
      let args = {
        text: data.receiptReferenceNo,
        url: url,
        data: data,
      };
      return {
        template: LinkTemplate,
        templateArgs: args,
      };
    },
    invoiceRefTemplate(data) {
      let url = `invoice_view/${data.txnId}`;
      const nrd = data.nrd;
      if (nrd) {
        url = `invoice_view/${data.txnId}-nrd`;
      }
      let args = {
        text: data.txnReferenceNo,
        url: url,
        data: data,
      };
      return {
        template: LinkTemplate,
        templateArgs: args,
      };
    },
    // async searchTransaction(type) {
    //   new Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve("resolved");
    //       this.showLoading = true;
    //       let startDate = this.startDate;
    //       let endDate = this.endDate;
    //       let strFilter = "";

    //       if (type !== "" && startDate !== "" && endDate !== "") {
    //         strFilter =
    //           "?start=" + startDate + "&end=" + endDate + "&type=" + type;
    //       } else {
    //         startDate = "";
    //         endDate = "";
    //         strFilter = "?start=" + "&end=" + "&type=" + type;
    //       }

    //       billingHandler.txn(strFilter).then((res) => {
    //         if (res.data.statusCode === 200) {
    //           this.transactionCollections = res.data.data;
    //           if (this.transactionCollections.length > 0) {
    //             const results = res.data.result;
    //             this.decimalFormat = res.data.data[0].decimalFormat || "n2";
    //             this.collectedAmount = results.cash || 0;
    //             const inv = results.invoice;
    //             this.collectedInvoice = inv.total || 0;
    //             this.collectedInvoiceOverDue = inv.overDue || 0;
    //           }
    //         }
    //         this.showLoading = false;
    //       });
    //     }, 100);
    //   });
    // },
    async searchTransaction(type) {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = true;
          this.loadingSearch = true;
          const startDate = this.startDate;
          const endDate = this.endDate;
          const switch_ = this.switchModel || 0;
          this.params = {
            search: "",
            type: type,
            start: startDate,
            end: endDate,
            key: this.paging,
            filter: switch_ ? 1 : 0,
            isSummarize: 0,
            cusId: this.customer.id || "",
            segmentId: this.segment.id,
          };
          this.disabledNextPage(true);
          billingHandler.txn(this.params).then((res) => {
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
                  if (forD.segmentId === this.segment.id) {
                    newData.push(forD);
                  }
                });
                responseData = newData;
              }
              this.transactionCollections = responseData;
              this.paging = res.data.key;
              window.console.log("key", res.data.key);
              this.txnCollections.push(responseData);

              if (Object.keys(this.paging).length > 0) {
                this.disabledNextPage(false);
              } else {
                this.disabledNextPage(true);
              }
              this.itemRetuned(this);
              window.console.log("txnCollections", this.txnCollections, res.data.key);
            } else {
              this.loadingSearch = false;
              this.showLoading = false;
            }
          });
        }, 10);
      });
    },
    async searchTransaction1() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = true;
          this.loadingSearch = true;
          const startDate = this.startDate;
          const endDate = this.endDate;
          this.params = {
            currency: "KHR",
            start: startDate,
            end: endDate,
            key: this.paging,
          };
          this.disabledNextPage(true);
          billingReportHandler.paymentWithTax(this.params).then((res) => {
            if (res.data.statusCode === 200) {
              this.loadingSearch = false;
              this.showLoading = false;
              window.console.log("im search", res);
              const responseData = res.data.data || [];
              this.transactionCollections = responseData;
              this.paging = res.data.key;
              window.console.log("key", res.data.key);
              this.txnCollections.push(responseData);

              if (Object.keys(this.paging).length > 0) {
                this.disabledNextPage(false);
              } else {
                this.disabledNextPage(true);
              }
              this.itemRetuned(this);
              window.console.log("txnCollections", this.txnCollections, res.data.key);
            } else {
              this.loadingSearch = false;
              this.showLoading = false;
            }
          });
        }, 10);
      });
    },
    status(dataItem) {
      if (dataItem) {
        if (dataItem.hasOwnProperty("status")) {
          const status = dataItem.status;
          let statusText = "";
          switch (status) {
            case 1:
              statusText = "OPEN";
              break;
            case 2:
              statusText = "Partially Paid";
              break;
            case 4:
              statusText = "VOID";
              break;
            case 3:
              statusText = "PAID";
              break;
          }
          return statusText;
        }
      }
      return "";
    },
    onSearch(type) {
      this.action = type;
      this.txnCollections = [];
      this.loadPage(this);
      this.paging = {};
      this.searchTransaction(type);
      // this.searchTransaction1();
      // this.transactionSummarize(type);
    },
    async loadPage(that) {
      $(".receivable-collection .k-pager-wrap").html(`
                <label class="label rec-collection-item-returned">0</label>
                <div style="display: flex; flex-direction: 'row'">
                    <button class="rec-collection-next-page" title="previous" style="width: 24px; font-size: 19px;"> < </button>
                    <ul class="rec-collection-page-number" style="display: flex;list-style: none; padding-left: 0px;">
                        <li style="padding: 6px;"  data-page="1" class="rec-collection-page-link text-bold-link" >1</li>
                    </ul>
                    <button class="rec-collection-next-page" title="next" style="width: 24px; font-size: 19px;"> > </button>
                </div>
            `);
      $(document).on("click", ".rec-collection-page-link", function () {
        const page = $(this).data("page");
        $(".rec-collection-page-link").removeClass("text-bold-link");
        $(this).addClass("text-bold-link");
        that.backToPage(that, page - 1);
        window.console.log(page - 1);
      });
      // $(document).on('click', '.rec-collection-next-page', function () {
      $(".rec-collection-next-page").click(function () {
        const page_number = $(this)
          .parent()
          .children(".rec-collection-page-number")
          .find("li")
          .last()
          .data("page");
        window.console.log("rec-collection-page_number", page_number);
        const isPrevious = $(this).attr("title");
        if (isPrevious == "previous") {
          const currectpage = $(".text-bold-link").data("page");

          if (currectpage == 1) {
            return;
          }
          $(".rec-collection-page-link").removeClass("text-bold-link");
          $(`.rec-collection-page-link:eq(${currectpage - 1})`).addClass(
            "text-bold-link"
          );
          that.backToPage(that, currectpage - 2);
          window.console.log("this currectpage back", currectpage - 2);
        } else {
          $(".rec-collection-page-link").removeClass("text-bold-link");
          window.console.log("params", that.params);
          that.searchTransaction(that.action);
          $(this)
            .parent()
            .children(".rec-collection-page-number")
            .append(
              `<li class="rec-collection-page-link text-bold-link" style="padding: 6px;" data-page="${
                page_number + 1
              }">${page_number + 1}</li>`
            );
        }
        window.console.log("this", page_number + 1);
      });
    },
    itemRetuned(that) {
      let totalRow = 0;
      that.txnCollections.forEach((k) => {
        totalRow += k.length;
      });
      $(".rec-collection-item-returned").text("Items returned (" + totalRow + ")");
    },
    disabledNextPage(value) {
      $(".rec-collection-next-page").prop("disabled", value);
    },
    backToPage(that, index) {
      try {
        window.console.log("Length of txnCollections", that.txnCollections.length);
        const byCustomer = that.txnCollections.at(index);
        that.transactionCollections = byCustomer;
        // that.refreshGridData(customer)
        window.console.log("that.txnCollections[index]", byCustomer);
      } catch (e) {
        window.console.log("ERROR on backToPage", index);
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
  },
  computed: {
    appType() {
      return dataStore.productType;
    },
    plansNotAccess() {
      return dataStore.plansNotAccess;
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
  },
};
</script>
<style scoped>
.k-chart {
  height: 180px;
}

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
.b-search:before {
  color: #fff !important;
}
</style>
