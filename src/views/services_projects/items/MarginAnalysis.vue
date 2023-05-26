<template>
  <v-row>
    <v-col sm="12" cols="12" class="grayBg px-6">
      <v-card color="white" class="pa-3 no_border" elevation="0">
        <!-- loading -->
        <h2 class="mb-0 font_20">{{ $t("service_margin_analysis") }}</h2>
        <LoadingMe
          :isLoading="showLoading"
          :fullPage="false"
          :myLoading="true"
          :type="'loading'"
        >
        </LoadingMe>

        <v-row class="pt-2">
          <v-col sm="4" cols="12" class="py-0">
            <v-select
              class="mt-1"
              :items="dateSorters"
              v-model="mDateSorter"
              @change="onSorterChanges"
              outlined
              placeholder="ALL"
            />
          </v-col>

          <v-col sm="3" cols="12" class="py-0">
            <app-datepicker :initialDate="startDate" @emitDate="startDate = $event" />
          </v-col>

          <v-col sm="3" cols="12" class="py-0">
            <app-datepicker :initialDate="endDate" @emitDate="endDate = $event" />
          </v-col>

          <v-col sm="1" cols="1" class="pt-1">
            <v-btn color="primary white--text" @click="onSearch">
              <i class="b-search" style="font-size: 18px; color: #fff !important" />
            </v-btn>
          </v-col>
          <v-col sm="4" cols="12" class="kendo_dropdown_custom pt-1 pr-2">
            <dropdownlist
              :data-items="itemList"
              @change="onChange"
              :value="item"
              :data-item-key="dataItemKey"
              :text-field="textField"
              :default-item="defaultItem"
              :filterable="true"
              :loading="loading"
              @filterchange="onFilterChange"
            >
            </dropdownlist>
          </v-col>
        </v-row>

        <v-row class="mt-0">
          <v-col sm="12" cols="12" class="py-0">
            <template>
              <kendo-datasource
                ref="gridTransactionServiceDS"
                :type="'JSON'"
                :data="itemMarginAnanlysisList"
                :group="group"
                :server-paging="false"
              />
              <kendo-grid
                id="gridMarginByItemService"
                class="grid-function"
                :data-source-ref="'gridTransactionServiceDS'"
                :editable="false"
                :column-menu="true"
                :noRecords="true"
                :resizable="true"
                :sortable="true"
                :groupable="true"
                :toolbar="['excel']"
                :excel-file-name="'SaleAnalysisByService.xlsx'"
                :excel-filterable="true"
                :excel-all-pages="true"
                :scrollable-virtual="true"
              >
                <!--                <kendo-grid-column-->
                <!--                    :field="'no'"-->
                <!--                    :title="$t('no')"-->
                <!--                    :template="rowNumberTmpl"-->
                <!--                    :width="90"-->
                <!--                    :column-menu="false"-->
                <!--                    :headerAttributes="{ style: 'background-color: #EDF1F5;', class: 'text-center'	}"-->
                <!--                    :attributes="{style: 'text-align: center'}"/>-->
                <kendo-grid-column
                  :field="'name'"
                  :attributes="{ class: 'tb_name_td' }"
                  :title="$t('item')"
                  :width="200"
                  :template="'<span>#=name#</span>'"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'sku'"
                  :title="$t('sku')"
                  :width="160"
                  :template="'<span>#=sku#</span>'"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'revenue'"
                  :title="$t('revenue')"
                  :width="120"
                  :template="'<span>#=kendo.toString(revenue, decimalFormat)#</span>'"
                  :attributes="{ style: 'text-align: right; ' }"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'perOfRevenue'"
                  :title="$t('%_total_revenue')"
                  :width="200"
                  :template="perOfRevenueTemplate"
                  :attributes="{ style: 'text-align: right; ' }"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5, color: green !important',
                  }"
                />
                <kendo-grid-column
                  :field="'avgMargin'"
                  :title="$t('%_margin')"
                  :width="200"
                  :attributes="{ style: 'text-align: right; ' }"
                  :template="'<span>#=kendo.toString(avgMargin, decimalFormat)# %</span>'"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
              </kendo-grid>
            </template>
          </v-col>
        </v-row>
        <div style="overflow: auto" class="service-margin-analysis"></div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { i18n } from "@/i18n";
