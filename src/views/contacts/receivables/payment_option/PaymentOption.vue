<template>
  <v-row>
    <v-col sm="12" cols="12" class="grayBg px-6">
      <v-card color="white" class="pa-3 no_border" elevation="0">
        <v-row>
          <v-col sm="10" cols="10" class="pt-0">
            <h2 class="mb-0 font_020">{{ $t("customer_payments_option_list") }}</h2>

            <p class="mb-0">
              {{ $t("customer_payments_option_list_desc") }}
            </p>
          </v-col>
          <v-col sm="2" cols="2" class="pt-2">
            <v-btn
              @click="onNewClick"
              color="primary"
              class="text-capitalize white--text float-right"
            >
              {{ $t("new_option") }}
            </v-btn>
          </v-col>
          <v-col sm="12" cols="12">
            <template>
              <div v-if="!isLoaded">
                <LoadingMe
                  :isLoading="showLoading"
                  :fullPage="false"
                  type="loading"
                  :myLoading="true"
                />
              </div>
              <kendo-datasource
                ref="paymentOptionDS"
                :data="paymentOptions"
                :schema="schemaDefinition"
              />
              <kendo-grid
                id="gridPaymentOption"
                class="grid-function"
                :data-source-ref="'paymentOptionDS'"
                :editable="false"
                :toolbar="toolbarTemplate"
                :scrollable-virtual="true"
              >
                <kendo-grid-column
                  :field="'no'"
                  :title="$t('no')"
                  :template="rowNumberTmpl"
                  :width="60"
                  :column-menu="false"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5;',
                    class: 'text-center',
                  }"
                  :attributes="{ style: 'text-align: center' }"
                />
                <kendo-grid-column
                  :field="'code'"
                  :title="$t('code')"
                  :width="120"
                  :template="'<span>#=code#</span>'"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'name'"
                  :attributes="{ class: 'tb_name_td' }"
                  :title="$t('name')"
                  :template="'<span>#=name#</span>'"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'type'"
                  :title="$t('type')"
                  :width="160"
                  :template="typeTemplate"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :command="[
                    { iconClass: 'k-icon k-i-edit', text: $t('edit'), click: goEdit },
                  ]"
                  :attributes="{ style: 'text-align: center;' }"
                  :width="90"
                  :title="$t('action')"
                  :headerAttributes="{
                    style: 'text-align: center; background-color: #EDF1F5',
                  }"
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
import PaymentOptionModel from "@/scripts/model/PaymentOption";
import kendo from "@progress/kendo-ui";

const paymentOptionHandler = require("@/scripts/paymentOptionHandler");
const { TYPE_CUSTOMER } = require("@/scripts/default_setup/Setting");

const $ = kendo.jQuery;
// const accountHandler = require("@/scripts/handler/accounting/account")
const paymentOptionModel = new PaymentOptionModel({});
const OPTION_TYPE = TYPE_CUSTOMER;
export default {
  components: {
    LoadingMe: () => import(`@/components/Loading`),
  },
  data: () => ({
    dialogM2: false,
    isHideBank: true,
    showLoading: true,
    isLoaded: false,
    paymentOptions: [],
    mLocation: {},
    paymentOption: paymentOptionModel,
    schemaDefinition: {
      model: { id: "id" },
    },
    btnEnable: false,
  }),
  mounted: async function () {
    await this.loadPaymentOption();
    this.initToolbar(this);
  },
  created() {},
  methods: {
    initToolbar(that) {
      let grid = $("#gridPaymentOption").data("kendoGrid");
      let gridElement = grid.element;
      let toolbarElement = gridElement.find(".k-grid-toolbar");
      toolbarElement.on("click", ".k-pager-refresh", function (e) {
        e.preventDefault();
        onReloadData(that);
      });

      function onReloadData(that) {
        that.loadPaymentOption();
      }
    },
    typeTemplate(dataItem) {
      switch (dataItem.type) {
        case "QR Payment":
          return `<span>KHQR Payment</span>`;
        case "Bill Payment":
          return `<span>Payment Code</span>`;
        case "Cash":
          return `<span>Cash Payment</span>`;
        case "Card Payment":
          return `<span>Card Payment</span>`;
        case "Bank Transfer":
          return `<span>Bank Transfer</span>`;
      }
      return `<span>${dataItem.type}</span>`;
    },
    toolbarTemplate: function () {
      const templateHtml =
        "<span>" +
        '<a class="k-pager-refresh k-link k-button reload" title="Refresh"><span class="k-icon k-i-reload"></span></a>' +
        "</span>" +
        '<span style="position:absolute; right:5px">' +
        "</span>";
      return kendo.template(templateHtml);
    },
    accountTmp(dataItem) {
      if (dataItem.hasOwnProperty("account")) {
        if (dataItem.account.hasOwnProperty("id")) {
          return dataItem.account.name;
        }
        return "";
      } else {
        return "";
      }
    },
    onNewClick() {
      // this.paymentOption = []
      // this.mBank = []
      // this.dialogM2 = true
      this.$router.push({
        path: "payment_option",
        name: "Payment Option",
        params: {},
      });
    },
    close() {
      this.dialogM2 = false;
    },
    goEdit(e) {
      e.preventDefault();
      let grid = kendo.jQuery("#gridPaymentOption").data("kendoGrid");
      let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
      this.$router.push({
        path: "payment_option" + `/${dataItem.id}`,
        name: "Payment Option",
        params: { id: dataItem.id },
        query: { type: "edit" },
      });
    },
    rowNumberTmpl(dataItem) {
      let ds = this.$refs.paymentOptionDS.kendoWidget(),
        index = ds.indexOf(dataItem);
      return index + 1;
    },
    async loadPaymentOption() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.paymentOptions = [];
          this.showLoading = true;
          paymentOptionHandler.list("?optionType=" + OPTION_TYPE).then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoading = false;
              this.paymentOptions = res.data.data;
            } else {
              this.showLoading = false;
            }
          });
        }, 10);
      });
    },
  },
  watch: {
    $route: "loadPaymentOption",
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

@media (max-width: 576px) {
}
</style>
