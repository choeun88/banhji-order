<template>
  <v-row>
    <v-col sm="12" cols="12" class="grayBg px-6">
        <v-card color="white" class="pa-3 no_border" elevation="0">
        <v-row>
          <v-col sm="10" class="py-0">
            <h2 class="mb-1 font_20">{{ $t("price_setting") }}</h2>
            <p class="mb-0">{{ $t("price_book_setting_desc") }}</p>
          </v-col>
        </v-row>
        <v-dialog persistent v-model="dialogM3" max-width="600px">
          <v-card>
            <div class="modal_header">
              <v-card-title>{{ $t("new_price_level") }}</v-card-title>
              <v-icon @click="dialogM3 = false">close</v-icon>
            </div>

            <v-card-text class="modal_text_content">
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-row>
                  <v-col sm="6" cols="12" class="pb-0">
                    <label>{{ $t("price_list_name") }}</label>
                    <v-text-field
                      class="my-2"
                      v-model="priceLevel.name"
                      outlined
                      :rules="[(v) => !!v || $t('is_required')]"
                      tage="Price List Name"
                      clearable
                    />
                  </v-col>
                  <v-col sm="6" cols="12" class="pb-0">
                    <label class="label">{{ $t("type") }}</label>
                    <v-select
                      class="my-2"
                      tag="priceLevelType"
                      v-model="priceLevel.type"
                      :items="priceLevelType"
                      item-text="name"
                      item-value="id"
                      :rules="[(v) => !!v['id'] || $t('is_required')]"
                      return-object
                      outlined
                    />
                  </v-col>
                  <v-col sm="6" cols="12" class="py-0">
                    <label>{{ $t("code") }}</label>
                    <v-text-field
                      class="my-2"
                      v-model="priceLevel.code"
                      outlined
                      tage="Code"
                      :rules="[(v) => !!v || $t('is_required')]"
                      clearable
                    />
                  </v-col>
                  <v-col sm="6" cols="12" class="py-0">
                    <label>{{ $t("currency") }}</label>
                    <v-select
                      class="my-2"
                      outlined
                      tage="Currency"
                      v-model="priceLevel.currency"
                      :items="currencies"
                      item-value="id"
                      :rules="[(v) => !!v['id'] || $t('is_required')]"
                      :item-text="(item) => `${item.code} - ${item.name}`"
                      return-object
                    />
                  </v-col>
                  <!--                  <v-col sm="12" cols="12" class="py-0 d-flex">-->
                  <!--                    <p class="mr-8">This price level is for:</p>-->
                  <!--                    <label>-->
                  <!--                      <input :disabled="disableMe" type="radio" value="sale" v-model="priceLevel.nature"> Sale-->
                  <!--                    </label>-->
                  <!--                    <label>-->
                  <!--                      <input :disabled="disableMe" class="ml-4" type="radio" value="purchase"-->
                  <!--                             v-model="priceLevel.nature"> Purchase-->
                  <!--                    </label>-->
                  <!--                  </v-col>-->
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
        <v-row class="">
          <v-col sm="12" cols="12" class="pb-0">
            <template>
              <LoadingMe
                :isLoading="showLoading"
                :fullPage="false"
                :myLoading="true"
              />
              <kendo-datasource ref="priceLevelDS" :data="priceLevels" />
              <kendo-grid
                id="gridPriceLevel"
                class="grid-function"
                :data-source-ref="'priceLevelDS'"
                :editable="false"
                :navigatable="true"
                :noRecords="true"
                :scrollable-virtual="true"
              >
                <kendo-grid-column
                  :field="'name'"
                  :title="$t('name')"
                  :width="150"
                  :editable="
                    () => {
                      return false;
                    }
                  "
                  :template="'<span>#=name#</span>'"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'code'"
                  :title="$t('code')"
                  :width="80"
                  :editable="
                    () => {
                      return true;
                    }
                  "
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'currency'"
                  :title="$t('currency')"
                  :width="100"
                  :editable="
                    () => {
                      return false;
                    }
                  "
                  :template="'<span>#=currency.code || ``#</span>'"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'type'"
                  :title="$t('type')"
                  :width="100"
                  :editable="
                    () => {
                      return false;
                    }
                  "
                  :template="'<span>#=type.name || ``#</span>'"
                  :attributes="{ style: 'text-align: left' }"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <!-- <kendo-grid-column
                    :field="'nature'"
                    :title="$t('nature')"
                    :width="100"
                    :editable="()=>{ return false}"
                    :template="'<span>#=nature.charAt(0).toUpperCase() + nature.slice(1) || ``#</span>'"
                    :attributes="{style: 'text-align: left'}"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/> -->
                <kendo-grid-column
                  :field="''"
                  :title="$t('')"
                  :width="110"
                  :editable="
                    () => {
                      return false;
                    }
                  "
                  :attributes="{ style: 'text-align: center' }"
                  :command="[
                    {
                      iconClass: 'k-icon k-i-edit',
                      text: $t('variant_price'),
                      click: onVariantSetPrice,
                    },
                  ]"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="''"
                  :title="$t('')"
                  :width="110"
                  :editable="
                    () => {
                      return false;
                    }
                  "
                  :attributes="{ style: 'text-align: center;' }"
                  :command="[
                    {
                      iconClass: 'k-icon k-i-edit',
                      text: $t('service_price'),
                      click: onServiceSetPrice,
                    },
                  ]"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
              </kendo-grid>
            </template>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import kendo from "@progress/kendo-ui";
