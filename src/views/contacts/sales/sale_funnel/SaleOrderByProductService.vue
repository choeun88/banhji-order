<template>
  <v-row>
    <v-col sm="12" cols="12" :class="isFund ? 'px-4 pt-0' : 'grayBg px-6'">
      <v-card color="white" class="pa-3 no_border" elevation="0">
        <v-row>
          <v-col sm="8" cols="12" class="py-0">
            <h2 class="mb-0 font_020">{{ $t("sale_order_by_product_service") }}</h2>
            <p class="mb-2">{{ $t("sale_by_product_service_desc") }}</p>
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
            <v-btn
              class="btn_search"
              color="primary"
              @click="onSearch('Sale Order funnel')"
            >
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
            <label class="label mb-0">{{ $t("employee") }}</label>
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
          <v-col sm="3" cols="12" class="kendo_dropdown_custom py-0 pt-0">
            <label class="label mb-0">{{ $t("item") }}</label>
            <dropdownlist
              class="mt-1"
              :data-items="itemList"
              @change="onChange_"
              :value="item"
              :data-item-key="dataItemKey_"
              :text-field="textField_"
              :default-item="defaultItem_"
              :filterable="true"
              :loading="loading"
              @filterchange="onFilterChange_"
            >
            </dropdownlist>
          </v-col>
        </v-row>
        <!-- <v-row>
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
                  {{ $t("no_of_quote") }}
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
                  {{ numberFormat(totalSaleQuote) }}
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
        </v-row> -->
        <v-row>
          <v-col sm="12" cols="12" class="py-0 pt-0">
            <!-- <v-btn @click="allPrint">Print</v-btn> -->
            <gridFullScreen>
              <template>
                <kendo-datasource
                  ref="gridReportSaleOrderByProductServiceDS"
                  :type="'JSON'"
                  :data="transactions"
                  :group="group"
                  :server-paging="false"
                />
                <kendo-grid
                  id="gridReportSaleOrderByProductService"
                  class="grid-function"
                  :data-source-ref="'gridReportSaleOrderByProductServiceDS'"
                  :editable="false"
                  :groupable="true"
                  :sortable="true"
                  :column-menu="true"
                  :filterable="true"
                  :resizable="true"
                  @pagechange="pageChangeHandler"
                  :toolbar="['excel']"
                  :excel-export="excelExport"
                  :excel-file-name="'ReportSaleOrderByProductService.xlsx'"
                  :excel-filterable="true"
                  :excel-all-pages="true"
                  :scrollable-virtual="true"
                >
                  <kendo-grid-column
                    :field="'date'"
                    :title="$t('date')"
                    :width="200"
                    :group-footer-template="$t('total')"
                    :filterable="false"
                    :template="dateFormat"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'referenceNo'"
                    :title="$t('reference_no')"
                    :width="200"
                    :template="referenceTemplate"
                    :filterable="false"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5, color: green !important',
                    }"
                  />
                  <kendo-grid-column
                    :field="'name'"
                    :attributes="{ class: 'tb_name_td' }"
                    :title="$t('customer')"
                    :width="200"
                    :hidden="true"
                    :group-header-template="'#=value#'"
                    :filterable-multi="true"
                    :filterable-search="true"
                    :template="'<span>#=name#</span>'"
                    :group-footer-template="'Total: '"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'item'"
                    :attributes="{ class: 'tb_name_td' }"
                    :title="$t('item')"
                    :width="200"
                    :group-header-template="'#=value#'"
                    :filterable-multi="true"
                    :filterable-search="true"
                    :template="'<span>#=sku# - #=item#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'sku'"
                    :title="$t('sku')"
                    :width="150"
                    :hidden="true"
                    :filterable="false"
                    :attributes="{ style: 'text-align: left; ' }"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5; text-align:left',
                    }"
                  />
                  <kendo-grid-column
                    :field="'category'"
                    :title="$t('category')"
                    :width="200"
                    :hidden="true"
                    :filterable-multi="true"
                    :filterable-search="true"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="$t('desc')"
                    :title="$t('description')"
                    :width="200"
                    :sortable="false"
                    :template="'<span>#=desc || ``#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <!-- <kendo-grid-column
                    :field="'soCustomer'"
                    :title="$t('customer')"
                    :width="180"
                    :sortable="true"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  /> -->
                  <kendo-grid-column
                    :field="'invReferenceNo'"
                    :title="$t('invoiced_number')"
                    :width="180"
                    :hidden="true"
                    :sortable="true"
                    :encoding="false"
                    :template="'<span>#=invReferenceNo || ``#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'saleRep'"
                    :title="$t('sale_rep')"
                    :width="180"
                    :hidden="true"
                    :sortable="true"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'transactionType.name'"
                    :title="$t('type')"
                    :width="200"
                    :hidden="true"
                    :filterable-multi="true"
                    :filterable-search="true"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'uom'"
                    :title="$t('uom')"
                    :width="100"
                    :filterable="false"
                    :attributes="{ style: 'text-align: left; ' }"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5; text-align:left',
                    }"
                  />
                  <kendo-grid-column
                    :field="'qty'"
                    :title="$t('qty')"
                    :width="100"
                    :filterable="false"
                    :attributes="{ style: 'text-align: right; ' }"
                    :group-footer-template="'#= kendo.toString(sum, `n2`)#'"
                    :footerAttributes="{ style: 'text-align: right;' }"
                    :aggregates="['sum']"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5; text-align:right',
                    }"
                  />
                  <kendo-grid-column
                    :field="'price'"
                    :title="$t('price')"
                    :width="100"
                    :template="'<span>#=kendo.toString(price, decimalFormat)#</span>'"
                    :filterable="false"
                    :attributes="{ style: 'text-align: right; ' }"
                    :group-footer-template="'#= kendo.toString(sum, `n2`)#'"
                    :aggregates="['sum']"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5; text-align:right',
                    }"
                  />
                  <kendo-grid-column
                    v-if="!plansNotAccess.includes(4)"
                    :field="'modifierExchangePrice'"
                    :title="$t('modifier')"
                    :width="150"
                    :hidden="true"
                    :template="'<span>#=kendo.toString(modifierExchangePrice, decimalFormat)#</span>'"
                    :filterable="false"
                    :attributes="{ style: 'text-align: right; ' }"
                    :footerAttributes="{ style: 'text-align: right;' }"
                    :group-footer-template="'#= kendo.toString(sum, `n2`)#'"
                    :aggregates="['sum']"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5; text-align:right',
                    }"
                  />
                  <kendo-grid-column
                    :field="'discountExchangeAmount'"
                    :title="$t('discount')"
                    :width="150"
                    :hidden="true"
                    :template="'<span>#=kendo.toString(discountExchangeAmount, decimalFormat)#</span>'"
                    :filterable="false"
                    :attributes="{ style: 'text-align: right; ' }"
                    :footerAttributes="{ style: 'text-align: right;' }"
                    :group-footer-template="'#= kendo.toString(sum, `n2`)#'"
                    :aggregates="['sum']"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5; text-align:right',
                    }"
                  />
                  <!-- <kendo-grid-column
                    :field="'exchangeOTCAmount'"
                    :title="$t('other_charge')"
                    :width="200"
                    :group-footer-template="'#= kendo.toString(sum, `n2`)#'"
                    :aggregates="['sum']"
                    :footerAttributes="{ style: 'text-align: right;' }"
                    :attributes="{ style: 'text-align: right; ' }"
                    :template="'<span>#=kendo.toString(exchangeOTCAmount, decimalFormat)#</span>'"
                    :headerAttributes="{
                      style: 'text-align: right;background-color: #EDF1F5',
                    }"
                  /> -->
                  <kendo-grid-column
                    :field="'amount'"
                    :title="$t('amount')"
                    :width="150"
                    :filterable="false"
                    :attributes="{ style: 'text-align: right; ' }"
                    :group-footer-template="'#= kendo.toString(sum, `n2`)#'"
                    :footerAttributes="{ style: 'text-align: right;' }"
                    :aggregates="['sum']"
                    :template="'<span>#=kendo.toString(amount, decimalFormat)#</span>'"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5; text-align:right',
                    }"
                  />
                  <kendo-grid-column
                    :field="'doQty'"
                    :title="$t('do_qty')"
                    :width="100"
                    :filterable="false"
                    :attributes="{ style: 'text-align: right; ' }"
                    :group-footer-template="'#= kendo.toString(sum, `n2`)#'"
                    :footerAttributes="{ style: 'text-align: right;' }"
                    :aggregates="['sum']"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5; text-align:right',
                    }"
                  />
                  <kendo-grid-column
                    :field="'invdQty'"
                    :title="$t('invoiced_qty')"
                    :width="100"
                    :filterable="false"
                    :attributes="{ style: 'text-align: right; ' }"
                    :group-footer-template="'#= kendo.toString(sum, `n2`)#'"
                    :footerAttributes="{ style: 'text-align: right;' }"
                    :aggregates="['sum']"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5; text-align:right',
                    }"
                  />
                  <kendo-grid-column
                    :field="'invdAmount'"
                    :title="$t('invoiced_amount')"
                    :width="180"
                    :sortable="false"
                    :attributes="{ style: 'text-align: right; ' }"
                    :group-footer-template="'#= kendo.toString(sum, `n2`)#'"
                    :footerAttributes="{ style: 'text-align: right;' }"
                    :template="'<span>#=kendo.toString(invdAmount, decimalFormat)#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'segment.name'"
                    :title="$t('segment')"
                    :width="200"
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
                    :hidden="true"
                    :filterable-multi="true"
                    :filterable-search="true"
                    :attributes="{ style: 'text-align: left; ' }"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    v-if="!plansNotAccess.includes(4)"
                    :field="'employee'"
                    :title="$t('employee')"
                    :width="180"
                    :hidden="true"
                    :sortable="true"
                    :template="'<span>#=employee || ``#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                </kendo-grid>
              </template>
            </gridFullScreen>
          </v-col>
        </v-row>
        <div style="overflow: auto" class="bySaleOrderPS-pager"></div>
      </v-card>
    </v-col>
    <!-- <v-dialog persistent v-model="dialogQuoteStatus" max-width="450px">
      <v-card>
        <div class="modal_header">
          <v-card-title>{{ $t("change_status") }}: {{ soRefNum }}</v-card-title>
          <v-icon class="btn_close" @click="dialogQuoteStatus = false">close</v-icon>
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
                          clearable
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
    </v-dialog> -->
  </v-row>
