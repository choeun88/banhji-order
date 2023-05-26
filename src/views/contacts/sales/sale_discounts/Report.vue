<template>
  <v-row>
    <v-col sm="12" cols="12" class="grayBg px-6">
      <v-card color="white" class="pa-3 no_border" elevation="0">
        <h2 class="mb-0 font_20">{{ $t("discount_report") }}</h2>
        <p class="mb-0">{{ $t("discount_report_desc") }}</p>

        <!-- loading -->
        <LoadingMe
          :isLoading="showLoading"
          :fullPage="false"
          type="loading"
          :myLoading="true"
        >
        </LoadingMe>

        <v-row class="">
          <v-col sm="3" cols="12" class="pb-0">
            <label class="label mb-0">{{ $t("dates") }}</label>
            <v-select
              class="mt-0"
              :items="dateSorters"
              v-model="mDateSorter"
              @change="onSorterChanges"
              outlined
              placeholder="ALL"
            />
          </v-col>

          <v-col sm="3" cols="12" class="pb-0">
            <label class="label mb-0">{{ $t("from") }}</label>
            <app-datepicker :initialDate="startDate" @emitDate="startDate = $event" />
          </v-col>

          <v-col sm="3" cols="12" class="pb-0">
            <label class="label mb-0">{{ $t("to") }}</label>
            <app-datepicker :initialDate="endDate" @emitDate="endDate = $event" />
          </v-col>

          <v-col sm="1" cols="1" class="pb-0 mt-6">
            <v-btn color="primary white--text" @click="onSearch">
              <i class="b-search" style="font-size: 18px; color: #fff !important" />
            </v-btn>
          </v-col>
          <!-- <v-col sm="2" cols="12" class="py-0">
                      <v-btn icon color="black" class="bg-none float-right ml-2">
                        <v-icon class="font_34">fa fa-file-excel</v-icon>
                      </v-btn>
                      <v-btn icon color="black" class="bg-none float-right ml-2">
                        <v-icon class="font_34">fa fa-print</v-icon>
                      </v-btn>
                    </v-col> -->
        </v-row>

        <v-row>
          <v-col sm="12" cols="12" class="py-0">
            <template>
              <kendo-datasource
                ref="discountItemReportDS"
                :group="group"
                :data="discountList"
              />
              <kendo-grid
                id="gridDiscountItemReport"
                class="grid-function"
                :data-source-ref="'discountItemReportDS'"
                :editable="false"
                :groupable="true"
                :sortable="true"
                :resizable="true"
                :toolbar="toolbarTemplate"
                :excel-export="excelExport"
                :excel-file-name="'DiscountItemReport.xlsx'"
                :excel-filterable="true"
                :scrollable-virtual="true"
              >
                <kendo-grid-column
                  :field="'transactionDate'"
                  :title="$t('transaction_date')"
                  :template="dateTemplate"
                  :attributes="{ style: 'text-align: left' }"
                  :width="180"
                  :headerAttributes="{
                    style: 'text-align: right; background-color: #EDF1F5',
                  }"
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
                  :field="'objName'"
                  :title="$t('customer')"
                  :width="200"
                  :template="'<span>#=objName#</span>'"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'referenceNo'"
                  :title="$t('invoice_no')"
                  :width="150"
                  :template="referenceTemplate"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'xInvoiceAmount'"
                  :title="$t('amount')"
                  :width="180"
                  :template="'<span>#= kendo.toString(xInvoiceAmount, decimalFormat)#</span>'"
                  :attributes="{ style: 'text-align: right' }"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />

                <kendo-grid-column
                  :field="'xAmount'"
                  :title="$t('discount')"
                  :width="180"
                  :template="'<span>#= kendo.toString(xAmount, decimalFormat)#</span>'"
                  :attributes="{ style: 'text-align: right;font-weight:900' }"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'percentage'"
                  :title="$t('percentage')"
                  :template="'<span>#= kendo.toString(percentage, decimalFormat)#</span> %'"
                  :attributes="{ style: 'text-align: right' }"
                  :width="180"
                  :headerAttributes="{
                    style: 'text-align: right; background-color: #EDF1F5',
                  }"
                />
              </kendo-grid>
            </template>
          </v-col>
        </v-row>
        <div style="overflow: auto" class="sale-discount-report"></div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
// import DatePickerComponent from "@/components/custom_templates/DatePickerComponent";
import { i18n } from "@/i18n";
import kendo from "@progress/kendo-ui";
import LinkTemplate from "@/components/kendo_templates/LinkTemplate";
const $ = kendo.jQuery;
const discountItemHandler = require("@/scripts/discountItemHandler");

import JSZip from "jszip";

window.JSZip = JSZip;

