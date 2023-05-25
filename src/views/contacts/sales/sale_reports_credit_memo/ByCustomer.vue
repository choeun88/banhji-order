<template>
  <v-row>
    <v-col sm="12" cols="12" class="grayBg px-6">
      <v-card color="white" class="pa-3 no_border" elevation="0">
        <h2 class="mb-0 font_020">{{ $t("credit_notes_by_customers") }}</h2>

        <p class="mb-2">{{ $t("credit_notes_by_customers_desc") }}</p>
        <LoadingMe
          :isLoading="showLoading"
          :fullPage="false"
          type="loading"
          :myLoading="true"
        >
        </LoadingMe>
        <v-row>
          <v-col sm="3" cols="12" class="py-0">
            <label class="label">{{ $t("dates") }}</label>
            <v-select
              class="mt-1"
              :items="dateSorters"
              v-model="mDateSorter"
              @change="onSorterChanges"
              item-value="value"
              item-text="text"
              outlined
              placeholder="ALL"
            />
          </v-col>

          <v-col sm="3" cols="12" class="py-0">
            <label class="label">{{ $t("from") }}</label>
            <app-datepicker :initialDate="startDate" @emitDate="startDate = $event" />
          </v-col>

          <v-col sm="3" cols="12" class="py-0">
            <label class="label">{{ $t("to") }}</label>
            <app-datepicker :initialDate="endDate" @emitDate="endDate = $event" />
          </v-col>

          <v-col sm="1" cols="1" class="pt-0 mt-6">
            <v-btn color="primary white--text" @click="onSearch">
              <i class="b-search" style="font-size: 18px; color: #fff !important" />
            </v-btn>
          </v-col>
        </v-row>

        <v-row class="mt-0">
          <v-col sm="12" cols="12" class="py-0">
            <template>
              <kendo-datasource
                ref="saleCreditMemoByCustomerDS"
                :type="'JSON'"
                :data="itemMarginAnanlysisList"
                :group="group"
                :server-paging="false"
              />
              <kendo-grid
                id="gridCreditMemoByCustomerTxn"
                class="grid-function"
                :data-source-ref="'saleCreditMemoByCustomerDS'"
                :editable="false"
                :column-menu="true"
                :noRecords="true"
                :resizable="true"
                :sortable="true"
                :groupable="true"
                :toolbar="toolbarTemplate"
                :excel-export="excelExport"
                :excel-file-name="'CreditMemoTransactionByCustomer.xlsx'"
                :excel-filterable="true"
                @pagechange="pageChangeHandler"
                :scrollable-virtual="true"
              >
                <kendo-grid-column
                  :field="'date'"
                  :title="$t('date')"
                  :width="200"
                  :template="dateFormat"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'name'"
                  :title="$t('name')"
                  :attributes="{ class: 'tb_name_td' }"
                  :width="200"
                  :template="'<span>#=name#</span>'"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'transactionType'"
                  :title="$t('type')"
                  :width="150"
                  :template="'<span>#=transactionType#</span>'"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'referenceNo'"
                  :title="$t('number')"
                  :width="200"
                  :template="referenceTemplate"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5, color: green !important',
                  }"
                />
                <kendo-grid-column
                  :field="'invRefNum'"
                  :title="$t('invoice_no')"
                  :width="200"
                  :template="referenceTemplateInvoice"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5, color: green !important',
                  }"
                />
                <kendo-grid-column
                  :field="'exchangeAmount'"
                  :title="$t('amount')"
                  :width="200"
                  :attributes="{ style: 'text-align: right; ' }"
                  :template="'<span>#=kendo.toString(exchangeAmount, decimalFormat)#</span>'"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'segment.name'"
                  :title="$t('segment')"
                  :width="200"
                  :sortable="false"
                  :filterable-multi="true"
                  :filterable-search="true"
                  :attributes="{ style: 'text-align: left; ' }"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'location.name'"
                  :title="$t('location')"
                  :width="200"
                  :sortable="false"
                  :filterable-multi="true"
                  :filterable-search="true"
                  :attributes="{ style: 'text-align: left; ' }"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'project.name'"
                  :title="$t('project')"
                  :width="200"
                  :sortable="false"
                  :filterable-multi="true"
                  :filterable-search="true"
                  :attributes="{ style: 'text-align: left; ' }"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <!-- <kendo-grid-column
                                    :field="''"
                                    :title="$t('action')"
                                    :width="100"
                                    :command="[{  text: 'Edit', click: goToEdit }]"
                                    :headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"/> -->
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
import CreditMemoModel from "@/scripts/sale_return/model/CreditMemo";
import kendo from "@progress/kendo-ui";
import LinkTemplate from "@/components/kendo_templates/LinkTemplate";
import { i18n } from "@/i18n";
const billingHandler = require("@/scripts/invoice/handler/billingHandler");
const $ = kendo.jQuery;
const creditMemoModel = new CreditMemoModel({});

