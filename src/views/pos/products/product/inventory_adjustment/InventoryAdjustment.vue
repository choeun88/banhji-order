<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col sm="12" cols="12">
          <v-card outlined dense class="pa-4 no_border rounded-sm" color="white">
            <v-row>
              <v-col
                class="bigSide py-0"
                sm="8"
                cols="12"
                style="transition: 0.3s ease-in"
                :class="{ hide_big_bar_class: isHideBar }"
              >
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-card outlined dense class="no_border">
                    <h2 class="mb-0">{{ $t("inventory_adjustment") }}</h2>
                    <v-icon
                      v-if="isHideBar"
                      @click="cancel()"
                      class="float-right close_icon"
                      >close
                    </v-icon>
                    <span
                      style="transition: 0.3s ease-in; z-index: 10"
                      :class="{
                        iconArrow: !isHideBar,
                        iconArrowHide: isHideBar,
                      }"
                    >
                      <v-icon
                        size="22"
                        class="arr_icon"
                        @click="hideSmallSidebar"
                        v-if="isHideBar"
                      >
                        mdi-chevron-left-circle
                      </v-icon>
                      <v-icon
                        size="22"
                        class="arr_icon"
                        @click="hideSmallSidebar"
                        v-if="!isHideBar"
                      >
                        mdi-chevron-right-circle
                      </v-icon>
                    </span>
                  </v-card>

                  <v-card
                    outlined
                    dense
                    class="px-3 no_border"
                    color="grayBg"
                    height=" 172px"
                  >
                    <v-row>
                      <v-col sm="4" cols="12" class="pb-0">
                        <label class="label">{{ $t("date") }}</label>
                        <app-datepicker
                          :initialDate="inventoryAdjustment.transactionDate"
                          @onChanged="onTransactionDateChanged"
                          @emitDate="inventoryAdjustment.transactionDate = $event"
                        />
                        <label class="label">{{ $t("stock_count_ref") }}</label>
                        <v-select
                          class="mt-1"
                          :items="stockCounts"
                          tage="account"
                          item-value="id"
                          item-text="referenceNo"
                          @change="stockCountAdjustment"
                          v-model="inventoryAdjustment.stockCount"
                          clearable
                          return-object
                          outlined
                        />
                      </v-col>
                      <v-col sm="4" cols="12">
                        <label class="label">{{ $t("number") }}</label>
                        <div class="d-flex mt-1">
                          <div class="code_text flex-1 text-bold">
                            {{ inventoryAdjustment.abbr }}
                          </div>
                          <v-text-field
                            class="flex-2 custom-border"
                            v-model="inventoryAdjustment.number"
                            readonly
                            outlined
                            :rules="[(v) => !!v || $t('is_required')]"
                            required
                          />
                          <v-icon
                            color="black"
                            size="30"
                            style="height: 40px"
                            class="border_qrcode ml-2"
                            @click="generateNumber"
                            >mdi-qrcode
                          </v-icon>
                        </div>
                      </v-col>
                      <v-col sm="4" cols="12">
                        <label class="label">{{ $t("adjustment_account") }}</label>
                        <v-autocomplete
                          class="mt-1"
                          :items="accounts"
                          tage="account"
                          item-value="id"
                          :item-text="
                            (item) =>
                              `${item.number} - ${
                                this.$store.state.accounting.accountLanguage === 'English'
                                  ? item.name
                                  : item.local_name
                              }`
                          "
                          v-model="inventoryAdjustment.account"
                          :rules="[(v) => (v ? !!v['id'] || $t('is_required') : '')]"
                          :loading="accounts.length === 0"
                          return-object
                          outlined
                        >
                        </v-autocomplete>
                        <!-- <label class="label">{{ $t("adjustment_memo") }}</label>
                                                <v-text-field
                                                  class="mt-1"
                                                  v-model="inventoryAdjustment.transactionNote"
                                                  outlined
                                                  tage="memo"
                                                  required
                                                /> -->
                        <!-- <label class="label">{{
                                                  $t("message_for_journal")
                                                }}</label>
                                                <v-text-field
                                                  class="mt-1"
                                                  v-model="inventoryAdjustment.journalNote"
                                                  outlined
                                                  tage="Message for Journal"
                                                  required
                                                /> -->
                      </v-col>
                    </v-row>
                  </v-card>

                  <v-row style="background-color: #fff">
                    <v-col sm="12" cols="12">
                      <kendo-datasource
                        ref="itemLineDS"
                        :data="itemLines"
                        :change="dataSourceChanged"
                      />
                      <kendo-grid
                        id="gridAdjustmentItemLine"
                        class="grid-function"
                        :data-source-ref="'itemLineDS'"
                        :sortable="false"
                        :column-menu="true"
                        :editable="true"
                        :navigatable="true"
                        :resizable="true"
                        :scrollable-virtual="true"
                      >
                        <kendo-grid-column
                          :command="{
                            iconClass: 'k-icon k-i-trash',
                            text: ' ',
                            click: removeRow,
                            class: 'btn-plus',
                          }"
                          :title="''"
                          :width="63"
                          :headerAttributes="{
                            style: 'text-align: left; background-color: #EDF1F5',
                          }"
                        />
                        <kendo-grid-column
                          :title="$t('no.')"
                          :width="53"
                          :column-menu="false"
                          :template="rowNumberTmpl"
                          :headerAttributes="{
                            style: 'background-color: #EDF1F5;',
                            class: 'text-products',
                          }"
                          :attributes="{ style: 'text-align: products' }"
                        />
                        <kendo-grid-column
                          :field="'item'"
                          :title="$t('item')"
                          :template="itemTemplate"
                          :editor="ItemDropDownEditor"
                          :width="200"
                          :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                        />
                        <kendo-grid-column
                          :field="'description'"
                          :title="$t('description')"
                          :template="'<span>#=description#</span>'"
                          :width="200"
                          :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                        />

                        <kendo-grid-column
                          :field="'buom'"
                          :title="$t('uom')"
                          :width="170"
                          :template="UOMTemplate"
                          :editable="
                            () => {
                              return false;
                            }
                          "
                          :headerAttributes="{
                            style: 'text-align: left; background-color: #EDF1F5',
                          }"
                          :attributes="{ style: 'text-align: left' }"
                        />
                        <kendo-grid-column
                          :field="'cost'"
                          :title="$t('cost')"
                          :editor="numberEditor"
                          :template="'<span>#=kendo.toString(cost || 0, decimalFormat) || 0#</span>'"
                          :width="170"
                          :headerAttributes="{
                            style: 'text-align: left; background-color: #EDF1F5',
                          }"
                          :attributes="{ style: 'text-align: right; ' }"
                        />
                        <kendo-grid-column
                          :field="'qoh'"
                          :title="$t('on_hand')"
                          :template="'<span>#=kendo.toString(qoh || 0, decimalFormat) || 0#</span>'"
                          :width="170"
                          :editable="
                            () => {
                              return false;
                            }
                          "
                          :headerAttributes="{
                            style: 'text-align: left; background-color: #EDF1F5',
                          }"
                          :attributes="{ style: 'text-align: right; ' }"
                        />
                        <kendo-grid-column
                          :field="'count'"
                          :title="$t('counted')"
                          :editor="numberEditor"
                          :template="'<span>#=kendo.toString(count || 0, decimalFormat)#</span>'"
                          :width="170"
                          :headerAttributes="{
                            style: 'text-align: left; background-color: #EDF1F5',
                          }"
                          :attributes="{ style: 'text-align: right; ' }"
                        />
                        <kendo-grid-column
                          :field="'different'"
                          :title="$t('different')"
                          :editable="
                            () => {
                              return false;
                            }
                          "
                          :width="170"
                          :template="'<span>#=kendo.toString(different || 0, decimalFormat)#</span>'"
                          :editor="numberEditor"
                          :headerAttributes="{
                            style: 'text-align: left; background-color: #EDF1F5',
                          }"
                          :attributes="{ style: 'text-align: right' }"
                        />
                        <kendo-grid-column
                          :field="'amount'"
                          :title="$t('amount')"
                          :width="170"
                          :editable="
                            () => {
                              return false;
                            }
                          "
                          :template="'<span>#=kendo.toString(amount || 0, decimalFormat)#</span>'"
                          :headerAttributes="{
                            style: 'text-align: left; background-color: #EDF1F5',
                          }"
                          :attributes="{ style: 'text-align: right' }"
                        />
                      </kendo-grid>
                    </v-col>
                    <v-col sm="12" cols="12" class="py-0">
                      <v-btn
                        color="primary"
                        class="float-left ml-0 btn_plus rounded-4 white--text mr-2"
                        @click="addRow"
                      >
                        <v-icon size="" class="ma-1">mdi-plus</v-icon>
                      </v-btn>
                    </v-col>
                    <v-col sm="6" cols="12">
                      <label>{{ $t("message_these_adjustment") }}</label>
                      <v-textarea
                        class="mt-1"
                        outlined
                        no-resize
                        v-model="inventoryAdjustment.transactionNote"
                        height="70px"
                        tage="Message on Invoice"
                        :placeholder="$t('this_will_appear_on_the_inv')"
                      />
                      <label>{{ $t("message_on_journal") }}</label>
                      <v-textarea
                        class="mt-1"
                        outlined
                        v-model="inventoryAdjustment.journalNote"
                        no-resize
                        height="70px"
                        tage="Message on Order"
                        :placeholder="$t('this_will_appear_on_the_journal')"
                      />
                    </v-col>
                    <!-- <v-col class="pt-5" sm="6" cols="12">
                      <v-simple-table>
                        <template v-slot:default>
                          <tbody>
                            <tr>
                              <td class="text-left">{{ $t("dr") }}</td>
                              <td class="text-center">:</td>
                              <td class="text-right color_green text-bold">
                                {{ numberFormat(dr) }}
                              </td>
                            </tr>
                            <tr>
                              <td class="text-left">{{ $t("cr") }}</td>
                              <td class="text-center">:</td>
                              <td class="text-right color_green text-bold">
                                {{ numberFormat(cr) }}
                              </td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </v-col> -->
                  </v-row>
                  <v-divider />
                  <v-card elevation="0" class="no_border function_footer">
                    <v-alert type="warning" v-model="alert" dismissible>
                      <span v-html="errorMessage" />
                    </v-alert>
                    <v-menu>
                      <v-list>
                        <v-list-item v-for="(item, index) in templates" :key="index">
                          <v-list-item-title>{{ item.title }} </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                    <v-btn
                      color="primary"
                      outlined
                      class="text-capitalize black--text float-left"
                      @click="cancel"
                      >{{ $t("cancel") }}
                    </v-btn>
                    <v-btn
                      color="primary"
                      @click="onSaveClose('close')"
                      class="float-right white--text text-capitalize"
                    >
                      {{ $t("save_close") }}
                    </v-btn>
                    <v-btn
                      color="secondary"
                      style="margin-right: 10px !important"
                      class="white--text float-right text-capitalize"
                      @click="onSaveClose('new')"
                      :hidden="hiddenButton"
                      >{{ $t("save_new") }}
                    </v-btn>
                  </v-card>
                </v-form>
              </v-col>
              <v-col
                class="smallSide"
                sm="4"
                style="transition: 0.3s ease-in"
                :class="{ hide_small_bar_class: isHideBar }"
              >
                <h3
                  style="color: #b3b5bc; font-size: 20px"
                  v-if="!isHideBar"
                  class="text-uppercase float-right mt-n3"
                >
                  <span class="pointer" @click="Help('inventory adjustment')">
                    {{ $t("help") }}
                  </span>
                  <v-icon @click="cancel()" class="float-right mt-n1 close_icon"
                    >close
                  </v-icon>
                </h3>

                <div v-if="!isHideBar" class="small_sidebar mt-8 grayBg">
                  <v-row>
                    <v-col sm="12" cols="12" class="pt-0">
                      <v-card
                        outlined
                        dense
                        class="pa-3 mb-2 no_border my_card rounded-4 white--text"
                        color="primary"
                        height="60px"
                      >
                        <h3 class="text-left font_13 flex-1 text-uppercase">
                          {{ $t("adjustment_amount") }}
                        </h3>
                        <h3 class="text-right flex-1 font_20 niradei_heavy">
                          {{ numberFormat(inventoryAdjustment.amount) }}
                        </h3>
                      </v-card>
                      <div v-show="this.$store.state.setting.formContent.segment">
                        <label class="label mb-0">{{ $t("segment") }}</label>
                        <v-select
                          class="mt-1"
                          v-model="inventoryAdjustment.segment"
                          :items="segments"
                          item-value="id"
                          :item-text="(item) => `${item.code} - ${item.name}`"
                          return-object
                          tage="sub Of"
                          placeholder="Sub Of"
                          :disabled="
                            appType !== 'Supply' &&
                            appType !== 'Marketing' &&
                            appType !== 'Service'
                              ? false
                              : true
                          "
                          outlined=""
                        />
                      </div>
                      <div v-show="this.$store.state.setting.formContent.businessUnit">
                        <label class="label mb-0">{{ $t("location") }}</label>
                        <v-select
                          class="mt-1"
                          v-model="inventoryAdjustment.location"
                          :items="locations"
                          item-value="id"
                          :item-text="(item) => `${item.code} - ${item.name}`"
                          return-object
                          tage="Location"
                          :disabled="
                            appType !== 'Supply' &&
                            appType !== 'Marketing' &&
                            appType !== 'Service'
                              ? false
                              : true
                          "
                          placeholder="location"
                          outlined=""
                        />
                      </div>
                      <div v-show="this.$store.state.setting.formContent.project">
                        <label class="label">{{ $t("project") }}</label>
                        <v-select
                          class="mt-1"
                          v-model="inventoryAdjustment.project"
                          :items="projects"
                          :disabled="
                            appType !== 'Supply' &&
                            appType !== 'Marketing' &&
                            appType !== 'Service'
                              ? false
                              : true
                          "
                          :item-text="(item) => `${item.code} - ${item.name}`"
                          item-value="id"
                          tage="Project"
                          outlined
                        />
                      </div>
                      <label class="label">{{ $t("for_month_of") }}</label>
                      <app-monthpicker
                        :initMonthOf="inventoryAdjustment.monthOf"
                        @emitMonthOf="inventoryAdjustment.monthOf = $event"
                      />
                      <div
                        v-if="
                          appType !== 'Supply' &&
                          appType !== 'Marketing' &&
                          appType !== 'Service'
                        "
                      >
                        <div v-show="this.$store.state.setting.formContent.employee">
                          <label class="label mb-0">{{ $t("employee") }}</label>
                          <v-col
                            sm="12"
                            cols="12"
                            class="kendo_dropdown_custom pl-0 pr-0 pb-3 pt-0"
                          >
                            <dropdownlist
                              :data-items="employees"
                              @change="onEmployeeChanged"
                              :value="mEmployee"
                              :data-item-key="'id'"
                              :text-field="'name'"
                              :default-item="defaultItem"
                              :filterable="true"
                              :loading="loading"
                              @filterchange="onEmployeeFilterChanged"
                            >
                            </dropdownlist>
                          </v-col>
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <LoadingMe
        :isLoading="showLoading"
        :fullPage="false"
        type="loading"
        :myLoading="true"
      />
    </v-container>
  </v-app>
