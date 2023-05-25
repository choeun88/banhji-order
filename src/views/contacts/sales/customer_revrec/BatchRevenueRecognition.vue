<template>
  <v-row>
    <v-col sm="12" cols="12" class="grayBg px-6">
      <v-card color="white" class="pa-3 no_border" min-height="564" elevation="0">
        <v-row class="">
          <v-col sm="9" cols="12" class="py-0">
            <h2 class="mb-0 font_020">{{ $t("batch_revenue_recognition") }}</h2>
            <p class="mb-0">{{ $t("batch_revenue_recognition_dec") }}</p>
          </v-col>
        </v-row>
        <v-row class="">
          <v-col sm="3" cols="12" class="py-0">
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

          <v-col sm="3" cols="12" class="py-0">
            <label class="label">{{ $t("from") }}</label>
            <app-datepicker :initialDate="startDate" @emitDate="startDate = $event" />
          </v-col>

          <v-col sm="3" cols="12" class="py-0">
            <label class="label">{{ $t("to") }}</label>
            <app-datepicker :initialDate="endDate" @emitDate="endDate = $event" />
          </v-col>
          <v-col sm="3" cols="12" class="py-0 mt-5">
            <v-btn
              @click="onSearch('Batch Revenue Recognition')"
              :loading="loadingSearch"
              class="btn_search"
              style="background-color: rgb(237, 241, 245)"
            >
              <i class="b-search" style="font-size: 18px; color: #fff !important" />
            </v-btn>
            <v-btn
              link
              route
              class="text-upper ml-3 white--text"
              to="batch_revenue_recognition"
              color="primary"
            >
              {{ $t("new_batch") }}
            </v-btn>
          </v-col>
        </v-row>

        <v-row class="mt-0">
          <v-col sm="12" cols="12" class="pt-0">
            <template>
              <LoadingMe
                :isLoading="showLoading"
                :fullPage="false"
                type="loading"
                :myLoading="true"
              >
              </LoadingMe>
              <kendo-datasource
                ref="gridBatchRegDS"
                :data="batchRecognitionList"
                :server-paging="false"
              />
              <kendo-grid
                id="gridbatchReg"
                class="grid-function"
                :data-source-ref="'gridBatchRegDS'"
                :editable="false"
                :groupable="false"
                :column-menu="true"
                :noRecords="true"
                :resizable="true"
                :sortable="true"
                :excel-file-name="'Batch Revenue recognition.xlsx'"
                :excel-filterable="true"
                :excel-all-pages="true"
                :toolbar="['excel']"
                :scrollable-virtual="true"
              >
                <kendo-grid-column
                  :field="'date'"
                  :title="$t('date')"
                  :width="200"
                  :sortable="true"
                  :resizable="true"
                  :group-footer-template="$t('total')"
                  :template="dateFormat"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <!-- <kendo-grid-column
                  :field="'name'"
                  :attributes="{ class: 'tb_name_td' }"
                  :title="$t('name')"
                  :width="200"
                  :sortable="false"
                  :filterable-multi="true"
                  :filterable-search="true"
                  :template="'<span>#=name#</span>'"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                /> -->
                <kendo-grid-column
                  :field="$t('transactionType')"
                  :title="$t('type')"
                  :width="200"
                  :hidden="true"
                  :sortable="false"
                  :template="transactionTypeTemplate"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'referenceNo'"
                  :title="$t('number')"
                  :width="150"
                  :sortable="true"
                  :template="referenceTemplate"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5, color: green !important',
                  }"
                />
                <kendo-grid-column
                  :field="$t('journalNote')"
                  :title="$t('description')"
                  :width="200"
                  :hidden="false"
                  :sortable="false"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'exchangeSubTotal'"
                  :title="$t('sub_total')"
                  :width="200"
                  :group-footer-template="'#= kendo.toString(sum, `n2`)#'"
                  :aggregates="['sum']"
                  :footerAttributes="{ style: 'text-align: right;' }"
                  :attributes="{ style: 'text-align: right; ' }"
                  :hidden="true"
                  :template="'<span>#=kendo.toString(exchangeSubTotal, decimalFormat)#</span>'"
                  :headerAttributes="{
                    style: 'text-align: right;background-color: #EDF1F5',
                  }"
                />
                <kendo-grid-column
                  :field="'exchangeDiscountTotal'"
                  :title="$t('discount')"
                  :width="200"
                  :group-footer-template="'#= kendo.toString(sum, `n2`)#'"
                  :aggregates="['sum']"
                  :footerAttributes="{ style: 'text-align: right;' }"
                  :attributes="{ style: 'text-align: right; ' }"
                  :hidden="true"
                  :template="'<span>#=kendo.toString(exchangeDiscountTotal, decimalFormat)#</span>'"
                  :headerAttributes="{
                    style: 'text-align: right;background-color: #EDF1F5',
                  }"
                />
                <kendo-grid-column
                  :field="'exchangeAmount'"
                  :title="$t('amount')"
                  :width="200"
                  :group-footer-template="'#= kendo.toString(sum, `n2`)#'"
                  :aggregates="['sum']"
                  :footerAttributes="{ style: 'text-align: right;' }"
                  :attributes="{ style: 'text-align: right; ' }"
                  :template="'<span>#=kendo.toString(exchangeAmount, decimalFormat)#</span>'"
                  :headerAttributes="{
                    style: 'text-align: right;background-color: #EDF1F5',
                  }"
                />
              </kendo-grid>
            </template>
          </v-col>
        </v-row>
        <div style="overflow: auto" class="batch-recog-pager"></div>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import InvoiceModel from "@/scripts/invoice/model/Invoice";
