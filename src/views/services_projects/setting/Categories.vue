<template>
  <v-row>
    <v-col sm="10" cols="12" class="pt-0">
      <h2 class="mb-0 font_20">{{ $t("service_categories") }}</h2>
      <p class="mb-0">{{ $t("service_categories_desc") }}</p>
    </v-col>
    <v-col sm="2" cols="12" class="pt-0">
      <v-dialog persistent v-model="dialogM3" max-width="600px" eager>
        <template v-slot:activator="{ on }">
          <v-btn
            color="primary"
            class="text-capitalize white--text float-right"
            v-on="on"
            @click="onNewClick"
          >
            {{ $t("create_new") }}
          </v-btn>
        </template>
        <v-card>
          <div class="modal_header">
            <v-card-title>{{ $t("categories") }}</v-card-title>
            <v-icon class="" @click="dialogM3 = false">close</v-icon>
          </div>
          <v-card-text class="modal_text_content">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col sm="12" cols="12" class="pb-0">
                  <label class="label">{{ $t("name") }}</label>
                  <v-text-field
                    class="mt-1"
                    outlined
                    :rules="[
                      (v) => !!v || $t('name_is_required'),
                      (v) => (v && v.length > 2) || $t('character_3'),
                    ]"
                    required
                    placeholder=""
                    v-model="category.name"
                  />
                </v-col>
                <v-col sm="12" cols="12" class="py-0">
                  <v-row>
                    <v-col sm="4" cols="4" class="py-0">
                      <label class="label">{{ $t("abbreviation") }}</label>
                      <v-text-field
                        class="mt-1"
                        outlined
                        tage="Abbreviation"
                        placeholder=""
                        :rules="[(v) => !!v || $t('abbr_is_required')]"
                        required
                        v-model="category.abbr"
                      />
                    </v-col>
                    <v-col sm="8" cols="8" class="py-0">
                      <label class="label">{{ $t("type") }}</label>
                      <v-select
                        class="mt-1"
                        v-model="mItemType"
                        :items="itemTypes"
                        readonly
                        item-value="id"
                        :rules="[(v) => (v ? !!v['id'] || $t('is_required') : '')]"
                        required
                        item-text="name"
                        return-object
                        outlined
                      />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row>
                <v-col sm="12" cols="12" class="py-0">
                  <v-card outlined dense class="px-3 py-0 rounded-0">
                    <v-row>
                      <v-col sm="12" cols="12" class="py-0">
                        <!--                                                <h2 class="font_20 mb-0">{{ $t('account_tax') }}</h2>-->
                      </v-col>
                      <v-col sm="6" cols="12" class="pb-0">
                        <!--                                                <label class="label">{{ $t('inventory') }}</label>-->
                        <!--                                                <v-select class="mt-1"-->
                        <!--                                                          :placeholder="$t('select_inventory')"-->
                        <!--                                                          tage="Inventory"-->
                        <!--                                                          v-model="mAccInventory"-->
                        <!--                                                          :items="accInventory"-->
                        <!--                                                          item-value="id"-->
                        <!--                                                          :item-text="item =>`${item.number} - ${item.name}`"-->
                        <!--                                                          return-object-->
                        <!--                                                          outlined/>-->
                        <label class="label mb-0">{{ $t("cost_of_goods_sold") }}</label>
                        <v-select
                          class="mt-1"
                          :placeholder="$t('select_goods')"
                          tage="Cost of Goods Sold"
                          v-model="mAccCostOfGoodSold"
                          :items="accCostOfGoodSold"
                          :loading="accLoading"
                          item-value="id"
                          :rules="[(v) => (v ? !!v['id'] || $t('is_required') : '')]"
                          :item-text="
                            (item) =>
                              `${item.number} - ${
                                this.$store.state.accounting.accountLanguage === 'English'
                                  ? item.name
                                  : item.local_name
                              }`
                          "
                          return-object
                          outlined
                        />
                        <label class="label">{{ $t("revenue") }}</label>
                        <v-select
                          class="mt-1"
                          :placeholder="$t('revenue')"
                          tage="Revenue"
                          v-model="mAccRevenue"
                          :items="accRevenue"
                          :loading="accLoading"
                          item-value="id"
                          :rules="[(v) => (v ? !!v['id'] || $t('is_required') : '')]"
                          :item-text="
                            (item) =>
                              `${item.number} - ${
                                this.$store.state.accounting.accountLanguage === 'English'
                                  ? item.name
                                  : item.local_name
                              }`
                          "
                          return-object
                          outlined
                        />
                        <label class="label">{{ $t("colors") }}</label>
                        <kendo-colorpalette
                          class="mt-1"
                          v-model="category.color"
                          id="colorPickDSM"
                          :palette="paletteS"
                          :change="onGetColor"
                          :tile-size="40"
                        />
                      </v-col>
                      <!--                      <v-col sm="6" cols="12" class="pb-0">-->
                      <!--                        <label class="label">{{ $t("default_tax") }}</label>-->
                      <!--                        <v-select-->
                      <!--                          class="mt-1"-->
                      <!--                          tage="Default Tax"-->
                      <!--                          v-model="mVAT"-->
                      <!--                          :items="vat"-->
                      <!--                          item-value="id"-->
                      <!--                          item-text="defaultTax"-->
                      <!--                          return-object-->
                      <!--                          outlined-->
                      <!--                        />-->
                      <!--                        <label class="label">{{ $t("purchase_tax") }}</label>-->
                      <!--                        <v-select-->
                      <!--                          class="mt-1"-->
                      <!--                          tage="Default Tax"-->
                      <!--                          v-model="mPurchaseTax"-->
                      <!--                          :items="purchaseTax"-->
                      <!--                          item-value="id"-->
                      <!--                          item-text="defaultTax"-->
                      <!--                          return-object-->
                      <!--                          outlined-->
                      <!--                        />-->
                      <!--                        <label class="label">{{ $t("specific_tax") }}</label>-->
                      <!--                        <v-select-->
                      <!--                          class="mt-1"-->
                      <!--                          tage="Special Tax"-->
                      <!--                          v-model="mSpecificTax"-->
                      <!--                          :items="specificTax"-->
                      <!--                          item-value="id"-->
                      <!--                          item-text="defaultTax"-->
                      <!--                          return-object-->
                      <!--                          outlined-->
                      <!--                        />-->
                      <!--                        <label class="label">{{ $t("other_tax") }}</label>-->
                      <!--                        <v-select-->
                      <!--                          class="mt-1"-->
                      <!--                          tage="Special Tax"-->
                      <!--                          v-model="mOtherTax"-->
                      <!--                          :items="otherTax"-->
                      <!--                          item-value="id"-->
                      <!--                          item-text="defaultTax"-->
                      <!--                          return-object-->
                      <!--                          outlined-->
                      <!--                        />-->
                      <!--                      </v-col>-->
                      <v-col sm="5" cols="12" class="py-0">
                        <h2 class="mb-2 font_20 width_100">
                          {{ $t("default_image") }}
                        </h2>
                        <v-row>
                          <v-col sm="6" cols="12" lass="pt-2">
                            <p class="color_grey font_14">
                              {{ $t("add_funct_prod_variant_desc3") }}
                            </p>
                            <v-btn class="float-left btn_cancel" @click="handleUpload">
                              {{ $t("upload") }}
                            </v-btn>
                          </v-col>
                          <v-col v-if="src !== ''" sm="6" cols="12" class="py-0">
                            <v-img width="150px" height="150px" :src="src" />
                          </v-col>
                          <v-col sm="6" cols="12">
                            <label>
                              <input
                                hidden
                                type="file"
                                name="image"
                                id="image"
                                :rules="fileSizeRules"
                                accept=".png, .jpg, .jpeg"
                                ref="fileupload"
                                @change="onFileChange"
                              />
                            </label>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-card>
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
                  @click="dialogM3 = false"
                  >{{ $t("cancel") }}
                </v-btn>
              </v-col>
              <v-col sm="6" cols="6" class="py-0 text-right">
                <v-btn
                  :disabled="btnEnable"
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

    <v-col sm="12" cols="12">
      <template>
        <v-simple-table class="exchange-table">
          <LoadingMe
            :isLoading="showLoading"
            :fullPage="false"
            :myLoading="true"
            type="loading"
          />
          <kendo-datasource ref="gridSrvCategoryDS" :data="srvCategoryList" />
          <kendo-grid
            id="gridSrvCategory"
            class="grid-function"
            :data-source-ref="'gridSrvCategoryDS'"
            :editable="false"
            :scrollable-virtual="true"
            :toolbar="toolbarTemplate"
          >
            <kendo-grid-column
              :field="'no'"
              :title="$t('no')"
              :template="rowNumberTmpl"
              :width="20"
              :column-menu="false"
              :headerAttributes="{
                style: 'background-color: #EDF1F5;',
                class: 'text-center',
              }"
              :attributes="{ style: 'text-align: center' }"
            />
            <kendo-grid-column
              :field="'abbr'"
              :title="$t('abbr')"
              :width="50"
              :template="'<span>#=abbr#</span>'"
              :headerAttributes="{ style: 'background-color: #EDF1F5' }"
            />
            <kendo-grid-column
              :field="'color'"
              :title="$t('color')"
              :width="30"
              :template="'<div><span style=background-color:#=color#>#=color#</span></div>'"
              :headerAttributes="{ style: 'background-color: #EDF1F5' }"
            />
            <kendo-grid-column
              :field="'name'"
              :attributes="{ class: 'tb_name_td' }"
              :title="$t('name')"
              :width="150"
              :template="'<span>#=name#</span>'"
              :headerAttributes="{ style: 'background-color: #EDF1F5' }"
            />
            <kendo-grid-column
              :field="''"
              :title="$t('action')"
              :width="50"
              :command="[
                {
                  iconClass: 'k-icon k-i-edit',
                  text: $t('edit'),
                  click: goEdit,
                },
              ]"
              :headerAttributes="{
                style: 'background-color: #EDF1F5;',
                class: 'text-center',
              }"
              :attributes="{ style: 'text-align: center' }"
            />
          </kendo-grid>
        </v-simple-table>
      </template>
    </v-col>
    <div style="overflow: auto" class="service-category-list"></div>
  </v-row>
