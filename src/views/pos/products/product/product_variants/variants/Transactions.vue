<template>
  <v-row>
    <v-col sm="12" cols="12" class="py-0">
      <v-row class="">
        <!-- <v-col sm="4" cols="12" class="py-0">
                    <v-select class="mt-1"
                              :items="dateSorters"
                              v-model="mDateSorter"
                              @change="onSorterChanges"
                              clearable
                              outlined
                              placeholder="ALL"
                    />
                </v-col> -->
        <v-col sm="5" cols="12" class="py-0">
          <app-datepicker :initialDate="startDate" @emitDate="startDate = $event" />
        </v-col>
        <v-col sm="5" cols="12" class="py-0">
          <app-datepicker :initialDate="endDate" @emitDate="endDate = $event" />
        </v-col>
        <v-col sm="2    " cols="1" class="pt-1">
          <v-btn
            class="btn_search"
            @click="onSearch"
            style="background-color: rgb(237, 241, 245)"
          >
            <i class="b-search" style="font-size: 18px; color: #fff !important" />
          </v-btn>
        </v-col>
      </v-row>
    </v-col>

    <v-col sm="12" cols="12">
      <template>
        <LoadingMe
          :isLoading="showLoading"
          :fullPage="false"
          type="loading"
          :myLoading="true"
        >
        </LoadingMe>
        <kendo-datasource ref="productTxnDS" :data="ItemList" />
        <kendo-grid
          id="gridProductTXN"
          class="grid-function"
          :data-source-ref="'productTxnDS'"
          :sortable="false"
          :groupable="false"
          :filterable="false"
          :column-menu="true"
          :editable="false"
          :resizable="true"
          :style="{ width: '100%' }"
          :noRecords="true"
          :scrollable-virtual="true"
        >
          <kendo-grid-column
            :field="'transactionDate'"
            :title="$t('date')"
            :template="'<span>#=kendo.toString(new Date(transactionDate), dateFormat)#</span>'"
            :width="120"
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
            :template="'<span>#=sku# - #=itemName#</span>'"
            :width="200"
            :hidden="true"
            :headerAttributes="{
              style: 'background-color: #EDF1F5',
            }"
          />

          <kendo-grid-column
            :field="'referenceNo'"
            :title="$t('reference_no')"
            :template="referenceTemplate"
            :width="160"
            :headerAttributes="{
              style: 'background-color: #EDF1F5',
            }"
          />

          <kendo-grid-column
            :field="'qty'"
            :title="$t('qty')"
            :template="'<span>#=kendo.toString(qty, decimalFormat)# #=uom.uom || ``#</span>'"
            :width="150"
            :attributes="{ style: 'text-align: right' }"
            :headerAttributes="{
              style: 'background-color: #EDF1F5',
            }"
          />
          <kendo-grid-column
            :field="'costOrPrice'"
            :title="$t('price')"
            :template="'<span>#=kendo.toString(costOrPrice, decimalFormat)#</span>'"
            :width="150"
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
    <div style="overflow: auto" class="transaction-item"></div>
  </v-row>
</template>
<script>
// import DatePickerComponent from "@/components/custom_templates/DatePickerComponent";
import kendo from "@progress/kendo-ui";
import LinkTemplate from "@/components/kendo_templates/LinkTemplate";
// const billingHandler = require("@/scripts/invoice/handler/billingHandler");
const itemHandler = require("@/scripts/productVariantHandler");
const $ = kendo.jQuery;
export default {
  name: "ProductTXN",
  props: {
    item: {},
  },
  components: {
    LoadingMe: () => import(`@/components/Loading`),
    "app-datepicker": () => import(`@/components/custom_templates/DatePickerComponent`),
  },
  watch: {
    // item() {
    //     if (this.item !== undefined) {
    //         this.showLoading = true
    //         this.searchTransaction()
    //         this.showLoading = false
    //     }
    // },
  },
  computed: {
    id() {
      if (this.item) {
        return this.item.id;
      } else {
        return "";
      }
    },
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
        default:
          this.startDate = "";
          this.endDate = "";
      }
    },
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
      } else if (data.type === "Variant Conversion") {
        url = `variant_conversion_view/${data.id}`;
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
      $(".transaction-item").html(`
                <span class="mt-2 bal-transaction-item-item-returned">0</span><br/>
                <div style="display: flex; flex-direction: 'row'">
                    <button class="bal-transaction-item-next-page" title="previous" style="width: 24px; font-size: 19px; margin-top: -6px;"> < </button>
                    <ul class="bal-transaction-item-page-number page_scroll" style="display: flex;list-style: none; padding-left: 0px;">
                        <li style="padding: 6px; padding-bottom: 0px;"  data-page="1" class="bal-transaction-item-page-link text-bold-link" >1</li>
                    </ul>
                    <button class="bal-transaction-item-next-page" title="next" style="width: 24px; font-size: 19px;margin-top: -6px;"> > </button>
                </div>
            `);
      $(document).on("click", ".bal-transaction-item-page-link", function () {
        const page = $(this).data("page");
        $(".bal-transaction-item-page-link").removeClass("text-bold-link");
        $(this).addClass("text-bold-link");
        that.backToPage(that, page - 1);
        window.console.log(page - 1);
      });
      // $(document).on('click', '.bycus-next-page', function () {
      $(".bal-transaction-item-next-page").click(function () {
        const page_number = $(this)
          .parent()
          .children(".bal-transaction-item-page-number")
          .find("li")
          .last()
          .data("page");
        window.console.log("bal-transaction-item-page_number", page_number);
        const isPrevious = $(this).attr("title");
        if (isPrevious == "previous") {
          const currectpage = $(".text-bold-link").data("page");

          if (currectpage == 1) {
            return;
          }
          $(".bal-transaction-item-page-link").removeClass("text-bold-link");
          $(`.bal-transaction-item-page-link:eq(${currectpage - 1})`).addClass(
            "text-bold-link"
          );
          that.backToPage(that, currectpage - 2);
          window.console.log("this currectpage back", currectpage - 2);
        } else {
          $(".bal-transaction-item-page-link").removeClass("text-bold-link");
          that.loadTxnItems(that.search);
          $(this)
            .parent()
            .children(".bal-transaction-item-page-number")
            .append(
              `<li class="bal-transaction-item-page-link text-bold-link" style="padding: 6px; padding-bottom: 0px;" data-page="${
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
      $(".bal-transaction-item-item-returned").text("Items returned (" + totalRow + ")");
    },
    disabledNextPage(value) {
      $(".bal-transaction-item-next-page").prop("disabled", value);
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
};
</script>
<style scoped></style>
