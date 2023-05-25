<template>
  <v-row>
    <v-col sm="12" cols="12" class="grayBg px-6">
      <v-card color="white" class="pa-3 no_border" min-height="564" elevation="0">
        <v-row class="">
          <v-col sm="8" cols="12" class="py-0">
            <h2 class="mb-0 font_020">{{ $t("deposit_balance_detail") }}</h2>
            <p class="mb-2">{{ $t("deposit_balance_detail_desc") }}</p>
          </v-col>
          <v-col sm="4" cols="12" class="pt-2"> </v-col>
          <v-col sm="4" cols="12" class="py-0">
            <label class="label">{{ $t("dates") }}</label>
            <v-select
              class="mt-1"
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
          <v-col sm="4" cols="12" class="py-0 mt-7">
            <div>
              <v-btn
                color="primary"
                @click="onSearch('Sale Deposit')"
                :loading="loadingSearch"
                class="text-capitalize white--text mt-1"
              >
                <i class="b-search" style="font-size: 18px; color: #fff !important" />
              </v-btn>
              <v-btn
                link
                route
                class="text-upper ml-5 white--text"
                to="sale_deposit"
                color="primary"
              >
                {{ $t("new_sale_deposit") }}
              </v-btn>
            </div>
          </v-col>
          <v-col sm="4" cols="12" class="pt-0">
            <label class="label">{{ $t("customer_name") }}</label>
            <dropdownlist
              class="kendo_dropdown_custom mt-1"
              style="height: 40px; width: 100%"
              :data-items="customerList"
              @change="onChange"
              :value="customer"
              :data-item-key="dataItemKey"
              :text-field="textField"
              :default-item="defaultItem"
              :filterable="true"
              @filterchange="onFilterChange"
            >
            </dropdownlist>
          </v-col>
          <v-col sm="4" cols="12" class="py-0">
            <label class="label">{{ $t("to") }}</label>
            <app-datepicker :initialDate="endDate" @emitDate="endDate = $event" />
          </v-col>
        </v-row>

        <v-row class="mt-0">
          <v-col sm="12" cols="12" class="pt-0 custom_pagination deposit-bycus-pager">
            <template>
              <LoadingMe
                :isLoading="showLoading"
                :fullPage="false"
                type="loading"
                :myLoading="true"
              >
              </LoadingMe>
              <kendo-datasource
                ref="gridDepositTransactionDS"
                :data="txnSaleDeposit"
                :group="group"
                :sort="sortDefinition"
                :server-paging="false"
              />
              <kendo-grid
                id="gridDepositTransaction"
                class="grid-function"
                :data-source-ref="'gridDepositTransactionDS'"
                :editable="false"
                :groupable="true"
                :column-menu="true"
                :noRecords="true"
                :pageable="true"
                :filterable="false"
                :resizable="true"
                :excel-file-name="'CustomerDepositBalanceDetail.xlsx'"
                :excel-filterable="true"
                :excel-all-pages="true"
                :toolbar="['excel']"
                :scrollable-virtual="true"
              >
                <!--                                <kendo-grid-column-->
                <!--                                    :field="'no'"-->
                <!--                                    :title="$t('no')"-->
                <!--                                    :template="rowNumberTmpl"-->
                <!--                                    :width="60"-->
                <!--                                    :column-menu="false"-->
                <!--                                    :headerAttributes="{ style: 'background-color: #EDF1F5;', class: 'text-center'	}"-->
                <!--                                    :attributes="{style: 'text-align: center'}"/>-->
                <kendo-grid-column
                  :field="'transactionDate'"
                  :title="$t('date')"
                  :width="130"
                  :template="dateFormat"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'name'"
                  :title="$t('name')"
                  :width="200"
                  :template="'<span>#=name#</span>'"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'journalNote'"
                  :title="$t('description')"
                  :width="200"
                  :template="'<span>#=journalNote || ``#</span>'"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'transactionType'"
                  :title="$t('type')"
                  :width="150"
                  :filterable-multi="true"
                  :filterable-search="true"
                  :template="'<span>#=transactionType#</span>'"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5, color: green !important',
                  }"
                />
                <kendo-grid-column
                  :field="'referenceNo'"
                  :title="$t('reference_no')"
                  :width="150"
                  :template="referenceTemplate"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5, color: green !important',
                  }"
                />
                <kendo-grid-column
                  :field="'saleOrderNo'"
                  :title="$t('so_number')"
                  :width="150"
                  :template="soTemplate"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5, color: green !important',
                  }"
                />
                <kendo-grid-column
                  :field="'exchangeAmount'"
                  :title="$t('amount')"
                  :width="150"
                  :attributes="{ style: 'text-align: right' }"
                  :template="'<span>#=kendo.toString(exchangeAmount, decimalFormat)#</span>'"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <!-- <kendo-grid-column
                                    :field="''"
                                    :title="$t('action')"
                                    :width="100"
                                    :command="[{  text: 'Edit', click: goEdit }]"
                                    :headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"/> -->
              </kendo-grid>
            </template>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { i18n } from "@/i18n";
import DatePickerComponent from "@/components/custom_templates/DatePickerComponent";

const billingHandler = require("@/scripts/invoice/handler/billingHandler");
import kendo from "@progress/kendo-ui";
import LinkTemplate from "@/components/kendo_templates/LinkTemplate";
import { DropDownList } from "@progress/kendo-vue-dropdowns";
const defaultItem = { ["numberName"]: "Select customer...", ["id"]: null };
const customerHandler = require("@/scripts/customerHandler");
const emptyItem = { ["numberName"]: "loading ..." };

