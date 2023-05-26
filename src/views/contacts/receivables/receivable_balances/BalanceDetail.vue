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
      <v-card color="white" class="pa-3 no_border" elevation="0">
        <v-row>
          <v-col sm="7" cols="12" class="py-0">
            <h2 class="mb-0 font_020">{{ $t("receivable_balance_detail") }}</h2>
            <p class="mb-0">{{ $t("receivable_balance_detail_desc") }}</p>
          </v-col>
          <v-col
            sm="5"
            cols="12"
            class="py-0"
            v-if="
              appType !== 'Supply' && appType !== 'Marketing' && appType !== 'Service'
            "
          >
          </v-col>
          <v-col sm="5" cols="12" class="py-0" v-else>
            <v-btn
              color="primary"
              class="float-right white--text capitalize ml-2"
              to="cash_receipt"
              >{{ $t("cash_receipt") }}
            </v-btn>
          </v-col>
          <!-- <v-col sm="4" cols="12" class="pt-0"> -->
          <!-- <v-select
              :items="customerTypes"
              item-value="id"
              :loading="customerTypes.length === 0"
              item-text="name"
              v-model="mCustomerType"
              return-object
              :placeholder="$t('type')"
              clearable
              outlined
            />
            <v-select
              v-if="appType != 'npo'"
              :items="customerGroups"
              item-value="id"
              item-text="name"
              return-object
              v-model="mCustomerGroup"
              :placeholder="$t('customer_group')"
              clearable
              outlined
            /> -->
          <!-- <v-checkbox
              v-model="hideZeroAmount"
              :label="$t('hide_zero_amount')"
              class="mt-0"
              color="primary"
              @change="showHideZeroAmount"
              hide-details
            ></v-checkbox> -->
          <!-- </v-col> -->
          <v-col sm="4" cols="12" class="kendo_dropdown_custom py-0 mt-5">
            <app-datepicker :initialDate="asOf" @emitDate="asOf = $event" />
          </v-col>
          <v-col sm="3" cols="12" class="kendo_dropdown_custom py-0">
            <label class="label">{{ $t("customer_name") }}</label>
            <dropdownlist
              :data-items="customerList"
              @change="onChange"
              :value="customer"
              :data-item-key="dataItemKey"
              :text-field="textField"
              :default-item="defaultItem"
              :filterable="true"
              @filterchange="onFilterChange"
            >
            </dropdownlist>
          </v-col>
          <v-col sm="1" cols="1" class="mt-3">
            <!-- <v-btn color="primary white--text" @click="loadReceivable">
              <i
                class="b-search"
                style="font-size: 18px; color: #fff !important"
              />
            </v-btn> -->
            <v-btn color="primary white--text" @click="onSearch">
              <i class="b-search" style="font-size: 18px; color: #fff !important" />
            </v-btn>
          </v-col>
        </v-row>

        <v-row
          v-if="
            this.appType !== 'Supply' &&
            this.appType !== 'Marketing' &&
            this.appType !== 'Service'
          "
          class="mt-0"
        >
          <v-col sm="4" cols="12" class="pt-0">
            <v-card
              outlined
              dense
              class="pa-3 no_border rounded-4 white--text"
              color="third"
              height="60px"
            >
              <h3 class="text-left font_12 text-uppercase flex-1">
                {{ $t("overdue_amount") }}
              </h3>
              <h3 class="text-right mt-0 font_20 flex-1">
                {{ overDueAmount }}
              </h3>
            </v-card>
          </v-col>
          <v-col sm="4" cols="12" class="pt-0">
            <v-card
              outlined
              dense
              class="pa-3 no_border rounded-4 white--text"
              color="third"
              height="60px"
            >
              <h3 class="text-left font_12 flex-1 text-uppercase">
                {{ $t("receivable_balance") }}
              </h3>
              <h3 class="text-right flex-1 font_20 mt-0">
                {{ receivableBalance }}
              </h3>
            </v-card>
          </v-col>
          <v-col sm="4" cols="12" class="pt-0">
            <v-card
              outlined
              dense
              class="pa-3 no_border rounded-4 white--text"
              color="third"
              height="60px"
            >
              <h3 class="text-left font_12 flex-1 text-uppercase">
                {{ $t("to_be_collected") }}
              </h3>
              <h3 class="text-right flex-1 font_20 mt-0">
                {{ tobeCollected }}
              </h3>
            </v-card>
          </v-col>
        </v-row>
        <gridFullScreen>
          <v-row>
            <v-col sm="12" cols="12" class="py-0">
              <v-btn
                :loading="laodExcel"
                color="primary"
                style="height: 28px !important; border-radius: 2px !important"
                class="text--white capitalize"
                @click="excelExportBtn"
                >Export to Excel</v-btn
              >
              <template>
                <LoadingMe
                  :isLoading="showLoading"
                  :fullPage="false"
                  type="loading"
                  :myLoading="true"
                />
                <kendo-datasource
                  ref="balanceDetailDS"
                  :group="group"
                  :data="balanceDetailList"
                />
                <kendo-grid
                  id="gridReceivableBalanceDetail"
                  class="grid-function"
                  :data-source-ref="'balanceDetailDS'"
                  :sortable="true"
                  :groupable="true"
                  :filterable="true"
                  :column-menu="true"
                  :noRecords="true"
                  :editable="false"
                  :resizable="true"
                  v-on:databound="dataBound"
                  :excel-file-name="'Receivable Balance Detail.xlsx'"
                  :excel-filterable="true"
                  :excel-all-pages="true"
                  :excel-export="excelExport"
                  :scrollable-virtual="true"
                >
                  <kendo-grid-column
                    :field="'transactionDate'"
                    :title="$t('date')"
                    :template="'<span>#= kendo.toString(new Date(transactionDate), dateFormat)#</span>'"
                    :group-footer-template="$t('total')"
                    :width="120"
                    :filterable="true"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />

                  <kendo-grid-column
                    :field="'customerType'"
                    :title="$t('type')"
                    :template="'<span>#=customerType#</span>'"
                    :width="180"
                    :hidden="true"
                    :filterable="false"
                    :attributes="{ style: 'text-align: left; ' }"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5;text-align: center',
                    }"
                  />
                  <kendo-grid-column
                    :field="'group'"
                    :title="$t('group')"
                    :template="'<span>#=group#</span>'"
                    :width="180"
                    :hidden="true"
                    :filterable="false"
                    :attributes="{ style: 'text-align: left; ' }"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5;text-align: center',
                    }"
                  />
                  <kendo-grid-column
                    :field="'name'"
                    :title="$t('name')"
                    :attributes="{ class: 'tb_name_td' }"
                    :template="'<span>#=name#</span>'"
                    :width="200"
                    :group-header-template="'#=value#'"
                    :filterable-multi="true"
                    :filterable-search="true"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'empName'"
                    :title="$t('employee_name')"
                    :template="'<span>#=empName#</span>'"
                    :width="200"
                    :hidden="true"
                    :filterable="{ multi: true }"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'referenceNo'"
                    :title="$t('invoice_no')"
                    :template="referenceTemplate"
                    :width="180"
                    :filterable="false"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'journalNote'"
                    :title="$t('description')"
                    :width="200"
                    :hidden="true"
                    :filterable="false"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    v-if="!plansNotAccess.includes(4)"
                    :field="'code'"
                    :title="$t('payment_code')"
                    :template="'<span>#=code#</span>'"
                    :width="170"
                    :filterable="false"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'amount'"
                    :title="$t('open_amount')"
                    :template="'<span>#= kendo.toString(parseFloat(amount || 0), decimalFormat)#</span>'"
                    :width="180"
                    :filterable="false"
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
                    :field="'action'"
                    :title="$t('action')"
                    :width="90"
                    :headerAttributes="{
                      style: 'text-align: left;',
                    }"
                    :attributes="{
                      style: 'text-align: left;',
                    }"
                    :filterable="false"
                    :command="[
                      {
                        text: $t('detailbtn'),
                        click: goDetial,
                        className: 'detail',
                      },
                    ]"
                  />
                  <kendo-grid-column
                    :field="'paymentTerm'"
                    :title="$t('term')"
                    :template="'<span>#=paymentTerm#</span>'"
                    :width="130"
                    :filterable="false"
                    :attributes="{ style: 'text-align: left; ' }"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5;text-align: left',
                    }"
                  />
                  <kendo-grid-column
                    :field="'dueDate'"
                    :title="$t('due_date')"
                    :template="'<span>#= kendo.toString(new Date(dueDate), dateFormat)#</span>'"
                    :width="130"
                    :filterable="false"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'overDue'"
                    :title="$t('over_due')"
                    :template="'<span>#=overDue || 0#</span>'"
                    :width="130"
                    :filterable="false"
                    :attributes="{ style: 'text-align: right; ' }"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5;text-align: right',
                    }"
                  />
                  <kendo-grid-column
                    :field="'status'"
                    :title="$t('status')"
                    :template="status"
                    :attributes="{
                      class: 'tb_name_td',
                      style: 'text-align: left',
                    }"
                    :filterable="false"
                    :width="150"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'segment.name'"
                    :title="$t('segment')"
                    :template="'<span>#=segment.name#</span>'"
                    :width="180"
                    :filterable="false"
                    :attributes="{ style: 'text-align: left; ' }"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5;text-align: left',
                    }"
                  />
                  <kendo-grid-column
                    v-if="!plansNotAccess.includes(4)"
                    :field="'location.name'"
                    :title="$t('location')"
                    :template="'<span>#=location.name#</span>'"
                    :width="180"
                    :filterable="false"
                    :attributes="{ style: 'text-align: left; ' }"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5;text-align: left',
                    }"
                  />
                </kendo-grid>
              </template>
            </v-col>
          </v-row>
        </gridFullScreen>
        <div style="overflow: auto" class="page-receivable-balance-detail"></div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
