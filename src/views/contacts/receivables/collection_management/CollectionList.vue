<template>
  <v-row>
    <v-col sm="12" cols="12" class="grayBg px-6">
      <!-- <v-card color="white" class="pa-3 no_border" elevation="0"> -->
      <v-card min-height="565" color="white" class="pa-3 no_border" elevation="0">
        <v-row>
          <v-col sm="9" cols="12" class="py-0">
            <h2 class="mb-0 font_020">{{ $t("collection_list") }}</h2>
            <p class="mb-0">{{ $t("collection_list_desc") }}</p>
          </v-col>
        </v-row>

        <v-row>
          <v-col sm="4" cols="12" class="py-0">
            <label class="label text-uppercase">{{ $t("as_of") }}</label>
            <app-datepicker
              :initialDate="asOf"
              @onChanged="lastDayOfWeek"
              @emitDate="asOf = $event"
            />
          </v-col>
          <v-col sm="3" cols="12" class="py-0">
            <label class="label">{{ $t("last_day_of_week") }}</label>
            <p class="text-bold pt-4">{{ weekSay }}</p>
          </v-col>
          <v-col sm="3" cols="12" class="kendo_dropdown_custom py-0">
            <label class="label">{{ $t("customer_name") }}</label>
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
          <v-col sm="1" cols="12" class="pt-6 pl-0">
            <v-btn
              class="btn_search"
              style="background-color: rgb(237, 241, 245); margin-top: 2px"
              @click="onSearch"
            >
              <i class="b-search" style="font-size: 18px; color: #fff !important" />
            </v-btn>
          </v-col>
        </v-row>

        <!--                <v-row class="mt-0">-->
        <!--                    <v-col sm="4" cols="12" class="pt-0">-->
        <!--                        <v-card-->
        <!--                            outlined-->
        <!--                            dense-->
        <!--                            class="pa-3 rounded-4 no_border white&#45;&#45;text "-->
        <!--                            color="secondary"-->
        <!--                            height="60px">-->
        <!--                            <h3 class="text-left flex-1 font_12 text-uppercase">-->
        <!--                                {{ $t("invoices_to_be_collected") }}-->
        <!--                            </h3>-->
        <!--                            <h3 class="text-right flex-1 font_20">-->
        <!--                                {{ collectedInvoice }}-->
        <!--                            </h3>-->
        <!--                        </v-card>-->
        <!--                    </v-col>-->
        <!--                    <v-col sm="4" cols="12" class="pt-0">-->
        <!--                        <v-card-->
        <!--                            outlined-->
        <!--                            dense-->
        <!--                            class="pa-3  no_border white&#45;&#45;text "-->
        <!--                            color="third"-->
        <!--                            height="60px"-->
        <!--                        >-->
        <!--                            <h3 class="text-left flex-1  font_12 text-uppercase">-->
        <!--                                {{ $t("total_collected_amount") }}-->
        <!--                            </h3>-->
        <!--                            <h3 class="text-right flex-1 font_20">-->
        <!--                                {{ numberFormat(collectedAmount) }}-->
        <!--                            </h3>-->
        <!--                        </v-card>-->
        <!--                    </v-col>-->
        <!--                    <v-col sm="4" cols="12" class="pt-0">-->
        <!--                        <v-card-->
        <!--                            outlined-->
        <!--                            dense-->
        <!--                            class="pa-3 rounded-4 no_border black&#45;&#45;text "-->
        <!--                            color="grayBg"-->
        <!--                            height="60px"-->
        <!--                        >-->
        <!--                            <h3 class="text-left flex-1  font_12 text-uppercase">-->
        <!--                                {{ $t("overdue_invoice_collected") }}-->
        <!--                            </h3>-->
        <!--                            <h3 class="text-right flex-1 font_20">-->
        <!--                                {{ collectedInvoiceOverDue }}-->
        <!--                            </h3>-->
        <!--                        </v-card>-->
        <!--                    </v-col>-->
        <!--                </v-row>-->
        <v-row>
          <v-col sm="12" cols="12" class="py-0">
            <gridFullScreen>
              <template>
                <LoadingMe
                  :isLoading="showLoading"
                  :fullPage="false"
                  :myLoading="true"
                  type="loading"
                />
                <kendo-datasource
                  ref="collectionListDS"
                  :group="group"
                  :data="collectionList"
                />
                <kendo-grid
                  id="gridReceivableBalanceDetail"
                  class="grid-function"
                  :data-source-ref="'collectionListDS'"
                  :sortable="true"
                  :groupable="true"
                  :filterable="true"
                  :column-menu="true"
                  :hidden="true"
                  :noRecords="true"
                  :editable="false"
                  :resizable="true"
                  v-on:databound="dataBound"
                  :excel-file-name="'ReceivableCollectionPlan.xlsx'"
                  :excel-filterable="true"
                  :excel-all-pages="true"
                  :toolbar="['excel']"
                  :scrollable-virtual="true"
                >
                  <kendo-grid-column
                    :field="'transactionDate'"
                    :title="$t('date')"
                    :template="'<span>#= kendo.toString(new Date(transactionDate), dateFormat)#</span>'"
                    :group-footer-template="groupFooterTemplate"
                    :width="150"
                    :filterable="true"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />

                  <kendo-grid-column
                    :field="'customerType'"
                    :title="$t('type')"
                    :template="'<span>#=customerType#</span>'"
                    :width="180"
                    :hidden="true"
                    :filterable="false"
                    :attributes="{ style: 'text-align: left; ' }"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5;text-align: center',
                    }"
                  />
                  <kendo-grid-column
                    :field="'group'"
                    :title="$t('group')"
                    :template="'<span>#=group#</span>'"
                    :width="180"
                    :hidden="true"
                    :filterable="false"
                    :attributes="{ style: 'text-align: left; ' }"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5;text-align: center',
                    }"
                  />
                  <kendo-grid-column
                    :field="'name'"
                    :title="$t('name')"
                    :attributes="{ class: 'tb_name_td' }"
                    :template="'<span>#=name#</span>'"
                    :width="200"
                    :group-header-template="'#=value#'"
                    :filterable-multi="true"
                    :filterable-search="true"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'empName'"
                    :title="$t('employee_name')"
                    :template="'<span>#=empName#</span>'"
                    :width="200"
                    :hidden="true"
                    :filterable="{ multi: true }"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'referenceNo'"
                    :title="$t('invoice_no')"
                    :template="referenceTemplate"
                    :width="180"
                    :filterable="false"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'code'"
                    :title="$t('payment_code')"
                    :template="'<span>#=code#</span>'"
                    :width="180"
                    :filterable="false"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'amount'"
                    :title="$t('open_amount')"
                    :template="'<span>#= kendo.toString(parseFloat(amount || 0), decimalFormat)#</span>'"
                    :width="200"
                    :filterable="false"
                    :attributes="{ style: 'text-align: right; ' }"
                    :aggregates="['sum']"
                    :footerAttributes="{
                      style: 'text-align: right;font-weight: bold;',
                    }"
                    :group-footer-template="'#= kendo.toString(sum, `n2`)#'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'paymentTerm'"
                    :title="$t('term')"
                    :template="'<span>#=paymentTerm#</span>'"
                    :width="180"
                    :filterable="false"
                    :attributes="{ style: 'text-align: center; ' }"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5;text-align: center',
                    }"
                  />
                  <kendo-grid-column
                    :field="'dueDate'"
                    :title="$t('due_date')"
                    :template="'<span>#= kendo.toString(new Date(dueDate), dateFormat)#</span>'"
                    :width="150"
                    :filterable="false"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'overDue'"
                    :title="$t('over_due')"
                    :template="'<span>#=overDue || 0#</span>'"
                    :width="150"
                    :filterable="false"
                    :attributes="{ style: 'text-align: center; ' }"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5;text-align: center',
                    }"
                  />
                  <kendo-grid-column
                    :field="'status'"
                    :title="$t('status')"
                    :template="status"
                    :attributes="{
                      class: 'tb_name_td',
                      style: 'text-align: center',
                    }"
                    :filterable="false"
                    :width="150"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'segment'"
                    :title="$t('segment')"
                    :template="'<span>#=segment.name || ``#</span>'"
                    :width="180"
                    :filterable="false"
                    :attributes="{ style: 'text-align: left; ' }"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5;text-align: left',
                    }"
                  />
                  <kendo-grid-column
                    :field="'location'"
                    :title="$t('location')"
                    :template="'<span>#=location.name || ``#</span>'"
                    :width="180"
                    :filterable="false"
                    :attributes="{ style: 'text-align: left; ' }"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5;text-align: left',
                    }"
                  />
                  <kendo-grid-column
                    :field="'action'"
                    :title="$t('action')"
                    :width="120"
                    :hidden="true"
                    :filterable="false"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                    :command="[
                      {
                        text: 'Receive',
                        click: goToCashReceipt,
                        className: 'k-state-disabled status',
                      },
                    ]"
                  />
                </kendo-grid>
              </template>
            </gridFullScreen>
            <div style="overflow: auto" class="receivable-plan-report"></div>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import LinkTemplate from "@/components/kendo_templates/LinkTemplate";
