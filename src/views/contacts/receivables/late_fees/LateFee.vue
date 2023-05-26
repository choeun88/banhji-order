<template>
  <v-row>
    <v-col sm="12" cols="12" class="grayBg px-6">
      <v-card color="white" class="no_border pa-3" elevation="0">
        <v-row class="">
          <v-col sm="9" cols="12" class="py-0">
            <h2 class="mb-0 font_020">{{ $t("late_fee_list") }}</h2>
            <p>{{ $t("late_fee_desc") }}</p>
          </v-col>
          <v-col sm="3" cols="12" class="py-0">
            <v-dialog persistent v-model="dialogM3" max-width="600px">
              <template v-slot:activator="{ on }">
                <v-btn
                  @click="newClick"
                  color="primary"
                  class="white--text float-right text-upper"
                  v-on="on"
                >
                  {{ $t("new_late_fee") }}
                </v-btn>
              </template>
              <v-card>
                <div class="modal_header">
                  <v-card-title class="flex-1">{{ $t("late_fee") }} </v-card-title>
                  <v-icon @click="dialogM3 = false">close</v-icon>
                </div>
                <v-card-text class="modal_text_content">
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-row>
                      <v-col sm="6" cols="12" class="pb-0">
                        <label>{{ $t("code") }}</label>
                        <v-text-field
                          class="mt-1"
                          v-model="lateFee.code"
                          :rules="[(v) => !!v || $t('is_required')]"
                          outlined
                          clearable
                        />
                        <label>{{ $t("name") }}</label>
                        <v-text-field
                          class="mt-1"
                          v-model="lateFee.name"
                          outlined
                          :rules="[(v) => !!v || $t('is_required')]"
                          clearable
                        />

                        <div v-if="lateFee.nature === 'Amount'">
                          <label class="label">{{ $t("amount") }}</label>
                          <v-text-field
                            class="mt-1 flex-1"
                            v-model="lateFee.amount"
                            type="number"
                            outlined
                            :rules="[(v) => !!v || $t('is_required')]"
                            clearable
                          />
                        </div>
                        <div v-else>
                          <label class="label">{{ $t("percentage") }}</label>
                          <v-text-field
                            class="mt-1"
                            v-model="lateFee.amount"
                            type="number"
                            outlined
                            :rules="[(v) => !!v || $t('is_required')]"
                            clearable
                          />
                        </div>
                      </v-col>
                      <v-col sm="6" cols="12" class="pb-0">
                        <label class="label mb-0">{{ $t("method") }}</label>
                        <v-select
                          class="mt-1"
                          v-model="lateFee.method"
                          @change="onMethodChange"
                          :items="$t(methods)"
                          :rules="[(v) => !!v || $t('is_required')]"
                          outlined
                        />
                        <label class="label">{{ $t("nature") }}</label>
                        <v-select
                          tag="natureSelector"
                          v-model="lateFee.nature"
                          :items="natures"
                          :disabled="disabledNature"
                          :rules="[(v) => !!v || $t('is_required')]"
                          class="mt-1"
                          outlined
                        />
                        <label class="label mb-0">{{ $t("currency") }}</label>
                        <v-select
                          class="mt-1"
                          outlined
                          tage="Currency"
                          v-model="lateFee.currency"
                          :items="currencies"
                          :rules="[(v) => !!v || $t('is_required')]"
                          item-value="id"
                          :item-text="(item) => `${item.code} - ${item.name}`"
                          return-object
                        />
                      </v-col>
                      <v-col sm="12" cols="12" class="pb-0">
                        <label class="label">{{ $t("account") }}</label>
                        <v-autocomplete
                          class="mt-1"
                          outlined
                          tage="amountSelector"
                          v-model="lateFee.account"
                          :items="account"
                          :loading="account.length === 0"
                          item-value="id"
                          :rules="[(v) => !!v || $t('is_required')]"
                          :item-text="
                            (item) =>
                              `${item.number} - ${
                                this.$store.state.accounting.accountLanguage === 'English'
                                  ? item.name
                                  : item.local_name
                              }`
                          "
                          return-object
                        >
                        </v-autocomplete>
                      </v-col>

                      <!-- <v-col
                                              sm="6"
                                              cols="12"
                                              class="py-0"
                                              v-if="lateFee.nature === 'Amount'"
                                            >
                                              <v-row class="mt-5">
                                                <v-col sm="7" cols="12" class="py-0">

                                                </v-col>
                                                <v-col sm="5" cols="12" class="pl-0">
                                                  <label>{{ $t("amount") }}</label>
                                                </v-col>
                                              </v-row>
                                            </v-col>

                                            <v-col
                                              sm="6"
                                              cols="12"
                                              class="py-0"
                                              v-else-if="lateFee.nature !== 'Amount'"
                                            >
                                            </v-col> -->

                      <v-col sm="12" cols="12" class="py-0">
                        <label>{{ $t("description") }}</label>
                        <v-textarea
                          rows="4"
                          no-resize
                          height="70px"
                          class="mt-1"
                          v-model="lateFee.description"
                          outlined
                          clearable
                        />
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
                <v-card-actions class="modal_footer">
                  <v-row>
                    <v-col sm="6" cols="6" class="py-0 text-left">
                      <v-btn
                        color="primary"
                        outlined
                        class="text-capitalize black--text float-left"
                        @click="dialogM3 = false"
                        >{{ $t("cancel") }}
                      </v-btn>
                    </v-col>
                    <v-col sm="6" cols="6" class="py-0 text-right">
                      <v-btn
                        @click="onSaveClose"
                        color="primary"
                        :disabled="btnDisabled"
                        class="px-3 white--text text-capitalize"
                        >{{ $t("save_close") }}
                      </v-btn>
                    </v-col>
                  </v-row>
                  <LoadingMe
                    :isLoading="showLoading"
                    :fullPage="false"
                    :myLoading="true"
                  />
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>

        <v-row class="">
          <v-col sm="12" cols="12">
            <LoadingMe
              :isLoading="showLoading"
              :fullPage="false"
              type="loading"
              :myLoading="true"
            />
            <template>
              <kendo-datasource ref="lateFeeDS" :data="lateFeeList" />
              <kendo-grid
                id="gridLateFee"
                class="grid-function"
                :data-source-ref="'lateFeeDS'"
                :editable="false"
                :toolbar="toolbarTemplate"
                :scrollable-virtual="true"
              >
                <!--                                <kendo-grid-column-->
                <!--                                    :field="'no'"-->
                <!--                                    :title="$t('no')"-->
                <!--                                    :template="rowNumberTmpl"-->
                <!--                                    :width="80"-->
                <!--                                    :column-menu="false"-->
                <!--                                    :headerAttributes="{-->
                <!--                    style: 'background-color: #EDF1F5;',-->
                <!--                    class: 'text-center',-->
                <!--                  }"-->
                <!--                                    :attributes="{ style: 'text-align: center' }"-->
                <!--                                />-->
                <kendo-grid-column
                  :field="'code'"
                  :title="$t('code')"
                  :width="80"
                  :template="'<span>#=code#</span>'"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'name'"
                  :title="$t('name')"
                  :attributes="{ class: 'tb_name_td' }"
                  :width="150"
                  :template="'<span>#=name#</span>'"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'amount'"
                  :title="$t('amount')"
                  :width="120"
                  :attributes="{
                    style: 'text-align: right;',
                  }"
                  :template="'<span>#=amount#</span>'"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'nature'"
                  :title="$t('nature')"
                  :width="100"
                  :template="natureTemplate"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'account'"
                  :title="$t('account')"
                  :width="150"
                  :template="
                    this.$store.state.accounting.accountLanguage === 'English'
                      ? '<span>#=account.name#</span>'
                      : '<span>#=account.local_name#</span>'
                  "
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'currency'"
                  :title="$t('currency')"
                  :width="100"
                  :template="currencyTemplate"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'description'"
                  :title="$t('description')"
                  :width="150"
                  :template="'<span>#=description#</span>'"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="''"
                  :title="$t('action')"
                  :width="80"
                  :command="[
                    { iconClass: 'k-icon k-i-edit', text: $t('edit'), click: goEdit },
                  ]"
                  :headerAttributes="{
                    style: 'text-align: right; background-color: #EDF1F5',
                  }"
                />
              </kendo-grid>
            </template>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import LateFeeModel from "@/scripts/model/LateFee";
