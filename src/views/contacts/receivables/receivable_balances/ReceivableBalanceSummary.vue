<template>
  <v-row>
    <v-col sm="12" cols="12" class="grayBg px-6">
      <v-card color="white" class="pa-3 no_border" elevation="0">
        <v-row>
          <v-col sm="12" cols="12" class="pt-0">
            <h2 class="mb-1 font_020">{{ $t("receivable_balance_summary") }}</h2>
            <p class="mb-0">{{ $t("receivable_balance_summary_desc") }}</p>
          </v-col>
          <v-col sm="4" cols="12" class="py-0 mt-1">
            <v-select
              class=""
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
          </v-col>
          <v-col sm="4" cols="12" class="py-0">
            <app-datepicker :initialDate="asOf" @emitDate="asOf = $event" />
          </v-col>
          <v-col sm="1" cols="12" class="py-0">
            <v-btn
              color="primary"
              class="text-capitalize white--text mt-1"
              @click="onSearch"
            >
              <i class="b-search" style="font-size: 18px; color: #fff !important" />
            </v-btn>
          </v-col>
          <v-col sm="4" cols="12" class="py-0 mt-6">
            <v-select
              class=""
              v-if="appType != 'npo'"
              :items="customerGroups"
              item-value="id"
              item-text="name"
              return-object
              v-model="mCustomerGroup"
              :placeholder="$t('customer_group')"
              clearable
              outlined
            />
          </v-col>
          <v-col sm="4" cols="12" class="pt-0">
            <label class="label">{{ $t("customer_name") }}</label>
            <dropdownlist
              class="kendo_dropdown_custom mt-1"
              style="width: 100%"
              :data-items="customerList"
              @change="onChange"
              :value="customer"
              :data-item-key="dataItemKey"
              :text-field="textField"
              :default-item="defaultItem"
              :filterable="true"
              clearable
              :placeholder="$t('customer')"
              :loading="loading"
              @filterchange="onFilterChange"
            >
            </dropdownlist>
          </v-col>
        </v-row>

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
                ref="balanceSummaryDS"
                :group="group"
                :data="balanceList"
              />
              <kendo-grid
                id="gridReceivableBalanceSummary"
                class="grid-function"
                :data-source-ref="'balanceSummaryDS'"
                :sortable="false"
                :groupable="true"
                :filterable="false"
                :column-menu="true"
                :noRecords="true"
                :editable="false"
                :excel-file-name="'Receivable Balance Summary.xlsx'"
                :excel-filterable="true"
                :excel-all-pages="true"
                :excel-export="excelExport"
                :scrollable-virtual="true"
              >
                <kendo-grid-column
                  :field="'name'"
                  :title="$t('name')"
                  :attributes="{ class: 'tb_name_td' }"
                  :group-footer-template="$t('total')"
                  :template="'<span>#=name#</span>'"
                  :width="200"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'type'"
                  :title="$t('type')"
                  :template="'<span>#=type#</span>'"
                  :width="200"
                  :group-header-template="'#=value#'"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5',
                  }"
                />
                <kendo-grid-column
                  :field="'group'"
                  :title="$t('group')"
                  :width="200"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'balance'"
                  :title="$t('balance')"
                  :template="'<span>#= kendo.toString(balance, decimalFormat)#</span>'"
                  :width="200"
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
                  :field="''"
                  :sortable="false"
                  :attributes="{
                    style: 'text-align: left;',
                  }"
                  :title="$t('action')"
                  :width="90"
                  :command="[
                    {
                      iconClass: 'k-icon k-i-eye',
                      text: $t('detailbtn'),
                      click: goDetial,
                    },
                  ]"
                  :headerAttributes="{
                    style: 'text-align: left; background-color: #EDF1F5',
                  }"
                />
              </kendo-grid>
            </template>
          </v-col>
        </v-row>
        <div style="overflow: auto" class="page-receivable-balance-summary"></div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { DropDownList } from "@progress/kendo-vue-dropdowns";
import { dataStore } from "@/observable/store";
const $ = kendo.jQuery;
import kendo from "@progress/kendo-ui";
const customerTypeHandler = require("@/scripts/customerTypeHandler");
const customerGroupHandler = require("@/scripts/customerGroupHandler");
// const customerHandler = require("@/scripts/customerHandler");
const balanceHandler = require("@/scripts/balance/handler/balanceHandler");

