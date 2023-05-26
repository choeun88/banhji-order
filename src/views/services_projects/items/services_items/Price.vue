<template>
  <v-row>
    <v-col sm="12" cols="12" class="pt-0">
      <h2 class="float-left font_18">{{ $t("service_price") }}</h2>
      <v-dialog persistent v-model="dialogm2" max-width="600px">
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
            <v-card-title>{{ $t("service_price") }}</v-card-title>
            <v-icon @click="(dialogm2 = false), close">close</v-icon>
          </div>
          <v-card-text class="modal_text_content">
            <v-row>
              <v-col sm="6" cols="12" class="pb-0">
                <label>{{ $t("applied_date") }}</label>
                <app-datepicker
                  :initialDate="uomPrice.appliedDate"
                  @emitDate="uomPrice.appliedDate = $event"
                />
              </v-col>
              <v-col sm="6" cols="12" class="pb-0">
                <label class="label">{{ $t("uom") }}</label>
                <v-select
                  class="mt-1"
                  tage="UOM"
                  v-model="uomPrice.uom"
                  :items="uomConversion"
                  item-value="id"
                  item-text="code"
                  return-object
                  outlined
                />
              </v-col>
              <!--                            <v-col sm="12" cols="12" class="py-0"><p class="font_24 mb-0">{{ $t('price_model') }}</p></v-col>-->
              <v-col sm="6" cols="12">
                <label class="label">{{ $t("price_level") }}</label>
                <v-select
                  class="mt-1"
                  tage="Price Level"
                  v-model="uomPrice.priceLevel"
                  :items="priceLevel"
                  :placeholder="$t('price_level')"
                  item-value="id"
                  @change="autoPrice"
                  item-text="name"
                  return-object
                  outlined
                />
              </v-col>
              <v-col sm="4" cols="12">
                <label>{{ $t("price") }} {{ code }}</label>
                <v-row>
                  <v-col sm="4" cols="3" class="mt-1 pt-0 pr-0">
                    <div class="code_text text-bold">{{ amountType }}</div>
                  </v-col>
                  <v-col sm="8" cols="9" class="mt-1 py-0 pl-0 pr-1">
                    <v-text-field
                      class="custom-border"
                      outlined
                      type="number"
                      tage="Price"
                      @change="autoPrice"
                      v-model="uomPrice.value"
                    />
                  </v-col>
                </v-row>
                <v-text-field
                  outlined
                  :disabled="true"
                  type="number"
                  tage="Price"
                  v-model="price"
                />
              </v-col>
              <v-col sm="2" cols="12" class="pl-1">
                <label>{{ $t("base") }} (%)</label>

                <v-text-field
                  class="mt-1"
                  outlined
                  type="number"
                  min="1"
                  @change="autoPrice"
                  max="100"
                  tage="Base"
                  v-model="uomPrice.base"
                />
              </v-col>
              <!--                            <v-col sm="6" cols="12">-->
              <!--                                <label class="label">{{ $t('type') }}</label>-->
              <!--                                <v-select :items="types" item-text="name" item-value="id" v-model="type" class="mt-1"-->
              <!--                                          :placeholder="$t('type')"-->
              <!--                                          :disabled="mPriceLevel.id === undefined"-->
              <!--                                          return-object-->
              <!--                                          outlined/>-->
              <!--                            </v-col>-->
              <v-col v-if="type.id === 3" sm="12" cols="12" class="py-0">
                <label>{{ $t("price") }}</label>
              </v-col>
              <v-col v-if="type.id === 3" sm="4" cols="4" class="pb-1 py-0">
                <v-select
                  v-model="data.type"
                  return-object
                  outlined
                  item-value="id"
                  item-text="name"
                  :items="modes"
                  class=""
                />
              </v-col>
              <v-col v-if="type.id === 3" sm="6" cols="12" class="py-0">
                <v-text-field
                  class=""
                  v-if="type.id === 3"
                  outlined
                  tage="Price"
                  v-model="data.amount"
                  clearable
                />
              </v-col>
              <v-col v-if="type.id === 2" sm="12" cols="12" class="py-0">
                <kendo-datasource
                  ref="volumeDS"
                  :change="dataSourceChanged"
                  :data="volumes"
                />
                <kendo-grid
                  id="gridVolumeDS"
                  class="grid-function"
                  :data-source-ref="'volumeDS'"
                  :editable="true"
                  :scrollable-virtual="true"
                >
                  <kendo-grid-column
                    :field="'isMin'"
                    :title="''"
                    :editor="rowTitle"
                    :width="80"
                    :column-menu="false"
                    :headerTemplate="headerTemplate"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5;',
                      class: 'text-center',
                    }"
                    :attributes="{ style: 'text-align: center' }"
                  />
                  <!--                                    <kendo-grid-column-->
                  <!--                                        :field="'firstUnit'"-->
                  <!--                                        :title="$t('first_unit')"-->
                  <!--                                        :width="100"-->
                  <!--                                        :template="'<span>#=firstUnit#</span>'"-->
                  <!--                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>-->
                  <kendo-grid-column
                    :field="'lastUnit'"
                    :title="$t('last_unit')"
                    :width="100"
                    :editor="LastUnitEditor"
                    :template="'<span>#=lastUnit#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'price'"
                    :title="$t('price')"
                    :width="100"
                    :template="'<span>#=price#</span>'"
                    :headerTemplate="headerPriceTemplate"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="''"
                    :title="$t('action')"
                    :width="70"
                    :command="[
                      {
                        iconClass: 'k-icon k-i-trash',
                        text: 'Delete',
                        click: removeRow,
                      },
                    ]"
                    :headerAttributes="{
                      style: 'text-align: right; background-color: #EDF1F5',
                    }"
                  />
                </kendo-grid>
                <v-btn
                  @click="addRow"
                  class="float-left btn_plus mt-2 rounded-0"
                >
                  <v-icon size="" class="ma-1">mdi-plus</v-icon>
                </v-btn>
              </v-col>
            </v-row>
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
        ref="servicePriceDS"
        :data="priceList"
        :schema="gridSchema"
      />
      <kendo-grid
        id="gridServicePrice"
        class="grid-function"
        :data-source-ref="'servicePriceDS'"
        :style="{ width: '100%' }"
        :noRecords="true"
        :toolbar="toolbarTemplate"
        :excel-file-name="'ServicePriceConversionList.xlsx'"
        :excel-filterable="true"
        :scrollable-virtual="true"
      >
        <kendo-grid-column
          :field="'uom'"
          :title="$t('uom')"
          :width="100"
          :template="uom"
          :groupHeaderColumnTemplate="'#=value#'"
          :headerAttributes="{ style: 'background-color: #EDF1F5' }"
        />
        <kendo-grid-column
          :field="'uom'"
          :title="$t('code')"
          :width="120"
          :template="'<span>#=uom.code#</span>'"
          :groupHeaderColumnTemplate="'#=value#'"
          :headerAttributes="{ style: 'background-color: #EDF1F5' }"
        />
        <kendo-grid-column
          :field="'priceLevel'"
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
        <!--                <kendo-grid-column-->
        <!--                    :field="'types'"-->
        <!--                    :title="$t('price_model')"-->
        <!--                    :width="90"-->
        <!--                    :template="'<span>#=types.name#</span>'"-->
        <!--                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>-->
        <kendo-grid-column
          :field="'price'"
          :title="$t('price')"
          :template="'<span>#=kendo.toString(price || 0, decimalFormat)#</span>'"
          :width="120"
          :attributes="{ style: 'text-align: right; ' }"
          :headerAttributes="{
            style: 'text-align: left; background-color: #EDF1F5',
          }"
        />
        <kendo-grid-column
          :field="'appliedDate'"
          :title="$t('applied_date')"
          :template="formatDate"
          :width="200"
          :headerAttributes="{
            style: 'text-align: left; background-color: #EDF1F5',
          }"
        />
        <kendo-grid-column
          :field="''"
          :title="$t(' ')"
          :width="60"
          :command="[
            { iconClass: 'k-icon k-i-edit', text: ' ', click: goEdit },
          ]"
          :headerAttributes="{
            style: 'text-align: left; background-color: #EDF1F5',
          }"
        />
      </kendo-grid>
    </v-col>
  </v-row>
