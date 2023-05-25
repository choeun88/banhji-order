<template>
  <v-row class="">
    <v-col sm="12" cols="12" class="grayBg px-6">
      <v-card color="white" class="pa-3 no_border" elevation="0">
        <h2 class="mb-0 font_20">{{ $t("service_directory") }}</h2>
        <p>{{ $t("service_directory_desc") }}</p>
        <v-row class="">
          <v-col sm="12" cols="12" class="py-0">
            <v-row class="">
              <v-col sm="4" cols="12" class="py-0">
                <v-text-field
                  class="mt-1"
                  clearable
                  v-model="search"
                  :placeholder="$t('service_directory')"
                  outlined
                />
              </v-col>
              <v-col sm="1" cols="12" class="py-1">
                <v-btn
                  color="primary"
                  class="white--text capitalize marginTopPhone"
                  @click="onSearch(search)"
                >
                  {{ $t("search") }}
                </v-btn>
              </v-col>
              <v-col sm="2" cols="12" class="py-0 mt-1">
                <v-dialog persistent v-model="dialogm2" max-width="500px">
                  <template v-slot:activator="{ on }">
                    <v-btn
                      outlined
                      class="secondary--text capitalize float-right"
                      color="primary"
                      v-on="on"
                      @click="importShow"
                    >
                      {{ $t("import") }}
                    </v-btn>
                  </template>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <LoadingMe
                      :isLoading="showLoading"
                      :fullPage="false"
                      type="loading"
                      :myLoading="true"
                    />
                    <v-card>
                      <v-card-title>{{ $t("import_service") }}</v-card-title>
                      <v-icon class="btn_close" @click="dialogm2 = false">close</v-icon>
                      <v-divider />
                      <v-card-text style="background-color: #edf1f5; color: #333333">
                        <v-row>
                          <v-col sm="12" cols="12" class="pb-0">
                            <label class="label mb-0">{{ $t("category") }}</label>
                            <v-select
                              class="mt-1"
                              tage="Service Category"
                              :placeholder="$t('select_type')"
                              outlined
                              v-model="impCategory"
                              :items="categories"
                              item-value="id"
                              :item-text="(item) => `${item.abbr} - ${item.name}`"
                              @change="onCategoryChanged"
                              clearable
                              return-object
                              :rules="[(v) => !!v || 'Category is required']"
                              required
                            />
                            <label class="label mb-0">{{ $t("group") }}</label>
                            <v-select
                              class="mt-1"
                              tage="Product Group"
                              :placeholder="$t('select_group')"
                              outlined
                              v-model="impGroup"
                              :disabled="disabled"
                              :items="groupss"
                              @change="onGroupChanged"
                              item-value="id"
                              clearable
                              :item-text="(item) => `${item.abbr} - ${item.name}`"
                              return-object
                            />
                            <label class="label mb-0">{{ $t("sub_group") }}</label>
                            <v-select
                              class="mt-1"
                              :placeholder="$t('select_sub_group')"
                              outlined
                              tage="Sub Group"
                              v-model="impSubGroup"
                              :items="subGroup"
                              :disabled="disabledS"
                              item-value="id"
                              return-object
                              clearable
                              :item-text="(item) => `${item.abbr} - ${item.name}`"
                              required
                            />
                            <v-row>
                              <v-col sm="6" cols="6" class="pb-0">
                                <upload-excel-component
                                  :on-success="handleSuccess"
                                  :before-upload="beforeUpload"
                                />
                              </v-col>
                              <v-col sm="6" cols="6" class="pb-0">
                                <v-btn
                                  outlined
                                  class="secondary--text capitalize float-right"
                                  href="/files/importService.xlsx"
                                  download
                                >
                                  <span class="">{{ $t("download_file") }}</span>
                                </v-btn>
                              </v-col>
                            </v-row>
                          </v-col>
                        </v-row>
                      </v-card-text>
                      <v-divider />
                      <v-col sm="12" cols="12" class="py-0">
                        <v-card-actions class="pa-4">
                          <v-row>
                            <v-col sm="6" cols="6" class="py-0 pl-0">
                              <v-btn
                                color="black"
                                outlined
                                class="text-capitalize black--text float-left"
                                @click="dialogm2 = false"
                                >{{ $t("cancel") }}
                              </v-btn>
                            </v-col>
                            <v-col sm="6" cols="6" class="py-0 pr-0">
                              <v-btn
                                :disabled="btnDisabled"
                                color="secondary"
                                class="px-3 white--text text-capitalize float-right"
                                @click="saveImport"
                              >
                                {{ $t("import") }}
                              </v-btn>
                            </v-col>
                          </v-row>
                        </v-card-actions>
                      </v-col>
                    </v-card>
                  </v-form>
                </v-dialog>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row class="">
          <v-col sm="12" cols="12" class="py-0 custom_pagination dir-product">
            <kendo-datasource
              ref="dataSourceDirection"
              :data="VariantCenterList"
              :sort="sort"
              :group="group"
            />
            <kendo-grid
              id="gridProductirectory"
              class="grid-function"
              :data-source-ref="'dataSourceDirection'"
              :editable="false"
              :groupable="true"
              :noRecords="true"
              :sortable="true"
              :excel-file-name="'Service Directory.xlsx'"
              :excel-filterable="true"
              :excel-all-pages="true"
              :toolbar="['excel']"
              :column-menu="true"
              :resizable="true"
              :pageable="true"
              :scrollable-virtual="true"
            >
              <kendo-grid-column
                :field="'sku'"
                :width="150"
                :title="$t('number')"
                :template="'<span>#=sku#</span>'"
                :headerAttributes="{ style: 'background-color: #EDF1F5' }"
              />
              <kendo-grid-column
                :field="'name'"
                :title="$t('name')"
                :width="200"
                :template="'<span>#=name#</span>'"
                :headerAttributes="{ style: 'background-color: #EDF1F5' }"
              />
              <kendo-grid-column
                :field="'category.name'"
                :title="$t('category')"
                :width="160"
                :template="'<span>#=category.name#</span>'"
                :headerAttributes="{ style: 'background-color: #EDF1F5' }"
              />
              <kendo-grid-column
                :field="'group.name'"
                :hidden="true"
                :title="$t('group')"
                :width="200"
                :template="'<span>#=group.name#</span>'"
                :headerAttributes="{ style: 'background-color: #EDF1F5' }"
              />
              <kendo-grid-column
                :field="'subGroup.name'"
                :hidden="true"
                :title="$t('sub_group')"
                :width="200"
                :template="'<span>#=subGroup.name#</span>'"
                :headerAttributes="{ style: 'background-color: #EDF1F5' }"
              />
              <kendo-grid-column
                :field="'priceLevel.name'"
                :title="$t('price_level')"
                :width="100"
                :template="'<span>#=priceLevel.name#</span>'"
                :headerAttributes="{ style: 'background-color: #EDF1F5' }"
              />
              <kendo-grid-column
                :field="'uom.name'"
                :title="$t('uom')"
                :width="120"
                :template="'<span>#=uom.name#</span>'"
                :headerAttributes="{ style: 'background-color: #EDF1F5' }"
              />
              <kendo-grid-column
                :field="'price'"
                :title="$t('price')"
                :width="150"
                :template="'<span>#=kendo.toString(price, `n2`)#</span> <span>#=priceLevel.currency.code#</span>'"
                :attributes="{ style: 'text-align: right !important;' }"
                :headerAttributes="{ style: 'background-color: #EDF1F5' }"
              />
              <kendo-grid-column
                :field="'revenueAccount.name'"
                :title="$t('revenue_account')"
                :width="150"
                :template="'<span>#=revenueAccount.name || ``#</span>'"
                :headerAttributes="{ style: 'background-color: #EDF1F5' }"
              />
              <kendo-grid-column
                :field="'costOfGoodsSoldAcc.name'"
                :title="$t('cost_of_goods_sold')"
                :width="150"
                :template="'<span>#=costOfGoodsSoldAcc.name || ``#</span>'"
                :headerAttributes="{ style: 'background-color: #EDF1F5' }"
              />
            </kendo-grid>
            <LoadingMe
              :isLoading="showLoading"
              :fullPage="false"
              :myLoading="true"
              type="loading"
            />
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import kendo from "@progress/kendo-ui";
import JSZip from "jszip";
const productHandler = require("@/scripts/productHandler");
// const categoryHandler = require("@/scripts/categoryHandler")

