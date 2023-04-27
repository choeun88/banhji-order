<template>
  <v-row>
    <v-col class="pb-0 pr-4 pt-0" sm="4" cols="12">
      <div class="d-flex">
        <v-card class="pa-3 white--text" elevator="0" style="width: 80%" color="primary">
          <div class="d-flex justify-space-between">
            <h3 class="center_left_title text-uppercase">
              {{ $t("total_products") }}
            </h3>
            <h1>{{ totalProduct }}</h1>
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
              <!-- <v-icon size="" class="my-1" :class="{ rotate_180: rotate }"
                >expand_more</v-icon
              > -->
            </v-btn>
          </template>
        </v-menu>
      </div>
      <v-card outlined dense color="grayBg" class="pa-3 no_border mb-4">
        <div class="d-flex">
          <v-text-field
            outlined
            :placeholder="switchModel == 0 ? $t('name') : $t('sku')"
            append-icon="search"
            v-model.trim="search"
            @change="onSearch(search)"
            clearable
          />
          <!-- <v-btn icon @click="loadData">
            <v-icon>refresh</v-icon>
          </v-btn> -->
          <v-switch
            v-model="switchModel"
            @change="onSwicthChange"
            class="mt-1 ml-1 mr-0"
            color="primary"
            :label="switchModel == 0 ? '' : ''"
          />
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
        <div style="overflow: auto" class="page-product-center"></div>
      </v-card>
      <v-card outlined dense color="grayBg" class="pa-3 no_border hidden-sm-and-down">
        <!-- loading -->
        <!-- <div v-if="isLoaded">
          <LoadingMe
            :isLoading="showLoading"
            :fullPage="false"
            type="loading"
            :myLoading="true"
          />
        </div> -->
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
            ref="productCenterDS"
            :data="productCenterList"
            :schema="gridSchema"
            :sort="sortDefinition"
          >
          </kendo-datasource>
          <kendo-grid
            id="totalProductCenter"
            class="grid-center"
            :change="onChanged"
            :data-source-ref="'productCenterDS'"
            :selectable="true"
            :persistSelection="true"
            :noRecords="true"
            :scrollable="true"
            :navigatable="true"
            :height="248"
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
    <v-col sm="8" cols="12" class="pb-0 pt-0 px-4">
      <Info :product="info" @onUpdate="callback" />
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

