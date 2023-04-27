<template>
  <v-row>
    <v-col class="pb-0 pr-4 pt-0" sm="4" cols="12">
      <div class="d-flex">
        <v-card class="pa-3 white--text" elevator="0" style="width: 80%" color="primary">
          <div class="d-flex justify-space-between">
            <h3 class="center_left_title text-uppercase">
              {{ $t("total_products_variant") }}
            </h3>
            <h1>{{ totalVariant }}</h1>
          </div>
        </v-card>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs"
              @click="rotate = !rotate"
              style="height: 47px !important"
              class="text-bold ml-2 px-2 white--text"
              v-on="on"
              to="product"
            >
              {{ $t("new") }}
            </v-btn>
          </template>
        </v-menu>
      </div>
      <v-card outlined dense color="grayBg" class="pa-3 no_border mb-4">
        <div class="d-flex">
          <v-text-field
            outlined
            :placeholder="switchModelVariant == 0 ? $t('name') : $t('sku')"
            append-icon="search"
            v-model.trim="search"
            @change="onSearch(search)"
            clearable
          />
          <v-switch
            v-model="switchModelVariant"
            class="mt-1 ml-1 mr-0"
            color="primary"
            :label="switchModelVariant == 0 ? '' : ''"
          />
          <!-- <v-btn icon @click="loadData">
            <v-icon>refresh</v-icon>
          </v-btn> -->
        </div>
        <v-autocomplete
          tage="Product Category"
          v-model="mCategory"
          :items="categories"
          item-value="id"
          :item-text="(item) => `${item.abbr} - ${item.name}`"
          @change="onCategoryChanged('')"
          return-object
          :placeholder="$t('category')"
          clearable
          outlined
        ></v-autocomplete>
        <v-autocomplete
          tage="Product Group"
          v-model="mGroup"
          :items="groups"
          item-value="id"
          :item-text="(item) => `${item.abbr} - ${item.name}`"
          @change="onCategoryChanged('')"
          return-object
          :placeholder="$t('group')"
          clearable
          outlined
        ></v-autocomplete>
        <v-autocomplete
          tage="Product Sub Group"
          v-model="mSubGroup"
          :items="subGroup"
          item-value="id"
          :item-text="(item) => `${item.abbr} - ${item.name}`"
          @change="onCategoryChanged('')"
          return-object
          :placeholder="$t('sub_group')"
          clearable
          outlined
        ></v-autocomplete>
        <div style="overflow: auto" class="page-variant-center"></div>
      </v-card>
      <v-card outlined dense color="grayBg" class="pa-3 no_border hidden-sm-and-down">
        <!-- loading -->
        <div v-if="isLoaded">
          <LoadingMe
            :isLoading="showLoading"
            :fullPage="false"
            type="loading"
            :myLoading="true"
          />
        </div>
        <v-card outlined dense class="no_border hidden-sm-and-down">
          <!-- loading -->
          <div v-if="!isLoaded">
            <LoadingMe
              :isLoading="showLoading"
              :fullPage="false"
              type="loading"
              :myLoading="true"
            />
          </div>
          <kendo-datasource
            ref="productVariantCenterDS"
            :data="VariantCenterList"
            :schema="gridSchema"
            :sort="sortDefinition"
          >
          </kendo-datasource>
          <kendo-grid
            id="gridVariantCenterProduct"
            class="grid-center"
            :change="onChanged"
            :data-source-ref="'productVariantCenterDS'"
            :selectable="true"
            :persistSelection="true"
            :noRecords="true"
            :scrollable="true"
            :navigatable="true"
            :height="426"
            :pageable-numeric="false"
            :pageable-previous-next="false"
            :pageable-messages-display="'Showing {2} data items'"
          >
            <kendo-grid-column
              :field="'name'"
              :title="'Name'"
              :template="'<span>#=sku# - #=name#</span>'"
              :group-header-template="'#=value#'"
            />
          </kendo-grid>
        </v-card>
      </v-card>
    </v-col>
    <v-col sm="8" cols="12" class="pb-0 pt-0 px-0">
      <v-tabs>
        <v-tab>
          <span class="hidden-sm-and-up"
            ><v-icon left>mdi-information-variant</v-icon></span
          >
          <span class="hidden-sm-and-down text-uppercase">{{ $t("info") }}</span>
        </v-tab>
        <v-tab>
          <span class="hidden-sm-and-up"><v-icon left>mdi-pen</v-icon></span>
          <span class="hidden-sm-and-down text-uppercase">{{ $t("txn_") }}</span>
        </v-tab>
        <!-- <v-tab>
          <span class="hidden-sm-and-up"
            ><v-icon left>mdi-information-variant</v-icon></span
          >
          <span class="hidden-sm-and-down text-uppercase">{{ $t("pair") }}</span>
        </v-tab> -->
        <v-tab>
          <span class="hidden-sm-and-up"><v-icon left>mdi-pen</v-icon></span>
          <span class="hidden-sm-and-down text-uppercase">{{ $t("sku") }}</span>
        </v-tab>
        <v-tab>
          <span class="hidden-sm-and-up"><v-icon left>mdi-pen</v-icon></span>
          <span class="hidden-sm-and-down text-uppercase">{{ $t("uom") }}</span>
        </v-tab>
        <v-tab>
          <span class="hidden-sm-and-up"><v-icon left>mdi-pen</v-icon></span>
          <span class="hidden-sm-and-down text-uppercase">{{ $t("price") }}</span>
        </v-tab>
        <v-tab>
          <span class="hidden-sm-and-up"><v-icon left>mdi-pen</v-icon></span>
          <span class="hidden-sm-and-down text-uppercase">{{ $t("cost") }}</span>
        </v-tab>
        <v-tab>
          <span class="hidden-sm-and-up"><v-icon left>mdi-pen</v-icon></span>
          <span class="hidden-sm-and-down text-uppercase">{{ $t("image") }}</span>
        </v-tab>
        <v-tab-item>
          <v-row>
            <v-col sm="12" cols="12" class="pt-0 pl-3 pr-6">
              <v-row class="grayBg">
                <v-col sm="12" cols="12" class="">
                  <v-card outlined color="white" class="pa-3">
                    <Info :product="info" @onUpdate="callback" />
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item>
          <v-row>
            <v-col sm="12" cols="12" class="pt-0 pl-3 pr-6">
              <v-row class="grayBg">
                <v-col sm="12" cols="12" class="">
                  <v-card outlined color="white" class="pa-3">
                    <Transactions :item="info" @onUpdate="callback" />
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-tab-item>
        <!-- <v-tab-item>
          <v-row>
            <v-col sm="12" cols="12" class="pt-0 pl-3 pr-6">
              <v-row class="grayBg">
                <v-col sm="12" cols="12" class="">
                  <v-card outlined color="white" class="pa-3">
                    <Pair :product="info" />
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-tab-item> -->
        <v-tab-item>
          <v-row>
            <v-col sm="12" cols="12" class="pt-0 pl-3 pr-6">
              <v-row class="grayBg">
                <v-col sm="12" cols="12" class="">
                  <v-card outlined color="white" class="pa-3">
                    <SKU :product="info" />
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item>
          <v-row>
            <v-col sm="12" cols="12" class="pt-0 pl-3 pr-6">
              <v-row class="grayBg">
                <v-col sm="12" cols="12" class="">
                  <v-card outlined color="white" class="pa-3">
                    <Uom :product="info" />
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item>
          <v-row>
            <v-col sm="12" cols="12" class="pt-0 pl-3 pr-6">
              <v-row class="grayBg">
                <v-col sm="12" cols="12" class="">
                  <v-card outlined color="white" class="pa-3">
                    <Price :product="info" />
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item>
          <v-row>
            <v-col sm="12" cols="12" class="pt-0 pl-3">
              <v-row class="grayBg">
                <v-col sm="12" cols="12" class="">
                  <v-card outlined color="white" class="pa-3">
                    <Cost :product="info" />
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item>
          <v-row>
            <v-col sm="12" cols="12" class="pt-0 px-3 pr-6">
              <v-row class="grayBg">
                <v-col sm="12" cols="12" class="">
                  <v-card outlined color="white" class="pa-3">
                    <Images :product="info" @onUpdate="callback" />
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs>
    </v-col>
  </v-row>