</template>

<script>
// import kendo from '@progress/kendo-ui'
import { i18n } from "@/i18n";
import InventoryAdjustment from "@/scripts/model/inventoryAdjustment";
import { ShowResource, dataStore } from "@/observable/store";
import { uuid } from "vue-uuid";
import kendo from "@progress/kendo-ui";
import SaleFormContentModel from "@/scripts/model/SaleFormContent";
import ItemLineModel from "@/scripts/inventory-adjustment/model/ItemLine";
import { DropDownList } from "@progress/kendo-vue-dropdowns";

const accountHandler = require("@/scripts/handler/accounting/account");
const billingHandler = require("@/scripts/invoice/handler/billingHandler");
const prefixHandler = require("@/scripts/prefixHandler");
const warehouseHandler = require("@/scripts/warehouseHandler");
const settingsHandler = require("@/scripts/settingsHandler");
const locationHandler = require("@/scripts/locationHandler");
const projectHandler = require("@/scripts/projectHandler");
const productVariantHandler = require("@/scripts/productVariantHandler");
const saleFormContentHandler = require("@/scripts/saleFormContentHandler");
const saleFormContentModel = new SaleFormContentModel({});
const currencyHandler = require("@/scripts/currency/handler/currencyHandler");
const employeeHandler = require("@/scripts/employeeHandler");

