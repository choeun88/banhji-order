<template>
  <v-row>
    <v-col sm="12" cols="12" class="grayBg px-6">
      <v-card min-height="564" color="white" class="pa-3 no_border" elevation="0">
        <v-row class="">
          <v-col sm="10">
            <h2 class="mb-0 font_020">{{ $t("other_charge") }}</h2>
            <p class="mb-2">{{ $t("other_charge_desc") }}</p>
          </v-col>
          <v-col sm="2" cols="12" class="py-0 mt-3">
            <v-dialog persistent v-model="dialogM3" max-width="600px">
              <template v-slot:activator="{ on }">
                <v-btn
                  @click="newClick"
                  color="primary"
                  class="white--text float-right text-upper"
                  v-on="on"
                >
                  {{ $t("new_other_charge") }}
                </v-btn>
              </template>
              <v-card>
                <div class="modal_header">
                  <v-card-title>{{ $t("other_charge") }}</v-card-title>
                  <v-icon class="btn_close" @click="dialogM3 = false">close</v-icon>
                </div>

                <v-card-text class="modal_text_content">
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-row>
                      <v-col sm="6" cols="12" class="pb-0">
                        <label>{{ $t("code") }}</label>
                        <v-text-field
                          class="mt-1"
                          v-model="otherCharge.code"
                          :rules="[(v) => !!v || $t('is_required')]"
                          outlined
                          clearable
                        />
                      </v-col>
                      <v-col sm="6" cols="12" class="pb-0">
                        <label class="label">{{ $t("nature") }}</label>
                        <v-select
                          tag="natureSelector"
                          v-model="otherCharge.nature"
                          :items="natures"
                          :rules="[(v) => !!v || $t('is_required')]"
                          class="mt-1"
                          outlined
                        />
                      </v-col>
                      <v-col sm="6" cols="12" class="py-0">
                        <label>{{ $t("name") }}</label>
                        <v-text-field
                          class="mt-1"
                          v-model="otherCharge.name"
                          :rules="[(v) => !!v || $t('is_required')]"
                          outlined
                          clearable
                        />
                      </v-col>
                      <!-- for amount -->
                      <v-col
                        sm="6"
                        cols="12"
                        class="py-0"
                        v-if="otherCharge.nature === 'Amount'"
                      >
                        <v-row class="mt-5">
                          <v-col sm="7" cols="12" class="py-0">
                            <v-text-field
                              class="mt-1"
                              v-model="otherCharge.amount"
                              type="number"
                              :rules="[(v) => !!v || $t('is_required')]"
                              outlined
                            />
                          </v-col>
                          <v-col sm="5" cols="12" class="pl-0">
                            <label>{{ $t("amount") }}</label>
                          </v-col>
                        </v-row>
                      </v-col>
                      <!-- for percentage -->
                      <v-col
                        sm="6"
                        cols="12"
                        class="py-0"
                        v-else-if="otherCharge.nature !== 'Amount'"
                      >
                        <v-row class="mt-5">
                          <v-col sm="7" cols="12" class="py-0">
                            <v-text-field
                              class="mt-1"
                              v-model="otherCharge.amount"
                              type="number"
                              :rules="[(v) => !!v || $t('is_required')]"
                              outlined
                            />
                          </v-col>
                          <v-col sm="5" cols="12" class="pl-0">
                            <label>%</label>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col sm="6" cols="12" class="py-0">
                        <label class="label">{{ $t("account") }}</label>
                        <v-autocomplete
                          class="mt-1"
                          outlined
                          tage="amountSelector"
                          v-model="mAccount"
                          :items="account"
                          :loading="account.length === 0"
                          item-value="id"
                          :rules="[(v) => !!v['id'] || $t('is_required')]"
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
                      <v-col sm="6" cols="12" class="py-0">
                        <label>{{ $t("description") }}</label>
                        <v-textarea
                          rows="4"
                          no-resize
                          height="70px"
                          class="mt-1"
                          v-model="otherCharge.description"
                          outlined
                        />
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
                <v-card-actions class="modal_footer">
                  <v-row>
                    <v-col sm="6" cols="6" class="py-0 text-left">
                      <v-btn
                        color="black"
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
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>

        <v-row class="">
          <v-col sm="12" cols="12" class="pb-0">
            <LoadingMe
              :isLoading="showLoading"
              :fullPage="false"
              type="loading"
              :myLoading="true"
            />
            <template>
              <kendo-datasource ref="otherChargeItemDS" :data="otherChargeList" />
              <kendo-grid
                id="gridOtherChargeItem"
                class="grid-function"
                :data-source-ref="'otherChargeItemDS'"
                :editable="false"
                :toolbar="toolbarTemplate"
                :scrollable-virtual="true"
              >
                <kendo-grid-column
                  :field="'code'"
                  :title="$t('code')"
                  :width="100"
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
                  :width="100"
                  :template="'<span>#=amount#</span>'"
                  :attributes="{ style: 'text-align: right;' }"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'account'"
                  :title="$t('account')"
                  :width="100"
                  :template="
                    this.$store.state.accounting.accountLanguage === 'English'
                      ? '<span>#=account.number#</span> - <span>#=account.name#</span>'
                      : '<span>#=account.number#</span> - <span>#=account.local_name#</span>'
                  "
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'nature'"
                  :title="$t('nature')"
                  :width="100"
                  :template="'<span>#=nature#</span>'"
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
                  :width="100"
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
import OtherChargeModel from "@/scripts/model/OtherCharge";
import kendo from "@progress/kendo-ui";