</template>

<script>
const productHandler = require("@/scripts/productHandler");
const balanceHandler = require("@/scripts/balance/handler/balanceHandler");
// const transactionHandler = require("@/scripts/transactionHandler");
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
const defaultItem_ = { ["name"]: "Select item", ["id"]: null };
const emptyItem_ = { ["name"]: "loading ..." };

import JSZip from "jszip";
const $ = kendo.jQuery; //require("jquery")
import { exportExelFormat, invoicePrintRow } from "@/utils";
const SECOND_DELAY = 1000;
const defaultItem = { ["name"]: i18n.t("select_employee_name"), ["id"]: null };
const defaultItem1 = { ["name"]: i18n.t("select_customer"), ["id"]: null };
const emptyItem = { ["name"]: "loading ..." };
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
    dialogQuoteStatus: false,
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
    transactions: [],
    tranDS: [],
    saleFormContent: {},
    isLoaded: false,
    invoice: invoiceModel,
    noOfRecord: 0,
    totalSaleLead: 0,
    totalSaleQuote: 0,
    totalSaleOrder: 0,
    group: { field: "name" },
    sort: { field: "referenceNo", dir: "ASC" },
    aggregateDefinition: [
      { field: "amount", aggregate: "sum" },
      { field: "qty", aggregate: "sum" },
      { field: "price", aggregate: "sum" },
      { field: "invdQty", aggregate: "sum" },
      { field: "doQty", aggregate: "sum" },
      { field: "invdAmount", aggregate: "sum" },
      { field: "invPrice", aggregate: "sum" },
      { field: "discountExchangeAmount", aggregate: "sum" },
      { field: "modifierExchangePrice", aggregate: "sum" },
      // { field: "exchangeOTCAmount", aggregate: "sum" },
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
    objStatus: [
      "Open",
      "Delivered",
      "Partially Delivered",
      "Cancelled",
      "Invoiced",
      "Partially Invoiced",
    ],
    changeStatus: ["Abandon", "Decline"],
    status_: "",
    status__: "",
    status___: "",
    soRefNum: "",
    soId: "",
    schemaModelFields: {
      date: { type: "date" },
      exchangeAmount: { type: "number" },
    },
    soRow: {},
    outStandingNo: 0,
    outStandingAmount: 0,
    itemList: [],
    textField_: "name",
    defaultItem_: defaultItem_,
    dataItemKey_: "id",
    filter_: "",
    item: {},
    itemURL: productHandler.centerURL(),
  }),
  methods: {
    onFilterChange_(event) {
      const filter = event.filter.value;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.requestData_(0, filter, this.itemURL);
        this.filter_ = filter;
        this.loading = false;
      }, SECOND_DELAY);
      this.loading = true;
    },
    requestData_(skip, filter, baseUrl) {
      const url = baseUrl;
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          type: "All Item",
          search: `${filter}`,
          searchAs: 0,
          key: {},
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then(this.afterFetch_);
    },
    afterFetch_(json) {
      this.itemList = json.data;
    },
    onChange_(event) {
      const value = event.value;
      if (value && value["name"] === emptyItem_["name"]) {
        return;
      }
      this.item = value;
      this.segment = {};
      this.location = {};
      this.customer = {};
      this.employee = {};
      this.status_ = 0;
    },
    // async saveClose() {
    //   try {
    //     if (this.status___ !== "" && this.soId !== "") {
    //       new Promise((resolve) => {
    //         setTimeout(() => {
    //           resolve("resolved");
    //           this.showLoading = true;
    //           let status = 1;
    //           if (this.status___ === i18n.t("open")) {
    //             status = 1;
    //           } else if (this.status___ === i18n.t("contracted")) {
    //             status = 2;
    //           } else if (this.status___ === i18n.t("abandon")) {
    //             status = 3;
    //           } else if (this.status___ === i18n.t("decline")) {
    //             status = 4;
    //           }
    //           window.console.log("this.status___", this.status___);
    //           const data = {
    //             id: this.soId,
    //             type: "Sale Quote",
    //             status: status,
    //           };
    //           transactionHandler
    //             .update(data)
    //             .then((response) => {
    //               this.showLoading = false;
    //               if (response.data.statusCode === 201) {
    //                 this.$snotify.success("Successfully");
    //                 this.showLoading = false;
    //                 this.dialogQuoteStatus = false;
    //               }
    //             })
    //             .catch((e) => {
    //               this.showLoading = false;
    //               this.dialogQuoteStatus = false;
    //               this.$snotify.error("Something went wrong", e);
    //             });
    //         }, 10);
    //       });
    //     } else {
    //       this.$snotify.error("Missing lead id and status");
    //     }
    //   } catch (error) {
    //     window.console.log("Error on save close", error);
    //   }
    // },
    dataBound: function (e) {
      const grid = kendo.jQuery("#gridReportSaleOrderByProductService").data("kendoGrid");
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
              dataItem.status !== 5 &&
              dataItem.status !== 6
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
      this.item = {};
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
      this.item = {};
      this.status_ = "";
    },
    onStatusChange() {
      this.employee = {};
      this.customer = {};
      this.segment = {};
      this.location = {};
      this.item = {};
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
      this.item = {};
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
      this.item = {};
    },
    pdfExport: function (e) {
      // const pivot = this.$refs.gridReportSaleOrderByProductServiceDS.kendoWidget()
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
      invoicePrintRow(this.transactions);
    },
    goPrint(e) {
      e.preventDefault();
      const grid = kendo.jQuery("#gridReportSaleOrderByProductService").data("kendoGrid");
      const dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
      invoicePrintRow(dataItem);
    },
    goEdit(e) {
      e.preventDefault();
      const grid = kendo.jQuery("#gridReportSaleOrderByProductService").data("kendoGrid");
      const dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
      this.soRow = dataItem;
      this.soRefNum = dataItem.referenceNo || "";
      this.soId = dataItem.id || "";
      if (dataItem.status === 1) {
        this.status__ = i18n.t("open");
      } else if (dataItem.status === 2) {
        this.status__ = i18n.t("contracted");
      } else if (dataItem.status === 3) {
        this.status__ = i18n.t("abandon");
      } else if (dataItem.status === 4) {
        this.status__ = i18n.t("decline");
      }

      this.status___ = i18n.t("decline");
      this.dialogQuoteStatus = true;
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
    quoteReferenceTemplate(data) {
      const url = `sale_quote_view/${data.qTxnId}`;

      const refFrom = data.refFrom || [];
      const refTo = data.refTo || [];
      const args = {
        text: data.qReferenceNo,
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
      const url = `invoice_view/${data.invTxnId}`;

      const refFrom = data.refFrom || [];
      const refTo = data.refTo || [];
      const args = {
        text: data.invReferenceNo || "",
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
      let ds = this.$refs.gridReportSaleOrderByProductServiceDS.kendoWidget(),
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
              this.noOfRecord = kendo.toString(result.Revenue, result.decimalFormat);
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
          const segment = this.segment || {};
          const location = this.location || {};
          const segmentId = segment.id || "";
          const locationId = location.id || "";
          let iStatus = 0;
          if (this.status_ === "Open") {
            iStatus = 1;
          } else if (this.status_ === "Delivered") {
            iStatus = 2;
          } else if (this.status_ === "Partially Delivered") {
            iStatus = 3;
          } else if (this.status_ === "Cancelled") {
            iStatus = 4;
          } else if (this.status_ === "Invoiced") {
            iStatus = 5;
          } else if (this.status_ === "Partially Invoiced") {
            iStatus = 6;
          }
          this.params = {
            search: "",
            type: type,
            start: startDate,
            end: endDate,
            key: this.paging,
            isSummarize: 0,
            detail: 1,
            empId: this.employee.id || "",
            id: this.customer.id || "",
            itemId: this.item.id || "",
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
              this.transactions = responseData;
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
          } else if (this.status_ === "Contracted") {
            iStatus = 2;
          } else if (this.status_ === "Abandon") {
            iStatus = 3;
          } else if (this.status_ === "Decline") {
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
            itemId: this.item.id || "",
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
      this.txnByEmployees = [];
      //   $(".k-pager-wrap").empty();
      //   $(".bySaleOrderPS-page-number").empty();
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
          // ["Open", "Qualified", "Unqualified", "Nature"
          if (type === "Sale Quote") {
            status = i18n.t("contracted");
          } else {
            status = i18n.t("partially_paid");
          }
          break;
        case 3:
          if (type === "Sale Quote") {
            status = i18n.t("abandon");
          } else {
            status = i18n.t("paid_status");
          }
          break;
        case 4:
          if (type === "Sale Quote") {
            status = i18n.t("decline");
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
      $(".bySaleOrderPS-pager").html(`
                <label class="label bySaleOrderPS-item-returned">0</label>
                <div style="display: flex; flex-direction: 'row'">
                    <button class="bySaleOrderPS-next-page" title="previous" style="width: 24px; font-size: 19px;"> < </button>
                    <ul class="bySaleOrderPS-page-number" style="display: flex;list-style: none; padding-left: 0px;">
                        <li style="padding: 6px;"  data-page="1" class="bySaleOrderPS-page-link text-bold-link" >1</li>
                    </ul>
                    <button class="bySaleOrderPS-next-page" title="next" style="width: 24px; font-size: 19px;"> > </button>
                </div>
            `);
      $(document).on("click", ".bySaleOrderPS-page-link", function () {
        const page = $(this).data("page");
        $(".bySaleOrderPS-page-link").removeClass("text-bold-link");
        $(this).addClass("text-bold-link");
        that.backToPage(that, page - 1);
        window.console.log(page - 1);
      });
      // $(document).on('click', '.bySaleOrderPS-next-page', function () {
      $(".bySaleOrderPS-next-page").click(function () {
        const page_number = $(this)
          .parent()
          .children(".bySaleOrderPS-page-number")
          .find("li")
          .last()
          .data("page");
        window.console.log("bySaleOrderPS-page_number", page_number);
        const isPrevious = $(this).attr("title");
        if (isPrevious == "previous") {
          const currectpage = $(".text-bold-link").data("page");

          if (currectpage == 1) {
            return;
          }
          $(".bySaleOrderPS-page-link").removeClass("text-bold-link");
          $(`.bySaleOrderPS-page-link:eq(${currectpage - 1})`).addClass("text-bold-link");
          that.backToPage(that, currectpage - 2);
          window.console.log("this currectpage back", currectpage - 2);
        } else {
          $(".bySaleOrderPS-page-link").removeClass("text-bold-link");
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
            .children(".bySaleOrderPS-page-number")
            .append(
              `<li class="bySaleOrderPS-page-link text-bold-link" style="padding: 6px;" data-page="${
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
      $(".bySaleOrderPS-item-returned").text("Items returned (" + totalRow + ")");
    },
    disabledNextPage(value) {
      $(".bySaleOrderPS-next-page").prop("disabled", value);
    },
    backToPage(that, index) {
      try {
        window.console.log("Length of txnByEmployees", that.txnByEmployees.length);
        const byCustomer = that.txnByEmployees.at(index);
        that.transactions = byCustomer;
        // that.refreshGridData(customer)
        window.console.log("that.txnByEmployees[index]", byCustomer);
      } catch (e) {
        window.console.log("ERROR on backToPage", index);
      }
    },
    refreshGridData(data) {
      $("#gridReportSaleOrderByProductService").data("kendoGrid").dataSource.data([]);
      $("#gridReportSaleOrderByProductService").data("kendoGrid").dataSource.data(data);
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
    this.requestData_(0, this.filter_, this.itemURL);
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
