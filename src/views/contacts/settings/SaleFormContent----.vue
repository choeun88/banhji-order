<template>
  <v-row class="">
    <!-- not modal -->
    <v-col sm="12" cols="12" class="pt-0">
      <h2 class="font_020 mb-0">{{ $t("sale_form_content") }}</h2>
      <p class="mb-2">{{ $t("sale_form_content_desc") }}</p>
      <template>
        <v-simple-table class="attachment_table">
          <template>
            <tbody>
              <tr>
                <td
                  colspan="3"
                  class="text-bold primary text-white outlined dense text-uppercase"
                >
                  {{ $t("transaction") }}
                </td>
              </tr>
              <tr>
                <td class="text-bold">{{ $t("account_receivable") }}</td>
                <td>{{ $t("account_receivable_desc") }}</td>
                <td
                  style="width: 120px"
                  class="primary--text align-center justify-center d-flex text-bold"
                >
                  <v-switch
                    v-model="saleFormContent.accountReceivable"
                    color="primary"
                    :label="saleFormContent.accountReceivable ? $t('ON') : $t('OFF')"
                  />
                </td>
              </tr>
              <tr>
                <td class="text-bold">{{ $t("price_level_read") }}</td>
                <td>{{ $t("price_level_read_desc") }}</td>
                <td
                  style="width: 120px"
                  class="primary--text text-center hide_form_alert"
                >
                  <v-switch
                    v-model="saleFormContent.settings.priceLevel"
                    color="primary"
                    :label="saleFormContent.settings.priceLevel ? $t('ON') : $t('OFF')"
                  />
                </td>
              </tr>
              <tr v-if="!plansNotAccess.includes(4)">
                <td class="text-bold">{{ $t("late_fee") }}</td>
                <td>{{ $t("late_fee_desc_setting") }}</td>
                <td
                  style="width: 120px"
                  class="primary--text align-center justify-center d-flex text-bold"
                >
                  <v-switch
                    v-model="saleFormContent.lateFeeOpt"
                    color="primary"
                    :label="saleFormContent.lateFeeOpt ? $t('ON') : $t('OFF')"
                  />
                </td>
              </tr>
              <tr v-if="!plansNotAccess.includes(4)">
                <td class="text-bold">{{ $t("sale_channel") }}</td>
                <td>{{ $t("sale_channel_desc_setting") }}</td>
                <td
                  style="width: 120px"
                  class="primary--text align-center justify-center d-flex text-bold"
                >
                  <v-switch
                    v-model="saleFormContent.saleChannel"
                    color="primary"
                    :label="saleFormContent.saleChannel ? $t('ON') : $t('OFF')"
                  />
                </td>
              </tr>
              <tr v-if="!plansNotAccess.includes(4)">
                <td class="text-bold">{{ $t("employee") }}</td>
                <td>{{ $t("employee_setting_desc") }}</td>
                <td
                  style="width: 120px"
                  class="primary--text align-center justify-center d-flex text-bold"
                >
                  <v-switch
                    v-model="saleFormContent.employee"
                    color="primary"
                    :label="saleFormContent.employee ? $t('ON') : $t('OFF')"
                  />
                </td>
              </tr>

              <tr>
                <td
                  colspan="3"
                  class="text-bold primary text-white outlined dense text-uppercase"
                >
                  {{ $t("item_line") }}
                </td>
              </tr>
              <tr>
                <td class="text-bold">{{ $t("date_from") }}</td>
                <td>{{ $t("date_from_desc") }}</td>
                <td
                  style="width: 120px"
                  class="primary--text align-center justify-center d-flex text-bold"
                >
                  <v-switch
                    v-model="saleFormContent.serviceDate"
                    color="primary"
                    :label="saleFormContent.serviceDate ? $t('ON') : $t('OFF')"
                  />
                </td>
              </tr>
              <tr>
                <td class="text-bold">{{ $t("date_to") }}</td>
                <td>{{ $t("date_to_desc") }}</td>
                <td
                  style="width: 120px"
                  class="primary--text align-center justify-center d-flex text-bold"
                >
                  <v-switch
                    v-model="saleFormContent.serviceDateTo"
                    color="primary"
                    :label="saleFormContent.serviceDateTo ? $t('ON') : $t('OFF')"
                  />
                </td>
              </tr>
              <tr>
                <td class="text-bold">{{ $t("discount") }}</td>
                <td>{{ $t("discount_item_desc") }}</td>
                <td
                  style="width: 120px"
                  class="primary--text align-center justify-center d-flex text-bold"
                >
                  <v-switch
                    v-model="saleFormContent.discountItem"
                    color="primary"
                    :label="saleFormContent.discountItem ? $t('ON') : $t('OFF')"
                  />
                </td>
              </tr>
              <tr>
                <td class="text-bold">{{ $t("on_hand") }}</td>
                <td>{{ $t("discount_item_desc") }}</td>
                <td
                  style="width: 120px"
                  class="primary--text align-center justify-center d-flex text-bold"
                >
                  <v-switch
                    v-model="saleFormContent.onHand"
                    color="primary"
                    :label="saleFormContent.onHand ? $t('ON') : $t('OFF')"
                  />
                </td>
              </tr>
              <tr v-if="!plansNotAccess.includes(4)">
                <td class="text-bold">{{ $t("other_charge") }}</td>
                <td>{{ $t("other_charge_item_desc") }}</td>
                <td
                  style="width: 120px"
                  class="primary--text align-center justify-center d-flex text-bold"
                >
                  <v-switch
                    v-model="saleFormContent.otherCharge"
                    color="primary"
                    :label="saleFormContent.otherCharge ? $t('ON') : $t('OFF')"
                  />
                </td>
              </tr>
              <tr v-if="!plansNotAccess.includes(4)">
                <td class="text-bold">{{ $t("specific_tax") }}</td>
                <td>{{ $t("specific_text_desc") }}</td>
                <td
                  style="width: 120px"
                  class="primary--text align-center justify-center d-flex text-bold"
                >
                  <v-switch
                    v-model="saleFormContent.specificTax"
                    color="primary"
                    :label="saleFormContent.specificTax ? $t('ON') : $t('OFF')"
                  />
                </td>
              </tr>
              <tr v-if="!plansNotAccess.includes(4)">
                <td class="text-bold">{{ $t("other_tax") }}</td>
                <td>{{ $t("other_tax_desc") }}</td>
                <td
                  style="width: 120px"
                  class="primary--text align-center justify-center d-flex text-bold"
                >
                  <v-switch
                    v-model="saleFormContent.otherTax"
                    color="primary"
                    :label="saleFormContent.otherTax ? $t('ON') : $t('OFF')"
                  />
                </td>
              </tr>
              <tr v-if="!plansNotAccess.includes(4)">
                <td class="text-bold">{{ $t("public_lighting_tax") }}</td>
                <td>{{ $t("public_lighting_tax_desc") }}</td>
                <td
                  style="width: 120px"
                  class="primary--text align-center justify-center d-flex text-bold"
                >
                  <v-switch
                    v-model="saleFormContent.publicLightingTax"
                    color="primary"
                    :label="saleFormContent.publicLightingTax ? $t('ON') : $t('OFF')"
                  />
                </td>
              </tr>
              <tr v-if="!plansNotAccess.includes(4)">
                <td class="text-bold">{{ $t("sale_unit") }}</td>
                <td>{{ $t("sale_unit_desc") }}</td>
                <td
                  style="width: 120px"
                  class="primary--text align-center justify-center d-flex text-bold"
                >
                  <v-switch
                    v-model="saleFormContent.saleUnit"
                    color="primary"
                    :label="saleFormContent.saleUnit ? $t('ON') : $t('OFF')"
                  />
                </td>
              </tr>
              <tr v-if="!plansNotAccess.includes(4)">
                <td class="text-bold">{{ $t("modifier") }}</td>
                <td>{{ $t("modifier_desc") }}</td>
                <td
                  style="width: 120px"
                  class="primary--text align-center justify-center d-flex text-bold"
                >
                  <v-switch
                    v-model="saleFormContent.modifier"
                    color="primary"
                    :label="saleFormContent.modifier ? $t('ON') : $t('OFF')"
                  />
                </td>
              </tr>

              <tr>
                <td class="text-bold">{{ $t("sub_of_customer") }}</td>
                <td>{{ $t("sub_of_customer_desc") }}</td>
                <td
                  style="width: 120px"
                  class="primary--text align-center justify-center d-flex text-bold"
                >
                  <v-switch
                    v-model="saleFormContent.subOfCustomer"
                    color="primary"
                    :label="saleFormContent.subOfCustomer ? $t('ON') : $t('OFF')"
                  />
                </td>
              </tr>

              <tr>
                <td
                  colspan="3"
                  class="text-bold primary text-white outlined dense text-uppercase"
                >
                  {{ $t("configuration") }}
                </td>
              </tr>

              <tr>
                <td class="text-bold">{{ $t("decimal") }}</td>
                <td>{{ $t("decimal_setting_desc") }}</td>
                <td
                  style="width: 120px"
                  class="primary--text align-center justify-center d-flex text-bold"
                >
                  <v-select
                    class="w_100"
                    v-model="saleFormContent.decimal"
                    :items="decimalStyle"
                    color="primary"
                  />
                </td>
              </tr>
              <tr>
                <td class="text-bold">{{ $t("sale_quote") }}</td>
                <td>{{ $t("sale_quote_desc") }}</td>
                <td style="width: 120px" class="primary--text hide_form_alert">
                  <v-select
                    class="my-1 w_100"
                    v-model="saleFormContent.saleQuote"
                    :placeholder="$t('sale_quote')"
                    :items="quotes"
                    item-value="value"
                    item-text="label"
                    outlined
                  />
                </td>
              </tr>
              <tr>
                <td class="text-bold">{{ $t("sale_order") }}</td>
                <td>{{ $t("sale_order_desc") }}</td>
                <td
                  style="width: 120px"
                  class="primary--text text-center hide_form_alert"
                >
                  <v-select
                    class="my-1 w_100"
                    :placeholder="$t('sale_order')"
                    v-model="saleFormContent.saleOrder"
                    :items="saleOrders"
                    item-value="value"
                    item-text="label"
                    outlined
                  />
                </td>
              </tr>
              <tr v-if="!plansNotAccess.includes(4)">
                <td class="text-bold">{{ $t("sale_unit") }}</td>
                <td>{{ $t("sale_unit_title_dec") }}</td>
                <td
                  style="width: 120px"
                  class="primary--text text-center hide_form_alert"
                >
                  <v-select
                    class="my-1 w_100"
                    :placeholder="$t('sale_unit')"
                    v-model="saleFormContent.settings.sale_unit"
                    :items="saleUnit"
                    item-value="value"
                    item-text="label"
                    outlined
                  />
                </td>
              </tr>
              <tr v-if="!plansNotAccess.includes(4)">
                <td class="text-bold">{{ $t("project") }}</td>
                <td>{{ $t("project_title_dec") }}</td>
                <td
                  style="width: 120px"
                  class="primary--text text-center hide_form_alert"
                >
                  <v-select
                    class="my-1 w_100"
                    :placeholder="$t('project')"
                    v-model="saleFormContent.settings.project"
                    :items="projectItem"
                    item-value="value"
                    item-text="label"
                    outlined
                  />
                </td>
              </tr>
              <tr>
                <td class="text-bold">{{ $t("credit_limit") }}</td>
                <td>{{ $t("credit_limit_desc") }}</td>
                <td
                  style="width: 120px"
                  class="primary--text text-center hide_form_alert"
                >
                  <v-switch
                    v-model="saleFormContent.creditLimit"
                    color="primary"
                    :label="saleFormContent.creditLimit ? $t('ON') : $t('OFF')"
                  />
                </td>
              </tr>
              <tr>
                <td class="text-bold">{{ $t("segment_prefix") }}</td>
                <td>{{ $t("segment_prefix_desc") }}</td>
                <td
                  style="width: 120px"
                  class="primary--text align-center justify-center d-flex text-bold"
                >
                  <v-switch
                    v-model="saleFormContent.settings.segment_prefix"
                    color="primary"
                    :label="
                      saleFormContent.settings.segment_prefix ? $t('ON') : $t('OFF')
                    "
                  />
                </td>
              </tr>
              <tr>
                <td class="text-bold">{{ $t("segment_prefix_sale_order") }}</td>
                <td>{{ $t("segment_prefix_desc") }}</td>
                <td
                  style="width: 120px"
                  class="primary--text align-center justify-center d-flex text-bold"
                >
                  <v-switch
                    v-model="saleFormContent.settings.segment_prefix_order"
                    color="primary"
                    :label="
                      saleFormContent.settings.segment_prefix_order ? $t('ON') : $t('OFF')
                    "
                  />
                </td>
              </tr>
              <tr>
                <td class="text-bold">{{ $t("segment_prefix_qoute") }}</td>
                <td>{{ $t("segment_prefix_desc") }}</td>
                <td
                  style="width: 120px"
                  class="primary--text align-center justify-center d-flex text-bold"
                >
                  <v-switch
                    v-model="saleFormContent.settings.segment_prefix_qoute"
                    color="primary"
                    :label="
                      saleFormContent.settings.segment_prefix_qoute ? $t('ON') : $t('OFF')
                    "
                  />
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </template>
      <v-divider />

      <v-card outlined dense class="no_border function_footer">
        <v-btn color="primary" class="float-right white--text mr-5" @click="onSaveClose">
          {{ $t("save") }}
        </v-btn>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import SaleFormContentModel from "@/scripts/model/SaleFormContent";
