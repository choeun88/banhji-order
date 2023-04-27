<template>
    <v-app>
      <v-container>
        <v-row>
          <v-col cols="12" sm="12">
            <v-card outlined dense class="pa-4 no_border rounded-sm" color="white">
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-card outlined dense class="no_border">
                  <h2 class="mb-0">{{ $t("product") }}</h2>
                  <v-icon @click="cancel()" class="float-right close_icon">close </v-icon>
                </v-card>
                <v-card outlined dense class="px-4 no_border" color="grayBg">
                  <v-row>
                    <v-col sm="4" cols="12" class="pb-0">
                      <label class="label mb-0"
                        >{{ $t("product_category") }}
                        <v-icon size="18" color="red" @click="loadCategory"
                          >refresh</v-icon
                        ></label
                      >
                      <v-select
                        class="mt-1"
                        :placeholder="$t('category')"
                        outlined
                        tage="Product Category"
                        :loading="categories.length === 0"
                        v-model="mCategory"
                        :items="categories"
                        item-value="id"
                        :item-text="(item) => `${item.abbr} - ${item.name}`"
                        @change="onCategoryChanged"
                        return-object
                        :rules="[(v) => !!v['id'] || $t('is_required')]"
                        required
                      />
                      <label class="label mb-0"
                        >{{ $t("product_group") }}
                        <v-icon size="18" color="red" @click="loadGroup"
                          >refresh</v-icon
                        ></label
                      >
                      <v-select
                        class="mt-1"
                        :placeholder="$t('select_group')"
                        outlined
                        tage="Product Group"
                        v-model="mGroup"
                        :items="group"
                        @change="onGroupChanged"
                        item-value="id"
                        :item-text="(item) => `${item.abbr} - ${item.name}`"
                        return-object
                        clearable
                        required
                      />
                    </v-col>
                    <v-col sm="4" cols="12" class="pl-0">
                      <label class="label mb-0"
                        >{{ $t("sub_group") }}
                        <v-icon size="18" color="red" @click="loadSubGroup"
                          >refresh</v-icon
                        ></label
                      >
                      <v-select
                        class="mt-1"
                        :placeholder="$t('select_sub_group')"
                        outlined
                        tage="Sub Group"
                        v-model="mSubGroup"
                        @change="skuGenerator"
                        :items="subGroup"
                        item-value="id"
                        :item-text="(item) => `${item.abbr} - ${item.name}`"
                        clearable
                        return-object
                        required
                      />
                      <label class="label mb-0">{{ $t("product_name") }}</label>
                      <v-text-field
                        class="mt-1"
                        :placeholder="$t('name')"
                        outlined
                        v-model="product.name"
                        :rules="[(v) => !!v || $t('is_required')]"
                        required
                      />
                    </v-col>
                    <v-col sm="4" cols="12" class="my_checkbox">
                      <label class="label mb-0 mt-1 mx-1">{{ $t("sku") }}</label>
                      <div class="d-flex">
                        <v-text-field
                          class="mt-1 flex-1"
                          v-model="product.sku"
                          outlined
                          :rules="[(v) => !!v || $t('is_required')]"
                          required
                        />
                        <v-icon
                          color="black"
                          size="30"
                          @click="skuGenerator"
                          class="border_qrcode ml-2 mt-1"
                          >mdi-qrcode
                        </v-icon>
                      </div>
                      <h2 class="font_12 my-0">{{ $t("how_this_product") }}</h2>
                      <v-row>
                        <v-col sm="12" cols="12" class="my_radio pl-0 py-0">
                          <div class="d-flex">
                            <div>
                              <input
                                id="radio1"
                                name="radio"
                                type="radio"
                                value="1"
                                v-model="product.batchOrSerial"
                              />
                              <label for="radio1">{{ $t("batch") }}</label>
                            </div>
                            <div>
                              <input
                                id="radio2"
                                name="radio"
                                type="radio"
                                value="2"
                                v-model="product.batchOrSerial"
                              />
                              <label for="radio2">{{ $t("serial") }}</label>
                            </div>
                            <div>
                              <input
                                id="radio3"
                                name="radio"
                                type="radio"
                                value="3"
                                v-model="product.batchOrSerial"
                              />
                              <label for="radio3">{{ $t("dimension") }}</label>
                            </div>
                          </div>
                          <div class="ml-2">
                            <input
                              type="checkbox"
                              id="useAsFavorite"
                              v-model="product.reUsed"
                            />
                            <label for="useAsFavorite">{{ $t("not_reused") }}</label>
                          </div>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-card>
                <h2 class="font_18 mb-0 mt-2">
                  {{ $t("transaction_description") }}
                </h2>
                <v-card outlined dense class="px-4 mb-4 rounded-0" height="188px">
                  <v-row>
                    <v-col sm="6" cols="12">
                      <h2 class="font_16 mb-0">
                        {{ $t("purchased_description") }}
                      </h2>
                      <p class="grayBg---text mb-2">
                        {{ $t("purchase_description_detail") }}
                      </p>
                      <v-textarea
                        v-model="product.purchaseDescription"
                        outlined
                        :rules="[(v) => !!v || $t('is_required')]"
                        no-resize
                        height="100px"
                        rows="3"
                      />
                    </v-col>
                    <v-col sm="6" cols="12">
                      <h2 class="font_16 mb-0">{{ $t("sale_description") }}</h2>
                      <p class="grayBg---text mb-2">
                        {{ $t("sale_description_detail") }}
                      </p>
                      <v-textarea
                        v-model="product.saleDescription"
                        outlined
                        :rules="[(v) => !!v || $t('is_required')]"
                        no-resize
                        height="100px"
                        rows="3"
                      />
                    </v-col>
                  </v-row>
                </v-card>
                <h2 class="font_18 mb-0 mt-0">
                  {{ $t("product_info") }}
                </h2>
                <v-card outlined dense class="px-4 rounded-0">
                  <v-row>
                    <v-col cols="12">
                      <p class="grayBg---text mb-0">
                        {{ $t("def_info_product") }}
                      </p>
                    </v-col>
                    <v-col sm="4" cols="12" class="py-0">
                      <v-row>
                        <v-col sm="4" cols="12" class="py-0">
                          <label
                            >{{ $t("uom") }}
                            <v-icon size="18" color="red" @click="loadUOM"
                              >refresh</v-icon
                            ></label
                          >
                        </v-col>
                        <v-col sm="8" cols="12" class="pl-0 py-0">
                          <v-select
                            :placeholder="$t('uom')"
                            outlined
                            tage="UOM"
                            :rules="[(v) => !!v || $t('is_required')]"
                            v-model="mUOM"
                            :items="uom"
                            item-value="id"
                            :item-text="(item) => `${item.name}`"
                            return-object
                            required
                          />
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col sm="4" cols="12" class="py-0">
                          <label
                            >{{ $t("price_level")
                            }}<v-icon size="18" color="red" @click="loadPriceLevel"
                              >refresh</v-icon
                            ></label
                          >
                        </v-col>
                        <v-col sm="8" cols="12" class="pl-0 py-0">
                          <v-select
                            :placeholder="$t('price_level')"
                            outlined
                            tage="price level"
                            :rules="[(v) => !!v || $t('is_required')]"
                            v-model="product.priceLevel"
                            :items="priceLevel"
                            @change="priceLevelChanged"
                            item-value="id"
                            item-text="name"
                            return-object
                            required
                          />
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col sm="4" cols="12" class="py-0">
                      <v-row>
                        <v-col sm="4" cols="12" class="py-0">
                          <label>{{ $t("selling_price") }} {{ code }}</label>
                        </v-col>
                        <v-col sm="8" cols="12" class="pl-0 py-0">
                          <v-text-field
                            outlined
                            :rules="[(v) => !!v || $t('must_be_greater_than_0')]"
                            type="number"
                            v-model="product.price"
                            required
                          />
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col sm="4" cols="12" class="py-0">
                          <label>{{ $t("standard_cost") }} </label>
                        </v-col>
                        <v-col sm="8" cols="12" class="pl-0 py-0">
                          <v-text-field
                            outlined
                            :rules="[(v) => !!v || $t('must_be_greater_than_0')]"
                            type="number"
                            v-model="product.cost"
                            required
                          />
                        </v-col>
                      </v-row>
                      <!-- <v-row>
                                                                <v-col sm="4" cols="12" class="py-0">
                                                                  <label>{{ $t('initial_cost_per_unit') }}</label>
                                                                </v-col>
                                                                <v-col sm="8" cols="12" class="pl-0 py-0">
                                                                  <v-text-field outlined
                                                                                :rules="[v => !!v || 'Number is required']"
                                                                                v-model="product.cost"
                                                                                type="number"
                                                                                required/>
                                                                </v-col>
                                                              </v-row> -->
                    </v-col>
                    <v-col sm="4" cols="12" class="py-0">
                      <v-row>
                        <v-col sm="4" cols="12" class="py-0">
                          <label>{{ $t("recorder_qty") }}</label>
                        </v-col>
                        <v-col sm="8" cols="12" class="pl-0 py-0">
                          <v-text-field
                            outlined
                            v-model="product.reOrderQTY"
                            type="number"
                          />
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-card>
                <v-card outlined dense class="no_border my-1">
                  <v-row>
                    <!-- <v-col sm="7" cols="12">
                      <v-card outlined dense class="px-4 rounded-0">
                        <v-row>
                          <v-col sm="12" cols="12" class="pb-0">
                            <h2 class="font_18 mb-0">{{ $t("account") }}</h2>
                            <p class="mb-0 mb-1 color_grey">
                              {{ $t("account_tax_prod_desc") }}
                            </p>
                          </v-col>
                          <v-col sm="6" cols="12" class="pb-0">
                            <label class="label">{{ $t("inventory") }}</label>
                            <v-select
                              class="mt-1"
                              :placeholder="$t('select_inventory')"
                              tage="Inventory"
                              :loading="accLoading"
                              v-model="mAccInventory"
                              :items="accInventory"
                              item-value="id"
                              :item-text="
                                (item) =>
                                  `${item.number} - ${
                                    this.$store.state.accounting.accountLanguage ===
                                    'English'
                                      ? item.name
                                      : item.local_name
                                  }`
                              "
                              :rules="[(v) => !!v['id'] || $t('is_required')]"
                              return-object
                              outlined
                            />
                            <label class="label">{{ $t("cost_of_goods_sold") }}</label>
                            <v-select
                              class="mt-1"
                              :placeholder="$t('select_goods')"
                              tage="Cost of Goods Sold"
                              v-model="mAccCostOfGoodSold"
                              :loading="accLoading"
                              :items="accCostOfGoodSold"
                              item-value="id"
                              :item-text="
                                (item) =>
                                  `${item.number} - ${
                                    this.$store.state.accounting.accountLanguage ===
                                    'English'
                                      ? item.name
                                      : item.local_name
                                  }`
                              "
                              :rules="[(v) => !!v['id'] || $t('is_required')]"
                              return-object
                              outlined
                            />
                          </v-col>
                          <v-col sm="6" cols="12">
                            <label class="label">{{ $t("revenue") }}</label>
                            <v-select
                              class="mt-1"
                              :placeholder="$t('revenue')"
                              tage="Revenue"
                              v-model="incomeAcc"
                              :loading="accLoading"
                              :items="accRevenue"
                              item-value="id"
                              :item-text="
                                (item) =>
                                  `${item.number} - ${
                                    this.$store.state.accounting.accountLanguage ===
                                    'English'
                                      ? item.name
                                      : item.local_name
                                  }`
                              "
                              :rules="[(v) => !!v['id'] || $t('is_required')]"
                              return-object
                              outlined
                            />
                          </v-col>
                        </v-row>
                      </v-card>
                    </v-col> -->
                    <v-col sm="12" cols="12" class="pl-1">
                      <v-card outlined dense class="px-4 rounded-0">
                        <v-row>
                          <v-col cols="12" sm="12">
                            <h2 class="font_18 mb-0">
                              {{ $t("product_variants") }}
                            </h2>
                            <p class="mb-0 color_grey">
                              {{ $t("add_funct_prod_variants_desc") }}
                            </p>
                          </v-col>
                          <v-col sm="12" cols="12" class="pt-2">
                            <kendo-datasource ref="dataSource" :data="varLists" />
                            <kendo-grid
                              id="grid"
                              class="grid-function"
                              :data-source-ref="'dataSource'"
                              :sortable="false"
                              :filterable="false"
                              :column-menu="true"
                              :navigatable="true"
                              :editable="true"
                              :scrollable-virtual="true"
                            >
                              <kendo-grid-column
                                :title="$t('no.')"
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
                                :width="190"
                                :template="'<span>#=variant.name#</span>'"
                                :editor="attributeDropDownEditor"
                                :headerAttributes="{
                                  style: 'background-color: #EDF1F5',
                                }"
                              />
                              <kendo-grid-column
                                :command="{
                                  iconClass: 'k-icon k-i-trash',
                                  text: $t('delete'),
                                  click: removeRow,
                                  class: 'btn-plus',
                                }"
                                :title="$t('action')"
                                :width="80"
                                :attributes="{ style: 'text-align: right' }"
                                :headerAttributes="{
                                  style: 'text-align: right; background-color: #EDF1F5',
                                }"
                              />
                            </kendo-grid>
                            <v-btn
                              color="primary"
                              class="float-left rounded-4 ml-0 btn_plus white--text mt-3"
                              @click="addRow"
                            >
                              <v-icon size="" class="ma-1">mdi-plus</v-icon>
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-card>
                <v-card outlined dense class="no_border function_footer">
                  <v-btn
                    color="black"
                    @click="cancel"
                    outlined
                    class="text-capitalize black--text float-left"
                    >{{ $t("cancel") }}
                  </v-btn>
                  <!--                                <v-menu>-->
                  <!--                                    <template v-slot:activator="{ on }">-->
                  <!--                                        <v-btn-->
                  <!--                                            class="ml-2 float-right black&#45;&#45;text text-capitalize"-->
                  <!--                                            v-on="on"-->
                  <!--                                        >-->
                  <!--                                            {{ $t("save_option") }}-->
                  <!--                                            <v-icon size="" class="ma-1">expand_more</v-icon>-->
                  <!--                                        </v-btn>-->
                  <!--                                    </template>-->
                  <!--                                </v-menu>-->
                  <v-btn
                    class="px-3 mr-1 white--text text-capitalize float-right"
                    color="primary"
                    @click="onSaveClose(false)"
                    >{{ $t("save_close") }}
                  </v-btn>
                  <v-btn
                    @click="onSaveClose(true)"
                    color="secondary"
                    class="px-3 mr-1 white--text text-capitalize float-right"
                    >{{ $t("save_new") }}
                  </v-btn>
                </v-card>
              </v-form>
            </v-card>
          </v-col>
        </v-row>
        <LoadingMe :isLoading="showLoading" :fullPage="false" :myLoading="true" />
      </v-container>
    </v-app>
  </template>
  
  <script>
  import { i18n } from "@/i18n";
  import ProductModel from "@/scripts/model/Products";
  import kendo from "@progress/kendo-ui";
  import VariantModel from "@/scripts/model/Variants";
  
  const $ = kendo.jQuery;
  
  const accountHandler = require("@/scripts/handler/accounting/account");
  const categoryHandler = require("@/scripts/categoryHandler");
  const groupHandler = require("@/scripts/groupHandler");
  const subGroupHandler = require("@/scripts/subGroupHandler");
  const uomHandler = require("@/scripts/uomHandler");
  const warehouseHandler = require("@/scripts/warehouseHandler");
  const settingHandler = require("@/scripts/settingHandler");
  const productHandler = require("@/scripts/productHandler");
  const variantHandler = require("@/scripts/variantTypeHandler");
  const priceLevelHandler = require("@/scripts/priceLevelHandler");
  // const attributeHandler = require("@/scripts/attributeHandler")
  // ac biz
  const loanHandler = require("@/scripts/loanHandler");
  import { dataStore } from "@/observable/store";
  
  const variantModel = new VariantModel({});
  let productModel = new ProductModel({});
  export default {
    name: "AddProduct",
    props: ["id"],
    components: {
      LoadingMe: () => import(`@/components/Loading`),
    },
    data: function () {
      return {
        showLoading: false,
        accLoading: false,
        valid: "",
        incomeAcc: "",
        mAccInventory: "",
        mCategory: "",
        mGroup: "",
        mFormTemplate: "",
        formTemplate: [
          {
            id: "ftp-c35cbe46-1c5e-11eb-adc1-0242ac120002",
            name: "Form A",
          },
          {
            id: "ftp-c35cc062-1c5e-11eb-adc1-0242ac120002",
            name: "Form B",
          },
          {
            id: "ftp-c35cc2ec-1c5e-11eb-adc1-0242ac120002",
            name: "Form C",
          },
        ],
        mAccCostOfGoodSold: "",
        accRevenue: [],
        accInventory: [],
        accCostOfGoodSold: [],
        categories: [],
        groups: [],
        group: [],
        subGroup: [],
        uom: [],
        tax: [],
        specificTax: [],
        vat: [],
        mSubGroup: {},
        subGroups: [],
        wareHouses: [],
        mUOM: {},
        mWareHouse: {},
        mSpecificTax: {},
        mOtherTax: {},
        otherTax: [],
        mDefaultTax: {},
        purchaseTax: [],
        mPurchaseTax: {},
        mSerialOrBatch: 0,
        variantTypes: [],
        variant: variantModel,
        varLists: [],
        product: productModel,
        productVariant: {},
        variantId: "",
        priceLevel: [],
        coa: [],
        code: "",
      };
    },
    methods: {
      priceLevelChanged() {
        this.code = "";
        if (this.product.priceLevel) {
          if (this.product.priceLevel.hasOwnProperty("currency")) {
            const currency = this.product.priceLevel.currency;
            if (currency.hasOwnProperty("code")) {
              this.code = "(" + currency.code + ")";
            }
          }
        } else {
          this.code = "";
        }
      },
      mappingAccount(coa, uuid) {
        const account = coa.filter((k) => k.uuid === uuid);
        return account.map((j) => {
          j.id = j.uuid;
          return {
            ...j,
          };
        })[0];
      },
      async loadPriceLevel() {
        new Promise((resolve) => {
          setTimeout(() => {
            resolve("resolved");
            this.showLoading = true;
            priceLevelHandler
              .get()
              .then((res) => {
                const data = res || [];
                this.showLoading = false;
                this.priceLevel = data.filter((n) => n.type.name === "Standard");
                if (this.priceLevel.length > 0) {
                  this.product.priceLevel = this.priceLevel[0];
                  this.priceLevelChanged();
                }
              })
              .catch(() => {
                this.showLoading = false;
              });
          }, 10);
        });
      },
      loadCategoryAccountAndTax() {
        // this.mOtherTax = this.mCategory.tax.hasOwnProperty("otherTax")
        //     ? this.mCategory.tax.otherTax
        //     : {};
        // this.mSpecificTax = this.mCategory.tax.hasOwnProperty("specificTax")
        //     ? this.mCategory.tax.specificTax
        //     : {};
        // this.mDefaultTax = this.mCategory.tax.hasOwnProperty("defaultTax")
        //     ? this.mCategory.tax.defaultTax
        //     : {};
        // this.mPurchaseTax = this.mCategory.tax.hasOwnProperty("purchaseTax")
        //     ? this.mCategory.tax.purchaseTax
        //     : {};
        try {
          const account = this.mCategory.account || {};
          const incomeAcc = account.incomeAcc || "";
          const inventoryAcc = account.inventoryAcc || "";
          const costOfGoodsSoldAcc = account.costOfGoodsSoldAcc || "";
          this.incomeAcc = this.mappingAccount(this.coa, incomeAcc);
          this.mAccInventory = this.mappingAccount(this.coa, inventoryAcc);
          this.mAccCostOfGoodSold = this.mappingAccount(this.coa, costOfGoodsSoldAcc);
        } catch (error) {
          window.console.log("error t", error);
        }
      },
      async initData() {
        // window.console.log('me', this.$route.params.id)
        if (this.$route.params.id !== undefined) {
          await this.loadSingleProduct();
        } else {
          let ds = this.$refs.dataSource.kendoWidget();
          ds.data([]);
          this.addRow();
        }
      },
      addRow() {
        let ds = this.$refs.dataSource.kendoWidget(),
          total = ds.total();
        ds.insert(total, {
          variant: this.variant,
        });
      },
      // Row Number Template
      rowNumberTmpl(dataItem) {
        var ds = this.$refs.dataSource.kendoWidget(),
          index = ds.indexOf(dataItem);
        return index + 1;
      },
      // Grid Custom Editor
      attributeDropDownEditor(container, options) {
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
            template: "<span>#=code# - #=name#</span>",
            optionLabel: "--- Select ---",
            dataSource: new kendo.data.DataSource({
              data: this.variantTypes,
            }),
          });
      },
      // Remove Row
      removeRow(e) {
        e.preventDefault();
  
        var grid = kendo.jQuery("#grid").data("kendoGrid"),
          dataSource = grid.dataSource,
          dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
  
        if (dataSource.total() > 1) {
          dataSource.remove(dataItem);
        }
      },
      onChange() {},
      async onEditClick(value) {
        new Promise((resolve) => {
          setTimeout(() => {
            resolve("resolved");
            this.product = value;
          }, 10);
        });
      },
      onNewClick() {
        this.product.id = "";
        this.clear();
      },
      close(data) {
        window.history.go(-1);
        window.console.log(data, "--data");
        // this.$router.push({
        //   name: 'Products', params: {
        //     data: data
        //   }
        // })
      },
      clear() {
        this.mCategory = {};
        this.mGroup = {};
        this.mSubGroup = {};
        this.mAccInventory = {};
        this.mAccCostOfGoodSold = {};
        this.incomeAcc = {};
        this.product = productModel;
      },
      async onSaveClose(isNew) {
        if (!this.$refs.form.validate()) {
          window.scrollTo({ behavior: "smooth", top: 20 });
          this.$refs.form.validate();
          return;
        }
        let variants = [];
        let ds = this.$refs.dataSource.kendoWidget();
        let dataValidate = 0;
        ds.data().forEach((value, index) => {
          // window.console.log(value)
          if (
            value.variant == undefined ||
            value.variant.id == undefined ||
            value.variant.id == null ||
            value.variant.id == ""
          ) {
            this.$snotify.error("Please check Variants on row " + (index + 1));
          } else {
            dataValidate += 1;
          }
        });
        let variantAR = ds.data();
        if (variantAR.length == dataValidate) {
          const variant = ds.data();
          variant.forEach((i) => {
            variants.push({
              variant: i.variant,
              uid: i.uid,
            });
          });
          new Promise((resolve) => {
            setTimeout(() => {
              resolve("resolved");
              // if (this.product.id === '' || this.product.id === undefined) {
              let data = {
                id: this.$route.params.id ? this.$route.params.id : "",
                name: this.product.name,
                sku: this.product.sku,
                saleDescription: this.product.saleDescription,
                purchaseDescription: this.product.purchaseDescription,
                price: this.product.price,
                cost: this.product.cost,
                reOrderQTY: this.product.reOrderQTY,
                category: this.mCategory || {},
                priceLevel: this.product.priceLevel,
                group: this.mGroup || {},
                subGroup: this.mSubGroup || {},
                uom: this.mUOM,
                warehouse: this.mWareHouse,
                inventoryAcc: this.mAccInventory,
                incomeAcc: this.incomeAcc,
                costOfGoodsSoldAcc: this.mAccCostOfGoodSold,
                // defaultTax: this.mDefaultTax,
                // purchaseTax: this.mPurchaseTax,
                // specificTax: this.mSpecificTax,
                // otherTax: this.mOtherTax,
                formTemplate: this.mFormTemplate,
                variant: variants,
                variantId: this.variantId,
                canBeSold: this.product.canBeSold,
                canBeProduce: this.product.canBeProduce,
                canBeRent: this.product.canBeRent,
                canBePurchase: this.product.canBePurchase,
                isFavorite: this.product.isFavorite,
                batchOrSerial: this.product.batchOrSerial,
                reUsed: this.product.reUsed || false,
                // batchTracked: this.mSerialOrBatch == 1 ? this.product.batchTracked : 0,
                // isSerialNumber: this.mSerialOrBatch == 2 ? this.product.isSerialNumber : 0,
                status: this.product.status || 1,
                deleted: this.product.deleted || 0,
                type: this.$route.params.id ? this.$route.query.type : "new",
              };
              window.console.log("data", data);
              productHandler
                .create(data)
                .then((response) => {
                  if (response.data.statusCode === 201) {
                    // this.loadSaleUC()
                    this.clear();
                    // this.close(response.data.data);
                    this.$refs.form.reset();
                    this.$snotify.success("Success");
                    if (!isNew) {
                      this.close();
                    } else {
                      this.product.name = "";
                      this.product.sku = "";
                      this.product.saleDescription = "";
                      this.product.purchaseDescription = "";
                      this.product.price = {};
                      this.product.cost = {};
                      this.product.reOrderQTY = 0;
                      this.mCategory = {};
                      this.product.priceLevel = {};
                      this.mGroup = {};
                      this.mSubGroup = {};
                      this.mUOM = {};
                      this.mWareHouse = {};
                      this.mAccInventory = {};
                      this.incomeAcc = {};
                      this.mAccCostOfGoodSold = {};
                      this.product.reUsed = false;
                      this.product.batchOrSerial = {};
                    }
                  }
                })
                .catch((e) => {
                  this.$snotify.error("Something went wrong");
                  this.errors.push(e);
                });
            }, 10);
          });
        }
      },
      async onCategoryChanged() {
        new Promise((resolve) => {
          setTimeout(() => {
            resolve("resolved");
            // window.console.log(this.mCategory)
            this.mGroup = {};
            this.mSubGroup = {};
  
            this.group = this.groups.filter((m) => m.category.id === this.mCategory.id);
            if (this.group.length > 0) {
              this.mGroup = this.group[0];
              this.subGroup = this.subGroups.filter((m) => m.group.id === this.group[0].id);
              if (this.subGroup.length > 0) {
                this.mSubGroup = this.subGroup[0];
              }
            }
            this.loadCategoryAccountAndTax();
          }, 10);
        });
      },
      async onGroupChanged() {
        const groupId = (this.mGroup || {}).id || "";
        this.subGroup = this.subGroups.filter((m) => m.group.id === groupId);
      },
      async loadAccount() {
        this.accLoading = true;
        new Promise((resolve) => {
          setTimeout(() => {
            resolve("resolved");
            accountHandler.getAllPages().then((res) => {
              this.showLoading = false;
              this.coa = res || [];
              this.accRevenue = res
                .filter((m) => m.account_type.number === 32)
                .map((item) => {
                  return {
                    id: item.uuid,
                    uuid: item.uuid,
                    name: item.name,
                    local_name: item.local_name,
                    number: item.number,
                    is_taxable: item.is_taxable,
                    banhjiAccCode: item.banhjiAccCode,
                    group_code: item.group_code,
                    parent_account: item.parent_account,
                    type_code: item.type_code,
                    account_type: item.account_type,
                  };
                });
              if (this.accRevenue.length > 0) {
                this.incomeAcc = this.accRevenue[0];
              }
              this.accInventory = res
                .filter((m) => m.account_type.number === 8)
                .map((item) => {
                  return {
                    id: item.uuid,
                    uuid: item.uuid,
                    name: item.name,
                    local_name: item.local_name,
                    number: item.number,
                    is_taxable: item.is_taxable,
                    banhjiAccCode: item.banhjiAccCode,
                    group_code: item.group_code,
                    parent_account: item.parent_account,
                    type_code: item.type_code,
                    account_type: item.account_type,
                  };
                });
              if (this.accInventory.length > 0) {
                this.mAccInventory = this.accInventory[0];
              }
              this.accCostOfGoodSold = res
                .filter((m) => m.account_type.number === 33)
                .map((item) => {
                  return {
                    id: item.uuid,
                    uuid: item.uuid,
                    name: item.name,
                    local_name: item.local_name,
                    number: item.number,
                    is_taxable: item.is_taxable,
                    banhjiAccCode: item.banhjiAccCode,
                    group_code: item.group_code,
                    parent_account: item.parent_account,
                    type_code: item.type_code,
                    account_type: item.account_type,
                  };
                });
              if (this.accCostOfGoodSold.length > 0) {
                this.mAccCostOfGoodSold = this.accCostOfGoodSold[0];
              }
              this.accLoading = false;
            });
          }, 10);
        });
      },
      async loadCategory() {
        new Promise((resolve) => {
          setTimeout(() => {
            resolve("resolved");
            const param = {
              pattern: "cat#Product",
            };
            this.showLoading = true;
            categoryHandler
              .getAllv2(param)
              .then((res) => {
                this.showLoading = false;
  
                // this.categories = this.categories.filter(
                //   (m) => m.hasOwnProperty("type") && m.type.name === "Product"
                // );
                // if (this.categories.length > 0) {
                //   this.mCategory = this.categories[0]
                //   this.onCategoryChanged()
                // }
                if (
                  this.appType == "Supply" ||
                  this.appType == "Marketing" ||
                  this.appType == "Service"
                ) {
                  this.loadBizSetting(res.data.data);
                } else {
                  this.categories = res.data.data;
                }
              })
              .catch(() => {
                this.showLoading = false;
              });
          }, 10);
        });
      },
      async loadGroup() {
        new Promise((resolve) => {
          setTimeout(() => {
            resolve("resolved");
            const param = {
              pattern: "grp#Product",
            };
            this.showLoading = true;
            groupHandler
              .getAllv2(param)
              .then((res) => {
                this.showLoading = false;
                this.groups = res.data.data;
              })
              .catch(() => {
                this.showLoading = false;
              });
          }, 10);
        });
      },
      async loadSubGroup() {
        new Promise((resolve) => {
          setTimeout(() => {
            resolve("resolved");
            const param = {
              pattern: "sgr#Product",
            };
            this.showLoading = true;
            subGroupHandler
              .getAllv2(param)
              .then((res) => {
                this.showLoading = false;
                this.subGroups = res.data.data;
              })
              .catch(() => {
                this.showLoading = false;
              });
          }, 10);
        });
      },
      async skuGenerator() {
        new Promise((resolve) => {
          setTimeout(() => {
            resolve("resolved");
            if (this.$route.params.id === undefined || this.$route.params.id === "") {
              const category = this.mCategory || {};
              const group = this.mGroup || {};
              const sGroup = this.mSubGroup || {};
              let cateAbbr = "",
                groupAbbr = "",
                sGroupAbbr = "",
                skuCode = "";
              if (category.id) {
                cateAbbr = category.abbr || "";
                skuCode += cateAbbr + "/";
              }
              if (group.id) {
                groupAbbr = group.abbr || "";
                skuCode += groupAbbr + "/";
              }
              if (sGroup.id) {
                sGroupAbbr = sGroup.abbr || "";
                skuCode += sGroupAbbr;
              }
              window.console.log("--xx", category, group, sGroup);
              this.product.sku = skuCode;
            }
  
            // if (this.product.name) {
            //     this.product.sku =
            //         skuCode + this.product.name.toString().substring(0, 3);
            // }
          }, 10);
        });
      },
      async loadUOM() {
        new Promise((resolve) => {
          setTimeout(() => {
            resolve("resolved");
            this.showLoading = true;
            uomHandler
              .get()
              .then((res) => {
                this.showLoading = false;
                this.uom = res;
                if (this.$route.params.id === undefined || this.$route.params.id === "") {
                  if (this.uom.length > 0) {
                    this.mUOM = this.uom.filter((k) => k.name === "Unit")[0];
                  }
                }
              })
              .catch(() => {
                this.showLoading = false;
              });
          }, 10);
        });
      },
      async loadWareHouses() {
        new Promise((resolve) => {
          setTimeout(() => {
            resolve("resolved");
            warehouseHandler.getWarehouseSettingAll().then((res) => {
              this.showLoading = false;
              this.wareHouses = res;
              if (this.wareHouses.length > 0) {
                this.mWareHouse = this.wareHouses[0];
              }
            });
          }, 10);
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
              let st = this.tax.filter((m) => m.taxType.typeId === 8); // valuable tax
              this.specificTax = st; // special tax
  
              let vAT = this.tax.filter(
                (m) => m.taxType.typeId === 1 && m.transactionType === "Sale"
              ); // valuable tax
              this.vat = vAT; // valuable tax
  
              let otTax = this.tax.filter((m) => m.taxType.typeId === 7); // valuable tax
              this.otherTax = otTax; // valuable tax
  
              this.purchaseTax = this.tax.filter(
                (m) => m.taxType.typeId === 1 && m.transactionType === "Purchase"
              ); // valuable tax
              if (this.specificTax.length > 0) {
                this.mSpecificTax = this.specificTax[0];
              }
              if (this.vat.length > 0) {
                this.mDefaultTax = this.vat[0];
              }
              if (this.otherTax.length > 0) {
                this.mOtherTax = this.otherTax[0];
              }
              if (this.purchaseTax.length > 0) {
                this.mPurchaseTax = this.purchaseTax[0];
              }
            });
          }, 10);
        });
      },
      async loadSingleProduct() {
        new Promise((resolve) => {
          setTimeout(() => {
            resolve("resolved");
            this.showLoading = true;
            this.group = this.groups || [];
            this.subGroup = this.subGroups || [];
            // this.onCategoryChanged();
            if (this.$route.params.id) {
              productHandler.getOne(this.$route.params.id).then((res) => {
                this.showLoading = false;
                this.product = res;
                if (this.product.id !== undefined) {
                  this.mCategory = this.product.category;
                  this.mGroup = this.product.group;
                  this.mSubGroup = this.product.subGroup;
                  this.mUOM = this.product.uom;
                  this.mAccCostOfGoodSold = this.product.costOfGoodsSoldAcc;
                  this.mAccInventory = this.product.inventoryAcc;
                  this.incomeAcc = this.product.incomeAcc;
                  // this.mSpecificTax = this.product.specificTax;
                  this.mSerialOrBatch =
                    this.product.isSerialNumber > 0
                      ? this.product.isSerialNumber
                      : this.product.batchTracked;
                  // this.mOtherTax = this.product.otherTax;
                  // this.mDefaultTax = this.product.defaultTax;
                  // this.mPurchaseTax = this.product.purchaseTax;
                  this.productVariant = this.product.variant;
                  this.mWareHouse = this.product.warehouse;
                  this.varLists = [];
                  this.variantId = this.product.variant.id;
                  this.product.variant.variant.forEach((m) => {
                    this.varLists.push({
                      variant: {
                        name: m.variant.name,
                        id: m.variant.id,
                        code: m.variant.code,
                      },
                    });
                  });
                }
              });
            }
          }, 10);
        });
      },
      cancel() {
        this.$swal({
          title: i18n.t("msg_title_warning"),
          text: i18n.t("msg_discard"),
          icon: "warning",
          showCancelButton: true,
          cancelButtonText: i18n.t("cancel"),
          confirmButtonColor: "#4d4848",
          cancelButtonColor: "#ED1A3A",
          confirmButtonText: i18n.t("discard"),
        }).then((resultCen) => {
          if (resultCen.value) {
            this.$router.go(-1);
          }
        });
      },
      async loadBizSetting(allCat) {
        loanHandler.businessSettingGet().then((res) => {
          this.showLoading = true;
          if (res.data.statusCode === 200) {
            this.showLoading = false;
            let s = res.data.data.filter((obj) => {
              return obj.type == dataStore.businessType;
            });
            if (s.length > 0) {
              if (s[0].productCategories.length > 0) {
                let cates = [];
                s[0].productCategories.forEach((m) => {
                  let ca = allCat.filter((o) => {
                    return o.id == m.id;
                  });
                  if (ca.length > 0) {
                    cates.push(ca[0]);
                  }
                });
                this.categories = cates;
              }
            }
          }
        });
      },
    },
    mounted: async function () {
      this.loadAccount();
      this.loadCategory();
      this.loadGroup();
      this.loadSubGroup();
      this.loadUOM();
      // this.loadWareHouses();
      // await this.loadTax();
      this.loadVariants();
      this.loadPriceLevel();
    },
    computed: {
      appType() {
        return dataStore.productType;
      },
    },
    watch: {
      id() {
        // this.product = this.selectedProduct
        window.console.log(this.id, "watch");
        if (this.id !== undefined) {
          this.loadCategory();
          this.loadGroup();
          this.loadSubGroup();
          this.loadSingleProduct();
        } else {
          this.clear();
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
  
  p {
    font-size: 15px;
    font-family: "Niradei-Light" !important;
  }
  
  .theme--light.v-data-table
    > .v-data-table__wrapper
    > table
    > tbody
    > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: transparent !important;
  }
  </style>
  