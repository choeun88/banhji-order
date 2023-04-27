<template>
  <v-row>
    <v-col sm="12" cols="12" class="">
      <v-card color="white" class="px-4 no_border" elevation="0">
        <v-row>
          <v-col sm="12" cols="12" class="pt-0">
            <v-row>
              <v-col sm="6" cols="12" class="py-0">
                <h2 class="mb-0 font_20">{{ $t("inventory_adjustment") }}</h2>
                <p class="mb-1">{{ $t("inventory_adjustment_desc") }}</p>
              </v-col>
              <LoadingMe
                :isLoading="showLoading"
                :fullPage="false"
                type="loading"
                :myLoading="true"
              >
              </LoadingMe>
              <v-col sm="6" cols="12" class="py-0">
                <v-btn
                  to="inventory_adjustment"
                  color="primary marginT"
                  class="white--text float-right text-capitalize"
                >
                  {{ $t("new_adjustment") }}
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col sm="12" cols="12" class="pb-0">
                <v-row class="">
                  <v-col sm="4" cols="12" class="py-0">
                    <v-select
                      class="mt-1"
                      :items="dateSorters"
                      v-model="mDateSorter"
                      @change="onSorterChanges"
                      clearable
                      outlined
                      placeholder="ALL"
                    />
                  </v-col>

                  <v-col sm="3" cols="12" class="py-0">
                    <app-datepicker
                      :initialDate="startDate"
                      @emitDate="startDate = $event"
                    />
                  </v-col>

                  <v-col sm="3" cols="12" class="py-0">
                    <app-datepicker
                      :initialDate="endDate"
                      @emitDate="endDate = $event"
                    />
                  </v-col>

                  <v-col sm="1" cols="1" class="pt-1">
                    <v-btn
                      class="btn_search"
                      :loading="loadingSearch"
                      @click="onSearch('Inventory Adjustment')"
                      style="background-color: rgb(237, 241, 245)"
                    >
                      <i
                        class="b-search"
                        style="font-size: 18px; color: #fff !important"
                      />
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row class="">
              <v-col sm="12" cols="12" class="py-0">
                <template>
                  <kendo-datasource
                    ref="inventoryAdjustmentDS"
                    :type="'JSON'"
                    :data="transactions"
                    :server-paging="false"
                  />
                  <kendo-grid
                    id="gridInventoryAdjustment"
                    class="grid-function"
                    :data-source-ref="'inventoryAdjustmentDS'"
                    :editable="false"
                    :groupable="true"
                    :column-menu="true"
                    :noRecords="true"
                    :scrollable-virtual="true"
                  >
                    <!-- <kendo-grid-column
                      :field="'no'"
                      :title="$t('no')"
                      :template="rowNumberTmpl"
                      :width="90"
                      :column-menu="false"
                      :headerAttributes="{
                        style: 'background-color: #EDF1F5;',
                        class: 'text-center',
                      }"
                      :attributes="{ style: 'text-align: center' }"
                    /> -->
                    <kendo-grid-column
                      :field="'transactionDate'"
                      :title="$t('date')"
                      :width="120"
                      :template="'<span>#=kendo.toString(new Date(transactionDate), dateFormat)#</span>'"
                      :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                    />
                    <kendo-grid-column
                      :field="'name'"
                      :attributes="{ class: 'tb_name_td' }"
                      :title="$t('name')"
                      :width="200"
                      :template="'<span>#=name#</span>'"
                      :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                    />
                    <kendo-grid-column
                      :field="'referenceNo'"
                      :title="$t('reference_no')"
                      :width="200"
                      :template="referenceTemplate"
                      :headerAttributes="{
                        style:
                          'background-color: #EDF1F5, color: green !important',
                      }"
                    />
                    <kendo-grid-column
                      :field="'qty'"
                      :title="$t('adjusted_qty')"
                      :width="200"
                      :attributes="{ style: 'text-align: right; ' }"
                      :template="'<span>#=kendo.toString(qty, decimalFormat)#</span>'"
                      :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                    />
                    <kendo-grid-column
                      :field="'exchangeAmount'"
                      :title="$t('adjusted_amount')"
                      :width="200"
                      :attributes="{ style: 'text-align: right; ' }"
                      :template="'<span>#=kendo.toString(exchangeAmount, decimalFormat)#</span>'"
                      :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                    />
                  </kendo-grid>
                </template>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <div style="overflow: auto" class="inventory-adj-list"></div>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { i18n } from "@/i18n";