import kendo from "@progress/kendo-ui";
import { DropDownList } from "@progress/kendo-vue-dropdowns";
const dashboardHandler = require("@/scripts/dashboard/customer/handler/dashboardHandler");
const productHandler = require("@/scripts/productHandler");
const $ = kendo.jQuery;
const defaultItem = { ["name"]: "Select service", ["id"]: null };
const emptyItem = { ["name"]: "loading ..." };

const SECOND_DELAY = 1000;
import JSZip from "jszip";

window.JSZip = JSZip;
export default {
  name: "MarginAnalysis",
  components: {
    LoadingMe: () => import(`@/components/Loading`),
    "app-datepicker": () => import(`@/components/custom_templates/DatePickerComponent`),
    dropdownlist: DropDownList,
    // BankConnection,
  },
  data: () => ({
    loading: false,
    startDate: new Date().toISOString().substring(0, 10),
    endDate: new Date().toISOString().substring(0, 10),
    dateSorters: [
      {
        text: i18n.t("today"),
        value: "Today",
      },
      {
        text: i18n.t("this_week"),
        value: "This Week",
      },
      {
        text: i18n.t("this_month"),
        value: "This Month",
      },
      {
        text: i18n.t("this_year"),
        value: "This Year",
      },
      {
        text: i18n.t("last_month"),
        value: "Last Month",
      },
      {
        text: i18n.t("last_year"),
        value: "Last Year",
      },
    ],
    mDateSorter: "Today",
    showLoading: false,
    transactions: [],
    aggregateDefinition: [
      { field: "amount", aggregate: "sum" },
      { field: "qty", aggregate: "sum" },
      { field: "discountExchangeAmount", aggregate: "sum" },
    ],
    group: [],
    schemaModelFields: {
      id: { type: "number" },
      name: { type: "string" },
      item: { type: "string" },
      price: { type: "number" },
      qty: { type: "number" },
      referenceNo: { type: "string" },
      transactionDate: { type: "string" },
      transactionType: { type: "string" },
      type: { type: "string" },
      uom: { type: "string" },
      marginRate: { type: "number" },
      category: { type: "string" },
    },
    totalRevenue: 0,
    totalSaleLead: 0,
    totalSaleQuote: 0,
    totalSaleOrder: 0,
    decimalFormat: "n2",

    itemURL: productHandler.centerURL(),
    itemList: [],
    textField: "name",
    defaultItem: defaultItem,
    dataItemKey: "id",
    filter: "",
    item: {},

    txnItemMarginAnanlysisList: [],
    itemMarginAnanlysisList: [],
    totalItemMarginBal: 0,
    toalItemMarginPerPage: 0,
    paging: {},
    action: "",
    params: {},
    revenue: {},
    // group: {
    //     field: 'name',
    //     aggregates: [
    //         {field: "qty", aggregate: "tQty"},
    //         {field: "amount", aggregate: "sum"}
    //     ]
    // },
  }),
  methods: {
    perOfRevenueTemplate(dataItem) {
      const revenue = dataItem.revenue || 0;
      const perOfRev = (revenue / (this.revenue.xAmount || 0)) * 100;
      return kendo.toString(perOfRev, dataItem.decimalFormat);
    },
    excelExport: function (e) {
      // const pivot = this.$refs.gridTransactionDS.kendoWidget()
      // pivot.saveAsExcel()
      window.console.log("excelExport");
      window.console.log(e.data);
    },
    pageChangeHandler: function (event) {
      alert("change", event);
    },
    onSorterChanges(val) {
      let today = new Date();
      switch (val) {
        case "Today":
          this.startDate = kendo.toString(today, "yyyy-MM-dd");
          this.endDate = kendo.toString(today, "yyyy-MM-dd");

          break;
        case "This Week":
          var first = today.getDate() - today.getDay(),
            last = first + 6;

          this.startDate = kendo.toString(new Date(today.setDate(first)), "yyyy-MM-dd");
          this.endDate = kendo.toString(new Date(today.setDate(last)), "yyyy-MM-dd");

          break;
        case "This Month":
          this.startDate = kendo.toString(
            new Date(today.getFullYear(), today.getMonth(), 1),
            "yyyy-MM-dd"
          );
          this.endDate = kendo.toString(
            new Date(today.getFullYear(), today.getMonth(), 31),
            "yyyy-MM-dd"
          );

          break;
        case "This Year":
          this.startDate = kendo.toString(
            new Date(today.getFullYear(), 0, 1),
            "yyyy-MM-dd"
          );
          this.endDate = kendo.toString(
            new Date(today.getFullYear(), 11, 31),
            "yyyy-MM-dd"
          );
          break;
        case "Last Month":
          this.startDate = kendo.toString(
            new Date(today.getFullYear(), today.getMonth(), -30),
            "yyyy-MM-dd"
          );
          this.endDate = kendo.toString(
            new Date(today.getFullYear(), today.getMonth() - 1, +31),
            "yyyy-MM-dd"
          );

          break;
        case "Last Year":
          this.startDate = kendo.toString(
            new Date(today.getFullYear(), -11, -30),
            "yyyy-MM-dd"
          );
          this.endDate = kendo.toString(
            new Date(today.getFullYear(), -1, +31),
            "yyyy-MM-dd"
          );
          break;
        default:
          this.startDate = "";
          this.endDate = "";
      }
    },
    numberFormat(value) {
      return kendo.toString(value, this.decimalFormat);
    },
    async loadTransactions() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = true;
          this.transactions = [];
          const strFilter =
            "?start=" + this.startDate + "&end=" + this.endDate + "&type=service";
          dashboardHandler.saleMarginAnalysis(strFilter).then((res) => {
            if (res.data.statusCode === 200) {
              this.transactions = res.data.data;
              this.showLoading = false;
            } else {
              this.showLoading = false;
            }
          });
        }, 10);
      });
    },
    dateFormat(dataItem) {
      return kendo.toString(new Date(dataItem.transactionDate), `dd-MM-yyyy`);
    },
    async loadPage(that) {
      $(".service-margin-analysis").html(`
                <span class="mt-2 service-marginanalysis-item-returned">0</span><br/>
                <div style="display: flex; flex-direction: 'row'">
                    <button class="service-marginanalysis-next-page" title="previous" style="width: 24px; font-size: 19px; margin-top: -6px;"> < </button>
                    <ul class="service-marginanalysis-page-number page_scroll" style="display: flex;list-style: none; padding-left: 0px;">
                        <li style="padding: 6px; padding-bottom: 0px;"  data-page="1" class="service-marginanalysis-page-link text-bold-link" >1</li>
                    </ul>
                    <button class="service-marginanalysis-next-page" title="next" style="width: 24px; font-size: 19px;margin-top: -6px;"> > </button>
                </div>
            `);
      $(document).on("click", ".service-marginanalysis-page-link", function () {
        const page = $(this).data("page");
        $(".service-marginanalysis-page-link").removeClass("text-bold-link");
        $(this).addClass("text-bold-link");
        that.backToPage(that, page - 1);
        window.console.log(page - 1);
      });
      // $(document).on('click', '.bycus-next-page', function () {
      $(".service-marginanalysis-next-page").click(function () {
        const page_number = $(this)
          .parent()
          .children(".service-marginanalysis-page-number")
          .find("li")
          .last()
          .data("page");
        window.console.log("service-marginanalysis-page_number", page_number);
        const isPrevious = $(this).attr("title");
        if (isPrevious == "previous") {
          const currectpage = $(".text-bold-link").data("page");

          if (currectpage == 1) {
            return;
          }
          $(".service-marginanalysis-page-link").removeClass("text-bold-link");
          $(`.service-marginanalysis-page-link:eq(${currectpage - 1})`).addClass(
            "text-bold-link"
          );
          that.backToPage(that, currectpage - 2);
          // window.console.log("this currectpage back", currectpage - 2);
        } else {
          $(".service-marginanalysis-page-link").removeClass("text-bold-link");
          that.loadSaleMarginAnalysisByService();
          $(this)
            .parent()
            .children(".service-marginanalysis-page-number")
            .append(
              `<li class="service-marginanalysis-page-link text-bold-link" style="padding: 6px; padding-bottom: 0px;" data-page="${
                page_number + 1
              }">${page_number + 1}</li>`
            );
        }
        window.console.log("this", page_number + 1);
      });
    },
    itemRetuned(that) {
      let totalRow = 0;
      that.txnItemMarginAnanlysisList.forEach((k) => {
        totalRow += k.length;
      });
      $(".service-marginanalysis-item-returned").text(
        "Items returned (" + totalRow + ")"
      );
    },
    disabledNextPage(value) {
      $(".service-marginanalysis-next-page").prop("disabled", value);
    },
    backToPage(that, index) {
      try {
        const byCustomer = that.txnItemMarginAnanlysisList.at(index);
        that.itemMarginAnanlysisList = byCustomer;
        // that.refreshGridData(customer)
        window.console.log("that.txnItemMarginAnanlysisList[index]", byCustomer);
      } catch (e) {
        window.console.log("ERROR on backToPage", index);
      }
    },
    async onSearch() {
      this.txnItemMarginAnanlysisList = [];
      this.loadPage(this);
      this.paging = {};
      await this.loadTotalRevenueByService();
      this.loadSaleMarginAnalysisByService();
    },
    async loadSaleMarginAnalysisByService() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.itemMarginAnanlysisList = [];
          this.params = {
            start: this.startDate,
            end: this.endDate,
            key: this.paging,
            id: this.item.id || "",
            pattern: "service",
          };
          this.showLoading = true;
          this.disabledNextPage(true);
          dashboardHandler.saleMarginAnalysis(this.params).then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoading = false;
              const responseData = res.data.data || [];
              const total = res.data.total || 0;
              this.showLoading = false;
              this.itemMarginAnanlysisList = responseData;
              this.paging = res.data.key;
              this.txnItemMarginAnanlysisList.push(responseData);

              this.toalItemMarginPerPage = this.itemMarginAnanlysisList.length;
              this.totalItemMarginBal = total;

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
    onFilterChange(event) {
      const filter = event.filter.value;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.requestData(0, filter, this.itemURL);
        this.filter = filter;
        this.loading = false;
      }, SECOND_DELAY);
      this.loading = true;
    },
    requestData(skip, filter, baseUrl) {
      const url = baseUrl;
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          type: "Service",
          search: `${filter}`,
          searchAs: 0,
          key: {},
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then(this.afterFetch);
    },
    afterFetch(json) {
      this.itemList = json.data;
    },
    onChange(event) {
      const value = event.value;
      if (value && value["name"] === emptyItem["name"]) {
        return;
      }
      this.item = value;
    },
    async loadTotalRevenueByService() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = true;
          this.transactions = [];
          const strFilter =
            "?start=" + this.startDate + "&end=" + this.endDate + "&type=service";
          dashboardHandler.totalRevenue(strFilter).then((res) => {
            if (res.data.statusCode === 200) {
              this.revenue = res.data.data;
              this.showLoading = false;
            } else {
              this.showLoading = false;
            }
          });
        }, 10);
      });
    },
  },
  mounted: async function () {
    this.group = [
      {
        field: "item",
        aggregates: this.aggregateDefinition,
      },
    ];
    this.requestData(0, this.filter, this.itemURL);
    this.loadPage(this);
    this.itemRetuned(this);
    this.disabledNextPage(true);
    // await this.loadTransactions()
  },
  computed: {},
};
</script>
<style scoped></style>
