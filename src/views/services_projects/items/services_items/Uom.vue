<template>
  <v-row>
    <v-col sm="12" cols="12" class="pt-0">
      <h2 class="float-left font_18">{{ $t("unit_of_measure") }}</h2>
      <v-dialog persistent v-model="dialogm2" max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn
            color="primary"
            class="btn_create_new float-right"
            v-on="on"
            @click="newClick"
          >
            {{ $t("new_uom") }}
          </v-btn>
        </template>
        <v-card>
          <div class="modal_header">
            <v-card-title>{{ $t("service_uom") }}</v-card-title>
            <v-icon @click="dialogm2 = false">close</v-icon>
          </div>
          <v-card-text class="modal_text_content">
            <v-row>
              <v-col sm="6" cols="12">
                <p>{{ $t("base") }} UOM</p>
                <p class="text-bold">{{ baseUOMName }}</p>
                <p>{{ $t("the_conversion_uom") }}</p>
              </v-col>
              <v-col sm="6" cols="12">
                <label class="label">{{ $t("new_uom") }}</label>
                <p class="text_tip">{{ $t("1_day_base_uom") }}</p>
                <v-select
                  class=""
                  tage="UOM"
                  v-model="mUOM"
                  :items="uom"
                  item-value="id"
                  item-text="name"
                  @change="onUOMChanged"
                  return-object
                  outlined
                />

                <label>{{ $t("code") }}</label>
                <v-text-field
                  class="my-2"
                  outlined
                  v-model="uomConversion.code"
                  tage="rate"
                  :disabled="true"
                  clearable
                />
                <label>{{ $t("rate") }}</label>
                <v-text-field
                  class="my-2"
                  outlined
                  v-model="uomConversion.rate"
                  type="number"
                  tage="rate"
                  clearable
                />
                <p class="text_tip">{{ $t("conversion_rate") }}</p>
                <label> {{ conversionUOM }}</label>
              </v-col>
            </v-row>
            <v-row class="mt-4">
              <v-col sm="2" cols="12" class="py-0 pl-0">
                <v-radio-group
                  class="mt-0"
                  v-model="uomConversion.type"
                  @change="onUOMTypeChanged"
                  :mandatory="false"
                >
                  <v-col
                    sm="3"
                    cols="2"
                    class="pa-0 ml-2 mb-3"
                    style="line-height: 40px"
                  >
                    <v-radio :label="$t('non_tax')" value="1" color="blue" />
                  </v-col>
                  <v-col
                    sm="3"
                    cols="2"
                    class="pa-0 ml-2 mb-3"
                    style="line-height: 40px"
                  >
                    <v-radio :label="$t('tax')" value="2" color="blue" />
                  </v-col>
                </v-radio-group>
              </v-col>
              <v-col sm="5" cols="12" class="py-0">
                <label class="label">{{ $t("vat") }}</label>
                <v-select
                  class="mt-1"
                  tage="Default Tax"
                  v-model="uomConversion.vatTax"
                  :items="vat"
                  @change="onVatTaxChanged"
                  item-value="id"
                  item-text="defaultTax"
                  return-object
                  outlined
                />
                <label class="label">{{ $t("purchase_tax") }}</label>
                <v-select
                  class="mt-1"
                  tage="Default Tax"
                  v-model="uomConversion.purchaseTax"
                  :items="purchaseTax"
                  item-value="id"
                  item-text="defaultTax"
                  return-object
                  outlined
                />
                <label class="label">{{ $t("public_lighting_tax") }}</label>
                <v-select
                  class="mt-1"
                  tage="Default Tax"
                  v-model="uomConversion.publicLightingTax"
                  :items="publicLightingTax"
                  item-value="id"
                  item-text="defaultTax"
                  return-object
                  outlined
                />
              </v-col>
              <v-col sm="5" cols="12" class="py-0">
                <label class="label">{{ $t("specific_tax") }}</label>
                <v-select
                  class="mt-1"
                  tage="Special Tax"
                  v-model="uomConversion.specificTax"
                  :items="specificTax"
                  item-value="id"
                  item-text="defaultTax"
                  return-object
                  outlined
                />
                <label class="label">{{ $t("other_tax") }}</label>
                <v-select
                  class="mt-1"
                  tage="Other Tax"
                  v-model="uomConversion.otherTax"
                  :items="otherTax"
                  item-value="id"
                  item-text="defaultTax"
                  return-object
                  outlined
                />
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
      <LoadingMe
        :isLoading="showLoading"
        :fullPage="false"
        type="loading"
        :myLoading="true"
      >
      </LoadingMe>
      <kendo-datasource
        ref="uomServiceDS"
        :data="uomServiceConversion"
        :schema="gridSchema"
      />
      <kendo-grid
        id="gridServiceUOM"
        class="grid-function"
        :data-source-ref="'uomServiceDS'"
        :style="{ width: '100%' }"
        :noRecords="true"
        :toolbar="toolbarTemplate"
        :excel-export="excelExport"
        :excel-file-name="'uomConversionList.xlsx'"
        :scrollable-virtual="true"
      >
        <kendo-grid-column
          :field="'toUOM'"
          :title="$t('uom')"
          :width="100"
          :template="'<span>#=toUOM.name#</span>'"
          :groupHeaderColumnTemplate="'#=value#'"
          :headerAttributes="{ style: 'background-color: #EDF1F5' }"
        />
        <kendo-grid-column
          :field="'code'"
          :title="$t('code')"
          :width="100"
          :template="'<span>#=code || ``#</span>'"
          :groupHeaderColumnTemplate="'#=value#'"
          :headerAttributes="{ style: 'background-color: #EDF1F5' }"
        />
        <kendo-grid-column
          :field="'rate'"
          :title="$t('rate')"
          :width="80"
          :template="'<span>#=rate#</span>'"
          :attributes="{ style: 'text-align: right; ' }"
          :headerAttributes="{ style: 'background-color: #EDF1F5' }"
        />
        <kendo-grid-column
          :field="'conversionRate'"
          :title="$t('conversion_rate')"
          :attributes="{ style: 'text-align: right; ' }"
          :template="'<span>#=conversionRate#</span>'"
          :width="150"
          :headerAttributes="{
            style: 'text-align: left; background-color: #EDF1F5',
          }"
        />
        <kendo-grid-column
          :field="''"
          :title="$t('action')"
          :width="70"
          :command="[
            {
              text: $t('edit'),
              click: goEdit,
              // className: 'k-state-disabled isSystem'
            },
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
import UOMConversion from "@/scripts/model/UOMConversion";

