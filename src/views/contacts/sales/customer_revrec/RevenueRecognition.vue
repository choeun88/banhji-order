<template>
  <v-row>
    <v-col sm="12" cols="12" class="grayBg px-6">
      <v-card color="white" class="pa-3 no_border" min-height="564" elevation="0">
        <v-row class="">
          <v-col sm="9" cols="12" class="py-0">
            <h2 class="mb-0 font_020">{{ $t("revenue_recognition") }}</h2>
            <p class="mb-2">{{ $t("revenue_recognition_dec") }}</p>
          </v-col>

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
              :loading="loading"
              @filterchange="onFilterChange"
            >
            </dropdownlist>
          </v-col>
          <v-col sm="5" cols="12" class="pt-0 mt-5">
            <div>
              <v-btn
                @click="onSearch('Revenue Recognition')"
                :loading="loadingSearch"
                class="btn_search"
                style="background-color: rgb(237, 241, 245)"
              >
                <i class="b-search" style="font-size: 18px; color: #fff !important" />
              </v-btn>
              <v-btn
                link
                route
                class="text-upper mr-0 ml-3 white--text"
                to="revenue_recognition"
                color="primary"
              >
                {{ $t("new_revenue_recognition") }}
              </v-btn>
            </div>
          </v-col>
        </v-row>

        <v-row class="mt-0">
          <v-col sm="12" cols="12" class="pt-0">
            <v-btn
              :loading="laodExcel"
              color="primary"
              style="height: 28px !important; border-radius: 2px !important"
              class="text--white capitalize"
              @click="excelExportBtn"
              >Export to Excel</v-btn
            >
            <template>
              <LoadingMe
                :isLoading="showLoading"
                :fullPage="false"
                type="loading"
                :myLoading="true"
              >
              </LoadingMe>
              <kendo-datasource
                ref="gridNRDDepositDS"
                :data="nrdDepositList"
                :group="group"
                :server-paging="false"
              />
              <kendo-grid
                id="gridNRDDeposit"
                class="grid-function"
                :data-source-ref="'gridNRDDepositDS'"
                :editable="false"
                :groupable="true"
                :column-menu="true"
                :noRecords="true"
                :resizable="true"
                :sortable="true"
                :excel-file-name="'Revenue recognition.xlsx'"
                :excel-filterable="true"
                :excel-all-pages="true"
                :excel-export="excelExport"
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
                <kendo-grid-column
                  :field="'name'"
                  :attributes="{ class: 'tb_name_td' }"
                  :title="$t('name')"
                  :width="200"
                  :sortable="false"
                  :filterable-multi="true"
                  :filterable-search="true"
                  :groupHeaderTemplate="'#=value#'"
                  :template="'<span>#=name#</span>'"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
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
                  :title="$t('num')"
                  :width="150"
                  :sortable="true"
                  :template="referenceTemplate"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5, color: green !important',
                  }"
                />
                <kendo-grid-column
                  :field="'nrdRef'"
                  :title="$t('nrd_refnum')"
                  :width="160"
                  :sortable="true"
                  :template="invoiceTemplate"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5, color: green !important',
                  }"
                />
                <kendo-grid-column
                  :field="'batch'"
                  :title="$t('batch_num')"
                  :width="160"
                  :sortable="true"
                  :template="bacthTemplate"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5, color: green !important',
                  }"
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
                <kendo-grid-column
                  :field="'status'"
                  :title="$t('status')"
                  :width="180"
                  :sortable="false"
                  :hidden="true"
                  :filterable="{ multi: true }"
                  :template="status"
                  :attributes="{
                    class: 'tb_name_td',
                    style: 'text-align: center',
                  }"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
              </kendo-grid>
            </template>
          </v-col>
        </v-row>
        <div style="overflow: auto" class="deposit-nrd-pager"></div>
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
import { DropDownList } from "@progress/kendo-vue-dropdowns";
const defaultItem = { ["numberName"]: "Select customer...", ["id"]: null };
const customerHandler = require("@/scripts/customerHandler");
const emptyItem = { ["numberName"]: "loading ..." };
const invoiceModel = new InvoiceModel({});
const $ = require("jquery");
const SECOND_DELAY = 1000;
import JSZip from "jszip";
import { exportExelFormat } from "@/utils";
window.JSZip = JSZip;

