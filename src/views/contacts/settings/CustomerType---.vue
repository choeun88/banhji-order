<template>
  <v-row>
    <v-col sm="9" cols="12" class="pt-0">
      <div>
        <h2 class="mb-0 font_020">{{ $t("customer_type") }}</h2>
        <p class="mb-0">{{ $t("customer_type_desc") }}</p>
      </div>
    </v-col>
    <v-col sm="3" cols="12" class="pt-0">
      <v-dialog persistent v-model="dialogM2" max-width="680px">
        <template v-slot:activator="{ on }">
          <v-btn
            class="white--text float-right text-upper"
            color="primary"
            v-on="on"
            @click="onNewClick"
          >
            {{ $t("create_new") }}
          </v-btn>
        </template>
        <v-card>
          <div class="modal_header">
            <v-card-title>{{ $t("type") }}</v-card-title>
            <v-icon @click="dialogM2 = false">close</v-icon>
          </div>

          <v-card-text class="modal_text_content">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row class="pt-3">
                <v-col sm="12" cols="12" class="py-0">
                  <v-row>
                    <v-col class="py-0" sm="6" cols="12">
                      <label class="label">{{ $t("type_name") }}</label>
                      <v-text-field
                        class="mt-1"
                        outlined
                        :rules="[(v) => !!v || $t('name_is_required')]"
                        v-model="customerType.name"
                        placeholder="Type Name"
                      />

                      <label class="label">{{ $t("abbreviation") }}</label>
                      <v-text-field
                        class="mt-1"
                        outlined
                        tage="Abbreviation"
                        v-model="customerType.abbr"
                        placeholder="Abbr"
                        :rules="[(v) => !!v || $t('is_required')]"
                      />

                      <label class="label">{{ $t("sale_deposit") }}</label>
                      <v-autocomplete
                        class="mt-1"
                        outlined
                        :loading="accDeposit.length === 0"
                        :items="accDeposit"
                        return-object
                        :item-text="
                          (item) =>
                            `${item.number} - ${
                              this.$store.state.accounting.accountLanguage === 'English'
                                ? item.name
                                : item.local_name
                            }`
                        "
                        tage="PurchaseDeposit"
                        :rules="[(v) => !!v['id'] || $t('is_required')]"
                        item-value="id"
                        v-model="customerType.saleDepositAcc"
                      >
                      </v-autocomplete>
                      <label class="label">{{ $t("unearn_revenue_account") }}</label>
                      <v-select
                        class="mt-1"
                        outlined
                        :loading="unearnAcc.length === 0"
                        return-object
                        id=""
                        :items="unearnAcc"
                        :item-text="
                          (item) =>
                            `${item.number} - ${
                              this.$store.state.accounting.accountLanguage === 'English'
                                ? item.name
                                : item.local_name
                            }`
                        "
                        tage="unearnRevenueAcc"
                        item-value="id"
                        :rules="[(v) => !!v['id'] || $t('is_required')]"
                        v-model="customerType.unearnRevenueAcc"
                      />
                      <label class="label">{{ $t("qr_payment") }}</label>
                      <v-select
                        class="mt-1"
                        outlined
                        return-object
                        id=""
                        :items="qrPayment"
                        item-text="name"
                        tage="PaymentOption"
                        item-value="id"
                        clearable
                        v-model="customerType.qrPayment"
                      />
                      <label class="label">{{ $t("bank_transfer") }}</label>
                      <v-select
                        class="mt-1"
                        outlined
                        return-object
                        clearable
                        id=""
                        :items="bankTransfer"
                        item-text="name"
                        tage="PaymentOption"
                        item-value="id"
                        v-model="customerType.bankTransfer"
                      />
                    </v-col>
                    <v-col class="py-0" sm="6" cols="12">
                      <label class="label">{{ $t("nature") }}</label>
                      <v-select
                        class="mt-1"
                        id=""
                        :items="natures"
                        item-text="name"
                        tage="Nature"
                        item-value="id"
                        :rules="[(v) => !!v['id'] || $t('is_required')]"
                        v-model="customerType.nature"
                        placeholder="Nature"
                        outlined
                        return-object
                      />
                      <label class="label">{{ $t("account_receivable") }}</label>
                      <v-autocomplete
                        class="mt-1"
                        outlined
                        :loading="receivableAcc.length === 0"
                        :items="receivableAcc"
                        return-object
                        :item-text="
                          (item) =>
                            `${item.number} - ${
                              this.$store.state.accounting.accountLanguage === 'English'
                                ? item.name
                                : item.local_name
                            }`
                        "
                        tage="AccountReceivable"
                        :rules="[(v) => !!v['id'] || $t('is_required')]"
                        item-value="id"
                        v-model="customerType.receivableAcc"
                      >
                      </v-autocomplete>
                      <label class="label">{{ $t("default_price_level") }}</label>
                      <v-autocomplete
                        class="mt-1"
                        id=""
                        :loading="priceLevel.length === 0"
                        :items="priceLevel"
                        item-text="name"
                        :rules="[(v) => !!v['id'] || $t('is_required')]"
                        v-model="customerType.priceLevel"
                        placeholder="Default price level"
                        outlined
                        return-object
                      >
                      </v-autocomplete>
                      <!-- <label class="label">{{ $t("default_tax") }}</label> -->
                      <!-- <v-select
                        class="mt-1"
                        id=""
                        :items="vat"
                        item-text="defaultTax"
                        tage="Tax"
                        item-value="id"
                        v-model="customerType.saleTax"
                        placeholder="Default Tax"
                        outlined
                        return-object
                      /> -->
                      <label class="label">{{ $t("payment_term") }}</label>
                      <v-select
                        class="mt-1"
                        id=""
                        :items="paymentTerm"
                        item-text="name"
                        tage="PaymentTerm"
                        item-value="id"
                        v-model="customerType.paymentTerm"
                        placeholder="Default Term"
                        outlined
                        return-object
                      />
                      <label class="label">{{ $t("cash_payment") }}</label>
                      <v-select
                        class="mt-1"
                        outlined
                        return-object
                        id=""
                        :items="cashPayment"
                        item-text="name"
                        tage="PaymentOption"
                        item-value="id"
                        :rules="[(v) => !!v['id'] || $t('is_required')]"
                        v-model="customerType.cashPayment"
                      />
                      <label class="label">{{ $t("bill_payment") }}</label>
                      <v-select
                        class="mt-1"
                        outlined
                        return-object
                        id=""
                        clearable
                        :items="billPayment"
                        item-text="name"
                        tage="PaymentOption"
                        item-value="id"
                        v-model="customerType.billPayment"
                      />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-divider />
          <v-card-actions class="modal_footer">
            <v-row>
              <v-col sm="6" cols="6" class="py-0">
                <v-btn
                  color="black"
                  outlined
                  class="text-capitalize black--text float-left"
                  @click="dialogM2 = false"
                  >{{ $t("cancel") }}
                </v-btn>
              </v-col>
              <v-col sm="6" cols="6" class="py-0">
                <v-btn
                  color="primary"
                  :disabled="disabled"
                  class="px-3 white--text text-capitalize float-right"
                  @click.native="onSaveClose"
                >
                  {{ $t("save_close") }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>

    <v-col sm="12" cols="12">
      <template>
        <LoadingMe
          :isLoading="showLoading"
          :fullPage="false"
          type="loading"
          :myLoading="true"
        />
        <kendo-datasource ref="dataSource" :data="customerTypes" />
        <kendo-grid
          id="gridCustomerType"
          class="grid-function"
          :data-source-ref="'dataSource'"
          :sortable="false"
          :filterable="false"
          :noRecords="true"
          :column-menu="true"
          :hidden="true"
          :resizable="true"
          :toolbar="toolbarTemplate"
          :scrollable-virtual="true"
        >
          <kendo-grid-column
            :field="'name'"
            :title="$t('name')"
            :template="'<span>#=name#</span>'"
            :group-footer-template="'Total: '"
            :width="200"
            :headerAttributes="{
              style: 'background-color: #EDF1F5',
            }"
          />
          <kendo-grid-column
            :field="'abbr'"
            :title="$t('abbr')"
            :width="100"
            :headerAttributes="{
              style: 'background-color: #EDF1F5',
            }"
          />
          <kendo-grid-column
            :field="'nature.name'"
            :title="$t('nature')"
            :template="'<span>#=nature.name#</span>'"
            :width="200"
            :headerAttributes="{ style: 'background-color: #EDF1F5' }"
          />
          <kendo-grid-column
            :field="'receivableAcc'"
            :title="$t('account_receivable')"
            :template="
              this.$store.state.accounting.accountLanguage === 'English'
                ? '<span>#=receivableAcc.number#</span> - <span>#=receivableAcc.name#</span>'
                : '<span>#=receivableAcc.number#</span> - <span>#=receivableAcc.local_name#</span>'
            "
            :headerAttributes="{ style: 'background-color: #EDF1F5' }"
          />
          <kendo-grid-column
            :field="'saleDepositAcc'"
            :title="$t('sale_deposit')"
            :hidden="true"
            :template="
              this.$store.state.accounting.accountLanguage === 'English'
                ? '<span>#=saleDepositAcc.number#</span> - <span>#=saleDepositAcc.name#</span>'
                : '<span>#=saleDepositAcc.number#</span> - <span>#=saleDepositAcc.local_name#</span>'
            "
            :headerAttributes="{ style: 'background-color: #EDF1F5' }"
          />
          <kendo-grid-column
            :field="'unearnRevenueAcc'"
            :title="$t('unearn_revenue_account')"
            :hidden="true"
            :template="
              this.$store.state.accounting.accountLanguage === 'English'
                ? '<span>#=unearnRevenueAcc.number#</span> - <span>#=unearnRevenueAcc.name#</span>'
                : '<span>#=unearnRevenueAcc.number#</span> - <span>#=unearnRevenueAcc.local_name#</span>'
            "
            :headerAttributes="{ style: 'background-color: #EDF1F5' }"
          />
          <kendo-grid-column
            :command="{
              iconClass: 'k-icon k-i-edit',
              text: $t('edit'),
              click: onEditClick,
              class: 'btn-plus',
            }"
            :title="$t('action')"
            :width="100"
            :headerAttributes="{
              style: 'text-align: left; background-color: #EDF1F5',
            }"
          />
        </kendo-grid>
      </template>
    </v-col>
  </v-row>
