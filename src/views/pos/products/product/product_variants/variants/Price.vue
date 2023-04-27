<template>
  <v-row>
    <v-col sm="12" cols="12" class="pt-0">
      <h2 class="float-left font_18">{{ $t("variants_price") }}</h2>
      <v-dialog v-model="dialogm2" max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn
            color="primary"
            class="btn_create_new float-right"
            v-on="on"
            @click="newClick"
          >
            {{ $t("new_price") }}
          </v-btn>
        </template>
        <v-card>
          <div class="modal_header">
            <v-card-title>{{ $t("price_list") }}</v-card-title>
            <v-icon @click="(dialogm2 = false), close">close</v-icon>
          </div>
          <v-card-text class="modal_text_content">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col sm="6" cols="12">
                  <label>{{ $t("applied_date") }}</label>
                  <app-datepicker
                    :initialDate="uomPrice.appliedDate"
                    @onChanged="onDateChange"
                    @emitDate="uomPrice.appliedDate = $event"
                  />
                  <label class="label">{{ $t("price_level") }}</label>
                  <v-select
                    class="mt-1"
                    tage="Price Level"
                    v-model="mPriceLevel"
                    :items="priceLevel"
                    :rules="[(v) => !!v['id'] || $t('is_required')]"
                    item-value="id"
                    item-text="name"
                    return-object
                    outlined
                  />
                </v-col>
                <v-col sm="6" cols="12">
                  <label class="label">{{ $t("uom") }}</label>
                  <v-select
                    class="mt-1"
                    tage="UOM"
                    v-model="mUOM"
                    :items="uomConversion"
                    :rules="[(v) => !!v['id'] || $t('is_required')]"
                    item-value="id"
                    item-text="code"
                    return-object
                    clearable
                    outlined
                  />
                  <label>{{ $t("price") }}</label>
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
                        tage="Price"
                        v-model="uomPrice.price"
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
      <kendo-datasource ref="variantPriceDS" :data="priceList" :schema="gridSchema" />
      <kendo-grid
        id="gridVariantPrice"
        class="grid-function"
        :data-source-ref="'variantPriceDS'"
        :noRecords="true"
        :toolbar="toolbarTemplate"
        :scrollable-virtual="true"
      >
        <kendo-grid-column
          :field="'uom'"
          :title="$t('uom')"
          :width="100"
          :template="'<span>#=uom.toUOM.name#</span>'"
          :groupHeaderColumnTemplate="'#=value#'"
          :headerAttributes="{ style: 'background-color: #EDF1F5' }"
        />
        <kendo-grid-column
          :field="'uom.code'"
          :title="$t('code')"
          :width="120"
          :template="'<span>#=uom.code#</span>'"
          :groupHeaderColumnTemplate="'#=value#'"
          :headerAttributes="{ style: 'background-color: #EDF1F5' }"
        />
        <kendo-grid-column
          :field="'priceLevel.name'"
          :title="$t('price_level')"
          :width="150"
          :template="'<span>#=priceLevel.name#</span>'"
          :headerAttributes="{ style: 'background-color: #EDF1F5' }"
        />
        <kendo-grid-column
          :field="'priceLevel.currency'"
          :title="$t('currency')"
          :width="120"
          :template="currency"
          :headerAttributes="{ style: 'background-color: #EDF1F5' }"
        />
        <kendo-grid-column
          :field="'price'"
          :title="$t('price')"
          :template="'<span>#=kendo.toString(price || 0, decimalFormat)#</span>'"
          :attributes="{ style: 'text-align: right; ' }"
          :width="120"
          :headerAttributes="{
            style: 'text-align: left; background-color: #EDF1F5',
          }"
        />
        <kendo-grid-column
          :field="'appliedDate'"
          :title="$t('applied_date')"
          :template="formatDateWithTime"
          :width="200"
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
  </v-row>
