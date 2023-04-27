<template>
  <v-row>
    <v-col sm="12" cols="12" class="pt-0">
      <h2 class="float-left font_18">{{ $t("unit_of_measure") }}</h2>
      <v-dialog v-model="dialogm2" max-width="650px">
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
            <v-card-title>{{ $t("product_uom") }}</v-card-title>
            <v-icon @click="dialogm2 = false">close</v-icon>
          </div>

          <v-card-text class="modal_text_content">
            <v-row>
              <v-col sm="12" cols="12" class="pb-0">
                <p class="mb-1">{{ $t("base_uom") }}</p>
                <p class="text-bold mb-1">{{ baseUOMName }}</p>
                <p class="mb-0">{{ $t("base_uom_desc") }}</p>
              </v-col>
            </v-row>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row class="mt-0">
                <v-col class="py-0" sm="6" cols="12">
                  <label class="label">{{ $t("new_uom") }}</label>
                  <p class="text_tip">{{ $t("1_day_base_uom") }}</p>
                  <v-select
                    class=""
                    tage="UOM"
                    v-model="mUOM"
                    :items="uom"
                    item-value="id"
                    item-text="name"
                    :rules="[(v) => !!v['id'] || $t('is_required')]"
                    @change="onUOMChanged"
                    return-object
                    outlined
                  />
                  <p class="text_tip mb-0">{{ $t("conversion_rate") }}</p>
                  <label> {{ conversionUOM }}</label>
                </v-col>
                <v-col class="py-0" sm="3" cols="12">
                  <label>{{ $t("code") }}</label>
                  <v-text-field
                    class="mt-6"
                    outlined
                    :disabled="true"
                    v-model="uomConversion.code"
                    :rules="[(v) => !!v || $t('is_required')]"
                  />
                </v-col>
                <v-col class="py-0" sm="3" cols="12">
                  <label>{{ $t("rate") }}</label>
                  <v-text-field
                    class="mt-6"
                    outlined
                    v-model="uomConversion.rate"
                    :rules="[(v) => !!v || $t('is_required')]"
                    type="number"
                    min="0.00000001"
                    clearable
                  />
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
                      <v-radio :label="$t('non_tax')" :value="1" color="blue" />
                    </v-col>
                    <v-col
                      sm="3"
                      cols="2"
                      class="pa-0 ml-2 mb-3"
                      style="line-height: 40px"
                    >
                      <v-radio :label="$t('tax')" :value="2" color="blue" />
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
      <LoadingMe
        :isLoading="showLoading"
        :fullPage="false"
        type="loading"
        :myLoading="true"
      />
      <kendo-datasource ref="dataSource" :data="conversionList" :schema="gridSchema" />
      <kendo-grid
        id="gridVariantUOM"
        class="grid-function"
        :data-source-ref="'dataSource'"
        :style="{ width: '100%' }"
        :noRecords="true"
        :toolbar="toolbarTemplate"
        :excel-export="excelExport"
        :excel-file-name="'uomConversionList.xlsx'"
        :excel-filterable="true"
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
          :width="50"
          :template="'<span>#=rate#</span>'"
          :attributes="{ style: 'text-align: right' }"
          :headerAttributes="{ style: 'background-color: #EDF1F5' }"
        />
        <kendo-grid-column
          :field="'conversionRate'"
          :title="$t('conversion_rate')"
          :template="'<span>#=conversionRate || 0#</span>'"
          :attributes="{ style: 'text-align: right' }"
          :width="120"
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
              // className: 'k-state-disabled isSystem',
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
import kendo from "@progress/kendo-ui";
import settingHandler from "@/scripts/settingHandler";
import TaxModel from "@/scripts/model/Tax";

const uomHandler = require("@/scripts/uomHandler");
const uomConversionHandler = require("@/scripts/uomConversionHandler");
const $ = kendo.jQuery;

const uomConversionModel = new UOMConversion({});
import JSZip from "jszip";

