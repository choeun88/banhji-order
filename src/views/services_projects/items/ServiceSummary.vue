<template>
  <v-row>
    <v-col sm="12" cols="12" class="grayBg px-6">
      <v-card color="white" class="pa-3 no_border" elevation="0">
        <h2 class="mb-0 font_20">
          {{ $t("service_summary_report") }}
        </h2>
        <!-- loading -->
        <LoadingMe
          :isLoading="showLoading"
          :fullPage="false"
          :myLoading="true"
          :type="'loading'"
        >
        </LoadingMe>
        <v-row>
          <v-col sm="3" cols="12" class="py-0">
            <label class="mb-1">{{ $t("from") }}:</label>
            <app-month-of-picker
              :initMonthOf="startDate"
              @emitMonthOf="startDate = $event"
              :initMax="startDate"
            />
          </v-col>

          <v-col sm="3" cols="12" class="py-0">
            <label class="mb-1">{{ $t("to") }}:</label>
            <app-month-of-picker
              :initMonthOf="endDate"
              @emitMonthOf="endDate = $event"
              :initMax="endDate"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-0" sm="3" cols="3">
            <v-select
              tage="Category"
              v-model="mCategory"
              :items="categories"
              item-value="id"
              :item-text="(item) => `${item.abbr} - ${item.name}`"
              @change="onCategoryChanged('')"
              return-object
              :placeholder="$t('category')"
              clearable
              outlined
            />
          </v-col>
          <v-col class="py-0" sm="3" cols="3">
            <v-select
              tage="Group"
              v-model="mGroup"
              :items="groups"
              item-value="id"
              :item-text="(item) => `${item.abbr} - ${item.name}`"
              @change="onCategoryChanged('')"
              return-object
              :placeholder="$t('group')"
              clearable
              outlined
            />
          </v-col>
          <v-col class="py-0" sm="3" cols="3">
            <v-select
              tage="Sub Group"
              v-model="mSubGroup"
              :items="subGroup"
              item-value="id"
              :item-text="(item) => `${item.abbr} - ${item.name}`"
              @change="onCategoryChanged('')"
              return-object
              :placeholder="$t('sub_group')"
              clearable
              outlined
            />
          </v-col>
          <v-col sm="1" cols="1" class="py-0">
            <v-btn color="primary white--text" @click="onSearch('')">
              <i class="b-search" style="font-size: 18px; color: #fff !important" />
            </v-btn>
          </v-col>
        </v-row>
        <v-row class="mt-0">
          <v-col sm="12" cols="12" class="py-0">
            <template>
              <kendo-datasource
                ref="gridSaleServiceSummaryDS"
                :type="'JSON'"
                :data="prodSummaryList"
                :group="group"
                :server-paging="false"
              />
              <kendo-grid
                id="gridSaleServiceSummary"
                class="grid-function"
                :data-source-ref="'gridSaleServiceSummaryDS'"
                :editable="false"
                :column-menu="true"
                :filterable="true"
                :noRecords="true"
                :excel-file-name="'serviceSaleSummary.xlsx'"
                :excel-filterable="true"
                :excel-all-pages="true"
                :resizable="true"
                :sortable="true"
                :groupable="true"
                :toolbar="['excel']"
                :excel-export="excelExport"
                :scrollable-virtual="true"
              >
                <kendo-grid-column
                  :field="'sku'"
                  :attributes="{ class: 'tb_name_td' }"
                  :title="$t('code')"
                  :width="200"
                  :filterable="{ multi: true }"
                  :template="'<span>#=sku#</span>'"
                  :group-footer-template="'Total: '"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'name'"
                  :attributes="{ class: 'tb_name_td' }"
                  :title="$t('item')"
                  :width="200"
                  :filterable="{ multi: true }"
                  :template="'<span>#=name#</span>'"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'category'"
                  :title="$t('category')"
                  :width="200"
                  :filterable="false"
                  :template="'<span>#=category || ``#</span>'"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'group'"
                  :title="$t('group')"
                  :width="200"
                  :filterable="false"
                  :template="'<span>#=group || ``#</span>'"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5, color: green !important',
                  }"
                />
                <kendo-grid-column
                  :field="'subGroup'"
                  :attributes="{ class: 'tb_name_td' }"
                  :title="$t('sub_group')"
                  :template="'<span>#=subGroup || ``#</span>'"
                  :width="200"
                  :filterable="{ multi: true }"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'uom'"
                  :attributes="{ class: 'tb_name_td' }"
                  :title="$t('uom')"
                  :width="150"
                  :filterable="{ multi: true }"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'bQty'"
                  :title="$t('qty')"
                  :width="120"
                  :attributes="{ style: 'text-align: right; ' }"
                  :template="'<span>#=kendo.toString(parseFloat(bQty), decimalFormat)#</span>'"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />

                <kendo-grid-column
                  :field="'amount'"
                  :title="$t('amount')"
                  :attributes="{ style: 'text-align: right; ' }"
                  :template="'<span>#=kendo.toString(parseFloat(amount), decimalFormat)#</span>'"
                  :width="200"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
              </kendo-grid>
            </template>
          </v-col>
          <div style="overflow: auto" class="item-summary"></div>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