</template>

<script>
import { ColorPalette } from "@progress/kendo-inputs-vue-wrapper";

const $ = kendo.jQuery;
import kendo from "@progress/kendo-ui";

const categoryHandler = require("@/scripts/categoryHandler");
import CategoryModel from "@/scripts/model/Categories";
import AccountModel from "@/scripts/account-map/Account";
import TaxModel from "@/scripts/model/Tax";

const accountHandler = require("@/scripts/handler/accounting/account");
const settingHandler = require("@/scripts/settingHandler");
const categoryModel = new CategoryModel({});
import JSZip from "jszip";

window.JSZip = JSZip;
export default {
  components: {
    LoadingMe: () => import(`@/components/Loading`),
    "kendo-colorpalette": ColorPalette,
  },
  data: () => ({
    paletteS: ["#E6A044", "#EBE4E4", "#D42E21", "#000", "#242A34", "#9FCC63", "#519D36"],
    fileSizeRules: [
      (files) =>
        !files ||
        !files.some((file) => file.size > 1024 * 1024) ||
        "Image size should be less than 1 MB!",
    ],
    src: "",
    dialogM3: false,
    accLoading: false,
    showLoading: true,
    valid: true,
    mItemType: {},
    itemTypes: [],
    category: categoryModel,
    mAccRevenue: "",
    mAccInventory: {},
    accRevenue: [],
    accInventory: [],
    accCostOfGoodSold: [],
    mAccCostOfGoodSold: {},
    tax: [],
    colorPick: "",
    specificTax: [],
    vat: [],
    purchaseTax: [],
    mPurchaseTax: {},
    mSpecificTax: {},
    mOtherTax: {},
    otherTax: [],
    mVAT: {},
    srvCategoryList: [],
    imgFile: "",
    image: "",
    btnEnable: false,

    txnSrvCategoryList: [],
    totalSrvBal: 0,
    toalSrvCategoryPerPage: 0,
    paging: {},
    action: "",
    params: {},
    coa: [],
  }),
  props: {},
  computed: {},
  watch: {
    dialogM3(val) {
      val || this.close();
    },
  },
  methods: {
    toolbarTemplate: function () {
      const templateHtml =
        "<span>" +
        '<a class="k-pager-refresh k-link k-button reload" title="Refresh"><span class="k-icon k-i-reload"></span> Refresh </a>' +
        "</span>";

      return kendo.template(templateHtml);
    },
    exportToExcel() {
      const grid = $("#gridSrvCategory").data("kendoGrid");
      grid.saveAsExcel();
    },
    excelExport: function (e) {
      // const pivot = this.$refs.gridTransactionDS.kendoWidget()
      // pivot.saveAsExcel()
      window.console.log(e.data);
    },
    initToolbar(that) {
      try {
        const grid = $("#gridSrvCategory").data("kendoGrid");
        const gridElement = grid.element || {};
        const toolbarElement = gridElement.find(".k-grid-toolbar");
        toolbarElement.on("click", ".k-pager-refresh", function (e) {
          e.preventDefault();
          onReloadData(that);
        });
        toolbarElement.on("click", ".k-pager-excel", function (e) {
          e.preventDefault();
          onExportExcel(that);
        });
      } catch (error) {
        window.console.log("init error", error);
      }
      function onReloadData(that) {
        that.onSearch();
      }

      function onExportExcel(that) {
        that.exportToExcel();
      }
    },
    onGetColor() {
      let grid = kendo.jQuery("#colorPickDSM").data("kendoColorPalette");
      this.category.color = grid.value();
      // window.console.log(grid, grid.value())
    },
    handleUpload() {
      this.$refs["fileupload"].click();
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
    rowNumberTmpl(dataItem) {
      let ds = this.$refs.gridSrvCategoryDS.kendoWidget(),
        index = ds.indexOf(dataItem);
      return index + 1;
    },
    onNewClick() {
      this.category = new CategoryModel({});
      this.category.id = undefined;
      this.mItemType = this.itemTypes[0];
      this.src = "";
      this.image = "";
      this.imgFile = "";
    },
    goEdit(e) {
      e.preventDefault();
      let grid = kendo.jQuery("#gridSrvCategory").data("kendoGrid");
      let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
      // window.console.log(dataItem)
      this.category = dataItem;
      this.src = "";
      this.image = dataItem.img || "";
      this.src =
        "https://s3-ap-southeast-1.amazonaws.com/images.banhji/" + dataItem.img || "";
      // if (dataItem.hasOwnProperty("img")) {
      //   if (dataItem.img.hasOwnProperty("default")) {
      //     if (dataItem.img.default.hasOwnProperty("thumb")) {
      //       this.src =
      //         "https://s3-ap-southeast-1.amazonaws.com/images.banhji/" +
      //         dataItem.img.default.thumb;
      //     }
      //   }
      // }
      this.mItemType = dataItem.type;
      this.category.types = "edit";
      // this.mOtherTax = dataItem.tax.hasOwnProperty("otherTax")
      //   ? dataItem.tax.otherTax
      //   : {};
      // this.mSpecificTax = dataItem.tax.hasOwnProperty("specificTax")
      //   ? dataItem.tax.specificTax
      //   : {};
      // this.mPurchaseTax = dataItem.tax.hasOwnProperty("purchaseTax")
      //   ? dataItem.tax.purchaseTax
      //   : {};
      // this.mVAT = dataItem.tax.hasOwnProperty("defaultTax")
      //   ? dataItem.tax.defaultTax
      //   : {};
      const account = dataItem.account || {};
      const incomeAcc = account.incomeAcc || "";
      const costOfGoodsSoldAcc = account.costOfGoodsSoldAcc || "";
      this.mAccRevenue = this.mappingAccount(this.coa, incomeAcc);
      // this.mAccInventory = dataItem.account.hasOwnProperty('inventoryAcc') ? dataItem.account.inventoryAcc : {}
      this.mAccCostOfGoodSold = this.mappingAccount(this.coa, costOfGoodsSoldAcc);
      this.dialogM3 = true;
    },
    close() {
      // let grid = $('#colorPickDSM').data("kendoColorPalette")
      // grid.value(null)
      this.category = new CategoryModel({});
      // this.loadTax()
      this.loadAccount();
      this.dialogM3 = false;
    },
    async loadItemType() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = true;
          categoryHandler.getAll().then((res) => {
            this.showLoading = false;
            this.itemTypes = res.filter((m) => m.name === "Service");
            if (this.itemTypes.length > 0) {
              this.mItemType = this.itemTypes[0];
            }
          });
        }, 10);
      });
    },
    // async loadCategory() {
    //   new Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve("resolved");
    //       this.showLoading = true;
    //       const param = {
    //         pattern: "cat#Service",
    //       };
    //       categoryHandler.getAllv2(param).then((res) => {
    //         this.showLoading = false;
    //         this.categoryList = res.data.data; // filter((o) => o.type.name === "Service");
    //       });
    //     }, 10);
    //   });
    // },
    async onSaveClose() {
      if (!this.$refs.form.validate()) {
        this.$refs.form.validate();
        return;
      }
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.btnEnable = true;
          const type = this.mItemType || {};
          const itemType = {
            id: type.id,
            isSystem: type.isSystem,
            name: type.name,
          };
          let data = {
            id: this.category.id ? this.category.id : "",
            abbr: this.category.abbr,
            name: this.category.name,
            color: this.category.color,
            img: this.imgFile,
            image: this.image,
            type: itemType,
            types: this.category.types || {},
            inventoryAcc: {},
            incomeAcc: new AccountModel(this.mAccRevenue),
            costOfGoodsSoldAcc: new AccountModel(this.mAccCostOfGoodSold),
            fixedAssetAcc: {},
            depreciationAcc: {},
            AccumulateDepAcc: {},
            account: {},
            defaultTax: new TaxModel(this.mVAT),
            purchaseTax: new TaxModel(this.mPurchaseTax),
            specificTax: new TaxModel(this.mSpecificTax),
            otherTax: new TaxModel(this.mOtherTax),
          };
          window.console.log(data, "data");
          categoryHandler
            .create(data)
            .then((response) => {
              if (response.data.statusCode === 201) {
                this.btnEnable = false;
                const res = response.data.data;
                const index = this.srvCategoryList.findIndex((item) => {
                  return res.id === item.id;
                });
                if (index < 0) {
                  if (this.srvCategoryList.length === 0) {
                    this.srvCategoryList = [res];
                  } else {
                    this.srvCategoryList.push(res);
                  }
                  const grid = kendo.jQuery("#gridSrvCategory").data("kendoGrid");
                  grid.refresh();
                } else {
                  this.srvCategoryList.splice(index, 1, res);
                  const grid = kendo.jQuery("#gridSrvCategory").data("kendoGrid");
                  grid.refresh();
                }
                if (this.srvCategoryList.length === 0) {
                  this.loadServiceCategory();
                }
                this.close();
                this.$snotify.success("Success");
                // this.$refs.form.resetValidation();
                // this.$refs.form.reset();
              }
            })
            .catch((e) => {
              this.btnEnable = false;
              this.$snotify.error("Something went wrong");
              this.errors.push(e);
            });
        }, 10);
      });
    },
    async loadAccount() {
      this.accLoading = true;
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          accountHandler.getAllPages().then((res) => {
            this.showLoading = false;
            this.coa = res;
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
              this.mAccRevenue = this.accRevenue[0];
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
        }, 300);
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
            // this.mPurchaseTax = purchaseTax // valuable tax

            if (this.specificTax.length > 0) {
              this.mSpecificTax = this.specificTax[0];
            }
            if (this.vat.length > 0) {
              this.mVAT = this.vat[0];
            }
            if (this.otherTax.length > 0) {
              this.mOtherTax = this.otherTax[0];
            }
            if (this.purchaseTax.length > 0) {
              this.mPurchaseTax = this.purchaseTax[0];
            }
          });
        }, 300);
      });
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
    async loadPage(that) {
      $(".service-category-list").html(`
                <span class="mt-2 srv-category-list-item-returned">0</span><br/>
                <div style="display: flex; flex-direction: 'row'">
                    <button class="srv-category-list-next-page" title="previous" style="width: 24px; font-size: 19px; margin-top: -6px;"> < </button>
                    <ul class="srv-category-list-page-number page_scroll" style="display: flex;list-style: none; padding-left: 0px;">
                        <li style="padding: 6px; padding-bottom: 0px;"  data-page="1" class="srv-category-list-page-link text-bold-link" >1</li>
                    </ul>
                    <button class="srv-category-list-next-page" title="next" style="width: 24px; font-size: 19px;margin-top: -6px;"> > </button>
                </div>
            `);
      $(document).on("click", ".srv-category-list-page-link", function () {
        const page = $(this).data("page");
        $(".srv-category-list-page-link").removeClass("text-bold-link");
        $(this).addClass("text-bold-link");
        that.backToPage(that, page - 1);
        window.console.log(page - 1);
      });
      // $(document).on('click', '.bycus-next-page', function () {
      $(".srv-category-list-next-page").click(function () {
        const page_number = $(this)
          .parent()
          .children(".srv-category-list-page-number")
          .find("li")
          .last()
          .data("page");
        window.console.log("srv-category-list-page_number", page_number);
        const isPrevious = $(this).attr("title");
        if (isPrevious == "previous") {
          const currectpage = $(".text-bold-link").data("page");

          if (currectpage == 1) {
            return;
          }
          $(".srv-category-list-page-link").removeClass("text-bold-link");
          $(`.srv-category-list-page-link:eq(${currectpage - 1})`).addClass(
            "text-bold-link"
          );
          that.backToPage(that, currectpage - 2);
          window.console.log("this currectpage back", currectpage - 2);
        } else {
          $(".srv-category-list-page-link").removeClass("text-bold-link");
          that.loadServiceCategory(that.search);
          $(this)
            .parent()
            .children(".srv-category-list-page-number")
            .append(
              `<li class="srv-category-list-page-link text-bold-link" style="padding: 6px; padding-bottom: 0px;" data-page="${
                page_number + 1
              }">${page_number + 1}</li>`
            );
        }
        window.console.log("this", page_number + 1);
      });
    },
    itemRetuned(that) {
      let totalRow = 0;
      that.txnSrvCategoryList.forEach((k) => {
        totalRow += k.length;
      });
      $(".srv-category-list-item-returned").text("Items returned (" + totalRow + ")");
    },
    disabledNextPage(value) {
      $(".srv-category-list-next-page").prop("disabled", value);
    },
    backToPage(that, index) {
      try {
        const byProduct = that.txnSrvCategoryList.at(index);
        that.srvCategoryList = byProduct;
        // that.refreshGridData(customer)
        window.console.log("that.txnSrvCategoryList[index]", byProduct);
      } catch (e) {
        window.console.log("ERROR on backToPage", index);
      }
    },
    onSearch(search) {
      this.txnSrvCategoryList = [];
      this.loadPage(this);
      this.paging = {};
      this.loadServiceCategory(search);
    },
    async loadServiceCategory() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.srvCategoryList = [];
          this.params = {
            key: this.paging,
            pattern: "cat#Service",
          };
          this.showLoading = true;
          this.disabledNextPage(true);
          categoryHandler.getv2(this.params).then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoading = false;
              const responseData = res.data.data || [];
              const total = res.data.total || 0;
              this.showLoading = false;
              this.srvCategoryList = responseData;
              this.paging = res.data.key;
              window.console.log("key", res.data.key);
              this.txnSrvCategoryList.push(responseData);

              this.toalSrvCategoryPerPage = this.srvCategoryList.length;
              this.totalSrvBal = total;

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
    await this.onSearch("");
    await this.loadItemType();
    this.loadPage(this);
    this.itemRetuned(this);
    this.disabledNextPage(true);
    this.initToolbar(this);
  },
  created: async function () {
    await this.loadAccount();
    // await this.loadTax();
  },
};
</script>

<style scoped>
.acc_group header {
  height: 10px !important;
}

table.acc_group tr td {
  border-bottom: 1px solid #ccc;
  padding: 8px;
  vertical-align: middle;
}

table.acc_group tr td:first-child {
  font-weight: 700;
}

table.acc_group tr td:last-child {
  text-align: center;
}

.v-card__actions .v-btn.v-btn {
  padding: 0 16px;
}

.exchange-table.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > thead
  > tr
  > th {
  font-family: "Niradei-Bold", serif;
  color: #000 !important;
  border-top: 1px solid #000 !important;
  border-bottom: 1px solid #000 !important;
  font-size: 15px !important;
}

.exchange-table.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > thead
  > tr
  > td {
  color: #000 !important;
  padding: 5px !important;
}

.exchange-table.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:last-child
  td {
  border-bottom: 1px solid #000 !important;
}

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

.v-application .error--text {
  color: #ff5252 !important;
  padding-top: 3px;
  caret-color: #ff5252 !important;
}

@media (max-width: 576px) {
}
</style>
