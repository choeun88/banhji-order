<template>
  <v-row>
    <v-col sm="12" cols="12" class="grayBg px-6">
      <v-card color="white" class="pa-3 no_border" elevation="0">
        <v-row>
          <v-col sm="8" class="py-0">
            <h2 class="mb-0 font_020">{{ $t("customer_discount_item") }}</h2>
            <p class="mb-0">{{ $t("customer_discount_item_desc") }}</p>
          </v-col>
          <v-col sm="4" class="py-0">
            <v-btn
              @click="newClick"
              color="primary"
              class="white--text float-right text-upper"
            >
              {{ $t("new_discount_item") }}
            </v-btn>
          </v-col>
        </v-row>
        <v-dialog persistent eager v-model="dialogM3" max-width="600px">
          <v-card>
            <v-form ref="form" v-model="valid" lazy-validation>
              <div class="modal_header">
                <v-card-title>{{ $t("customer_discount_item") }}</v-card-title>
                <v-icon @click="dialogM3 = false">close</v-icon>
              </div>

              <v-card-text class="modal_text_content">
                <v-row>
                  <v-col sm="6" cols="12" class="py-0">
                    <label>{{ $t("code") }}</label>
                    <v-text-field
                      class="mt-1"
                      v-model="discountItem.code"
                      outlined
                      clearable
                    />
                  </v-col>
                  <v-col sm="6" cols="12" class="py-0">
                    <label class="label">{{ $t("nature") }}*</label>
                    <v-select
                      tag="natureSelector"
                      v-model="discountItem.nature"
                      :items="natures"
                      :rules="[(v) => !!v || $t('is required')]"
                      class="mt-1"
                      outlined
                      clearable
                    />
                  </v-col>
                  <v-col sm="6" cols="12" class="py-0">
                    <label>{{ $t("name") }}*</label>
                    <v-text-field
                      class="mt-1"
                      v-model="discountItem.name"
                      :rules="[(v) => !!v || $t('is required')]"
                      outlined
                      clearable
                    />
                  </v-col>
                  <!-- for amount -->
                  <v-col
                    sm="6"
                    cols="12"
                    class="py-0"
                    v-if="discountItem.nature === 'Amount'"
                  >
                    <v-row class="mt-5">
                      <v-col sm="7" cols="12" class="py-0">
                        <v-text-field
                          class="mt-1"
                          v-model="discountItem.amount"
                          type="number"
                          :min="0"
                          :rules="[(v) => !!v || $t('is required')]"
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
                    v-else-if="discountItem.nature !== 'Amount'"
                  >
                    <v-row class="mt-5">
                      <v-col sm="7" cols="12" class="py-0">
                        <v-text-field
                          class="mt-1"
                          v-model="discountItem.amount"
                          type="number"
                          :min="0"
                          :rules="[(v) => !!v || $t('is required')]"
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
                    <v-select
                      class="mt-1"
                      outlined
                      tage="amountSelector"
                      v-model="mAccount"
                      :items="account"
                      item-value="id"
                      :item-text="
                        (item) =>
                          `${item.number} - ${
                            this.$store.state.accounting.accountLanguage === 'English'
                              ? item.name
                              : item.local_name
                          }`
                      "
                      :rules="[(v) => !!v['id'] || $t('is required!')]"
                      return-object
                    />
                  </v-col>
                  <v-col sm="6" cols="12" class="py-0">
                    <label>{{ $t("description") }}</label>
                    <v-textarea
                      rows="4"
                      no-resize
                      height="70px"
                      class="mt-1"
                      v-model="discountItem.description"
                      outlined
                      clearable
                    />
                  </v-col>
                </v-row>
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
                      class="px-3 white--text text-capitalize"
                      >{{ $t("save_close") }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>

        <v-row class="">
          <v-col sm="12" cols="12">
            <LoadingMe
              :isLoading="showLoading"
              :fullPage="false"
              :myLoading="true"
              type="loading"
            />
            <template>
              <kendo-datasource ref="discountItemDS" :data="discountItemList" />
              <kendo-grid
                id="gridDiscountItem"
                class="grid-function"
                :data-source-ref="'discountItemDS'"
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
                  :attributes="{ class: 'tb_name_td' }"
                  :title="$t('name')"
                  :width="200"
                  :template="'<span>#=name#</span>'"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'amount'"
                  :title="$t('value')"
                  :width="150"
                  :template="'<span>#=amount#</span>'"
                  :attributes="{
                    style: 'text-align: right;',
                  }"
                  :headerAttributes="{
                    style: 'text-align: right; background-color: #EDF1F5',
                  }"
                />
                <kendo-grid-column
                  :field="'nature'"
                  :title="$t('nature')"
                  :width="150"
                  :template="'<span>#=nature#</span>'"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'account'"
                  :title="$t('account')"
                  :width="150"
                  :template="
                    this.$store.state.accounting.accountLanguage === 'English'
                      ? '<span>#=account.number#</span> - <span>#=account.name#</span>'
                      : '<span>#=account.number#</span> - <span>#=account.local_name#</span>'
                  "
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'description'"
                  :title="$t('description')"
                  :width="200"
                  :template="'<span>#=description#</span>'"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="''"
                  :title="$t('action')"
                  :width="120"
                  :command="[
                    {
                      iconClass: 'k-icon k-i-edit',
                      text: $t('edit'),
                      click: goEdit,
                    },
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
import DiscountItemModel from "@/scripts/model/DiscountItems";
import kendo from "@progress/kendo-ui";