export default {
  name: "DepositTransaction",
  components: {
    "app-datepicker": () => import(`@/components/custom_templates/DatePickerComponent`),
    LoadingMe: () => import(`@/components/Loading`),
    dropdownlist: DropDownList,
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
    group: { field: "name" },
    sort: { field: "referenceNo", dir: "ASC" },
    aggregateDefinition: [
      { field: "exchangeAmount", aggregate: "sum" },
      { field: "exchangeSubTotal", aggregate: "sum" },
      { field: "exchangeDiscountTotal", aggregate: "sum" },
    ],
    mDateSorter: "Today",
    showLoading: false,
    nrdDepositList: [],
    params: {},
    paging: {},
    txnNrdDeposits: [],
    disabledMe: true,
    action: "",

    customerList: [],
    customer: {},
    textField: "numberName",
    defaultItem: defaultItem,
    dataItemKey: "id",
    filter: "",
    cusBaseUrl: customerHandler.search(),
    invoice: invoiceModel,
    laodExcel: false,
  }),
  methods: {
    async excelExportBtn() {
      let dataExportExcel = [];
      this.params = {
        search: "",
        type: "Revenue Recognition",
        start: this.startDate,
        end: this.endDate,
        key: {},
      };

      let i = 0;
      this.laodExcel = true;
      this.stopped = false;
      try {
        while (!this.stopped) {
          i++;
          let getAll = await billingHandler.list(this.params);
          this.params.key = getAll.data.key;
          dataExportExcel = dataExportExcel.concat(getAll.data.data);
          if (Object.keys(getAll.data.key).length == 0 || getAll.data.key == "") {
            this.stopped = true;
            this.transactions = dataExportExcel;
            setTimeout(() => {
              const grid = kendo.jQuery("#gridNRDDeposit").data("kendoGrid");
              grid.saveAsExcel();
            }, 1000);
            setTimeout(() => {
              this.laodExcel = false;
              const byCustomer = this.txnByCustomers.at(this.pageIndex);
              this.transactions = byCustomer;
              dataExportExcel = [];
            }, 2000);
          }
          if (i > 100) this.stopped = true;
        }
      } catch (e) {
        this.stopped = true;
        window.console.log(e);
      }
    },
    excelExport: function (e) {
      let filterExcel = {
        dataFrom: this.startDate,
        dateTo: this.endDate,
        title: i18n.t("revenue_recognition"),
        type: "",
      };
      e.workbook.sheets[0].title = i18n.t("revenue_recognition");
      exportExelFormat(e, filterExcel);
    },
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
    requestData(skip, filter, baseUrl) {
      const url = baseUrl + `?filter=${filter}`;
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
      if (value && value["numberName"] === emptyItem["numberName"]) {
        return;
      }
      this.customer = value;
    },
    onSearch(type) {
      this.action = type;
      this.txnNrdDeposits = [];
      this.loadPage(this);
      this.paging = {};
      this.searchTransaction(type);
    },
    async loadPage(that) {
      $(".deposit-nrd-pager").html(`
                <label class="label deposit-nrd-item-returned">0</label>
                <div style="display: flex; flex-direction: 'row'">
                    <button class="deposit-nrd-next-page" title="previous" style="width: 24px; font-size: 19px;"> < </button>
                    <ul class="deposit-nrd-page-number" style="display: flex;list-style: none; padding-left: 0px;">
                        <li style="padding: 6px;"  data-page="1" class="deposit-nrd-page-link text-bold-link" >1</li>
                    </ul>
                    <button class="deposit-nrd-next-page" title="next" style="width: 24px; font-size: 19px;"> > </button>
                </div>
            `);
      $(document).on("click", ".deposit-nrd-page-link", function () {
        const page = $(this).data("page");
        $(".deposit-nrd-page-link").removeClass("text-bold-link");
        $(this).addClass("text-bold-link");
        that.backToPage(that, page - 1);
        window.console.log(page - 1);
      });
      // $(document).on('click', '.deposit-nrd-next-page', function () {
      $(".deposit-nrd-next-page").click(function () {
        const page_number = $(this)
          .parent()
          .children(".deposit-nrd-page-number")
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
          $(".deposit-nrd-page-link").removeClass("text-bold-link");
          $(`.deposit-nrd-page-link:eq(${currectpage - 1})`).addClass("text-bold-link");
          that.backToPage(that, currectpage - 2);
          window.console.log("this currectpage back", currectpage - 2);
        } else {
          $(".deposit-nrd-page-link").removeClass("text-bold-link");
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
            .children(".deposit-nrd-page-number")
            .append(
              `<li class="deposit-nrd-page-link text-bold-link" style="padding: 6px;" data-page="${
                page_number + 1
              }">${page_number + 1}</li>`
            );
        }
        window.console.log("this", page_number + 1);
      });
    },
    itemRetuned(that) {
      let totalRow = 0;
      that.txnNrdDeposits.forEach((k) => {
        totalRow += k.length;
      });
      $(".deposit-nrd-item-returned").text("Items returned (" + totalRow + ")");
    },
    disabledNextPage(value) {
      $(".deposit-nrd-next-page").prop("disabled", value);
    },
    backToPage(that, index) {
      try {
        window.console.log("Length of txnNrdDeposits", that.txnNrdDeposits.length);
        const byCustomer = that.txnNrdDeposits.at(index);
        that.nrdDepositList = byCustomer;
        // that.refreshGridData(customer)
        window.console.log("that.txnNrdDeposits[index]", byCustomer);
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
    status(dataItem) {
      let status = "",
        type = dataItem.type || "";
      switch (dataItem.status) {
        case 1:
          status = "Open";
          break;
        case 2:
          if (type === "Sale Lead" || type === "Sale Quote" || type === "Sale Order") {
            status = "Applied";
          } else {
            status = "Partially Paid";
          }
          break;
        case 3:
          status = "Paid";
          break;
        case 4:
          status = "Void";
          break;
      }
      return status;
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
    bacthTemplate(data) {
      const batch = data.batch || {};
      return batch.referenceNo || "";
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
            id: this.customer.id || "",
            isSummarize: 0,
          };
          this.disabledNextPage(true);
          billingHandler.list(this.params).then((res) => {
            if (res.data.statusCode === 200) {
              this.loadingSearch = false;
              this.showLoading = false;
              window.console.log("im search", res);
              const responseData = res.data.data || [];
              this.nrdDepositList = responseData;
              this.paging = res.data.key;
              window.console.log("key", res.data.key);
              this.txnNrdDeposits.push(responseData);

              if (Object.keys(this.paging).length > 0) {
                this.disabledNextPage(false);
              } else {
                this.disabledNextPage(true);
              }
              this.itemRetuned(this);
              // window.console.log("txnNrdDeposits", this.txnNrdDeposits, res.data.key);
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
    this.group = [
      {
        field: "name",
        aggregates: this.aggregateDefinition,
      },
    ];
    this.requestData(0, this.filter, this.cusBaseUrl);
    this.loadPage(this);
    this.itemRetuned(this);
    this.disabledNextPage(true);
    window.console.log("Me");
  },
};
</script>
<style scoped></style>
