<template>
  <v-row>
    <v-col sm="12" cols="12" class="grayBg px-6">
      <v-card color="white" class="pa-3 no_border" elevation="0">
        <h2 class="mb-0 font_020">{{ $t("report_for_taxes_on_sale") }}</h2>
        <p class="mb-1">{{ $t("report_for_taxes_on_sale_desc") }}</p>
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

          <v-col sm="4" cols="12" class="py-0">
            <label class="label">{{ $t("from") }}</label>
            <app-datepicker :initialDate="startDate" @emitDate="startDate = $event" />
          </v-col>

          <v-col sm="4" cols="12" class="py-0">
            <label class="label">{{ $t("to") }}</label>
            <app-datepicker :initialDate="endDate" @emitDate="endDate = $event" />
          </v-col>
          <v-col sm="4" cols="12" class="pt-0">
            <label class="label mb-0">{{ $t("tax_type") }}</label>
            <v-select
              class="mt-1"
              :items="taxTypes"
              item-value="id"
              item-text="name"
              v-model="taxType"
              return-object
              clearable
              outlined
            />
          </v-col>
          <v-col sm="4" cols="12" class="pt-0">
            <label class="label mb-0">{{ $t("nature") }}</label>
            <v-select
              class="mt-1"
              :items="natures"
              item-value="id"
              item-text="name"
              v-model="nature"
              return-object
              clearable
              outlined
            />
          </v-col>
          <v-col sm="1" cols="1" class="pt-7">
            <v-btn color="primary white--text" @click="onSearch">
              <i class="b-search" style="font-size: 18px; color: #fff !important" />
            </v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col sm="12" cols="12" class="py-0">
            <gridFullScreen>
              <template>
                <kendo-datasource
                  ref="gridTransactionDS"
                  :type="'JSON'"
                  :data="customerSaleTaxList"
                  :group="group"
                  :server-paging="false"
                />
                <kendo-grid
                  id="gridTransaction"
                  class="grid-function"
                  :data-source-ref="'gridTransactionDS'"
                  :editable="false"
                  :column-menu="true"
                  :noRecords="true"
                  :resizable="true"
                  :hidden="true"
                  :sortable="true"
                  :groupable="true"
                  :toolbar="['excel']"
                  :excel-file-name="'CustomerSaleTax.xlsx'"
                  :excel-filterable="true"
                  :excel-all-pages="true"
                  :scrollable-virtual="true"
                >
                  <kendo-grid-column
                    :field="'transactionDate'"
                    :title="$t('date')"
                    :width="120"
                    :template="dateFormatTemplate"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'tax.type.name'"
                    :attributes="{ class: 'tb_name_td' }"
                    :title="$t('tax_type')"
                    :width="200"
                    :group-header-template="'#=value#'"
                    :hidden="true"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'tax.name'"
                    :title="$t('tax_name')"
                    :width="200"
                    :attributes="{ style: 'text-align: left; ' }"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />

                  <kendo-grid-column
                    :field="'type'"
                    :title="$t('type')"
                    :width="200"
                    :template="'<span>#=type#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'objName.name'"
                    :attributes="{ class: 'tb_name_td' }"
                    :title="$t('name')"
                    :width="200"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'referenceNo'"
                    :title="$t('reference_no')"
                    :width="180"
                    :template="referenceTemplate"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5, color: green !important',
                    }"
                  />
                  <kendo-grid-column
                    :field="'objName.nature'"
                    :title="$t('nature')"
                    :width="180"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5, color: green !important',
                    }"
                  />
                  <kendo-grid-column
                    :field="'xAmount'"
                    :title="$t('invoice_amount')"
                    :width="170"
                    :template="'<span>#=kendo.toString(xAmount, decimalFormat)#</span>'"
                    :headerAttributes="{
                      style: 'text-align: right;padding-right:35px;',
                    }"
                    :attributes="{
                      style: 'text-align: right;',
                    }"
                  />
                  <kendo-grid-column
                    :field="'xDiscount'"
                    :title="$t('discount')"
                    :width="170"
                    :headerAttributes="{
                      style: 'text-align: right;padding-right:35px;',
                    }"
                    :attributes="{
                      style: 'text-align: right;',
                    }"
                    :template="'<span>#=kendo.toString(xDiscount, decimalFormat)#</span>'"
                  />
                  <kendo-grid-column
                    :field="'xTaxAmount'"
                    :title="$t('tax_amount')"
                    :width="150"
                    :template="'<span>#=kendo.toString(xTaxAmount, decimalFormat)#</span>'"
                    :headerAttributes="{
                      style: 'text-align: right;padding-right:35px;',
                    }"
                    :attributes="{
                      style: 'text-align: right;',
                    }"
                  />
                  <kendo-grid-column
                    :field="'taxRate'"
                    :title="$t('tax_rate')"
                    :width="120"
                    :headerAttributes="{
                      style: 'text-align: right;padding-right:35px;',
                    }"
                    :attributes="{
                      style: 'text-align: right;',
                    }"
                    :template="'<span>#=kendo.toString(taxRate, decimalFormat)# %</span>'"
                  />
                </kendo-grid>
              </template>
            </gridFullScreen>
          </v-col>
        </v-row>
        <div style="overflow: auto" class="customer-sale-tax"></div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import kendo from "@progress/kendo-ui";
