<template>
  <v-row>
    <v-row>
      <v-col sm="12" cols="12" class="pt-0">
        <v-simple-table>
          <template v-slot:default>
            <tbody>
              <tr>
                <td class="text-uppercase">{{ $t("name") }}</td>
                <td class="text-left text-bold">{{ product.name || "" }}</td>
              </tr>
              <tr>
                <td class="text-uppercase">{{ $t("sku") }}</td>
                <td class="text-left text-bold">{{ sku }}</td>
              </tr>
              <tr>
                <td class="text-uppercase">{{ $t("vrn") }}</td>
                <td class="text-left text-bold">
                  {{ product.vrn.toUpperCase() || `` }}
                </td>
              </tr>
              <tr>
                <td class="text-uppercase">{{ $t("upc") }}</td>
                <td class="text-left text-bold">{{ product.upc || "" }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
    <v-row>
      <v-col sm="12" cols="12" class="tab_txn_att pt-0 pl-0">
        <div>
          <LoadingMe
            :isLoading="showLoading"
            :fullPage="false"
            type="loading"
            :myLoading="true"
          />
        </div>
        <v-tabs v-model="logTabIndex">
          <v-tab-item>
            <v-row>
              <v-col sm="12" cols="12" class="pt-0 pl-3 pr-6">
                <v-row class="grayBg">
                  <v-col sm="12" cols="12" class="">
                    <v-card outlined color="white" class="pa-3">
                      <Pair :product="info" />
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab>
            <span class="text-upercase">
              {{ $t("pair") }}
            </span>
          </v-tab>
          <v-tab>
            <span class="text-upercase">
              {{ $t("customer") }}
            </span>
          </v-tab>
          <v-tab>
            <span class="text-upercase">
              {{ $t("supplier") }}
            </span>
          </v-tab>
          <v-tab-item>
            <v-col sm="12" cols="12" class="pl-2">
              <v-card outlined color="white" class="pa-0">
                <v-col sm="12" cols="12" class="py-0">
                  <template>
                    <kendo-datasource
                      ref="gridSKUCustomerDS"
                      :type="'JSON'"
                      :data="transactions"
                      :change="dataSourceChangedCustomer"
                      :server-paging="false"
                    />
                    <kendo-grid
                      id="gridSKUCustomer"
                      class="grid-function"
                      :data-source-ref="'gridSKUCustomerDS'"
                      :toolbar="toolbarTemplate"
                      :column-menu="false"
                      :editable="true"
                      :navigatable="true"
                      :sortable="false"
                      :disabled="true"
                      :resizable="true"
                      :scrollable-virtual="true"
                    >
                      <kendo-grid-column
                        :field="'obj'"
                        :title="$t('name')"
                        :width="200"
                        :filterable="true"
                        :template="itemTemplate"
                        :editor="objDropdownEditor"
                        :attributes="{
                          style: 'text-align: left; ',
                        }"
                        :headerAttributes="{
                          style: 'background-color: #EDF1F5;text-align: left',
                        }"
                      />
                      <kendo-grid-column
                        :field="'code'"
                        :title="$t('code')"
                        :attributes="{
                          class: 'tb_name_td',
                        }"
                        :editable="
                          () => {
                            return true;
                          }
                        "
                        :filterable="false"
                        :width="110"
                        :headerAttributes="{
                          style: 'background-color: #EDF1F5',
                        }"
                      />
                      <kendo-grid-column
                        :field="'description'"
                        :title="$t('description')"
                        :attributes="{
                          class: 'tb_name_td',
                        }"
                        :editable="
                          () => {
                            return true;
                          }
                        "
                        :filterable="false"
                        :width="110"
                        :headerAttributes="{
                          style: 'background-color: #EDF1F5',
                        }"
                      />
                      <kendo-grid-column
                        :command="{
                          iconClass: 'k-icon k-i-trash',
                          text: ' ',
                          click: removeRow,
                          className: 'btn-plus isEditable',
                        }"
                        :title="$t('')"
                        :width="40"
                        :headerAttributes="{
                          style: 'text-align: left; background-color: #EDF1F5',
                        }"
                      />
                    </kendo-grid>
                  </template>
                </v-col>
                <div style="overflow: auto" class="invoice-log-pager"></div>
              </v-card>
            </v-col>
            <v-col sm="12" cols="12" class="pt-2">
              <v-btn
                color="primary"
                class="float-left btn_plus mr-2"
                @click="addRowCus"
              >
                <v-icon size="" class="ma-1">mdi-plus</v-icon>
              </v-btn>
              <v-btn
                @click="onSaveCloseCus"
                color="primary"
                class="float-right white--text text-capitalize"
                >{{ $t("save") }}
              </v-btn>
            </v-col>
          </v-tab-item>
          <!-- Transactions -->
          <v-tab-item>
            <v-col sm="12" cols="12" class="pl-0">
              <v-card outlined color="white" class="pa-0">
                <v-col sm="12" cols="12" class="py-0">
                  <LoadingMe
                    :isLoading="showLoadingTxn"
                    :fullPage="false"
                    type="loading"
                    :myLoading="true"
                  >
                  </LoadingMe>
                  <!-- <v-card outlined color="white" class="pa-3"> -->
                  <v-col sm="12" cols="12" class="py-0">
                    <!-- <v-btn
                      color="primary"
                      class="mr-1"
                      width="80px"
                      @click="loadSkuconnectV('sup-')"
                      style="font-size: 10px; border-radius: 1px"
                    >
                      <v-icon size="20">mdi-refresh</v-icon>refresh
                    </v-btn> -->
                    <template>
                      <kendo-datasource
                        ref="gridSKUVendorDS"
                        :type="'JSON'"
                        :data="logDetailList"
                        :change="dataSourceChangedVendor"
                        :server-paging="false"
                      />
                      <kendo-grid
                        id="gridSKUVendor"
                        class="grid-function"
                        :data-source-ref="'gridSKUVendorDS'"
                        :column-menu="false"
                        :editable="true"
                        :navigatable="true"
                        :sortable="false"
                        :disabled="true"
                        :resizable="true"
                        :toolbar="toolbarTemplateV"
                        :scrollable-virtual="true"
                      >
                        <kendo-grid-column
                          :field="'obj'"
                          :title="$t('name')"
                          :width="200"
                          :filterable="true"
                          :template="itemTemplate"
                          :editor="objDropdownEditorV"
                          :attributes="{
                            style: 'text-align: left; ',
                          }"
                          :headerAttributes="{
                            style: 'background-color: #EDF1F5;text-align: left',
                          }"
                        />
                        <kendo-grid-column
                          :field="'code'"
                          :title="$t('code')"
                          :attributes="{
                            class: 'tb_name_td',
                          }"
                          :editable="
                            () => {
                              return true;
                            }
                          "
                          :filterable="false"
                          :width="110"
                          :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                        />
                        <kendo-grid-column
                          :field="'description'"
                          :title="$t('description')"
                          :attributes="{
                            class: 'tb_name_td',
                          }"
                          :editable="
                            () => {
                              return true;
                            }
                          "
                          :filterable="false"
                          :width="110"
                          :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                        />
                        <kendo-grid-column
                          :command="{
                            iconClass: 'k-icon k-i-trash',
                            text: ' ',
                            click: removeRowV,
                            className: 'btn-plus isEditable',
                          }"
                          :title="$t('')"
                          :width="40"
                          :headerAttributes="{
                            style:
                              'text-align: left; background-color: #EDF1F5',
                          }"
                        />
                      </kendo-grid>
                    </template>
                  </v-col>
                  <div
                    style="overflow: auto"
                    class="invoice-log-detail-pager"
                  ></div>
                  <!-- </v-card> -->
                </v-col>

                <div style="overflow: auto" class="customer-center-txn"></div>
              </v-card>
            </v-col>
            <v-col sm="12" cols="12" class="pt-2">
              <v-btn
                color="primary"
                class="float-left btn_plus mr-2"
                @click="addRowCuV"
              >
                <v-icon size="" class="ma-1">mdi-plus</v-icon>
              </v-btn>
              <v-btn
                @click="onSaveCloseSup"
                color="primary"
                class="float-right white--text text-capitalize"
                >{{ $t("save") }}
              </v-btn>
            </v-col>
          </v-tab-item>
        </v-tabs>
      </v-col>
    </v-row>
    <div style="overflow: auto" class="standard-cost-center"></div>
  </v-row>