const uomHandler = require("@/scripts/uomHandler");
const uomServiceConversionHandler = require("@/scripts/uomServiceConversionHandler");
const $ = kendo.jQuery;
import kendo from "@progress/kendo-ui";
import settingHandler from "@/scripts/settingHandler";
import TaxModel from "@/scripts/model/Tax";

let uomConversionModel = new UOMConversion({});
import JSZip from "jszip";

window.JSZip = JSZip;
export default {
  props: {
    service: {},
  },
  components: {
    LoadingMe: () => import(`@/components/Loading`),
  },
  data: () => ({
    dialogm2: false,
    uom: [],
    uoms: [],
    mUOM: {},
    mBaseUOM: {},
    uomServiceConversion: [],
    uomName: "",
    gridSchema: {
      model: {
        id: "id",
      },
    },
    showLoading: false,
    uomConversion: uomConversionModel,
    tax: [],
    vat: [],
    purchaseTax: [],
    publicLightingTax: [],
    otherTax: [],
    specificTax: [],
  }),
  methods: {
    excelExport: function (e) {
      // const pivot = this.$refs.gridTransactionDS.kendoWidget()
      // pivot.saveAsExcel()
      window.console.log(e.data);
    },
    initToolbar(that) {
      let grid = $("#gridServiceUOM").data("kendoGrid");
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
        that.loadUOMServiceConversion();
      }

      function onExportExcel(that) {
        that.exportToExcel();
      }
    },
    exportToExcel() {
      const grid = $("#gridServiceUOM").data("kendoGrid");
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
    onUOMTypeChanged() {
        window.console.log('onUOMTypeChanged name', this.mUOM)
      if (this.mUOM) {
        const name = this.mUOM.name || "";
        const type = this.uomConversion.type || 1;
        window.console.log('onUOMTypeChanged name', name)
        if (parseInt(type) === 1) {
          this.uomConversion.code = name;
        } else if (parseInt(type) === 2) {
          const vatTax = this.uomConversion.vatTax || {};
          const taxType = vatTax.baseAmount || "";
          let shortText = "";
          if (taxType.includes("Net")) {
            shortText = "NET";
          } else if (taxType.includes("inclusive")) {
            shortText = "INC";
          }
          this.uomConversion.code = name + "/T/" + shortText;
        }
      } else {
        this.uomConversion.code = "";
      }
      this.onVatTaxChanged();
    },
    onVatTaxChanged() {
      try {
        const vatTax = this.uomConversion.vatTax || {};
        const taxType = vatTax.baseAmount.toLowerCase();
        this.specificTax = this.tax.filter(
          (m) => m.taxType.typeId === 8 && m.transactionType === "Sale"
        ); //specific tax
        this.purchaseTax = this.tax.filter(
          (m) => m.taxType.typeId === 1 && m.transactionType === "Purchase"
        );
        this.otherTax = this.tax.filter(
          (m) => m.taxType.typeId === 7 && m.transactionType === "Sale"
        ); // Other tax
        this.publicLightingTax = this.tax.filter(
          (m) =>
            (m.taxType.typeId === 9 || m.taxType.typeId === 10) &&
            m.transactionType === "Sale"
        );
        this.purchaseTax = this.purchaseTax.filter(
          (k) => k.baseAmount.toLowerCase() === taxType
        );
        this.publicLightingTax = this.publicLightingTax.filter(
          (k) => k.baseAmount.toLowerCase() === taxType
        );
        this.otherTax = this.otherTax.filter(
          (k) => k.baseAmount.toLowerCase() === taxType
        );
        this.specificTax = this.specificTax.filter(
          (k) => k.baseAmount.toLowerCase() === taxType
        );

        if (this.mUOM) {
          const name = this.mUOM.name || "";
          const type = this.uomConversion.type || 1;
          if (parseInt(type) === 1) {
            this.uomConversion.code = name;
          } else if (parseInt(type) === 2) {
            const vatTax = this.uomConversion.vatTax || {};
            const taxType = vatTax.baseAmount || "";
            let shortText = "";
            if (taxType.includes("Net")) {
              shortText = "NET";
            } else if (taxType.includes("inclusive")) {
              shortText = "INC";
            }
            this.uomConversion.code = name + "/T/" + shortText;
          }
        } else {
          this.uomConversion.code = "";
        }
      } catch (e) {
        window.console.log("error-", e);
      }
    },
    dataBound: function (e) {
      const grid = kendo.jQuery("#gridServiceUOM").data("kendoGrid");
      const items = e.sender.items();
      // window.console.log(items)
      items.each(function () {
        let dataItem = grid.dataItem(this);
        $("tr[data-uid='" + dataItem.uid + "']")
          .find(".isSystem")
          .each(function () {
            if (dataItem.isSystem === 0) {
              $(this).removeClass("k-state-disabled");
            }
          });
      });
    },
    close() {
      // window.history.go(-1)
      this.dialogm2 = false;
    },
    newClick() {
      // this.uom = this.uoms.filter(item => {
      //     return item.category.id === this.service.uom.category.id
      // })
      this.uomConversion = {};
      this.mUOM = {};
    },
    onUOMChanged() {
      this.uom = this.uoms.filter((item) => {
        return (
          item.category.id === this.baseUOM.category.id // && item.id !== this.baseUOM.id
        );
      });
      this.onUOMTypeChanged()
    },
    async loadUOM() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          if (this.service) {
            if (this.service.hasOwnProperty("uom")) {
              uomHandler.get().then((res) => {
                this.uoms = res;
                this.showLoading = true;
                this.uom = this.uoms.filter((item) => {
                  this.showLoading = false;
                  return (
                    item.category.id === this.baseUOM.category.id // && item.id !== this.baseUOM.id
                  );
                });
              });
            }
          }
        }, 10);
      });
    },
    async loadTax() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          settingHandler.get().then((res) => {
            this.showLoading = false;
            this.tax = res;
            let st = this.tax.filter(
              (m) => m.taxType.typeId === 8 && m.transactionType === "Sale"
            ); //specific tax
            this.specificTax = st; // special tax

            let vAT = this.tax.filter(
              (m) => m.taxType.typeId === 1 && m.transactionType === "Sale"
            ); // valuable tax
            this.vat = vAT; // valuable tax

            let otTax = this.tax.filter(
              (m) => m.taxType.typeId === 7 && m.transactionType === "Sale"
            ); // Other tax
            this.otherTax = otTax; // valuable tax

            this.purchaseTax = this.tax.filter(
              (m) => m.taxType.typeId === 1 && m.transactionType === "Purchase"
            ); // valuable tax
            this.publicLightingTax = this.tax.filter(
              (m) =>
                (m.taxType.typeId === 9 || m.taxType.typeId === 10) &&
                m.transactionType === "Sale"
            ); // valuable tax
            // this.mPurchaseTax = purchaseTax // valuable tax

            if (this.specificTax.length > 0) {
              this.uomConversion.specificTax = this.specificTax[0];
            }
            if (this.vat.length > 0) {
              this.uomConversion.vat = this.vat[0];
            }
            if (this.otherTax.length > 0) {
              this.uomConversion.otherTax = this.otherTax[0];
            }
            if (this.purchaseTax.length > 0) {
              this.uomConversion.purchaseTax = this.purchaseTax[0];
            }
          });
        }, 10);
      });
    },
    async loadUOMServiceConversion() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          if (this.service) {
            // window.console.log(this.product)
            this.showLoading = true;
            if (this.service.hasOwnProperty("uom")) {
              uomServiceConversionHandler.get(this.serviceId).then((res) => {
                this.showLoading = false;
                this.uomServiceConversion = res;
              });
            }
          }
        }, 10);
      });
    },
    async goEdit(e) {
      e.preventDefault();
      let grid = kendo.jQuery("#gridServiceUOM").data("kendoGrid");
      let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
      this.uomConversion = dataItem;
      this.mUOM = dataItem.toUOM;
      this.dialogm2 = true;
      window.console.log(dataItem, "val");
    },
    async onSaveClose() {
      // if (!this.$refs.form.validate()) {
      //   this.$refs.form.validate()
      //   return
      // }
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          const bUOM = this.baseUOM;
          const bUOM_ = {
            id: bUOM.id,
            category: bUOM.category,
            name: bUOM.name,
          };
          const mUOM = {
            id: this.mUOM.id,
            category: this.mUOM.category,
            name: this.mUOM.name,
          };
          let vatTax = new TaxModel(this.uomConversion.vatTax);
          let purchaseTax = new TaxModel(this.uomConversion.purchaseTax);
          let specificTax = new TaxModel(this.uomConversion.specificTax);
          let otherTax = new TaxModel(this.uomConversion.otherTax);
          let publicLightingTax = new TaxModel(
            this.uomConversion.publicLightingTax
          );
          if (parseInt(this.uomConversion.type || 1) === 0) {
            vatTax = {};
            purchaseTax = {};
            specificTax = {};
            otherTax = {};
            publicLightingTax = {};
          }
          let data = {
            id: this.uomConversion.id,
            serviceId: this.serviceId,
            fromUOM: bUOM_,
            toUOM: mUOM,
            rate: this.uomConversion.rate,
            skip: this.uomServiceConversion.length > 0,
            type: this.uomConversion.type,
            code: this.uomConversion.code,
            vatTax: vatTax,
            purchaseTax: purchaseTax,
            specificTax: specificTax,
            otherTax: otherTax,
            publicLightingTax: publicLightingTax,
          };
          this.showLoading = true;
          uomServiceConversionHandler
            .create(this.serviceId, data)
            .then((response) => {
              if (response.data.statusCode === 201) {
                this.showLoading = false;
                this.loadUOMServiceConversion();
                // this.uomServiceConversion.push(response.data.data)
                this.$snotify.success("Success");
                this.close();
              }
            })
            .catch((e) => {
              this.$snotify.error("Something went wrong");
              this.showLoading = false;
              this.errors.push(e);
            });
        }, 50);
      });
    },
  },
  watch: {
    service() {
      if (this.service !== undefined) {
        this.showLoading = true;
        this.loadUOMServiceConversion();
        this.showLoading = false;
      }
    },
    // '$route': 'loadUOMConversion'
  },
  mounted: async function () {
    await this.loadUOM();
    await this.loadUOMServiceConversion();
    await this.loadTax();
    await this.initToolbar(this);
  },
  computed: {
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
          return {};
        }
      } else {
        return {};
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
    conversionUOM() {
      if (this.mUOM) {
        return (
          "1 " +
          this.mUOM.name +
          " = " +
          1 / this.uomConversion.rate +
          " " +
          this.baseUOMName
        );
      } else {
        return "";
      }
    },
  },
};
</script>