window.JSZip = JSZip;
export default {
  components: {
    LoadingMe: () => import(`@/components/Loading`),
  },
  props: {
    product: {},
  },
  data: () => ({
    dialogm2: false,
    valid: true,
    showLoading: false,
    uom: [],
    uoms: [],
    tax: [],
    vat: [],
    purchaseTax: [],
    publicLightingTax: [],
    otherTax: [],
    specificTax: [],
    mUOM: {},
    conversionList: [],
    gridSchema: {
      model: {
        id: "id",
      },
    },
    uomConversion: uomConversionModel,
  }),
  methods: {
    excelExport: function (e) {
      // const pivot = this.$refs.gridTransactionDS.kendoWidget()
      // pivot.saveAsExcel()
      window.console.log(e.data);
    },
    initToolbar(that) {
      let grid = $("#gridVariantUOM").data("kendoGrid");
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
        that.loadUOMConversion();
      }

      function onExportExcel(that) {
        that.exportToExcel();
      }
    },
    exportToExcel() {
      const grid = $("#gridVariantUOM").data("kendoGrid");
      grid.saveAsExcel();
    },
    toolbarTemplate: function () {
      const templateHtml =
        "<span>" +
        '<a class="k-pager-refresh k-link k-button reload" title="Refresh"><span class="k-icon k-i-reload"></span> Refresh </a>' +
        "</span>";

      return kendo.template(templateHtml);
    },
    onUOMTypeChanged() {
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
      this.onVatTaxChanged();
    },
    dataBound: function (e) {
      const grid = kendo.jQuery("#gridVariantUOM").data("kendoGrid");
      const items = e.sender.items();
      items.each(function () {
        let dataItem = grid.dataItem(this);
        $("tr[data-uid='" + dataItem.uid + "']")
          .find(".isSystem")
          .each(function () {
            if (dataItem.isSystem === 1) {
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
      if (this.product) {
        // const uom = this.product.uom;
        // let uCategory = {};
        // if (uom.hasOwnProperty("category")) {
        //   uCategory = uom.category;
        // } else if (uom.hasOwnProperty("toUOM")) {
        //   uCategory = uom.toUOM.category;
        // }
        this.uom = this.uoms;
        // this.uom = this.uoms.filter((item) => {
        //   return item.category.id === uCategory.id;
        // });
        this.uomConversion = new UOMConversion({});
        this.uomConversion.type = 1;
        this.mUOM = {};
        this.uomConversion.rate = 1;
      }
    },
    onUOMChanged() {
      window.console.log("mUOM", this.mUOM);
      // let rate = this.uomConversion.rate
      if (this.mUOM.id === this.baseUOM.id) {
        this.uomConversion.rate = 1;
      }
      this.uomConversion.code = this.mUOM.name || "";
    },
    async loadUOM() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          window.console.log("product", this.product);
          if (this.product) {
            if (this.product.hasOwnProperty("uom")) {
              uomHandler.get().then((res) => {
                this.uoms = res;
                // const uom = this.product.uom;
                // let uCategory = {};
                // if (uom.hasOwnProperty("category")) {
                //   uCategory = uom.category;
                // } else if (uom.hasOwnProperty("toUOM")) {
                //   uCategory = uom.toUOM.category;
                // }
                // // window.console.log(uom, "uCategory", uCategory);
                // this.uom = this.uoms.filter((item) => {
                //   return item.category.id === uCategory.id;
                // });
                this.uom = this.uoms;
                window.console.log("uom", this.uom);
                // this.uom = this.uoms.filter(item => {
                //   return item.category.id === this.product.uom.category.id
                // })
              });
            }
          }
        }, 50);
      });
    },
    async loadUOMConversion() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          if (this.product) {
            if (this.uoms) {
              if (this.product.hasOwnProperty("uom")) {
                const uom = this.product.uom;
                let uCategory = {};
                if (uom.hasOwnProperty("category")) {
                  uCategory = uom.category;
                } else if (uom.hasOwnProperty("toUOM")) {
                  uCategory = uom.toUOM.category;
                }
                this.uom = this.uoms.filter((item) => {
                  return item.category.id === uCategory.id;
                });
                this.showLoading = true;
                uomConversionHandler.get(this.variantId).then((res) => {
                  this.showLoading = false;
                  this.conversionList = res;
                });
              }
            }
          }
        }, 50);
      });
    },
    async goEdit(e) {
      e.preventDefault();
      let grid = kendo.jQuery("#gridVariantUOM").data("kendoGrid");
      let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
      this.uomConversion = new UOMConversion(dataItem);
      this.mUOM = dataItem.toUOM;
      const vatTax = this.uomConversion.vatTax || {};
      const purchaseTax = this.uomConversion.purchaseTax || {};
      const specificTax = this.uomConversion.specificTax || {};
      const otherTax = this.uomConversion.otherTax || {};
      const vatTaxId = vatTax.id || "";
      const purchaseTaxId = purchaseTax.id || "";
      const specificTaxId = specificTax.id || "";
      const otherTaxId = otherTax.id || "";
      this.uomConversion.vatTax = this.vat.filter((tax) => tax.id === vatTaxId)[0];
      this.uomConversion.purchaseTax = this.purchaseTax.filter(
        (tax) => tax.id === purchaseTaxId
      )[0];
      this.uomConversion.specificTax = this.specificTax.filter(
        (tax) => tax.id === specificTaxId
      )[0];
      this.uomConversion.otherTax = this.otherTax.filter(
        (tax) => tax.id === otherTaxId
      )[0];
      this.dialogm2 = true;
    },
    async onSaveClose() {
      if (!this.$refs.form.validate()) {
        this.$refs.form.validate();
        return;
      }
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
          let publicLightingTax = new TaxModel(this.uomConversion.publicLightingTax);
          if (parseInt(this.uomConversion.type || 1) === 0) {
            vatTax = {};
            purchaseTax = {};
            specificTax = {};
            otherTax = {};
            publicLightingTax = {};
          }
          let data = {
            id: this.uomConversion.id,
            variantId: this.variantId,
            fromUOM: bUOM_,
            toUOM: mUOM,
            rate: this.uomConversion.rate,
            skip: this.conversionList.length > 0,
            type: this.uomConversion.type,
            code: this.uomConversion.code,
            vatTax: vatTax,
            purchaseTax: purchaseTax,
            specificTax: specificTax,
            otherTax: otherTax,
            publicLightingTax: publicLightingTax,
          };
          uomConversionHandler
            .create(this.variantId, data)
            .then((response) => {
              if (response.data.statusCode === 201) {
                this.loadUOMConversion();
                this.$snotify.success("Success");
                this.close();
              }
            })
            .catch((e) => {
              this.$snotify.error("Something went wrong");
              this.errors.push(e);
            });
        }, 50);
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
  },
  watch: {
    product() {
      if (this.product !== undefined) {
        this.showLoading = true;
        this.loadUOM();
        this.loadUOMConversion();
        this.showLoading = false;
      }
    },
    // '$route': 'loadUOMConversion'
  },
  mounted: async function () {
    await this.loadUOM();
    await this.loadUOMConversion();
    await this.loadTax();
    await this.initToolbar(this);
  },
  computed: {
    baseUOMName() {
      if (this.product) {
        const uom = this.product.uom || {};
        if (uom.hasOwnProperty("toUOM")) {
          return uom.toUOM.name || "";
        } else {
          return uom.name || "";
        }
      } else {
        return "";
      }
    },
    baseUOM() {
      if (this.product) {
        const uom = this.product.uom || {};
        if (uom.hasOwnProperty("toUOM")) {
          return uom.toUOM;
        } else {
          return uom;
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
    // uomCode() {
    //     if (this.mUOM) {
    //         const name = this.mUOM.name || ''
    //         const type = this.uomConversion.type || 0
    //         if (type === 0) {
    //             return name
    //         } else if (type === 1) {
    //             return name + '-T'
    //         }
    //     } else {
    //         return "";
    //     }
    //     return "";
    // },
  },
};
</script>