import kendo from "@progress/kendo-ui";
import ItemLineModel from "@/scripts/cash-receipt/model/ItemLine";
const $ = kendo.jQuery;
import { DropDownList } from "@progress/kendo-vue-dropdowns";
// const dashboardHandler = require("@/scripts/dashboard/customer/handler/dashboardHandler");
const billingHandler = require("@/scripts/invoice/handler/billingHandler");
const balanceHandler = require("@/scripts/balance/handler/balanceHandler");
const defaultItem = { ["name"]: "Select customer...", ["id"]: null };
const itemLineModel = new ItemLineModel({});
const emptyItem = { ["name"]: "loading ..." };
const SECOND_DELAY = 1000;
export default {
  data: () => ({
    asOf: new Date().toISOString().substring(0, 10),
    group: { field: "name" },
    // transactions: [],
    dateFormat: itemLineModel.dateFormat,
    showLoading: false,
    collectedAmount: 0,
    collectedInvoice: 0,
    collectedInvoiceOverDue: 0,
    decimalFormat: "n2",
    aggregateDefinition: [{ field: "amount", aggregate: "sum" }],
    weekSay: "",

    customerList: [],
    customer: {},
    textField: "name",
    defaultItem: defaultItem,
    dataItemKey: "id",
    filter: "",
    cusBaseUrl: balanceHandler.customerVendors(),

    txnCollectionList: [],
    collectionList: [],
    toalCollectionPage: 0,
    toalPerCollectionPage: 0,
    paging: {},
    action: "",
    params: {},
  }),
  components: {
    "app-datepicker": () => import("@/components/custom_templates/DatePickerComponent"),
    LoadingMe: () => import(`@/components/Loading`),
    gridFullScreen: () => import("@/components/gridFullScreen"),
    dropdownlist: DropDownList,
  },
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
    },
    requestData(skip, filter, baseUrl) {
      const url = baseUrl + `?pattern=cus-bal&filter=${filter}`;
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
      if (value && value["name"] === emptyItem["name"]) {
        return;
      }
      this.customer = value;
    },
    goToCashReceipt(e) {
      e.preventDefault();
      let grid = kendo.jQuery("#gridReceivableBalanceDetail").data("kendoGrid");
      let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
      this.$router.push({
        path: "cash_receipt" + `/${dataItem.code}`,
        params: { id: dataItem.code },
        query: { type: "pmt", option: "Payment Code" },
      });
    },
    groupFooterTemplate(dataItem) {
      // const str = `<div #if(${dataItem.amount.sum}===0){#class="classzero"#}#>Total:</div>`;
      // window.console.log('xxxx', str, dataItem.amount.sum)
      return `<div #if(${dataItem.amount.sum}===0){#class="classzero"#}#>Total:</div>`;
    },
    lastDayOfWeek() {
      const curr = new Date(this.asOf); // get current date
      const first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
      const last = first + 6; // last day is the first day + 6
      this.weekSay = new Date(curr.setDate(last)).toISOString().substring(0, 10);
    },
    // async loadCollectionList() {
    //   new Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve("resolved");
    //       const strFilter = "?asOf=" + this.asOf + "&detail=" + 1;
    //       this.showLoading = true;
    //       this.transactions = [];
    //       dashboardHandler
    //         .dashboardReceivableOverview(strFilter)
    //         .then((res) => {
    //           window.console.log(res.data.statusCode, "filter");
    //           if (res.data.statusCode === 200) {
    //             this.showLoading = false;
    //             this.transactions = res.data.data;
    //           } else {
    //             this.showLoading = false;
    //           }
    //         });
    //     }, 10);
    //   });
    // },
    dataBound: function (e) {
      const grid = kendo.jQuery("#gridReceivableBalanceDetail").data("kendoGrid");
      const items = e.sender.items();
      items.each(function () {
        let dataItem = grid.dataItem(this);
        $("tr[data-uid='" + dataItem.uid + "']")
          .find(".status")
          .each(function () {
            if (dataItem.status !== 3) {
              $(this).removeClass("k-state-disabled");
            }
          });
      });
    },
    referenceTemplate(data) {
      let url = `invoice_view/${data.id}`;
      if (data.type === "Invoice") {
        url = `invoice_view/${data.id}`;
      } else if (data.type === "Sale Quote") {
        url = `sale_quote_view/${data.id}`;
      } else if (data.type === "Delayed Invoice") {
        url = `delayed_invoice_view/${data.id}`;
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
      let ds = this.$refs.collectionListDS.kendoWidget(),
        index = ds.indexOf(dataItem);
      return index + 1;
    },
    receiptRefTemplate(data) {
      const url = `cash_receipt/${data.id}`;
      const args = {
        text: data.receiptReferenceNo,
        url: url,
        data: data,
      };
      // window.console.log('data', data.receiptReferenceNo)
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
    async loadPage(that) {
      $(".receivable-plan-report").html(`
                <span class="mt-2 collection-palan-item-returned">0</span><br/>
                <div style="display: flex; flex-direction: 'row'">
                    <button class="collection-palan-next-page" title="previous" style="width: 24px; font-size: 19px; margin-top: -6px;"> < </button>
                    <ul class="collection-palan-page-number page_scroll" style="display: flex;list-style: none; padding-left: 0px;">
                        <li style="padding: 6px; padding-bottom: 0px;"  data-page="1" class="collection-palan-page-link text-bold-link" >1</li>
                    </ul>
                    <button class="collection-palan-next-page" title="next" style="width: 24px; font-size: 19px;margin-top: -6px;"> > </button>
                </div>
            `);
      $(document).on("click", ".collection-palan-page-link", function () {
        const page = $(this).data("page");
        $(".collection-palan-page-link").removeClass("text-bold-link");
        $(this).addClass("text-bold-link");
        that.backToPage(that, page - 1);
        window.console.log(page - 1);
      });
      // $(document).on('click', '.bycus-next-page', function () {
      $(".collection-palan-next-page").click(function () {
        const page_number = $(this)
          .parent()
          .children(".collection-palan-page-number")
          .find("li")
          .last()
          .data("page");
        window.console.log("collection-palan-page_number", page_number);
        const isPrevious = $(this).attr("title");
        if (isPrevious == "previous") {
          const currectpage = $(".text-bold-link").data("page");

          if (currectpage == 1) {
            return;
          }
          $(".collection-palan-page-link").removeClass("text-bold-link");
          $(`.collection-palan-page-link:eq(${currectpage - 1})`).addClass(
            "text-bold-link"
          );
          that.backToPage(that, currectpage - 2);
          window.console.log("this currectpage back", currectpage - 2);
        } else {
          $(".collection-palan-page-link").removeClass("text-bold-link");
          that.loadBalanceDetail();
          $(this)
            .parent()
            .children(".collection-palan-page-number")
            .append(
              `<li class="collection-palan-page-link text-bold-link" style="padding: 6px; padding-bottom: 0px;" data-page="${
                page_number + 1
              }">${page_number + 1}</li>`
            );
        }
        window.console.log("this", page_number + 1);
      });
    },
    itemRetuned(that) {
      let totalRow = 0;
      that.txnCollectionList.forEach((k) => {
        totalRow += k.length;
      });
      $(".collection-palan-item-returned").text("Items returned (" + totalRow + ")");
    },
    disabledNextPage(value) {
      $(".collection-palan-next-page").prop("disabled", value);
    },
    backToPage(that, index) {
      try {
        const byBalanceDetail = that.txnCollectionList.at(index);
        that.collectionList = byBalanceDetail;
        // that.refreshGridData(customer)
        window.console.log("that.txnCollectionList[index]", byBalanceDetail);
      } catch (e) {
        window.console.log("ERROR on backToPage", index);
      }
    },
    onSearch() {
      this.txnCollectionList = [];
      this.loadPage(this);
      this.paging = {};
      this.loadBalanceDetail();
      //   this.loadBalanceDetailSummary();
    },
    async loadBalanceDetail() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.collectionList = [];
          //   let groupId = "";
          //   let customerTypeId = "";
          //   const group = this.mCustomerGroup || {};
          //   const cusType = this.mCustomerType || {};
          //   groupId = group.id || "";
          //   customerTypeId = cusType.id || "";
          this.params = {
            asOf: this.weekSay,
            // tid: customerTypeId,
            // grid: groupId,
            key: this.paging,
            id: this.customer.id || "",
            isOverdue: 1,
            type: "cus",
          };
          this.showLoading = true;
          this.disabledNextPage(true);
          billingHandler.wcpReceivableList(this.params).then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoading = false;
              const responseData = res.data.data || [];
              const total = res.data.total || 0;
              this.showLoading = false;
              this.collectionList = responseData;
              this.paging = res.data.key;
              this.txnCollectionList.push(responseData);

              this.toalPerCollectionPage = this.collectionList.length;
              this.toalCollectionPage = total;

              if (Object.keys(this.paging).length > 0) {
                this.disabledNextPage(false);
              } else {
                this.disabledNextPage(true);
              }
              this.itemRetuned(this);
            } else {
              this.showLoading = false;
            }
            // this.showHideZeroAmount();
          });
        }, 10);
      });
    },
    // async loadBalanceDetailSummary() {
    //   new Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve("resolved");
    //       // this.collectionList = [];
    //       let groupId = "";
    //       let customerTypeId = "";
    //       const group = this.mCustomerGroup || {};
    //       const cusType = this.mCustomerType || {};
    //       groupId = group.id || "";
    //       customerTypeId = cusType.id || "";
    //       this.params = {
    //         asOf: this.asOf,
    //         tid: customerTypeId,
    //         grid: groupId,
    //         key: this.paging,
    //         id: this.customer.id || "",
    //         summary: 1,
    //         type: "cus",
    //       };
    //       this.showLoading = true;
    //       this.disabledNextPage(true);
    //       billingHandler.wcpReceivableList(this.params).then((res) => {
    //         if (res.data.statusCode === 200) {
    //           this.showLoading = false;
    //           const responseData = res.data.data[0] || [];
    //           this.receivableBalance = kendo.toString(
    //             responseData.receivableBalance,
    //             responseData.decimalFormat
    //           );
    //           this.overDueAmount = kendo.toString(
    //             responseData.overDueAmount,
    //             responseData.decimalFormat
    //           );
    //           this.tobeCollected = kendo.toString(
    //             responseData.tobeCollected,
    //             `n0`
    //           );
    //         } else {
    //           this.showLoading = false;
    //         }
    //         // this.showHideZeroAmount();
    //       });
    //     }, 10);
    //   });
    // },
  },
  computed: {},
  mounted: async function () {
    this.group = [
      {
        field: "name",
        aggregates: this.aggregateDefinition,
      },
    ];
    this.requestData(0, this.filter, this.cusBaseUrl);
    this.lastDayOfWeek();
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