import { i18n } from "@/i18n";
const saleFormContentModel = new SaleFormContentModel({});
const saleFormContentHandler = require("@/scripts/saleFormContentHandler");
import { dataStore } from "@/observable/store";
import store from "@/store";

export default {
  components: {},
  data: () => ({
    saleFormContent: saleFormContentModel,
    quotes: [
      {
        label: i18n.t("Quote"),
        value: "Quote",
      },
      {
        label: i18n.t("Proposal"),
        value: "Proposal",
      },
      {
        label: i18n.t("Estimate"),
        value: "Estimate",
      },
    ],
    saleOrders: [
      {
        label: i18n.t("Contract"),
        value: "Contract",
      },
      {
        label: i18n.t("Engagements"),
        value: "Engagements",
      },
      {
        label: i18n.t("sale_order"),
        value: "sale_order",
      },
    ],
    saleUnit: [
      {
        label: i18n.t("sale_unit"),
        value: "sale_unit",
      },
      {
        label: i18n.t("Activity"),
        value: "Activity",
      },
    ],
    projectItem: [
      {
        label: i18n.t("Engagementp"),
        value: "Engagementp",
      },
      {
        label: i18n.t("project"),
        value: "Projectp",
      },
    ],
    decimalStyle: [2, 3, 4, 5],
  }),
  props: {},
  computed: {
    appType() {
      return dataStore.productType;
    },
    plansNotAccess() {
      return dataStore.plansNotAccess;
    },
  },
  watch: {},
  created() {},
  methods: {
    async onSaveClose() {
      // if (!this.$refs.form.validate()) {
      //   this.$refs.form.validate()
      //   return
      // }
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          let data = {
            id: this.saleFormContent.id ? this.saleFormContent.id : "",
            serviceDate: this.saleFormContent.serviceDate,
            serviceDateTo: this.saleFormContent.serviceDateTo,
            discountItem: this.saleFormContent.discountItem,
            otherCharge: this.saleFormContent.otherCharge,
            specificTax: this.saleFormContent.specificTax,
            otherTax: this.saleFormContent.otherTax,
            publicLightingTax: this.saleFormContent.publicLightingTax,
            saleUnit: this.saleFormContent.saleUnit,
            modifier: this.saleFormContent.modifier,
            employee: this.saleFormContent.employee,
            decimal: this.saleFormContent.decimal,
            saleQuote: this.saleFormContent.saleQuote,
            saleOrder: this.saleFormContent.saleOrder,
            onHand: this.saleFormContent.onHand,

            negativeInventory: this.saleFormContent.negativeInventory,
            lateFee: this.saleFormContent.lateFee,
            email: this.saleFormContent.email,
            pdfAttachment: this.saleFormContent.pdfAttachment,
            invoiceReminder: this.saleFormContent.invoiceReminder,
            reminder1: this.saleFormContent.reminder1,
            reminder2: this.saleFormContent.reminder2,
            reminder3: this.saleFormContent.reminder3,
            statement: this.saleFormContent.statement,
            accountReceivable: this.saleFormContent.accountReceivable,
            lateFeeOpt: this.saleFormContent.lateFeeOpt,
            saleChannel: this.saleFormContent.saleChannel,
            creditLimit: this.saleFormContent.creditLimit,
            hideSidebar: this.saleFormContent.hideSidebar,
            monthOf: this.saleFormContent.monthOf,
            subOfCustomer: this.saleFormContent.subOfCustomer,
            settings: this.saleFormContent.settings,
          };
          saleFormContentHandler
            .create(data)
            .then((response) => {
              if (response.data.statusCode === 201) {
                const res = response.data.data;
                this.saleFormContent = res;
                this.$snotify.success("Update Successfully");
                // this.$refs.form.reset()
                this.loadSaleFormContent();
              }
            })
            .catch((e) => {
              this.$snotify.error("Something went wrong");
              this.errors.push(e);
            });
        }, 10);
      });
    },
    async loadSaleFormContent() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          saleFormContentHandler.list().then((res) => {
            if (res.data.statusCode === 200) {
              const data = res.data.data;
              if (data.length > 0) {
                this.saleFormContent = data[0];
                let formContentSale = {
                  accountReceivable: data[0].accountReceivable,
                  saleChannel: data[0].saleChannel,
                  lateFeeOpt: data[0].lateFeeOpt,
                  employee: data[0].employee,
                  creditLimit: data[0].creditLimit,
                  settings: data[0].settings,
                };
                store.state.setting.saleFormContent = formContentSale;
                dataStore.saleFormContent = formContentSale;
              }
            }
          });
        }, 10);
      });
    },
  },
  mounted: async function () {
    this.loadSaleFormContent();
  },
};
</script>
<style scoped>
.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:first-child
  > td:not(.v-data-table__mobile-row) {
  border-top: 3px solid rgba(0, 0, 0, 0.12) !important;
}

.btn_save {
  color: #ffffff;
  text-transform: capitalize;
}
.w_100 {
  width: 100px !important;
}

.float-right {
  margin-top: 0px !important;
}

.float-left {
  margin-top: 0px !important;
}
p {
  color: rgba(0, 0, 0, 0.87);
}
.v-input--switch {
  margin-top: 0px;
  height: 30px;
}
</style>
