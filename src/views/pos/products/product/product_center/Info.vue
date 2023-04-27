<template>
  <v-row>
    <v-col sm="12" cols="12">
      <v-row>
        <v-col sm="12" cols="12" class="pa-0">
          <!-- <LoadingMe
            :isLoading="showLoading"
            :fullPage="false"
            type="loading"
            :myLoading="true"
          /> -->
          <v-simple-table>
            <template v-slot:default>
              <tbody>
                <tr>
                  <td class="text-uppercase">{{ $t("name") }}</td>
                  <td class="text-left text-bold">{{ product.name || "" }}</td>
                  <td class="text-uppercase">{{ $t("sku") }}</td>
                  <td class="text-left text-bold">{{ product.sku || "" }}</td>
                </tr>
                <tr>
                  <td class="text-uppercase">{{ $t("uom") }}</td>
                  <td class="text-left text-bold">{{ itemUOM }}</td>
                  <td class="text-uppercase">{{ $t("category") }}</td>
                  <td class="text-left text-bold">{{ category }}</td>
                </tr>
                <tr>
                  <td class="text-uppercase">{{ $t("group") }}</td>
                  <td class="text-left text-bold">{{ group }}</td>
                  <td class="text-uppercase">{{ $t("sub_group") }}</td>
                  <td class="text-left text-bold">{{ subGroup }}</td>
                </tr>
                <tr>
                  <td class="text-uppercase">{{ $t("price_level") }}</td>
                  <td class="text-left text-bold">{{ priceLevel }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-col>
    <v-col sm="12" cols="12" class="pb-3">
      <v-row>
        <v-col sm="12" cols="12" class="py-0">
          <!-- <v-btn
            width="120"
            color="primary"
            :disabled="btnEnabled"
            @click="goNewVariant"
            class="white--text float-right text-capitalize ml-5"
          >
            {{ $t("new_variant") }}
          </v-btn> -->
          <router-link
            :to="{
              path: 'product' + `/${this.product.id ? this.product.id : ''}`,
              query: { type: 'edit' },
            }"
          >
            <v-btn
              width="120"
              color="primary"
              :disabled="btnEnabled"
              class="white--text float-right text-capitalize ml-5"
            >
              {{ $t("edit") }}
            </v-btn>
          </router-link>
        </v-col>
      </v-row>
    </v-col>
    <v-col sm="12" cols="12" class="pb-3">
      <v-row>
        <v-card outlined dense class="no_border">
          <!-- loading -->
          <LoadingMe
            :isLoading="showLoading"
            :fullPage="false"
            type="loading"
            :myLoading="true"
          />
          <kendo-datasource ref="productVariantDS" :data="variantInfoList" />
          <kendo-grid
            id="gridProductVariantInfo"
            class="grid-function"
            :data-source-ref="'productVariantDS'"
            :style="{ width: '100%' }"
            :noRecords="true"
            :resizable="true"
            :toolbar="toolbarTemplate"
            :scrollable-virtual="true"
          >
            <kendo-grid-column
              :field="''"
              :title="$t('action')"
              :width="140"
              :command="[
                { text: $t('edit'), click: goEditVariant },
                { text: $t('clone'), click: goNewVariant },
              ]"
              :headerAttributes="{
                style: 'text-align: left; background-color: #EDF1F5',
              }"
            />
            <kendo-grid-column
              :field="'name'"
              :attributes="{ class: 'tb_name_td' }"
              :title="$t('name')"
              :width="200"
              :template="'<span>#=name#</span>'"
              :groupHeaderColumnTemplate="'#=value#'"
              :headerAttributes="{ style: 'background-color: #EDF1F5' }"
            />
            <kendo-grid-column
              :field="'images'"
              :title="$t('image')"
              :width="100"
              :template="loadImage"
              :headerAttributes="{ style: 'background-color: #EDF1F5' }"
            />
            <kendo-grid-column
              :field="'sku'"
              :title="$t('sku')"
              :width="200"
              :headerAttributes="{
                style: 'text-align: left; background-color: #EDF1F5',
              }"
            />
            <kendo-grid-column
              :field="'uom'"
              :title="$t('uom')"
              :width="120"
              :template="'<span>#=uom.name || ``#</span>'"
              :headerAttributes="{
                style: 'text-align: left; background-color: #EDF1F5',
              }"
            />
            <kendo-grid-column
              :field="'reOrderQty'"
              :title="$t('reorder')"
              :width="100"
              :template="'<span>#=reOrderQty#</span>'"
              :attributes="{ style: 'text-align: left' }"
              :headerAttributes="{
                style: 'text-align: left; background-color: #EDF1F5',
              }"
            />
          </kendo-grid>
        </v-card>
        <div style="overflow: auto" class="page-variant-info"></div>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import kendo from "@progress/kendo-ui";