const categoryHandler = require("@/scripts/categoryHandler");
const groupHandler = require("@/scripts/groupHandler");
const subGroupHandler = require("@/scripts/subGroupHandler");
const billingHandler = require("@/scripts/invoice/handler/billingHandler");

import { i18n } from "@/i18n";
import kendo from "@progress/kendo-ui";
const $ = kendo.jQuery;
import dashboardHandler from "@/scripts/dashboard/customer/handler/dashboardHandler";
import JSZip from "jszip";

window.JSZip = JSZip;
export default {
  name: "VariantSummary",
  components: {
    LoadingMe: () => import(`@/components/Loading`),
    "app-month-of-picker": () => import("@/components/kendo_templates/MonthOfPicker"),
    // BankConnection,
  },
  data: () => ({
    loadingSearch: false,
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
    aggregateDefinition: [
      { field: "amount", aggregate: "sum" },
      { field: "bQty", aggregate: "sum" },
    ],
    group: [],
    decimalFormat: "n2",
    prodSummaryList: [],
    txnProdSummary: [],
    totalProdSumRecord: 0,
    toalProdSumaryPerPage: 0,
    paging: {},
    action: "",
    params: {},

    mCategory: {},
    mGroup: {},
    mSubGroup: {},
    categories: [],
    groups: [],
    subGroup: [],
    subGroups: [],
    totalRevenue: 0,
    // group: {
    //     field: 'name',
    //     aggregates: [
    //         {field: "qty", aggregate: "tQty"},
    //         {field: "amount", aggregate: "sum"}
    //     ]
    // },
  }),
  methods: {
    async onCategoryChanged() {
      const groupId = (this.mGroup || {}).id || "";
      this.subGroup = this.subGroups.filter((k) => k.group.id === groupId);
      if (this.subGroup.length === 0) {
        this.mSubGroup = {};
      }
    },
    async loadCategory() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          const param = {
            pattern: "cat#Service",
          };
          categoryHandler.getAllv2(param).then((res) => {
            this.showLoading = false;
            this.categories = res.data.data;
            // this.categories = this.categories.filter(
            //   (m) => m.type.name === "Product"
            // );
            if (this.categories.length > 0) {
              this.mCategory = this.categories[0];
              this.onCategoryChanged();
            }
          });
        }, 50);
      });
    },
    async loadGroup() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          const param = {
            pattern: "grp#Service",
          };
          groupHandler.getAllv2(param).then((res) => {
            this.groups = res.data.data; // filter((k) => k.category.type.name === "Product");
          });
        }, 10);
      });
    },
    async loadSubGroup() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          const param = {
            pattern: "sgr#Service",
          };
          subGroupHandler.getAllv2(param).then((res) => {
            this.showLoading = false;
            this.subGroups = res.data.data;
          });
        }, 10);
      });
    },
    excelExport: function (e) {
      // const pivot = this.$refs.gridSaleServiceSummaryDS.kendoWidget()
      // pivot.saveAsExcel()
      window.console.log("excelExport");
      window.console.log(e.data);
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
    async loadPage(that) {
      $(".item-summary").html(`
                <span class="mt-2 report-item-summary-item-returned">0</span><br/>
                <div style="display: flex; flex-direction: 'row'">
                    <button class="report-item-summary-next-page" title="previous" style="width: 24px; font-size: 19px; margin-top: -6px;"> < </button>
                    <ul class="report-item-summary-page-number page_scroll" style="display: flex;list-style: none; padding-left: 0px;">
                        <li style="padding: 6px; padding-bottom: 0px;"  data-page="1" class="report-item-summary-page-link text-bold-link" >1</li>
                    </ul>
                    <button class="report-item-summary-next-page" title="next" style="width: 24px; font-size: 19px;margin-top: -6px;"> > </button>
                </div>
            `);
      $(document).on("click", ".report-item-summary-page-link", function () {
        const page = $(this).data("page");
        $(".report-item-summary-page-link").removeClass("text-bold-link");
        $(this).addClass("text-bold-link");
        that.backToPage(that, page - 1);
        window.console.log(page - 1);
      });
      // $(document).on('click', '.bycus-next-page', function () {
      $(".report-item-summary-next-page").click(function () {
        const page_number = $(this)
          .parent()
          .children(".report-item-summary-page-number")
          .find("li")
          .last()
          .data("page");
        window.console.log("report-item-summary-page_number", page_number);
        const isPrevious = $(this).attr("title");
        if (isPrevious == "previous") {
          const currectpage = $(".text-bold-link").data("page");

          if (currectpage == 1) {
            return;
          }
          $(".report-item-summary-page-link").removeClass("text-bold-link");
          $(`.report-item-summary-page-link:eq(${currectpage - 1})`).addClass(
            "text-bold-link"
          );
          that.backToPage(that, currectpage - 2);
          window.console.log("this currectpage back", currectpage - 2);
        } else {
          $(".report-item-summary-page-link").removeClass("text-bold-link");
          that.loadProductSummary(that.search);
          $(this)
            .parent()
            .children(".report-item-summary-page-number")
            .append(
              `<li class="report-item-summary-page-link text-bold-link" style="padding: 6px; padding-bottom: 0px;" data-page="${
                page_number + 1
              }">${page_number + 1}</li>`
            );
        }
        window.console.log("this", page_number + 1);
      });
    },
    itemRetuned(that) {
      let totalRow = 0;
      that.txnProdSummary.forEach((k) => {
        totalRow += k.length;
      });
      $(".report-item-summary-item-returned").text("Items returned (" + totalRow + ")");
    },
    disabledNextPage(value) {
      $(".report-item-summary-next-page").prop("disabled", value);
    },
    backToPage(that, index) {
      try {
        const byProduct = that.txnProdSummary.at(index);
        that.prodSummaryList = byProduct;
        // that.refreshGridData(customer)
        window.console.log("that.txnProdSummary[index]", byProduct);
      } catch (e) {
        window.console.log("ERROR on backToPage", index);
      }
    },
    onSearch(search) {
      this.txnProdSummary = [];
      this.loadPage(this);
      this.paging = {};
      this.loadProductSummary(search);
      // this.transactionSummarize("Invoice");
    },
    async loadProductSummary() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.prodSummaryList = [];
          const cateId = (this.mCategory || {}).id || "";
          const groupId = (this.mGroup || {}).id || "";
          const subGroupId = (this.mSubGroup || {}).id || "";
          this.params = {
            asOf: this.asOf,
            key: this.paging,
            ctid: cateId,
            grid: groupId,
            sgrid: subGroupId,
            start: new Date(this.startDate).toISOString().substring(0, 10),
            end: new Date(this.endDate).toISOString().substring(0, 10),
            pattern: "#sale-report#2",
          };
          this.showLoading = true;
          this.disabledNextPage(true);
          dashboardHandler.topSaleReport(this.params).then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoading = false;
              const responseData = res.data.data || [];
              const total = res.data.total || 0;
              this.showLoading = false;
              this.prodSummaryList = responseData;
              this.paging = res.data.key;
              window.console.log("key", res.data.key);
              this.txnProdSummary.push(responseData);

              this.toalProdSumaryPerPage = this.prodSummaryList.length;
              this.totalProdSumRecord = total;

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
    async transactionSummarize(type) {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = true;
          this.loadingSearch = true;
          const startDate = this.startDate;
          const endDate = this.endDate;
          this.params = {
            search: "",
            type: type,
            start: startDate,
            end: endDate,
            isSummarize: 1,
            key: {},
          };
          billingHandler.list(this.params).then((res) => {
            if (res.data.statusCode === 200) {
              this.loadingSearch = false;
              this.showLoading = false;
              const result = res.data.data[0] || {};
              this.totalRevenue = result.Revenue || 0;
            } else {
              this.loadingSearch = false;
              this.showLoading = false;
            }
          });
        }, 10);
      });
    },
    revenueTemplate(dataItem) {
      const revenue = dataItem.amount || 0;
      let pRevenue = parseFloat(revenue) / this.totalRevenue;
      pRevenue = pRevenue ? pRevenue : 0;
      return kendo.toString(pRevenue * 100, dataItem.decimalFormat);
    },
  },
  async mounted() {
    this.group = [
      {
        field: "category",
        aggregates: this.aggregateDefinition,
      },
    ];
    await this.loadCategory();
    await this.loadGroup();
    await this.loadSubGroup();
    this.loadPage(this);
    this.itemRetuned(this);
    this.disabledNextPage(true);
    // await this.loadTransactions()
  },
  computed: {},
};
</script>
<style scoped></style>
