<template>
  <v-row>
    <v-col sm="12" cols="12">
      <v-row>
        <v-col sm="3" cols="12" class="py-0">
          <v-card>
            <!--            <v-img class="" height="100" width="100" :src="require(`@/assets/images/${pic}`)"/>-->
            <v-img style="margin: auto; display: block" :src="imgURL" />
          </v-card>
        </v-col>
        <v-col sm="9" cols="12" class="py-0">
          <v-simple-table>
            <template v-slot:default>
              <tbody>
                <tr>
                  <td class="text-uppercase">{{ $t("name") }}</td>
                  <td class="text-left text-bold">{{ product.name }}</td>
                </tr>
                <tr>
                  <td class="text-uppercase">{{ $t("sku") }}</td>
                  <td class="text-left text-bold">{{ product.sku }}</td>
                </tr>
                <tr>
                  <td class="text-uppercase">{{ $t("uom") }}</td>
                  <td class="text-left text-bold">
                    <div v-if="btnUOMEnabled">
                      {{ itemUOM.name }}
                    </div>
                    <div v-else-if="!btnUOMEnabled">
                      <v-select
                      class="mt-1"
                      tage="UOM"
                      v-model="uom"
                      :disabled="btnUOMEnabled"
                      :items="uoms"
                      item-value="id"
                      item-text="name"
                      :rules="[(v) => !!v['id'] || $t('is_required')]"
                      return-object
                      outlined
                    />
                    </div>                    
                  </td>
                  <div v-if="!btnUOMEnabled">
                  <td class="text-left text-bold">
                    <v-btn
                      width="50"
                      color="primary"
                      :disabled="btnUOMEnabled"
                      @click="onConfirmSave"
                      class="white--text float-right text-capitalize"
                    >
                      {{ $t("save") }}
                    </v-btn>
                  </td>
                  </div>
                </tr>
                <tr>
                  <td class="text-uppercase">{{ $t("category") }}</td>
                  <td class="text-left text-bold">{{ category }}</td>
                </tr>
                <tr>
                  <td class="text-uppercase">{{ $t("group") }}</td>
                  <td class="text-left text-bold">{{ group }}</td>
                </tr>
                <tr>
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

    <v-col sm="12" cols="12" class="pb-0">
      <LoadingMe
        :isLoading="showLoading"
        :fullPage="false"
        type="loading"
        :myLoading="true"
      />
      <v-simple-table>
        <template v-slot:default>
          <tbody>
            <tr class="third text-bold">
              <td class="text-uppercase white--text">
                {{ $t("weighted_average_cost") }}
              </td>
              <td class="white--text text-right">{{ wac }}</td>
            </tr>
            <tr class="third text-bold">
              <td class="text-uppercase white--text">
                {{ $t("last_purchase_cost") }}
              </td>
              <td class="white--text text-right">{{ itemCost }}</td>
            </tr>
            <tr>
              <td class="text-uppercase text-bold">{{ $t("value") }}</td>
              <td class="primary--text text-right text-bold">{{ balance }}</td>
            </tr>
            <tr>
              <td class="text-uppercase">{{ $t("on_hand") }}</td>
              <td class="primary--text text-right text-bold">{{ qoh }}</td>
            </tr>
            <!--          <tr>-->
            <!--            <td class="text-uppercase">{{ $t('committed_stock') }}</td>-->
            <!--            <td class="primary&#45;&#45;text text-right text-bold">0</td>-->
            <!--          </tr>-->
            <!--          <tr>-->
            <!--            <td class="text-uppercase">{{ $t('available_stock') }}</td>-->
            <!--            <td class="primary&#45;&#45;text text-right text-bold">92</td>-->
            <!--          </tr>-->
            <!--          <tr>-->
            <!--            <td class="text-uppercase">{{ $t('incoming_stock') }}</td>-->
            <!--            <td class="primary&#45;&#45;text text-right text-bold">0</td>-->
            <!--          </tr>-->
          </tbody>
        </template>
      </v-simple-table>
    </v-col>
    <v-col sm="12" cols="12" class="pb-3">
      <v-row>
        <v-col sm="12" cols="12" class="py-0">
          <router-link
            :to="{
              path:
                'product_variant' +
                `/${this.product.id ? this.product.id : ''}`,
              query: { p: `${this.product.productId}`, type: 'edit' },
            }"
          >
            <v-btn
              width="120"
              color="primary"
              :disabled="btnEnabled"
              class="white--text float-right text-capitalize ml-5"
            >
              {{ $t("edit_variant") }}
            </v-btn>
          </router-link>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import kendo from "@progress/kendo-ui";
