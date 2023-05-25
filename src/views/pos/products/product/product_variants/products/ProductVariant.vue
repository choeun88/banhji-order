<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="12" sm="12">
          <v-card
            outlined
            dense
            class="pa-4 no_border rounded-sm"
            color="white"
          >
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-card outlined dense class="no_border">
                <h2 class="mb-0">{{ $t("product_variant") }}</h2>
                <v-icon
                  onclick="window.history.go(-1); return false;"
                  class="float-right close_icon"
                  >close
                </v-icon>
              </v-card>
              <v-card outlined dense class="px-3 no_border">
                <v-row>
                  <v-col sm="6" cols="12" class="py-0 px-0">
                    <v-card
                      color="grayBg"
                      outlined
                      min-height="302"
                      dense
                      class="px-3 no_border"
                    >
                      <h2 class="font_18 mb-0 mt-2">
                        {{ $t("variant_name_sku") }}
                      </h2>
                      <p class="mb-0">{{ $t("variant_name_sku_desc") }}</p>
                      <v-row>
                        <v-col cols="12" class="">
                          <kendo-datasource
                            ref="variantAttributeDS"
                            @change="dsProductVariantChange"
                            :data="attributeList"
                          />
                          <kendo-grid
                            id="gridAttribute"
                            class="grid-function"
                            :data-source-ref="'variantAttributeDS'"
                            :editable="true"
                            v-on:databound="dataBound"
                            :scrollable-virtual="true"
                          >
                            <kendo-grid-column
                              :field="'no'"
                              :title="$t('no')"
                              :template="rowNumberTmpl"
                              :width="45"
                              :column-menu="false"
                              :headerAttributes="{
                                style: 'background-color: #EDF1F5;',
                                class: 'text-center',
                              }"
                              :attributes="{ style: 'text-align: center' }"
                            />
                            <kendo-grid-column
                              :field="'variant'"
                              :title="$t('variant_attributes')"
                              :width="150"
                              :editable="
                                () => {
                                  return false;
                                }
                              "
                              :template="'<span>#=variant.name#</span>'"
                              :editor="variantDropDownEditor"
                              :attributes="{ class: 'tb_name_td isEditable' }"
                              :headerAttributes="{
                                style: 'background-color: #EDF1F5',
                              }"
                            />
                            <kendo-grid-column
                              :field="'attribute'"
                              :title="$t('attribute')"
                              :width="100"
                              :template="'<span>#=attribute.name?attribute.name:\'\'#</span>'"
                              :editor="attributeDropDownEditor"
                              :headerAttributes="{
                                style:
                                  'text-align: center; background-color: #EDF1F5',
                              }"
                            />
                          </kendo-grid>
                        </v-col>
                      </v-row>
                      <v-row class="mt-1">
                        <v-col class="py-0" sm="6" cols="12">
                          <label class="label">{{ $t("variant_name") }}</label>
                          <v-text-field
                            class="mt-1"
                            tage="Variant Name"
                            v-model="attributeName"
                            outlined
                          />
                                           <label class="label">{{ $t("nature") }}</label>
                              <v-select
                                class="pt-1"
                                outlined
                                tage="Nature"
                                :placeholder="$t('select_nature')"
                                v-model="productVariant.nature"
                                :items="natures"
                                item-value="id"
                                :item-text="
                                  (item) => `${item.code} - ${item.name}`
                                "
                                return-object
                              />
                        </v-col>
                        <v-col class="py-0" sm="6" cols="12">
                          <label class="label">{{ $t("variant_sku") }}</label>
                          <v-row class="mt-0 mr-0">
                            <v-col sm="12" cols="12" class="py-0 pl-0 pr-1">
                              <v-text-field
                                class="mt-1"
                                v-model="variantSku"
                                outlined
                                tage="Variant SKU"
                                :rules="[(v) => !!v || 'Number is required']"
                                required
                              />
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>
                  <v-col sm="6" cols="12" class="pl-4 pr-0 py-0">
                    <v-card outlined min-height="340" dense class="px-3 rounded-0">
                      <h2 class="font_18 mb-0 mt-2">
                        {{ $t("product_variant_information") }}
                      </h2>
                      <p class="mb-0">
                        {{ $t("product_variant_information_desc") }}
                      </p>
                      <v-row>
                        <v-col sm="6" cols="12" class="my_checkbox pb-0">
                          <label class="label">{{ $t("recorder_qty") }}</label>
                          <v-text-field
                            class="mt-1"
                            tage="Recorder Qty"
                            type="number"
                            min="1"
                            v-model="productVariant.reOrderQty"
                            outlined
                          />
                          <label class="label">{{ $t("barcode_upc") }}</label>
                          <v-text-field
                            class="mt-1"
                            tage="Barcode UPC"
                            v-model="productVariant.barcode"
                            outlined
                          />
                          <label class="label">{{ $t("standard_cost") }}</label>
                          <v-text-field
                            class="mt-1"
                            v-model="productVariant.cost"
                            :disabled="disabledEdit"
                            type="number"
                            outlined
                          />
                          
                        </v-col>
                        <v-col sm="6" cols="12" class="my_checkbox pb-0">
                          <label class="label">{{ $t("brand") }}</label>
                          <v-select
                            class="pt-1"
                            outlined
                            tage="Variant Brand"
                            :placeholder="$t('select_brand')"
                            :rules="[(v) => !!v || 'required']"
                            v-model="mBrand"
                            :items="brands"
                            item-value="id"
                            :item-text="(item) => `${item.code} - ${item.name}`"
                            return-object
                          />
                          <label class="label mb-0">{{
                            $t("country_of_origin")
                          }}</label>
                          <v-select
                            class="mt-1"
                            outlined
                            tage="Country Of Origin"
                            :placeholder="$t('country')"
                            v-model="mCountry"
                            :items="country"
                            item-value="abbreviation"
                            :item-text="
                              (item) => `${item.abbreviation} - ${item.country}`
                            "
                            return-object
                          />
                          <label class="label">{{ $t("price") }}</label>
                          <v-text-field
                            class="mt-1"
                            v-model="productVariant.price"
                            :disabled="disabledEdit"
                            type="number"
                            outlined
                          />
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card>
              <v-card outlined dense class="mt-1 no_border">
                <v-row>
                  <v-col sm="4" cols="12" class="pb-0 pr-0">
                    <v-card
                      outlined
                      dense
                      class="pa-3 rounded-0 hide_form_alert"
                      min-height="180px"
                    >
                      <h2 class="font_18 mb-0">{{ $t("sale_description") }}</h2>
                      <p>{{ $t("sale_description_variant_desc") }}</p>
                      <v-textarea
                        class="mt-1"
                        height="239px"
                        no-resize
                        :rules="[(v) => !!v || $t('is_required')]"
                        v-model="productVariant.saleDescription"
                        outlined
                        clearable
                        rows="3"
                      />
                    </v-card>
                  </v-col>
                  <v-col sm="4" cols="12" class="pb-0">
                    <v-card
                      outlined
                      dense
                      class="pa-3 pb-0 rounded-0"
                      min-height="180px"
                    >
                      <h2 class="font_18 mb-0">
                        {{ $t("product_varaint_description") }}
                      </h2>
                      <p>{{ $t("product_description_variant_desc") }}</p>
                      <v-textarea
                        class="mt-1"
                        height="220px"
                        no-resize
                        v-model="productVariant.description"
                        outlined
                        clearable
                        rows="3"
                      />
                      <!-- <editor
                        ref="productVariantDescription"
                        :resizable-content="true"
                        :resizable-toolbar="true"
                        style="height: 90px"
                        v-model="productVariant.description"
                        class="mt-1"
                        rows="10"
                        cols="30"
                      /> -->
                    </v-card>
                  </v-col>
                  <v-col sm="4" cols="12" class="pb-0">
                    <v-card
                      outlined
                      dense
                      class="pa-3 pb-0 rounded-0"
                      height="355px"
                    >
                      <v-row>
                        <v-col sm="12" class="pb-0">
                          <h2 class="mb-0 font_18">
                            {{ $t("default_image") }}
                          </h2>
                          <p class="color_grey font_14">
                            {{ $t("add_funct_prod_variant_desc3") }}
                          </p>
                          <v-row>
                            <v-col sm="12" cols="12" class="py-0">
                              <img style="height: 134px;" alt="Image" :src="src" />
                              <label>
                                <input
                                  type="file"
                                  name="image"
                                  class="file_width"
                                  id="image"
                                  :rules="fileSizeRules"
                                  accept=".png, .jpg, .jpeg"
                                  ref="fileupload"
                                  @change="onFileChange"
                                />
                              </label>
                              <!-- <p class="upload_btn mb-0" @click="doUpload">
																						{{ $t("upload_image") }}
																					</p> -->
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card>
              <v-divider />
              <v-card outlined dense class="no_border function_footer">
                <v-btn
                  color="black"
                  onclick="window.history.go(-1); return false;"
                  class="text-capitalize white--text float-left"
                  >{{ $t("cancel") }}
                </v-btn>
                <v-btn
                  color="primary"
                  @click="onSaveClose"
                  class="float-right white--text text-capitalize"
                  >{{ $t("save_close") }}
                </v-btn>
              </v-card>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
      <LoadingMe
        :isLoading="showLoading"
        :fullPage="false"
        type="loading"
        :myLoading="true"
      />
    </v-container>
  </v-app>
