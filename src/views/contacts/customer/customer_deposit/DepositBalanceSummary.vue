<template>
  <v-row>
    <v-col sm="12" cols="12" class="grayBg px-6">
      <v-card color="white" class="pa-3 no_border" min-height="564" elevation="0">
        <v-row>
          <v-col sm="8" cols="12" class="py-0">
            <h2 class="mb-0 font_020">{{ $t("deposit_balance_summary") }}</h2>
            <p class="mb-2">{{ $t("deposit_balance_summary_desc") }}</p>
          </v-col>
          <v-col sm="4" cols="12" class="pt-2"> </v-col>
          <v-col sm="4" cols="12" class="py-0">
            <label class="label">{{ $t("customer_type") }}</label>
            <v-select
              class="mt-1"
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
            <label class="label">{{ $t("as_of") }}</label>
            <app-datepicker :initialDate="asOf" @emitDate="asOf = $event" />
          </v-col>
          <v-col sm="4" cols="12" class="py-0">
            <div class="mt-7">
              <v-btn
                color="primary"
                class="text-capitalize white--text"
                @click="onSearch"
              >
                <i class="b-search" style="font-size: 18px; color: #fff !important" />
              </v-btn>
              <v-btn
                class="text-upper ml-5 white--text"
                to="sale_deposit"
                color="primary"
              >
                {{ $t("new_sale_deposit") }}
              </v-btn>
            </div>
          </v-col>
          <v-col sm="4" cols="12" class="py-0">
            <label class="label">{{ $t("customer_group") }}</label>
            <v-select
              class="mt-1"
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
          <v-col sm="4" cols="12" class="py-0">
            <label class="label">{{ $t("customer_name") }}</label>
            <dropdownlist
              class="kendo_dropdown_custom mt-1"
              style="height: 40px; width: 100%"
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
          <!-- <v-col sm="2" cols="12" class="pb-0 text-right mt-1">
              <v-btn icon color="black" class="bg-none  ">
                  <v-icon class="font_34">fa fa-file-excel</v-icon>
              </v-btn>

              <v-btn icon color="black" class="bg-none ml-2">
                  <v-icon class="font_34">fa fa-print</v-icon>
              </v-btn>
          </v-col> -->
        </v-row>

        <v-row>
          <v-col sm="12" cols="12" class="py-0">
            <template>
              <LoadingMe
                :isLoading="showLoading"
                :fullPage="false"
                type="loading"
                :myLoading="true"
              />
              <kendo-datasource
                ref="depositBalanceSummaryDS"
                :group="group"
                :data="receivableBalanceSummaryList"
              />
              <kendo-grid
                id="gridDepositBalanceSumary"
                class="grid-function"
                :data-source-ref="'depositBalanceSummaryDS'"
                :sortable="true"
                :groupable="true"
                :filterable="false"
                :column-menu="true"
                :noRecords="true"
                :editable="false"
                :excel-file-name="'CustomerDepositBalanceSummary.xlsx'"
                :excel-filterable="true"
                :excel-all-pages="true"
                :toolbar="['excel']"
                :scrollable-virtual="true"
              >
                <kendo-grid-column
                  :field="'name'"
                  :title="$t('name')"
                  :attributes="{ class: 'tb_name_td' }"
                  :template="'<span>#=name#</span>'"
                  :width="200"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'type'"
                  :title="$t('type')"
                  :width="200"
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
                  :attributes="{ style: 'text-align: right; ' }"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <!--                <kendo-grid-column-->
                <!--                    :field="'overDue'"-->
                <!--                    :title="$t('over_due')"-->
                <!--                    :template="'<span>#= kendo.toString(overDue, decimalFormat)#</span>'"-->
                <!--                    :width="180"-->
                <!--                    :attributes="{style: 'text-align: right; '}"-->
                <!--                    :headerAttributes="{ style: 'background-color: #EDF1F5'}"/>-->
              </kendo-grid>
            </template>
          </v-col>
        </v-row>
        <div style="overflow: auto" class="page-receivable-balance-summary-detail"></div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { DropDownList } from "@progress/kendo-vue-dropdowns";
import kendo from "@progress/kendo-ui";
const $ = require("jquery");
import { dataStore } from "@/observable/store";
import LinkTemplate from "@/components/kendo_templates/LinkTemplate";
// import kendo from "@progress/kendo-ui";
const billingHandler = require("@/scripts/invoice/handler/billingHandler");
const balanceHandler = require("@/scripts/balance/handler/balanceHandler");
const customerTypeHandler = require("@/scripts/customerTypeHandler");
const customerGroupHandler = require("@/scripts/customerGroupHandler");
const defaultItem = { ["name"]: "Select customer...", ["id"]: null };
const emptyItem = { ["name"]: "loading ..." };
const SECOND_DELAY = 1000;

