<template>
  <v-row>
    <v-col sm="12" cols="12" class="grayBg px-6">
      <v-card color="white" class="pa-3 no_border" elevation="0">
        <v-row>
          <v-col sm="12" cols="12" class="pt-0">
            <h2 class="mb-1 font_020">{{ $t("credit_limits") }}</h2>
            <p class="mb-0">{{ $t("credit_limit_decision_desc") }}</p>
          </v-col>
          <v-col sm="4" cols="12" class="kendo_dropdown_custom py-0 pd-0">
            <app-datepicker :initialDate="asOf" @emitDate="asOf = $event" />
          </v-col>
          <v-col sm="4" cols="12" class="kendo_dropdown_custom py-1 pd-0">
            <dropdownlist
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
          <v-col sm="1" cols="1" class="pt-1">
            <v-btn color="primary white--text" @click="onSearch">
              <i class="b-search" style="font-size: 18px; color: #fff !important" />
            </v-btn>
          </v-col>
        </v-row>

        <!-- <v-row>
          <v-col sm="6" cols="12" class="pt-0">
            <v-card
              outlined
              dense
              class="pa-3 rounded-4 no_border white--text"
              color="secondary"
              height="60px"
            >
              <h3 class="text-left font_12 flex-1 text-uppercase">
                {{ $t("customers_over_credit_limit") }}
              </h3>
              <h3 class="text-right flex-1 mt-0 font_20">
                {{ totalCustomer }}
              </h3>
            </v-card>
          </v-col>
          <v-col sm="6" cols="12" class="pt-0">
            <v-card
              outlined
              dense
              class="pa-3 rounded-4 no_border white--text"
              color="third"
              height="60px"
            >
              <h3 class="text-left text-uppercase font_12 flex-1">
                {{ $t("customer_with_90%_of_limit") }}
              </h3>
              <h3 class="text-right font_20 flex-1">
                {{ customer90Percentage }}
              </h3>
            </v-card>
          </v-col>
        </v-row> -->
        <v-row>
          <v-col sm="12" cols="12" class="py-0">
            <gridFullScreen>
              <template>
                <LoadingMe
                  :isLoading="showLoading"
                  :fullPage="false"
                  type="loading"
                  :myLoading="true"
                />

                <kendo-datasource ref="dataSource" :data="creditlimitList" />
                <kendo-grid
                  id="gridCreditLimit"
                  class="grid-function"
                  :data-source-ref="'dataSource'"
                  :column-menu="true"
                  :noRecords="true"
                  :sortable="true"
                  :resizable="true"
                  :editable="false"
                  :excel-file-name="'CustomerCreditLimit.xlsx'"
                  :excel-filterable="true"
                  :excel-all-pages="true"
                  :toolbar="['excel']"
                  :scrollable-virtual="true"
                >
                  <kendo-grid-column
                    :field="'name'"
                    :title="$t('name')"
                    :attributes="{ class: 'tb_name_td' }"
                    :template="'<span>#=name#</span>'"
                    :width="200"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'balance'"
                    :title="$t('balance')"
                    :template="'<span>#= kendo.toString(balance, decimalFormat)#</span>'"
                    :attributes="{ style: 'text-align: right; ' }"
                    :width="150"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5',
                    }"
                  />
                  <kendo-grid-column
                    :field="'creditLimit'"
                    :title="$t('credit_limit')"
                    :template="'<span>#= kendo.toString(creditLimit, decimalFormat)#</span>'"
                    :attributes="{ style: 'text-align: right; ' }"
                    :width="150"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5',
                    }"
                  />
                  <kendo-grid-column
                    :field="'creditLimit'"
                    :title="$t('%_of_credit_limit')"
                    :template="'<span>#= kendo.toString(creditLimit > 0 ? (balance / creditLimit)*100 : 0, decimalFormat)#</span>%'"
                    :attributes="{ style: 'text-align: right; ' }"
                    :width="200"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5',
                    }"
                  />
                  <kendo-grid-column
                    :field="'overdueBalance'"
                    :title="$t('overdue_balance')"
                    :template="'<span>#= kendo.toString(overdueBalance, decimalFormat)#</span>'"
                    :width="200"
                    :attributes="{ style: 'text-align: right; ' }"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5',
                    }"
                  />
                  <kendo-grid-column
                    :field="'term.name'"
                    :title="$t('approved_term')"
                    :width="200"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5',
                    }"
                  />
                  <kendo-grid-column
                    :field="'totalSale'"
                    :title="$t('total_sale')"
                    :template="'<span>#= kendo.toString(totalSale, decimalFormat)#</span>'"
                    :width="200"
                    :attributes="{ style: 'text-align: right; ' }"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5',
                    }"
                  />
                </kendo-grid>
              </template>
            </gridFullScreen>
          </v-col>
        </v-row>
        <div style="overflow: auto" class="creditlimit-report"></div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import DatePickerComponent from "@/components/custom_templates/DatePickerComponent";
