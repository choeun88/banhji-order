<template>
  <v-row>
    <v-col sm="12" cols="12" class="grayBg px-6">
      <v-card min-height="564" color="white" class="pa-3 no_border" elevation="0">
        <!-- loading -->
        <h2 class="mb-0 font_020">{{ $t("other_charge_report") }}</h2>
        <p class="mb-2">{{ $t("other_charge_report_desc") }}</p>
        <LoadingMe
          :isLoading="showLoading"
          :fullPage="false"
          type="loading"
          :myLoading="true"
        >
        </LoadingMe>

        <v-row class="">
          <v-col sm="4" cols="12" class="py-0">
            <label class="label">{{ $t("dates") }}</label>
            <v-select
              class="mt-0"
              :items="dateSorters"
              v-model="mDateSorter"
              @change="onSorterChanges"
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
          <v-col sm="4" cols="12" class="py-0 kendo_dropdown_custom">
            <label class="label">{{ $t("other_charge") }}</label>
            <othercharge-dropdownlist
              :initOtherCharge="otherCharge"
              @onChange="onPaymentOptionChanged"
            />
          </v-col>
          <v-col sm="1" cols="1" class="pb-0 mt-4" @click="onSearch">
            <v-btn color="primary white--text">
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
            <kendo-datasource
              ref="otherChargeItemDS"
              :group="group"
              :data="otherChargeList"
            />
            <kendo-grid
              id="gridOtherChargeItemReport"
              class="grid-function"
              :data-source-ref="'otherChargeItemDS'"
              :editable="false"
              :groupable="true"
              :sortable="true"
              :resizable="true"
              :toolbar="toolbarTemplate"
              :excel-export="excelExport"
              :excel-file-name="'OtherChargeReport.xlsx'"
              :excel-filterable="true"
              :scrollable-virtual="true"
            >
              <kendo-grid-column
                :field="'transactionDate'"
                :title="$t('date')"
                :width="180"
                :template="dateTemplate"
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
                :field="'xAmount'"
                :title="$t('amount')"
                :width="180"
                :template="'<span>#= kendo.toString(xAmount, decimalFormat)#</span>'"
                :attributes="{ style: 'text-align: right' }"
                :headerAttributes="{ style: 'background-color: #EDF1F5' }"
              />
            </kendo-grid>
          </v-col>
        </v-row>
        <div style="overflow: auto" class="other-charge-report"></div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { i18n } from "@/i18n";
import kendo from "@progress/kendo-ui";
import LinkTemplate from "@/components/kendo_templates/LinkTemplate";

const discountItemHandler = require("@/scripts/discountItemHandler");
const $ = kendo.jQuery;

import JSZip from "jszip";