const uomHandler = require("@/scripts/uomHandler");
const billingHandler = require("@/scripts/invoice/handler/billingHandler");
const productVariantHandler = require("@/scripts/productVariantHandler");
import { i18n } from "@/i18n";
export default {
  name: "ItemInfo",
  components: {
    LoadingMe: () => import(`@/components/Loading`),
  },
  props: {
    product: {},
  },
  mounted: async function () {
    this.lastPurchaseCost();
    this.loadUOM();
  },
  data: () => ({
    pic: "amret.png",
    url: "https://s3-ap-southeast-1.amazonaws.com/images.banhji/",
    showLoading: false,
    itemCost: 0,
    balance: 0,
    qoh: 0,
    wac: 0,
    transactionDate: new Date().toISOString().substring(0, 10),
    uoms: [],
    uom___: {},
  }),
  computed: {
    imgURL() {
      const thumb = (this.product || {}).thumb || "";
      if (thumb) {
        return this.url + thumb;
      }
      return "";
    },
    uom: {
      get() {
        if (this.product) {
          const product = this.product || {};
          const uom_ = product.uom || {};
          const toUOM = uom_.toUOM || {};
          const uomId = toUOM.id || "";
          if (uomId !== "") {
            return toUOM;
          } else {
            return uom_;
          }
        }
        return {};
      },
      set(newName) {
        window.console.log("newName", newName);
        this.uom___ = newName;
        return newName;
      },
    },
    itemUOM() {
      if (this.product) {
        const uom = this.product.uom || {};
        const toUOM = uom.toUOM || {};
        const uomId = toUOM.id || "";
        window.console.log("toUOM", toUOM, "toUOM.id", toUOM.id);
        if (uomId !== "") {
          return toUOM || {};
        } else {
          return uom || {};
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
      return !this.product.productId;
    },
    btnUOMEnabled() {
      return this.product.hasTxn;
    },
    id() {
      if (this.product) {
        return this.product.id;
      } else {
        return "";
      }
    },
  },
  watch: {
    // '$route': 'callback',
    product() {
      if (this.product !== undefined) {
        this.showLoading = false;
        this.lastPurchaseCost();
        this.inventoryBalance();
        this.callback();
        this.showLoading = false;
      }
    },
  },
  methods: {
    numberFormat(value, decimal) {
      return kendo.toString(value, decimal);
    },
    onUpdate() {
      this.$emit("onUpdate", this.product);
    },
    callback() {
      if (
        this.$route.params !== null &&
        this.$route.params.hasOwnProperty("data")
      ) {
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
          this.showLoading = false;
          const startDate = this.transactionDate;
          let strFilter = "?date=" + startDate + "&id=" + this.id;
          if (this.id !== undefined || this.id !== null) {
            strFilter =
              "?date=" + startDate + "&id=" + this.id + "&item=" + true;
            this.itemCost = 0;
            billingHandler.inventoryItemPurchaseCost(strFilter).then((res) => {
              if (res.data.statusCode === 200) {
                this.showLoading = false;
                const response = res.data.data[0];
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
            });
          }
        }, 10);
      });
    },
    async inventoryBalance() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = false;
          const startDate = new Date().toISOString().substr(0, 10);
          // let strFilter = "?asOf=" + startDate + "&id=" + this.id;
          if (this.id !== undefined || this.id !== null) {
            // strFilter =
            //   "?asOf=" + startDate + "&id=" + this.id + "&item=" + true;
            const params = {
              asOf: startDate,
              key: {},
              id: this.id,
            };
            billingHandler.inventoryBalance(params).then((res) => {
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
    async loadUOM() {
      uomHandler.get().then((res) => {
        this.uoms = res;
        window.console.log("uoms", this.uoms);
      });
    },
    onConfirmSave() {
      const product = this.product || {};
      const uom_ = product.uom || {};
      const uomId = uom_.id || "";
      const oldUOM = this.uom___ || {};
      const oldUOMId = oldUOM.id || "";
      window.console.log("this.uom", this.uom___, "uom_", uom_);
      if (oldUOMId !== "") {
        if (uomId !== oldUOMId) {
          this.$swal({
            title: i18n.t("are_you_sure_you_want_to_update"),
            text: i18n.t("you_wont_be_able_to_revert_this"),
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#4d4848",
            cancelButtonColor: "#ED1A3A",
            confirmButtonText: i18n.t("ok"),
          }).then((result) => {
            if (result.value) {
              this.onSaveBaseUOM();
            }
          });
        }
      }
    },
    async onSaveBaseUOM() {
      if (this.id === "") {
        return;
      }
      const uom_ = this.uom___ || {};
      const category = uom_.category || {};
      const uomCat = {
        id: category.id || "",
        name: category.name || "",
      };
      const uom = {
        id: uom_.id || {},
        category: uomCat,
        name: uom_.name || "",
      };
      const data = {
        id: this.id,
        uom: uom,
      };
      window.console.log('data', data)
      productVariantHandler
        .attributeUpdate(data)
        .then((response) => {
          if (response.data.statusCode === 201) {
            this.$snotify.success("Success");
          }
        })
        .catch((e) => {
          this.$snotify.error("Something went wrong");
          this.errors.push(e);
        });
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