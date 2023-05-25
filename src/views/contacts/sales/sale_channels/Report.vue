<template>
  <v-row>
    <v-col sm="12" cols="12" class="grayBg px-6">
      <v-card min-height="565" color="white" class="pa-3 no_border" elevation="0">
        <v-row>
          <v-col sm="9" class="py-0">
            <h2 class="mb-0 font_020">{{ $t("sale_channels_report") }}</h2>
            <p class="mb-0">{{ $t("channel_report_desc") }}</p>
          </v-col>

          <!-- loading -->
          <LoadingMe
            :isLoading="showLoading"
            :fullPage="false"
            type="loading"
            :myLoading="true"
          >
          </LoadingMe>

          <v-col sm="4" cols="12" class="pb-0">
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

          <v-col sm="4" cols="12" class="pb-0">
            <label class="label mb-0">{{ $t("from") }}</label>
            <app-datepicker :initialDate="startDate" @emitDate="startDate = $event" />
          </v-col>

          <v-col sm="4" cols="12" class="pb-0">
            <label class="label mb-0">{{ $t("to") }}</label>
            <app-datepicker :initialDate="endDate" @emitDate="endDate = $event" />
          </v-col>
          <v-col sm="4" cols="4" class="pt-0">
            <label class="label mb-0">{{ $t("sale_channel") }}</label>
            <v-select
              class="mt-1"
              :items="saleChannels"
              item-value="id"
              item-text="name"
              v-model="saleChannel"
              return-object
              clearable
              outlined
            />
          </v-col>

          <v-col sm="1" cols="1" class="pb-0 pt-6" @click="onSearch">
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
            <template>
              <kendo-datasource
                ref="saleChannelDS"
                :group="group"
                :data="saleChannelList"
              />
              <kendo-grid
                id="gridSaleChannel"
                class="grid-function"
                :data-source-ref="'saleChannelDS'"
                :editable="false"
                :column-menu="true"
                :noRecords="true"
                :resizable="true"
                :sortable="true"
                :groupable="true"
                :toolbar="toolbarTemplate"
                :excel-export="excelExport"
                :excel-file-name="'SaleChannelReport.xlsx'"
                :excel-filterable="true"
                :scrollable-virtual="true"
              >
                <kendo-grid-column
                  :field="'transactionDate'"
                  :title="$t('date')"
                  :width="200"
                  :template="dateFormatTemplate"
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
                  :field="'objName.name'"
                  :title="$t('customer')"
                  :width="200"
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
                  :title="$t('invoice_amount')"
                  :width="200"
                  :template="'<span>#= kendo.toString(xAmount, decimalFormat)#</span>'"
                  :attributes="{ style: 'text-align: right' }"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'term'"
                  :title="$t('payment_term')"
                  :template="'<span>#=term#</span>'"
                  :attributes="{ style: 'text-align: left' }"
                  :width="180"
                  :headerAttributes="{
                    style: 'text-left: right; background-color: #EDF1F5',
                  }"
                />
                <kendo-grid-column
                  :field="'priceLevel'"
                  :title="$t('price_level')"
                  :template="'<span>#=priceLevel#</span>'"
                  :attributes="{ style: 'text-align: left' }"
                  :width="180"
                  :headerAttributes="{
                    style: 'text-align: left; background-color: #EDF1F5',
                  }"
                />
              </kendo-grid>
            </template>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
const $ = kendo.jQuery;
import { i18n } from "@/i18n";
import kendo from "@progress/kendo-ui";
import LinkTemplate from "@/components/kendo_templates/LinkTemplate";

const discountItemHandler = require("@/scripts/discountItemHandler");
const saleChannelHandler = require("@/scripts/saleChannelHandler");
import JSZip from "jszip";

