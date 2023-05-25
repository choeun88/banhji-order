<template>
  <v-row>
    <v-col sm="12" cols="12" class="grayBg px-6">
      <v-card color="white" class="pa-3 no_border" elevation="0">
        <v-row>
          <v-col sm="9" cols="12" class="pt-0">
            <h2 class="mb-1 font_020">{{ $t("receivable_aging") }}</h2>
            <p class="mb-0">{{ $t("receivable_aging_desc") }}</p>
          </v-col>
          <v-col sm="4" cols="12" class="py-0 mt-1">
            <v-select
              class=""
              :items="customerTypes"
              item-value="id"
              :loading="customerTypes.length === 0"
              item-text="name"
              v-model="mCustomerType"
              @change="onCustomerTypeChanged('')"
              return-object
              :placeholder="$t('type')"
              clearable
              outlined
            />
          </v-col>
          <v-col sm="4" cols="12" class="kendo_dropdown_custom py-0">
            <app-datepicker :initialDate="asOf" @emitDate="asOf = $event" />
          </v-col>
          <v-col sm="1" cols="1" class="pt-1">
            <v-btn color="primary white--text" @click="onSearch">
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
              @change="onCustomerGroupChanged('')"
              :placeholder="$t('customer_group')"
              clearable
              outlined
            />
          </v-col>
          <v-col sm="4" cols="12" class="kendo_dropdown_custom py-1">
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

          <v-col sm="1" cols="1" class="pt-1">
            <!-- <downloadexcel
                            icon
                            color="black"
                            class="bg-none float-right "
                            :data="receivableAgingList"
                            :fields="exfield"
                            type="xls"
                            worksheet="Aging Balance"
                            name="ReceivableAging.xls">
                            <v-icon class="font_34" style="color: black;margin-top: 3px;margin-left: 10px;">fa
                                fa-file-excel
                            </v-icon>
                        </downloadexcel> -->
          </v-col>
        </v-row>
        <v-row class="mt-0">
          <v-col sm="4" cols="12" class="pt-0">
            <v-card
              outlined
              dense
              class="pa-3 rounded-4 no_border white--text"
              color="secondary"
              height="60px"
            >
              <h3 class="text-left flex-1 font_12 flex-1 text-uppercase">
                {{ $t("customer") }}
              </h3>
              <h3 class="text-right flex-1 font_20">{{ totalCustomer }}</h3>
            </v-card>
          </v-col>
          <v-col sm="4" cols="12" class="pt-0">
            <v-card
              outlined
              dense
              class="pa-3 rounded-4 no_border white--text"
              color="third"
              height="60px"
            >
              <h3 class="text-left flex-1 text-uppercase font_12">
                {{ $t("receivable_balance") }}
              </h3>
              <h3 class="text-right flex-1 font_20">{{ receivableBalance }}</h3>
            </v-card>
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
              <kendo-datasource ref="balanceAgingDS" :data="balanceAgingList" />
              <kendo-grid
                id="gridReceivableAging"
                class="grid-function"
                :data-source-ref="'balanceAgingDS'"
                :column-menu="true"
                :excel-export="excelExport"
                :noRecords="true"
                :hidden="true"
                :sortable="true"
                :editable="false"
                :scrollable-virtual="true"
              >
                <kendo-grid-column
                  :field="'name'"
                  :attributes="{ class: 'tb_name_td' }"
                  :title="$t('name')"
                  :template="'<span>#=name#</span>'"
                  :width="200"
                  :locked="true"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'type'"
                  :title="$t('type')"
                  :template="'<span>#=type || ``#</span>'"
                  :width="200"
                  :hidden="true"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'group'"
                  :title="$t('group')"
                  :template="'<span>#=group || ``#</span>'"
                  :width="200"
                  :hidden="true"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'_current'"
                  :title="$t('current')"
                  :template="'<span>#= kendo.toString(_current, decimalFormat)#</span>'"
                  :width="200"
                  :attributes="{ style: 'text-align: right; ' }"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5;text-align: right',
                  }"
                />
                <kendo-grid-column
                  :field="'_1_30'"
                  :title="$t('1_30')"
                  :template="'<span>#= kendo.toString(_1_30, decimalFormat)#</span>'"
                  :width="200"
                  :attributes="{ style: 'text-align: right; ' }"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5;text-align: right',
                  }"
                />
                <kendo-grid-column
                  :field="'_31_60'"
                  :title="$t('31_60')"
                  :template="'<span>#= kendo.toString(_31_60, decimalFormat)#</span>'"
                  :width="200"
                  :attributes="{ style: 'text-align: right; ' }"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5;text-align: right',
                  }"
                />
                <kendo-grid-column
                  :field="'_61_90'"
                  :title="$t('61_90')"
                  :template="'<span>#= kendo.toString(_61_90, decimalFormat)#</span>'"
                  :width="200"
                  :attributes="{ style: 'text-align: right; ' }"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5;text-align: right',
                  }"
                />
                <kendo-grid-column
                  :field="'_90'"
                  :title="$t('>_90')"
                  :template="'<span>#= kendo.toString(_90, decimalFormat)#</span>'"
                  :width="200"
                  :attributes="{ style: 'text-align: right; ' }"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5;text-align: right',
                  }"
                />
                <kendo-grid-column
                  :field="'total'"
                  :title="$t('total')"
                  :template="'<span>#= kendo.toString(total, decimalFormat)#</span>'"
                  :width="200"
                  :attributes="{
                    style: 'text-align: right;',
                    class: 'tb_name_td',
                  }"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5;text-align: right',
                  }"
                />
                <kendo-grid-column
                  :field="'percentOfCreditLimit'"
                  :title="$t('%_of_credit_limit')"
                  :template="'<span>#= kendo.toString(parseFloat(percentOfCreditLimit || 0), decimalFormat)#</span>'"
                  :width="200"
                  :attributes="{ style: 'text-align: right; ' }"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5;text-align: right',
                  }"
                />
              </kendo-grid>
            </template>
          </v-col>
        </v-row>

        <div style="overflow: auto" class="page-receivable-balance-aging"></div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { DropDownList } from "@progress/kendo-vue-dropdowns";