import LinkTemplate from "@/components/kendo_templates/LinkTemplate";
import { i18n } from "@/i18n";
const dashboardHandler = require("@/scripts/dashboard/customer/handler/dashboardHandler");
const settingsHandler = require("@/scripts/settingsHandler");
const otherHandler = require("@/scripts/otherHandler");
const $ = kendo.jQuery;
import JSZip from "jszip";

window.JSZip = JSZip;
export default {
  name: "SaleTaxTransaction",
  components: {
    LoadingMe: () => import(`@/components/Loading`),
    "app-datepicker": () => import(`@/components/custom_templates/DatePickerComponent`),
    gridFullScreen: () => import("@/components/gridFullScreen"),
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
    // transactions: [],
    saleFormContent: {},
    isLoaded: false,
    group: { field: "tax.type.name" },

    txnCustomerSaleTaxList: [],
    customerSaleTaxList: [],
    totalICustomerSaleTax: 0,
    toalCustomerSaleTaxPerPage: 0,
    paging: {},
    action: "",
    params: {},
    taxTypes: [],
    taxType: {},
    natures: [],
    nature: {},
  }),
  methods: {
    dateFormatTemplate(dataItem) {
      return kendo.toString(new Date(dataItem.transactionDate), `${dataItem.dateFormat}`);
    },
    taxNameTemplate(dataItem) {
      const tax = dataItem.tax || {};
      return `<span>${tax.name || ``}</span>`;
    },
    taxTypeTemplate(dataItem) {
      const tax = dataItem.tax || {};
      window.console.log("taxTypeTemplate", tax);
      const taxType = tax.type || {};
      return `<span>${taxType.name || ``}</span>`;
    },
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
    numberFormat(value) {
      return kendo.toString(value, `n${this.saleFormContent.decimal}`);
    },
    referenceTemplate(data) {
      let url = "";
      if (data.type === "Invoice") {
        url = `invoice_view/${data.id}`;
      } else if (data.type === "Sale Deposit") {
        url = `sale_deposit_view/${data.id}`;
      } else if (data.type === "Purchase") {
        url = `credit_purchase_view/${data.id}`;
      } else if (data.type === "Sale Quote") {
        url = `sale_quote_view/${data.id}`;
      } else if (data.type === "Cash Receipt") {
        url = `cash_receipt_view/${data.id}`;
      } else if (data.type === "Sale Order") {
        url = `sale_order_view/${data.id}`;
      } else if (data.type === "Purchase Deposit") {
        url = `purchase_deposit_view/${data.id}`;
      } else if (data.type === "Credit Memo") {
        url = `sale_return_view/${data.id}`;
      } else if (data.type === "Debit Memo") {
        url = `purchase_return_view/${data.id}`;
      } else if (data.type === "Cash Payment") {
        url = `cash_payment_view/${data.id}`;
      } else if (data.type === "Sale Lead") {
        url = `lead/${data.id}`;
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
    rowNumberTmpl(dataItem) {
      let ds = this.$refs.gridTransactionDS.kendoWidget(),
        index = ds.indexOf(dataItem);
      return index + 1;
    },
    // async searchTransaction() {
    //   new Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve("resolved");
    //       this.showLoading = true;
    //       const startDate = this.startDate;
    //       const endDate = this.endDate;
    //       let strFilter = "?start=" + startDate + "&end=" + endDate;
    //       dashboardHandler.saleTaxDetail(strFilter).then((res) => {
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
      $(".customer-sale-tax").html(`
                <span class="mt-2 customer-saletax-item-returned">0</span><br/>
                <div style="display: flex; flex-direction: 'row'">
                    <button class="customer-saletax-next-page" title="previous" style="width: 24px; font-size: 19px; margin-top: -6px;"> < </button>
                    <ul class="customer-saletax-page-number page_scroll" style="display: flex;list-style: none; padding-left: 0px;">
                        <li style="padding: 6px; padding-bottom: 0px;"  data-page="1" class="customer-saletax-page-link text-bold-link" >1</li>
                    </ul>
                    <button class="customer-saletax-next-page" title="next" style="width: 24px; font-size: 19px;margin-top: -6px;"> > </button>
                </div>
            `);
      $(document).on("click", ".customer-saletax-page-link", function () {
        const page = $(this).data("page");
        $(".customer-saletax-page-link").removeClass("text-bold-link");
        $(this).addClass("text-bold-link");
        that.backToPage(that, page - 1);
        window.console.log(page - 1);
      });
      // $(document).on('click', '.bycus-next-page', function () {
      $(".customer-saletax-next-page").click(function () {
        const page_number = $(this)
          .parent()
          .children(".customer-saletax-page-number")
          .find("li")
          .last()
          .data("page");
        window.console.log("customer-saletax-page_number", page_number);
        const isPrevious = $(this).attr("title");
        if (isPrevious == "previous") {
          const currectpage = $(".text-bold-link").data("page");

          if (currectpage == 1) {
            return;
          }
          $(".customer-saletax-page-link").removeClass("text-bold-link");
          $(`.customer-saletax-page-link:eq(${currectpage - 1})`).addClass(
            "text-bold-link"
          );
          that.backToPage(that, currectpage - 2);
          // window.console.log("this currectpage back", currectpage - 2);
        } else {
          $(".customer-saletax-page-link").removeClass("text-bold-link");
          that.loadCustomerSaleTaxList();
          $(this)
            .parent()
            .children(".customer-saletax-page-number")
            .append(
              `<li class="customer-saletax-page-link text-bold-link" style="padding: 6px; padding-bottom: 0px;" data-page="${
                page_number + 1
              }">${page_number + 1}</li>`
            );
        }
        window.console.log("this", page_number + 1);
      });
    },
    itemRetuned(that) {
      let totalRow = 0;
      that.txnCustomerSaleTaxList.forEach((k) => {
        totalRow += k.length;
      });
      $(".customer-saletax-item-returned").text("Items returned (" + totalRow + ")");
    },
    disabledNextPage(value) {
      $(".customer-saletax-next-page").prop("disabled", value);
    },
    backToPage(that, index) {
      try {
        const byCustomer = that.txnCustomerSaleTaxList.at(index);
        that.customerSaleTaxList = byCustomer;
        // that.refreshGridData(customer)
        window.console.log("that.txnCustomerSaleTaxList[index]", byCustomer);
      } catch (e) {
        window.console.log("ERROR on backToPage", index);
      }
    },
    async onSearch() {
      this.txnCustomerSaleTaxList = [];
      this.loadPage(this);
      this.paging = {};
      // await this.loadTotalRevenue();
      this.loadCustomerSaleTaxList();
    },
    async loadCustomerSaleTaxList() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.customerSaleTaxList = [];
          const taxType = this.taxType || {};
          const nature = this.nature || {};
          this.params = {
            start: this.startDate,
            end: this.endDate,
            key: this.paging,
            taxTypeId: taxType.id || "",
            natureId: nature.id || "",
            // id: this.item.id || "",
            pattern: "sale",
          };
          this.showLoading = true;
          this.disabledNextPage(true);
          dashboardHandler.saleTaxDetail(this.params).then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoading = false;
              const responseData = res.data.data || [];
              const total = res.data.total || 0;
              this.showLoading = false;
              this.customerSaleTaxList = responseData;
              this.paging = res.data.key;
              this.txnCustomerSaleTaxList.push(responseData);

              this.toalCustomerSaleTaxPerPage = this.customerSaleTaxList.length;
              this.totalICustomerSaleTax = total;

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
    async loadTaxTypes() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = true;
          this.transactions = [];
          const strFilter = "";
          settingsHandler.taxType(strFilter).then((res) => {
            if (res.data.statusCode === 200) {
              this.taxTypes = res.data.data;
              this.showLoading = false;
            } else {
              this.showLoading = false;
            }
          });
        }, 10);
      });
    },
    async loadCustomerTypeNature() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          otherHandler.customerTypeNature().then((res) => {
            if (res.data.statusCode === 200) {
              this.natures = res.data.data;
            }
          });
        }, 10);
      });
    },
  },
  mounted: async function () {
    this.loadTaxTypes();
    this.loadCustomerTypeNature();
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