</template>

<script>
// import ProductModel from "@/scripts/model/Products"

import kendo from "@progress/kendo-ui";

const $ = kendo.jQuery;
const productHandler = require("@/scripts/productHandler");
const categoryHandler = require("@/scripts/categoryHandler");
const groupHandler = require("@/scripts/groupHandler");
const subGroupHandler = require("@/scripts/subGroupHandler");
// let productModel = new ProductModel({})
const loanHandler = require("@/scripts/loanHandler");
import { dataStore } from "@/observable/store";

export default {
  name: "Variants",
  props: ["product"],
  components: {
    Images: () => import(`./Images`),
    Cost: () => import(`./Cost`),
    Uom: () => import(`./Uom`),
    Info: () => import(`./Info`),
    Transactions: () => import(`./Transactions`),
    Price: () => import(`./Price`),
    SKU: () => import(`./Sku`),
    // Pair: () => import(`./Pair`),
    LoadingMe: () => import(`@/components/Loading`),
  },
  data: () => ({
    rotate: false,
    VariantCenterList: [],
    isLoaded: true,
    showLoading: false,
    info: {},
    mCategory: "",
    mGroup: {},
    mSubGroup: {},
    categories: [],
    groups: [],
    subGroup: [],
    subGroups: [],
    search: "",
    sortDefinition: [{ field: "sku", dir: "asc" }],
    gridSchema: {
      model: {
        id: "id",
      },
    },
    txnVariantCenter: [],
    totalVariant: 0,
    toalVariantPerPage: 0,
    paging: {},
    action: "",
    params: {},
    switchModelVariant: 0,
  }),
  watch: {},
  methods: {
    // Pass value to other component
    async productInfo() {
      this.$emit("onUpdate", this.product);
    },
    async onChanged() {
      let grid = kendo.jQuery("#gridVariantCenterProduct").data("kendoGrid");
      let selectedItem = grid.dataItem(grid.select());
      this.info = selectedItem;

      this.$emit("onUpdate", selectedItem);
      // window.console.log(selectedItem['images'])
    },
    // async loadProducts() {
    //   this.isLoaded = true;
    //   this.showLoading = true;
    //   new Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve("resolved");
    //       productHandler.get().then((res) => {
    //         this.showLoading = false;
    //         this.variants = res;
    //       });
    //     }, 50);
    //   });
    // },
    async onCategoryChanged(search) {
      const groupId = (this.mGroup || {}).id || "";
      this.subGroup = this.subGroups.filter((k) => k.group.id === groupId);
      if (this.subGroup.length === 0) {
        this.mSubGroup = {};
      }
      this.txnVariantCenter = [];
      this.loadPage(this);
      this.paging = {};
      this.loadVariantCenter(search);
    },
    async loadCategory() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          const param = {
            pattern: "cat#Product",
          };
          categoryHandler.getAllv2(param).then((res) => {
            this.showLoading = false;

            // this.categories = this.categories.filter(
            //   (m) => m.type.name === "Product"
            // );

            if (
              this.appType !== "Supply" &&
              this.appType !== "Marketing" &&
              this.appType !== "Service"
            ) {
              this.categories = res.data.data;
              if (this.categories.length > 0) {
                this.mCategory = this.categories[0];
                this.onCategoryChanged();
              }
            } else {
              this.loadBizSetting(res.data.data);
            }
          });
        }, 50);
      });
    },
    async loadGroup() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          const param = {
            pattern: "grp#Product",
          };
          groupHandler.getAllv2(param).then((res) => {
            this.groups = res.data.data; //.filter((k) => k.category.type.name === "Product");
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
          subGroupHandler.getAllv2(param).then((res) => {
            this.showLoading = false;
            this.subGroups = res.data.data;
          });
        }, 10);
      });
    },
    callback(variant) {
      const index = this.VariantCenterList.findIndex((item) => {
        return variant.id === item.id;
      });
      if (index < 0) {
        this.VariantCenterList.push(variant);
      } else {
        this.VariantCenterList.splice(index, 1, variant);
      }
    },
    async loadData() {
      await this.loadCategory();
    },
    onSearch(search) {
      this.txnVariantCenter = [];
      this.loadPage(this);
      this.paging = {};
      this.loadVariantCenter(search);
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
            type: "Variant",
          };
          this.showLoading = true;
          this.disabledNextPage(true);
          productHandler.center(this.params).then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoading = false;
              let responseData = res.data.data || [];
              let total = res.data.total || 0;
              if (
                this.appType == "Supply" ||
                this.appType == "Marketing" ||
                this.appType == "Service"
              ) {
                let newData = [];
                responseData.forEach((resD) => {
                  this.categories.forEach((cat) => {
                    if (resD.category.id === cat.id) {
                      newData.push(resD);
                    }
                  });
                });
                responseData = newData;
                total = responseData.length;
              }

              this.showLoading = false;
              this.VariantCenterList = responseData;
              this.paging = res.data.key;
              window.console.log("key", res.data.key);
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
    async loadPage(that) {
      $(".page-variant-center").html(`
                <span class="mt-2 by-variant-center-item-returned">0</span><br/>
                <div style="display: flex; flex-direction: 'row'">
                    <button class="by-variant-center-next-page" title="previous" style="width: 24px; font-size: 19px; margin-top: -6px;"> < </button>
                    <ul class="by-variant-center-page-number page_scroll" style="display: flex;list-style: none; padding-left: 0px;">
                        <li style="padding: 6px; padding-bottom: 0px;"  data-page="1" class="by-variant-center-page-link text-bold-link" >1</li>
                    </ul>
                    <button class="by-variant-center-next-page" title="next" style="width: 24px; font-size: 19px;margin-top: -6px;"> > </button>
                </div>
            `);
      $(document).on("click", ".by-variant-center-page-link", function () {
        const page = $(this).data("page");
        $(".by-variant-center-page-link").removeClass("text-bold-link");
        $(this).addClass("text-bold-link");
        that.backToPage(that, page - 1);
        window.console.log(page - 1);
      });
      // $(document).on('click', '.bycus-next-page', function () {
      $(".by-variant-center-next-page").click(function () {
        const page_number = $(this)
          .parent()
          .children(".by-variant-center-page-number")
          .find("li")
          .last()
          .data("page");
        window.console.log("by-variant-center-page_number", page_number);
        const isPrevious = $(this).attr("title");
        if (isPrevious == "previous") {
          const currectpage = $(".text-bold-link").data("page");

          if (currectpage == 1) {
            return;
          }
          $(".by-variant-center-page-link").removeClass("text-bold-link");
          $(`.by-variant-center-page-link:eq(${currectpage - 1})`).addClass(
            "text-bold-link"
          );
          that.backToPage(that, currectpage - 2);
          window.console.log("this currectpage back", currectpage - 2);
        } else {
          $(".by-variant-center-page-link").removeClass("text-bold-link");
          that.loadVariantCenter(that.search);
          $(this)
            .parent()
            .children(".by-variant-center-page-number")
            .append(
              `<li class="by-variant-center-page-link text-bold-link" style="padding: 6px; padding-bottom: 0px;" data-page="${
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
      $(".by-variant-center-item-returned").text(
        "Items returned (" + totalRow + " of " + that.totalVariant + ")"
      );
    },
    disabledNextPage(value) {
      $(".by-variant-center-next-page").prop("disabled", value);
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
    async loadBizSetting(allCats) {
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
                let ca = allCats.filter((o) => {
                  return o.id == m.id;
                });
                if (ca.length > 0) {
                  cates.push(ca[0]);
                }
              });
              this.categories = cates;
              if (this.categories.length > 0) {
                this.mCategory = this.categories[0];
                this.onCategoryChanged();
              }
            }
          }
        }
      });
    },
  },
  computed: {
    appType() {
      window.console.log("apptype", dataStore.productType);
      return dataStore.productType;
    },
  },
  mounted: async function () {
    this.loadCategory();
    this.loadGroup();
    this.loadSubGroup();
    this.loadPage(this);
    this.itemRetuned(this);
    this.disabledNextPage(true);
  },
};
</script>
<style scoped>
.v-tab {
  justify-content: left;
}

.grid-center.center_heigth {
  height: 414px !important;
}

.v-tab--active {
  background-color: rgb(255, 255, 255);
}

.v-tab--active {
  background-color: #e5effa;
  color: #000;
}

@media (max-width: 576px) {
  .v-tab {
    min-width: auto !important;
  }

  .paddingLeft {
    margin-left: 15px;
  }
}
</style>