import JSZip from "jszip";

window.JSZip = JSZip;
export default {
  name: "CreditMemoByCustomerTransaction",
  components: {
    LoadingMe: () => import(`@/components/Loading`),
    "app-datepicker": () => import(`@/components/custom_templates/DatePickerComponent`),
  },
  data: () => ({
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
    tranDS: [],
    isLoaded: false,
    creditMemo: creditMemoModel,
    totalRevenue: 0,
    totalSaleLead: 0,
    totalSaleQuote: 0,
    totalSaleOrder: 0,
    group: { field: "name" },

    txnItemMarginAnanlysisList: [],
    itemMarginAnanlysisList: [],
    totalItemMarginBal: 0,
    toalItemMarginPerPage: 0,
    paging: {},
    action: "",
    params: {},
  }),
  methods: {
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
    referenceTemplate(data) {
      let url = `sale_return_view/${data.id}`;
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
    referenceTemplateInvoice(data) {
      let url = `invoice_view/${data.txnId}`;
      if (data.nrd) {
        url = `invoice_view/${data.txnId}-nrd`;
      }
      let args = {
        text: data.invRefNum,
        url: url,
        data: data,
      };
      return {
        template: LinkTemplate,
        templateArgs: args,
      };
    },
    goToEdit(e) {
      e.preventDefault();
      let grid = kendo.jQuery("#gridTransactionMemo").data("kendoGrid");
      let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
      const txnId = dataItem.id;
      this.$router.push({
        path: "sale_return/" + txnId,
        name: "Sale Return",
        params: { id: txnId },
        query: { type: "Edit" },
      });
    },
    rowNumberTmpl(dataItem) {
      let ds = this.$refs.saleCreditMemoByCustomerDS.kendoWidget(),
        index = ds.indexOf(dataItem);
      return index + 1;
    },
    // async searchTransaction(type) {
    //   new Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve("resolved");
    //       this.showLoading = true;
    //       const startDate = this.startDate;
    //       const endDate = this.endDate;
    //       let strFilter = "";
    //       if (type !== "") {
    //         strFilter =
    //           "?start=" + startDate + "&end=" + endDate + "&type=" + type;
    //       } else {
    //         strFilter = "?start=" + startDate + "&end=" + endDate;
    //       }

    //       billingHandler.creditMemoList(strFilter).then((res) => {
    //         if (res.data.statusCode === 200) {
    //           this.transactions = res.data.data;
    //         }
    //         this.showLoading = false;
    //       });
    //     }, 300);
    //   });
    // },
    dateFormat(dataItem) {
      return kendo.toString(
        new Date(dataItem.date),
        `${this.creditMemo.dateFormat}` + ` hh:mm tt`
      );
    },
    callback() {
      // if (this.$route.params !== null && this.$route.params.hasOwnProperty('data')) {
      //     const data = this.$route.params.data
      //     if (data.transactionType === 'delete') {
      //         this.loadTransactions()
      //     }
      // }
      // window.console.log('im changed', this.$route.params)
    },
    // tranDS: function () {
    //     let vue = this
    //     const startDate = this.startDate
    //     const endDate = this.endDate
    //     let strFilter = ''
    //     strFilter = '?start=' + startDate + '&end=' + endDate
    //     return new kendo.data.DataSource({
    //         transport: {
    //             read: {
    //                 url: 'https://dev-apis.banhji.com/invoice-billings/invoice/institute/institute-0ab24220-808d-11ea-9131-1d2fe2a803b1/list/' + strFilter,
    //                 type: 'GET',
    //                 dataType: 'json'
    //             }
    //         },
    //         schema: {
    //             total: function (response) {
    //                 return response.total
    //             },
    //             data: function (response) {
    //                 return response.data
    //             },
    //             // total: function (response) {
    //             //     return response.total
    //             // }
    //         },
    //         pageable: true,
    //         pageSize: 20,
    //         serverPaging: true,
    //         // testing the change event handler
    //         change: function (e) {
    //             let data = this.data()
    //             window.console.log(data, e)
    //         },
    //         requestStart: function () {
    //             vue.loading = true
    //         },
    //         requestEnd: function () {
    //             vue.loading = false
    //         }
    //     })
    // },
    toolbarTemplate: function () {
      const templateHtml =
        "<span>" +
        '<a class="k-pager-excel k-link k-button excel" title="Export to Excel"> <span class="k-icon k-i-excel"></span>Export to excel </a>' +
        "</span><span>&nbsp;&nbsp;</span>" +
        '<span style="position:absolute; right:5px">' +
        "</span>";

      return kendo.template(templateHtml);
    },
    exportToExcel() {
      const grid = $("#gridCreditMemoByCustomerTxn").data("kendoGrid");
      grid.saveAsExcel();
    },
    excelExport: function (e) {
      // const pivot = this.$refs.gridTransactionDS.kendoWidget()
      // pivot.saveAsExcel()
      window.console.log(e.data);
    },
    initToolbar(that) {
      let grid = $("#gridCreditMemoByCustomerTxn").data("kendoGrid");
      let gridElement = grid.element;
      let toolbarElement = gridElement.find(".k-grid-toolbar");
      toolbarElement.on("click", ".k-pager-excel", function (e) {
        e.preventDefault();
        onExportExcel(that);
      });

      function onExportExcel(that) {
        that.exportToExcel();
      }
    },
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
      this.loadSaleMarginAnalysis();
    },
    async loadSaleMarginAnalysis() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = true;
          this.loadingSearch = true;
          const startDate = this.startDate;
          const endDate = this.endDate;
          this.params = {
            search: "",
            type: "Credit Memo",
            start: startDate,
            end: endDate,
            key: this.paging,
            isSummarize: 0,
          };
          this.disabledNextPage(true);
          billingHandler.list(this.params).then((res) => {
            if (res.data.statusCode === 200) {
              this.loadingSearch = false;
              this.showLoading = false;
              window.console.log("im search", res);
              const responseData = res.data.data || [];
              this.itemMarginAnanlysisList = responseData;
              this.paging = res.data.key;
              window.console.log("key", res.data.key);
              this.txnItemMarginAnanlysisList.push(responseData);
              if (Object.keys(this.paging).length > 0) {
                this.disabledNextPage(false);
              } else {
                this.disabledNextPage(true);
              }
              this.itemRetuned(this);
              window.console.log(
                "txnItemMarginAnanlysisList",
                this.txnItemMarginAnanlysisList,
                res.data.key
              );
            } else {
              this.loadingSearch = false;
              this.showLoading = false;
            }
          });
        }, 10);
      });
    },
  },
  mounted: async function () {
    await this.initToolbar(this);
    this.loadPage(this);
    this.itemRetuned(this);
    this.disabledNextPage(true);
  },
  computed: {},
  watch: {
    // '$route': 'callback'
  },
};
</script>
<style scoped></style>
