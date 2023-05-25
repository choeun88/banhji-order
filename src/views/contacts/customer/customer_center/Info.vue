<template>
  <v-row>
    <v-col sm="12" cols="12">
      <v-simple-table>
        <template v-slot:default>
          <tbody v-if="appType == 'npo'">
            <tr>
              <td style="width: 55%" class="text-uppercase">{{ $t("donor_name") }}</td>
              <td class="text-left text-bold">{{ name }}</td>
            </tr>
            <tr>
              <td style="width: 55%" class="text-uppercase">{{ $t("donor_type") }}</td>
              <td class="text-left text-bold">{{ type }}</td>
            </tr>
            <!-- <tr>
                        <td style="width:55%;" class="text-uppercase">{{ $t('donor_group') }}</td>
                        <td class="text-left text-bold">{{ group }}</td>
                    </tr> -->
            <!-- <tr>
                        <td style="width:55%;"  class="text-uppercase">{{ $t('customer_sub_of') }}</td>
                        <td class="text-left text-bold">{{ subOf }}</td>
                    </tr> -->
            <tr>
              <td style="width: 55%" class="text-uppercase">
                {{ $t("donor_banhji_crn") }}
              </td>
              <td class="text-left text-bold">{{ crn }}</td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td style="width: 55%" class="text-uppercase">{{ $t("customer_name") }}</td>
              <td class="text-left text-bold">{{ name }}</td>
            </tr>
            <tr>
              <td style="width: 55%" class="text-uppercase">
                {{ $t("alternative_name") }}
              </td>
              <td class="text-left text-bold">{{ alternativeName }}</td>
            </tr>
            <tr>
              <td style="width: 55%" class="text-uppercase">{{ $t("customer_type") }}</td>
              <td class="text-left text-bold">{{ type }}</td>
            </tr>
            <tr>
              <td style="width: 55%" class="text-uppercase">
                {{ $t("customer_group") }}
              </td>
              <td class="text-left text-bold">{{ group }}</td>
            </tr>
            <!-- <tr>
                        <td style="width:55%;"  class="text-uppercase">{{ $t('customer_sub_of') }}</td>
                        <td class="text-left text-bold">{{ subOf }}</td>
                    </tr> -->
            <tr>
              <td style="width: 55%" class="text-uppercase">
                {{ $t("customer_banhji_crn") }}
              </td>
              <td class="text-left text-bold">{{ crn }}</td>
            </tr>
            <tr>
              <td style="width: 55%" class="text-uppercase">
                {{ $t("banhji_institute_id") }}
              </td>
              <td class="text-left text-bold">{{ consumerId }}</td>
            </tr>
            <tr>
              <td style="width: 55%" class="text-uppercase">{{ $t("application") }}</td>
              <td class="text-left text-bold">{{ application }}</td>
            </tr>
            <tr>
              <td style="width: 55%" class="text-uppercase">{{ $t("connect_id") }}</td>
              <td class="text-left text-bold">{{ connectId }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-col>
    <v-col sm="12" cols="12" class="pt-0">
      <v-simple-table>
        <template v-slot:default>
          <tbody>
            <tr>
              <td style="width: 55%" class="third white--text text-uppercase mt-5">
                {{ $t("current_balance") }}
              </td>
              <td class="third white--text text-left text-bold mt-5">
                {{ numberFormat(balance, decimalFormat) }}
              </td>
            </tr>
            <tr>
              <td style="width: 55%" class="third white--text text-uppercase mt-5">
                {{ $t("nrd_balance") }}
              </td>
              <td class="third white--text text-left text-bold mt-5">
                {{ numberFormat(nrdBalance, decimalFormat) }}
              </td>
            </tr>
            <tr>
              <td style="width: 55%" class="third white--text text-uppercase">
                {{ $t("credit_deposit") }}
              </td>
              <td class="third white--text text-left text-bold">
                {{ numberFormat(deposit, decimalFormat) }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-col>
    <v-col sm="12" cols="12" class="py-0">
      <v-row>
        <v-col sm="12" cols="12" class="py-0">
          <v-col sm="12" cols="6" class="py-0">
            <router-link :to="{ path: routerTo, query: { type: 'edit' } }">
              <v-btn
                width="100"
                color="primary"
                :disabled="btnEnabled"
                class="white--text float-right text-capitalize"
              >
                {{ $t("edit_info") }}
              </v-btn>
            </router-link>
          </v-col>
          <v-col sm="12" cols="6" class="py-0" v-if="!enableDelete">
            <v-btn
              width="100"
              color="primary"
              :disabled="enableDelete"
              @click="deleteCustomer"
              class="white--text float-right text-capitalize mx-1"
            >
              {{ $t("delete") }}
            </v-btn>
          </v-col>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
const balanceHandler = require("@/scripts/balance/handler/balanceHandler");
const customerHandler = require("@/scripts/customerHandler");
import { dataStore } from "@/observable/store";
import { isDeleteAble, notAcessRight } from "@/utils";
import kendo from "@progress/kendo-ui";
export default {
  name: "CustomerInfo",
  props: { customer: {} },
  mounted() {},
  computed: {
    appType() {
      return dataStore.productType;
    },
    name() {
      if (this.customer) {
        if (this.customer.hasOwnProperty("id")) {
          if (this.customer.id !== undefined || this.customer.id !== "") {
            this.loadCustomerBalance(this.customer.id);
            this.loadCustomerDepositBalance(this.customer.id);
            this.hasTxn(this.customer.id);
          }
        }
        if (this.customer.hasOwnProperty("name")) {
          return this.customer.name;
        }
      }
      return "";
    },
    crn() {
      if (this.customer) {
        if (this.customer.hasOwnProperty("crn")) {
          return this.customer.crn.includes("crn-")
            ? this.customer.crn.replace("crn-", "")
            : this.customer.crn;
        }
      }
      return "";
    },
    application() {
      if (this.customer) {
        const application = this.customer.application || "";
        if (application) {
          return application;
        }
      }
      return "";
    },
    consumerId() {
      if (this.customer) {
        const consumerId = this.customer.consumerId || "";
        if (consumerId) {
          return consumerId;
        }
      }
      return "";
    },
    alternativeName() {
      if (this.customer) {
        const alternativeName = this.customer.alternativeName || "";
        if (alternativeName) {
          return alternativeName;
        }
      }
      return "";
    },
    connectId() {
      if (this.customer) {
        const connectId = this.customer.connectId || "";
        if (connectId) {
          return connectId;
        }
      }
      return "";
    },
    type() {
      if (this.customer) {
        if (this.customer.hasOwnProperty("customerType")) {
          if (this.customer.customerType.hasOwnProperty("id")) {
            return this.customer.customerType.name;
          }
        }
      }
      return "";
    },
    subOf() {
      if (this.customer) {
        if (this.customer.hasOwnProperty("subOfCustomer")) {
          if (this.customer.subOfCustomer.hasOwnProperty("id")) {
            return this.customer.subOfCustomer.name;
          }
        }
      }
      return "";
    },
    group() {
      if (this.customer) {
        const group = this.customer.customerGroup || {};
        return group.name || "";
      }
      return "";
    },
    btnEnabled() {
      return !this.customer.id;
    },
    routerTo() {
      if (this.customer) {
        if (this.customer.type === "Individual") {
          return "individual_customer" + `/${this.customer ? this.customer.id : ""}`;
        } else if (this.customer.type === "Company") {
          return "company_customer" + `/${this.customer ? this.customer.id : ""}`;
        }
      }

      return "";
    },
  },
  data: () => ({
    balance: 0,
    nrdBalance: 0,
    deposit: 0,
    decimalFormat: "n2",
    enableDelete: true,
    reason: "",
  }),
  watch: {},
  methods: {
    numberFormat(value, decimalFormat) {
      return kendo.toString(value, decimalFormat);
    },
    async loadCustomerBalance(id) {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          if (id) {
            const year = new Date().getFullYear();
            const strFilter =
              "?id=" + id + "&pattern=bal-0-2-" + year + "&asOf=" + new Date();
            this.balance = 0;
            balanceHandler
              .lastBalance(strFilter)
              .then((res) => {
                if (res.data.statusCode === 200) {
                  const data = res.data.data;
                  if (data.length > 0) {
                    this.balance = data[0].balanceFormat;
                    this.nrdBalance = data[0].nrdBalanceFormat;
                  }
                }
              })
              .catch();
            {
              this.showLoading = false;
            }
          }
        }, 10);
      });
    },
    async loadCustomerDepositBalance(id) {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          if (id) {
            // const strFilter = id + '?type=dep'
            this.deposit = 0;
            const year = new Date().getFullYear();
            const strFilter =
              "?id=" + id + "&pattern=dep-0-2-" + year + "&asOf=" + new Date();
            // const strFilter = id + "?type=bal";
            balanceHandler
              .lastBalance(strFilter)
              .then((res) => {
                if (res.data.statusCode === 200) {
                  const data = res.data.data;
                  if (data.length > 0) {
                    this.deposit = data[0].balanceFormat;
                  }
                }
              })
              .catch();
            {
              this.showLoading = false;
            }
          }
        }, 10);
      });
    },
    async hasTxn(id) {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          if (id) {
            const strFilter = "?id=" + id;
            customerHandler.hasTxn(strFilter).then((res) => {
              if (res.data.statusCode === 200) {
                const response = res.data.data;
                this.enableDelete = !response.delete || false;
              }
            });
          }
        }, 10);
      });
    },
    deleteCustomer() {
      let code = this.customer.type == "Individual" ? 1.101 : 1.11;
      if (!isDeleteAble(2, code, "Delete")) {
        notAcessRight("no_right_delete");
        return;
      }
      this.$swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        input: "text",
        inputPlaceholder: "Input some reason",
        showCancelButton: true,
        confirmButtonColor: "#4d4848",
        cancelButtonColor: "#ED1A3A",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.value.length > 1) {
          this.reason = result.value;
          const id = this.customer.id || "";
          this.onDeleteCustomer(id, this.reason);
          window.console.log(result.value, "---");
        } else {
          this.$snotify.error("Reason required!");
        }
      });
    },
    onDeleteCustomer(id, reason) {
      const customerType = this.customer.customerType || {};
      const customerGroup = this.customer.customerGroup || {};
      const cTypeId = customerType.id || "";
      const cGroupId = customerGroup.id || "";
      const strFilter = {
        id: id,
        status: 2,
        delete: 1,
        reason: reason,
        cTypeId: cTypeId,
        cGroupId: cGroupId,
      };
      customerHandler.update(strFilter).then((res) => {
        if (res.data.statusCode === 201) {
          this.hasTxn(id);
        }
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
  > tr.secondary:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
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

.v-application .secondary,
.v-application .third {
  border-color: #fff !important;
}
</style>