const billingHandler = require("@/scripts/invoice/handler/billingHandler");
const productHandler = require("@/scripts/productHandler");
const $ = kendo.jQuery;
export default {
  name: "ItemInfo",
  components: {
    LoadingMe: () => import(`@/components/Loading`),
  },
  props: {
    product: {},
  },
  mounted: async function () {
    await this.lastPurchaseCost();
    this.initToolbar(this);
    this.loadPage(this);
    this.itemRetuned(this);
    this.disabledNextPage(true);
  },
  computed: {
    imgURL() {
      if (this.product.images) {
        let img = this.product.images;
        let imgDefault = img.default;
        if (imgDefault) {
          return this.url + imgDefault.thumb;
        } else {
          return "";
        }
      } else {
        return "";
      }
    },
    itemUOM() {
      if (this.product) {
        const uom = this.product.uom || {};
        const toUOM = uom.toUOM || {};
        const uomId = toUOM.id || "";
        window.console.log("toUOM", toUOM, "toUOM.id", toUOM.id);
        if (uomId !== "") {
          return toUOM.name || ``;
        } else {
          return uom.name || ``;
        }
      } else {
        return "";
      }
    },
    category() {
      if (this.product) {
        const category = this.product.category || {};
        return category.name || "";
      } else {
        return "";
      }
    },
    group() {
      if (this.product) {
        // const group =
        return (this.product.group || {}).name || "";
      } else {
        return "";
      }
    },
    subGroup() {
      if (this.product) {
        return (this.product.subGroup || {}).name || "";
      } else {
        return "";
      }
    },
    priceLevel() {
      if (this.product) {
        return (this.product.priceLevel || {}).name || "";
      } else {
        return "";
      }
    },
    btnEnabled() {
      this.clear();
      return !this.product.id;
    },
    id() {
      if (this.product) {
        return this.product.id;
      } else {
        return "";
      }
    },
  },
  data: () => ({
    pic: "amret.png",
    url: "https://s3-ap-southeast-1.amazonaws.com/images.banhji/",
    showLoading: false,
    itemCost: 0,
    balance: 0,
    qoh: 0,
    wac: 0,
    transactionDate: new Date().toISOString().substr(0, 10),
    variantInfoList: [],
    txnVariantInfo: [],
    totalVariant: 0,
    toalVariantPerPage: 0,
    paging: {},
    action: "",
    params: {},
  }),
  watch: {
    // '$route': 'callback',
    // product() {
    //   if (this.product !== undefined) {
    //     this.showLoading = true;
    //     // this.lastPurchaseCost()
    //     // this.inventoryBalance()
    //     this.callback();
    //     this.showLoading = false;
    //   }
    // },
  },
  methods: {
    clear() {
      this.variantInfoList = [];
      this.txnVariantInfo = [];
      this.totalVariant = 0;
      this.toalVariantPerPage = 0;
      this.paging = {};
      this.params = {};
    },
    initToolbar(that) {
      let grid = $("#gridProductVariantInfo").data("kendoGrid");
      let gridElement = grid.element;
      let toolbarElement = gridElement.find(".k-grid-toolbar");
      toolbarElement.on("click", ".k-pager-refresh", function (e) {
        e.preventDefault();
        onReloadData(that);
      });

      function onReloadData(that) {
        that.loadVariantInfo();
      }
    },
    toolbarTemplate: function () {
      const templateHtml =
        "<span>" +
        '<a class="k-pager-refresh k-link k-button reload" title="Refresh">Get variants</span></a>' +
        "</span>" +
        '<span style="position:absolute; right:5px">' +
        "</span>";
      return kendo.template(templateHtml);
    },
    loadImage(dataItem) {
      const thumb = dataItem.thumb || "";
      if (thumb !== "") {
        return (
          "<img width='50' height='50' style= 'margin: auto;display: block;' src='" +
          this.url +
          thumb +
          "' />"
        );
      }
      return "";
    },
    goEditVariant(e) {
      e.preventDefault();
      let grid = kendo.jQuery("#gridProductVariantInfo").data("kendoGrid");
      let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
      this.$router.push({
        path: "product_variant" + `/${dataItem.id}`,
        query: { p: `${this.product.id}`, type: "edit" },
      });
    },
    goNewVariant(e) {
      e.preventDefault();
      let grid = kendo.jQuery("#gridProductVariantInfo").data("kendoGrid");
      let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
      this.$router.push({
        path: "product_variant" + `/${dataItem.id}`,
        query: { p: `${this.product.id}`, type: "new" },
      });
    },
    numberFormat(value, decimal) {
      return kendo.toString(value, decimal);
    },
    onUpdate() {
      this.$emit("onUpdate", this.product);
    },
    callback() {
      if (this.$route.params !== null && this.$route.params.hasOwnProperty("data")) {
        // this.service = this.$route.params.data
        this.showLoading = true;
        this.$emit("onUpdate", this.$route.params.data);
        this.showLoading = false;
      }
      // window.console.log('im changed', this.product)
    },
    async lastPurchaseCost() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = true;
          const startDate = this.transactionDate;
          let strFilter = "?date=" + startDate + "&id=" + this.id;
          if (this.id !== undefined || this.id !== null) {
            strFilter = "?date=" + startDate + "&id=" + this.id + "&item=" + true;
            this.itemCost = 0;
            billingHandler.inventoryItemPurchaseCost(strFilter).then((res) => {
              if (res.data.statusCode === 200) {
                this.showLoading = false;
                const response = res.data.data;
                this.itemCost = 0;
                if (response) {
                  window.console.log(response, "--");
                  if (Object.keys(response).length > 0) {
                    this.itemCost = this.numberFormat(
                      response.exchangeCost,
                      response.decimalFormat
                    );
                  }
                }
              }
              this.showLoading = false;
            });
          }
        }, 10);
      });
    },
    async inventoryBalance() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = true;
          const startDate = new Date().toISOString().substring(0, 10);
          let strFilter = "?asOf=" + startDate + "&id=" + this.id;
          if (this.id !== undefined || this.id !== null) {
            strFilter = "?asOf=" + startDate + "&id=" + this.id + "&item=" + true;
            billingHandler.inventoryBalance(strFilter).then((res) => {
              if (res.data.statusCode === 200) {
                this.showLoading = false;
                const response = res.data.data;
                this.qoh = this.balance = this.wac = 0;
                if (response.length > 0) {
                  this.qoh = this.numberFormat(
                    response[0].qoh,
                    response[0].decimalFormat
                  );
                  this.balance = this.numberFormat(
                    response[0].bValue,
                    response[0].decimalFormat
                  );
                  this.wac = this.numberFormat(
                    response[0].wac,
                    response[0].decimalFormat
                  );
                }
              }
            });
          }
        }, 10);
      });
    },
    async loadVariantInfo() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          const productId = (this.product || {}).id || "";
          if (productId !== "") {
            this.txnVariantInfo = [];
            const switch_ = 0;
            this.params = {
              ctid: "",
              grid: "",
              sgid: "",
              key: {},
              search: "",
              searchAs: switch_,
              productId: (this.product || {}).id || "",
              type: "Variant",
            };
            this.showLoading = true;
            this.disabledNextPage(true);
            productHandler.center(this.params).then((res) => {
              if (res.data.statusCode === 200) {
                this.showLoading = false;
                const responseData = res.data.data || [];
                const total = res.data.total || 0;
                this.showLoading = false;
                this.variantInfoList = responseData;
                this.paging = res.data.key;
                window.console.log("key", res.data.key);
                this.txnVariantInfo.push(responseData);

                this.toalVariantPerPage = this.txnVariantInfo.length;
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
          }
        }, 10);
      });
    },
    async loadPage(that) {
      $(".page-variant-info").html(`
                <span class="mt-2 by-variant-info-item-returned">0</span><br/>
                <div style="display: flex; flex-direction: 'row'">
                    <button class="by-variant-info-next-page" title="previous" style="width: 24px; font-size: 19px; margin-top: -6px;"> < </button>
                    <ul class="by-variant-info-page-number page_scroll" style="display: flex;list-style: none; padding-left: 0px;">
                        <li style="padding: 6px; padding-bottom: 0px;"  data-page="1" class="by-variant-info-page-link text-bold-link" >1</li>
                    </ul>
                    <button class="by-variant-info-next-page" title="next" style="width: 24px; font-size: 19px;margin-top: -6px;"> > </button>
                </div>
            `);
      $(document).on("click", ".by-variant-info-page-link", function () {
        const page = $(this).data("page");
        $(".by-variant-info-page-link").removeClass("text-bold-link");
        $(this).addClass("text-bold-link");
        that.backToPage(that, page - 1);
        window.console.log(page - 1);
      });
      // $(document).on('click', '.bycus-next-page', function () {
      $(".by-variant-info-next-page").click(function () {
        const page_number = $(this)
          .parent()
          .children(".by-variant-info-page-number")
          .find("li")
          .last()
          .data("page");
        window.console.log("by-variant-info-page_number", page_number);
        const isPrevious = $(this).attr("title");
        if (isPrevious == "previous") {
          const currectpage = $(".text-bold-link").data("page");

          if (currectpage == 1) {
            return;
          }
          $(".by-variant-info-page-link").removeClass("text-bold-link");
          $(`.by-variant-info-page-link:eq(${currectpage - 1})`).addClass(
            "text-bold-link"
          );
          that.backToPage(that, currectpage - 2);
          window.console.log("this currectpage back", currectpage - 2);
        } else {
          $(".by-variant-info-page-link").removeClass("text-bold-link");
          that.loadVariantInfo(that.search);
          $(this)
            .parent()
            .children(".by-variant-info-page-number")
            .append(
              `<li class="by-variant-info-page-link text-bold-link" style="padding: 6px; padding-bottom: 0px;" data-page="${
                page_number + 1
              }">${page_number + 1}</li>`
            );
        }
        window.console.log("this", page_number + 1);
      });
    },
    itemRetuned(that) {
      let totalRow = 0;
      that.txnVariantInfo.forEach((k) => {
        totalRow += k.length;
      });
      $(".by-variant-info-item-returned").text(
        "Items returned (" + totalRow + " of " + that.totalVariant + ")"
      );
    },
    disabledNextPage(value) {
      $(".by-variant-info-next-page").prop("disabled", value);
    },
    backToPage(that, index) {
      try {
        const byProduct = that.txnVariantInfo.at(index);
        that.txnVariantInfo = byProduct;
        // that.refreshGridData(customer)
        window.console.log("that.txnVariantInfo[index]", byProduct);
      } catch (e) {
        window.console.log("ERROR on backToPage", index);
      }
    },
  },
};
</script>
<style scoped>
.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background-color: transparent !important;
}

.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr.third:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background-color: #4d4848 !important;
}

.theme--light.v-data-table {
  background-color: transparent !important;
  border-top: thin solid #ddd;
  border-bottom: thin solid #ddd;
  border-radius: 0 !important;
}

.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:not(:last-child)
  > td:not(.v-data-table__mobile-row),
.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:not(:last-child)
  > th:not(.v-data-table__mobile-row) {
  border-bottom: thin solid #ddd;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  height: 32px !important;
}
</style>