import { i18n } from "@/i18n";
const billingHandler = require("@/scripts/invoice/handler/billingHandler");
import kendo from "@progress/kendo-ui";
import LinkTemplate from "@/components/kendo_templates/LinkTemplate";
const invoiceModel = new InvoiceModel({});
const $ = require("jquery");
const SECOND_DELAY = 1000;
import JSZip from "jszip";

window.JSZip = JSZip;

export default {
  name: "DepositTransaction",
  components: {
    "app-datepicker": () => import(`@/components/custom_templates/DatePickerComponent`),
    LoadingMe: () => import(`@/components/Loading`),
  },
  data: () => ({
    loading: false,
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

    sort: { field: "referenceNo", dir: "ASC" },
    aggregateDefinition: [
      { field: "exchangeAmount", aggregate: "sum" },
      { field: "exchangeSubTotal", aggregate: "sum" },
      { field: "exchangeDiscountTotal", aggregate: "sum" },
    ],
    mDateSorter: "Today",
    showLoading: false,
    batchRecognitionList: [],
    params: {},
    paging: {},
    txnbatchRecognitionList: [],
    disabledMe: true,
    action: "",
    invoice: invoiceModel,
  }),
  methods: {
    transactionTypeTemplate(data) {
      return `<span> ${i18n.t(data.transactionType)}</span>`;
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
      // if (filter.length > 2) {
      //
      // }
    },
    onSearch(type) {
      this.action = type;
      this.txnbatchRecognitionList = [];
      this.loadPage(this);
      this.paging = {};
      this.searchTransaction(type);
    },
    async loadPage(that) {
      $(".batch-recog-pager").html(`
                <label class="label batch-recog--item-returned">0</label>
                <div style="display: flex; flex-direction: 'row'">
                    <button class="batch-recog--next-page" title="previous" style="width: 24px; font-size: 19px;"> < </button>
                    <ul class="batch-recog--page-number" style="display: flex;list-style: none; padding-left: 0px;">
                        <li style="padding: 6px;"  data-page="1" class="batch-recog--page-link text-bold-link" >1</li>
                    </ul>
                    <button class="batch-recog--next-page" title="next" style="width: 24px; font-size: 19px;"> > </button>
                </div>
            `);
      $(document).on("click", ".batch-recog--page-link", function () {
        const page = $(this).data("page");
        $(".batch-recog--page-link").removeClass("text-bold-link");
        $(this).addClass("text-bold-link");
        that.backToPage(that, page - 1);
        window.console.log(page - 1);
      });
      // $(document).on('click', '.batch-recog--next-page', function () {
      $(".batch-recog--next-page").click(function () {
        const page_number = $(this)
          .parent()
          .children(".batch-recog--page-number")
          .find("li")
          .last()
          .data("page");
        // window.console.log("bycus-page_number", page_number);
        const isPrevious = $(this).attr("title");
        if (isPrevious == "previous") {
          const currectpage = $(".text-bold-link").data("page");

          if (currectpage == 1) {
            return;
          }
          $(".batch-recog--page-link").removeClass("text-bold-link");
          $(`.batch-recog--page-link:eq(${currectpage - 1})`).addClass("text-bold-link");
          that.backToPage(that, currectpage - 2);
          window.console.log("this currectpage back", currectpage - 2);
        } else {
          $(".batch-recog--page-link").removeClass("text-bold-link");
          that.params = {
            search: that.search || "",
            type: that.action,
            start: that.startDate,
            end: that.endDate,
            key: that.paging,
          };
          window.console.log("params", that.params);
          that.searchTransaction(that.action);
          $(this)
            .parent()
            .children(".batch-recog--page-number")
            .append(
              `<li class="batch-recog--page-link text-bold-link" style="padding: 6px;" data-page="${
                page_number + 1
              }">${page_number + 1}</li>`
            );
        }
        window.console.log("this", page_number + 1);
      });
    },
    itemRetuned(that) {
      let totalRow = 0;
      that.txnbatchRecognitionList.forEach((k) => {
        totalRow += k.length;
      });
      $(".batch-recog--item-returned").text("Items returned (" + totalRow + ")");
    },
    disabledNextPage(value) {
      $(".batch-recog--next-page").prop("disabled", value);
    },
    backToPage(that, index) {
      try {
        window.console.log(
          "Length of txnbatchRecognitionList",
          that.txnbatchRecognitionList.length
        );
        const byCustomer = that.txnbatchRecognitionList.at(index);
        that.batchRecognitionList = byCustomer;
        // that.refreshGridData(customer)
        window.console.log("that.txnbatchRecognitionList[index]", byCustomer);
      } catch (e) {
        window.console.log("ERROR on backToPage", index);
      }
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
    dateFormat(dataItem) {
      return kendo.toString(
        new Date(dataItem.date),
        `${this.invoice.dateFormat} h:mm tt`
      );
    },
    referenceTemplate(data) {
      let url = `sale_deposit_view/${data.id}`;
      if (data.type === "Revenue Recognition") {
        url = `revenue_recognition_view/${data.id}`;
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
    invoiceTemplate(data) {
      let url = `invoice_view/${data.nrdId}`;
      if (data.type === "Revenue Recognition") {
        url = `invoice_view/${data.nrdId}-nrd`;
      }
      let args = {
        text: data.nrdRef,
        url: url,
        data: data,
      };
      return {
        template: LinkTemplate,
        templateArgs: args,
      };
    },
    async searchTransaction(type) {
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
              this.batchRecognitionList = responseData;
              this.paging = res.data.key;
              window.console.log("key", res.data.key);
              this.txnbatchRecognitionList.push(responseData);

              if (Object.keys(this.paging).length > 0) {
                this.disabledNextPage(false);
              } else {
                this.disabledNextPage(true);
              }
              this.itemRetuned(this);
              // window.console.log("txnbatchRecognitionList", this.txnbatchRecognitionList, res.data.key);
            } else {
              this.loadingSearch = false;
              this.showLoading = false;
            }
          });
        }, 10);
      });
    },
  },
  async mounted() {
    // this.group = [
    //   {
    //     field: "name",
    //     aggregates: this.aggregateDefinition,
    //   },
    // ];
    this.loadPage(this);
    this.itemRetuned(this);
    this.disabledNextPage(true);
    window.console.log("Me");
  },
};
</script>
<style scoped></style>
