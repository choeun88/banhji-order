<template>
  <v-row>
    <v-col sm="12" cols="12" class="grayBg px-6">
      <v-card color="white" class="pa-3 no_border" elevation="0">
        <h2 class="mb-0 font_020">
          {{ $t("margin_analysis_by_product_service") }}
        </h2>
        <p class="mb-2">{{ $t("margin_analysis_by_product_service_desc") }}</p>
        <LoadingMe
          :isLoading="showLoading"
          :fullPage="false"
          type="loading"
          :myLoading="true"
        >
        </LoadingMe>
        <v-row>
          <v-col sm="4" cols="12" class="py-0">
            <label class="label">{{ $t("dates") }}</label>
            <v-select
              class="mt-0"
              :items="dateSorters"
              v-model="mDateSorter"
              @change="onSorterChanges"
              item-value="value"
              item-text="text"
              outlined
              placeholder="ALL"
            />
          </v-col>
          <v-col sm="4" cols="12" class="py-0">
            <label class="label">{{ $t("from") }}</label>
            <app-datepicker :initialDate="startDate" @emitDate="startDate = $event" />
          </v-col>
          <v-col sm="4" cols="12" class="py-0">
            <label class="label">{{ $t("to") }}</label>
            <app-datepicker :initialDate="endDate" @emitDate="endDate = $event" />
          </v-col>
          <v-col sm="4" cols="12" class="kendo_dropdown_custom pt-0">
            <label class="label">{{ $t("product") }}</label>
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
          <v-col sm="1" cols="1" class="pt-0 mt-6">
            <v-btn color="primary white--text" @click="onSearch">
              <i class="b-search" style="font-size: 18px; color: #fff !important" />
            </v-btn>
          </v-col>
        </v-row>
        <v-row clas="mt-0">
          <v-col sm="12" cols="12" class="py-0">
            <template>
              <kendo-datasource
                ref="gridMarginTransactionItemDS"
                :type="'JSON'"
                :data="itemMarginAnanlysisList"
                :server-paging="false"
              />
              <kendo-grid
                id="gridMarginByItem"
                class="grid-function"
                :data-source-ref="'gridMarginTransactionItemDS'"
                :editable="false"
                :column-menu="true"
                :noRecords="true"
                :resizable="true"
                :sortable="true"
                :groupable="true"
                :toolbar="['excel']"
                :excel-file-name="'SaleAnalysisByVariant.xlsx'"
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
        <div style="overflow: auto" class="item-margin-analysis"></div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import kendo from "@progress/kendo-ui";
import JSZip from "jszip";
import { i18n } from "@/i18n";
import { DropDownList } from "@progress/kendo-vue-dropdowns";
const dashboardHandler = require("@/scripts/dashboard/customer/handler/dashboardHandler");
// const billingHandler = require("@/scripts/invoice/handler/billingHandler");
const productHandler = require("@/scripts/productHandler");
const $ = kendo.jQuery;
const defaultItem = { ["name"]: "Select item", ["id"]: null };
const emptyItem = { ["name"]: "loading ..." };

const SECOND_DELAY = 1000;
window.JSZip = JSZip;