import JSZip from "jszip";
window.JSZip = JSZip;
export default {
  data: () => ({
    loading: false,
    showLoading: false,
    asOf: new Date().toISOString().substr(0, 10),
    customerList: [],
    customer: {},
    depositBalanceList: [],
    textField: "name",
    defaultItem: defaultItem,
    dataItemKey: "id",
    filter: "",
    cusBaseUrl: balanceHandler.customerVendors(),
    balance: 0,
    group: { field: "type" },
    receivableList: [],

    customerTypes: [],
    mCustomerType: {},
    customerGroups: [],
    mCustomerGroup: {},
    txnReceivableBalanceSummaryList: [],
    receivableBalanceSummaryList: [],
    totalCustomerBalSum: 0,
    toalPerPageSum: 0,
    paging: {},
    action: "",
    params: {},
  }),
  components: {
    "app-datepicker": () => import(`@/components/custom_templates/DatePickerComponent`),
    LoadingMe: () => import(`@/components/Loading`),
    dropdownlist: DropDownList,
  },
  methods: {
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
      const url = baseUrl + `?pattern=cus-dep&filter=${filter}`;
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
    customerGroup(dataItem) {
      const group = dataItem.customerGroup || {};
      if (group.hasOwnProperty("id")) {
        return group.name || "";
      }
      return "";
    },
    customerType(dataItem) {
      const type = dataItem.customerType || {};
      if (type.hasOwnProperty("id")) {
        return type.name || "";
      }
      return "";
    },
    // dataBound: function (e) {
    //   const grid = kendo.jQuery("#gridDepositBalanceSumary").data("kendoGrid")
    //   const items = e.sender.items()
    //   items.each(function () {
    //     let dataItem = grid.dataItem(this);
    //     $("tr[data-uid='" + dataItem.uid + "']").find(".status").each(function () {
    //       if (dataItem.status !== 3) {
    //         $(this).removeClass('k-state-disabled')
    //       }
    //     })
    //   })
    // },
    goToCashReceipt(e) {
      e.preventDefault();
      let grid = kendo.jQuery("#gridDepositBalanceSumary").data("kendoGrid");
      let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
      this.$router.push({
        path: "cash_receipt" + `/${dataItem.code}`,
        params: { id: dataItem.code },
        query: { type: "pmt", option: "Payment Code" },
      });
    },
    referenceTemplate(data) {
      let url = `invoice_view/${data.id}`;
      if (data.type === "Invoice") {
        url = `invoice_view/${data.id}`;
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
    //   new Promise(resolve => {
    //     setTimeout(() => {
    //       resolve('resolved')
    //       this.showLoading = true
    //       let strFilter = ''
    //       strFilter = '?asOf=' + this.asOf + '&type=dep-' + '&txnType=Customer'
    //       if (this.customer) {
    //         if (this.customer.id !== undefined && this.customer.id !== null) {
    //           strFilter = '?asOf=' + this.asOf + '&id=' + this.customer.id + '&type=dep-' + '&txnType=Customer'
    //         }
    //       }
    //       // window.console.log(strFilter, 'filter')
    //       this.showLoading = true
    //       billingHandler.vendorDepositBalanceSummary(strFilter).then(res => {
    //         if (res.data.statusCode === 200) {
    //           this.receivableList = res.data.data
    //           // const result = res.data.result
    //           // this.receivableBalance = kendo.toString(result.receivableBalance, result.decimalFormat)
    //           // this.overDueAmount = kendo.toString(result.overDueAmount, result.decimalFormat)
    //           // this.tobeCollected = kendo.toString(result.tobeCollected, `n0`)
    //           this.showLoading = false
    //         }
    //       })
    //     }, 10)
    //   })
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
    async loadPage(that) {
      $(".page-receivable-balance-summary-detail").html(`
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
      that.txnReceivableBalanceSummaryList.forEach((k) => {
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
        const byBalanceDetail = that.txnReceivableBalanceSummaryList.at(index);
        that.receivableBalanceSummaryList = byBalanceDetail;
        // that.refreshGridData(customer)
        window.console.log(
          "that.txnReceivableBalanceSummaryList[index]",
          byBalanceDetail
        );
      } catch (e) {
        window.console.log("ERROR on backToPage", index);
      }
    },
    onSearch() {
      this.txnReceivableBalanceSummaryList = [];
      this.loadPage(this);
      this.paging = {};
      this.loadBalanceSummary();
      // this.loadBalanceDetailSummary();
    },
    async loadBalanceSummary() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.receivableBalanceSummaryList = [];
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
            type: "cus-dep",
          };
          this.showLoading = true;
          this.disabledNextPage(true);
          billingHandler.balanceSummary(this.params).then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoading = false;
              const responseData = res.data.data || [];
              const total = res.data.total || 0;
              this.showLoading = false;
              this.receivableBalanceSummaryList = responseData;
              this.paging = res.data.key;
              this.txnReceivableBalanceSummaryList.push(responseData);

              this.toalPerPageSum = this.receivableBalanceSummaryList.length;
              this.totalCustomerBalSum = total;

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
  },
  computed: {
    appType() {
      return dataStore.productType;
    },
  },
  mounted: async function () {
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
</style>