const $ = kendo.jQuery;
const accountHandler = require("@/scripts/handler/accounting/account");
const otherChargeHandler = require("@/scripts/otherChargeHandler");
const otherChargeModel = new OtherChargeModel({});
import JSZip from "jszip";
import AccountMappingModel from "@/scripts/account-map/Account";

window.JSZip = JSZip;
export default {
  components: {
    LoadingMe: () => import(`@/components/Loading`),
  },
  data: () => ({
    valid: true,
    natures: ["Amount", "Percentage"],
    showLoading: false,
    dialogM3: false,
    otherChargeList: [],
    account: [],
    mAccount: {},
    otherCharge: otherChargeModel,
    schemaDefinition: {
      model: {
        id: "id",
      },
    },
    btnDisabled: false,
  }),
  props: {},
  methods: {
    rowNumberTmpl(dataItem) {
      let ds = this.$refs.otherChargeItemDS.kendoWidget(),
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
            if (this.account.length > 0) {
              this.mAccount = this.account[0];
            }
          });
        }, 10);
      });
    },
    cancel() {
      this.dialogM3 = false;
    },
    close() {
      this.dialogM3 = false;
    },
    newClick() {
      this.otherCharge = {};
      this.mAccount = {};
      this.dialogM3 = true;
      this.btnDisabled = false;
    },
    goEdit(e) {
      e.preventDefault();
      let grid = kendo.jQuery("#gridOtherChargeItem").data("kendoGrid");
      let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
      this.otherCharge = dataItem;
      this.mAccount = dataItem.account;
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
            id: this.otherCharge.id,
            name: this.otherCharge.name,
            code: this.otherCharge.code,
            description: this.otherCharge.description,
            account: new AccountMappingModel(this.mAccount),
            amount: this.otherCharge.amount,
            nature: this.otherCharge.nature,
            status: 1,
            type: this.otherCharge.id ? "edit" : "new",
          };
          this.showLoading = true;
          this.btnDisabled = true;
          otherChargeHandler
            .create(data)
            .then((response) => {
              if (response.data.statusCode === 201) {
                this.showLoading = false;
                this.btnDisabled = false;
                this.loadOtherCharge();
                this.$snotify.success("Success");
                this.close();
              }
            })
            .catch((e) => {
              this.showLoading = false;
              this.btnDisabled = false;
              this.$snotify.error("Something went wrong");
              this.errors.push(e);
            });
        });
      });
    },
    async loadOtherCharge() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = true;
          otherChargeHandler.list().then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoading = false;
              this.otherChargeList = res.data.data;
            } else {
              this.showLoading = false;
            }
          });
        }, 10);
      });
    },

    toolbarTemplate: function () {
      const templateHtml =
        // '<span>' +
        // '<a class="k-pager-excel k-link k-button excel" title="Export to Excel"> <span class="k-icon k-i-excel"></span>Export to excel </a>' +
        // '</span><span>&nbsp;&nbsp;</span>' +
        // '<span style="position:absolute; right:5px">' +
        // '</span>' +
        "<span>" +
        '<a class="k-pager-refresh k-link k-button reload" title="Refresh"><span class="k-icon k-i-reload"></span> Refresh </a>' +
        "</span>";

      return kendo.template(templateHtml);
    },
    exportToExcel() {
      const grid = $("#gridOtherChargeItem").data("kendoGrid");
      grid.saveAsExcel();
    },
    excelExport: function (e) {
      // const pivot = this.$refs.gridTransactionDS.kendoWidget()
      // pivot.saveAsExcel()
      window.console.log(e.data);
    },
    initToolbar(that) {
      let grid = $("#gridOtherChargeItem").data("kendoGrid");
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
        that.loadOtherCharge();
      }

      function onExportExcel(that) {
        that.exportToExcel();
      }
    },
  },
  mounted: async function () {
    await this.loadOtherCharge();
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