const billingHandler = require("@/scripts/invoice/handler/billingHandler");
const defaultItem = { ["name"]: "Select customer...", ["id"]: null };
const emptyItem = { ["name"]: "loading ..." };
import { exportExelFormat } from "@/utils";

import JSZip from "jszip";
window.JSZip = JSZip;
const SECOND_DELAY = 1000;
// const $ = require("jquery")
export default {
  props: ["nextTab", "isViewEmit"],
  data: () => ({
    loading: false,
    asOf: new Date().toISOString().substring(0, 10),
    showLoading: false,
    group: [],
    aggregateDefinition: [
      { field: "name", aggregate: "count" },
      { field: "balance", aggregate: "sum" },
      { field: "code", aggregate: "count" },
    ],
    balanceList: [],
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
    txnBalanceList: [],
    totalCustomerBal: 0,
    toalPerPage: 0,
    paging: {},
    action: "",
    params: {},
    exfield: {
      Name: "name",
      Type: "customerType",
      Group: "customerGroup",
      Balance: "balance",
      "Over Due": "overDue",
    },
    pageIndex: 0,
    laodExcel: false,
    stopped: false,
  }),
  components: {
    LoadingMe: () => import(`@/components/Loading`),
    "app-datepicker": () => import(`@/components/custom_templates/DatePickerComponent`),
    dropdownlist: DropDownList,
    // downloadexcel: downloadexcel
  },
  methods: {
    async excelExportBtn() {
      let dataExportExcel = [];
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

      let i = 0;
      this.laodExcel = true;
      this.stopped = false;
      try {
        while (!this.stopped) {
          i++;
          let getAll = await billingHandler.balanceSummary(this.params);
          this.params.key = getAll.data.key;
          dataExportExcel = dataExportExcel.concat(getAll.data.data);
          if (Object.keys(getAll.data.key).length == 0 || getAll.data.key == "") {
            this.stopped = true;
            this.balanceList = dataExportExcel;
            setTimeout(() => {
              const grid = kendo
                .jQuery("#gridReceivableBalanceSummary")
                .data("kendoGrid");
              grid.saveAsExcel();
            }, 1000);
            setTimeout(() => {
              "";
              this.laodExcel = false;
              const byCustomer = this.txnBalanceList.at(this.pageIndex);
              this.balanceList = byCustomer;
              dataExportExcel = [];
            }, 2000);
          }
          if (i > 100) this.stopped = true;
        }
      } catch (e) {
        this.stopped = true;
        window.console.log(e);
      }
    },
    excelExport: function (e) {
      let filterExcel = {
        dataFrom: this.asOf,
        dateTo: "",
        title: "Receivable Balance Summary",
        type: "",
      };
      exportExelFormat(e, filterExcel);
    },
    goDetial(e) {
      e.preventDefault();
      let grid = kendo.jQuery("#gridReceivableBalanceSummary").data("kendoGrid");
      let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
      dataStore.receivableBalanceRp = {
        cId: dataItem.id,
        asOf: this.asOf,
        name: this.customer.name,
      };
      this.$emit("nextTab", 1);
      this.$emit("isViewEmit", 1);
    },
    // async balanceSummary() {
    //   new Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve("resolved");
    //       this.showLoading = true;
    //       let strFilter = "";
    //       strFilter = "?asOf=" + this.asOf + "&type=bal-" + "&txnType=Customer";
    //       if (this.customer) {
    //         if (this.customer.id !== undefined && this.customer.id !== null) {
    //           strFilter =
    //             "?asOf=" +
    //             this.asOf +
    //             "&id=" +
    //             this.customer.id +
    //             "&type=bal-" +
    //             "&txnType=Customer";
    //         }
    //       }
    //       this.showLoading = true;
    //       billingHandler.vendorDepositBalanceSummary(strFilter).then((res) => {
    //         if (res.data.statusCode === 200) {
    //           this.balanceList = res.data.data;
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
          status = "Open";
          break;
        case 2:
          status = "Partially Paid";
          break;
        case 3:
          status = "Paid";
          break;
        case 4:
          status = "Void";
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
            //     this.loadBalanceSummary();
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
            //   this.txnBalanceList = [];
            //   this.loadPage(this);
            //   this.paging = {};
            //   // this.loadBalanceSummary();
            // }
          });
        }, 10);
      });
    },
    async loadPage(that) {
      $(".page-receivable-balance-summary").html(`
                <span class="mt-2 receivable-balance-summary-item-returned">0</span><br/>
                <div style="display: flex; flex-direction: 'row'">
                    <button class="receivable-balance-summary-next-page" title="previous" style="width: 24px; font-size: 19px; margin-top: -6px;"> < </button>
                    <ul class="receivable-balance-summary-page-number page_scroll" style="display: flex;list-style: none; padding-left: 0px;">
                        <li style="padding: 6px; padding-bottom: 0px;"  data-page="1" class="receivable-balance-summary-page-link text-bold-link" >1</li>
                    </ul>
                    <button class="receivable-balance-summary-next-page" title="next" style="width: 24px; font-size: 19px;margin-top: -6px;"> > </button>
                </div>
            `);
      $(document).on("click", ".receivable-balance-summary-page-link", function () {
        const page = $(this).data("page");
        $(".receivable-balance-summary-page-link").removeClass("text-bold-link");
        $(this).addClass("text-bold-link");
        that.backToPage(that, page - 1);
        this.pageIndex = page - 1;
        window.console.log(page - 1);
      });
      // $(document).on('click', '.bycus-next-page', function () {
      $(".receivable-balance-summary-next-page").click(function () {
        const page_number = $(this)
          .parent()
          .children(".receivable-balance-summary-page-number")
          .find("li")
          .last()
          .data("page");
        that.pageIndex = page_number;
        window.console.log("receivable-balance-summary-page_number", page_number);
        const isPrevious = $(this).attr("title");
        if (isPrevious == "previous") {
          const currectpage = $(".text-bold-link").data("page");

          if (currectpage == 1) {
            return;
          }
          $(".receivable-balance-summary-page-link").removeClass("text-bold-link");
          $(`.receivable-balance-summary-page-link:eq(${currectpage - 1})`).addClass(
            "text-bold-link"
          );
          that.backToPage(that, currectpage - 2);
          window.console.log("this currectpage back", currectpage - 2);
        } else {
          $(".receivable-balance-summary-page-link").removeClass("text-bold-link");
          that.loadBalanceSummary();
          $(this)
            .parent()
            .children(".receivable-balance-summary-page-number")
            .append(
              `<li class="receivable-balance-summary-page-link text-bold-link" style="padding: 6px; padding-bottom: 0px;" data-page="${
                page_number + 1
              }">${page_number + 1}</li>`
            );
        }
        window.console.log("this", page_number + 1);
      });
    },
    itemRetuned(that) {
      let totalRow = 0;
      that.txnBalanceList.forEach((k) => {
        totalRow += k.length;
      });
      $(".receivable-balance-summary-item-returned").text(
        "Items returned (" + totalRow + ")"
      );
    },
    disabledNextPage(value) {
      $(".receivable-balance-summary-next-page").prop("disabled", value);
    },
    backToPage(that, index) {
      try {
        const byCustomer = that.txnBalanceList.at(index);
        that.balanceList = byCustomer;
        // that.refreshGridData(customer)
        window.console.log("that.txnBalanceList[index]", byCustomer);
      } catch (e) {
        window.console.log("ERROR on backToPage", index);
      }
    },
    onSearch() {
      this.txnBalanceList = [];
      this.loadPage(this);
      this.paging = {};
      this.loadBalanceSummary();
    },
    async loadBalanceSummary() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.balanceList = [];
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
          billingHandler.balanceSummary(this.params).then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoading = false;
              const responseData = res.data.data || [];
              const total = res.data.total || 0;
              this.showLoading = false;
              this.balanceList = responseData;
              this.paging = res.data.key;
              this.txnBalanceList.push(responseData);

              this.toalPerPage = this.balanceList.length;
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
          });
        }, 10);
      });
    },
    onCustomerTypeChanged() {
      this.txnBalanceList = [];
      this.loadPage(this);
      this.paging = {};
      this.loadBalanceSummary();
    },
  },
  computed: {
    appType() {
      return dataStore.productType;
    },
  },
  mounted: async function () {
    this.group = [
      {
        field: "type",
        aggregates: this.aggregateDefinition,
      },
    ];
    await this.loadCustomerType();
    await this.loadCustomerGroup();
    this.requestData(0, this.filter, this.cusBaseUrl);
    this.loadPage(this);
    this.itemRetuned(this);
    this.disabledNextPage(true);
  },
};
</script>
<style scoped>
.theme--light.v-data-table {
  background-color: transparent !important;
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

.b-search:before {
  color: #fff !important;
}
</style>
