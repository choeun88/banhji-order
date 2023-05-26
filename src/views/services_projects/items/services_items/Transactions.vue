<template>
  <v-row>
    <v-col sm="12" cols="12" class="pt-0">
      <v-card color="white" class="pl-2 no_border" elevation="0">
        <!--                <h2 class="mb-0">{{ $t('services_sale_transactions') }}</h2>-->
        <v-row>
          <!-- <v-col sm="9" cols="12" class="py-0">
            <date-search
              :initStartDate="startDate"
              @emitStartDate="startDate = $event"
              :initEndDate="endDate"
              @emitEndDate="endDate = $event"
            />
          </v-col> -->

          <v-col sm="5" cols="12" class="py-0">
            <app-datepicker :initialDate="startDate" @emitDate="startDate = $event" />
          </v-col>

          <v-col sm="5" cols="12" class="py-0">
            <app-datepicker :initialDate="endDate" @emitDate="endDate = $event" />
          </v-col>
          <v-col sm="1" cols="12" class="py-0 mt-1">
            <v-btn
              class="btn_search"
              style="background-color: rgb(237, 241, 245)"
              @click="onSearch"
            >
              <i class="b-search" style="font-size: 18px; color: #fff !important" />
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="12" cols="12">
            <template>
              <LoadingMe
                :isLoading="showLoading"
                :fullPage="false"
                type="loading"
                :myLoading="true"
              >
              </LoadingMe>
              <kendo-datasource ref="serviceTxnDS" :data="ItemList" />
              <kendo-grid
                id="gridServiceTXN"
                class="grid-function"
                :data-source-ref="'serviceTxnDS'"
                :sortable="false"
                :groupable="false"
                :filterable="false"
                :column-menu="true"
                :editable="false"
                :style="{ width: '100%' }"
                :noRecords="true"
                :scrollable-virtual="true"
              >
              <kendo-grid-column
                  :field="'transactionDate'"
                  :title="$t('date')"
                  :template="formatDate"
                  :width="200"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5',
                  }"
                />
                <kendo-grid-column
                  :field="'type'"
                  :title="$t('type')"
                  :template="'<span>#=type#</span>'"
                  :width="150"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5',
                  }"
                />
                <kendo-grid-column
                  :field="'name'"
                  :title="$t('name')"
                  :template="'<span>#=name#</span>'"
                  :width="200"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5',
                  }"
                />
                <kendo-grid-column
                  :field="'itemName'"
                  :title="$t('item')"
                  :template="'<span>#=itemName#</span>'"
                  :width="200"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5',
                  }"
                />
                <kendo-grid-column
                  :field="'referenceNo'"
                  :title="$t('reference_no')"
                  :template="referenceTemplate"
                  :width="220"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5',
                  }"
                />

                <kendo-grid-column
                  :field="'uom'"
                  :title="$t('txn_uom')"
                  :template="'<span>#=uom.uom || ``#</span>'"
                  :width="150"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5',
                  }"
                />
                <kendo-grid-column
                  :field="'qty'"
                  :title="$t('qty')"
                  :template="'<span>#=kendo.toString(qty, decimalFormat)#</span>'"
                  :width="100"
                  :attributes="{ style: 'text-align: right' }"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5',
                  }"
                />
                <kendo-grid-column
                  :field="'costOrPrice'"
                  :title="$t('price')"
                  :template="'<span>#=kendo.toString(costOrPrice, decimalFormat)#</span>'"
                  :width="100"
                  :attributes="{ style: 'text-align: right' }"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5',
                  }"
                />
                <kendo-grid-column
                  :field="'additionalCost'"
                  :title="$t('addlc')"
                  :template="'<span>#=kendo.toString(additionalCost, decimalFormat)#</span>'"
                  :width="180"
                  :hidden="true"
                  :attributes="{ style: 'text-align: right' }"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5',
                  }"
                />
                <kendo-grid-column
                  :field="'amount'"
                  :title="$t('amount')"
                  :template="'<span>#=kendo.toString(amount, decimalFormat)#</span>'"
                  :width="180"
                  :attributes="{ style: 'text-align: right' }"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5',
                  }"
                />
              </kendo-grid>
            </template>
          </v-col>
        </v-row>
        <div style="overflow: auto" class="transaction-service"></div>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import LinkTemplate from "@/components/kendo_templates/LinkTemplate";