// import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'
import { DropDownList } from "@progress/kendo-vue-dropdowns";
import LinkTemplate from "@/components/kendo_templates/LinkTemplate";
import kendo from "@progress/kendo-ui";
import { i18n } from "@/i18n";
// import downloadexcel from "vue-json-excel"
import JSZip from "jszip";

window.JSZip = JSZip;
const billingHandler = require("@/scripts/invoice/handler/billingHandler");
const defaultItem = { ["name"]: "Select customer...", ["id"]: null };
// const customerHandler = require("@/scripts/customerHandler")
const balanceHandler = require("@/scripts/balance/handler/balanceHandler");
const emptyItem = { ["name"]: "loading ..." };
const $ = kendo.jQuery;
const customerTypeHandler = require("@/scripts/customerTypeHandler");
const customerGroupHandler = require("@/scripts/customerGroupHandler");
import { dataStore } from "@/observable/store";
import { exportExelFormat } from "@/utils";

const SECOND_DELAY = 1000;
export default {
  props: ["nextTab", "tIndex", "isView", "isViewEmit"],
  data: () => ({
    loading: false,
    asOf: new Date().toISOString().substr(0, 10),
    showLoading: false,
    group: [],
    aggregateDefinition: [
      { field: "name", aggregate: "count" },
      { field: "amount", aggregate: "sum" },
      { field: "code", aggregate: "count" },
    ],
    receivableList: [],
    customerList: [],
    customer: {},
    textField: "name",
    defaultItem: defaultItem,
    dataItemKey: "id",
    filter: "",
    cusBaseUrl: balanceHandler.customerVendors(),
    overDueAmount: 0,
    receivableBalance: 0,
    tobeCollected: 0,

    customerTypes: [],
    mCustomerType: {},
    customerGroups: [],
    mCustomerGroup: {},
    txnBalanceDetailList: [],
    balanceDetailList: [],
    totalCustomerBal: 0,
    toalPerPage: 0,
    paging: {},
    action: "",
    params: {},
    hideZeroAmount: true,
    segment: {},
    pageIndex: 0,
    laodExcel: false,
    stopped: false,
  }),
  components: {
    LoadingMe: () => import(`@/components/Loading`),
    gridFullScreen: () => import("@/components/gridFullScreen"),
    "app-datepicker": () => import(`@/components/custom_templates/DatePickerComponent`),
    dropdownlist: DropDownList,
  },
  methods: {
    async excelExportBtn() {
      let dataExportExcel = [];
      let groupId = "";
      let customerTypeId = "";
      let group = this.mCustomerGroup || {};
      let cusType = this.mCustomerType || {};
      groupId = group.id || "";
      customerTypeId = cusType.id || "";
      this.params = {
        asOf: this.asOf,
        tid: customerTypeId,
        grid: groupId,
        key: this.paging,
        id: this.customer.id || "",
        type: "cus",
      };

      let i = 0;
      this.laodExcel = true;
      this.stopped = false;
      try {
        while (!this.stopped) {
          i++;
          let getAll = await billingHandler.wcpReceivableList(this.params);
          this.params.key = getAll.data.key;
          dataExportExcel = dataExportExcel.concat(getAll.data.data);
          if (Object.keys(getAll.data.key).length == 0 || getAll.data.key == "") {
            this.stopped = true;
            this.balanceDetailList = dataExportExcel;
            setTimeout(() => {
              const grid = kendo.jQuery("#gridReceivableBalanceDetail").data("kendoGrid");
              grid.saveAsExcel();
            }, 1000);
            setTimeout(() => {
              "";
              this.laodExcel = false;
              const byCustomer = this.txnBalanceDetailList.at(this.pageIndex);
              this.balanceDetailList = byCustomer;
              dataExportExcel = [];
            }, 2000);
          }
          if (i > 100) this.stopped = true;
        }
      } catch (e) {
        this.stopped = true;
      }
    },
    excelExport: function (e) {
      let filterExcel = {
        dataFrom: this.asOf,
        dateTo: "",
        title: "Balance Detial",
        type: "",
      };
      exportExelFormat(e, filterExcel);
    },
    goDetial(e) {
      e.preventDefault();
      let grid = kendo.jQuery("#gridReceivableBalanceDetail").data("kendoGrid");
      let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
      window.console.log(dataItem);
      // let filterCustomer = this.customerlist.filter(c => c.name == dataItem.name)
      // dataStore.receivableBalanceRp = {
      //   cId: dataItem.id,
      //   asOf: this.asOf,
      //   name: this.customer.name,
      //   txnId:  dataItem.id,
      // };
      dataStore.receivableBalanceRp.txnId = dataItem.id;
      dataStore.receivableBalanceRp.cId = this.customer.id;
      dataStore.receivableBalanceRp.name = this.customer.name;
      this.$emit("nextTab", 3);
      this.$emit("isViewEmit", 0);
    },
    // groupFooterTemplate(dataItem) {
    //   // const str = `<div #if(${dataItem.amount.sum}===0){#class="classzero"#}#>Total:</div>`;
    //   // window.console.log('xxxx', str, dataItem.amount.sum)
    //   return  `<div #if(${dataItem.amount.sum}===0){#class="classzero"#}#>Total:</div>`;
    // },
    dataBound: function (e) {
      const grid = kendo.jQuery("#gridReceivableBalanceDetail").data("kendoGrid");
      const items = e.sender.items();
      items.each(function () {
        let dataItem = grid.dataItem(this);
        // dataItem.find(".classzero").closest(".k-group-footer").hide()
        $("tr[data-uid='" + dataItem.uid + "']")
          .find(".status")
          .each(function () {
            if (dataItem.status !== 3) {
              $(this).removeClass("k-state-disabled");
            }
          });
        //  $("tr[data-uid='" + dataItem.uid + "']")
        // .find(".classzero").closest(".k-group-footer").hide()
      });
    },
    showHideZeroAmount() {
      if (this.hideZeroAmount) {
        var grid = $("#gridReceivableBalanceDetail").data("kendoGrid");
        var gridData = grid.dataSource.view();
        for (var i = 0; i < gridData.length; i++) {
          var fields = gridData[i].items;
          if (fields) {
            var amount = fields[0].amount;
            if (parseFloat(amount) === 0) {
              // this.tbody.find("tr[data-uid='"+fields.uid+"']").hide();
              grid.table.find("tr[data-uid='" + fields[0].uid + "']").hide();
              // grid.table.find(".classzero").closest(".k-group-footer").hide();
            }
          }
        }
      } else {
        const grid = $("#gridReceivableBalanceDetail").data("kendoGrid");
        const gridData = grid.dataSource.view();
        for (let i = 0; i < gridData.length; i++) {
          const fields = gridData[i].items;
          const row = grid.table.find("tr[data-uid='" + fields[0].uid + "']");
          row.show();
        }
      }
    },
    goToCashReceipt(e) {
      e.preventDefault();
      let grid = kendo.jQuery("#gridReceivableBalanceDetail").data("kendoGrid");
      let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
      this.$router.push({
        path: "cash_receipt" + `/${dataItem.code}`,
        params: { id: dataItem.code },
        query: { type: "pmt", option: "Payment Code" },
      });
      // let grid = kendo.jQuery("#gridAddress").data("kendoGrid")
      // let dataItem = grid.dataItem($(e.currentTarget).closest("tr"))
      // this.address = dataItem
      // this.mCountry = dataItem.country
      // this.dialogM2 = true
    },
    referenceTemplate(data) {
      let url = `invoice_view/${data.id}`;
      if (data.type === "Invoice") {
        const nrd = data.nrd;
        if (nrd) {
          url = `invoice_view/${data.id}-nrd`;
        } else {
          url = `invoice_view/${data.id}`;
        }
        // url = `invoice_view/${data.id}`;
      } else if (data.type === "Sale Quote") {
        url = `sale_quote_view/${data.id}`;
      } else if (data.type === "Delayed Invoice") {
        url = `delayed_invoice_view/${data.id}`;
      }
      let args = {
        text: data.referenceNo,
        url: url,
        data: data,
      };
      return {
        template: LinkTemplate,
        templateArgs: args,
      };
    },
    // async loadReceivable() {
    //   new Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve("resolved");
    //       this.showLoading = true;
    //       let strFilter = "";
    //       strFilter = "?asOf=" + this.asOf;
    //       if (this.customer) {
    //         if (this.customer.id !== undefined && this.customer.id !== null) {
    //           strFilter = "?asOf=" + this.asOf + "&id=" + this.customer.id;
    //         }
    //       }
    //       this.showLoading = true;
    //       billingHandler.wcpReceivableList(strFilter).then((res) => {
    //         window.console.log(res.data.statusCode, "filter");
    //         if (res.data.statusCode === 200) {
    //           this.receivableList = res.data.data;
    //           const result = res.data.result;
    //           this.receivableBalance = kendo.toString(
    //             result.receivableBalance,
    //             result.decimalFormat
    //           );
    //           this.overDueAmount = kendo.toString(
    //             result.overDueAmount,
    //             result.decimalFormat
    //           );
    //           this.tobeCollected = kendo.toString(result.tobeCollected, `n0`);
    //           this.showLoading = false;
    //         }
    //       });
    //     }, 10);
    //   });
    // },
    status(dataItem) {
      let status = "";
      switch (dataItem.status) {
        case 1:
          status = i18n.t("invoice_open");
          break;
        case 2:
          status = i18n.t("partially_paid");
          break;
        case 3:
          status = i18n.t("paid");
          break;
        case 4:
          status = i18n.t("void");
          break;
      }
      return status;
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
    sumGroupAmount(dataItem) {
      if (dataItem.hasOwnProperty("sum")) {
        return "<span>#= kendo.toString(sum, `n2`)#</span>";
      }
      return `<span>#= kendo.toString(sum, 'n2')#</span>`;
    },
    async loadCustomerType() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          customerTypeHandler.get().then((res) => {
            // this.customerTypes = res;
            if (this.appType == "npo") {
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
            // if (this.customerTypes.length > 0) {
            //   this.mCustomerType = this.customerTypes[0];
            //   const group = this.mCustomerGroup || {};
            //   if (group.id !== "") {
            //     this.loadBalanceDetail();
            //   }
            // }
          });
        }, 10);
      });
    },
    async loadCustomerGroup() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          customerGroupHandler.get().then((res) => {
            this.customerGroups = res;
            // if (this.customerGroups.length > 0) {
            //   this.mCustomerGroup = [];
            //   this.txnBalanceDetailList = [];
            //   this.loadPage(this);
            //   this.paging = {};
            //   // this.loadBalanceDetail();
            // }
          });
        }, 10);
      });
    },
    async loadPage(that) {
      $(".page-receivable-balance-detail").html(`
                <span class="mt-2 receivable-balance-detail-item-returned">0</span><br/>
                <div style="display: flex; flex-direction: 'row'">
                    <button class="receivable-balance-detail-next-page" title="previous" style="width: 24px; font-size: 19px; margin-top: -6px;"> < </button>
                    <ul class="receivable-balance-detail-page-number page_scroll" style="display: flex;list-style: none; padding-left: 0px;">
                        <li style="padding: 6px; padding-bottom: 0px;"  data-page="1" class="receivable-balance-detail-page-link text-bold-link" >1</li>
                    </ul>
                    <button class="receivable-balance-detail-next-page" title="next" style="width: 24px; font-size: 19px;margin-top: -6px;"> > </button>
                </div>
            `);
      $(document).on("click", ".receivable-balance-detail-page-link", function () {
        const page = $(this).data("page");
        $(".receivable-balance-detail-page-link").removeClass("text-bold-link");
        $(this).addClass("text-bold-link");
        that.backToPage(that, page - 1);
        this.pageIndex = page - 1;
        window.console.log(page - 1);
      });
      // $(document).on('click', '.bycus-next-page', function () {
      $(".receivable-balance-detail-next-page").click(function () {
        const page_number = $(this)
          .parent()
          .children(".receivable-balance-detail-page-number")
          .find("li")
          .last()
          .data("page");
        that.pageIndex = page_number;
        window.console.log("receivable-balance-detail-page_number", page_number);
        const isPrevious = $(this).attr("title");
        if (isPrevious == "previous") {
          const currectpage = $(".text-bold-link").data("page");

          if (currectpage == 1) {
            return;
          }
          $(".receivable-balance-detail-page-link").removeClass("text-bold-link");
          $(`.receivable-balance-detail-page-link:eq(${currectpage - 1})`).addClass(
            "text-bold-link"
          );
          that.backToPage(that, currectpage - 2);
          window.console.log("this currectpage back", currectpage - 2);
        } else {
          $(".receivable-balance-detail-page-link").removeClass("text-bold-link");
          that.loadBalanceDetail();
          $(this)
            .parent()
            .children(".receivable-balance-detail-page-number")
            .append(
              `<li class="receivable-balance-detail-page-link text-bold-link" style="padding: 6px; padding-bottom: 0px;" data-page="${
                page_number + 1
              }">${page_number + 1}</li>`
            );
        }
        window.console.log("this", page_number + 1);
      });
    },
    itemRetuned(that) {
      let totalRow = 0;
      that.txnBalanceDetailList.forEach((k) => {
        totalRow += k.length;
      });
      $(".receivable-balance-detail-item-returned").text(
        "Items returned (" + totalRow + ")"
      );
    },
    disabledNextPage(value) {
      $(".receivable-balance-detail-next-page").prop("disabled", value);
    },
    backToPage(that, index) {
      try {
        const byBalanceDetail = that.txnBalanceDetailList.at(index);
        that.balanceDetailList = byBalanceDetail;
        // that.refreshGridData(customer)
        window.console.log("that.txnBalanceDetailList[index]", byBalanceDetail);
      } catch (e) {
        window.console.log("ERROR on backToPage", index);
      }
    },
    onSearch() {
      this.txnBalanceDetailList = [];
      this.loadPage(this);
      this.paging = {};
      this.loadBalanceDetail();
      this.loadBalanceDetailSummary();
    },
    async loadBalanceDetail() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.balanceDetailList = [];
          let groupId = "";
          let customerTypeId = "";
          const group = this.mCustomerGroup || {};
          const cusType = this.mCustomerType || {};
          groupId = group.id || "";
          customerTypeId = cusType.id || "";
          this.params = {
            asOf: this.asOf,
            tid: customerTypeId,
            grid: groupId,
            key: this.paging,
            id: this.customer.id || "",
            type: "cus",
          };
          this.showLoading = true;
          this.disabledNextPage(true);
          billingHandler.wcpReceivableList(this.params).then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoading = false;
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
              const total = res.data.total || 0;
              this.showLoading = false;
              this.balanceDetailList = responseData;
              this.paging = res.data.key;
              this.txnBalanceDetailList.push(responseData);

              this.toalPerPage = this.balanceDetailList.length;
              this.totalCustomerBal = total;

              if (Object.keys(this.paging).length > 0) {
                this.disabledNextPage(false);
              } else {
                this.disabledNextPage(true);
              }
              this.itemRetuned(this);
            } else {
              this.showLoading = false;
            }
            // this.showHideZeroAmount();
          });
        }, 10);
      });
    },
    async loadBalanceDetailSummary() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          // this.balanceDetailList = [];
          let groupId = "";
          let customerTypeId = "";
          const group = this.mCustomerGroup || {};
          const cusType = this.mCustomerType || {};
          groupId = group.id || "";
          customerTypeId = cusType.id || "";
          this.params = {
            asOf: this.asOf,
            tid: customerTypeId,
            grid: groupId,
            key: this.paging,
            id: this.customer.id || "",
            summary: 1,
            type: "cus",
          };
          this.showLoading = true;
          this.disabledNextPage(true);
          billingHandler.wcpReceivableList(this.params).then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoading = false;
              const responseData = res.data.data[0] || [];
              this.receivableBalance = kendo.toString(
                responseData.receivableBalance,
                responseData.decimalFormat
              );
              this.overDueAmount = kendo.toString(
                responseData.overDueAmount,
                responseData.decimalFormat
              );
              this.tobeCollected = kendo.toString(responseData.tobeCollected, `n0`);
            } else {
              this.showLoading = false;
            }
            // this.showHideZeroAmount();
          });
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
    receivableBalanceRp() {
      return dataStore.receivableBalanceRp;
    },
  },
  watch: {
    tIndex() {
      window.console.log("this.receivableBalanceRp.cId", this.receivableBalanceRp.cId);
      if (this.receivableBalanceRp) {
        this.customer = {
          id: this.receivableBalanceRp.cId,
          name: this.receivableBalanceRp.name,
        };
        if (this.receivableBalanceRp.asOf) {
          this.asOf = this.receivableBalanceRp.asOf;
        }
        this.customer.id = this.receivableBalanceRp.cId;
        if (this.isView == 1) {
          this.loadBalanceDetail();
          this.$emit("isViewEmit", 0);
        }
      }
    },
  },
  created: async function () {
    this.requestData(0, this.filter, this.cusBaseUrl);
  },
  mounted: async function () {
    this.group = [
      {
        field: "name",
        aggregates: this.aggregateDefinition,
      },
    ];
    // await this.loadCustomerType();
    // await this.loadCustomerGroup();
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
    // this.showHideZeroAmount();
  },
};
</script>
<style scoped>
.theme--light.v-data-table {
  background-color: transparent !important;
}

.b-search:before {
  color: #fff !important;
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
</style>