</template>

<script>
import { dataStore } from "@/observable/store";
import CustomerTypeModel from "@/scripts/model/CustomerType";
import AccountMappingModel from "@/scripts/account-map/Account";
import priceLevelHandler from "@/scripts/priceLevelHandler";
import kendo from "@progress/kendo-ui";

const $ = kendo.jQuery;
import TaxModel from "@/scripts/model/Tax";
import PriceLevelModel from "@/scripts/priceLevel/PriceLevel";
import PaymentOptionModel from "@/scripts/model/PaymentOption";
import PaymentTermModel from "@/scripts/model/PaymentTerm";
const paymentOptionHandler = require("@/scripts/paymentOptionHandler");

const accountHandler = require("@/scripts/handler/accounting/account");
const customerTypeHandler = require("@/scripts/customerTypeHandler");
const otherHandler = require("@/scripts/otherHandler");
const settingsHandler = require("@/scripts/settingHandler");
const settingHandler = require("@/scripts/settingsHandler");
const { PAYMENT_OPINION_TYPE } = require("@/scripts/default_setup/Setting");

const customerTypeModel = new CustomerTypeModel({});
// const OPTION_TYPE = 'Customer'
// const strFilter = '?optionType=' + OPTION_TYPE
const strFilterTerm = "?type=pmt-customer";
import JSZip from "jszip";