import kendo from "@progress/kendo-ui";
import currencyHandler from "@/scripts/currency/handler/currencyHandler";
import AccountMappingModel from "@/scripts/account-map/Account";
import { CurrencyModel } from "@/scripts/model/AppModels";
import { LATE_FEE } from "@/scripts/default_setup/Setting";
import { i18n } from "@/i18n";

const $ = kendo.jQuery;
const accountHandler = require("@/scripts/handler/accounting/account");
const lateFeeHandler = require("@/scripts/lateFeeHandler");
const lateFeeModel = new LateFeeModel({});

const METHODS = LATE_FEE.METHOD;
const NATURES = LATE_FEE.NATURE;
const currencyType = {
  FUNCTIONAL_CURRENCY: "fun-c",
  TRANSACTION_CURRENCY: "txn-c",
  REPORTING_CURRENCY: "rpt-c",
  TAX_EXCHANGE_CURRENCY: "tax-c",
};
export default {
  components: {
    LoadingMe: () => import(`@/components/Loading`),
  },
  data: () => ({
    natures: NATURES,
    methods: METHODS,
    showLoading: false,
    dialogM3: false,
    btnDisabled: false,
    lateFeeList: [],
    account: [],
    currencies: [],
    lateFee: lateFeeModel,
    schemaDefinition: {
      model: {
        id: "id",
      },
    },
    valid: true,
    disabledNature: true,
  }),
  props: {},
  methods: {
    onMethodChange() {
      const method = this.lateFee.method || "";
      if (method === LATE_FEE.METHOD_FIXED) {
        this.lateFee.nature = LATE_FEE.NATURE_AMOUNT;
        this.disabledNature = false;
      } else if (method === LATE_FEE.METHOD_COMPOUND) {
        this.lateFee.nature = LATE_FEE.NATURE_PERCENTAGE;
        this.disabledNature = true;
      }
    },
    currencyTemplate(data) {
      return `<span> ${i18n.t(data.currency.code)}</span>`;
    },
    natureTemplate(data) {
      return `<span> ${i18n.t(data.nature)}</span>`;
    },
    rowNumberTmpl(dataItem) {
      let ds = this.$refs.lateFeeDS.kendoWidget(),
        index = ds.indexOf(dataItem);
      return index + 1;
    },
    async loadAccount() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          accountHandler.getAllPages().then((res) => {
            this.showLoading = false;
            this.account = res.map((item) => {
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
            // if (this.account.length > 0) {
            //     this.mAccount = this.account[0];
            // }
            // const otherRevenue = res.filter(m => m.banhjiAccCode === '740040').map(itm => {
            //     return {
            //         id: itm.uuid,
            //         uuid: itm.uuid,
            //         name: itm.name,
            //         local_name: itm.local_name,
            //         number: itm.number,
            //         is_taxable: itm.is_taxable,
            //         banhjiAccCode: itm.banhjiAccCode,
            //         group_code: itm.group_code,
            //         parent_account: itm.parent_account,
            //         type_code: itm.type_code,
            //         account_type: itm.account_type
            //     }
            // })
            // const gainLoss = res.filter(m => m.banhjiAccCode === '740010').map(itm => {
            //     return {
            //         id: itm.uuid,
            //         uuid: itm.uuid,
            //         name: itm.name,
            //         local_name: itm.local_name,
            //         number: itm.number,
            //         is_taxable: itm.is_taxable,
            //         banhjiAccCode: itm.banhjiAccCode,
            //         group_code: itm.group_code,
            //         parent_account: itm.parent_account,
            //         type_code: itm.type_code,
            //         account_type: itm.account_type
            //     }
            // })
            // window.console.log('otherRevenue', JSON.stringify(otherRevenue), 'gainLoss', JSON.stringify(gainLoss))
          });
        }, 100);
      });
    },
    cancel() {
      this.dialogM3 = false;
    },
    close() {
      this.dialogM3 = false;
    },
    newClick() {
      this.lateFee = {};
      this.dialogM3 = true;
    },
    goEdit(e) {
      e.preventDefault();
      let grid = kendo.jQuery("#gridLateFee").data("kendoGrid");
      let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
      this.lateFee = dataItem;
      const method = dataItem.method || "";
      if (method === LATE_FEE.METHOD_FIXED) {
        this.lateFee.nature = LATE_FEE.NATURE_AMOUNT;
        this.disabledNature = false;
      } else if (method === LATE_FEE.METHOD_COMPOUND) {
        this.lateFee.nature = LATE_FEE.NATURE_PERCENTAGE;
        this.disabledNature = true;
      }
      //   window.console.log("dataItem--", dataItem);
      // this.mAccount = dataItem.account;
      this.dialogM3 = true;
    },
    async onSaveClose() {
      if (!this.$refs.form.validate()) {
        this.$refs.form.validate();
        return;
      }
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          let data = {
            id: this.lateFee.id,
            name: this.lateFee.name,
            code: this.lateFee.code,
            description: this.lateFee.description,
            account: new AccountMappingModel(this.lateFee.account),
            amount: this.lateFee.amount,
            nature: this.lateFee.nature,
            method: this.lateFee.method,
            currency: new CurrencyModel(this.lateFee.currency) || {},
            status: this.lateFee.status || 1,
            deleted: this.lateFee.deleted || 0,
            createdAt: this.lateFee.createdAt,
            type: this.lateFee.id ? "edit" : "new",
          };
          this.showLoading = true;
          this.btnEnable = true;
          lateFeeHandler
            .create(data)
            .then((response) => {
              if (response.data.statusCode === 201) {
                this.loadData();
                this.btnEnable = false;
                this.showLoading = false;
                this.$snotify.success("Success");
                this.close();
              }
            })
            .catch((e) => {
              this.$snotify.error("Something went wrong");
              this.errors.push(e);
            });
        });
      });
    },
    async loadData() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = true;
          lateFeeHandler.list().then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoading = false;
              this.lateFeeList = res.data.data;
            } else {
              this.showLoading = false;
            }
          });
        }, 10);
      });
    },
    async loadCurrency() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = true;
          currencyHandler.list(currencyType.FUNCTIONAL_CURRENCY).then((response) => {
            if (response.data.statusCode === 200) {
              this.currencies = response.data.data; // .filter((o) => o.used === 1);
            }
          });
        }, 10);
      });
    },
    excelExport: function (e) {
      // const pivot = this.$refs.gridTransactionDS.kendoWidget()
      // pivot.saveAsExcel()
      window.console.log(e.data);
    },
    initToolbar(that) {
      let grid = $("#gridLateFee").data("kendoGrid");
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
        that.loadData();
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
    exportToExcel() {
      const grid = $("#gridLateFee").data("kendoGrid");
      grid.saveAsExcel();
    },
  },
  mounted: async function () {
    await this.loadData();
    await this.loadCurrency();
    await this.initToolbar(this);
  },
  created: async function () {
    await this.loadAccount();
  },
};
</script>

<style scoped>
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
}
</style>
