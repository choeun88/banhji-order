<template>
  <v-row>
    <v-col
      sm="12"
      cols="12"
      :class="
        productType !== 'Supply' &&
        productType !== 'Marketing' &&
        productType !== 'Service'
          ? ''
          : 'grayBg px-6'
      "
    >
      <v-card color="white" class="pa-3 no_border" elevation="0">
        <v-row class="">
          <v-col sm="7" cols="12" class="py-0">
            <h2 class="mb-0 font_020">{{ $t("customer_directory") }}</h2>
            <p>{{ $t("customer_directory_desc") }}</p>
          </v-col>
          <v-col sm="5" cols="12" class="py-1">
            <div
              v-if="
                productType !== 'Supply' &&
                productType !== 'Marketing' &&
                !productType == 'Service'
              "
            >
              <v-menu class="white--text capitalize float-right">
                <template v-slot:activator="{ on }">
                  <v-btn
                    color="primary"
                    class="ml-2 rounded-4 float-right text-capitalize white--text"
                    v-on="on"
                  >
                    {{ $t("add_new_customer") }}
                    <v-icon size="" class="ma-1">expand_more</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item link route to="individual_customer">
                    <v-list-item-title>
                      {{ $t("new_individual_customer") }}
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item link route to="company_customer">
                    <v-list-item-title>
                      {{ $t("new_company_customer") }}</v-list-item-title
                    >
                  </v-list-item>
                  <!-- <v-list-item @click="importShow">
                    <v-list-item-title> {{ $t("import_customer") }}</v-list-item-title>
                  </v-list-item> -->
                </v-list>
              </v-menu>
            </div>
            <div v-else>
              <v-btn
                color="primary"
                class="ml-2 rounded-4 float-right text-capitalize white--text"
                to="individual_customer"
              >
                {{ $t("add_new_customer") }}
              </v-btn>
            </div>
            <v-dialog persistent v-model="dialogm2" max-width="500px">
              <template v-slot:activator="{ on }">
                <v-btn
                  outlined
                  class="secondary--text mx-3 capitalize float-right"
                  color="primary"
                  v-on="on"
                  @click="importShow"
                >
                  {{ $t("import") }}
                </v-btn>
              </template>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-card>
                  <v-card-title>{{ $t("import_customer") }}</v-card-title>
                  <v-icon class="btn_close" @click="dialogm2 = false">close</v-icon>
                  <v-divider />
                  <v-card-text style="background-color: #edf1f5; color: #333333">
                    <v-row>
                      <v-col sm="12" cols="12" class="pb-0">
                        <label class="label">{{ $t("customer_type") }}</label>
                        <v-select
                          class="mt-1"
                          :placeholder="$t('select_type')"
                          outlined
                          v-model="impCusType"
                          :items="customerTypes"
                          @change="customerTypeChange"
                          item-value="value.id"
                          item-text="name"
                          return-object
                          required
                        />
                        <label class="label">{{ $t("group") }}</label>
                        <v-select
                          class="mt-1"
                          :placeholder="$t('select_group')"
                          outlined
                          v-model="impGroup"
                          :items="customerGroups"
                          item-value="value.id"
                          item-text="name"
                          return-object
                          required
                        />
                        <label class="mb-0">{{ $t("default_discount") }}</label>
                        <v-select
                          class="mt-1"
                          v-model="impDiscountItem"
                          :items="discountItems"
                          item-value="id"
                          item-text="name"
                          return-object
                          tage="Default Discount"
                          placeholder="0% discount"
                          outlined
                        />
                        <label class="label mb-0">{{ $t("payment_term") }}</label>
                        <v-select
                          class="mt-1"
                          :items="paymentTerms"
                          tage="Default Payment Term"
                          placeholder="Payment Term"
                          item-text="name"
                          item-value="id"
                          v-model="mPaymentTerm"
                          :rules="[(v) => !!v || $t('is_required')]"
                          return-object
                          outlined
                        />
                        <label class="mb-0">{{ $t("default_price_level") }}</label>
                        <v-select
                          class="mt-1"
                          v-model="impPriceLevel"
                          :items="priceLevels"
                          item-value="id"
                          item-text="name"
                          return-object
                          placeholder="Price Level"
                          tage="Default Price Level"
                          outlined
                        />
                        <label class="mb-0">{{ $t("customer_type") }}</label>
                        <v-select
                          class="mt-1"
                          v-model="mCustomerType"
                          :items="customerType"
                          placeholder="Customer type"
                          outlined
                        />
                        <v-row>
                          <v-col sm="6" cols="6" class="pb-0">
                            <upload-excel-component
                              :on-success="handleSuccess"
                              :before-upload="beforeUpload"
                            />
                          </v-col>
                          <v-col sm="6" cols="6" class="pb-0">
                            <v-btn
                              outlined
                              class="secondary--text capitalize float-right"
                              href="/files/importContact.xlsx"
                              download
                            >
                              <span class="">{{ $t("download_file") }}</span>
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-divider />
                  <v-col sm="12" cols="12" class="py-0">
                    <v-card-actions class="pa-4">
                      <v-row>
                        <v-col sm="6" cols="6" class="py-0 pl-0">
                          <v-btn
                            color="black"
                            outlined
                            class="text-capitalize black--text float-left"
                            @click="dialogm2 = false"
                            >{{ $t("cancel") }}
                          </v-btn>
                        </v-col>
                        <v-col sm="6" cols="6" class="py-0 pr-0">
                          <v-btn
                            color="secondary"
                            class="px-3 white--text text-capitalize float-right"
                            @click="saveImport"
                          >
                            {{ $t("save_close") }}
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-card-actions>
                  </v-col>
                </v-card>
              </v-form>
            </v-dialog>
          </v-col>
          <v-col sm="12" cols="12" class="pt-0">
            <v-row class="">
              <v-col sm="12" cols="12" class="py-0">
                <v-row class="">
                  <v-col sm="4" cols="12" class="py-0">
                    <v-text-field
                      class="mt-1"
                      @keypress.enter="onSearch(search)"
                      clearable
                      @click:clear="onSearch('')"
                      v-model="search"
                      :placeholder="$t('search_directory')"
                      outlined
                    />
                  </v-col>
                  <!-- <v-col sm="2" cols="12" class="py-0">
                    <v-select
                      class="mt-1"
                      :placeholder="$t('gender')"
                      outlined
                      v-model="gender"
                      :items="genders"
                      clearable
                    />
                  </v-col> -->

                  <v-col sm="1" cols="12" class="py-1">
                    <v-btn
                      color="primary"
                      class="white--text capitalize marginTopPhone"
                      @click="onSearch(search)"
                    >
                      <i class="b-search" style="font-size: 16px; color: #fff" />
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

            <v-row class="">
              <v-col sm="12" cols="12" class="py-0 custom_pagination dir-pager">
                <v-btn
                  :loading="laodExcel"
                  color="primary"
                  style="height: 28px !important; border-radius: 2px !important"
                  class="text--white capitalize"
                  @click="excelExportBtn"
                  >Export to Excel</v-btn
                >
                <kendo-datasource
                  ref="dataSourceDirection"
                  :data="customersDirectory"
                  :sort="sort"
                  :group="group"
                />
                <kendo-grid
                  id="gridCDirectory"
                  class="grid-function"
                  :data-source-ref="'dataSourceDirection'"
                  :editable="false"
                  :groupable="true"
                  :noRecords="true"
                  :sortable="true"
                  :excel-file-name="'CustomerDirectory.xlsx'"
                  :excel-export="excelExport"
                  :excel-all-pages="true"
                  :column-menu="true"
                  :resizable="true"
                  :pageable="true"
                  :scrollable-virtual="true"
                >
                  <kendo-grid-column
                    :field="'id'"
                    :hidden="true"
                    :width="150"
                    :title="$t('id')"
                    :template="'<span>#= id || ``#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'number'"
                    :hidden="true"
                    :width="150"
                    :title="$t('number')"
                    :template="'<span>#= abbr #-#= number || ``#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'crn'"
                    :hidden="true"
                    :width="150"
                    :title="$t('crn')"
                    :template="'<span>#= crn || ``#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'connectId'"
                    :hidden="true"
                    :width="150"
                    :title="$t('connect_id')"
                    :template="'<span>#= connectId || ``#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'taxId'"
                    :hidden="true"
                    :width="150"
                    :title="$t('vatin')"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'registeredDate'"
                    :title="$t('registered_date')"
                    :width="200"
                    :hidden="true"
                    :template="'<span>#= kendo.toString(new Date(registeredDate), `dd-MM-yyyy`)#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'name'"
                    :title="$t('name')"
                    :width="200"
                    :template="'<span>#= name#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'gender'"
                    :hidden="true"
                    :width="150"
                    :title="$t('gender')"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'dob'"
                    :hidden="true"
                    :width="150"
                    :title="$t('dob')"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'priceLevel'"
                    :title="$t('price_level')"
                    :width="150"
                    :template="'<span>#= priceLevel#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'creditLimit'"
                    :title="$t('credit_limit')"
                    :width="150"
                    :attributes="{ style: 'text-align: right; ' }"
                    :template="'<span>#=kendo.toString(creditLimit, decimalFormat)#</span>'"
                    :headerAttributes="{
                      style: 'text-align: right; background-color: #EDF1F5',
                    }"
                  />
                  <kendo-grid-column
                    :field="'customerType'"
                    :hidden="true"
                    :title="$t('type')"
                    :width="200"
                    :group-header-template="'#=value#'"
                    :template="'<span>#= customerType#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'group'"
                    :title="$t('customer_group')"
                    :hidden="true"
                    :width="120"
                    :template="'<span>#= group #</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'discount.name'"
                    :title="$t('discount')"
                    :hidden="true"
                    :width="120"
                    :template="'<span>#= discount.name #</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />

                  <kendo-grid-column
                    :field="'saleDepositAcc'"
                    :hidden="true"
                    :title="$t('sale_deposit')"
                    :width="200"
                    :template="'<span>#= saleDepositAcc#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'receivableAcc'"
                    :hidden="true"
                    :width="200"
                    :title="$t('account_receivable')"
                    :template="'<span>#= receivableAcc#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'unearnRevenueAcc'"
                    :hidden="true"
                    :width="200"
                    :title="$t('unearn_revenue_account')"
                    :template="'<span>#= unearnRevenueAcc#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'phoneNumber'"
                    :title="$t('phone')"
                    :width="120"
                    :template="'<span>#= phoneNumber#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'email'"
                    :title="$t('email')"
                    :width="150"
                    :template="'<span>#= email#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'billingAddress'"
                    :title="$t('billing_address')"
                    :width="150"
                    :hidden="true"
                    :template="'<span>#= billingAddress#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'deliveryAddress'"
                    :title="$t('delivery_address')"
                    :width="150"
                    :hidden="true"
                    :template="'<span>#= deliveryAddress#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'contactAddress'"
                    :title="$t('contact_addr')"
                    :width="150"
                    :hidden="true"
                    :template="'<span>#= contactAddress#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />

                  <kendo-grid-column
                    :field="''"
                    :title="$t('action')"
                    :visible="true"
                    :width="90"
                    :command="[
                      { iconClass: 'k-icon k-i-edit', text: ' ', click: goEdit },
                    ]"
                    :headerAttributes="{
                      style: 'text-align: center; background-color: #EDF1F5',
                    }"
                    :attributes="{ style: 'text-align: center' }"
                  />
                </kendo-grid>
                <LoadingMe
                  :isLoading="showLoading"
                  :fullPage="false"
                  :myLoading="true"
                  type="loading"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import kendo from "@progress/kendo-ui";