import { DropDownList } from "@progress/kendo-vue-dropdowns";
import JSZip from "jszip";
window.JSZip = JSZip;
const billingHandler = require("@/scripts/invoice/handler/billingHandler");

const defaultItem = { ["numberName"]: "Select customer...", ["id"]: null };
const customerHandler = require("@/scripts/customerHandler");
const emptyItem = { ["numberName"]: "loading ..." };
import kendo from "@progress/kendo-ui";
const $ = kendo.jQuery;

const SECOND_DELAY = 1000;

export default {
  data: () => ({
    showLoading: false,
    asOf: new Date().toISOString().substring(0, 10),
    customerList: [],
    creditlimitList: [],
    customer: {},
    dataItemKey: "id",
    textField: "numberName",
    defaultItem: defaultItem,
    filter: "",
    cusBaseUrl: customerHandler.search(),
    totalCustomer: 0,
    customer90Percentage: 0,

    txnCreditlimitList: [],
    totalCreditlimitList: 0,
    totalCreditlimitPerPage: 0,
    paging: {},
    action: "",
    params: {},
  }),
  components: {
    "app-datepicker": DatePickerComponent,
    LoadingMe: () => import(`@/components/Loading`),
    dropdownlist: DropDownList,
    gridFullScreen: () => import("@/components/gridFullScreen"),
  },
  methods: {
    // async loadCreditLimit() {
    //   new Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve("resolved");
    //       this.showLoading = true;
    //       let strFilter = "";
    //       strFilter = "?asOf=" + this.asOf;
    //       if (this.customer) {
    //         if (this.customer.id !== undefined && this.customer.id !== null) {
    //           strFilter = "?asOf=" + this.asOf + "&id=" + this.customer.id;
    //         }
    //       }
    //       this.showLoading = true;
    //       billingHandler.wcpReceivableCreditLimitList(strFilter).then((res) => {
    //         if (res.data.statusCode === 200) {
    //           this.creditLimitList = res.data.data;
    //           const result = res.data.result;
    //           this.customer90Percentage = parseFloat(
    //             result.customer90Percentage
    //           );
    //           this.totalCustomer = 0; //parseFloat(result.totalCustomerOverCreditLimit ? result.totalCustomerOverCreditLimit : 0)
    //           this.showLoading = false;
    //         }
    //       });
    //     }, 300);
    //   });
    // },
    onFilterChange(event) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        const filter = event.filter.value;
        this.requestData(0, filter, this.cusBaseUrl);
        this.filter = filter;
        this.loading = false;
      }, SECOND_DELAY);
      this.loading = true;
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
    async loadPage(that) {
      $(".creditlimit-report").html(`
                <label class="label creditlimit-report-page-cus-item-returned">0</label>
                <div style="display: flex; flex-direction: 'row'">
                    <button class="creditlimit-report-page-cus-next-page" title="previous" style="width: 24px; font-size: 19px;"> < </button>
                    <ul class="creditlimit-report-page-cus-page-number" style="display: flex;list-style: none; padding-left: 0px;">
                        <li style="padding: 6px;"  data-page="1" class="creditlimit-report-page-cus-page-link text-bold-link" >1</li>
                    </ul>
                    <button class="creditlimit-report-page-cus-next-page" title="next" style="width: 24px; font-size: 19px;"> > </button>
                </div>
            `);
      $(document).on("click", ".creditlimit-report-page-cus-page-link", function () {
        const page = $(this).data("page");
        $(".creditlimit-report-page-cus-page-link").removeClass("text-bold-link");
        $(this).addClass("text-bold-link");
        that.backToPage(that, page - 1);
        window.console.log(page - 1);
      });
      // $(document).on('click', '.creditlimit-report-page-cus-next-page', function () {
      $(".creditlimit-report-page-cus-next-page").click(function () {
        const page_number = $(this)
          .parent()
          .children(".creditlimit-report-page-cus-page-number")
          .find("li")
          .last()
          .data("page");
        window.console.log("creditlimit-report-page-cus-page_number", page_number);
        const isPrevious = $(this).attr("title");
        if (isPrevious == "previous") {
          const currectpage = $(".text-bold-link").data("page");

          if (currectpage == 1) {
            return;
          }
          $(".creditlimit-report-page-cus-page-link").removeClass("text-bold-link");
          $(`.creditlimit-report-page-cus-page-link:eq(${currectpage - 1})`).addClass(
            "text-bold-link"
          );
          that.backToPage(that, currectpage - 2);
          window.console.log("this currectpage back", currectpage - 2);
        } else {
          $(".creditlimit-report-page-cus-page-link").removeClass("text-bold-link");
          window.console.log("params", that.params);
          that.loadCreditLimitReport(that.action);
          $(this)
            .parent()
            .children(".creditlimit-report-page-cus-page-number")
            .append(
              `<li class="creditlimit-report-page-cus-page-link text-bold-link" style="padding: 6px;" data-page="${
                page_number + 1
              }">${page_number + 1}</li>`
            );
        }
        window.console.log("this", page_number + 1);
      });
    },
    itemRetuned(that) {
      let totalRow = 0;
      that.txnCreditlimitList.forEach((k) => {
        totalRow += k.length;
      });
      $(".creditlimit-report-page-cus-item-returned").text(
        "Items returned (" + totalRow + ")"
      );
    },
    disabledNextPage(value) {
      $(".creditlimit-report-page-cus-next-page").prop("disabled", value);
    },
    backToPage(that, index) {
      try {
        window.console.log(
          "Length of txnCreditlimitList",
          that.txnCreditlimitList.length
        );
        const byCustomer = that.txnCreditlimitList.at(index);
        that.transactions = byCustomer;
        // that.refreshGridData(customer)
        window.console.log("that.txnCreditlimitList[index]", byCustomer);
      } catch (e) {
        window.console.log("ERROR on backToPage", index);
      }
    },
    onSearch(search) {
      this.txnCreditlimitList = [];
      this.loadPage(this);
      this.paging = {};
      this.loadCreditLimitReport(search);
      //   this.loadCreditLimitUsage();
    },
    async loadCreditLimitReport() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.creditlimitList = [];
          const id = this.customer.id || "";
          this.params = {
            asOf: this.asOf,
            key: this.paging,
            type: "cus",
            id: id,
          };
          this.showLoading = true;
          this.disabledNextPage(true);
          billingHandler.wcpReceivableCreditLimitList(this.params).then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoading = false;
              const responseData = res.data.data || [];
              const total = res.data.total || 0;
              this.showLoading = false;
              this.creditlimitList = responseData;
              this.paging = res.data.key;
              window.console.log("key", res.data.key);
              this.txnCreditlimitList.push(responseData);

              this.totalCreditlimitPerPage = this.creditlimitList.length;
              this.totalCreditlimitList = total;

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
  computed: {},
  mounted: async function () {
    this.requestData(0, this.filter, this.cusBaseUrl);
    this.loadPage(this);
    this.itemRetuned(this);
    this.disabledNextPage(true);
  },
};
</script>
<style scoped>
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
</style>