window.JSZip = JSZip;
export default {
  components: {
    LoadingMe: () => import(`@/components/Loading`),
  },
  data: () => ({
    dialogM2: "",
    disabled: false,
    valid: false,
    showLoading: true,
    natures: [],
    mNature: {},
    customerType: customerTypeModel,
    customerTypes: [],
    receivableAcc: [],
    mReceivableAcc: [],
    accDeposit: [],
    mAccDeposit: [],
    unearnAcc: [],
    mUnearnAcc: [],
    tax: [],
    vat: [],
    mVAT: [],
    mShipVAT: [],
    paymentMethodF: ["Cash Payment", "Bill Payment", "QR Payment", "Bank Transfer"],
    mPaymentMethod: "Cash Payment",
    paymentTerm: [],
    mPaymentTerm: {},
    priceLevel: [],
    cashPayment: [],
    billPayment: [],
    qrPayment: [],
    bankTransfer: [],
  }),
  props: {},
  computed: {
    appType() {
      return dataStore.productType;
    },
  },
  watch: {},
  methods: {
    excelExport: function (e) {
      // const pivot = this.$refs.gridTransactionDS.kendoWidget()
      // pivot.saveAsExcel()
      window.console.log(e.data);
    },
    initToolbar(that) {
      let grid = $("#gridCustomerType").data("kendoGrid");
      let gridElement = grid.element;
      let toolbarElement = gridElement.find(".k-grid-toolbar");
      toolbarElement.on("click", ".k-pager-refresh", function (e) {
        e.preventDefault();
        onReloadData(that);
      });
      toolbarElement.on("click", ".k-pager-excel", function (e) {
        e.preventDefault();
        onExportExcel(that);
      });

      function onReloadData(that) {
        that.loadCustomerType();
      }

      function onExportExcel(that) {
        that.exportToExcel();
      }
    },
    toolbarTemplate: function () {
      const templateHtml =
        // "<span>" +
        // '<a class="k-pager-excel k-link k-button excel" title="Export to Excel"> <span class="k-icon k-i-excel"></span>Export to excel </a>' +
        // "</span><span>&nbsp;&nbsp;</span>" +
        // '<span style="position:absolute; right:5px">' +
        // "</span>" +
        "<span>" +
        '<a class="k-pager-refresh k-link k-button reload" title="Refresh"><span class="k-icon k-i-reload"></span> Refresh </a>' +
        "</span>";

      return kendo.template(templateHtml);
    },
    onNewClick() {
      this.customerType = {};
      this.customerType.id = "";
      this.clear();
    },
    close() {
      this.dialogM2 = false;
    },
    clear() {
      this.customerType = new CustomerTypeModel({});
      this.mNature = {};
    },
    async onEditClick(e) {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          e.preventDefault();
          let grid = kendo.jQuery("#gridCustomerType").data("kendoGrid");
          let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
          this.customerType = dataItem;
          window.console.log("customerType", dataItem);
          // window.console.log(this.customerType, 'customerType')
          // this.mNature = value.nature
          // this.mReceivableAcc = value.receivableAcc
          // this.mVAT = value.saleTax
          // this.mAccDeposit = value.saleDepositAcc
          // this.mAccDiscount = value.unearnRevenueAcc
          // // this.mPaymentTerm = value.paymentTerm
          // this.mPaymentMethod = value.paymentOption
          this.dialogM2 = true;
        }, 10);
      });
    },
    async onSaveClose() {
      if (!this.$refs.form.validate()) {
        this.$refs.form.validate();
        return;
      }
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          // window.console.log(this.mPaymentMethod)
          const nature_ = this.customerType.nature || {};
          const nature = {
            id: nature_.id || "",
            name: nature_.name || "",
            isSystem: nature_.isSystem || 0,
          };
          let data = {
            id: this.customerType.id ? this.customerType.id : "",
            name: this.customerType.name,
            abbr: this.customerType.abbr,
            nature: nature,
            paymentTerm: new PaymentTermModel(this.customerType.paymentTerm),
            receivableAcc: new AccountMappingModel(this.customerType.receivableAcc),
            saleTax: new TaxModel(this.customerType.saleTax),
            saleDepositAcc: new AccountMappingModel(this.customerType.saleDepositAcc),
            unearnRevenueAcc: new AccountMappingModel(this.customerType.unearnRevenueAcc),
            priceLevel: new PriceLevelModel(this.customerType.priceLevel),
            cashPayment: new PaymentOptionModel(this.customerType.cashPayment),
            qrPayment: new PaymentOptionModel(this.customerType.qrPayment),
            bankTransfer: new PaymentOptionModel(this.customerType.bankTransfer),
            billPayment: new PaymentOptionModel(this.customerType.billPayment),
          };
          this.disabled = true;
          // window.console.log(JSON.stringify(this.customerType.cashPayment), 'priceLevel')

          this.showLoading = true;
          customerTypeHandler
            .create(data)
            .then((response) => {
              if (response.data.statusCode === 201) {
                this.disabled = false;
                this.showLoading = false;
                this.loadCustomerType();
                this.clear();
                this.close();
                // this.$refs.form.reset()
              }
            })
            .catch((e) => {
              this.disabled = false;
              this.showLoading = false;
              this.errors.push(e);
            });
        }, 10);
      });
    },
    exportToExcel() {
      const grid = $("#gridCustomerType").data("kendoGrid");
      grid.saveAsExcel();
    },
    async loadCustomerType() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = true;
          customerTypeHandler.get().then((res) => {
            this.showLoading = false;
            if (this.appType == "npoo") {
              if (res.length != 0) {
                this.customerTypes = res.filter((o) => {
                  const nature = o.nature || {};
                  const name = nature.name || "";
                  if (name.includes("Individual-") === false) {
                    return o;
                  }
                });
              }
            } else {
              this.customerTypes = res;
            }
          });
        }, 10);
      });
    },
    async loadCustomerTypeNature() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          otherHandler.customerTypeNature().then((res) => {
            if (res.data.statusCode === 200) {
              this.compeletLoading = false;
              this.natures = res.data.data;
            }
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
            //Receivable Account
            this.receivableAcc = res // .data
              .filter((m) => m.account_type.number === 7)
              .map((item) => {
                return {
                  id: item.uuid,
                  uuid: item.uuid,
                  name: item.name,
                  local_name: item.local_name,
                  number: item.number,
                  is_taxable: item.is_taxable,
                  banhjiAccCode: item.banhjiAccCode,
                  group_code: item.group_code,
                  parent_account: item.parent_account,
                  type_code: item.type_code,
                  account_type: item.account_type,
                };
              });
            if (this.receivableAcc.length > 0) {
              this.mReceivableAcc = this.receivableAcc[0];
            }
            //Deposit Account
            this.accDeposit = res
              .filter((m) => m.account_type.number === 20 || m.account_type.number === 28)
              .map((item) => {
                return {
                  id: item.uuid,
                  uuid: item.uuid,
                  name: item.name,
                  local_name: item.local_name,
                  number: item.number,
                  is_taxable: item.is_taxable,
                  banhjiAccCode: item.banhjiAccCode,
                  group_code: item.group_code,
                  parent_account: item.parent_account,
                  type_code: item.type_code,
                  account_type: item.account_type,
                };
              });
            if (this.accDeposit.length > 0) {
              this.mAccDeposit = this.accDeposit[0];
            }
            //Unearn revenue Account
            this.unearnAcc = res
              .filter((m) => m.account_type.number === 20)
              .map((item) => {
                return {
                  id: item.uuid,
                  uuid: item.uuid,
                  name: item.name,
                  local_name: item.local_name,
                  number: item.number,
                  is_taxable: item.is_taxable,
                  banhjiAccCode: item.banhjiAccCode,
                  group_code: item.group_code,
                  parent_account: item.parent_account,
                  type_code: item.type_code,
                  account_type: item.account_type,
                };
              });
            if (this.unearnAcc.length > 0) {
              this.mUnearnAcc = this.unearnAcc[0];
            }
          });
        }, 10);
      });
    },
    async loadTax() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          settingsHandler.get().then((res) => {
            this.showLoading = false;
            this.tax = res;
            let vAT = this.tax.filter(
              (m) => m.taxType.typeId === 1 && m.transactionType === "Sale"
            ); // valuable tax
            this.vat = vAT; // valuable tax
            if (this.vat.length > 0) {
              this.mVAT = this.vat[0];
              this.mShipVAT = {};
            }
          });
        }, 10);
      });
    },
    async loadPaymentOption() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          const strFilter = "?optionType=Customer";
          paymentOptionHandler.list(strFilter).then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoading = false;
              const data = res.data.data || [];
              this.cashPayment = data.filter(
                (m) => m.type === PAYMENT_OPINION_TYPE.CASH_PAYMENT
              );
              this.billPayment = data.filter(
                (m) => m.type === PAYMENT_OPINION_TYPE.BILL_PAYMENT
              );
              this.qrPayment = data.filter(
                (m) => m.type === PAYMENT_OPINION_TYPE.QR_PAYMENT
              );
              this.bankTransfer = data.filter(
                (m) => m.type === PAYMENT_OPINION_TYPE.BANK_TRANSFER
              );
              window.console.log("cashPayment", this.cashPayment);
            }
          });
        }, 10);
      });
    },
    async loadPaymentTerm() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          settingHandler.getPaymentTerm(strFilterTerm).then((res) => {
            this.showLoading = false;
            this.paymentTerm = [];
            if (res.data.statusCode === 200) {
              this.paymentTerm = res.data.data;
              if (this.paymentTerm.length > 0) {
                this.mPaymentTerm = this.paymentTerm[0];
                this.customerType.paymentTerm = this.paymentTerm[0];
              } else {
                this.showLoading = false;
              }
            }
          });
        }, 10);
      });
    },
    async loadPriceLevel() {
      const strFilter = "?nature=sale";
      priceLevelHandler.get(strFilter).then((res) => {
        this.priceLevel = res;
        if (this.priceLevel.length > 0) {
          this.customerType.priceLevel = this.priceLevel[0];
        }
      });
    },
  },
  mounted: async function () {
    await this.loadCustomerType();
    await this.loadCustomerTypeNature();
    // await this.loadTax();
    this.loadPaymentTerm();
    await this.loadPriceLevel();
    await this.initToolbar(this);
    await this.loadPaymentOption();
  },
  created: async function () {
    await this.loadAccount();
  },
};
</script>
<style scoped>
.text_tip {
  line-height: 10px !important;
}
p {
  color: rgba(0, 0, 0, 0.87);
}
@media (max-width: 576px) {
}
</style>