</template>
<script>
// import { DropDownList } from "@progress/kendo-vue-dropdowns";
import kendo from "@progress/kendo-ui";
// import { uuid } from "vue-uuid";
import ItemLineModel from "@/scripts/sku-connect/model/ItemLine";
// const uomConversionHandler = require("@/scripts/uomConversionHandler");
// const priceLevelHandler = require("@/scripts/priceLevelHandler");
const uomPriceHandler = require("@/scripts/uomPriceHandler");
const balanceHandler = require("@/scripts/balance/handler/balanceHandler");
const customerHandler = require("@/scripts/customerHandler");
const supplierHandler = require("@/scripts/supplierHandler");
// const settingHandler = require("@/scripts/settingsHandler");
const $ = kendo.jQuery;
const defaultItem = { ["name"]: "Select ...", ["id"]: null };
// const supplierHandler = require("@/scripts/supplierHandler");
const itemLineModel = new ItemLineModel({});
const SECOND_DELAY = 1000;
export default {
  name: "Skuconnect",
  props: {
    product: {},
  },
  components: {
    // "app-datepicker": () =>
    //   import(`@/components/custom_templates/DatePickerComponent`),
    LoadingMe: () => import(`@/components/Loading`),
    Pair: () => import(`./Pair`),

    // dropdownlist: DropDownList,
  },
  data: () => ({
    loading: false,
    dialogm2: false,
    showLoading: false,
    valid: true,
    uomConversion: [],
    priceList: [],
    // mUOM: {},
    menuDate: false,
    gridSchema: {
      model: {
        id: "id",
      },
    },
    dateFormat: "dd-MM-yyyy",

    txnVariantBalance: [],
    variantBalanceList: [],
    paging: {},
    totalVariantBal: 0,
    totalVariantBalPerPage: 0,

    supplierList: [],
    supplier: {},
    textField: "name",
    defaultItem: defaultItem,
    dataItemKey: "id",
    filter: "",
    supBaseUrl: balanceHandler.customerVendors(),
    pattern: "sup-bal",
    conectTo: 1,
    itemLine: itemLineModel,
    logDetailList: [],
    showLoadingTxn: false,
    logTabIndex: 0,
    transactions: [],
  }),
  methods: {
    checkDuplicateArrayVendor() {
      try {
        const ds = this.$refs.gridSKUVendorDS.kendoWidget();
        const rows = ds.data().filter((n) => n.obj.id !== "");
        const uniqueValues = new Set(rows.map((v) => v.id));

        if (uniqueValues.size < rows.length) {
          this.$snotify.error("Duplicate supplier");
          return true;
        }
        return false;
      } catch (error) {
        window.console.log("error duplcaite", error);
        return false;
      }
    },
    checkDuplicateArrayCustomer() {
      try {
        const ds = this.$refs.gridSKUCustomerDS.kendoWidget();
        const rows = ds.data().filter((n) => n.obj.id !== "");
        const uniqueValues = new Set(rows.map((v) => v.id));

        if (uniqueValues.size < rows.length) {
          this.$snotify.error("Duplicate Customer");
          return true;
        }
        return false;
      } catch (error) {
        window.console.log("error duplcaite", error);
        return false;
      }
    },
    async dataSourceChangedVendor(e) {
      if (e.field) {
        let dataRow = e.items[0];
        let item;
        switch (e.field) {
          case "obj":
            item = dataRow.obj || {};
            dataRow.set("id", item.id);
            window.console.log("dataRow", dataRow);
            this.checkDuplicateArrayVendor();
            break;
          default:
            break;
        }
      }
    },
    async dataSourceChangedCustomer(e) {
      if (e.field) {
        let dataRow = e.items[0];
        let item;
        switch (e.field) {
          case "obj":
            item = dataRow.obj || {};
            dataRow.set("id", item.id);
            window.console.log("dataRow", dataRow);
            this.checkDuplicateArrayCustomer();
            break;
          default:
            break;
        }
      }
    },
    checkGridDuplictyValue(e) {
      window.console.log("e", e);
      const grid = $("#gridSKUVendor").data("kendoGrid"),
        data = grid.dataItems(),
        fields = grid.options.columns.map((x) => x.field),
        checkData = {};

      // Gathering data
      data.forEach((d) => {
        fields.forEach((f) => {
          if (!checkData.hasOwnProperty(f)) checkData[f] = {};
          if (!checkData[f].hasOwnProperty(d[f])) checkData[f][d[f]] = [];

          checkData[f][d[f]].push(d.uid);
        });
      });

      // Checking for duplicity and styling duplicated rows
      window.console.log("checkData", checkData);
      Object.keys(checkData).forEach((k) => {
        Object.keys(checkData[k]).forEach((c) => {
          if (checkData[k][c].length > 1) {
            checkData[k][c].forEach((x) =>
              $(grid.tbody)
                .find('tr[data-uid="' + x + '"]')
                .addClass("duply-row")
            );
          }
        });
      });
    },
    dataBound: function (e) {
      this.checkGridDuplictyValue(e);
    },
    removeRowV(e) {
      e.preventDefault();
      const grid = kendo.jQuery("#gridSKUVendor").data("kendoGrid"),
        dataSource = grid.dataSource,
        dataItem = grid.dataItem($(e.currentTarget).closest("tr"));

      if (dataSource.total() > 1) {
        dataSource.remove(dataItem);
        // this.autoCalculate();
      }
    },
    removeRow(e) {
      e.preventDefault();
      const grid = kendo.jQuery("#gridSKUCustomer").data("kendoGrid"),
        dataSource = grid.dataSource,
        dataItem = grid.dataItem($(e.currentTarget).closest("tr"));

      if (dataSource.total() > 1) {
        dataSource.remove(dataItem);
        // this.autoCalculate();
      }
    },
    itemTemplate(dataItem) {
      const item = dataItem.obj;
      if (item) {
        return `<span>${item.numberName || (item.name || '')}</span>`;
      } else {
        return ``;
      }
    },
    objDropdownEditor(container, options) {
      kendo
        .jQuery('<input name="' + options.field + '"/>')
        .appendTo(container)
        .kendoDropDownList({
          autoBind: true,
          autoWidth: true,
          height: 400,
          filter: "contains",
          dataTextField: "numberName",
          dataValueField: "id",
          delay: SECOND_DELAY,
          template: `<span>#=numberName#</span>`,
          optionLabel: "--- Select ---",

          dataSource: new kendo.data.DataSource({
            serverFiltering: true,
            transport: {
              read: {
                url: customerHandler.search(
                  "?" + this.filter
                ),
              },
              dataType: "json",
            },
            schema: {
              model: {
                id: "id",
                fields: {
                  id: { type: "string" },
                  name: { type: "string" },
                  numberName: { type: "string" },
                  crn: { type: "string" },
                },
              },
              data: function (response) {
                return response.data;
              },
              total: function (response) {
                return response.data.count;
              },
            },
            // data: this.variants
          }),
        });
    },
    objDropdownEditorV(container, options) {
      kendo
        .jQuery('<input name="' + options.field + '"/>')
        .appendTo(container)
        .kendoDropDownList({
          autoBind: true,
          autoWidth: true,
          height: 400,
          filter: "contains",
          dataTextField: "numberName",
          dataValueField: "id",
          delay: SECOND_DELAY,
          template: `<span>#=numberName#</span>`,
          optionLabel: "--- Select ---",

          dataSource: new kendo.data.DataSource({
            serverFiltering: true,
            transport: {
              read: {
                url: supplierHandler.search(
                  "?" + this.filter
                ),
              },
              dataType: "json",
            },
            schema: {
              model: {
                id: "id",
                fields: {
                  id: { type: "string" },
                  name: { type: "string" },
                  numberName: { type: "string" },
                  crn: { type: "string" },
                },
              },
              data: function (response) {
                return response.data;
              },
              total: function (response) {
                return response.data.count;
              },
            },
            // data: this.variants
          }),
        });
    },
    addRowCus() {
      let ds = this.$refs.gridSKUCustomerDS.kendoWidget(),
        total = ds.total();
      this.itemLine.itemId = this.itemId; //uuid.v1();
      this.itemLine.sku = this.sku; //uuid.v1();
      if (total < 10) {
        ds.insert(total, this.itemLine);
      }
    },
    addRowCuV() {
      let ds = this.$refs.gridSKUVendorDS.kendoWidget(),
        total = ds.total();
      this.itemLine.id = this.itemId; //uuid.v1();
      this.itemLine.sku = this.sku; //uuid.v1();
      if (total < 10) {
        ds.insert(total, this.itemLine);
      }
    },
    formatDateWithTime(dataItem) {
      return kendo.toString(
        new Date(dataItem.appliedDate),
        `${dataItem.dateFormat} h:mm tt`
      );
    },
    excelExport: function (e) {
      // const pivot = this.$refs.gridTransactionDS.kendoWidget()
      // pivot.saveAsExcel()
      window.console.log(e.data);
    },
    initToolbar(that) {
      try {
        let grid = $("#gridSKUCustomer").data("kendoGrid");
        let gridElement = grid.element;
        let toolbarElement = gridElement.find(".k-grid-toolbar");
        toolbarElement.on("click", ".k-pager-refresh", function (e) {
          e.preventDefault();
          onReloadData(that);
        });
      } catch (error) {
        window.console.log("error initToolbarV", error);
      }
      function onReloadData(that) {
        that.loadSkuconnect("cus-");
      }
    },
    initToolbarV(that) {
      function onReloadDataV(that) {
        that.onSearchV();
      }
      try {
        let gridv = $("#gridSKUVendor").data("kendoGrid");
        let gridElementv = gridv.element;
        let toolbarElementv = gridElementv.find(".k-grid-toolbar");
        toolbarElementv.on("click", ".k-pager-refresh", function (e) {
          e.preventDefault();
          onReloadDataV(that);
        });
      } catch (error) {
        window.console.log("error initToolbarV", error);
      }
    },
    exportToExcel() {
      const grid = $("#gridVariantCost").data("kendoGrid");
      grid.saveAsExcel();
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
    toolbarTemplateV: function () {
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
    close() {
      // window.history.go(-1)
      this.dialogm2 = false;
    },
    async loadSkuconnect(type) {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          window.console.log("this.itemId", this.itemId);
          if (this.itemId) {
            this.params = {
              key: this.paging,
              id: this.itemId || "",
              type: type,
            };
            this.showLoading = true;
            // this.disabledNextPage(true);
            uomPriceHandler.skuConnectAll(this.params).then((res) => {
              if (res.data.statusCode === 200) {
                this.showLoading = false;
                const responseData = res.data.data || [];
                this.showLoading = false;
                this.transactions = responseData;
                this.paging = res.data.key;
              } else {
                this.showLoading = false;
              }
            });
          }
        }, 10);
      });
    },
    async loadSkuconnectV(type) {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          window.console.log("this.itemId", this.itemId);
          if (this.itemId) {
            this.params = {
              key: {},
              id: this.itemId || "",
              type: type,
            };
            this.showLoading = true;
            // this.disabledNextPage(true);
            uomPriceHandler.skuConnectAll(this.params).then((res) => {
              if (res.data.statusCode === 200) {
                this.showLoading = false;
                const responseData = res.data.data || [];
                this.showLoading = false;
                this.logDetailList = responseData;
                this.paging = res.data.key;
              } else {
                this.showLoading = false;
              }
            });
          }
        }, 10);
      });
    },
    async onSaveCloseCus() {
      // if (!this.$refs.form.validate()) {
      //   this.$refs.form.validate();
      //   return;
      // }
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          if (this.product) {
            const isTrue = this.checkDuplicateArrayCustomer();
            if (isTrue === false) {
              const ds = this.$refs.gridSKUCustomerDS.kendoWidget();
              const rows = ds
                .data()
                .filter((n) => n.obj.id !== "" && n.code !== "");
              const lines = rows.map((line) => {
                const obj = line.obj || {};
                return {
                  id: obj.id,
                  code: line.code || "",
                  itemId: line.itemId || "",
                  sku: line.sku || "",
                  desc: line.description || "",
                  name: obj.numberName || "",
                  consumerId: obj.consumerId || ""
                };
              });
              const data = {
                itemId: this.itemId || "",
                sku: this.sku || "",
                name: this.product.name || "",
                vrn: this.product.vrn || "",
                lines: lines,
              };
              this.showLoading = true;
              uomPriceHandler
                .skuConnect(data)
                .then((response) => {
                  if (response.data.statusCode === 201) {
                    this.showLoading = false;
                    // this.onSearch();
                    this.$snotify.success("Success");
                    // this.close();
                  }
                })
                .catch((e) => {
                  this.showLoading = false;
                  this.$snotify.error("Something went wrong", e);
                  // this.errors.push(e);
                });
            }
          }
        }, 50);
      });
    },
    async onSaveCloseSup() {
      // if (!this.$refs.form.validate()) {
      //   this.$refs.form.validate();
      //   return;
      // }
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          if (this.product) {
            const isTrue = this.checkDuplicateArrayVendor();
            if (isTrue === false) {
              const ds = this.$refs.gridSKUVendorDS.kendoWidget();
              const rows = ds
                .data()
                .filter((n) => n.obj.id !== "" && n.code !== "");
              const lines = rows.map((line) => {
                const obj = line.obj || {};
                return {
                  id: obj.id,
                  code: line.code || "",
                  itemId: line.itemId || "",
                  sku: line.sku || "",
                  desc: line.description || "",
                  name: obj.name || "",
                  consumerId: obj.consumerId || ""
                };
              });
              const data = {
                itemId: this.itemId || "",
                sku: this.sku || "",
                name: this.product.name || "",
                vrn: this.product.vrn || "",
                lines: lines,
              };
              this.showLoading = true;
              uomPriceHandler
                .skuConnect(data)
                .then((response) => {
                  if (response.data.statusCode === 201) {
                    this.showLoading = false;
                    // this.onSearch();
                    this.$snotify.success("Success");
                    // this.close();
                  }
                })
                .catch((e) => {
                  this.showLoading = false;
                  this.$snotify.error("Something went wrong", e);
                  // this.errors.push(e);
                });
            }
          }
        }, 50);
      });
    },
    async loadPage(that) {
      $(".standard-cost-center").html(`
                <span class="mt-2 bal-standard-cost-center-item-returned">0</span><br/>
                <div style="display: flex; flex-direction: 'row'">
                    <button class="bal-standard-cost-center-next-page" title="previous" style="width: 24px; font-size: 19px; margin-top: -6px;"> < </button>
                    <ul class="bal-standard-cost-center-page-number page_scroll" style="display: flex;list-style: none; padding-left: 0px;">
                        <li style="padding: 6px; padding-bottom: 0px;"  data-page="1" class="bal-standard-cost-center-page-link text-bold-link" >1</li>
                    </ul>
                    <button class="bal-standard-cost-center-next-page" title="next" style="width: 24px; font-size: 19px;margin-top: -6px;"> > </button>
                </div>
            `);
      $(document).on(
        "click",
        ".bal-standard-cost-center-page-link",
        function () {
          const page = $(this).data("page");
          $(".bal-standard-cost-center-page-link").removeClass(
            "text-bold-link"
          );
          $(this).addClass("text-bold-link");
          that.backToPage(that, page - 1);
          window.console.log(page - 1);
        }
      );
      // $(document).on('click', '.bycus-next-page', function () {
      $(".bal-standard-cost-center-next-page").click(function () {
        const page_number = $(this)
          .parent()
          .children(".bal-standard-cost-center-page-number")
          .find("li")
          .last()
          .data("page");
        window.console.log("bal-standard-cost-center-page_number", page_number);
        const isPrevious = $(this).attr("title");
        if (isPrevious == "previous") {
          const currectpage = $(".text-bold-link").data("page");

          if (currectpage == 1) {
            return;
          }
          $(".bal-standard-cost-center-page-link").removeClass(
            "text-bold-link"
          );
          $(
            `.bal-standard-cost-center-page-link:eq(${currectpage - 1})`
          ).addClass("text-bold-link");
          that.backToPage(that, currectpage - 2);
          window.console.log("this currectpage back", currectpage - 2);
        } else {
          $(".bal-standard-cost-center-page-link").removeClass(
            "text-bold-link"
          );
          that.loadSkuconnect();
          $(this)
            .parent()
            .children(".bal-standard-cost-center-page-number")
            .append(
              `<li class="bal-standard-cost-center-page-link text-bold-link" style="padding: 6px; padding-bottom: 0px;" data-page="${
                page_number + 1
              }">${page_number + 1}</li>`
            );
        }
        window.console.log("this", page_number + 1);
      });
    },
    itemRetuned(that) {
      let totalRow = 0;
      that.txnVariantBalance.forEach((k) => {
        totalRow += k.length;
      });
      $(".bal-standard-cost-center-item-returned").text(
        "Items returned (" + totalRow + ")"
      );
    },
    disabledNextPage(value) {
      $(".bal-standard-cost-center-next-page").prop("disabled", value);
    },
    backToPage(that, index) {
      try {
        const byProduct = that.txnVariantBalance.at(index);
        that.variantBalanceList = byProduct;
        // that.refreshGridData(customer)
        window.console.log("that.txnVariantBalance[index]", byProduct);
      } catch (e) {
        window.console.log("ERROR on backToPage", index);
      }
    },
    onSearch() {
      // this.txnVariantBalance = [];
      // this.loadPage(this);
      // this.paging = {};
      window.console.log("onSearch", "watch", this.itemId);
      this.loadSkuconnect("cus-");
      this.loadSkuconnectV("sup-");
    },
    onSearchV() {
      // this.txnVariantBalance = [];
      // this.loadPage(this);
      // this.paging = {};
      window.console.log("onSearch", "watch", this.itemId);
      this.loadSkuconnectV("sup-");
    },
    // async loadInstitutes() {
    //   settingHandler.institutes().then((res) => {
    //     window.console.log("institutes", res.data);
    //   });
    // },
  },
  mounted: async function () {
    // this.loadConversionList();
    // this.requestData(0, this.filter, this.supBaseUrl, this.pattern);
    // this.loadSkuconnect();
    await this.initToolbarV(this);
    await this.initToolbar(this);
    // this.loadInstitutes()
    // this.loadPage(this);
    // this.itemRetuned(this);
    // this.disabledNextPage(true);
    this.onSearch();
  },
  watch: {
    // '$route': "onSearch",
    product() {
      if (this.product !== undefined) {
        this.showLoading = true;
        this.onSearch();
        this.showLoading = false;
      }
    },
  },
  computed: {
    info() {
      return this.product || {};
    },
    sku() {
      const product = this.product || {};
      return product.sku || "";
    },
    itemId() {
      const product = this.product || {};
      return product.id || "";
    },
    // dateFormatted() {
    //   return this.standardCost.appliedDate
    //     ? kendo.toString(
    //         new Date(this.standardCost.appliedDate),
    //         this.dateFormat
    //       )
    //     : "";
    // },
    // baseUOMName() {
    //   if (this.product) {
    //     if (this.product.hasOwnProperty("uom")) {
    //       return this.product.uom.name;
    //     } else {
    //       return "";
    //     }
    //   } else {
    //     return "";
    //   }
    // },
    baseUOM() {
      if (this.product) {
        if (this.product.hasOwnProperty("uom")) {
          return this.product.uom;
        } else {
          return "";
        }
      } else {
        return "";
      }
    },
    // variantId() {
    //   if (this.product) {
    //     if (this.product.hasOwnProperty("id")) {
    //       return this.product.id;
    //     } else {
    //       return "";
    //     }
    //   } else {
    //     return "";
    //   }
    // },
  },
};
</script>
<style scoped>
.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background-color: transparent !important;
}

.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr.third:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background-color: #4d4848 !important;
}

.theme--light.v-data-table {
  background-color: transparent !important;
  border-top: thin solid #ddd;
  border-bottom: thin solid #ddd;
  border-radius: 0 !important;
}

.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:not(:last-child)
  > td:not(.v-data-table__mobile-row),
.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:not(:last-child)
  > th:not(.v-data-table__mobile-row) {
  border-bottom: thin solid #ddd;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  height: 32px !important;
}
.duply-row {
  background-color: #aa0;
}
</style>