import JSZip from "jszip";
import { i18n } from "@/i18n";
import customerGroupHandler from "@/scripts/customerGroupHandler";
import customerTypeHandler from "@/scripts/customerTypeHandler";
import priceLevelHandler from "@/scripts/priceLevelHandler";
import discountItemHandler from "@/scripts/discountItemHandler";
const settingsHandler = require("@/scripts/settingsHandler");
import { exportExelFormat } from "@/utils";
const OPTION_TYPE = "?type=Sale";
window.JSZip = JSZip;
const cookieJS = require("@/cookie.js");
const cookie = cookieJS.getCookie();
const customerHandler = require("@/scripts/customerHandler");
import UploadExcelComponent from "@/components/upload_excel/TimeCard.vue";
import { dataStore } from "@/observable/store";
const $ = kendo.jQuery; //require("jquery")
const strFilterTerm = "?type=pmt-customer";
export default {
  data: () => ({
    dialogm2: false,
    valid: true,
    showLoading: false,
    start_date: "",
    end_date: "",
    search: "",
    params: {
      isDonor: false,
      search: "",
      type: "cus",
      key: {},
    },
    customersDirectory: [],
    group: { field: "customerType" },
    impCusType: {},
    customerGroups: [],
    customerTypes: [],
    priceLevels: [],
    impPriceLevel: {},
    tableData: [],
    impDiscountItem: {},
    discountItems: [],
    impDepositAcc: {},
    impDiscountAcc: {},
    impGroup: {},
    loggedUser: {
      id: cookie.creator,
      name: cookie.email,
    },
    paging: {},
    customers: [],
    customerType: ["Individual", "Company"],
    genders: ["Male", "Female", "Others"],
    gender: "",
    mCustomerType: "Company",
    disabledMe: true,
    sort: { field: "number", dir: "ASC" },
    mPaymentTerm: {},
    paymentTerms: [],
    pageIndex: 0,
    laodExcel: false,
    stopped: false,
  }),
  components: {
    LoadingMe: () => import(`@/components/Loading`),
    "upload-excel-component": UploadExcelComponent,
  },
  props: {},
  methods: {
    async excelExportBtn() {
      let dataExportExcel = [];
      this.params = {
        search: this.search,
        type: "cus",
        key: {},
        gender: this.gender || "",
      };

      let i = 0;
      this.laodExcel = true;
      this.stopped = false;
      try {
        while (!this.stopped) {
          i++;
          let getAll = await customerHandler.directory(this.params);
          this.params.key = getAll.data.key;
          if (i >= 100) {
            getAll.data.key = "";
          }
          dataExportExcel = dataExportExcel.concat(getAll.data.data);
          if (Object.keys(getAll.data.key).length == 0 || getAll.data.key == "") {
            this.stopped = true;
            this.transactions = dataExportExcel;
            setTimeout(() => {
              const grid = kendo.jQuery("#gridCDirectory").data("kendoGrid");
              grid.saveAsExcel();
            }, 1000);
            setTimeout(() => {
              this.laodExcel = false;
              const byCustomer = this.customers.at(this.pageIndex);
              this.customersDirectory = byCustomer;
              dataExportExcel = [];
            }, 2000);
          }
          if (i > 100) {
            this.stopped = true;
          }
        }
      } catch (e) {
        this.stopped = true;
        window.console.log(e);
      }
    },
    excelExport: function (e) {
      let filterExcel = {
        title: i18n.t("customer_directory"),
      };
      // e.workbook.sheets[0].title = i18n.t("sale_by_customers");
      exportExelFormat(e, filterExcel);
    },
    async loadPaymentTerm() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          settingsHandler.getPaymentTerm(strFilterTerm).then((res) => {
            this.showLoading = false;
            this.paymentTerms = [];
            if (res.data.statusCode === 200) {
              this.paymentTerms = res.data.data;
              if (this.paymentTerms.length > 0) {
                this.mPaymentTerm = this.paymentTerms.filter((k) => k.name === "COD")[0];
              }
            }
          });
        }, 10);
      });
    },

    importShow() {
      //
      this.impCusType = this.customerTypes[0];
      this.impGroup = {};
      if (this.discountItems.length > 0) {
        this.impDiscountItem = this.discountItems[0];
      }
      if (this.priceLevels.length > 0) {
        this.impPriceLevel = this.priceLevels[0];
      }
      this.customerTypeChange();
    },
    customerTypeChange() {
      const c = this.impCusType;
      window.console.log(c, "cus type");
      this.impDepositAcc = c.saleDepositAcc;
      this.impDiscountAcc = c.saleDiscountAcc;
      this.impReceivableAcc = c.receivableAcc;
      // if(Object.keys(c.priceLevel).length > 0){
      //     this.impPriceLevel = c.priceLevel
      // }
      // window.console.log(c, 'cust type')
    },
    saveImport() {
      if (this.tableData.length > 0) {
        let data = {
          data: this.tableData,
        };
        this.showLoading = true;
        window.console.log(data, "here data");
        customerHandler
          .importCreate(data)
          .then((response) => {
            this.showLoading = false;
            if (response.data.statusCode === 201) {
              this.$refs.form.reset();
              this.$snotify.success("Successfully");
              this.dialogm2 = false;
            }
          })
          .catch((e) => {
            this.showLoading = false;
            this.$snotify.error("Something went wrong");
            this.errors.push(e);
          });
      }
    },
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (isLt1M) {
        return true;
      }
      this.$message({
        message: "Please do not upload files larger than 1m in size.",
        type: "warning",
      });
      return false;
    },
    handleSuccess({ results, header }) {
      results.forEach((element) => {
        const c = this.impCusType;
        element.paymentTerm = this.mPaymentTerm;
        element.customerType = this.impCusType;
        element.type = "Individual";
        element.abbr = c.abbr;
        element.isDonor = false;
        element.taxId = "";
        element.status = 1;
        let a = element.gender;
        let g = a.charAt(0).toUpperCase() + a.slice(1);
        element.contactAddress = {
          gender: g,
          phoneNumber: element.phoneNumber,
          email: element.email,
          dob: element.dob,
          address: [],
          latitude: "",
          longitude: "",
        };
        element.paymentBilling = {
          customerGroup: this.impGroup,
          paymentTerm: this.mPaymentTerm,
          paymentOption: {},
          assignTo: {},
          discountItem: this.impDiscountItem,
          priceLevel: this.impPriceLevel,
        };
        element.accountTax = {
          receivableAcc: this.impReceivableAcc,
          saleDepositAcc: this.impDepositAcc,
          saleDiscountAcc: this.impDiscountAcc,
          saleTax: c.saleTax,
          unearnRevenueAcc: c.unearnRevenueAcc || {},
        };
        element.group = this.impGroup;
        element.type = this.mCustomerType || "Company";
        element.loggedUser = this.loggedUser;
        element.priceLevel = this.impPriceLevel;
        element.cashPayment = c.cashPayment || {};
        element.qrPayment = c.qrPayment || {};
        element.bankTransfer = c.bankTransfer || {};
        element.billPayment = c.billPayment || {};
        element.saveOption = "imported";
      });
      this.tableData = results;
      this.tableHeader = header;
      window.console.log(this.tableData, this.tableHeader, "dataaaaa");
    },
    dataBound: function () {
      const grid = kendo.jQuery("#gridCDirectory").data("kendoGrid");
      if (grid) {
        if (grid.columns) {
          for (let i = 0; i < grid.columns.length; i++) {
            grid.autoFitColumn(i);
          }
        }
      }
    },
    async loadCustomerCenter() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          // this.customers = [];
          this.showLoading = true;
          this.disabledNextPage(true);
          window.console.log("param", this.params);
          customerHandler.directory(this.params).then((res) => {
            this.showLoading = true;
            if (res.data.statusCode === 200) {
              this.showLoading = false;
              const responseData = res.data.data || [];
              this.customersDirectory = responseData;
              this.customers.push(responseData); // = this.customers.concat(responseData)
              this.paging = res.data.key;
              if (Object.keys(this.paging).length > 0) {
                this.disabledNextPage(false);
              } else {
                this.disabledNextPage(true);
              }
              // this.refreshGridData(responseData)
              this.itemRetuned(this);
              window.console.log("customers", this.customers);
            }
          });
        }, 10);
      });
    },
    onSearch(search) {
      // window.console.log(this.search, "search");
      // if (this.search !== '') {
      //     this.paging = {}
      // }
      this.customers = [];
      // $('.k-pager-wrap').empty()
      // $('.page-number').empty();
      this.loadPage(this);
      this.params = {
        search: search,
        type: "cus",
        key: {},
        gender: this.gender || "",
      };
      this.loadCustomerCenter();
      // if(this.search){
      //
      // }
    },
    goEdit(e) {
      e.preventDefault();
      let grid = kendo.jQuery("#gridCDirectory").data("kendoGrid");
      let dataItem = grid.dataItem(kendo.jQuery(e.currentTarget).closest("tr"));
      window.console.log(dataItem, "dataItem1245");
      if (dataItem.type === "Company") {
        this.$router.push({
          path: "company_customer" + `/${dataItem.id}`,
          params: { id: dataItem.id },
          query: { type: "edit" },
        });
      } else {
        this.$router.push({
          path: "individual_customer" + `/${dataItem.id}`,
          params: { id: dataItem.id },
          query: { type: "edit" },
        });
      }
    },
    async loadCustomerGroup() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          customerGroupHandler.get().then((res) => {
            this.showLoading = false;
            this.customerGroups = res;
          });
        }, 10);
      });
    },
    async loadCustomerType() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          customerTypeHandler.get().then((res) => {
            this.customerTypes = res;
            // this.customerTypes = res.filter((m) => {
            //     return m.nature.name.includes("Individual");
            // });
          });
        }, 10);
      });
    },
    async loadPriceLevel() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          priceLevelHandler.get().then((res) => {
            this.priceLevels = res;
          });
        }, 10);
      });
    },
    async loadDiscountItems() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = true;
          discountItemHandler.list(OPTION_TYPE).then((res) => {
            this.showLoading = false;
            this.discountItems = res.data.data;
          });
        }, 10);
      });
    },
    async loadPage(that) {
      $(".dir-pager .k-pager-wrap").html(`
                <label class="label dir-item-returned">0</label>
                <div style="display: flex; flex-direction: 'row'">
                    <button class="dir-next-page" title="previous" style="width: 24px; font-size: 19px;"> < </button>
                    <ul class="dir-page-number" style="display: flex;list-style: none; padding-left: 0px;">
                        <li style="padding: 6px;"  data-page="1" class="dir-page-link text-bold-link" >1</li>
                    </ul>
                    <button class="dir-next-page" title="next" style="width: 24px; font-size: 19px;"> > </button>
                </div>
            `);
      $(document).on("click", ".dir-page-link", function () {
        const page = $(this).data("page");
        $(".dir-page-link").removeClass("text-bold-link");
        $(this).addClass("text-bold-link");
        that.backToPage(that, page - 1);
        that.pageIndex = page - 1;
        window.console.log(page - 1);
      });
      // $(document).on('click', '.dir-next-page', function () {
      $(".dir-next-page").click(function () {
        const page_number = $(this)
          .parent()
          .children(".dir-page-number")
          .find("li")
          .last()
          .data("page");
        window.console.log("page_number", page_number);
        that.pageIndex = page_number;
        const isPrevious = $(this).attr("title");
        if (isPrevious == "previous") {
          const currectpage = $(".text-bold-link").data("page");

          if (currectpage == 1) {
            return;
          }
          $(".dir-page-link").removeClass("text-bold-link");
          $(`.dir-page-link:eq(${currectpage - 1})`).addClass("text-bold-link");
          that.backToPage(that, currectpage - 2);
          window.console.log("this currectpage back", currectpage - 2);
        } else {
          $(".dir-page-link").removeClass("text-bold-link");
          that.params = {
            search: that.search || "",
            type: "cus",
            key: that.paging,
          };
          that.loadCustomerCenter();
          $(this)
            .parent()
            .children(".dir-page-number")
            .append(
              `<li class="dir-page-link text-bold-link" style="padding: 6px;" data-page="${
                page_number + 1
              }">${page_number + 1}</li>`
            );
        }
        window.console.log("this", page_number + 1);
      });
    },
    itemRetuned(that) {
      let totalRow = 0;
      that.customers.forEach((k) => {
        totalRow += k.length;
      });
      $(".dir-item-returned").text("Items returned (" + totalRow + ")");
    },
    disabledNextPage(value) {
      $(".dir-next-page").prop("disabled", value);
    },
    backToPage(that, index) {
      try {
        window.console.log("Length of customer", that.customers.length);
        const customer = that.customers.at(index);
        that.customersDirectory = customer;
        // that.refreshGridData(customer)
        window.console.log("that.customers[index]", customer);
      } catch (e) {
        window.console.log("ERROR on backToPage", index);
      }
    },
    refreshGridData(data) {
      $("#gridCDirectory").data("kendoGrid").dataSource.data([]);
      $("#gridCDirectory").data("kendoGrid").dataSource.data(data);
    },
  },
  async mounted() {
    // await this.loadCustomerCenter();
    await this.loadCustomerGroup();
    await this.loadCustomerType();
    await this.loadPriceLevel();
    await this.loadDiscountItems();
    await this.loadPaymentTerm();
    this.loadPage(this);
    this.itemRetuned(this);
    this.disabledNextPage(true);
    // document.getElementsByClassName("next-page").disabled=true;
  },
  computed: {
    productType() {
      return dataStore.productType;
    },
  },
  watch: {
    // $route: "loadCustomerCenter",
  },
};
</script>
<style scoped>
.acc_group header {
  height: 10px !important;
}

table.acc_group tr td {
  border-bottom: 1px solid #ccc;
  padding: 8px;
  vertical-align: middle;
}

table.acc_group tr td:first-child {
  font-weight: 700;
}

table.acc_group tr td:last-child {
  text-align: center;
}

.v-card__actions .v-btn.v-btn {
  padding: 0 16px;
}

.exchange-table.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > thead
  > tr
  > th {
  font-family: "Niradei-Bold", serif;
  color: #000 !important;
  border-top: 1px solid #000 !important;
  border-bottom: 1px solid #000 !important;
  font-size: 15px !important;
}

.exchange-table.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > thead
  > tr
  > td {
  color: #000 !important;
  padding: 5px !important;
}

.exchange-table.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:last-child
  td {
  border-bottom: 1px solid #000 !important;
}

.function_footer {
  padding: 15px;
  display: inline-block;
}

p {
  color: rgba(0, 0, 0, 0.87);
}

.actionBtn {
  height: 47.2px !important;
}

.text_tip {
  font-size: 9px;
  line-height: 10px;
}

@media (max-width: 576px) {
  .marginTopPhone {
    margin-top: -10px;
  }
}
</style>