window.JSZip = JSZip;
export default {
  name: "SaleChannelReport",
  components: {
    LoadingMe: () => import(`@/components/Loading`),
    "app-datepicker": () => import(`@/components/custom_templates/DatePickerComponent`),
    // BankConnection,
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
    isLoaded: false,
    mDateSorter: "Today",
    saleChannelTxn: [],
    group: { field: "name" },

    txnSaleChannelList: [],
    saleChannelList: [],
    totalRecordSaleChannel: 0,
    toalSaleChannelRecordPerPage: 0,
    paging: {},
    action: "",
    params: {},
    saleChannels: [],
    saleChannel: {},
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
    //             discountItemHandler.saleChannelReport(strFilter).then(res => {
    //                 if (res.data.statusCode === 200) {
    //                     this.showLoading = false
    //                     this.saleChannelTxn = JSON.parse(JSON.stringify(res.data.data))
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
      const grid = $("#gridSaleChannel").data("kendoGrid");
      grid.saveAsExcel();
    },
    excelExport: function (e) {
      // const pivot = this.$refs.gridTransactionDS.kendoWidget()
      // pivot.saveAsExcel()
      window.console.log(e.data);
    },
    initToolbar(that) {
      let grid = $("#gridSaleChannel").data("kendoGrid");
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
    dateFormatTemplate(dataItem) {
      return kendo.toString(
        new Date(dataItem.transactionDate),
        `${dataItem.dateFormat} H:mm`
      );
    },
    async loadPage(that) {
      $(".sale-channel-report").html(`
                <span class="mt-2 sch-report-item-returned">0</span><br/>
                <div style="display: flex; flex-direction: 'row'">
                    <button class="sch-report-next-page" title="previous" style="width: 24px; font-size: 19px; margin-top: -6px;"> < </button>
                    <ul class="sch-report-page-number page_scroll" style="display: flex;list-style: none; padding-left: 0px;">
                        <li style="padding: 6px; padding-bottom: 0px;"  data-page="1" class="sch-report-page-link text-bold-link" >1</li>
                    </ul>
                    <button class="sch-report-next-page" title="next" style="width: 24px; font-size: 19px;margin-top: -6px;"> > </button>
                </div>
            `);
      $(document).on("click", ".sch-report-page-link", function () {
        const page = $(this).data("page");
        $(".sch-report-page-link").removeClass("text-bold-link");
        $(this).addClass("text-bold-link");
        that.backToPage(that, page - 1);
        window.console.log(page - 1);
      });
      // $(document).on('click', '.bycus-next-page', function () {
      $(".sch-report-next-page").click(function () {
        const page_number = $(this)
          .parent()
          .children(".sch-report-page-number")
          .find("li")
          .last()
          .data("page");
        window.console.log("sch-report-page_number", page_number);
        const isPrevious = $(this).attr("title");
        if (isPrevious == "previous") {
          const currectpage = $(".text-bold-link").data("page");

          if (currectpage == 1) {
            return;
          }
          $(".sch-report-page-link").removeClass("text-bold-link");
          $(`.sch-report-page-link:eq(${currectpage - 1})`).addClass("text-bold-link");
          that.backToPage(that, currectpage - 2);
          // window.console.log("this currectpage back", currectpage - 2);
        } else {
          $(".sch-report-page-link").removeClass("text-bold-link");
          that.loadSaleChannelReport();
          $(this)
            .parent()
            .children(".sch-report-page-number")
            .append(
              `<li class="sch-report-page-link text-bold-link" style="padding: 6px; padding-bottom: 0px;" data-page="${
                page_number + 1
              }">${page_number + 1}</li>`
            );
        }
        window.console.log("this", page_number + 1);
      });
    },
    itemRetuned(that) {
      let totalRow = 0;
      that.txnSaleChannelList.forEach((k) => {
        totalRow += k.length;
      });
      $(".sch-report-item-returned").text("Items returned (" + totalRow + ")");
    },
    disabledNextPage(value) {
      $(".sch-report-next-page").prop("disabled", value);
    },
    backToPage(that, index) {
      try {
        const byCustomer = that.txnSaleChannelList.at(index);
        that.saleChannelList = byCustomer;
        // that.refreshGridData(customer)
        window.console.log("that.txnSaleChannelList[index]", byCustomer);
      } catch (e) {
        window.console.log("ERROR on backToPage", index);
      }
    },
    async onSearch() {
      this.txnSaleChannelList = [];
      this.loadPage(this);
      this.paging = {};
      // await this.loadTotalRevenue();
      this.loadSaleChannelReport();
    },
    async loadSaleChannelReport() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.saleChannelList = [];
          const saleChannel = this.saleChannel || {};
          this.params = {
            start: this.startDate,
            end: this.endDate,
            key: this.paging,
            id: saleChannel.id || "",
            pattern: "sale#channel",
          };
          this.showLoading = true;
          this.disabledNextPage(true);
          discountItemHandler.saleChannelReport(this.params).then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoading = false;
              const responseData = res.data.data || [];
              const total = res.data.total || 0;
              this.showLoading = false;
              this.saleChannelList = responseData;
              this.paging = res.data.key;
              this.txnSaleChannelList.push(responseData);

              this.toalSaleChannelRecordPerPage = this.saleChannelList.length;
              this.totalRecordSaleChannel = total;

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
    async loadSaleChannel() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = true;
          saleChannelHandler.get().then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoading = false;
              this.saleChannels = res.data.data;
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
    this.loadSaleChannel();
    this.loadPage(this);
    this.itemRetuned(this);
    this.disabledNextPage(true);
  },
  computed: {},
};
</script>
<style scoped></style>
