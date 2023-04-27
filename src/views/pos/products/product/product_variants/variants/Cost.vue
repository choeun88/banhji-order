<template>
  <v-row>
    <v-col sm="12" cols="12" class="pt-0">
      <h2 class="float-left font_18">{{ $t("standard_cost") }}</h2>
      <v-dialog v-model="dialogm2" max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn
            color="primary"
            class="btn_create_new float-right"
            v-on="on"
            @click="newClick"
          >
            {{ $t("new_cost") }}
          </v-btn>
        </template>
        <v-card>
          <div class="modal_header">
            <v-card-title>{{ $t("cost_list") }}</v-card-title>
            <v-icon @click="(dialogm2 = false), close">close</v-icon>
          </div>
          <v-card-text class="modal_text_content">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col sm="6" cols="12">
                  <label>{{ $t("applied_date") }}</label>
                  <app-datepicker
                    :initialDate="standardCost.appliedDate"
                    @onChanged="onDateChange"
                    @emitDate="standardCost.appliedDate = $event"
                  />
                </v-col>
                <v-col sm="6" cols="12">
                  <label class="label">{{ $t("uom") }}</label>
                  <v-select
                    class="mt-1"
                    tage="UOM"
                    v-model="product.uom"
                    :items="[product.uom]"
                    :rules="[(v) => !!v['id'] || $t('is_required')]"
                    item-value="id"
                    item-text="name"
                    return-object
                    outlined
                  />
                  <label>{{ $t("cost") }}</label>
                  <v-row>
                    <v-col sm="3" cols="3" class="mt-1 pt-0 pr-0">
                      <div class="code_text text-bold">{{ code }}</div>
                    </v-col>
                    <v-col sm="9" cols="9" class="mt-1 py-0 pl-0 pr-1">
                      <v-text-field
                        class="custom-border"
                        outlined
                        type="number"
                        :rules="[(v) => !!v || $t('is_required')]"
                        tage="Standard cost"
                        v-model="standardCost.cost"
                        clearable
                      />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions class="modal_footer">
            <v-row>
              <v-col sm="6" cols="6" class="py-0 text-left">
                <v-btn
                  color="black"
                  outlined
                  class="text-capitalize black--text float-left"
                  @click="dialogm2 = false"
                  >{{ $t("cancel") }}
                </v-btn>
              </v-col>
              <v-col sm="6" cols="6" class="py-0 text-right">
                <v-btn
                  color="primary"
                  class="px-3 white--text text-capitalize"
                  @click="onSaveClose"
                >
                  {{ $t("save_close") }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
    <v-col sm="12" clos="12" class="pt-0">
      <div>
        <LoadingMe
          :isLoading="showLoading"
          :fullPage="false"
          type="loading"
          :myLoading="true"
        />
      </div>
      <kendo-datasource
        ref="variantCostDS"
        :data="variantBalanceList"
        :schema="gridSchema"
      />
      <kendo-grid
        id="gridVariantCost"
        class="grid-function"
        :data-source-ref="'variantCostDS'"
        :noRecords="true"
        :toolbar="toolbarTemplate"
        :column-menu="false"
        :resizable="true"
        :sortable="true"
        :groupable="false"
        :style="{ width: '100%' }"
        :scrollable-virtual="true"
      >
        <kendo-grid-column
          :field="'uom.name'"
          :title="$t('uom')"
          :width="100"
          :template="'<span>#=uom.name#</span>'"
          :groupHeaderColumnTemplate="'#=value#'"
          :headerAttributes="{ style: 'background-color: #EDF1F5' }"
        />
        <kendo-grid-column
          :field="'currency.code'"
          :title="$t('currency')"
          :width="150"
          :template="'<span>#=currency.code#</span>'"
          :headerAttributes="{ style: 'background-color: #EDF1F5' }"
        />
        <kendo-grid-column
          :field="'cost'"
          :title="$t('cost')"
          :attributes="{ style: 'text-align: right; ' }"
          :width="150"
          :template="'<span>#= kendo.toString(parseFloat(cost || 0), decimalFormat)#</span>'"
          :headerAttributes="{
            style: 'text-align: left; background-color: #EDF1F5',
          }"
        />
        <kendo-grid-column
          :field="'appliedDate'"
          :title="$t('applied_date')"
          :template="formatDateWithTime"
          :width="180"
          :headerAttributes="{
            style: 'text-align: left; background-color: #EDF1F5',
          }"
        />
        <kendo-grid-column
          :field="''"
          :title="$t('')"
          :width="60"
          :command="[{ iconClass: 'k-icon k-i-edit', text: ' ', click: goEdit }]"
          :headerAttributes="{
            style: 'text-align: left; background-color: #EDF1F5',
          }"
        />
      </kendo-grid>
    </v-col>
    <div style="overflow: auto" class="standard-cost-center"></div>
  </v-row>