const accountHandler = require("@/scripts/handler/accounting/account");
import ItemLineModel from "@/scripts/cash-receipt/model/ItemLine";
import serviceItemHandler from "@/scripts/serviceItemHandler";
import UploadExcelComponent from "@/components/upload_excel/TimeCard";
import categoryHandler from "@/scripts/categoryHandler";
import groupHandler from "@/scripts/groupHandler";
import subGroupHandler from "@/scripts/subGroupHandler";
import uomHandler from "@/scripts/uomHandler";
import priceLevelHandler from "@/scripts/priceLevelHandler";

const itemLineModel = new ItemLineModel({});
import { i18n } from "@/i18n";
window.JSZip = JSZip;
const $ = kendo.jQuery; //require("jquery")
export default {
  name: "ProductDiretory",
  data: () => ({
    dialogm2: false,
    valid: true,
    showLoading: false,
    start_date: "",
    end_date: "",
    group: { field: "category.name" },
    search: "",
    paging: {},
    disabledMe: true,
    VariantCenterList: [],
    sort: { field: "sku", dir: "ASC" },
    isLoaded: true,
    info: {},
    mCategory: "",
    mGroup: {},
    mSubGroup: {},
    categories: [],
    groups: [],
    subGroup: [],
    subGroups: [],

    impCategory: {},
    disabled: true,
    disabledS: true,
    btnDisabled: false,
    transactions: [],
    dateFormat: itemLineModel.dateFormat,
    decimalFormat: "n2",
    groupss: [],
    uoms: [],
    impGroup: {},
    impSubGroup: {},
    priceLevels: [],
    coa: [],

    gridSchema: {
      model: {
        id: "id",
      },
    },
    txnVariantCenter: [],
    totalVariant: 0,
    toalVariantPerPage: 0,
    action: "",
    params: {},
    switchModelVariant: 0,
  }),
  components: {
    LoadingMe: () => import(`@/components/Loading`),
    "upload-excel-component": UploadExcelComponent,
  },
  props: {},
  methods: {
    mappingAccount(coa, uuid) {
      const account = coa.filter((k) => k.uuid === uuid);
      return account.map((j) => {
        j.id = j.uuid;
        return {
          ...j,
        };
      })[0];
    },
    importShow() {
      if (this.categories.length > 0) {
        this.impCategory = this.categories[0];
        this.onCategoryChanged();
      }
    },
    saveImport() {
      if (this.tableData.length > 0) {
        let data = {
          data: this.tableData,
        };
        this.showLoading = true;
        this.btnDisabled = true;
        window.console.log(data, "here data");
        serviceItemHandler
          .importServiceItem(data)
          .then((response) => {
            this.showLoading = false;
            if (response.data.statusCode === 201) {
              this.$refs.form.reset();
              this.showLoading = false;
              this.btnDisabled = false;
              this.$snotify.success("Successfully");
              this.dialogm2 = false;
            }
          })
          .catch((e) => {
            this.showLoading = false;
            this.$snotify.error("Something went wrong");
            this.errors.push(e);
          });
      }
    },
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (isLt1M) {
        return true;
      }
      this.$message({
        message: "Please do not upload files larger than 1m in size.",
        type: "warning",
      });
      return false;
    },
    handleSuccess({ results, header }) {
      results.forEach((element) => {
        let c = this.impCategory;
        element.typeIs = "Service";
        let uo = this.uoms.filter((obj) => {
          return obj.name == element.uom;
        });
        if (uo.length > 0) {
          element.uom = uo[0];
        } else {
          this.$snotify.error("uom not found!");
          return;
        }
        element.category = c;
        element.group = this.impGroup || {};
        element.subGroup = this.impSubGroup || {};
        let p = this.priceLevels.filter((obj) => {
          return obj.name == element.priceLevel;
        });
        if (p.length > 0) {
          element.priceLevel = p[0];
        } else {
          this.$snotify.error("price level not found!");
          return;
        }
        element.warehouse = {};
        element.base = 100;
        element.value = element.price;

        const account = this.impCategory.account || {};
        const incomeAcc = account.incomeAcc || "";
        const costOfGoodsSoldAcc = account.costOfGoodsSoldAcc || "";

        element.incomeAcc = this.mappingAccount(this.coa, incomeAcc);
        element.costOfGoodsSoldAcc = this.mappingAccount(this.coa, costOfGoodsSoldAcc);
        element.canBeSold = false;
        element.canBeSubContracted = false;
        element.isDelayedRevenue = false;
        element.isConsignmentItem = false;
        element.canBeRecurringSubscribed = false;
        element.isMeteredService = false;
        element.isTimeBounded = false;
        element.loggedUser = this.loggedUser;
        element.type = "new";
        element.saveOption = "imported";
        element.reUsed = false;
      });
      this.tableData = results;
      this.tableHeader = header;
      window.console.log(this.tableData, this.tableHeader, "dataaaaa");
    },
    onSearch(search) {
      this.txnVariantCenter = [];
      this.loadPage(this);
      this.paging = {};
      this.loadVariantCenter(search);
    },
    async loadPage(that) {
      $(".dir-product .k-pager-wrap").html(`
                <label class="label dir-product-item-returned">0</label>
                <div style="display: flex; flex-direction: 'row'">
                    <button class="dir-next-page" title="previous" style="width: 24px; font-size: 19px;"> < </button>
                    <ul class="dir-page-number" style="display: flex;list-style: none; padding-left: 0px;">
                        <li style="padding: 6px;"  data-page="1" class="dir-page-link text-bold-link" >1</li>
                    </ul>
                    <button class="dir-next-page" title="next" style="width: 24px; font-size: 19px;"> > </button>
                </div>
            `);
      $(document).on("click", ".dir-page-link", function () {
        const page = $(this).data("page");
        $(".dir-page-link").removeClass("text-bold-link");
        $(this).addClass("text-bold-link");
        that.backToPage(that, page - 1);
        window.console.log(page - 1);
      });
      // $(document).on('click', '.dir-next-page', function () {
      $(".dir-next-page").click(function () {
        const page_number = $(this)
          .parent()
          .children(".dir-page-number")
          .find("li")
          .last()
          .data("page");
        window.console.log("page_number", page_number);
        const isPrevious = $(this).attr("title");
        if (isPrevious == "previous") {
          const currectpage = $(".text-bold-link").data("page");

          if (currectpage == 1) {
            return;
          }
          $(".dir-page-link").removeClass("text-bold-link");
          $(`.dir-page-link:eq(${currectpage - 1})`).addClass("text-bold-link");
          that.backToPage(that, currectpage - 2);
          window.console.log("this currectpage back", currectpage - 2);
        } else {
          $(".dir-page-link").removeClass("text-bold-link");
          that.loadVariantCenter(that.search);
          $(this)
            .parent()
            .children(".dir-page-number")
            .append(
              `<li class="dir-page-link text-bold-link" style="padding: 6px;" data-page="${
                page_number + 1
              }">${page_number + 1}</li>`
            );
        }
        window.console.log("this", page_number + 1);
      });
    },
    itemRetuned(that) {
      let totalRow = 0;
      that.txnVariantCenter.forEach((k) => {
        totalRow += k.length;
      });
      $(".dir-product-item-returned").text(
        i18n.t("items_return") + "(" + totalRow + " of " + that.totalVariant + ")"
      );
    },
    async loadVariantCenter(search) {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.VariantCenterList = [];
          const category = this.mCategory || {};
          const categoryId = category.id || "";
          const group = this.mGroup || {};
          const groupId = group.id || "";
          const subGroup = this.mSubGroup || {};
          const subGroupId = subGroup.id || "";
          const switch_ = this.switchModelVariant || 0;
          this.params = {
            ctid: categoryId,
            grid: groupId,
            sgid: subGroupId,
            key: this.paging,
            search: search,
            searchAs: switch_ ? 1 : 0,
            type: "Service",
          };
          this.showLoading = true;
          this.disabledNextPage(true);
          productHandler.center(this.params).then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoading = false;
              const responseData = res.data.data || [];
              const total = res.data.total || 0;
              this.VariantCenterList = responseData;
              this.paging = res.data.key;
              this.txnVariantCenter.push(responseData);

              this.toalVariantPerPage = this.VariantCenterList.length;
              this.totalVariant = total;

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
    disabledNextPage(value) {
      $(".dir-next-page").prop("disabled", value);
    },
    backToPage(that, index) {
      try {
        const byProduct = that.txnVariantCenter.at(index);
        that.VariantCenterList = byProduct;
        // that.refreshGridData(customer)
        window.console.log("that.txnVariantCenter[index]", byProduct);
      } catch (e) {
        window.console.log("ERROR on backToPage", index);
      }
    },
    refreshGridData(data) {
      $("#gridProductirectory").data("kendoGrid").dataSource.data([]);
      $("#gridProductirectory").data("kendoGrid").dataSource.data(data);
    },
    UOMTemplate(dataItem) {
      if (dataItem.hasOwnProperty("uom")) {
        const uom = dataItem.uom;
        if (uom.hasOwnProperty("uom")) {
          if (uom.uom.hasOwnProperty("name")) {
            return uom.uom.name;
          }
        }
      }
      return ``;
    },
    BUOMTemplate(dataItem) {
      if (dataItem.hasOwnProperty("buom")) {
        const buom = dataItem.buom;
        if (buom.hasOwnProperty("name")) {
          return buom.name;
        }
      }
      return ``;
    },
    async loadCategory() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          const param = {
            pattern: "cat#Service",
          };
          categoryHandler.getAllv2(param).then((res) => {
            this.showLoading = false;
            this.categories = res;
            // window.console.log(res)
            this.categories = res.data.data;
            // this.categories = this.categories.filter(
            //   (i) => i.hasOwnProperty("type") && i.type.name === "Service"
            // );
          });
        }, 10);
      });
    },
    async loadGroup() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          const param = {
            pattern: "grp#Service",
          };
          groupHandler.getAllv2(param).then((res) => {
            this.showLoading = false;
            this.groups = res.data.data;
          });
        }, 10);
      });
    },
    async onGroupChanged() {
      const groupId = (this.impGroup || {}).id || "";
      this.subGroup = this.subGroups.filter((m) => m.group.id === groupId);
      window.console.log("impG", groupId, this.subGroups);
    },
    async loadSubGroup() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          const param = {
            pattern: "sgr#Service",
          };
          subGroupHandler.getAllv2(param).then((res) => {
            this.showLoading = false;
            this.subGroups = res.data.data;
            this.subGroup = res.data.data;
            this.disabledS = true;
            if (this.subGroups.length > 0) {
              this.disabledS = false;
            }
            // if (group) {
            //   if (group.hasOwnProperty("id")) {
            //     this.subGroups = res.filter((m) => m.group.id === group.id);
            //     this.disabledS = false;
            //   }
            // }
          });
        }, 10);
      });
    },
    async onCategoryChanged() {
      this.disabled = false;
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          // this.loadCategoryAccountAndTax()
          this.impGroup = {};
          this.impSubGroup = {};
          this.groupss = this.groups.filter((m) => m.category.id === this.impCategory.id);

          if (this.groupss.length > 0) {
            this.impGroup = this.groupss[0];
          }
        }, 10);
      });
    },
    async loadPriceLevel() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          priceLevelHandler.get().then((res) => {
            this.priceLevels = res;
          });
        }, 10);
      });
    },
    async loadUOM() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          uomHandler.get().then((res) => {
            this.showLoading = false;
            this.uoms = res;
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
            this.coa = res // .data;
            this.accLoading = false;
          });
        }, 10);
      });
    },
  },
  mounted: async function () {
    // await this.loadVariantCenter();
    this.loadPage(this);
    await this.loadAccount();
    await this.loadCategory();
    await this.loadGroup();
    await this.loadSubGroup();
    await this.loadUOM();
    await this.loadPriceLevel();
  },
  computed: {},
};
</script>