export default {
  name: "ProudctCenter",
  props: ["product"],
  components: {
    Info: () => import(`./Info`),
    LoadingMe: () => import(`@/components/Loading`),
  },
  data: () => ({
    rotate: false,
    variants: [],
    productCenterList: [],
    isLoaded: true,
    showLoading: false,
    info: {},
    mCategory: {},
    mGroup: {},
    mSubGroup: {},
    categories: [],
    groups: [],
    subGroup: [],
    subGroups: [],
    search: "",
    gridSchema: {
      model: {
        id: "id",
      },
    },
    txnProductCenter: [],
    totalProduct: 0,
    toalPerPage: 0,
    paging: {},
    action: "",
    sortDefinition: [{ field: "sku", dir: "asc" }],
    params: {},
    switchModel: 0,
  }),
  watch: {},
  methods: {
    // Pass value to other component
    async productInfo() {
      this.$emit("onUpdate", this.product);
    },
    async onChanged() {
      let grid = kendo.jQuery("#totalProductCenter").data("kendoGrid");
      let selectedItem = grid.dataItem(grid.select());
      this.info = selectedItem;

      this.$emit("onUpdate", selectedItem);
      // window.console.log(selectedItem['images'])
    },
    async onCategoryChanged(search) {
      const groupId = this.mGroup.id || "";
      this.subGroup = this.subGroups.filter((k) => k.group.id === groupId);
      if (this.subGroup.length === 0) {
        this.mSubGroup = {};
      }
      this.txnProductCenter = [];
      this.loadPage(this);
      this.paging = {};
      this.loadProductCenter(search);
    },
    async loadCategory() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          const params = {
            pattern: "cat#Product",
          };
          categoryHandler.getAllv2(params).then((res) => {
            this.showLoading = false;
            this.categories = res.data.data;
            if (this.categories.length > 0) {
              this.mCategory = this.categories[0];
              this.onCategoryChanged();
            }
            // this.categories = this.categories.filter(
            //   (m) => m.type.name === "Product"
            // );
          });
        }, 50);
      });
    },
    async loadGroup() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          const params = {
            pattern: "grp#Product",
          };
          groupHandler.getAllv2(params).then((res) => {
            this.groups = res.data.data; //.filter((k) => k.category.type.name === "Product");
          });
        }, 10);
      });
    },
    async loadSubGroup() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          const params = {
            pattern: "sgr#Product",
          };
          subGroupHandler.getAllv2(params).then((res) => {
            this.showLoading = false;
            this.subGroups = res.data.data;
          });
        }, 10);
      });
    },
    callback(variant) {
      const index = this.productCenterList.findIndex((item) => {
        return variant.id === item.id;
      });
      if (index < 0) {
        this.productCenterList.push(variant);
      } else {
        this.productCenterList.splice(index, 1, variant);
      }
    },
    async loadData() {
      await this.loadCategory();
    },
    onSearch(search) {
      this.txnProductCenter = [];
      this.loadPage(this);
      this.paging = {};
      this.loadProductCenter(search);
    },
    async loadProductCenter(search) {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.productCenterList = [];
          const category = this.mCategory || {};
          const categoryId = category.id || "";
          const group = this.mGroup || {};
          const groupId = group.id || "";
          const subGroup = this.mSubGroup || {};
          const subGroupId = subGroup.id || "";
          const switch_ = this.switchModel || 0;
          this.params = {
            ctid: categoryId,
            grid: groupId,
            sgid: subGroupId,
            key: this.paging,
            search: search,
            searchAs: switch_ ? 1 : 0,
            type: "Product",
          };
          this.showLoading = true;
          this.disabledNextPage(true);
          productHandler.center(this.params).then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoading = false;
              const responseData = res.data.data || [];
              const total = res.data.total || 0;
              this.showLoading = false;
              this.productCenterList = responseData;
              this.paging = res.data.key;
              window.console.log("key", res.data.key);
              this.txnProductCenter.push(responseData);

              this.toalPerPage = this.productCenterList.length;
              this.totalProduct = total;

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
      $(".page-product-center").html(`
                <span class="mt-2 by-product-center-item-returned">0</span><br/>
                <div style="display: flex; flex-direction: 'row'">
                    <button class="by-product-center-next-page" title="previous" style="width: 24px; font-size: 19px; margin-top: -6px;"> < </button>
                    <ul class="by-product-center-page-number page_scroll" style="display: flex;list-style: none; padding-left: 0px;">
                        <li style="padding: 6px; padding-bottom: 0px;"  data-page="1" class="by-product-center-page-link text-bold-link" >1</li>
                    </ul>
                    <button class="by-product-center-next-page" title="next" style="width: 24px; font-size: 19px;margin-top: -6px;"> > </button>
                </div>
            `);
      $(document).on("click", ".by-product-center-page-link", function () {
        const page = $(this).data("page");
        $(".by-product-center-page-link").removeClass("text-bold-link");
        $(this).addClass("text-bold-link");
        that.backToPage(that, page - 1);
        window.console.log(page - 1);
      });
      // $(document).on('click', '.bycus-next-page', function () {
      $(".by-product-center-next-page").click(function () {
        const page_number = $(this)
          .parent()
          .children(".by-product-center-page-number")
          .find("li")
          .last()
          .data("page");
        window.console.log("by-product-center-page_number", page_number);
        const isPrevious = $(this).attr("title");
        if (isPrevious == "previous") {
          const currectpage = $(".text-bold-link").data("page");

          if (currectpage == 1) {
            return;
          }
          $(".by-product-center-page-link").removeClass("text-bold-link");
          $(`.by-product-center-page-link:eq(${currectpage - 1})`).addClass(
            "text-bold-link"
          );
          that.backToPage(that, currectpage - 2);
          window.console.log("this currectpage back", currectpage - 2);
        } else {
          $(".by-product-center-page-link").removeClass("text-bold-link");
          that.loadProductCenter(that.search);
          $(this)
            .parent()
            .children(".by-product-center-page-number")
            .append(
              `<li class="by-product-center-page-link text-bold-link" style="padding: 6px; padding-bottom: 0px;" data-page="${
                page_number + 1
              }">${page_number + 1}</li>`
            );
        }
        window.console.log("this", page_number + 1);
      });
    },
    itemRetuned(that) {
      let totalRow = 0;
      that.txnProductCenter.forEach((k) => {
        totalRow += k.length;
      });
      $(".by-product-center-item-returned").text(
        "Items returned (" + totalRow + " of " + that.totalProduct + ")"
      );
    },
    disabledNextPage(value) {
      $(".by-product-center-next-page").prop("disabled", value);
    },
    backToPage(that, index) {
      try {
        const byProduct = that.txnProductCenter.at(index);
        that.productCenterList = byProduct;
        // that.refreshGridData(customer)
        window.console.log("that.txnProductCenter[index]", byProduct);
      } catch (e) {
        window.console.log("ERROR on backToPage", index);
      }
    },
    onSwicthChange() {
      window.console.log("swicth", this.switchModel);
    },
  },
  mounted: async function () {
    await this.loadCategory();
    await this.loadGroup();
    await this.loadSubGroup();
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