</template>
<script>
import kendo from "@progress/kendo-ui";
import VariantModel from "@/scripts/model/Variants";
import ProductVariantModel from "@/scripts/model/ProductVariants";
// import { Editor } from "@progress/kendo-editor-vue-wrapper";

const brandHandler = require("@/scripts/brandHandler");
const uomHandler = require("@/scripts/uomHandler");
const otherHandler = require("@/scripts/otherHandler");
const productVariantHandler = require("@/scripts/productVariantHandler");
const variantHandler = require("@/scripts/variantTypeHandler");
const attributeHandler = require("@/scripts/attributeHandler");
const variantModel = new VariantModel({});
const productVariantModel = new ProductVariantModel({});
const uomConversionHandler = require("@/scripts/uomConversionHandler");
const $ = kendo.jQuery;
export default {
  name: "ProductVariant",
  components: {
    LoadingMe: () => import(`@/components/Loading`),
    // editor: Editor,
  },
  props: ["id"],
  data: () => ({
    showLoading: false,
    valid: "",
    proVariant: "",
    mBrand: {},
    mUOM: {},
    mCountry: {},
    variant: variantModel,
    brands: [],
    uom: [],
    country: [],
    attributeList: [],
    variantTypes: [],
    attributes: [],
    productVariant: productVariantModel,
    imgFile: "",
    src: '',
    fileSizeRules: [
      (files) =>
        !files ||
        !files.some((file) => file.size > 1024 * 1024) ||
        "Image size should be less than 1 MB!",
    ],
    attributeName: "",
    variantSku: "",
    natures: [],
  }),
  methods: {
    dataBound: function (e) {
      const grid = kendo.jQuery("#gridAttribute").data("kendoGrid");
      const items = e.sender.items();
      if (grid) {
        items.each(function () {
          let dataItem = grid.dataItem(this);
          $("tr[data-uid='" + dataItem.uid + "']")
            .find(".isEditable")
            .each(function () {
              if (dataItem.isEditable === false) {
                $(this).addClass("k-state-disabled");
              }
            });
        });
      }
    },
    UOMTemplatePOS(dataItem) {
      const uom = dataItem.uom || {};
      const toUOM = uom.toUOM || {};
      if (toUOM) {
        return toUOM.name || "";
      } else {
        return ``;
      }
    },
    onUpdate() {
      this.$emit("onUpdate", this.productVariant);
    },
    // DataSource Changes
    onDataSourceChanges(e) {
      window.console.log("im changed", e);
      // if (e.field) {
      //   let dataRow = e.items[0]
      //
      //   switch (e.field) {
      //     case "variant":
      //
      //       break
      //     case "attribute":
      //       // this.attribute_ = this.attributes.filter(m => m.type.id === dataRow.variant.id)
      //       window.console.log("--", dataRow.variant.id)
      //       break
      //     default:
      //       break
      //   }
      // }
    },
    async initData() {
      // window.console.log('me', this.$route.params)
      if (this.$route.params.id !== undefined) {
        await this.loadSingleVariant();
      } else {
        let ds = this.$refs.variantAttributeDS.kendoWidget();
        ds.data([]);
        this.addRow();
      }
    },
    addRow() {
      let ds = this.$refs.variantAttributeDS.kendoWidget(),
        total = ds.total();
      ds.insert(total, {
        variant: this.variant,
        attribute: {},
      });
    },
    // Row Number Template
    rowNumberTmpl(dataItem) {
      let ds = this.$refs.variantAttributeDS.kendoWidget(),
        index = ds.indexOf(dataItem);
      return index + 1;
    },
    // Grid Custom Editor
    variantDropDownEditor(container, options) {
      kendo
        .jQuery('<input required name="' + options.field + '"/>')
        .appendTo(container)
        .kendoDropDownList({
          autoBind: false,
          autoWidth: true,
          height: 400,
          filter: "startswith",
          dataTextField: "name",
          dataValueField: "id",
          template: "<span>#=name#</span>",
          optionLabel: "--- Select ---",
          dataSource: new kendo.data.DataSource({
            data: this.variantTypes,
          }),
        });
    },
    attributeDropDownEditor(container, options) {
      kendo
        .jQuery('<input name="' + options.field + '"/>')
        .appendTo(container)
        .kendoDropDownList({
          autoBind: true,
          autoWidth: true,
          height: 400,
          filter: "startswith",
          dataTextField: "name",
          dataValueField: "id",
          cascadeFrom: "variant",
          template: "<span>#=code# - #=name#</span>",
          optionLabel: "--- Select ---",
          dataSource: new kendo.data.DataSource({
            data: this.attribute_.filter(
              (m) => m.type.id === options.model.variant.id
            ),
          }),
        });
    },
    async loadBrand() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          brandHandler.get().then((res) => {
            this.showLoading = false;
            this.brands = res;
          });
        }, 50);
      });
    },
    async loadVariants() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          variantHandler.get().then((res) => {
            this.showLoading = false;
            this.variantTypes = res;
            if (this.variantTypes.length > 0) {
              this.initData();
            }
          });
        }, 50);
      });
    },
    async loadUOM() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          uomHandler.get().then((res) => {
            this.showLoading = false;
            this.uom = res;
          });
        }, 50);
      });
    },
    async loadCountry() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          otherHandler.country().then((res) => {
            this.showLoading = false;
            this.country = res;
          });
        }, 50);
      });
    },
    async loadSingleVariant() {
      new Promise((resolve) => {
        resolve("resolved");
        setTimeout(() => {
          this.imgFile = "";
          this.$refs.fileupload.value = null;
          this.showLoading = true;
          const strFilter = "?id=" + this.$route.params.id;
          // .getOne(this.$route.query.p, this.$route.params.id)
          productVariantHandler.variantOne(strFilter).then((res) => {
            this.productVariant = new ProductVariantModel(res);
            window.console.log("productVariant", this.productVariant);
            this.mBrand = this.productVariant.brand;
            this.mCountry = this.productVariant.countryOrigin;
            this.mUOM = this.productVariant.uom;
            this.attributeName = this.productVariant.name || "";
            this.variantSku = this.productVariant.sku || "";
            this.attributeList = [];
            const variant = this.productVariant.attribute || [];
            this.src =
              "https://s3-ap-southeast-1.amazonaws.com/images.banhji/" +
              this.productVariant.thumb;
            if (this.$route.query.type === "new") {
              this.src = "";
              this.imgFile = "";
            }
            this.showLoading = false;
            window.console.log("variant", variant);
            variant.forEach((m) => {
              this.attributeList.push({
                variant: {
                  name: m.hasOwnProperty("variant") ? m.variant.name : "",
                  id: m.hasOwnProperty("variant") ? m.variant.id : "",
                  code: m.hasOwnProperty("variant") ? m.variant.code : "",
                },
                attribute: {
                  name: m.hasOwnProperty("attribute") ? m.attribute.name : "",
                  id: m.hasOwnProperty("attribute") ? m.attribute.id : "",
                  code: m.hasOwnProperty("attribute") ? m.attribute.code : "",
                },
              });
            });
            // }
            window.console.log("attributeList", this.attributeList);
            $("#gridAttribute")
              .data("kendoGrid")
              .dataSource.data(this.attributeList);
          });
        }, 50);
      });
    },
    async loadAttributes() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          attributeHandler.get().then((res) => {
            this.showLoading = false;
            this.attributes = res;
            this.attribute_ = res;
          });
        }, 50);
      });
    },
    async doUpload() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          let data = {
            file: this.imgFile,
            key: "6305850114",
          };
          productVariantHandler
            .upload(data)
            .then((response) => {
              if (response.data.statusCode === 201) {
                window.console.log(response, "success");
              }
            })
            .catch((e) => {
              this.errors.push(e);
            });
        }, 50);
      });
    },
    onFileChange(e) {
      // const file = e.target.files[0];
      let input = e.target;
      // Ensure that you have a file before attempting to read it
      if (input.files && input.files[0]) {
        if (input.files[0].size > 1024 * 1024) {
          e.preventDefault();
          alert("File too big (> 1MB)");
          this.src = "";
          this.imgFile = "";
          this.$refs.fileupload.value = null;
        } else {
          // create a new FileReader to read this image and convert to base64 format
          let reader = new FileReader();
          // Define a callback function to run, when FileReader finishes its job
          reader.onloadend = (e) => {
            // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
            // Read image as base64 and set to imageData
            this.imgFile = e.target.result;
          };
          // Start the reader job - read file as a data url (base64 format)
          reader.readAsBinaryString(input.files[0]);
          // this.url = input.files[0]
          this.src = URL.createObjectURL(e.target.files[0]);
        }
      }
    },
    async onSaveClose() {
      let ds = this.$refs.variantAttributeDS.kendoWidget();
      let d1 = ds.data();
      let dataValidate = 0;
      d1.forEach((value, index) => {
        if (
          value.attribute == undefined ||
          value.attribute.id == undefined ||
          value.attribute.id == null ||
          value.attribute.id == ""
        ) {
          this.$snotify.error("Please check Attribute  on row " + (index + 1));
        } else {
          dataValidate += 1;
        }
      });
      if (!this.$refs.form.validate()) {
        this.$refs.form.validate();
        return;
      }
      if (d1.length == dataValidate) {
        new Promise((resolve) => {
          setTimeout(() => {
            resolve("resolved");
            const variantDS = this.$refs.variantAttributeDS.kendoWidget();
            window.console.log("variant", variantDS.data());
            const variants = variantDS.data().map((o) => {
              return {
                attribute: o.attribute,
                variant: o.variant,
              };
            });
            // window.console.log("name", name);
            const data = new ProductVariantModel(this.productVariant);
            data.name = this.attributeName;
            data.sku = this.variantSku;
            data.attribute = variants;
            data.file = this.imgFile;
            data.thumb = this.imgFile;
            data.type = this.$route.query.type;
            data.brand = this.mBrand || {};
            data.countryOrigin = this.mCountry || {};
            // let data = {
            //   id: this.$route.params.id ? this.$route.params.id : "",
            //   productId: this.$route.query.p,
            //   name: this.productVariant.name,
            //   sku: this.productVariant.sku,
            //   variant: variants,
            //   product: this.productVariant.product,
            //   uom: this.mUOM,
            //   reOrderQty: this.productVariant.reOrderQty,
            //   saleDescription: this.productVariant.saleDescription,
            //   brand: this.mBrand,
            //   countryOrigin: this.mCountry,
            //   supplier: {},
            //   barcode: this.productVariant.barcode,
            //   isForPOS: this.productVariant.isForPOS,
            //   useAsFavorite: this.productVariant.useAsFavorite,
            //   isNegativeSale: this.productVariant.isNegativeSale,
            //   isForEcommerce: this.productVariant.isForEcommerce,
            //   isNegativeSaleForSaleChannel:
            //     this.productVariant.isNegativeSaleForSaleChannel,
            //   minOrderQty: this.productVariant.minOrderQty,
            //   maxOnlineStock: this.productVariant.maxOnlineStock,
            //   images: this.productVariant.images,
            //   file: this.imgFile,
            //   reUsed: this.productVariant.reUsed,
            //   type: this.$route.query.type,
            // };
            this.showLoading = true;
            productVariantHandler
              .create(data)
              .then((response) => {
                if (response.data.statusCode === 201) {
                  // this.loadSaleUC()
                  // this.clear()
                  // this.$refs.form.reset()
                  this.showLoading = false;
                  // data.id = response.data.data.id;
                  // data.images = response.data.data.images;
                  this.$snotify.success("Success");
                  // this.close(data)
                  this.close();
                }
              })
              .catch((e) => {
                this.$snotify.error("Something went wrong");
                this.errors.push(e);
              });
          });
        });
      }
    },
    close() {
      window.history.go(-1);
      // this.$router.push({
      //   name: 'Products', params: {
      //     data: data
      //   }
      // })
    },
    async loadUOMConversion() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          uomConversionHandler.get(this.$route.params.id).then((res) => {
            this.uom = res;
          });
        }, 50);
      });
    },
    async skuGenerator() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          const category = this.mCategory || {};
          const group = this.mGroup || {};
          const sGroup = this.mSubGroup || {};
          let cateAbbr = "",
            groupAbbr = "",
            sGroupAbbr = "",
            skuCode = "";
          if (category.id) {
            cateAbbr = category.abbr || "";
            skuCode += skuCode + cateAbbr + "/";
          }
          if (group.id) {
            groupAbbr = group.abbr || "";
            skuCode += skuCode + groupAbbr + "/";
          }
          if (sGroup.id) {
            sGroupAbbr = sGroup.abbr || "";
            skuCode += skuCode + sGroupAbbr + "/";
          }
          if (this.product.name) {
            this.product.sku =
              skuCode + this.product.name.toString().substring(0, 3);
          }
        }, 10);
      });
    },
    async variantAttributeName() {
      try {
        const ds = this.$refs.variantAttributeDS.kendoWidget();
        const row = ds.data();
        let strAttrName = "";
        row.forEach((itm) => {
          const attribute = itm.attribute || {};
          const attrCode = attribute.name || "";
          const strRow = attrCode;
          strAttrName += strRow + " ";
        });
        return strAttrName;
      } catch (e) {
        window.console.log("e", e);
        return "";
      }
    },
    async variantAttributeCode() {
      try {
        const ds = this.$refs.variantAttributeDS.kendoWidget();
        const row = ds.data();
        let strAttrName = "";
        row.forEach((itm) => {
          const attribute = itm.attribute || {};
          const attrCode = attribute.code || "";
          const strRow = attrCode;
          strAttrName += "/" + strRow;
        });
        return strAttrName;
      } catch (e) {
        window.console.log("e", e);
        return "";
      }
    },
    async dsProductVariantChange() {
      const query = this.$route.query || {};
      const type = query.type || "";
      if (type === "new") {
        this.attributeName =
          this.productVariant.product.name +
          " " +
          (await this.variantAttributeName());
        this.productVariant.saleDescription = this.attributeName;
        this.variantSku =
          this.productVariant.product.sku + (await this.variantAttributeCode());
        this.productVariant.sku = this.variantSku;
        this.productVariant.name = this.attributeName;
      }
    },
    async loadNatures() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = true;
          attributeHandler.natureList().then((res) => {
            this.showLoading = false;
            this.natures = res.data.data;
          });
        }, 10);
      });
    },
  },
  mounted: async function () {
    // await this.loadUOM()
    await this.loadBrand();
    await this.loadCountry();
    await this.loadVariants();
    await this.loadAttributes();
    await this.loadNatures();
    // await this.loadUOMConversion();
  },
  watch: {
    $route: "loadSingleVariant",
  },
  computed: {
    disabledEdit() {
      window.console.log('typexxx', this.$route.query.type)
      if (this.$route.query.type == "edit") {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style scoped>
.function_content {
  padding: 0 25px 25px;
  border-bottom: 0;
  background-color: #fff !important;
}

@media (min-width: 1264px) {
  .container {
    /* max-width: 1185px; */
    max-width: 1080px !important;
  }
}

.grayBg {
  background-color: #f8f8f9;
}

@media (max-width: 576px) {
  .mb-6 {
    margin-bottom: 0 !important;
  }
}

.section2 {
  border: 1px solid #d6d7d8;
}

.border_grey {
  border: 1px solid #d6d7d8;
}

.attachment_table {
  width: 100%;
}

.greyDark {
  background-color: #f2f2f2;
}
p {
  font-size: 15px;
  font-family: "Niradei-Light" !important;
}

.upload_btn {
  padding: 10px 6px;
  text-align: center;
  color: white;
  margin-top: 15px;
  margin-bottom: none !important;
  border-radius: 22px;
  background: #92d050;
}

.my_box_min_heihgt {
  min-height: 356px;
}

.width_100 {
  width: 100px;
}

.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background-color: transparent !important;
}
</style>
