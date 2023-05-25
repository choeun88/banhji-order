<template>
  <v-row>
    <v-col sm="12" cols="12" class="grayBg px-6">
      <v-card color="white" class="pa-3 no_border" elevation="0">
        <v-row>
          <v-col sm="12" cols="12" class="py-0">
            <h2 class="mb-1 font_020">{{ $t("late_fee_report") }}</h2>
            <p class="mb-0">{{ $t("late_fee_report_dec") }}</p>
          </v-col>
        </v-row>

        <v-row>
          <v-col sm="9" cols="12" class="py-0">
            <date-search
              :initStartDate="startDate"
              @emitStartDate="startDate = $event"
              :initEndDate="endDate"
              @emitEndDate="endDate = $event"
            />
          </v-col>

          <v-col sm="1" cols="12" class="py-0 mt-6">
            <v-btn
              class="btn_search"
              :loading="loadingSearch"
              style="background-color: rgb(237, 241, 245)"
              @click="onSearch('Cash Receipt')"
            >
              <i class="b-search" style="font-size: 18px; color: #fff !important" />
            </v-btn>
          </v-col>
          <!-- <v-col sm="2" cols="12" class="py-0 text-right">
                      <v-btn icon color="black" class="bg-none float-right ">
                        <v-icon class="font_34">fa fa-file-excel</v-icon>
                      </v-btn>
                      <v-btn icon color="black" class="bg-none float-right ml-2">
                        <v-icon class="font_34">fa fa-print</v-icon>
                      </v-btn>
                    </v-col> -->
        </v-row>

        <v-row class="mt-0">
          <!-- <v-switch
            v-model="switchModel"
            @change="onSwicthChange"
            class="mt-1 ml-1 mr-0"
            color="primary"
            :label="switchModel == 0 ? 'Overdue' : 'All'"
          /> -->
          <!-- <v-col sm="4" cols="12" class="pt-0">
            <v-card
              outlined
              dense
              class="pa-3 rounded-4 no_border white--text"
              color="third"
              height="60px"
            >
              <h3 class="text-left flex-1 font_13 text-uppercase">
                {{ $t("invoices_to_be_collected") }}
              </h3>
              <h3 class="text-right flex-1 font_20">
                {{ collectedInvoice }}
              </h3>
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
              <h3 class="text-left flex-1 font_12 text-uppercase">
                {{ $t("total_collected_amount") }}
              </h3>
              <h3 class="text-right flex-1 font_20">
                {{ numberFormat(collectedAmount) }}
              </h3>
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
              <h3 class="text-left flex-1 font_12 text-uppercase">
                {{ $t("overdue_invoice_collected") }}
              </h3>
              <h3 class="text-right flex-1 font_20">
                {{ collectedInvoiceOverDue }}
              </h3>
            </v-card>
          </v-col> -->
        </v-row>
        <v-row>
          <v-col sm="12" cols="12" class="py-0">
            <gridFullScreen>
              <template>
                <LoadingMe
                  :isLoading="showLoading"
                  :fullPage="false"
                  :myLoading="true"
                  type="loading"
                  :alertMessage="loadingAlert"
                  :color="loadingColorAlert"
                  :alertText="loadingTextAlert"
                />
                <kendo-datasource
                  ref="lateFeeReportDS"
                  :type="'JSON'"
                  :data="transactionLateFee"
                  :group="group"
                />
                <kendo-grid
                  id="gridLateFeeReport"
                  class="grid-function"
                  :data-source-ref="'lateFeeReportDS'"
                  :editable="false"
                  :column-menu="true"
                  :resizable="true"
                  :noRecords="true"
                  :sortable="true"
                  :filterable="true"
                  :excel-file-name="'lateFeeReport.xlsx'"
                  :excel-filterable="true"
                  :excel-all-pages="true"
                  :toolbar="['excel']"
                  :scrollable-virtual="true"
                >
                  <kendo-grid-column
                    :field="'transactionDate'"
                    :title="$t('date')"
                    :group-footer-template="$t('total')"
                    :minWidth="200"
                    :template="transactionDate"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'itemName'"
                    :attributes="{ class: 'tb_name_td' }"
                    :title="$t('item')"
                    :width="200"
                    :hidden="true"
                    :group-header-template="'#=value#'"
                    :template="'<span>#=itemName || ``#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'referenceNo'"
                    :title="$t('reference_no')"
                    :width="150"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5, color: green !important',
                    }"
                  />
                  <kendo-grid-column
                    :field="'name'"
                    :title="$t('name')"
                    :width="200"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5, color: green !important',
                    }"
                  />
                  <kendo-grid-column
                    :field="'amount'"
                    :title="$t('amount')"
                    :width="200"
                    :attributes="{ style: 'text-align: right; ' }"
                    :template="'<span>#= kendo.toString(amount, decimalFormat)#</span>'"
                    :aggregates="['sum']"
                    :footerAttributes="{
                      style: 'text-align: right;font-weight: bold;',
                    }"
                    :group-footer-template="'#= kendo.toString(sum, `n2`)#'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                </kendo-grid>
              </template>
              <div style="overflow: auto" class="late-fee-report"></div>
            </gridFullScreen>
          </v-col>
        </v-row>

        <!-- <div style="overflow: auto" class="late-fee-report-item"></div> -->
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import LinkTemplate from "@/components/kendo_templates/LinkTemplate";
import kendo from "@progress/kendo-ui";
import ItemLineModel from "@/scripts/cash-receipt/model/ItemLine";