const $ = kendo.jQuery;
const accountHandler = require("@/scripts/handler/accounting/account");
const discountItemHandler = require("@/scripts/discountItemHandler");
const discountItemModel = new DiscountItemModel({});
const TYPE = "Sale";
const TYPE_OPTION = "?type=" + TYPE;

import JSZip from "jszip";

window.JSZip = JSZip;
export default {
  components: {
    LoadingMe: () => import(`@/components/Loading`),
  },
  data: () => ({
    natures: ["Amount", "Percentage"],
    showLoading: false,
    dialogM3: false,
    discountItemList: [],
    account: [],
    mAccount: {},
    valid: true,
    discountItem: discountItemModel,
    schemaDefinition: {
      model: {
        id: "id",
      },
    },
  }),
  props: {},
  methods: {
    rowNumberTmpl(dataItem) {
      let ds = this.$refs.discountItemDS.kendoWidget(),
        index = ds.indexOf(dataItem);
      return index + 1;
    },
    async loadAccount() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          accountHandler.getAllPages().then((res) => {
            this.showLoading = false;
            this.account = res // .data
              .filter((m) => m.account_type.number === 32)
              .map((itm) => {
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
      this.discountItem = {};
      this.mAccount = {};
      this.dialogM3 = true;
    },
    goEdit(e) {
      e.preventDefault();
      let grid = kendo.jQuery("#gridDiscountItem").data("kendoGrid");
      let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
      this.discountItem = dataItem;
      window.console.log(dataItem.account);
      this.mAccount = {
        account_type: dataItem.account.account_type ? dataItem.account.account_type : {},
        banhjiAccCode: dataItem.account.account,
        group_code: dataItem.account.group_code,
        id: dataItem.account.id,
        is_taxable: dataItem.account.is_taxable,
        local_name: dataItem.account.local_name,
        name: dataItem.account.name,
        number: dataItem.account.number,
        type_code: dataItem.account.type_code,
        uuid: dataItem.account.uuid,
      };
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
            id: this.discountItem.id,
            name: this.discountItem.name,
            code: this.discountItem.code,
            description: this.discountItem.description,
            account: this.mAccount,
            type: TYPE,
            amount: this.discountItem.amount,
            nature: this.discountItem.nature,
            status: 1,
          };
          discountItemHandler
            .create(data)
            .then((response) => {
              if (response.data.statusCode === 201) {
                const res = response.data.data;
                const index = this.discountItemList.findIndex((item) => {
                  return res.id === item.id;
                });
                if (index < 0) {
                  this.discountItemList.push(res);
                } else {
                  this.discountItemList.splice(index, 1, res);
                }
                // window.console.log('index ', index, '--', this.discountItemList)
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
    async loadDiscountItems() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = true;
          discountItemHandler.list(TYPE_OPTION).then((res) => {
            if (res.data.statusCode === 200) this.showLoading = false;
            this.discountItemList = res.data.data;
          });
        }, 10);
      });
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
      const grid = $("#gridDiscountItem").data("kendoGrid");
      grid.saveAsExcel();
    },
    excelExport: function (e) {
      // const pivot = this.$refs.gridTransactionDS.kendoWidget()
      // pivot.saveAsExcel()
      window.console.log(e.data);
    },
    initToolbar(that) {
      let grid = $("#gridDiscountItem").data("kendoGrid");
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
        that.loadDiscountItems();
      }

      function onExportExcel(that) {
        that.exportToExcel();
      }
    },
  },
  mounted: async function () {
    await this.loadDiscountItems();
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
