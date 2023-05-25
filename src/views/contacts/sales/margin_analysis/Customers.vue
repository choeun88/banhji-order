<template>
  <v-row>
    <v-col sm="12" cols="12" class="grayBg px-6">
      <v-card color="white" class="pa-3 no_border" elevation="0">
        <h2 class="mb-0 font_020">{{ $t("margin_analysis_by_customers") }}</h2>
        <p class="mb-2">{{ $t("margin_analysis_by_customers_desc") }}</p>
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
          <v-col sm="4" cols="12" class="kendo_dropdown_custom py-0">
            <label class="label">{{ $t("customer_name") }}</label>
            <dropdownlist
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
          <v-col sm="1" cols="12" class="py-0 mt-5 ml-1">
            <v-btn color="primary white--text" @click="onSearch">
              <i class="b-search" style="font-size: 18px; color: #fff !important" />
            </v-btn>
          </v-col>
        </v-row>
        <v-row clas="mt-0">
          <v-col sm="12" cols="12" class="py-0">
            <template>
              <kendo-datasource
                ref="gridMarginTransactionDS"
                :type="'JSON'"
                :data="cusMarginAnanlysisList"
                :server-paging="false"
              />
              <kendo-grid
                id="gridMarginByCustomer"
                class="grid-function"
                :data-source-ref="'gridMarginTransactionDS'"
                :editable="false"
                :column-menu="true"
                :noRecords="true"
                :resizable="true"
                :sortable="true"
                :toolbar="['excel']"
                :excel-file-name="'SaleAnalysisByCustomer.xlsx'"
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
                  :title="$t('customer')"
                  :width="200"
                  :template="'<span>#=name#</span>'"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />

                <kendo-grid-column
                  :field="'revenue'"
                  :title="$t('revenue')"
                  :width="120"
                  :template="'<span>#=kendo.toString(revenue, decimalFormat)#</span>'"
                  :attributes="{ style: 'text-align: right; ' }"
                  :headerAttributes="{
                    style: 'text-align: right; background-color: #EDF1F5',
                  }"
                />
                <kendo-grid-column
                  :field="'perOfRevenue'"
                  :title="$t('%_total_revenue')"
                  :width="200"
                  :template="perOfRevenueTemplate"
                  :attributes="{ style: 'text-align: right; ' }"
                  :headerAttributes="{
                    style:
                      'text-align: right; background-color: #EDF1F5, color: green !important',
                  }"
                />
                <kendo-grid-column
                  :field="'avgMargin'"
                  :title="$t('%_margin')"
                  :width="200"
                  :attributes="{ style: 'text-align: right; ' }"
                  :template="'<span>#=kendo.toString(avgMargin, decimalFormat)# %</span>'"
                  :headerAttributes="{
                    style: 'text-align: right; background-color: #EDF1F5',
                  }"
                />
              </kendo-grid>
            </template>
          </v-col>
        </v-row>
        <div style="overflow: auto" class="customer-margin-analysis"></div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import kendo from "@progress/kendo-ui";