const billingReportHandler = require("@/scripts/invoice/handler/billingReportHandler");
const itemLineModel = new ItemLineModel({});
const $ = kendo.jQuery;
import JSZip from "jszip";

window.JSZip = JSZip;
export default {
  name: "CashReceiptByItem",
  data: () => ({
    loadingSearch: false,
    startDate: "",
    endDate: "",
    group: { field: "itemName" },
    transactionLateFee: [],
    dateFormat: itemLineModel.dateFormat,
    showLoading: false,
    loadingAlert: false,
    loadingColorAlert: "",
    loadingTextAlert: "",
    collectedAmount: 0,
    collectedInvoice: 0,
    collectedInvoiceOverDue: 0,
    decimalFormat: "n2",
    params: {},
    paging: {},
    txnlateFees: [],
    aggregateDefinition: [{ field: "amount", aggregate: "sum" }],
    disabledMe: true,
    action: "",
    // switchModel: 0,
  }),
  components: {
    "date-search": () => import(`@/components/custom_templates/DateSearch`),
    LoadingMe: () => import(`@/components/Loading`),
    gridFullScreen: () => import("@/components/gridFullScreen"),
  },
  methods: {
    // onSwicthChange() {
    //   window.console.log("swicth", this.switchModel);
    // },
    numberFormat(value) {
      return kendo.toString(value, `${this.decimalFormat}`);
    },
    transactionDate(dataItem) {
      return kendo.toString(new Date(dataItem.transactionDate), `${this.dateFormat}`);
    },
    goToConvert() {},
    source(dataItem) {
      if (dataItem.hasOwnProperty("paymentOption")) {
        if (dataItem.paymentOption.hasOwnProperty("name")) {
          return dataItem.paymentOption.name;
        }
      }
      return "";
    },
    rowNumberTmpl(dataItem) {
      let ds = this.$refs.lateFeeReportDS.kendoWidget(),
        index = ds.indexOf(dataItem);
      return index + 1;
    },
    receiptRefTemplate(data) {
      let url = `cash_receipt/${data.id}`;
      let args = {
        text: data.receiptReferenceNo,
        url: url,
        data: data,
      };
      return {
        template: LinkTemplate,
        templateArgs: args,
      };
    },
    invoiceRefTemplate(data) {
      let url = `invoice_view/${data.txnId}`;
      let args = {
        text: data.txnReferenceNo,
        url: url,
        data: data,
      };
      return {
        template: LinkTemplate,
        templateArgs: args,
      };
    },
    async searchTransaction() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = true;
          this.loadingSearch = true;
          const startDate = this.startDate;
          const endDate = this.endDate;
          this.params = {
            start: startDate,
            end: endDate,
            key: this.paging,
          };
          this.disabledNextPage(true);
          billingReportHandler.lateFeeReport(this.params).then((res) => {
            if (res.data.statusCode === 200) {
              this.loadingSearch = false;
              this.showLoading = false;
              window.console.log("im search", res);
              const responseData = res.data.data || [];
              this.transactionLateFee = responseData;
              this.paging = res.data.key;
              window.console.log("key", res.data.key);
              this.txnlateFees.push(responseData);

              if (Object.keys(this.paging).length > 0) {
                this.disabledNextPage(false);
              } else {
                this.disabledNextPage(true);
              }
              this.itemRetuned(this);
              window.console.log("txnlateFees", this.txnlateFees, res.data.key);
            } else {
              this.loadingSearch = false;
              this.showLoading = false;
            }
          });
        }, 10);
      });
    },
    status(dataItem) {
      if (dataItem) {
        if (dataItem.hasOwnProperty("status")) {
          const status = dataItem.status;
          let statusText = "";
          switch (status) {
            case 1:
              statusText = "OPEN";
              break;
            case 2:
              statusText = "Partially Paid";
              break;
            case 4:
              statusText = "VOID";
              break;
            case 3:
              statusText = "PAID";
              break;
          }
          return statusText;
        }
      }
      return "";
    },
    onSearch(type) {
      this.action = type;
      this.txnlateFees = [];
      this.loadPage(this);
      this.paging = {};
      this.searchTransaction();
      // this.transactionSummarize(type);
    },
    async loadPage(that) {
      $(".late-fee-report").html(`
                <label class="label late-fee-report-returned">0</label>
                <div style="display: flex; flex-direction: 'row'">
                    <button class="cash-receipt-next-page" title="previous" style="width: 24px; font-size: 19px;"> < </button>
                    <ul class="late-fee-report-page-number" style="display: flex;list-style: none; padding-left: 0px;">
                        <li style="padding: 6px;"  data-page="1" class="late-fee-report-page-link text-bold-link" >1</li>
                    </ul>
                    <button class="late-fee-report-next-page" title="next" style="width: 24px; font-size: 19px;"> > </button>
                </div>
            `);
      $(document).on("click", ".late-fee-report-page-link", function () {
        const page = $(this).data("page");
        $(".late-fee-report-page-link").removeClass("text-bold-link");
        $(this).addClass("text-bold-link");
        that.backToPage(that, page - 1);
        window.console.log(page - 1);
      });
      // $(document).on('click', '.late-fee-report-next-page', function () {
      $(".late-fee-report-next-page").click(function () {
        const page_number = $(this)
          .parent()
          .children(".late-fee-report-page-number")
          .find("li")
          .last()
          .data("page");
        window.console.log("late-fee-report-page_number", page_number);
        const isPrevious = $(this).attr("title");
        if (isPrevious == "previous") {
          const currectpage = $(".text-bold-link").data("page");

          if (currectpage == 1) {
            return;
          }
          $(".late-fee-report-page-link").removeClass("text-bold-link");
          $(`.late-fee-report-page-link:eq(${currectpage - 1})`).addClass(
            "text-bold-link"
          );
          that.backToPage(that, currectpage - 2);
          window.console.log("this currectpage back", currectpage - 2);
        } else {
          $(".late-fee-report-page-link").removeClass("text-bold-link");
          window.console.log("params", that.params);
          that.searchTransaction();
          $(this)
            .parent()
            .children(".late-fee-report-page-number")
            .append(
              `<li class="late-fee-report-page-link text-bold-link" style="padding: 6px;" data-page="${
                page_number + 1
              }">${page_number + 1}</li>`
            );
        }
        window.console.log("this", page_number + 1);
      });
    },
    itemRetuned(that) {
      let totalRow = 0;
      that.txnlateFees.forEach((k) => {
        totalRow += k.length;
      });
      $(".late-fee-report-returned").text("Items returned (" + totalRow + ")");
    },
    disabledNextPage(value) {
      $(".late-fee-report-next-page").prop("disabled", value);
    },
    backToPage(that, index) {
      try {
        window.console.log("Length of txnlateFees", that.txnlateFees.length);
        const byCustomer = that.txnlateFees.at(index);
        that.transactionLateFee = byCustomer;
        // that.refreshGridData(customer)
        window.console.log("that.txnlateFees[index]", byCustomer);
      } catch (e) {
        window.console.log("ERROR on backToPage", index);
      }
    },
  },
  computed: {},
  async mounted() {
    this.group = [
      {
        field: "itemName",
        aggregates: this.aggregateDefinition,
      },
    ];
    this.loadPage(this);
    this.itemRetuned(this);
    this.disabledNextPage(true);
  },
};
</script>
<style scoped>
.k-chart {
  height: 180px;
}

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