import kendo from "@progress/kendo-ui";
const $ = kendo.jQuery;
import { dataStore } from "@/observable/store";
const billingHandler = require("@/scripts/invoice/handler/billingHandler");
const balanceHandler = require("@/scripts/balance/handler/balanceHandler");
const customerTypeHandler = require("@/scripts/customerTypeHandler");
const customerGroupHandler = require("@/scripts/customerGroupHandler");
const defaultItem = { ["name"]: "Select customer...", ["id"]: null };
// const customerHandler = require("@/scripts/customerHandler")
const emptyItem = { ["name"]: "loading ..." };
const SECOND_DELAY = 1000;
import { exportExelFormat } from "@/utils";

export default {
  data: () => ({
    loading: false,
    showLoading: false,
    asOf: new Date().toISOString().substring(0, 10),
    customerList: [],
    customer: {},
    receivableAgingList: [],
    textField: "name",
    defaultItem: defaultItem,
    dataItemKey: "id",
    filter: "",
    cusBaseUrl: balanceHandler.customerVendors(),
    totalCustomer: 0,
    receivableBalance: 0,

    txnBalanceAgingList: [],
    balanceAgingList: [],
    totalCustomerBal: 0,
    toalPerPage: 0,
    paging: {},
    action: "",
    params: {},

    exfield: {
      Name: "name",
      Current: "_current",
      "1-30": "_1_30",
      "31-60": "_31_60",
      "61-90": "_61_90",
      "> 90": "_90",
      Total: "total",
      "% of Sale": "percentOfSale",
    },
    pageIndex: 0,
    laodExcel: false,
    stopped: false,
    customerTypes: [],
    mCustomerType: {},
    customerGroups: [],
    mCustomerGroup: {},
  }),
  components: {
    LoadingMe: () => import(`@/components/Loading`),
    "app-datepicker": () => import(`@/components/custom_templates/DatePickerComponent`),
    dropdownlist: DropDownList,
    // downloadexcel: downloadexcel
  },
  methods: {
    onCustomerTypeChanged() {
      this.mCustomerGroup = {};
      this.customer = {};
    },
    onCustomerGroupChanged() {
      this.customer = {};
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
          });
        }, 10);
      });
    },
    async excelExportBtn() {
      let dataExportExcel = [];
      let customerTypeId = "";
      const group = this.mCustomerGroup || {};
      const cusType = this.mCustomerType || {};
      let groupId = "";
      groupId = group.id || "";
      customerTypeId = cusType.id || "";
      this.paging = {};
      this.params = {
        tid: customerTypeId,
        grid: groupId,
        asOf: this.asOf,
        key: this.paging,
        id: this.customer.id || "",
        type: "cus",
      };
      let i = 0;
      this.laodExcel = true;
      this.stopped = false;
      // const grid = kendo.jQuery("#gridReceivableAging").data("kendoGrid");
      // grid.saveAsExcel();
      try {
        while (!this.stopped) {
          i++;
          let getAll = await billingHandler.wcpReceivableAgingList(this.params);
          this.params.key = getAll.data.key;
          dataExportExcel = dataExportExcel.concat(getAll.data.data);
          if (Object.keys(getAll.data.key).length == 0 || getAll.data.key == "") {
            this.stopped = true;
            this.balanceAgingList = dataExportExcel;
            window.console.log("balanceAgingList", this.balanceAgingList);

            setTimeout(() => {
              const grid = kendo.jQuery("#gridReceivableAging").data("kendoGrid");
              grid.saveAsExcel();
            }, 2000);
            setTimeout(() => {
              this.laodExcel = false;
              const byCustomer = this.txnBalanceAgingList.at(this.pageIndex);
              this.balanceAgingList = byCustomer;
              dataExportExcel = [];
            }, 3000);
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
        title: "Receivable aging",
        type: "",
      };
      exportExelFormat(e, filterExcel);
    },
    // async loadAging() {
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
    //       billingHandler.wcpReceivableAgingList(strFilter).then((res) => {
    //         if (res.data.statusCode === 200) {
    //           this.receivableAgingList = res.data.data;
    //           const result = res.data.result;
    //           this.receivableBalance = kendo.toString(
    //             result.receivableBalance,
    //             result.decimalFormat
    //           );
    //           this.totalCustomer = kendo.toString(result.totalCustomer, `n0`);
    //           this.showLoading = false;
    //         }
    //       });
    //     }, 300);
    //   });
    // },
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
      this.mCustomerGroup = {};
      this.mCustomerType = {};
    },
    async loadPage(that) {
      $(".page-receivable-balance-aging").html(`
                <span class="mt-2 receivable-balance-aging-item-returned">0</span><br/>
                <div style="display: flex; flex-direction: 'row'">
                    <button class="receivable-balance-aging-next-page" title="previous" style="width: 24px; font-size: 19px; margin-top: -6px;"> < </button>
                    <ul class="receivable-balance-aging-page-number page_scroll" style="display: flex;list-style: none; padding-left: 0px;">
                        <li style="padding: 6px; padding-bottom: 0px;"  data-page="1" class="receivable-balance-aging-page-link text-bold-link" >1</li>
                    </ul>
                    <button class="receivable-balance-aging-next-page" title="next" style="width: 24px; font-size: 19px;margin-top: -6px;"> > </button>
                </div>
            `);
      $(document).on("click", ".receivable-balance-aging-page-link", function () {
        const page = $(this).data("page");
        $(".receivable-balance-aging-page-link").removeClass("text-bold-link");
        $(this).addClass("text-bold-link");
        that.backToPage(that, page - 1);
        window.console.log(page - 1);
      });
      // $(document).on('click', '.bycus-next-page', function () {
      $(".receivable-balance-aging-next-page").click(function () {
        const page_number = $(this)
          .parent()
          .children(".receivable-balance-aging-page-number")
          .find("li")
          .last()
          .data("page");
        window.console.log("receivable-balance-aging-page_number", page_number);
        const isPrevious = $(this).attr("title");
        if (isPrevious == "previous") {
          const currectpage = $(".text-bold-link").data("page");

          if (currectpage == 1) {
            return;
          }
          $(".receivable-balance-aging-page-link").removeClass("text-bold-link");
          $(`.receivable-balance-aging-page-link:eq(${currectpage - 1})`).addClass(
            "text-bold-link"
          );
          that.backToPage(that, currectpage - 2);
          window.console.log("this currectpage back", currectpage - 2);
        } else {
          $(".receivable-balance-aging-page-link").removeClass("text-bold-link");
          that.loadBalanceAging();
          $(this)
            .parent()
            .children(".receivable-balance-aging-page-number")
            .append(
              `<li class="receivable-balance-aging-page-link text-bold-link" style="padding: 6px; padding-bottom: 0px;" data-page="${
                page_number + 1
              }">${page_number + 1}</li>`
            );
        }
        window.console.log("this", page_number + 1);
      });
    },
    itemRetuned(that) {
      let totalRow = 0;
      that.txnBalanceAgingList.forEach((k) => {
        totalRow += k.length;
      });
      $(".receivable-balance-aging-item-returned").text(
        "Items returned (" + (totalRow - 1) + ")"
      );
    },
    disabledNextPage(value) {
      $(".receivable-balance-aging-next-page").prop("disabled", value);
    },
    backToPage(that, index) {
      try {
        const byBalanceDetail = that.txnBalanceAgingList.at(index);
        that.balanceAgingList = byBalanceDetail;
        // that.refreshGridData(customer)
        window.console.log("that.txnBalanceAgingList[index]", byBalanceDetail);
      } catch (e) {
        window.console.log("ERROR on backToPage", index);
      }
    },
    onSearch() {
      this.txnBalanceAgingList = [];
      this.loadPage(this);
      this.paging = {};
      this.loadBalanceAging();
      this.loadBalanceAgingSummary();
    },
    async loadBalanceAging() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.balanceAgingList = [];
          let groupId = "";
          let customerTypeId = "";
          const group = this.mCustomerGroup || {};
          const cusType = this.mCustomerType || {};
          groupId = group.id || "";
          customerTypeId = cusType.id || "";
          this.params = {
            tid: customerTypeId,
            grid: groupId,
            asOf: this.asOf,
            key: this.paging,
            id: this.customer.id || "",
            type: "cus",
          };
          this.showLoading = true;
          this.disabledNextPage(true);
          billingHandler.wcpReceivableAgingList(this.params).then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoading = false;
              const responseData = res.data.data || [];
              const total = res.data.total || 0;
              this.showLoading = false;
              this.balanceAgingList = responseData;
              this.paging = res.data.key;
              this.txnBalanceAgingList.push(responseData);

              this.toalPerPage = this.balanceAgingList.length;
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
    async loadBalanceAgingSummary() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.balanceAgingList = [];
          this.params = {
            asOf: this.asOf,
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
              this.totalCustomer = responseData.customers || 0;
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
  },
  computed: {
    appType() {
      return dataStore.productType;
    },
  },
  mounted: async function () {
    this.loadCustomerType();
    this.loadCustomerGroup();
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