import $ from "jquery";
import PriceLevelModel from "@/scripts/priceLevel/PriceLevel";
import CurrencyModel from "@/scripts/currency/model/Currency";

const priceLevelHandler = require("@/scripts/priceLevelHandler");
const currencyHandler = require("@/scripts/currency/handler/currencyHandler");
const priceLevelModel = new PriceLevelModel({});
const currencyType = {
  FUNCTIONAL_CURRENCY: "fun-c",
  TRANSACTION_CURRENCY: "txn-c",
  REPORTING_CURRENCY: "rpt-c",
  TAX_EXCHANGE_CURRENCY: "tax-c",
};
const NATURE = "sale";
export default {
  data: () => ({
    mPriceLevelType: {},
    priceLevelType: ["Buy", "Sell", "Rent", "Purchase"],
    mCurrency: {},
    currencies: [],
    priceLevels: [],
    valid: true,
    priceLevel: priceLevelModel,
    showLoading: false,
    dialogM3: false,
    pricelvType: [],
    typeFor: ["sale", "purchase"],
    disableMe: false,
  }),
  props: {},
  methods: {
    async onEditClick(e) {
      e.preventDefault();
      const grid = kendo.jQuery("#gridPriceLevel").data("kendoGrid");
      const dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
      this.priceLevel = new PriceLevelModel(dataItem);
      this.priceLevel.nature = dataItem.nature || ''
      this.disableMe = true;
      this.dialogM3 = true;
    },
    async onVariantSetPrice(e) {
      e.preventDefault();
      const grid = kendo.jQuery("#gridPriceLevel").data("kendoGrid");
      const dataItem = grid.dataItem($(e.currentTarget).closest("tr"));

      this.priceLevel = dataItem;
      const currency = dataItem.currency || {};
      const code = currency.code || "";
      const id = this.priceLevel.id || "";
      await this.$router.push({
        path: "set_price/" + id,
        name: "Set Price",
        params: { id: id, priceLevel: this.priceLevel },
        query: { type: "Variant", name: this.priceLevel.name, code: code },
      });
    },
    async onServiceSetPrice(e) {
      e.preventDefault();
      const grid = kendo.jQuery("#gridPriceLevel").data("kendoGrid");
      const dataItem = grid.dataItem($(e.currentTarget).closest("tr"));

      this.priceLevel = dataItem;
      const currency = dataItem.currency || {};
      const code = currency.code || "";
      const id = this.priceLevel.id || "";
      await this.$router.push({
        path: "set_price/" + id,
        name: "Set Price",
        params: { id: id, priceLevel: this.priceLevel },
        query: { type: "Service", name: this.priceLevel.name, code: code },
      });
    },
    onNewClick() {
      this.disableMe = false;
      this.dialogM3 = true;
      this.priceLevel.nature = NATURE;
      this.priceLevel.id = "";
      this.clear();
    },
    close() {
      this.dialogM3 = false;
    },
    clear() {
      this.priceLevel = new PriceLevelModel({});
    },
    async onSaveClose() {
      if (!this.$refs.form.validate()) {
        this.$refs.form.validate();
        return;
      }
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          const type = this.priceLevel.type;
          let data = {
            id: this.priceLevel.id ? this.priceLevel.id : "",
            code: this.priceLevel.code,
            name: this.priceLevel.name,
            type: {
              id: type.id || "",
              name: type.name || "",
            },
            nature: NATURE,
            currency: new CurrencyModel(this.priceLevel.currency),
          };
          window.console.log(data, "data");
          priceLevelHandler
            .create(data)
            .then((response) => {
              if (response.data.statusCode === 201) {
                this.loadPriceLevel();
                this.clear();
                this.close();
              }
            })
            .catch((e) => {
              this.errors.push(e);
            });
        }, 10);
      });
    },
    async loadCurrency() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = true;
          currencyHandler
            .list(currencyType.FUNCTIONAL_CURRENCY)
            .then((response) => {
              if (response.data.statusCode === 200) {
                this.showLoading = false;
                this.currencies = response.data.data.filter(
                  (o) => o.used === 1
                );
                window.console.log('curr', this.currencies)
              } else {
                this.showLoading = false;
              }
            });
        }, 10);
      });
    },
    async loadPriceLevel() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = true;
          const strFilter = "?nature=" + NATURE;
          priceLevelHandler.get(strFilter).then((res) => {
            this.showLoading = false;
            this.priceLevels = res;
          });
        }, 10);
      });
    },
    async loadPriceLevelType() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          priceLevelHandler.priceLevelTypeList().then((res) => {
            if (res.data.statusCode === 200) {
              this.priceLevelType = res.data.data;
            }
          });
        }, 10);
      });
    },
  },
  mounted: async function () {
    window.console.log(currencyType.FUNCTIONAL_CURRENCY, "type");
    await this.loadCurrency();
    await this.loadPriceLevel();
    await this.loadPriceLevelType();
  },
  computed: {},
  components: {
    LoadingMe: () => import(`@/components/Loading`),
  },
};
</script>

<style scoped>
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

@media (max-width: 576px) {
}
</style>