window.JSZip = JSZip;
export default {
  name: "OtherChargeReport",
  components: {
    LoadingMe: () => import(`@/components/Loading`),
    "app-datepicker": () => import(`@/components/custom_templates/DatePickerComponent`),
    "othercharge-dropdownlist": () =>
      import("@/components/dropdownlist/OtherChargeDropdownList"),
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
    journal_entries: [],
    showLoading: false,
    mDateSorter: "Today",
    isLoaded: false,
    // otherChargeTxn: [],
    group: { field: "name" },

    otherChargeList: [],
    txnOtherChargeList: [],
    totalSaleUnit: 0,
    totalSaleUnitPerPage: 0,
    paging: {},
    action: "",
    params: {},
    otherCharge: {},
  }),
  methods: {
    onPaymentOptionChanged(value) {
      this.otherCharge = value;
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
    // async searchTransaction() {
    //     new Promise(resolve => {
    //         setTimeout(() => {
    //             resolve('resolved');
    //             this.showLoading = true
    //             const startDate = this.startDate
    //             const endDate = this.endDate
    //             let strFilter = '?start=&end='
    //             if (startDate !== '' && endDate !== '') {
    //                 strFilter = '?start=' + startDate + '&end=' + endDate
    //             }
    //             discountItemHandler.otherChargeReport(strFilter).then(res => {
    //                 if (res.data.statusCode === 200) {
    //                     this.showLoading = false
    //                     this.otherChargeTxn = JSON.parse(JSON.stringify(res.data.data))
    //                 } else {
    //                     this.showLoading = false
    //                 }
    //             })
    //         }, 10);
    //     })
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
      const grid = $("#gridOtherChargeItemReport").data("kendoGrid");
      grid.saveAsExcel();
    },
    excelExport: function (e) {
      // const pivot = this.$refs.gridTransactionDS.kendoWidget()
      // pivot.saveAsExcel()
      window.console.log(e.data);
    },
    initToolbar(that) {
      let grid = $("#gridOtherChargeItemReport").data("kendoGrid");
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
    async loadPage(that) {
      $(".other-charge-report").html(`
                <span class="mt-2 othercharge-report-item-returned">0</span><br/>
                <div style="display: flex; flex-direction: 'row'">
                    <button class="othercharge-report-next-page" title="previous" style="width: 24px; font-size: 19px; margin-top: -6px;"> < </button>
                    <ul class="othercharge-report-page-number page_scroll" style="display: flex;list-style: none; padding-left: 0px;">
                        <li style="padding: 6px; padding-bottom: 0px;"  data-page="1" class="othercharge-report-page-link text-bold-link" >1</li>
                    </ul>
                    <button class="othercharge-report-next-page" title="next" style="width: 24px; font-size: 19px;margin-top: -6px;"> > </button>
                </div>
            `);
      $(document).on("click", ".othercharge-report-page-link", function () {
        const page = $(this).data("page");
        $(".othercharge-report-page-link").removeClass("text-bold-link");
        $(this).addClass("text-bold-link");
        that.backToPage(that, page - 1);
        window.console.log(page - 1);
      });
      // $(document).on('click', '.bycus-next-page', function () {
      $(".othercharge-report-next-page").click(function () {
        const page_number = $(this)
          .parent()
          .children(".othercharge-report-page-number")
          .find("li")
          .last()
          .data("page");
        window.console.log("othercharge-report-page_number", page_number);
        const isPrevious = $(this).attr("title");
        if (isPrevious == "previous") {
          const currectpage = $(".text-bold-link").data("page");

          if (currectpage == 1) {
            return;
          }
          $(".othercharge-report-page-link").removeClass("text-bold-link");
          $(`.othercharge-report-page-link:eq(${currectpage - 1})`).addClass(
            "text-bold-link"
          );
          that.backToPage(that, currectpage - 2);
          window.console.log("this currectpage back", currectpage - 2);
        } else {
          $(".othercharge-report-page-link").removeClass("text-bold-link");
          that.loadOtherChargeReport(that.search);
          $(this)
            .parent()
            .children(".othercharge-report-page-number")
            .append(
              `<li class="othercharge-report-page-link text-bold-link" style="padding: 6px; padding-bottom: 0px;" data-page="${
                page_number + 1
              }">${page_number + 1}</li>`
            );
        }
        window.console.log("this", page_number + 1);
      });
    },
    itemRetuned(that) {
      let totalRow = 0;
      that.txnOtherChargeList.forEach((k) => {
        totalRow += k.length;
      });
      $(".othercharge-report-item-returned").text("Items returned (" + totalRow + ")");
    },
    disabledNextPage(value) {
      $(".othercharge-report-next-page").prop("disabled", value);
    },
    backToPage(that, index) {
      try {
        const byProduct = that.txnOtherChargeList.at(index);
        that.otherChargeList = byProduct;
        // that.refreshGridData(customer)
        window.console.log("that.txnOtherChargeList[index]", byProduct);
      } catch (e) {
        window.console.log("ERROR on backToPage", index);
      }
    },
    onSearch(search) {
      this.txnOtherChargeList = [];
      this.loadPage(this);
      this.paging = {};
      this.loadOtherChargeReport(search);
    },
    async loadOtherChargeReport() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.otherChargeList = [];
          this.params = {
            asOf: this.asOf,
            key: this.paging,
            start: this.startDate,
            end: this.endDate,
            id: this.otherCharge.id || "",
          };
          this.showLoading = true;
          this.disabledNextPage(true);
          discountItemHandler.otherChargeReport(this.params).then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoading = false;
              const responseData = res.data.data || [];
              const total = res.data.total || 0;
              this.showLoading = false;
              this.otherChargeList = responseData;
              this.paging = res.data.key;
              window.console.log("key", res.data.key);
              this.txnOtherChargeList.push(responseData);

              this.totalSaleUnitPerPage = this.otherChargeList.length;
              this.totalSaleUnit = total;

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
    this.initToolbar(this);
    this.loadPage(this);
    this.itemRetuned(this);
    this.disabledNextPage(true);
  },
  computed: {},
};
</script>
<style scoped></style>