import kendo from "@progress/kendo-ui";
import DatePickerComponent from "@/components/custom_templates/DatePickerComponent";
const itemHandler = require("@/scripts/productVariantHandler");
const $ = kendo.jQuery;
export default {
  name: "ServiceTransactions",
  props: {
    service: {},
  },
  computed: {
    id() {
      if (this.service) {
        return this.service.id;
      } else {
        return "";
      }
    },
  },
  components: {
    LoadingMe: () => import(`@/components/Loading`),
    "app-datepicker": DatePickerComponent,
    // "date-search": () => import("@/components/custom_templates/DateSearch"),
  },
  data: () => ({
    showLoading: false,
    mDateSorter: "Today",
    startDate: new Date().toISOString().substr(0, 10),
    endDate: new Date().toISOString().substr(0, 10),
    dateSorters: ["Today", "This Week", "This Month", "This Year"],
    isLoaded: false,
    ItemList: [],
    txnItemList: [],
    paging: {},
    toalVariantBalPerPage: 0,
    totalVariantBal: 0,
  }),
  methods: {
    formatDate(dataItem) {
      if (dataItem.hasOwnProperty("transactionDate")) {
        return kendo.toString(new Date(dataItem.transactionDate), dataItem.dateFormat + ` hh:mm tt`);
      }
      return "";
    },
    // async searchTransaction() {
    //   new Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve("resolved");
    //       this.showLoading = true;
    //       const startDate = this.startDate;
    //       const endDate = this.endDate;
    //       let strFilter = "?start=" + startDate + "&end=" + endDate + "&item=1";
    //       if (this.id !== undefined || this.id !== null) {
    //         strFilter =
    //           "?start=" +
    //           startDate +
    //           "&end=" +
    //           endDate +
    //           "&id=" +
    //           this.id +
    //           "&item=1";
    //       }
    //       // billingHandler.inventoryListByFunction(strFilter).then(res => {
    //       itemHandler.txnItem(strFilter).then((res) => {
    //         if (res.data.statusCode === 200) {
    //           this.inventoryList = res.data.data;
    //         }
    //         this.showLoading = false;
    //       });
    //     }, 10);
    //   });
    // },
    referenceTemplate(data) {
      let url = `#`;
      if (data.type === "Invoice") {
        url = `invoice_view/${data.id}`;
      } else if (data.type === "Sale Quote") {
        url = `sale_quote_view/${data.id}`;
      } else if (data.type === "Delayed Invoice") {
        url = `delayed_invoice_view/${data.id}`;
      } else if (data.type === "Sale Order") {
        url = `sale_order_view/${data.id}`;
      } else if (data.type === "Purchase Order") {
        url = `purchase_order_view/${data.id}`;
      } else if (data.type === "Credit Memo") {
        url = `sale_return_view/${data.id}`;
      } else if (data.type === "Debit Memo") {
        url = `purchase_return_view/${data.id}`;
      } else if (data.type === "Inventory Adjustment") {
        url = `inventory_adjustment_view/${data.id}`;
      } else if (data.type === "Purchase") {
        url = `credit_purchase_view/${data.id}`;
      } else if (data.type === "Production Order") {
        url = `production_order_view/${data.id}`;
      } else if (data.type === "Production") {
        url = `production_view/${data.id}`;
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
    async loadPage(that) {
      $(".transaction-service").html(`
                <span class="mt-2 bal-transaction-service-item-returned">0</span><br/>
                <div style="display: flex; flex-direction: 'row'">
                    <button class="bal-transaction-service-next-page" title="previous" style="width: 24px; font-size: 19px; margin-top: -6px;"> < </button>
                    <ul class="bal-transaction-service-page-number page_scroll" style="display: flex;list-style: none; padding-left: 0px;">
                        <li style="padding: 6px; padding-bottom: 0px;"  data-page="1" class="bal-transaction-service-page-link text-bold-link" >1</li>
                    </ul>
                    <button class="bal-transaction-service-next-page" title="next" style="width: 24px; font-size: 19px;margin-top: -6px;"> > </button>
                </div>
            `);
      $(document).on("click", ".bal-transaction-service-page-link", function () {
        const page = $(this).data("page");
        $(".bal-transaction-service-page-link").removeClass("text-bold-link");
        $(this).addClass("text-bold-link");
        that.backToPage(that, page - 1);
        window.console.log(page - 1);
      });
      // $(document).on('click', '.bycus-next-page', function () {
      $(".bal-transaction-service-next-page").click(function () {
        const page_number = $(this)
          .parent()
          .children(".bal-transaction-service-page-number")
          .find("li")
          .last()
          .data("page");
        window.console.log("bal-transaction-service-page_number", page_number);
        const isPrevious = $(this).attr("title");
        if (isPrevious == "previous") {
          const currectpage = $(".text-bold-link").data("page");

          if (currectpage == 1) {
            return;
          }
          $(".bal-transaction-service-page-link").removeClass("text-bold-link");
          $(`.bal-transaction-service-page-link:eq(${currectpage - 1})`).addClass(
            "text-bold-link"
          );
          that.backToPage(that, currectpage - 2);
          window.console.log("this currectpage back", currectpage - 2);
        } else {
          $(".bal-transaction-service-page-link").removeClass("text-bold-link");
          that.loadTxnItems(that.search);
          $(this)
            .parent()
            .children(".bal-transaction-service-page-number")
            .append(
              `<li class="bal-transaction-service-page-link text-bold-link" style="padding: 6px; padding-bottom: 0px;" data-page="${
                page_number + 1
              }">${page_number + 1}</li>`
            );
        }
        window.console.log("this", page_number + 1);
      });
    },
    itemRetuned(that) {
      let totalRow = 0;
      that.txnItemList.forEach((k) => {
        totalRow += k.length;
      });
      $(".bal-transaction-service-item-returned").text(
        "Items returned (" + totalRow + ")"
      );
    },
    disabledNextPage(value) {
      $(".bal-transaction-service-next-page").prop("disabled", value);
    },
    backToPage(that, index) {
      try {
        const byProduct = that.txnItemList.at(index);
        that.ItemList = byProduct;
        // that.refreshGridData(customer)
        window.console.log("that.txnItemList[index]", byProduct);
      } catch (e) {
        window.console.log("ERROR on backToPage", index);
      }
    },
    onSearch(search) {
      this.txnItemList = [];
      this.loadPage(this);
      this.paging = {};
      this.loadTxnItems(search);
    },
    async loadTxnItems() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.ItemList = [];
          this.params = {
            asOf: this.asOf,
            key: this.paging,
            id: this.id || "",
            start: this.startDate,
            end: this.endDate,
          };
          this.showLoading = true;
          this.disabledNextPage(true);
          itemHandler.txnItem(this.params).then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoading = false;
              const responseData = res.data.data || [];
              const total = res.data.total || 0;
              this.showLoading = false;
              this.ItemList = responseData;
              this.paging = res.data.key;
              window.console.log("key", res.data.key);
              this.txnItemList.push(responseData);

              this.toalVariantBalPerPage = this.ItemList.length;
              this.totalVariantBal = total;

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
    this.loadPage(this);
    this.itemRetuned(this);
    this.disabledNextPage(true);
  },
  watch: {
    // 'id': 'searchTransaction'
  },
};
</script>
<style scoped></style>