</template>
<script>
import UOMServicePrice from "@/scripts/model/UOMServicePrice";
import kendo from "@progress/kendo-ui";
import DatePickerComponent from "@/components/custom_templates/DatePickerComponent";
// import ServiceItem from "@/scripts/model/ServiceItem";
import PriceLevelModel from "@/scripts/priceLevel/PriceLevel";
import UOMConversion from "@/scripts/model/UOMConversion";
import { i18n } from "@/i18n";
import Helper from "@/helper";
const uomServiceConversionHandler = require("@/scripts/uomServiceConversionHandler");
const priceLevelHandler = require("@/scripts/priceLevelHandler");
const uomServicePriceHandler = require("@/scripts/uomServicePriceHandler");
const $ = kendo.jQuery;
const uomServicePriceModel = new UOMServicePrice({});
import TaxModel from "@/scripts/model/Tax";
const NATURE = "sale";
export default {
  props: {
    service: {},
  },
  components: {
    "app-datepicker": DatePickerComponent,
    LoadingMe: () => import(`@/components/Loading`),
  },
  data: () => ({
    dialogm2: false,
    showLoading: false,
    uomConversion: [],
    priceList: [],
    priceLevel: [],
    mPriceLevel: [],
    mUOM: {},
    menuDate: false,
    appliedDate: new Date().toISOString().substr(0, 10),
    uomPrice: uomServicePriceModel,
    gridSchema: {
      model: {
        id: "id",
      },
    },
    dateFormat: "dd-MM-yyyy",
    // {id: 2, name: 'Volume Pricing'},
    types: [
      { id: 1, name: "Standard" },
      { id: 3, name: "Performance Based" },
    ],
    type: "Standard",
    modes: [
      { id: 1, name: "%" },
      { id: 2, name: "Amount" },
    ],
    data: { amount: "", type: "" },
    volumes: [],
    minNum: 0,
    price: 0,
  }),
  methods: {
    formatDate(dataItem) {
      if (dataItem.hasOwnProperty("appliedDate")) {
        return kendo.toString(new Date(dataItem.appliedDate), dataItem.dateFormat + ` hh:mm tt`);
      }
      return "";
    },
    excelExport: function (e) {
      // const pivot = this.$refs.gridTransactionDS.kendoWidget()
      // pivot.saveAsExcel()
      window.console.log(e.data);
    },
    initToolbar(that) {
      let grid = $("#gridServicePrice").data("kendoGrid");
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
      const grid = $("#gridServicePrice").data("kendoGrid");
      grid.saveAsExcel();
    },
    toolbarTemplate: function () {
      const templateHtml =
        "<span>" +
        '<a class="k-pager-excel k-link k-button excel" title="Export to Excel"> <span class="k-icon k-i-excel"></span>Export to excel </a>' +
        "</span><span>&nbsp;&nbsp;</span>" +
        '<span style="position:absolute; right:5px">' +
        "</span>" +
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
    autoPrice() {
      let value = 0;
      let uomPrice = this.uomPrice.priceLevel;
      let type = uomPrice.type;
      if (type.name == "Percentage Base") {
        value = this.uomPrice.value / 100 || 0;
      } else {
        value = this.uomPrice.value || 0;
      }
      let base = this.uomPrice.base || 0;
      let price_ = (value * base) / 100;
      if (base > 100) {
        this.uomPrice.base = 100;
        base = 100;
        price_ = (value * base) / 100;
      }
      this.price = price_;
      this.uomPrice.price = price_;
      return price_;
    },
    uom(dataItem) {
      if (dataItem.hasOwnProperty("uom")) {
        if (dataItem.uom.hasOwnProperty("toUOM")) {
          return dataItem.uom.toUOM.name;
        }
      } else {
        return "";
      }
    },
    dataSourceChanged(e) {
      if (e.field) {
        let dataRow = e.items[0];
        switch (e.field) {
          case "lastUnit":
            this.minNum = dataRow.lastUnit;
            break;
          default:
            break;
        }
      }
    },
    LastUnitEditor(container, options) {
      let ds = this.$refs.volumeDS.kendoWidget();
      if (ds.at(0).uid === options.model.uid) {
        this.minNum = -1;
      }

      kendo
        .jQuery('<input required name="' + options.field + '"/>')
        .appendTo(container)
        .kendoNumericTextBox({ min: this.minNum + 1 });
    },
    removeRow(e) {
      e.preventDefault();
      const grid = kendo.jQuery("#gridVolumeDS").data("kendoGrid"),
        dataSource = grid.dataSource,
        dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
      if (dataSource.total() > 1) {
        dataSource.remove(dataItem);
      }
    },
    addRow() {
      let ds = this.$refs.volumeDS.kendoWidget(),
        total = ds.total();
      if (total === 0) {
        ds.insert(total, {
          lastUnit: 0,
          price: "",
        });
      } else {
        ds.insert(total, {
          lastUnit: "",
          price: "",
        });
      }
    },
    headerTemplate() {
      return '<input type="checkbox"/> is Min';
    },
    dynamicHeaderTemplate() {
      const title = "price (" + this.symbol + ")";
      kendo.jQuery("#gridVolumeDS th[data-field=price]").html(title);
      window.console.log(title);
    },
    headerPriceTemplate() {
      return "price (" + this.symbol + ")";
    },
    selectTemplate(dataItem) {
      if (dataItem.isMin) {
        return '<input checked type="checkbox"/>';
      } else {
        return '<input type="checkbox"/>';
      }
    },
    rowTitle(container, options) {
      let ds = this.$refs.volumeDS.kendoWidget();
      if (ds.at(0).uid === options.model.uid) {
        return kendo
          .jQuery('<input type="checkbox" name="' + options.field + '"/>')
          .appendTo(container);
      } else {
        return "";
      }
    },
    onDateChange() {
      this.menuDate = false;
      // window.console.log(this.uomPrice.appliedDate)
    },
    close() {
      // window.history.go(-1)
      this.dialogm2 = false;
    },
    newClick() {
      this.uomPrice = {};
      this.uomPrice.base = 100;
      this.price = 0;
      this.uomPrice.price = 1;
      this.mUOM = {};
      this.volumes = [];
      this.data = { amount: "", type: "" };
      this.uomPrice.appliedDate = new Date().toISOString().substr(0, 10);
      this.mPriceLevel = {};
      if (this.service !== undefined) {
        this.loadConversionList();
      }
    },
    async loadConversionList() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          if (this.service) {
            if (this.service.hasOwnProperty("uom")) {
              uomServiceConversionHandler.get(this.serviceId).then((res) => {
                this.uomConversion = res;
              });
            }
          }
        }, 10);
      });
    },
    async loadUOMPrice() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          if (this.service) {
            if (this.service.hasOwnProperty("uom")) {
              this.showLoading = true;
              uomServicePriceHandler
                .get(this.serviceId, "?type=Service")
                .then((res) => {
                  this.showLoading = false;
                  this.priceList = res;
                });
            }
          }
        }, 10);
      });
    },
    async loadPriceLevel() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          if (this.service) {
            // window.console.log(this.product)
            if (this.service.hasOwnProperty("uom")) {
              const strFilter = "?&nature=" + NATURE;
              priceLevelHandler.get(strFilter).then((res) => {
                this.priceLevel = res;
              });
            }
          }
        }, 10);
      });
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
    async goEdit(e) {
      e.preventDefault();
      let grid = kendo.jQuery("#gridServicePrice").data("kendoGrid");
      let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
      this.uomPrice = new UOMServicePrice(dataItem);
      this.price = dataItem.price;
      window.console.log(this.uomPrice, "val");
      // this.type = dataItem.priceType
      // if (dataItem.data.hasOwnProperty('price')) {
      //     this.data = dataItem.data
      // } else {
      //     this.volumes = dataItem.data
      // }
      // this.mPriceLevel = dataItem.priceLevel
      this.dialogm2 = true;
    },
    async onSaveClose() {
      new Promise((resolve) => {
        // if (this.type.id !== 1) {
        //     if (this.$refs.volumeDS !== undefined) {
        //         let ds = this.$refs.volumeDS.kendoWidget()
        //         let dataRow = ds.data()
        //         if (dataRow.length > 0) {
        //             this.data = dataRow
        //         }
        //     }
        //     this.uomPrice.price = 0
        // } else {
        //     this.data = {}
        // }
        const uom = this.uomPrice.uom || {};
        const uomId = uom.id || "";
        if (uomId === "") {
          this.$snotify.error(i18n.t("uom_required"));
          return;
        }
        const priceLevel = this.uomPrice.priceLevel || {};
        const priceLevelId = priceLevel.id || "";
        if (priceLevelId === "") {
          this.$snotify.error(i18n.t("price_level_required"));
          return;
        }
        const value = this.uomPrice.value || 0;
        if (parseFloat(value) === 0) {
          this.$snotify.error(i18n.t("price_must_be_greater_than_zero"));
          return;
        }
        const base = this.uomPrice.base || 0;
        window.console.log(base, "base");
        if (parseFloat(base) === 0) {
          this.$snotify.error(i18n.t("base_must_be_greater_than_zero"));
          return;
        }
        if (uomId !== "" && priceLevelId !== "" && value > 0 && base > 0) {
          setTimeout(() => {
            resolve("resolved");
            const service_ = this.service
            const uom_ = service_.uom || {}
            const item = {
              id: service_.id,
              category: service_.category,
              costOfGoodsSoldAcc: service_.costOfGoodsSoldAcc,
              revenueAccount: service_.revenueAccount,
              group: service_.group,
              thumb: service_.thumb,
              subGroup: service_.subGroup,
              name: service_.name,
              productId: service_.productId,
              reOrderQty: service_.reOrderQty,
              sku: service_.sku,
              priceLevel: new PriceLevelModel(service_.priceLevel),
              uom: {
                id: uom_.id || '',
                name: uom_.name || '',
                category: uom_.category || {}
              }
            };
            const vatTax = uom.vatTax || {};
            const purchaseTax = uom.purchaseTax || {};
            const specificTax = uom.specificTax || {};
            const otherTax = uom.otherTax || {};
            const publicLightingTax = uom.publicLightingTax || {};
            let data = {
              id: this.uomPrice.id,
              serviceId: this.serviceId,
              uom: new UOMConversion(this.uomPrice.uom),
              vatTax: new TaxModel(vatTax),
              purchaseTax: new TaxModel(purchaseTax),
              specificTax: new TaxModel(specificTax),
              otherTax: new TaxModel(otherTax),
              publicLightingTax: new TaxModel(publicLightingTax),
              priceLevel: new PriceLevelModel(this.uomPrice.priceLevel),
              type: "Service",
              priceType: this.type,
              price: this.price,
              base: this.uomPrice.base,
              value: this.uomPrice.value,
              item: item,
              data: {
                type: this.data.type || '',
                amount: this.data.amount || 0
              },
              appliedDate: this.uomPrice.appliedDate,
              appliedDate_: Helper.toISODate(this.uomPrice.appliedDate),
            };
            window.console.log("data==", data);
            window.console.log("UOM==", JSON.stringify(new UOMConversion(this.uomPrice.uom)));
            window.console.log("Service==", JSON.stringify(item));
            this.showLoading = true;
            uomServicePriceHandler
              .create(this.serviceId, data)
              .then((response) => {
                if (response.data.statusCode === 201) {
                  this.showLoading = false;
                  // let res = response.data.data
                  // const index = this.priceList.findIndex(item => {
                  //   return (res.id === item.id)
                  // })
                  // if (index < 0) {
                  //   if (this.priceList.length === 0) {
                  //     this.priceList = [res]
                  //   } else {
                  //     this.priceList.push(res)
                  //   }
                  //   const grid = kendo.jQuery("#gridPrice").data("kendoGrid");
                  //   grid.refresh()
                  //   window.console.log(res)
                  // } else {
                  //   this.priceList.splice(index, 1, res)
                  // }
                  this.$snotify.success("Success");
                  this.close();
                  this.loadUOMPrice();
                }
              })
              .catch((e) => {
                this.$snotify.error("Something went wrong");
                this.errors.push(e);
              });
          }, 10);
        }
      });
    },
  },
  mounted: async function () {
    this.loadPriceLevel();
    this.loadConversionList();
    this.loadUOMPrice();
    try {
      await this.initToolbar(this);
    } catch (error) {
      window.console.log("Error initToolbar", error);
    }
  },
  watch: {
    service() {
      if (this.service !== undefined) {
        this.loadConversionList();
        this.loadUOMPrice();
        this.loadPriceLevel();
      }
    },
  },
  computed: {
    code() {
      const priceLevel = this.uomPrice.priceLevel || {};
      if (priceLevel) {
        const currency = priceLevel.currency || {};
        const code = currency.code || "";
        if (code) {
          return "(" + code + ")";
        } else {
          return "";
        }
      } else {
        return "";
      }
    },
    amountType() {
      const priceLevel = this.uomPrice.priceLevel || {};
      if (priceLevel) {
        const currency = priceLevel.currency || {};
        const type = priceLevel.type || {};
        const name = type.name || "";
        const code = currency.code || "";
        let strValue = "";
        if (name === "Percentage Base") {
          strValue = "%";
        } else if (name === "Standard") {
          strValue = code || "";
        }
        return strValue;
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
      if (this.service) {
        if (this.service.hasOwnProperty("uom")) {
          return this.service.uom.name;
        } else {
          return "";
        }
      } else {
        return "";
      }
    },
    baseUOM() {
      if (this.service) {
        if (this.service.hasOwnProperty("uom")) {
          return this.service.uom;
        } else {
          return "";
        }
      } else {
        return "";
      }
    },
    serviceId() {
      if (this.service) {
        if (this.service.hasOwnProperty("id")) {
          return this.service.id;
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