export default {
  name: "SaleDiscountReport",
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
    showLoading: false,
    isLoaded: false,
    mDateSorter: "Today",
    discountItemTxn: [],
    group: { field: "name" },

    discountList: [],
    txnDiscountList: [],
    totalDiscount: 0,
    toalDiscountPerPage: 0,
    paging: {},
    action: "",
    params: {},
  }),
  methods: {
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
    dateTemplate(dataItem) {
      const transactionDate = dataItem.transactionDate;
      if (transactionDate) {
        return `<span>${
          transactionDate
            ? kendo.toString(new Date(transactionDate), dataItem.dateFormat + " h:mm tt")
            : ``
        }</span>`;
      } else {
        return ``;
      }
    },
    // async searchTransaction() {
    //   new Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve("resolved");
    //       this.showLoading = true;
    //       const startDate = this.startDate;
    //       const endDate = this.endDate;
    //       let strFilter = "?start=&end=&type=Sale";
    //       if (startDate !== "" && endDate !== "") {
    //         strFilter =
    //           "?start=" + startDate + "&end=" + endDate + "&type=Sale";
    //       }
    //       discountItemHandler.discountItemReport(strFilter).then((res) => {
    //         if (res.data.statusCode === 200) {
    //           this.showLoading = false;
    //           this.discountItemTxn = JSON.parse(JSON.stringify(res.data.data));
    //         } else {
    //           this.showLoading = false;
    //         }
    //       });
    //     }, 10);
    //   });
    // },
    referenceTemplate(data) {
      let url = "";
      if (data.type === "Invoice") {
        url = `invoice_view/${data.txnId}`;
      } else if (data.type === "Sale Deposit") {
        url = `sale_deposit_view/${data.txnId}`;
      } else if (data.type === "Purchase") {
        url = `purchase_view/${data.txnId}`;
      } else if (data.type === "Sale Quote") {
        url = `sale_quote_view/${data.txnId}`;
      } else if (data.type === "Cash Receipt") {
        url = `cash_receipt_view/${data.txnId}`;
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
      const grid = $("#gridDiscountItemReport").data("kendoGrid");
      grid.saveAsExcel();
    },
    excelExport: function (e) {
      // const pivot = this.$refs.gridTransactionDS.kendoWidget()
      // pivot.saveAsExcel()
      window.console.log(e.data);
    },
    initToolbar(that) {
      let grid = $("#gridDiscountItemReport").data("kendoGrid");
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
      $(".sale-discount-report").html(`
                <span class="mt-2 discount-report-item-returned">0</span><br/>
                <div style="display: flex; flex-direction: 'row'">
                    <button class="discount-report-next-page" title="previous" style="width: 24px; font-size: 19px; margin-top: -6px;"> < </button>
                    <ul class="discount-report-page-number page_scroll" style="display: flex;list-style: none; padding-left: 0px;">
                        <li style="padding: 6px; padding-bottom: 0px;"  data-page="1" class="discount-report-page-link text-bold-link" >1</li>
                    </ul>
                    <button class="discount-report-next-page" title="next" style="width: 24px; font-size: 19px;margin-top: -6px;"> > </button>
                </div>
            `);
      $(document).on("click", ".discount-report-page-link", function () {
        const page = $(this).data("page");
        $(".discount-report-page-link").removeClass("text-bold-link");
        $(this).addClass("text-bold-link");
        that.backToPage(that, page - 1);
        window.console.log(page - 1);
      });
      // $(document).on('click', '.bycus-next-page', function () {
      $(".discount-report-next-page").click(function () {
        const page_number = $(this)
          .parent()
          .children(".discount-report-page-number")
          .find("li")
          .last()
          .data("page");
        window.console.log("discount-report-page_number", page_number);
        const isPrevious = $(this).attr("title");
        if (isPrevious == "previous") {
          const currectpage = $(".text-bold-link").data("page");

          if (currectpage == 1) {
            return;
          }
          $(".discount-report-page-link").removeClass("text-bold-link");
          $(`.discount-report-page-link:eq(${currectpage - 1})`).addClass(
            "text-bold-link"
          );
          that.backToPage(that, currectpage - 2);
          window.console.log("this currectpage back", currectpage - 2);
        } else {
          $(".discount-report-page-link").removeClass("text-bold-link");
          that.loadSaleDiscountReport(that.search);
          $(this)
            .parent()
            .children(".discount-report-page-number")
            .append(
              `<li class="discount-report-page-link text-bold-link" style="padding: 6px; padding-bottom: 0px;" data-page="${
                page_number + 1
              }">${page_number + 1}</li>`
            );
        }
        window.console.log("this", page_number + 1);
      });
    },
    itemRetuned(that) {
      let totalRow = 0;
      that.txnDiscountList.forEach((k) => {
        totalRow += k.length;
      });
      $(".discount-report-item-returned").text("Items returned (" + totalRow + ")");
    },
    disabledNextPage(value) {
      $(".discount-report-next-page").prop("disabled", value);
    },
    backToPage(that, index) {
      try {
        const byProduct = that.txnDiscountList.at(index);
        that.discountList = byProduct;
        // that.refreshGridData(customer)
        window.console.log("that.txnDiscountList[index]", byProduct);
      } catch (e) {
        window.console.log("ERROR on backToPage", index);
      }
    },
    onSearch(search) {
      this.txnDiscountList = [];
      this.loadPage(this);
      this.paging = {};
      this.loadSaleDiscountReport(search);
    },
    async loadSaleDiscountReport() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.discountList = [];
          this.params = {
            asOf: this.asOf,
            key: this.paging,
            start: this.startDate,
            end: this.endDate,
            type: "sale",
          };
          this.showLoading = true;
          this.disabledNextPage(true);
          discountItemHandler.discountItemReport(this.params).then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoading = false;
              const responseData = res.data.data || [];
              const total = res.data.total || 0;
              this.showLoading = false;
              this.discountList = responseData;
              this.paging = res.data.key;
              window.console.log("key", res.data.key);
              this.txnDiscountList.push(responseData);

              this.toalDiscountPerPage = this.discountList.length;
              this.totalDiscount = total;

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
    await this.initToolbar(this);
    this.loadPage(this);
    this.itemRetuned(this);
    this.disabledNextPage(true);
  },
  computed: {},
};
</script>
<style scoped></style>