</template>
<script>
import UOMPrice from "@/scripts/model/UOMPrice";
// import UOMConversionPrice from "@/scripts/model/UOMConversion"
import kendo from "@progress/kendo-ui";
import Helper from "@/helper";
import TaxModel from "@/scripts/model/Tax";
const uomConversionHandler = require("@/scripts/uomConversionHandler");
const priceLevelHandler = require("@/scripts/priceLevelHandler");
const uomPriceHandler = require("@/scripts/uomPriceHandler");
const $ = kendo.jQuery;
let uomPriceModel = new UOMPrice({});

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
    priceLevel: [],
    mPriceLevel: [],
    mUOM: {},
    menuDate: false,
    uomPrice: uomPriceModel,
    gridSchema: {
      model: {
        id: "id",
      },
    },
    dateFormat: "dd-MM-yyyy",
  }),
  methods: {
    formatDateWithTime(dataItem) {
      return kendo.toString(new Date(dataItem.appliedDate), `${dataItem.dateFormat} hh:mm tt`);
    },
    excelExport: function (e) {
      // const pivot = this.$refs.gridTransactionDS.kendoWidget()
      // pivot.saveAsExcel()
      window.console.log(e.data);
    },
    initToolbar(that) {
      let grid = $("#gridVariantPrice").data("kendoGrid");
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
        that.loadUOMPrice();
      }

      function onExportExcel(that) {
        that.exportToExcel();
      }
    },
    exportToExcel() {
      const grid = $("#gridVariantPrice").data("kendoGrid");
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
    currency(dataItem) {
      const priceLevel = dataItem.priceLevel || {};
      const currency = priceLevel.currency || {};
      const code = currency.code || "";
      return code;
    },
    onDateChange() {
      const a = Helper.toISODate(this.uomPrice.appliedDate);
      window.console.log(a);
    },
    close() {
      // window.history.go(-1)
      this.dialogm2 = false;
    },
    newClick() {
      this.uomPrice = {};
      this.mUOM = {};
      this.uomPrice.appliedDate_ = "";
      this.uomPrice.appliedDate = new Date().toISOString().substring(0, 10);
      this.mPriceLevel = {};
      if (this.product !== undefined) {
        this.loadConversionList();
      }
    },
    async loadConversionList() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          if (this.product) {
            if (this.product.hasOwnProperty("uom")) {
              this.showLoading = true;
              uomConversionHandler.get(this.variantId).then((res) => {
                this.showLoading = false;
                this.uomConversion = res;
              });
            }
          }
        }, 50);
      });
    },
    async loadUOMPrice() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          if (this.product) {
            if (this.product.hasOwnProperty("uom")) {
              this.showLoading = true;
              uomPriceHandler.get(this.variantId).then((res) => {
                this.showLoading = false;
                this.priceList = res;
              });
            }
          }
        }, 50);
      });
    },
    async loadPriceLevel() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          if (this.product) {
            // window.console.log(this.product)
            const strFilter = "?nature=sale";
            if (this.product.hasOwnProperty("uom")) {
              priceLevelHandler.get(strFilter).then((res) => {
                const data = res || [];
                this.priceLevel = data.filter((n) => n.type.name === "Standard");
              });
            }
          }
        }, 50);
      });
    },
    async goEdit(e) {
      e.preventDefault();
      const grid = kendo.jQuery("#gridVariantPrice").data("kendoGrid");
      const dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
      // window.console.log(dataItem, 'dataItem')
      // this.uomPrice = {
      //   appliedDate: dataItem.appliedDate || '',
      //   id: dataItem.id || '',
      //   price: dataItem.price || 0,
      //   priceLevel: dataItem.priceLevel || {},
      //   priceType: dataItem.priceType || {},
      //   uom: dataItem.uom || {}
      // }
      this.uomPrice = new UOMPrice(dataItem);
      const uom = dataItem.uom || {};
      this.mUOM = this.mappingUOMConversion(this.uomConversion, uom.id);

      this.mPriceLevel = dataItem.priceLevel;
      this.dialogm2 = true;
      window.console.log(this.uomPrice, "val");
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
            const itm = this.product;
            const uom = this.mUOM || {};

            const vatTax = uom.vatTax || {};
            const purchaseTax = uom.purchaseTax || {};
            const specificTax = uom.specificTax || {};
            const otherTax = uom.otherTax || {};
            const publicLightingTax = uom.publicLightingTax || {};
            const uom_ = itm.uom || {}
            const item = {
              id: itm.id,
              barcode: itm.barcode,
              images: itm.images,
              name: itm.name,
              product: itm.product,
              productId: itm.productId,
              reOrderQty: itm.reOrderQty,
              sku: itm.sku,
              uom: {
                id: uom_.id || '',
                name: uom_.name || '',
                category: uom_.category || {}
              },
              variant: itm.variant,
            };
            const data = {
              id: this.uomPrice.id,
              itemId: this.variantId,
              vatTax: new TaxModel(vatTax),
              purchaseTax: new TaxModel(purchaseTax),
              specificTax: new TaxModel(specificTax),
              otherTax: new TaxModel(otherTax),
              publicLightingTax: new TaxModel(publicLightingTax),
              uom: {
                conversionRate: this.mUOM.conversionRate,
                fromUOM: this.mUOM.fromUOM,
                id: this.mUOM.id,
                code: this.mUOM.code || "",
                rate: this.mUOM.rate,
                isSystem: this.mUOM.isSystem,
                toUOM: this.mUOM.toUOM,
              },
              priceLevel: {
                code: this.mPriceLevel.code,
                id: this.mPriceLevel.id,
                name: this.mPriceLevel.name,
                currency: this.mPriceLevel.currency,
                type: this.mPriceLevel.type,
              },
              price: this.uomPrice.price,
              type: "Variant",
              item: item,
              appliedDate: new Date(this.uomPrice.appliedDate)
                .toISOString()
                .substring(0, 10),
              appliedDate_: Helper.toISODate(this.uomPrice.appliedDate),
            };
            // window.console.log('JSON.stringify(item)', item)
            this.showLoading = true;
            uomPriceHandler
              .create(this.variantId, data)
              .then((response) => {
                if (response.data.statusCode === 201) {
                  this.showLoading = false;
                  this.loadUOMPrice();
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
  },
  mounted: async function () {
    this.loadPriceLevel();
    this.loadConversionList();
    this.loadUOMPrice();
    this.initToolbar(this);
  },
  watch: {
    product() {
      if (this.product !== undefined) {
        this.showLoading = true;
        this.loadConversionList();
        this.loadUOMPrice();
        this.showLoading = false;
      }
    },
  },
  computed: {
    code() {
      if (this.mPriceLevel) {
        if (this.mPriceLevel.hasOwnProperty("currency")) {
          const currency = this.mPriceLevel.currency;
          if (currency.hasOwnProperty("code")) {
            return currency.code;
          } else {
            return "";
          }
        } else {
          return "";
        }
      } else {
        return "";
      }
    },
    dateFormatted() {
      return this.uomPrice.appliedDate
        ? kendo.toString(new Date(this.uomPrice.appliedDate), this.dateFormat)
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