</template>
<script>
import StandardCostModel from "@/scripts/standard-cost/StandardCost";
import kendo from "@progress/kendo-ui";
import Helper from "@/helper";
// const uomConversionHandler = require("@/scripts/uomConversionHandler");
// const priceLevelHandler = require("@/scripts/priceLevelHandler");
const uomPriceHandler = require("@/scripts/uomPriceHandler");
// const settingHandler = require("@/scripts/settingsHandler");
const $ = kendo.jQuery;
const standardCostModel = new StandardCostModel({});
export default {
  props: {
    product: {},
  },
  components: {
    "app-datepicker": () => import(`@/components/custom_templates/DatePickerComponent`),
    LoadingMe: () => import(`@/components/Loading`),
  },
  data: () => ({
    dialogm2: false,
    showLoading: false,
    valid: true,
    uomConversion: [],
    priceList: [],
    // mUOM: {},
    menuDate: false,
    standardCost: standardCostModel,
    gridSchema: {
      model: {
        id: "id",
      },
    },
    dateFormat: "dd-MM-yyyy",
    code: standardCostModel.currency.code,

    txnVariantBalance: [],
    variantBalanceList: [],
    paging: {},
    totalVariantBal: 0,
    totalVariantBalPerPage: 0,
  }),
  methods: {
    formatDateWithTime(dataItem) {
      return kendo.toString(
        new Date(dataItem.appliedDate),
        `${dataItem.dateFormat} h:mm tt`
      );
    },
    excelExport: function (e) {
      // const pivot = this.$refs.gridTransactionDS.kendoWidget()
      // pivot.saveAsExcel()
      window.console.log(e.data);
    },
    initToolbar(that) {
      let grid = $("#gridVariantCost").data("kendoGrid");
      let gridElement = grid.element;
      let toolbarElement = gridElement.find(".k-grid-toolbar");
      toolbarElement.on("click", ".k-pager-refresh", function (e) {
        e.preventDefault();
        onReloadData(that);
      });
      toolbarElement.on("click", ".k-pager-excel", function (e) {
        e.preventDefault();
        onExportExcel(that);
      });

      function onReloadData(that) {
        that.onSearch();
      }

      function onExportExcel(that) {
        that.exportToExcel();
      }
    },
    exportToExcel() {
      const grid = $("#gridVariantCost").data("kendoGrid");
      grid.saveAsExcel();
    },
    toolbarTemplate: function () {
      const templateHtml =
        // "<span>" +
        // '<a class="k-pager-excel k-link k-button excel" title="Export to Excel"> <span class="k-icon k-i-excel"></span>Export to excel </a>' +
        // "</span><span>&nbsp;&nbsp;</span>" +
        // '<span style="position:absolute; right:5px">' +
        // "</span>" +
        "<span>" +
        '<a class="k-pager-refresh k-link k-button reload" title="Refresh"><span class="k-icon k-i-reload"></span> Refresh </a>' +
        "</span>";

      return kendo.template(templateHtml);
    },
    onDateChange() {
      const a = Helper.toISODate(this.standardCost.appliedDate);
      window.console.log(a);
    },
    close() {
      // window.history.go(-1)
      this.dialogm2 = false;
    },
    newClick() {
      this.standardCost = {};
      // this.mUOM = this.product.uom || {}
      this.standardCost.appliedDate = new Date().toISOString();
      // if (this.product !== undefined) {
      //   // this.loadConversionList();
      // }
    },

    async loadStandardCost() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          if (this.variantId) {
            this.params = {
              key: this.paging,
              id: this.variantId || "",
            };
            this.showLoading = true;
            this.disabledNextPage(true);
            uomPriceHandler.standardCost(this.params).then((res) => {
              if (res.data.statusCode === 200) {
                this.showLoading = false;
                const responseData = res.data.data || [];
                const total = res.data.total || 0;
                this.showLoading = false;
                this.variantBalanceList = responseData;
                this.paging = res.data.key;
                window.console.log("key", res.data.key);
                this.txnVariantBalance.push(responseData);

                this.totalVariantBalPerPage = this.txnVariantBalance.length;
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
          }
        }, 10);
      });
    },
    async goEdit(e) {
      e.preventDefault();
      const grid = kendo.jQuery("#gridVariantCost").data("kendoGrid");
      const dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
      this.standardCost = new StandardCostModel(dataItem);
      // const uom = dataItem.uom || {};
      // this.mUOM = uom
      // this.mPriceLevel = dataItem.priceLevel;
      this.dialogm2 = true;
      window.console.log(this.standardCost, "val");
    },
    mappingUOMConversion(uomConversion, id) {
      try {
        const uom_ = uomConversion.filter((m) => m.id === id);
        if (uom_.length > 0) {
          return uom_[0];
        }
        return {};
      } catch (error) {
        return {};
      }
    },
    async onSaveClose() {
      if (!this.$refs.form.validate()) {
        this.$refs.form.validate();
        return;
      }
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          if (this.product) {
            const currency = this.standardCost.currency || {};
            const uom = this.product.uom || {};
            const data = {
              id: this.standardCost.id,
              itemId: this.variantId,
              uom: {
                id: uom.id || "",
                name: uom.name || "",
              },
              cost: this.standardCost.cost,
              currency: {
                code: currency.code || "",
                name: currency.name || "",
              },
              type: "Variant",
              product: {
                id: this.product.id || "",
                name: this.product.name || "",
                sku: this.product.sku || "",
              },
              // item: item,
              appliedDate: Helper.toISODate(this.standardCost.appliedDate),
            };
            const postData = new StandardCostModel(data);
            window.console.log(postData, postData);
            this.showLoading = true;
            uomPriceHandler
              .standardCostAdd(postData)
              .then((response) => {
                if (response.data.statusCode === 201) {
                  this.showLoading = false;
                  this.onSearch();
                  this.$snotify.success("Success");
                  this.close();
                }
              })
              .catch((e) => {
                this.showLoading = false;
                this.$snotify.error("Something went wrong");
                this.errors.push(e);
              });
          }
        }, 50);
      });
    },
    async loadPage(that) {
      $(".standard-cost-center").html(`
                <span class="mt-2 bal-standard-cost-center-item-returned">0</span><br/>
                <div style="display: flex; flex-direction: 'row'">
                    <button class="bal-standard-cost-center-next-page" title="previous" style="width: 24px; font-size: 19px; margin-top: -6px;"> < </button>
                    <ul class="bal-standard-cost-center-page-number page_scroll" style="display: flex;list-style: none; padding-left: 0px;">
                        <li style="padding: 6px; padding-bottom: 0px;"  data-page="1" class="bal-standard-cost-center-page-link text-bold-link" >1</li>
                    </ul>
                    <button class="bal-standard-cost-center-next-page" title="next" style="width: 24px; font-size: 19px;margin-top: -6px;"> > </button>
                </div>
            `);
      $(document).on("click", ".bal-standard-cost-center-page-link", function () {
        const page = $(this).data("page");
        $(".bal-standard-cost-center-page-link").removeClass("text-bold-link");
        $(this).addClass("text-bold-link");
        that.backToPage(that, page - 1);
        window.console.log(page - 1);
      });
      // $(document).on('click', '.bycus-next-page', function () {
      $(".bal-standard-cost-center-next-page").click(function () {
        const page_number = $(this)
          .parent()
          .children(".bal-standard-cost-center-page-number")
          .find("li")
          .last()
          .data("page");
        window.console.log("bal-standard-cost-center-page_number", page_number);
        const isPrevious = $(this).attr("title");
        if (isPrevious == "previous") {
          const currectpage = $(".text-bold-link").data("page");

          if (currectpage == 1) {
            return;
          }
          $(".bal-standard-cost-center-page-link").removeClass("text-bold-link");
          $(`.bal-standard-cost-center-page-link:eq(${currectpage - 1})`).addClass(
            "text-bold-link"
          );
          that.backToPage(that, currectpage - 2);
          window.console.log("this currectpage back", currectpage - 2);
        } else {
          $(".bal-standard-cost-center-page-link").removeClass("text-bold-link");
          that.loadStandardCost();
          $(this)
            .parent()
            .children(".bal-standard-cost-center-page-number")
            .append(
              `<li class="bal-standard-cost-center-page-link text-bold-link" style="padding: 6px; padding-bottom: 0px;" data-page="${
                page_number + 1
              }">${page_number + 1}</li>`
            );
        }
        window.console.log("this", page_number + 1);
      });
    },
    itemRetuned(that) {
      let totalRow = 0;
      that.txnVariantBalance.forEach((k) => {
        totalRow += k.length;
      });
      $(".bal-standard-cost-center-item-returned").text(
        "Items returned (" + totalRow + ")"
      );
    },
    disabledNextPage(value) {
      $(".bal-standard-cost-center-next-page").prop("disabled", value);
    },
    backToPage(that, index) {
      try {
        const byProduct = that.txnVariantBalance.at(index);
        that.variantBalanceList = byProduct;
        // that.refreshGridData(customer)
        window.console.log("that.txnVariantBalance[index]", byProduct);
      } catch (e) {
        window.console.log("ERROR on backToPage", index);
      }
    },
    onSearch() {
      this.txnVariantBalance = [];
      this.loadPage(this);
      this.paging = {};
      this.loadStandardCost();
    },
    // async loadInstitutes() {
    //   settingHandler.institutes().then((res) => {
    //     window.console.log("institutes", res.data);
    //   });
    // },
  },
  mounted: async function () {
    // this.loadPriceLevel();
    // this.loadConversionList();
    this.loadStandardCost();
    this.initToolbar(this);
    // this.loadInstitutes()
    this.loadPage(this);
    this.itemRetuned(this);
    this.disabledNextPage(true);
  },
  watch: {
    product() {
      if (this.product !== undefined) {
        this.showLoading = true;
        // this.loadConversionList();
        // this.loadStandardCost();
        this.onSearch();
        this.showLoading = false;
      }
    },
  },
  computed: {
    dateFormatted() {
      return this.standardCost.appliedDate
        ? kendo.toString(new Date(this.standardCost.appliedDate), this.dateFormat)
        : "";
    },
    baseUOMName() {
      if (this.product) {
        if (this.product.hasOwnProperty("uom")) {
          return this.product.uom.name;
        } else {
          return "";
        }
      } else {
        return "";
      }
    },
    baseUOM() {
      if (this.product) {
        if (this.product.hasOwnProperty("uom")) {
          return this.product.uom;
        } else {
          return "";
        }
      } else {
        return "";
      }
    },
    variantId() {
      if (this.product) {
        if (this.product.hasOwnProperty("id")) {
          return this.product.id;
        } else {
          return "";
        }
      } else {
        return "";
      }
    },
  },
};
</script>