const itemLineModel = new ItemLineModel({});
const prefix = "inventory adjustment";
const txnType = "Inventory Adjustment";
const itemLinePrefix = "lin-";
const $ = kendo.jQuery;
import Helper from "@/helper.js";

const cookieJS = require("@/cookie.js");
const cookie = cookieJS.getCookie();
const textField = "numberName";
const keyField = "id";
const defaultItem = { [textField]: "Select employee...", [keyField]: null };
const emptyItem = { [textField]: "loading ..." };
const SECOND_DELAY = 1000;
export default {
  name: "InventoryAdjustment",
  components: {
    LoadingMe: () => import(`@/components/Loading`),
    "app-datepicker": () => import("@/components/custom_templates/DatePickerComponent"),
    "app-monthpicker": () => import("@/components/kendo_templates/MonthOfPicker"),
    dropdownlist: DropDownList,
  },
  props: ["id"],
  data: () => ({
    loading: false,
    isEdit: false,
    // LoadingMe
    showLoading: true,
    alert: false,
    valid: true,
    templates: [
      { title: "Draft" },
      { title: "Open" },
      { title: "Partially Closed" },
      { title: "Closed" },
    ],
    isHideBar: false,
    accounts: [],
    segments: [],
    locations: [],
    projects: [],
    warehouses: [],
    buom: [],
    itemLines: [],
    baseCurrency: {},
    exchangeRate: {},
    defaultItem: defaultItem,
    empBaseUrl: employeeHandler.search(),
    saleFormContent: saleFormContentModel,
    inventoryAdjustment: new InventoryAdjustment({}),
    itemLine: itemLineModel,
    transactionDate: "",
    jRaw: [],
    dr: 0,
    cr: 0,
    loggedUser: {
      id: cookie.creator,
      name: cookie.email,
    },
    stockCounts: [],
    employees: [],
    mEmployee: {},
    coa: [],
    bizSetting: {},
  }),
  methods: {
    mappingAccount(coa, uuid) {
      const account = coa.filter((k) => k.uuid === uuid);
      return account.map((j) => {
        j.id = j.uuid;
        return {
          ...j,
        };
      })[0];
    },
    async stockCountAdjustment() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          const stockCount = this.inventoryAdjustment.stockCount || {};
          const stockCountId = stockCount.id || "";
          const asOf = this.inventoryAdjustment.transactionDate || "";
          if (stockCountId !== "") {
            this.showLoading = true;
            const params = {
              key: {},
              start: asOf,
              id: stockCountId,
              type: "Stock Count",
              detail: 1,
            };
            this.itemLines = [];
            billingHandler.inventoryAdjustmentList(params).then((res) => {
              if (res.data.statusCode === 200) {
                this.showLoading = false;
                const response = res.data.data;
                this.itemLines = response; //.filter((n) => n.status === 1);
                $("#gridAdjustmentItemLine")
                  .data("kendoGrid")
                  .dataSource.data(this.itemLines);
                this.autoCalculate();
              } else {
                this.showLoading = false;
              }
            });
            // this.itemLines = [];
            // productVariantHandler
            //   .stockCountAdjustment("?id=" + stockCountId + "&asOf=" + asOf)
            //   .then((res) => {
            //     if (res.data.statusCode === 200) {
            //       this.showLoading = false;
            //       this.itemLines = res.data.data;
            //     } else {
            //       this.showLoading = false;
            //     }
            //   });
          }
        }, 10);
      });
    },
    onEmployeeChanged(event) {
      const value = event.value;
      if (value && value[textField] === emptyItem[textField]) {
        return;
      }
      this.mEmployee = value;
      this.inventoryAdjustment.employee = value;
    },
    afterFetch_(json) {
      this.employees = json.data;
    },
    requestData_(skip, filter, baseUrl) {
      const url = baseUrl + `/${filter}`;
      this.requestStarted = true;
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then(this.afterFetch_);
    },
    onEmployeeFilterChanged(event) {
      const filter = event.filter.value;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.requestData_(0, filter, this.empBaseUrl);
        this.filter_ = filter;
        this.loading = false;
      }, SECOND_DELAY);
      this.loading = true;
    },
    async loadEmployeeCenter() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.employees = [];
          employeeHandler
            .center(undefined)
            .then((res) => {
              this.showLoading = true;
              if (res.data.statusCode === 200) {
                this.showLoading = false;
                this.employees = res.data.data;
                // if (this.employees.length > 0) {
                //   this.inventoryAdjustment.employee = this.employees[0];
                // }
              }
            })
            .catch();
          {
            this.showLoading = false;
          }
        }, 10);
      });
    },
    numberFormat(value) {
      return kendo.toString(value, `n${this.saleFormContent.decimal}`);
    },
    onTransactionDateChanged() {
      // this.resetDataWhenTxnDateChanged()
      if (this.$route.params.id === undefined) {
        this.generateNumber();
      }
      this.inventoryAdjustment.monthOf = new Date(
        this.inventoryAdjustment.transactionDate
      )
        .toISOString()
        .substring(0, 7);
    },
    async initData() {
      if (this.$route.params.id !== undefined) {
        await this.loadViewAdjustment();
        // window.console.log('1', this.$route.params)
      } else {
        this.clear();
        // this.addRow();
      }
    },
    async loadSaleFormContent() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          saleFormContentHandler.list().then(async (res) => {
            if (res.data.statusCode === 200) {
              const data = res.data.data;
              if (data.length > 0) {
                this.saleFormContent = data[0];
                this.baseCurrency = data[0].baseCurrency;
                this.inventoryAdjustment.currency = this.baseCurrency;
                await this.initData();
                await this.loadTransactionRate();
              }
            }
          });
        }, 10);
      });
    },
    async loadTransactionRate() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          const date = new Date(this.inventoryAdjustment.transactionDate)
            .toISOString()
            .substr(0, 10);
          const currency = this.baseCurrency;
          let code = "";
          if (currency.hasOwnProperty("code")) {
            code = currency.code;
          }
          if (code !== undefined || code !== "") {
            this.showLoading = true;
            currencyHandler.getLastExchangeRateByDate(date, code).then((res) => {
              if (res.data.statusCode === 200) {
                this.showLoading = false;
                this.exchangeRate = res.data.data[0];
                this.inventoryAdjustment.txnRate = this.exchangeRate.rate;
                this.inventoryAdjustment.exchangeRate = this.exchangeRate;
                this.showLoading = false;
              }
            });
          }
        }, 10);
      });
    },
    itemTemplate(dataItem) {
      const item = dataItem.item;
      if (item) {
        return `<span>${item.name ? item.name : ``}</span>`;
      } else {
        return ``;
      }
    },
    ItemDropDownEditor(container, options) {
      const filterBy = "Name";
      let thisAppType = this.appType;
      let thisBizSetting = this.bizSetting;
      kendo
        .jQuery('<input name="' + options.field + '"/>')
        .appendTo(container)
        .kendoDropDownList({
          autoBind: true,
          autoWidth: true,
          height: 400,
          delay: SECOND_DELAY,
          filter: "contains",
          dataTextField: "name",
          dataValueField: "id",
          headerTemplate:
            '<div class="dropdown-header k-widget k-header">' +
            "<span>Items </span>" +
            "<span></span>" +
            "</div>",
          template: "<span>#=name#</span>",
          optionLabel: "--- Select ---",
          dataSource: new kendo.data.DataSource({
            serverFiltering: true,
            transport: {
              read: {
                url: productVariantHandler.itemSearchURL(
                  "?plId=" + "&reUsed=1&filterBy=" + filterBy + "&pattern=itm-1-1"
                ),
                // url: productVariantHandler.itemVariantSearchURL(),
              },
              dataType: "json",
            },
            schema: {
              model: {
                id: "id",
                fields: {
                  id: { type: "string" },
                  name: { type: "string" },
                  sku: { type: "string" },
                },
              },
              data: function (response) {
                if (
                  thisAppType !== "Supply" &&
                  thisAppType !== "Marketing" &&
                  thisAppType !== "Service"
                ) {
                  return response.data;
                } else {
                  let newData = [];
                  response.data.map((resD) => {
                    thisBizSetting.productCategories.forEach((setCat) => {
                      if (
                        resD.category.id === setCat.id ||
                        resD.type == "Transaction Item"
                      ) {
                        newData.push(resD);
                      }
                    });
                    if (thisAppType === "Service") {
                      thisBizSetting.serviceCategories.forEach((setSevice) => {
                        if (
                          resD.category.id === setSevice.id ||
                          resD.type == "Transaction Item"
                        ) {
                          newData.push(resD);
                        }
                      });
                    }
                  });

                  return newData;
                }
              },
              total: function (response) {
                return response.data.count;
              },
            },
          }),
        });
    },
    qohTemplate(dataItem) {
      // const buom = dataItem.buom || {}
      const qoh = dataItem.qoh || 0;
      // if (buom.hasOwnProperty('name')) {
      return qoh;
      // }
      // return ``
    },
    UOMTemplate(dataItem) {
      const uom = dataItem.buom;
      if (uom) {
        return `<span>${uom.name ? uom.name : ``}</span>`;
      } else {
        return ``;
      }
    },
    numberEditor(container, options) {
      kendo
        .jQuery('<input data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoNumericTextBox({
          decimals: 30,
          min: 0,
          format: `${this.saleFormContent.decimal}`,
        });
    },
    rowNumberTmpl(dataItem) {
      let ds = this.$refs.itemLineDS.kendoWidget(),
        index = ds.indexOf(dataItem);
      return index + 1;
    },
    addRow() {
      let ds = this.$refs.itemLineDS.kendoWidget(),
        total = ds.total();
      this.itemLine.id = itemLinePrefix + uuid.v1();
      this.itemLine.decimalFormat = "n" + this.saleFormContent.decimal;
      ds.insert(total, this.itemLine);
    },
    async dataSourceChanged(e) {
      if (e.field) {
        let dataRow = e.items[0],
          itemType = "",
          buom = {},
          count = 0,
          diff = 0,
          qoh = 0;
        switch (e.field) {
          case "item":
            dataRow.set("description", dataRow.item.description);
            buom = dataRow.item.uom;
            dataRow.set("buom", buom);
            itemType = dataRow.item.type || "";
            await this.searchTransaction(dataRow, dataRow.item.id, itemType);
            break;
          case "count":
            try {
              count = parseFloat(dataRow.count || 0);
              qoh = parseFloat(dataRow.qoh || 0);
              diff = count - qoh;
              dataRow.set("different", parseFloat(diff));
              dataRow.set("amount", parseFloat(dataRow.cost) * parseFloat(diff));
            } catch {
              dataRow.set("different", 0);
              dataRow.set("amount", 0);
            }
            break;
          case "cost":
            try {
              diff = parseFloat(dataRow.different || 0);
              dataRow.set("amount", parseFloat(dataRow.cost) * parseFloat(diff));
            } catch {
              dataRow.set("amount", 0);
            }
            break;
          default:
            break;
        }
        if (e.field) {
          this.autoCalculate();
          // this.rawForJournal()
        }
      }
    },
    autoCalculate() {
      let ds = this.$refs.itemLineDS.kendoWidget();
      let nature = "",
        amount = 0,
        qty = 0;
      this.jRaw = [];
      const rows = ds.data();
      rows.forEach((value) => {
        const amt = kendo.parseFloat(value.amount);
        const counted = value.count || 0;
        const qoh = value.qoh || 0;
        window.console.log("Special case qoh", qoh, "counted", counted);
        if (counted === 0 && qoh < 0) {
          // #region special case for qoh-qty = 0
          const wac = value.wac || 0;
          const bValue = value.bValue || 0; // by rothny
          const inValue = Math.abs(bValue) - amt; // wac +amt; by rothny
          window.console.log(
            "Special case inValue",
            inValue,
            "amt",
            amt,
            wac,
            "bValue",
            bValue
          );
          if (inValue !== 0) {
            window.console.log("Special case counted", inValue);
            const item = value.item;
            const itmType = item.type || "";
            value["adjAmount"] = inValue;
            window.console.log("kkadjAmount", value);
            if (itmType === "Variant") {
              if (item.hasOwnProperty("inventoryAcc")) {
                if (item.inventoryAcc.hasOwnProperty("id")) {
                  const inventoryAcc = item.inventoryAcc || {};
                  const account = this.mappingAccount(this.coa, inventoryAcc.id);
                  this.jRaw.push({
                    id: account.id + "-dr",
                    line: {},
                    description: "To adjust inventory value",
                    account: account,
                    accountId: account.id,
                    amount: inValue, // qty*avg_cost ,
                    exchangeAmount: inValue * (this.inventoryAdjustment.txnRate || 1), //xAmount,
                    type: "dr",
                    typeAs: "item",
                  });
                }
              }
              if (item.hasOwnProperty("costOfGoodsSoldAcc")) {
                if (item.costOfGoodsSoldAcc.hasOwnProperty("id")) {
                  const costOfGoodsSoldAcc = item.costOfGoodsSoldAcc || {};
                  const account = this.mappingAccount(this.coa, costOfGoodsSoldAcc.id);
                  this.jRaw.push({
                    id: account.id + "-cr",
                    line: {},
                    description: "To adjust inventory value",
                    account: account,
                    accountId: account.id,
                    amount: inValue * -1,
                    type: "cr",
                    exchangeAmount:
                      inValue * (this.inventoryAdjustment.txnRate || 1) * -1,
                    typeAs: "item",
                  });
                }
              }
            }
          }
          // #end region
        }

        const diff = kendo.parseFloat(value.different);
        amount += amt;
        qty += diff;
        const item = value.item;
        if (amt > 0) {
          nature = "dr";
        } else {
          nature = "cr";
        }
        if (item) {
          if (item.type === "Variant") {
            if (item.hasOwnProperty("inventoryAcc")) {
              if (item.inventoryAcc.hasOwnProperty("id")) {
                let inventoryAcc = item.inventoryAcc || {};
                const inventoryAccId = inventoryAcc.uuid || "";
                inventoryAcc = this.mappingAccount(this.coa, inventoryAccId);
                this.jRaw.push({
                  id: inventoryAccId + "-" + nature,
                  line: new ItemLineModel(value),
                  description: item.description || "",
                  account: inventoryAcc,
                  accountId: inventoryAcc,
                  amount: amt, // qty*avg_cost ,
                  exchangeAmount: amt, //xAmount,
                  type: nature,
                  typeAs: "item",
                });
              }
            }
          }
        }
      });
      this.inventoryAdjustment.amount = amount;
      this.inventoryAdjustment.exchangeAmount = amount;
      this.inventoryAdjustment.qty = qty;
      // adjustment account
      if (this.inventoryAdjustment.account) {
        let adjustAcc = this.inventoryAdjustment.account || {};
        const adjustAccId = adjustAcc.uuid || "";
        adjustAcc = this.mappingAccount(this.coa, adjustAccId);
        if (amount * -1 > 0) {
          nature = "dr";
        } else {
          nature = "cr";
        }
        this.jRaw.push({
          id: adjustAccId + "-" + nature,
          line: new ItemLineModel({}),
          description: this.inventoryAdjustment.journalNote,
          account: adjustAcc,
          accountId: adjustAccId,
          amount: amount * -1, // qty*avg_cost ,
          exchangeAmount: amount * -1, //xAmount,
          type: nature,
          typeAs: "adjustment acc",
        });
      }
      // todo: raw Journal
      // const account = this.inventoryAdjustment.account || {}
      // if (this.inventoryAdjustment.amountDue > 0) {
      //   nature = 'dr'
      // } else {
      //   nature = 'cr'
      // }
      // if (account) {
      //   if (account.hasOwnProperty('id')) {
      //     this.jRaw.push({
      //       id: account.id + '-' + nature,
      //       line: new ItemLineModel({}),
      //       description: this.invoice.journalNote,
      //       account: account,
      //       accountId: account.id,
      //       exchangeAmount: this.inventoryAdjustment.exchangeAmount,
      //       amount: this.invoice.amountDue,
      //       type: nature,
      //       typeAs: 'ar'
      //     })
      //   }
      // }
      // todo: end raw Journal
      this.shrinkData(this.jRaw);
      // const unique = this.removeDuplicate(this.accounts)
      // window.console.log(unique, 'unique')
    },
    removeDuplicate(array) {
      const result = [];
      const map = new Map();
      for (const item of array) {
        if (!map.has(item.id)) {
          map.set(item.id, true); // set any value to Map
          result.push(item);
        }
      }
      return result;
    },
    shrinkData(obj) {
      const uniques = this.removeDuplicate(
        obj
      ); /*[...new Set(accountId.map(i => {
                return {
                    id_: i.id_,
                    id: i.id,
                    type: i.type
                }
            }))]*/
      uniques.forEach((n) => {
        const found = obj.filter((m) => m.id === n.id);
        let amount = 0,
          xAmount = 0;
        found.forEach((z) => {
          amount += parseFloat(z.amount || 0);
          xAmount += parseFloat(z.exchangeAmount || 0);
        });
        n.amount = parseFloat(amount); //this.numberFormat(amount)
        n.exchangeAmount = parseFloat(xAmount); //parseFloat(parseFloat(amount * parseFloat(this.invoice.txnRate))) //this.numberFormat(amount * parseFloat(this.invoice.txnRate)) //.toFixed(this.saleFormContent.decimal)
      });
      this.jRaw = uniques;
      let dr = 0,
        cr = 0;
      this.jRaw.forEach((j) => {
        switch (j.type) {
          case "cr":
            cr += parseFloat(j.amount);
            break;
          case "dr":
            dr += parseFloat(j.amount);
            break;
          default:
            break;
        }
      });
      this.dr = dr;
      this.cr = cr;
      window.console.log("dr=", dr, "cr=", cr, "dr+cr = ", dr + cr);
      window.console.log(JSON.stringify(uniques), "uniques");
    },
    Help(keyword_search) {
      ShowResource(keyword_search);
    },
    async searchTransaction(dataRow, itemId, itemType = "") {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = true;
          const startDate = this.inventoryAdjustment.transactionDate;
          //   let strFilter ="?asOf=" + startDate + "&id=" + itemId + "&itemType=" + itemType;
          const params = {
            asOf: startDate,
            key: {},
            id: itemId,
          };
          window.console.log("itemType", itemType);
          billingHandler.inventoryBalance(params).then((res) => {
            if (res.data.statusCode === 200) {
              const balance = res.data.data;
              if (balance.length > 0) {
                dataRow.set("cost", balance[0].wac);
                dataRow.set("qoh", balance[0].qoh);
                dataRow.set("count", balance[0].qoh);
                dataRow.set("bValue", balance[0].bValue);
                dataRow.set(
                  "amount",
                  parseFloat(balance[0].wac) * parseFloat(dataRow.different)
                );
              } else {
                dataRow.set("cost", 0);
              }
              window.console.log("balance", res.data.data);
            }
            this.showLoading = false;
          });
        }, 10);
      });
    },
    async loadAccount() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          accountHandler.getAllPages().then((res) => {
            this.showLoading = false;
            this.coa = res // .data;
            this.accounts = res.map((itm) => {
              return {
                id: itm.uuid,
                uuid: itm.uuid,
                name: itm.name,
                local_name: itm.local_name,
                number: itm.number,
                is_taxable: itm.is_taxable,
                banhjiAccCode: itm.banhjiAccCode,
                group_code: itm.group_code,
                parent_account: itm.parent_account,
                type_code: itm.type_code,
                account_type: itm.account_type,
              };
            });
          });
        }, 10);
      });
    },
    async loadProjects() {
      await projectHandler.list().then((res) => {
        this.projects = res.data.data;
        // if (this.projects.length > 0) {
        //   this.inventoryAdjustment.project = this.projects[0];
        // }
      });
    },
    async loadSegment() {
      // window.console.log("dataStore.roleData", dataStore);
      const roleType = dataStore.roleType || 0;
      if (roleType === 0) {
        if (dataStore.roleData) {
          const roleData = dataStore.roleData || [];
          const segment = roleData.filter((itm) => itm.type === "segment");
          const segmentDefault = segment.filter((m) => m.isDefault === 1);
          this.segments = segment;
          if (this.$route.params.id === undefined || this.$route.params.id === "") {
            if (segmentDefault.length > 0) {
              if (
                this.appType != "Supply" &&
                this.appType != "Marketing" &&
                this.appType != "Service"
              ) {
                this.inventoryAdjustment.segment = segmentDefault[0];
              } else {
                this.loadBizSetting();
              }
            }
          }
        }
      } else if (roleType === 1) {
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
                    this.appType != "Supply" &&
                    this.appType != "Marketing" &&
                    this.appType != "Service"
                  ) {
                    this.inventoryAdjustment.segment = this.segments[0];
                  } else {
                    this.loadBizSetting();
                  }
                }
              }
            });
          }, 10);
        });
      }
    },
    async loadLocation() {
      this.locations = [];
      const roleType = dataStore.roleType || 0;
      if (roleType === 0) {
        if (dataStore.roleData) {
          const roleData = dataStore.roleData || [];
          const location = roleData.filter((itm) => itm.type === "location");
          const locationDefault = location.filter((m) => m.isDefault === 1);
          this.locations = location;
          if (this.$route.params.id === undefined || this.$route.params.id === "") {
            if (locationDefault.length > 0) {
              this.inventoryAdjustment.location = locationDefault[0];
            }
          }
        }
      } else if (roleType === 1) {
        new Promise((resolve) => {
          setTimeout(() => {
            resolve("resolved");
            this.locations = [];
            locationHandler.list().then((res) => {
              if (res.data.statusCode === 200) {
                this.showLoading = false;
                this.locations = res.data.data;
                if (this.locations.length > 0) {
                  this.inventoryAdjustment.location = this.locations[0];
                }
              }
            });
          }, 10);
        });
      }
    },
    async loadWarehouses() {
      warehouseHandler.getWarehouseSettingAll().then((res) => {
        this.warehouses = res;
      });
    },
    async loadPrefix() {
      new Promise((resolve) => {
        setTimeout(async () => {
          resolve("resolved");
          await prefixHandler.get(prefix).then(async (res) => {
            if (res.data.statusCode === 200) {
              this.showLoading = false;
              this.transactionTypes = res.data.data;
              if (this.transactionTypes.length > 0) {
                this.inventoryAdjustment.transactionType = this.transactionTypes[0];
                if (this.$route.params.id === undefined) {
                  await this.generateNumber();
                }
              }
            }
          });
        }, 10);
      });
    },
    async generateNumber() {
      if (this.inventoryAdjustment.transactionDate !== "") {
        let data = {
          abbr: this.inventoryAdjustment.transactionType.abbr,
          structure: this.inventoryAdjustment.transactionType.structure,
          transactionDate: this.inventoryAdjustment.transactionDate,
          sequcencing: this.inventoryAdjustment.transactionType.sequcencing,
          prefixSeparator: this.inventoryAdjustment.transactionType.prefixSeparator || "",
          numberSeparator: this.inventoryAdjustment.transactionType.numberSeparator || "",
          format: this.inventoryAdjustment.transactionType.format || 5,
          type: txnType,
          entity: 1,
        };
        this.inventoryAdjustment.abbr = data.abbr;
        this.inventoryAdjustment.structure = data.structure;
        this.inventoryAdjustment.sequcencing = data.sequcencing;
        this.inventoryAdjustment.transactionDate = data.transactionDate;
        this.inventoryAdjustment.type = data.type;
        this.showLoading = true;
        await billingHandler
          .lastNumber(data)
          .then((response) => {
            if (response.data.statusCode === 200) {
              this.showLoading = false;
              const res = response.data.data;
              const lastNumber = this.zeroPad(
                parseInt(res.lastNumber),
                this.inventoryAdjustment.transactionType.format
              );
              this.inventoryAdjustment.number =
                res.suffix +
                this.inventoryAdjustment.transactionType.numberSeparator +
                lastNumber;
              this.inventoryAdjustment.lastNumber = res.suffix + lastNumber;
            }
          })
          .catch((e) => {
            this.showLoading = false;
            window.console.error(e);
          });
      }
    },
    zeroPad(num, places) {
      return String(num).padStart(places, "0");
    },
    savePrint() {},
    saveNew() {},
    async onSaveClose(isSave) {
      if (!this.$refs.form.validate()) {
        this.$refs.form.validate();
        return;
      }
      // approve recod approve date
      let isValidClosingDate = await Helper.validateClosingDate(
        this.inventoryAdjustment.transactionDate
      );
      if (!isValidClosingDate) {
        return;
      }
      // window.console.log("mEmployee", this.inventoryAdjustment.employee);
      if (this.mEmployee.id !== null) {
        new Promise((resolve) => {
          setTimeout(() => {
            resolve("resolved");
            let isAutoGenerate = 1;
            if (this.$route.params.id) {
              const tranDate = new Date(this.transactionDate);
              const tranDateAdjustment = new Date(
                this.inventoryAdjustment.transactionDate
              );
              const tranDateM = tranDate.getFullYear() + tranDate.getMonth();
              const tranDateTxnM =
                tranDateAdjustment.getFullYear() + tranDateAdjustment.getMonth();
              if (tranDateM === tranDateTxnM) {
                isAutoGenerate = 0;
              }
            }
            this.autoCalculate();
            let itemLineDS = this.$refs.itemLineDS.kendoWidget();
            const dataRow = itemLineDS
              .data()
              .filter((o) => o.buom !== {} || o.buom !== null)
              .map((o) => {
                return new ItemLineModel(o);
              });
            if (dataRow.length > 0) {
              let data = {
                id: this.inventoryAdjustment.id ? this.inventoryAdjustment.id : "",
                uuid: this.inventoryAdjustment.uuid ? this.inventoryAdjustment.uuid : "",
                journal_uuid: this.inventoryAdjustment.journal_uuid
                  ? this.inventoryAdjustment.journal_uuid
                  : "",
                type: txnType,
                number: this.inventoryAdjustment.number,
                abbr: this.inventoryAdjustment.transactionType.abbr,
                transactionDate: this.inventoryAdjustment.transactionDate,
                transactionDateTZ: Helper.toISODate(
                  this.inventoryAdjustment.transactionDate
                ),
                monthOf: this.inventoryAdjustment.monthOf,
                transactionType: this.inventoryAdjustment.transactionType,
                txnRate: this.inventoryAdjustment.txnRate,
                exchangeRate: this.inventoryAdjustment.exchangeRate,
                currency: this.inventoryAdjustment.currency,
                itemLine: dataRow,
                segment: this.inventoryAdjustment.segment,
                stockCount: this.inventoryAdjustment.stockCount || {},
                location: this.inventoryAdjustment.location,
                project: this.inventoryAdjustment.project,
                employee: this.inventoryAdjustment.employee,
                transactionNote: this.inventoryAdjustment.transactionNote,
                journalNote: this.inventoryAdjustment.journalNote,
                account: this.inventoryAdjustment.account,
                status: 1,
                createdAt: this.inventoryAdjustment.createdAt,
                amount: this.inventoryAdjustment.amount,
                exchangeAmount: this.inventoryAdjustment.exchangeAmount,
                qty: this.inventoryAdjustment.qty,
                loggedUser: this.loggedUser,
                isAutoGenerate: isAutoGenerate,
                jRaw: this.jRaw,
                actionType: this.$route.params.id ? this.$route.query.type : "new",
              };
              this.showLoading = true;
              billingHandler
                .inventoryAdjustment(data)
                .then((response) => {
                  if (response.data.statusCode === 201) {
                    this.showLoading = false;
                    this.$snotify.success("Successfully");
                    if (isSave == "new") {
                      this.clear();
                    } else if (isSave == "close") {
                      this.clear();
                      this.close();
                    }
                  }
                })
                .catch((e) => {
                  this.showLoading = false;
                  this.$snotify.error("Something went wrong");
                  this.errors.push(e);
                });
            }
          }, 10);
        });
      }
    },
    close() {
      window.history.go(-1);
    },
    clear() {
      this.baseCurrency = this.inventoryAdjustment.currency || {};
      this.inventoryAdjustment = new InventoryAdjustment({});
      this.loadPrefix();
      this.loadAccount();
      this.loadSegment();
      this.loadLocation();
      this.loadProjects();
      // this.loadSaleFormContent()
      this.inventoryAdjustment.currency = this.baseCurrency || {};
      let ds = this.$refs.itemLineDS.kendoWidget();
      ds.data([]);
      this.addRow();
      this.showLoading = false;
    },
    removeRow(e) {
      e.preventDefault();
      const grid = kendo.jQuery("#gridAdjustmentItemLine").data("kendoGrid"),
        dataSource = grid.dataSource,
        dataItem = grid.dataItem($(e.currentTarget).closest("tr"));

      if (dataSource.total() > 1) {
        dataSource.remove(dataItem);
        this.autoCalculate();
      }
    },
    errorMessage() {},
    accountDropDownEditor() {},
    cancel() {
      this.$swal({
        title: i18n.t("msg_title_warning"),
        text: i18n.t("msg_discard"),
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: i18n.t("cancel"),
        confirmButtonColor: "#4d4848",
        cancelButtonColor: "#ED1A3A",
        confirmButtonText: i18n.t("discard"),
      }).then((resultCen) => {
        if (resultCen.value) {
          this.$router.go(-1);
        }
      });
    },
    hideSmallSidebar() {
      this.isHideBar = !this.isHideBar;
    },
    async loadViewAdjustment() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          window.console.log(this.$route.params.id, "id");
          if (this.$route.params.id) {
            this.showLoading = true;
            const params = {
              id: this.$route.params.id,
              type: "Inventory Adjustment",
            };
            this.itemLines = [];
            billingHandler.inventoryAdjustmentList(params).then((res) => {
              if (res.data.statusCode === 200) {
                this.showLoading = false;
                const obj = res.data.data;
                if (obj.length > 0) {
                  this.inventoryAdjustment = res.data.data[0];
                  this.itemLines = this.inventoryAdjustment.itemLine;
                  // window.console.log(this.itemLines, '-')
                  this.transactionDate = this.inventoryAdjustment.transactionDate;
                  this.mEmployee = this.inventoryAdjustment.employee;
                  const account_ = this.inventoryAdjustment.account;
                  this.inventoryAdjustment.account = account_;

                  $("#gridAdjustmentItemLine")
                    .data("kendoGrid")
                    .dataSource.data(this.itemLines);
                  this.autoCalculate();
                } else {
                  this.clear();
                }
              }
            });
          } else {
            this.showLoading = false;
            this.clear();
            // this.initData();
          }
        }, 10);
      });
    },
    async loadStockCount(type) {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = true;
          // const startDate = "";
          // const endDate = "";
          // const strFilter = "?start=" + startDate + "&end=" + endDate + "&type=" + type;
          const params = {
            type: type,
            key: {},
            countStatus: 1,
          };
          billingHandler.inventoryAdjustmentList(params).then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoading = false;
              const response = res.data.data;
              this.stockCounts = response; //.filter((n) => n.status === 1);
            } else {
              this.showLoading = false;
            }
          });
        }, 10);
      });
    },
    async loadViewStockCount() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          // window.console.log(this.$route.params.id, 'id')
          const stockCount = this.inventoryAdjustment.stockCount || {};
          const stockCountId = stockCount.id || "";
          if (stockCountId !== "") {
            this.showLoading = true;
            billingHandler
              .inventoryAdjustmentList("?id=" + stockCountId + "&type=Stock Count")
              .then((res) => {
                if (res.data.statusCode === 200) {
                  this.showLoading = false;
                  this.stockCount = res.data.data[0];
                } else {
                  this.showLoading = false;
                }
              });
          }
        }, 10);
      });
    },
    async loadBizSetting() {
      let bizSetting = localStorage.getItem("@bizSetting");
      let getS = JSON.parse(bizSetting);
      let bizTpe = getS.filter((obj) => {
        return obj.type == dataStore.businessType;
      });
      if (bizTpe.length > 0) {
        this.inventoryAdjustment.segment = bizTpe[0].segment;
        this.bizSetting = bizTpe[0];
      }
    },
  },
  watch: {
    // id() {
    //   // window.console.log('id--', this.$route.params.id)
    //   if (this.$route.params.id === undefined) {
    //     this.initData();
    //   } else {
    //     this.showLoading = true;
    //     this.loadViewAdjustment();
    //     this.showLoading = false;
    //   }
    // },
    $route: "loadViewAdjustment",
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    // this.loadObj()
  },
  async mounted() {
    this.loadSaleFormContent();
    this.loadAccount();
    this.loadLocation();
    this.loadPrefix();
    this.loadSegment();
    this.loadProjects();
    this.loadEmployeeCenter();
    // await this.loadWarehouses()
    // await this.loadEmployeeCenter();
    this.loadStockCount("Stock Count");
    // this.loadViewAdjustment()
  },
  computed: {
    hiddenButton() {
      if (this.$route.query.type == "edit") {
        return true;
      } else {
        return false;
      }
    },
    appType() {
      return dataStore.productType;
    },
  },
};
</script>

<style scoped>
.small_sidebar {
  height: 95%;
  position: relative;
  padding: 12px;
}

.hide_small_bar_class {
  max-width: 0;
  transition: 0.5s ease-in;
  flex: 0 0 0;
  padding: 0;
}

.hide_big_bar_class {
  max-width: 100%;
  transition: 0.5s ease-in;
  flex: 0 0 100%;
}

.iconArrow {
  right: -35px;
  position: absolute;
  bottom: -10px;
}

.iconArrowHide {
  position: absolute;
  right: -7px;
  bottom: -10px;
}

.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background-color: transparent !important;
}

.detial_smallside_p {
  /*position: absolute;*/
  bottom: 10px;
}
</style>