import kendo from "@progress/kendo-ui";
import LinkTemplate from "@/components/kendo_templates/LinkTemplate";
const $ = kendo.jQuery;
const billingHandler = require("@/scripts/invoice/handler/billingHandler");
import { dataStore } from "@/observable/store";
export default {
  name: "InventoryAdjustmentList",
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
    transactions: [],
    dialogM3: false,
    isLoaded: false,
    paging: {},
    params: {},
    txnInventoryAdjusts: [],
    disabledMe: true,
    action: "",
    segment: "",
  }),
  props: {},
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

          this.startDate = kendo.toString(
            new Date(today.setDate(first)),
            "yyyy-MM-dd"
          );
          today = new Date();
          this.endDate = kendo.toString(
            new Date(today.setDate(last)),
            "yyyy-MM-dd"
          );

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
      let url = `inventory_adjustment_view/${data.id}`;
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
      let ds = this.$refs.inventoryAdjustmentDS.kendoWidget(),
        index = ds.indexOf(dataItem);
      return index + 1;
    },
    onSearch(type) {
      this.action = type;
      this.txnInventoryAdjusts = [];
      this.loadPage(this);
      this.paging = {};
      this.searchTransaction(type);
    },
    // async loadTransactions() {
    //   new Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve("resolved");
    //       this.showLoading = true;
    //       billingHandler.inventoryAdjustmentList().then((res) => {
    //         if (res.data.statusCode === 200) {
    //           this.transactions = res.data.data;
    //         }
    //         this.showLoading = false;
    //       });
    //     }, 10);
    //   });
    // },
    // async searchTransaction(type) {
    //   new Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve("resolved");
    //       this.showLoading = true;
    //       const startDate = this.startDate;
    //       const endDate = this.endDate;
    //       let strFilter = "";
    //       if (type !== "") {
    //         strFilter =
    //           "?start=" + startDate + "&end=" + endDate + "&type=" + type;
    //       } else {
    //         strFilter = "?start=" + startDate + "&end=" + endDate;
    //       }

    //       billingHandler.inventoryAdjustmentList(strFilter).then((res) => {
    //         if (res.data.statusCode === 200) {
    //           // window.console.log('im search', res)
    //           this.transactions = res.data.data;
    //         }
    //         this.showLoading = false;
    //       });
    //     }, 10);
    //   });
    // },
    callback() {
      if (
        this.$route.params !== null &&
        this.$route.params.hasOwnProperty("data")
      ) {
        const data = this.$route.params.data;
        if (data.transactionType === "delete") {
          // this.loadTransactions()
          window.console.log("im changed", this.$route.params);
        }
      }
      window.console.log("im changed", this.$route.params);
    },
    async loadPage(that) {
      $(".inventory-adj-list").html(`
                <label class="label inventory-adj-item-returned">0</label>
                <div style="display: flex; flex-direction: 'row'">
                    <button class="inventory-adj-next-page" title="previous" style="width: 24px; font-size: 19px;"> < </button>
                    <ul class="inventory-adj-page-number" style="display: flex;list-style: none; padding-left: 0px;">
                        <li style="padding: 6px;"  data-page="1" class="inventory-adj-page-link text-bold-link" >1</li>
                    </ul>
                    <button class="inventory-adj-next-page" title="next" style="width: 24px; font-size: 19px;"> > </button>
                </div>
            `);
      $(document).on("click", ".inventory-adj-page-link", function () {
        const page = $(this).data("page");
        $(".inventory-adj-page-link").removeClass("text-bold-link");
        $(this).addClass("text-bold-link");
        that.backToPage(that, page - 1);
        window.console.log(page - 1);
      });
      // $(document).on('click', '.inventory-adj-next-page', function () {
      $(".inventory-adj-next-page").click(function () {
        const page_number = $(this)
          .parent()
          .children(".inventory-adj-page-number")
          .find("li")
          .last()
          .data("page");
        window.console.log("inventory-adj-page_number", page_number);
        const isPrevious = $(this).attr("title");
        if (isPrevious == "previous") {
          const currectpage = $(".text-bold-link").data("page");

          if (currectpage == 1) {
            return;
          }
          $(".inventory-adj-page-link").removeClass("text-bold-link");
          $(`.inventory-adj-page-link:eq(${currectpage - 1})`).addClass(
            "text-bold-link"
          );
          that.backToPage(that, currectpage - 2);
          window.console.log("this currectpage back", currectpage - 2);
        } else {
          $(".inventory-adj-page-link").removeClass("text-bold-link");
          that.params = {
            search: that.search || "",
            type: that.action,
            start: that.startDate,
            end: that.endDate,
            key: that.paging,
          };
          // window.console.log("params", that.params);
          that.searchTransaction(that.action);
          $(this)
            .parent()
            .children(".inventory-adj-page-number")
            .append(
              `<li class="inventory-adj-page-link text-bold-link" style="padding: 6px;" data-page="${
                page_number + 1
              }">${page_number + 1}</li>`
            );
        }
        window.console.log("this", page_number + 1);
      });
    },
    itemRetuned(that) {
      let totalRow = 0;
      that.txnInventoryAdjusts.forEach((k) => {
        totalRow += k.length;
      });
      $(".inventory-adj-item-returned").text(
        "Items returned (" + totalRow + ")"
      );
    },
    disabledNextPage(value) {
      $(".inventory-adj-next-page").prop("disabled", value);
    },
    backToPage(that, index) {
      try {
        window.console.log(
          "Length of txnInventoryAdjusts",
          that.txnInventoryAdjusts.length
        );
        const byCustomer = that.txnInventoryAdjusts.at(index);
        that.transactions = byCustomer;
        // that.refreshGridData(customer)
        window.console.log("that.txnInventoryAdjusts[index]", byCustomer);
      } catch (e) {
        window.console.log("ERROR on backToPage", index);
      }
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
          };
          this.disabledNextPage(true);
          billingHandler.inventoryAdjustmentList(this.params).then((res) => {
            if (res.data.statusCode === 200) {
              this.loadingSearch = false;
              this.showLoading = false;
              // window.console.log("im search", res);
              let responseData = res.data.data || [];
              if (
                this.appType == "Supply" ||
                this.appType == "Marketing" ||
                this.appType == "Service"
              ) {
                let newData = [];
                responseData.forEach((forD) => {
                  if (forD.segment == undefined) {
                    newData.push(forD);
                    return;
                  }
                  if (forD.segment.id != "") {
                    if (forD.segment.id === this.segment.id) {
                      newData.push(forD);
                    }
                  } else {
                    // for old data
                    if (forD.segment.name === this.segment.name) {
                      newData.push(forD);
                    }
                  }
                });
                responseData = newData;
              }
              this.transactions = responseData;
              this.paging = res.data.key;
              // window.console.log("key", res.data.key);
              this.txnInventoryAdjusts.push(responseData);
              if (Object.keys(this.paging).length > 0) {
                this.disabledNextPage(false);
              } else {
                this.disabledNextPage(true);
              }
              this.itemRetuned(this);
              window.console.log(
                "txnInventoryAdjusts",
                this.txnInventoryAdjusts,
                res.data.key
              );
            } else {
              this.loadingSearch = false;
              this.showLoading = false;
            }
          });
        }, 10);
      });
    },
    async loadBizSetting() {
      let bizSetting = localStorage.getItem("@bizSetting");
      let getS = JSON.parse(bizSetting);
      let bizTpe = getS.filter((obj) => {
        return obj.type == dataStore.businessType;
      });
      if (bizTpe.length > 0) {
        this.segment = bizTpe[0].segment;
      }
    },
  },
  async mounted() {
    this.loadPage(this);
    this.itemRetuned(this);
    this.disabledNextPage(true);
    if (
      this.appType == "Supply" ||
      this.appType == "Marketing" ||
      this.appType == "Service"
    ) {
      this.loadBizSetting();
    }
  },
  computed: {
    appType() {
      return dataStore.productType;
    },
  },
  components: {
    LoadingMe: () => import(`@/components/Loading`),
    "app-datepicker": () =>
      import(`@/components/custom_templates/DatePickerComponent`),
  },
};
</script>

<style scoped>
.function_footer {
  padding: 15px;
  display: inline-block;
}

p {
  color: rgba(0, 0, 0, 0.87);
}

.actionBtn {
  height: 47.2px !important;
}

.text_tip {
  font-size: 9px;
  line-height: 10px;
}

@media (max-width: 576px) {
  .marginT {
    margin-top: 15px;
  }
}
</style>