import { DropDownList } from "@progress/kendo-vue-dropdowns";
const dashboardHandler = require("@/scripts/dashboard/customer/handler/dashboardHandler");
const balanceHandler = require("@/scripts/balance/handler/balanceHandler");
import JSZip from "jszip";
import { i18n } from "@/i18n";
window.JSZip = JSZip;
const $ = kendo.jQuery;
const SECOND_DELAY = 1000;
const defaultItem = { ["name"]: "Select customer...", ["id"]: null };
const emptyItem = { ["name"]: "loading ..." };
export default {
  name: "SaleAnalysisByCustomer",
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

    customerList: [],
    customer: {},
    textField: "name",
    defaultItem: defaultItem,
    dataItemKey: "id",
    filter: "",
    cusBaseUrl: balanceHandler.customerVendors(),

    txnCusMarginAnanlysisList: [],
    cusMarginAnanlysisList: [],
    totalCustomerMarginBal: 0,
    toalCusMarginPerPage: 0,
    paging: {},
    action: "",
    params: {},
    revenue: {},
  }),
  methods: {
    exportGridWithTemplatesContent(e) {
      window.console.log("e", e);
      var data = e.data;
      var gridColumns = e.sender.columns;
      var sheet = e.workbook.sheets[0];
      var visibleGridColumns = [];
      var columnTemplates = [];
      // var dataItem;
      // Create element to generate templates in.
      var elem = document.createElement("div");

      // Get a list of visible columns
      for (var o = 0; i < gridColumns.length; o++) {
        if (!gridColumns[o].hidden) {
          visibleGridColumns.push(gridColumns[o]);
        }
      }

      // Create a collection of the column templates, together with the current column index
      for (var k = 0; k < visibleGridColumns.length; k++) {
        if (visibleGridColumns[k].template) {
          columnTemplates.push({
            cellIndex: k,
            template: kendo.template(visibleGridColumns[k].template),
          });
        }
      }

      // Traverse all exported rows.
      for (var i = 1; i < sheet.rows.length; i++) {
        var row = sheet.rows[i];
        // Traverse the column templates and apply them for each row at the stored column position.

        // Get the data item corresponding to the current row.
        var dataItem = data[i - 1];
        for (var j = 0; j < columnTemplates.length; j++) {
          var columnTemplate = columnTemplates[j];
          // Generate the template content for the current cell.
          elem.innerHTML = columnTemplate.template(dataItem);
          if (row.cells[columnTemplate.cellIndex] != undefined)
            // Output the text content of the templated cell into the exported cell.
            row.cells[columnTemplate.cellIndex].value =
              elem.textContent || elem.innerText || "";
        }
      }
    },
    perOfRevenueTemplate(dataItem) {
      const revenue = dataItem.revenue || 0;
      const perOfRev = (revenue / (this.revenue.xSubtotal || 0)) * 100;
      dataItem.perOfRevenue = perOfRev;
      return `<span>${kendo.toString(perOfRev, dataItem.decimalFormat)}</span>`;
    },
    onSorterChanges(val) {
      let today = new Date();
      window.console.log(today, "today");
      switch (val) {
        case "Today":
          this.startDate = kendo.toString(today, "yyyy-MM-dd");
          this.endDate = kendo.toString(today, "yyyy-MM-dd");

          break;
        case "This Week":
          var first = today.getDate() - today.getDay();
          var last = first + 6;

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
    async loadTotalRevenue() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = true;
          this.transactions = [];
          const strFilter =
            "?start=" + this.startDate + "&end=" + this.endDate + "&type=cus";
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
    async loadPage(that) {
      $(".customer-margin-analysis").html(`
                <span class="mt-2 customer-marginanalysis-item-returned">0</span><br/>
                <div style="display: flex; flex-direction: 'row'">
                    <button class="customer-marginanalysis-next-page" title="previous" style="width: 24px; font-size: 19px; margin-top: -6px;"> < </button>
                    <ul class="customer-marginanalysis-page-number page_scroll" style="display: flex;list-style: none; padding-left: 0px;">
                        <li style="padding: 6px; padding-bottom: 0px;"  data-page="1" class="customer-marginanalysis-page-link text-bold-link" >1</li>
                    </ul>
                    <button class="customer-marginanalysis-next-page" title="next" style="width: 24px; font-size: 19px;margin-top: -6px;"> > </button>
                </div>
            `);
      $(document).on("click", ".customer-marginanalysis-page-link", function () {
        const page = $(this).data("page");
        $(".customer-marginanalysis-page-link").removeClass("text-bold-link");
        $(this).addClass("text-bold-link");
        that.backToPage(that, page - 1);
        window.console.log(page - 1);
      });
      // $(document).on('click', '.bycus-next-page', function () {
      $(".customer-marginanalysis-next-page").click(function () {
        const page_number = $(this)
          .parent()
          .children(".customer-marginanalysis-page-number")
          .find("li")
          .last()
          .data("page");
        window.console.log("customer-marginanalysis-page_number", page_number);
        const isPrevious = $(this).attr("title");
        if (isPrevious == "previous") {
          const currectpage = $(".text-bold-link").data("page");

          if (currectpage == 1) {
            return;
          }
          $(".customer-marginanalysis-page-link").removeClass("text-bold-link");
          $(`.customer-marginanalysis-page-link:eq(${currectpage - 1})`).addClass(
            "text-bold-link"
          );
          that.backToPage(that, currectpage - 2);
          // window.console.log("this currectpage back", currectpage - 2);
        } else {
          $(".customer-marginanalysis-page-link").removeClass("text-bold-link");
          that.loadSaleMarginAnalysis();
          $(this)
            .parent()
            .children(".customer-marginanalysis-page-number")
            .append(
              `<li class="customer-marginanalysis-page-link text-bold-link" style="padding: 6px; padding-bottom: 0px;" data-page="${
                page_number + 1
              }">${page_number + 1}</li>`
            );
        }
        window.console.log("this", page_number + 1);
      });
    },
    itemRetuned(that) {
      let totalRow = 0;
      that.txnCusMarginAnanlysisList.forEach((k) => {
        totalRow += k.length;
      });
      $(".customer-marginanalysis-item-returned").text(
        "Items returned (" + totalRow + ")"
      );
    },
    disabledNextPage(value) {
      $(".customer-marginanalysis-next-page").prop("disabled", value);
    },
    backToPage(that, index) {
      try {
        const byCustomer = that.txnCusMarginAnanlysisList.at(index);
        that.cusMarginAnanlysisList = byCustomer;
        // that.refreshGridData(customer)
        window.console.log("that.txnCusMarginAnanlysisList[index]", byCustomer);
      } catch (e) {
        window.console.log("ERROR on backToPage", index);
      }
    },
    async onSearch() {
      this.txnCusMarginAnanlysisList = [];
      this.loadPage(this);
      this.paging = {};
      await this.loadTotalRevenue();
      this.loadSaleMarginAnalysis();
    },
    async loadSaleMarginAnalysis() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.cusMarginAnanlysisList = [];
          this.params = {
            start: this.startDate,
            end: this.endDate,
            key: this.paging,
            id: this.customer.id || "",
            pattern: "cus",
          };
          this.showLoading = true;
          this.disabledNextPage(true);
          dashboardHandler.saleMarginAnalysis(this.params).then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoading = false;
              const responseData = res.data.data || [];
              const total = res.data.total || 0;
              this.showLoading = false;
              this.cusMarginAnanlysisList = responseData;
              this.paging = res.data.key;
              this.txnCusMarginAnanlysisList.push(responseData);

              this.toalCusMarginPerPage = this.cusMarginAnanlysisList.length;
              this.totalCustomerMarginBal = total;

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
  mounted: async function () {
    // await this.loadTransactions()
    this.requestData(0, this.filter, this.cusBaseUrl);
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
