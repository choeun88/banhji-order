<template>
  <v-row>
    <v-col sm="12" cols="12" :class="isFund ? 'px-4 pt-0' : 'grayBg px-6'">
      <v-card color="white" class="pa-3 no_border" elevation="0">
        <v-row>
          <v-col sm="8" cols="12" class="py-0">
            <h2 class="mb-0 font_020">{{ $t("do_by_customers") }}</h2>
            <p class="mb-2">{{ $t("do_by_customers_desc") }}</p>
          </v-col>
        </v-row>

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
              class="mt-0"
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
          <v-col sm="1" cols="12" class="py-0 mt-6">
            <v-btn class="btn_search" color="primary" @click="onSearch('Delivery Order')">
              <i class="b-search" style="font-size: 18px; color: #fff !important" />
            </v-btn>
          </v-col>
          <label class="mt-8 pl-2">{{ $t("filter") }}:</label>
          <v-col sm="1" cols="12" class="py-0 d-flex">
            <v-checkbox
              @change="onfilterChanged"
              v-model="show"
              color="primary"
              class="mt-6"
            ></v-checkbox
          ></v-col>
        </v-row>
        <v-row v-show="show" class="mt-0">
          <v-col sm="3" cols="12" class="kendo_dropdown_custom py-0 pt-0">
            <label class="label mb-0">{{ $t("customer") }}</label>
            <dropdownlist
              :data-items="customerList"
              @change="onCustomerChange"
              :value="customer"
              :data-item-key="'id'"
              :text-field="'name'"
              :default-item="defaultItem1"
              :filterable="true"
              clearable
              :placeholder="$t('customer')"
              :loading="loading"
              class="mt-1"
              @filterchange="onCustomerFilterChange"
            >
            </dropdownlist>
          </v-col>
          <v-col sm="3" cols="12" class="kendo_dropdown_custom py-0 pt-0">
            <label class="label mb-0">{{ $t("segment") }}</label>
            <v-select
              class="mt-1"
              v-model="segment"
              @change="onSegmentChange"
              :loading="segments.length === 0"
              :items="segments"
              item-value="id"
              :item-text="(item) => `${item.code} - ${item.name}`"
              return-object
              :placeholder="$t('segment')"
              outlined=""
              clearable
            />
          </v-col>
          <v-col
            sm="3"
            cols="12"
            class="kendo_dropdown_custom py-0 pt-0"
            v-if="!plansNotAccess.includes(4)"
          >
            <label class="label mb-0">{{ $t("location") }}</label>
            <v-select
              class="mt-1"
              v-model="location"
              @change="onSegmentChange"
              :loading="locations.length === 0"
              :items="locations"
              :disabled="false"
              item-value="id"
              :item-text="(item) => `${item.code} - ${item.name}`"
              clearable
              return-object
              tage="Location"
              :placeholder="$t('location')"
              outlined=""
            />
          </v-col>
          <v-col sm="3" cols="12" class="kendo_dropdown_custom py-0 pt-0">
            <label class="label mb-0">{{ $t("status") }}</label>
            <v-select
              class="mt-1"
              v-model="status_"
              :items="objStatus"
              @change="onStatusChange"
              clearable
              :placeholder="$t('status')"
              outlined=""
            />
          </v-col>
        </v-row>
        <v-row v-show="show" class="mt-0">
          <v-col
            sm="3"
            cols="12"
            class="kendo_dropdown_custom py-0 pt-0"
            v-if="!plansNotAccess.includes(4)"
          >
            <label class="label mb-0">{{ $t("sale_rep") }}</label>
            <dropdownlist
              :data-items="employeeList"
              @change="onChange"
              :value="employee"
              :data-item-key="dataItemKey"
              :text-field="textField"
              :default-item="defaultItem"
              :filterable="true"
              clearable
              :placeholder="$t('employee')"
              :loading="loading"
              class="mt-1"
              @filterchange="onFilterChange"
            >
            </dropdownlist>
          </v-col>
        </v-row>
        <v-row class="px-3">
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
              >
                <h3 class="text-left flex-1 font_12 text-uppercase">
                  {{ $t("no_of_do") }}
                </h3>
                <h3 class="font_20 mt-0 flex-1 text-right white--text">
                  {{ numberFormat(noOfRecord) }}
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
              >
                <h3 class="text-left flex-1 font_12 text-uppercase">
                  {{ $t("total_amount") }}
                </h3>
                <h3 class="font_20 mt-0 flex-1 text-right white--text">
                  {{ numberFormat(totalInvoice) }}
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
              >
                <h3 class="text-left flex-1 font_12 text-uppercase">
                  {{ $t("outstanding_no") }}
                </h3>
                <h3 class="font_20 mt-0 flex-1 text-right white--text">
                  {{ numberFormat(outStandingNo) }}
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
              >
                <h3 class="text-left flex-1 font_12 text-uppercase">
                  {{ $t("outstanding_amount") }}
                </h3>
                <h3 class="font_20 mt-0 flex-1 text-right white--text">
                  {{ numberFormat(outStandingAmount) }}
                </h3>
              </v-card>
            </v-col>
          </v-row>
        </v-row>
        <v-row>
          <v-col sm="12" cols="12" class="py-0 pt-0">
            <!-- <v-btn @click="allPrint">Print</v-btn> -->
            <gridFullScreen>
              <template>
                <kendo-datasource
                  ref="doByCustomerDS"
                  :type="'JSON'"
                  :data="invoiceTxns"
                  :group="group"
                  :server-paging="false"
                />
                <kendo-grid
                  id="gridReportDOByCustomer"
                  class="grid-function"
                  :data-source-ref="'doByCustomerDS'"
                  :editable="false"
                  :groupable="true"
                  :sortable="true"
                  :column-menu="true"
                  :filterable="true"
                  :resizable="true"
                  @pagechange="pageChangeHandler"
                  :toolbar="['excel']"
                  :excel-export="excelExport"
                  :excel-file-name="'ReportDOByCustomer.xlsx'"
                  :excel-filterable="true"
                  :excel-all-pages="true"
                  :scrollable-virtual="true"
                  v-on:databound="dataBound"
                >
                  <kendo-grid-column
                    :field="''"
                    :title="$t('action')"
                    :width="170"
                    :attributes="{
                      class: 'k-state-disabled iStatus',
                    }"
                    :command="[{ text: $t('status'), click: goChangeStatus }]"
                    :headerAttributes="{
                      style: 'text-align: left; background-color: #EDF1F5',
                    }"
                  />
                  <kendo-grid-column
                    :field="'status'"
                    :title="$t('status')"
                    :width="130"
                    :sortable="true"
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
                    :field="$t('transactionNote')"
                    :title="$t('description')"
                    :width="200"
                    :sortable="false"
                    :hidden="true"
                    :template="'<span>#=transactionNote || ``#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <!-- <kendo-grid-column
                    :field="$t('qCustomer')"
                    :title="$t('customer')"
                    :width="180"
                    :sortable="true"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  /> -->
                  <kendo-grid-column
                    v-if="!plansNotAccess.includes(4)"
                    :field="$t('saleRep')"
                    :title="$t('sale_rep')"
                    :width="180"
                    :sortable="true"
                    :hidden="true"
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
                    :field="$t('soReferenceNo')"
                    :title="$t('so_number')"
                    :width="180"
                    :sortable="true"
                    :template="quoteReferenceTemplate"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="$t('invReferenceNo')"
                    :title="$t('invoice_number')"
                    :width="180"
                    :encoding="false"
                    :template="invoiceTemplate"
                    :sortable="true"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
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
                    v-if="!plansNotAccess.includes(4)"
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
                    :field="$t('soAmount')"
                    :title="$t('so_amount')"
                    :width="180"
                    :sortable="false"
                    :attributes="{ style: 'text-align: right; ' }"
                    :template="'<span>#=kendo.toString(soAmount, decimalFormat)#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <!-- <kendo-grid-column
                    :field="$t('recognizedAmount')"
                    :title="$t('invoice_amount')"
                    :width="180"
                    :sortable="false"
                    :template="'<span>#=kendo.toString(recognizedAmount, decimalFormat)#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  /> -->
                  <kendo-grid-column
                    :field="'segment.name'"
                    :title="$t('segment')"
                    :width="200"
                    :sortable="false"
                    :hidden="true"
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
                    :hidden="true"
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
                    :hidden="true"
                    :attributes="{ style: 'text-align: left; ' }"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                </kendo-grid>
              </template>
            </gridFullScreen>
          </v-col>
        </v-row>
        <div style="overflow: auto" class="do-by-customer-pager"></div>
      </v-card>
    </v-col>
    <v-dialog persistent v-model="dialogDOStatus" max-width="450px">
      <v-card>
        <div class="modal_header">
          <v-card-title>{{ $t("change_status") }}: {{ doRefNum }}</v-card-title>
          <v-icon class="btn_close" @click="dialogDOStatus = false">close</v-icon>
        </div>
        <v-card-text class="modal_text_content">
          <v-row>
            <v-col sm="12" cols="12" class="py-0">
              <v-simple-table>
                <template v-slot:default>
                  <tbody>
                    <tr>
                      <td class="text-left text-bold" width="100px">
                        {{ $t("from_status") }}
                      </td>
                      <td class="text-center">:</td>
                      <td class="text-left text-bold" width="300px">
                        {{ status__ }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left" width="100px">
                        {{ $t("to_status") }}
                      </td>
                      <td class="text-center">:</td>
                      <td class="text-right" width="300px">
                        <v-select
                          class="mt-1"
                          v-model="status___"
                          :items="changeStatus"
                          :rules="[(v) => !!v || 'Status is required']"
                          @change="onStatusChange"
                          :placeholder="$t('status')"
                          outlined=""
                        />
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left text-bold" width="100px"></td>
                      <td class="text-center"></td>
                      <td class="text-right text-bold" width="300px">
                        <v-btn color="primary" class="float-right" @click="saveClose">
                          {{ $t("save_close") }}
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider />
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
const balanceHandler = require("@/scripts/balance/handler/balanceHandler");
const transactionHandler = require("@/scripts/transactionHandler");
const employeeHandler = require("@/scripts/employeeHandler");
const settingsHandler = require("@/scripts/settingsHandler");
const locationHandler = require("@/scripts/locationHandler");
import InvoiceModel from "@/scripts/invoice/model/Invoice";
import kendo from "@progress/kendo-ui";
import LinkTemplate from "@/components/kendo_templates/LinkTemplate";
import { i18n } from "@/i18n";
import { dataStore } from "@/observable/store";
import { DropDownList } from "@progress/kendo-vue-dropdowns";
const billingHandler = require("@/scripts/invoice/handler/billingHandler");
const invoiceModel = new InvoiceModel({});

import JSZip from "jszip";
const $ = kendo.jQuery; //require("jquery")
import { exportExelFormat, invoicePrintRow } from "@/utils";
const SECOND_DELAY = 1000;
const defaultItem = { ["name"]: i18n.t("select_employee_name"), ["id"]: null };
const defaultItem1 = { ["name"]: i18n.t("select_customer"), ["id"]: null };
const emptyItem = { ["name"]: "loading ..." };
window.JSZip = JSZip;
export default {
  name: "DOByCustomer",
  props: ["isFund"],
  components: {
    LoadingMe: () => import(`@/components/Loading`),
    "app-datepicker": () => import(`@/components/custom_templates/DatePickerComponent`),
    gridFullScreen: () => import("@/components/gridFullScreen"),
    dropdownlist: DropDownList,
  },
  data: () => ({
    dialogDOStatus: false,
    loading: false,
    show: false,
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
    invoiceTxns: [],
    tranDS: [],
    saleFormContent: {},
    isLoaded: false,
    invoice: invoiceModel,
    noOfRecord: 0,
    totalSaleLead: 0,
    totalSaleQuote: 0,
    totalInvoice: 0,
    group: { field: "name" },
    sort: { field: "referenceNo", dir: "ASC" },
    aggregateDefinition: [
      { field: "exchangeAmount", aggregate: "sum" },
      { field: "exchangeSubTotal", aggregate: "sum" },
      { field: "exchangeDiscountTotal", aggregate: "sum" },
      { field: "exchangeOTCAmount", aggregate: "sum" },
    ],
    params: {
      isDonor: false,
      search: "",
      type: "cus",
      key: {},
    },
    paging: {},
    txnByEmployees: [],
    disabledMe: true,
    action: "",
    employeeList: [],
    customerList: [],
    employee: {},
    customer: {},
    textField: "name",
    defaultItem: defaultItem,
    defaultItem1: defaultItem1,
    dataItemKey: "id",
    filter: "",
    empBaseUrl: employeeHandler.search(),
    cusBaseUrl: balanceHandler.customerVendors(),
    // se
    segment: {},
    segments: [],
    locations: [],
    location: {},
    objStatus: ["Open", "Invoiced", "Cancelled"],
    changeStatus: ["Cancelled"],
    status_: "",
    status__: "",
    status___: "",
    doRefNum: "",
    doId: "",
    schemaModelFields: {
      date: { type: "date" },
      exchangeAmount: { type: "number" },
    },
    leadRow: {},
    outStandingNo: 0,
    outStandingAmount: 0,
  }),
  methods: {
    async saveClose() {
      try {
        if (this.status___ !== "" && this.doId !== "") {
          new Promise((resolve) => {
            setTimeout(() => {
              resolve("resolved");
              this.showLoading = true;
              let status = 1;
              if (this.status___ === "Open") {
                status = 1;
              } else if (this.status___ === "Cancelled") {
                status = 4;
              }
              window.console.log("this.status___", this.status___);
              const data = {
                id: this.doId,
                type: "Delivery Order",
                status: status,
              };
              transactionHandler
                .update(data)
                .then((response) => {
                  this.showLoading = false;
                  if (response.data.statusCode === 201) {
                    this.$snotify.success("Successfully");
                    this.showLoading = false;
                    this.dialogDOStatus = false;
                  }
                })
                .catch((e) => {
                  this.showLoading = false;
                  this.dialogDOStatus = false;
                  this.$snotify.error("Something went wrong", e);
                });
            }, 10);
          });
        } else {
          this.$snotify.error("Missing Delivery Order id and status");
        }
      } catch (error) {
        window.console.log("Error on save close", error);
      }
    },
    dataBound: function (e) {
      const grid = kendo.jQuery("#gridReportDOByCustomer").data("kendoGrid");
      const items = e.sender.items();
      items.each(function () {
        let dataItem = grid.dataItem(this);
        $("tr[data-uid='" + dataItem.uid + "']")
          .find(".iStatus")
          .each(function () {
            if (
              dataItem.status !== 2 &&
              dataItem.status !== 3 &&
              dataItem.status !== 4 &&
              dataItem.status !== 5
            ) {
              $(this).removeClass("k-state-disabled");
            }
          });
      });
    },
    async onfilterChanged() {
      this.employee = {};
      this.customer = {};
      this.segment = {};
      this.location = {};
      this.status_ = {};
      if (this.show === false);
    },
    async loadLocation() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.locations = [];
          locationHandler.list().then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoading = false;
              this.locations = res.data.data;
              // window.console.log('this.locations', this.locations)
              if (this.locations.length > 0) {
                this.invoice.location = this.locations[0];
              }
            }
          });
        }, 10);
      });
    },
    async loadSegment() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.segments = [];
          settingsHandler.getSeg().then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoading = false;
              this.segments = res.data.data;
              if (this.segments.length > 0) {
                if (
                  this.appType !== "Supply" &&
                  this.appType !== "Marketing" &&
                  this.appType !== "Service"
                ) {
                  this.invoice.segment = this.segments[0];
                }
              }
            }
          });
        }, 10);
      });
    },
    onCustomerFilterChange(event) {
      const filter = event.filter.value;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.requestDataCustomer(0, filter, this.cusBaseUrl);
        // this.filter = filter;
        this.loading = false;
      }, SECOND_DELAY);
      this.loading = true;
    },
    requestDataCustomer(skip, filter, baseUrl) {
      const url = baseUrl + `?pattern=cus-bal&filter=${filter}`;
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then(this.afterFetchCustomer);
    },
    afterFetchCustomer(json) {
      this.customerList = json.data;
    },

    onFilterChange(event) {
      const filter = event.filter.value;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.requestData(0, filter, this.empBaseUrl);
        // this.filter = filter;
        this.loading = false;
      }, SECOND_DELAY);
      this.loading = true;
    },
    requestData(skip, filter, baseUrl) {
      const url = baseUrl + `?filter=${filter}`;
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then(this.afterFetch);
    },
    afterFetch(json) {
      this.employeeList = json.data;
    },
    onSegmentChange() {
      this.employee = {};
      this.customer = {};
      this.status_ = "";
    },
    onStatusChange() {
      this.employee = {};
      this.customer = {};
      this.segment = {};
      this.location = {};
    },
    onChange(event) {
      const value = event.value;
      if (value && value["name"] === emptyItem["name"]) {
        return;
      }
      this.employee = value;
      this.segment = {};
      this.location = {};
      this.customer = {};
      this.status_ = 0;
    },
    onCustomerChange(event) {
      const value = event.value;
      if (value && value["name"] === emptyItem["name"]) {
        return;
      }
      this.customer = value;
      this.employee = {};
      this.segment = {};
      this.location = {};
      this.status_ = 0;
    },
    pdfExport: function (e) {
      // const pivot = this.$refs.doByCustomerDS.kendoWidget()
      // pivot.saveAsPDF()
      window.console.log("pdfExport");
      window.console.log(e.data);
    },
    excelExport: function (e) {
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
      invoicePrintRow(this.invoiceTxns);
    },
    goPrint(e) {
      e.preventDefault();
      const grid = kendo.jQuery("#gridReportDOByCustomer").data("kendoGrid");
      const dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
      invoicePrintRow(dataItem);
    },
    // goToInvoice(e) {
    //   e.preventDefault();
    //   const grid = kendo.jQuery("#gridReportDOByCustomer").data("kendoGrid");
    //   const dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
    //   this.doRefNum = dataItem.referenceNo || "";
    //   this.doId = dataItem.id || "";
    //   const status = dataItem.status || 1
    //   if(status === 6 || status === 1) {
    //     this.$router.push({
    //     path: "invoice",
    //     name: "Invoice",
    //     params: { id: this.doId, type: "saleorder" },
    //     query: { type: "saleorder" },
    //   });
    //   }
    // },
    goChangeStatus(e) {
      window.console.log("router", this.$router);
      e.preventDefault();
      const grid = kendo.jQuery("#gridReportDOByCustomer").data("kendoGrid");
      const dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
      this.leadRow = dataItem;
      this.doRefNum = dataItem.referenceNo || "";
      this.doId = dataItem.id || "";
      if (dataItem.status === 1) {
        this.status__ = i18n.t("open");
      } else if (dataItem.status === 4) {
        this.status__ = i18n.t("cancelled");
      } else if (dataItem.status === 5) {
        this.status__ = i18n.t("invoiced");
      }
      if (dataItem.status === 1) {
        this.changeStatus = [];
        if (dataItem.status === 1) {
          this.changeStatus = ["Open", "Cancelled"];
          this.status___ = i18n.t("cancelled");
        }
        this.dialogDOStatus = true;
      }
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
      } else if (data.type === "Delivery Order") {
        url = `delivery_order_view/${data.id}`;
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
    invoiceTemplate(data) {
      let url = `invoice_view/${data.invTxnId}`;
      const refFrom = data.refFrom || [];
      const refTo = data.refTo || [];
      let args = {
        text: data.invReferenceNo,
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
    quoteReferenceTemplate(data) {
      const url = `sale_order_view/${data.soTxnId}`;

      const refFrom = data.refFrom || [];
      const refTo = data.refTo || [];
      const args = {
        text: data.soReferenceNo,
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
    invReferenceTemplate(data) {
      const url = `invoice_view/${data.invTxnId}`;

      const refFrom = data.refFrom || [];
      const refTo = data.refTo || [];
      const args = {
        text: data.invReferenceNo,
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
    soReferenceTemplate(data) {
      const url = `sale_order_view/${data.soTxnId}`;

      const refFrom = data.refFrom || [];
      const refTo = data.refTo || [];
      const args = {
        text: data.soReferenceNo,
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
      let ds = this.$refs.doByCustomerDS.kendoWidget(),
        index = ds.indexOf(dataItem);
      return index + 1;
    },
    // async loadTransactions() {
    //   new Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve("resolved");
    //       this.showLoading = true;
    //       billingHandler.list().then((res) => {
    //         if (res.data.statusCode === 200) {
    //           window.console.log(res);
    //           this.invoiceTxns = res.data.data;
    //           const result = res.data.result;
    //           this.noOfRecord = kendo.toString(result.Revenue, result.decimalFormat);
    //           this.totalSaleLead = kendo.toString(result.SaleLead, result.decimalFormat);
    //           this.totalInvoice = kendo.toString(
    //             result.SaleOrder,
    //             result.decimalFormat
    //           );
    //           this.totalSaleQuote = kendo.toString(
    //             result.totalSaleQuote,
    //             result.decimalFormat
    //           );
    //         }
    //         this.showLoading = false;
    //       });
    //     }, 10);
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
          const segment = this.segment || {};
          const location = this.location || {};
          const segmentId = segment.id || "";
          const locationId = location.id || "";
          let iStatus = 0;
          if (this.status_ === "Open") {
            iStatus = 1;
          } else if (this.status_ === "Invoiced") {
            iStatus = 5;
          } else if (this.status_ === "Cancelled") {
            iStatus = 4;
          }
          this.params = {
            search: "",
            type: type,
            start: startDate,
            end: endDate,
            key: this.paging,
            isSummarize: 0,
            empId: this.employee.id || "",
            id: this.customer.id || "",
            segId: segmentId,
            locId: locationId,
            status: iStatus,
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
              this.invoiceTxns = responseData;
              this.paging = res.data.key;
              window.console.log("key", res.data.key);
              this.txnByEmployees.push(responseData);
              //   const result = res.data.result;
              //   this.noOfRecord = kendo.toString(
              //     result.Revenue,
              //     result.decimalFormat
              //   );
              //   this.totalSaleLead = kendo.toString(
              //     result.SaleLead,
              //     result.decimalFormat
              //   );
              //   this.totalInvoice = kendo.toString(
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
              // window.console.log("txnByEmployees", this.txnByEmployees, res.data.key);
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
          const segment = this.segment || {};
          const location = this.location || {};
          const segmentId = segment.id || "";
          const locationId = location.id || "";
          let iStatus = 0;
          if (this.status_ === "Open") {
            iStatus = 1;
          } else if (this.status_ === "Invoiced") {
            iStatus = 5;
          } else if (this.status_ === "Cancelled") {
            iStatus = 4;
          }
          this.params = {
            search: "",
            type: type,
            start: startDate,
            end: endDate,
            key: {},
            isSummarize: 1,
            empId: this.employee.id || "",
            id: this.customer.id || "",
            segId: segmentId,
            locId: locationId,
            status: iStatus,
          };
          billingHandler.list(this.params).then((res) => {
            if (res.data.statusCode === 200) {
              this.loadingSearch = false;
              this.showLoading = false;
              const result = res.data.data[0] || {};
              this.noOfRecord = kendo.toString(result.noOfRecord, result.decimalFormat);
              this.outStandingNo = kendo.toString(
                result.outStandingNo,
                result.decimalFormat
              );
              this.outStandingAmount = kendo.toString(
                result.outStandingAmount,
                result.decimalFormat
              );
              this.totalInvoice = kendo.toString(result.Revenue, result.decimalFormat);
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
      this.txnByEmployees = [];
      //   $(".k-pager-wrap").empty();
      //   $(".do-by-cus-page-number").empty();
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
      let status = "";
      switch (dataItem.status) {
        case 1:
          status = i18n.t("open");
          break;
        case 4:
          status = i18n.t("cancelled");
          break;
        case 5:
          status = i18n.t("invoiced");
          break;
      }
      return status;
    },
    async loadPage(that) {
      $(".do-by-customer-pager").html(`
                <label class="label do-by-cus-item-returned">0</label>
                <div style="display: flex; flex-direction: 'row'">
                    <button class="do-by-cus-next-page" title="previous" style="width: 24px; font-size: 19px;"> < </button>
                    <ul class="do-by-cus-page-number" style="display: flex;list-style: none; padding-left: 0px;">
                        <li style="padding: 6px;"  data-page="1" class="do-by-cus-page-link text-bold-link" >1</li>
                    </ul>
                    <button class="do-by-cus-next-page" title="next" style="width: 24px; font-size: 19px;"> > </button>
                </div>
            `);
      $(document).on("click", ".do-by-cus-page-link", function () {
        const page = $(this).data("page");
        $(".do-by-cus-page-link").removeClass("text-bold-link");
        $(this).addClass("text-bold-link");
        that.backToPage(that, page - 1);
        window.console.log(page - 1);
      });
      // $(document).on('click', '.do-by-cus-next-page', function () {
      $(".do-by-cus-next-page").click(function () {
        const page_number = $(this)
          .parent()
          .children(".do-by-cus-page-number")
          .find("li")
          .last()
          .data("page");
        window.console.log("do-by-cus-page_number", page_number);
        const isPrevious = $(this).attr("title");
        if (isPrevious == "previous") {
          const currectpage = $(".text-bold-link").data("page");

          if (currectpage == 1) {
            return;
          }
          $(".do-by-cus-page-link").removeClass("text-bold-link");
          $(`.do-by-cus-page-link:eq(${currectpage - 1})`).addClass("text-bold-link");
          that.backToPage(that, currectpage - 2);
          window.console.log("this currectpage back", currectpage - 2);
        } else {
          $(".do-by-cus-page-link").removeClass("text-bold-link");
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
            .children(".do-by-cus-page-number")
            .append(
              `<li class="do-by-cus-page-link text-bold-link" style="padding: 6px;" data-page="${
                page_number + 1
              }">${page_number + 1}</li>`
            );
        }
        window.console.log("this", page_number + 1);
      });
    },
    itemRetuned(that) {
      let totalRow = 0;
      that.txnByEmployees.forEach((k) => {
        totalRow += k.length;
      });
      $(".do-by-cus-item-returned").text("Items returned (" + totalRow + ")");
    },
    disabledNextPage(value) {
      $(".do-by-cus-next-page").prop("disabled", value);
    },
    backToPage(that, index) {
      try {
        window.console.log("Length of txnByEmployees", that.txnByEmployees.length);
        const byCustomer = that.txnByEmployees.at(index);
        that.invoiceTxns = byCustomer;
        // that.refreshGridData(customer)
        window.console.log("that.txnByEmployees[index]", byCustomer);
      } catch (e) {
        window.console.log("ERROR on backToPage", index);
      }
    },
    refreshGridData(data) {
      $("#gridReportDOByCustomer").data("kendoGrid").dataSource.data([]);
      $("#gridReportDOByCustomer").data("kendoGrid").dataSource.data(data);
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
    // $(document).on("click", ".k-pager-nav", function () {
    //   window.console.log("this", $(this).data("page"));
    // });
    this.requestData(0, this.filter, this.empBaseUrl);
    this.requestDataCustomer(0, this.filter, this.cusBaseUrl);
    this.loadSegment();
    this.loadLocation();
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