const $ = require("jquery");
const SECOND_DELAY = 1000;
import JSZip from "jszip";

window.JSZip = JSZip;

export default {
  name: "DepositTransaction",
  components: {
    "app-datepicker": DatePickerComponent,
    LoadingMe: () => import(`@/components/Loading`),
    dropdownlist: DropDownList,
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
    txnSaleDeposit: [],
    group: { field: "name" },
    params: {},
    paging: {},
    sortDefinition: [{ field: "transactionDate", dir: "asc" }],
    txnByCustomerDeposits: [],
    disabledMe: true,
    action: "",

    customerList: [],
    customer: {},
    textField: "numberName",
    defaultItem: defaultItem,
    dataItemKey: "id",
    filter: "",
    cusBaseUrl: customerHandler.search(),
  }),
  methods: {
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
      this.txnByCustomerDeposits = [];
      this.loadPage(this);
      this.paging = {};
      this.searchTransaction(type);
    },
    async loadPage(that) {
      $(".deposit-bycus-pager .k-pager-wrap").html(`
                <label class="label deposit-bycus-item-returned">0</label>
                <div style="display: flex; flex-direction: 'row'">
                    <button class="deposit-bycus-next-page" title="previous" style="width: 24px; font-size: 19px;"> < </button>
                    <ul class="deposit-bycus-page-number" style="display: flex;list-style: none; padding-left: 0px;">
                        <li style="padding: 6px;"  data-page="1" class="deposit-bycus-page-link text-bold-link" >1</li>
                    </ul>
                    <button class="deposit-bycus-next-page" title="next" style="width: 24px; font-size: 19px;"> > </button>
                </div>
            `);
      $(document).on("click", ".deposit-bycus-page-link", function () {
        const page = $(this).data("page");
        $(".deposit-bycus-page-link").removeClass("text-bold-link");
        $(this).addClass("text-bold-link");
        that.backToPage(that, page - 1);
        window.console.log(page - 1);
      });
      // $(document).on('click', '.deposit-bycus-next-page', function () {
      $(".deposit-bycus-next-page").click(function () {
        const page_number = $(this)
          .parent()
          .children(".deposit-bycus-page-number")
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
          $(".deposit-bycus-page-link").removeClass("text-bold-link");
          $(`.deposit-bycus-page-link:eq(${currectpage - 1})`).addClass("text-bold-link");
          that.backToPage(that, currectpage - 2);
          window.console.log("this currectpage back", currectpage - 2);
        } else {
          $(".deposit-bycus-page-link").removeClass("text-bold-link");
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
            .children(".deposit-bycus-page-number")
            .append(
              `<li class="deposit-bycus-page-link text-bold-link" style="padding: 6px;" data-page="${
                page_number + 1
              }">${page_number + 1}</li>`
            );
        }
        window.console.log("this", page_number + 1);
      });
    },
    itemRetuned(that) {
      let totalRow = 0;
      that.txnByCustomerDeposits.forEach((k) => {
        totalRow += k.length;
      });
      $(".deposit-bycus-item-returned").text("Items returned (" + totalRow + ")");
    },
    disabledNextPage(value) {
      $(".deposit-bycus-next-page").prop("disabled", value);
    },
    backToPage(that, index) {
      try {
        window.console.log(
          "Length of txnByCustomerDeposits",
          that.txnByCustomerDeposits.length
        );
        const byCustomer = that.txnByCustomerDeposits.at(index);
        that.txnSaleDeposit = byCustomer;
        // that.refreshGridData(customer)
        window.console.log("that.txnByCustomerDeposits[index]", byCustomer);
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
    rowNumberTmpl(dataItem) {
      let ds = this.$refs.gridDepositTransactionDS.kendoWidget(),
        index = ds.indexOf(dataItem);
      return index + 1;
    },
    dateFormat(dataItem) {
      return kendo.toString(new Date(dataItem.transactionDate), dataItem.dateFormat);
    },
    referenceTemplate(data) {
      let url = `sale_deposit_view/${data.id}`;
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
    soTemplate(data) {
      let url = `sale_order_view/${data.id}`;
      let args = {
        text: data.soNumber,
        url: url,
        data: data,
      };
      return {
        template: LinkTemplate,
        templateArgs: args,
      };
    },
    goEdit(e) {
      e.preventDefault();
      let grid = kendo.jQuery("#gridDepositTransaction").data("kendoGrid");
      let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
      this.$router.push({
        path: "sale_deposit" + `/${dataItem.id}`,
        params: { id: dataItem.id },
        query: { type: "edit" },
      });
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
            id: this.customer.id || "",
            start: startDate,
            end: endDate,
            key: this.paging,
          };
          this.disabledNextPage(true);
          billingHandler.depositList(this.params).then((res) => {
            if (res.data.statusCode === 200) {
              this.loadingSearch = false;
              this.showLoading = false;

              const responseData = res.data.data || [];
              this.txnSaleDeposit = responseData;
              this.paging = res.data.key;

              this.txnByCustomerDeposits.push(responseData);
              if (Object.keys(this.paging).length > 0) {
                this.disabledNextPage(false);
              } else {
                this.disabledNextPage(true);
              }
              this.itemRetuned(this);
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
    this.requestData(0, this.filter, this.cusBaseUrl);
    this.loadPage(this);
    this.itemRetuned(this);
    this.disabledNextPage(true);
  },
};
</script>
<style scoped></style>