export default {
  name: "SaleAnalysisByProductAndServices",
  components: {
    LoadingMe: () => import(`@/components/Loading`),
    "app-datepicker": () => import(`@/components/custom_templates/DatePickerComponent`),
    dropdownlist: DropDownList,
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
  }),
  methods: {
    perOfRevenueTemplate(dataItem) {
      const revenue = dataItem.revenue || 0;
      const perOfRev = (revenue / (this.revenue.xAmount || 0)) * 100;
      dataItem.perOfRevenue = perOfRev;
      return kendo.toString(perOfRev, dataItem.decimalFormat);
    },
    pageChangeHandler: function (event) {
      window.console.log("change", event);
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
          today = new Date();
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
    rowNumberTmpl(dataItem) {
      let ds = this.$refs.gridMarginTransactionDS.kendoWidget(),
        index = ds.indexOf(dataItem);
      return index + 1;
    },
    // async loadTransactions() {
    //   new Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve("resolved");
    //       this.showLoading = true;
    //       this.transactions = [];
    //       const strFilter =
    //         "?start=" +
    //         this.startDate +
    //         "&end=" +
    //         this.endDate +
    //         "&type=product";
    //       dashboardHandler.saleMarginAnalysis(strFilter).then((res) => {
    //         if (res.data.statusCode === 200) {
    //           this.transactions = res.data.data;
    //           this.showLoading = false;
    //         } else {
    //           this.showLoading = false;
    //         }
    //       });
    //     }, 10);
    //   });
    // },
    async loadPage(that) {
      $(".item-margin-analysis").html(`
                <span class="mt-2 item-marginanalysis-item-returned">0</span><br/>
                <div style="display: flex; flex-direction: 'row'">
                    <button class="item-marginanalysis-next-page" title="previous" style="width: 24px; font-size: 19px; margin-top: -6px;"> < </button>
                    <ul class="item-marginanalysis-page-number page_scroll" style="display: flex;list-style: none; padding-left: 0px;">
                        <li style="padding: 6px; padding-bottom: 0px;"  data-page="1" class="item-marginanalysis-page-link text-bold-link" >1</li>
                    </ul>
                    <button class="item-marginanalysis-next-page" title="next" style="width: 24px; font-size: 19px;margin-top: -6px;"> > </button>
                </div>
            `);
      $(document).on("click", ".item-marginanalysis-page-link", function () {
        const page = $(this).data("page");
        $(".item-marginanalysis-page-link").removeClass("text-bold-link");
        $(this).addClass("text-bold-link");
        that.backToPage(that, page - 1);
        window.console.log(page - 1);
      });
      // $(document).on('click', '.bycus-next-page', function () {
      $(".item-marginanalysis-next-page").click(function () {
        const page_number = $(this)
          .parent()
          .children(".item-marginanalysis-page-number")
          .find("li")
          .last()
          .data("page");
        window.console.log("item-marginanalysis-page_number", page_number);
        const isPrevious = $(this).attr("title");
        if (isPrevious == "previous") {
          const currectpage = $(".text-bold-link").data("page");

          if (currectpage == 1) {
            return;
          }
          $(".item-marginanalysis-page-link").removeClass("text-bold-link");
          $(`.item-marginanalysis-page-link:eq(${currectpage - 1})`).addClass(
            "text-bold-link"
          );
          that.backToPage(that, currectpage - 2);
          // window.console.log("this currectpage back", currectpage - 2);
        } else {
          $(".item-marginanalysis-page-link").removeClass("text-bold-link");
          that.loadSaleMarginAnalysis();
          $(this)
            .parent()
            .children(".item-marginanalysis-page-number")
            .append(
              `<li class="item-marginanalysis-page-link text-bold-link" style="padding: 6px; padding-bottom: 0px;" data-page="${
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
      $(".item-marginanalysis-item-returned").text("Items returned (" + totalRow + ")");
    },
    disabledNextPage(value) {
      $(".item-marginanalysis-next-page").prop("disabled", value);
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
      await this.loadTotalRevenue();
      this.loadSaleMarginAnalysis();
    },
    async loadSaleMarginAnalysis() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.itemMarginAnanlysisList = [];
          this.params = {
            start: this.startDate,
            end: this.endDate,
            key: this.paging,
            id: this.item.id || "",
            pattern: "item",
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
          type: "Variant",
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
    async loadTotalRevenue() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = true;
          this.transactions = [];
          const strFilter =
            "?start=" + this.startDate + "&end=" + this.endDate + "&type=item";
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
    // await this.loadTransactions()
    this.requestData(0, this.filter, this.itemURL);
    this.loadPage(this);
    this.itemRetuned(this);
    this.disabledNextPage(true);
  },
  computed: {},
  // watch: {
  //   $route: "loadTransactions",
  // },
};
</script>
<style scoped>
.k-pdf-export .k-grid {
  font-family: "DejaVu Sans", "Arial", sans-serif;
}

/* Hide the Grid header and pager during export */
.k-pdf-export .k-grid-toolbar,
.k-pdf-export .k-pager-wrap {
  display: none;
}
</style>
