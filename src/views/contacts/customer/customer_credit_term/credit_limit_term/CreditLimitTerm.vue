<template>
  <v-row>
    <v-col class="pr-4 pb-0" sm="4" cols="12">
      <v-card outlined dense class="pa-3 pb-0 no_border mb-md-4 mb-xs-0" color="grayBg">
        <v-text-field
          v-model="search"
          @change="onCustomerTypeChanged(search)"
          outlined
          @click:clear="onCustomerTypeChanged('')"
          :placeholder="$t('search')"
          append-icon="search"
          clearable
        />
        <v-select
          :items="customerTypes"
          @change="onCustomerTypeChanged('')"
          item-value="id"
          item-text="name"
          v-model="mCustomerType"
          return-object
          :placeholder="$t('customer_type')"
          clearable
          outlined
        />
        <v-select
          :items="customerGroups"
          @change="onCustomerTypeChanged('')"
          item-value="id"
          item-text="name"
          return-object
          v-model="mCustomerGroup"
          :placeholder="$t('customer_group')"
          clearable
          outlined
        />
        <!-- <label class="label text-bold"
          >{{ $t("total") }}: {{ toalPerPage }} of {{ totalCustomer }}</label
        > -->
      </v-card>
      <v-card outlined dense class="pa-3 no_border hidden-sm-and-down" color="grayBg">
        <div style="overflow: auto" class="page-customer-credit-term"></div>
        <v-row class="">
          <v-col sm="12" cols="12" class="py-0 bycuscedit-pager">
            <LoadingMe
              :isLoading="showLoading"
              :fullPage="false"
              type="loading"
              :myLoading="true"
            />
            <kendo-datasource
              ref="customerDS"
              :data="customerLimits"
              :schema="schemaDefinition"
              :sort="sortDefinition"
            />
            <kendo-grid
              id="gridCustomerLimit"
              class="grid-center"
              :change="onChanged"
              :data-source-ref="'customerDS'"
              :selectable="true"
              :persistSelection="true"
              :height="appType != 'npo' ? 302 : 466"
              :noRecords="true"
              :scrollable="true"
              :pageable="true"
            >
              <kendo-grid-column
                :field="'name'"
                :attributes="{ class: 'tb_name_td' }"
                :title="'name'"
                :hidden="true"
                :group-header-template="'#=value#'"
              />
              <kendo-grid-column
                :field="'name'"
                :title="'&nbsp;'"
                :template="'<span>#= customerType.abbr#-#=number# - #=name#</span>'"
              />
            </kendo-grid>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-col class="pt-3 pb-0" sm="8" cols="12">
      <v-row>
        <v-col sm="12" cols="12" class="tab_txn_att pt-0 pl-0">
          <v-tabs>
            <v-tab>
              <span class="text-upercase">
                {{ $t("credit_limit") }}
              </span>
            </v-tab>
            <v-tab>
              <span class="text-upercase">
                {{ $t("payment_term") }}
              </span>
            </v-tab>

            <!-- Credit Limit -->
            <v-tab-item>
              <CreditLimit :customer="customer" />
            </v-tab-item>

            <!-- Payment term -->
            <v-tab-item>
              <PaymentTerm :customer="customer" />
            </v-tab-item>
          </v-tabs>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
// import DatePickerComponent from "@/components/custom_templates/DatePickerComponent";
import CustomerModel from "@/scripts/model/Customer";
import kendo from "@progress/kendo-ui";
import LinkTemplate from "@/components/kendo_templates/LinkTemplate";
import { dataStore } from "@/observable/store";

const customerModel = new CustomerModel({});
const $ = kendo.jQuery;
const customerTypeHandler = require("@/scripts/customerTypeHandler");
const customerGroupHandler = require("@/scripts/customerGroupHandler");
const customerHandler = require("@/scripts/customerHandler");
// const billingHandler = require("@/scripts/invoice/handler/billingHandler");

export default {
  name: "CustomerCenter",
  props: ["id"],
  components: {
    LoadingMe: () => import(`@/components/Loading`),
    // "app-datepicker": DatePickerComponent,
    CreditLimit: () => import("./CredtLimit"),
    PaymentTerm: () => import("./PaymentTerm"),
  },
  data: () => ({
    creditLimititem: [],
    paymentItem: [],
    showLoading: false,
    showLoadingTxn: false,
    showLoadingAtch: false,
    info: {},
    customerLimits: [],
    txnCustomerCreditTerm: [],
    start_date: "",
    end_date: "",
    customerTypes: [],
    mCustomerType: {},
    headers: [],
    customerGroups: [],
    mCustomerGroup: {},
    journal_entries: [],
    forwarded: "",
    files: [],
    search: "",
    sortDefinition: [{ field: "number", dir: "asc" }],
    customer: customerModel,
    schemaDefinition: {
      model: { id: "id" },
    },
    groupDefinition: {
      field: "type",
    },
    txnList: [],
    startDate: new Date().toISOString().substr(0, 10),
    endDate: new Date().toISOString().substr(0, 10),
    dateSorters: ["Today", "This Week", "This Month", "This Year"],
    mDateSorter: "Today",
    rules: [
      (files) =>
        !files ||
        !files.some((file) => file.size > 5 * 1024 * 1024) ||
        "Avatar size should be less than 5 MB!",
    ],
    attachmentList: [],
    imgFile: "",
    src: "",
    file_: {},
    fileDesc: "",
    fileSize: 0,
    fileType: "",
    fileName: "",
    totalCustomer: 0,
    toalPerPage: 0,
    paging: {},
    action: "",
    params: {},
  }),
  methods: {
    transactionDate(dataItem) {
      const txnDate = dataItem.transactionDate;
      const dateFormat = dataItem.dateFormat;
      if (txnDate) {
        return kendo.toString(new Date(txnDate), dateFormat);
      }
      return "";
    },
    referenceTemplate(data) {
      let url = "";
      if (data.type === "Invoice") {
        url = `invoice_view/${data.txnId}`;
      } else if (data.type === "Sale Deposit") {
        url = `sale_deposit_view/${data.txnId}`;
      } else if (data.type === "Purchase") {
        url = `purchase_view/${data.txnId}`;
      } else if (data.type === "Sale Quote") {
        url = `sale_quote_view/${data.txnId}`;
      } else if (data.type === "Cash Receipt") {
        url = `cash_receipt_view/${data.txnId}`;
      }
      let args = {
        text: data.referenceNo,
        url: url,
        data: data,
      };
      return {
        template: LinkTemplate,
        templateArgs: args,
      };
    },
    txnStatus(dataItem) {
      const status = dataItem.status || 1;
      let statusText = "";
      switch (status) {
        case 1:
          statusText = "OPEN";
          break;
        case 2:
          statusText = "PARTIALLY PAID";
          break;
        case 3:
          statusText = "PAID";
          break;
        case 4:
          statusText = "VOID";
          break;
      }
      return statusText;
    },
    // async searchTransaction() {
    //   new Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve("resolved");
    //       const id = this.customer.id || "";
    //       if (id) {
    //         this.showLoadingTxn = true;
    //         const startDate = this.startDate;
    //         const endDate = this.endDate;
    //
    //         if (id) {
    //           const strFilter =
    //               "?start=" + startDate + "&end=" + endDate + "&id=" + id;
    //           billingHandler.customerTxn(strFilter).then((res) => {
    //             if (res.data.statusCode === 200) {
    //               this.showLoadingTxn = false;
    //               this.txnList = JSON.parse(JSON.stringify(res.data.data));
    //             }
    //           });
    //         }
    //       }
    //     }, 10);
    //   });
    // },
    onSorterChanges(val) {
      let today = new Date();
      switch (val) {
        case "Today":
          this.startDate = kendo.toString(today, "yyyy-MM-dd");
          this.endDate = kendo.toString(today, "yyyy-MM-dd");

          break;
        case "This Week":
          var first = today.getDate() - today.getDay(),
            last = first + 6;

          this.startDate = kendo.toString(new Date(today.setDate(first)), "yyyy-MM-dd");
          today = new Date();
          this.endDate = kendo.toString(new Date(today.setDate(last)), "yyyy-MM-dd");

          break;
        case "This Month":
          this.startDate = kendo.toString(
            new Date(today.getFullYear(), today.getMonth(), 1),
            "yyyy-MM-dd"
          );
          this.endDate = kendo.toString(
            new Date(today.getFullYear(), today.getMonth(), 31),
            "yyyy-MM-dd"
          );

          break;
        case "This Year":
          this.startDate = kendo.toString(
            new Date(today.getFullYear(), 0, 1),
            "yyyy-MM-dd"
          );
          this.endDate = kendo.toString(
            new Date(today.getFullYear(), 11, 31),
            "yyyy-MM-dd"
          );

          break;
        default:
          this.startDate = "";
          this.endDate = "";
      }
    },
    rowNumberTmpl(dataItem) {
      let ds = this.$refs.transactionDS.kendoWidget(),
        index = ds.indexOf(dataItem);
      return index + 1;
    },
    onCustomerTypeChanged(search) {
      this.txnCustomerCreditTerm = [];
      this.loadPage(this);
      this.paging = {};
      this.loadCustomerCenter(search);
    },
    async loadCustomerGroup() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          customerGroupHandler.get().then((res) => {
            this.showLoading = false;
            this.customerGroups = res;
            if (this.customerGroups.length > 0) {
              this.mCustomerGroup = [];
            }
            this.txnCustomerCreditTerm = [];
            this.loadPage(this);
            this.paging = {};
            this.loadCustomerCenter("");
          });
        }, 10);
      });
    },
    async customerInfo() {
      this.$emit("onUpdate", this.customer);
    },
    async onChanged() {
      let grid = kendo.jQuery("#gridCustomerLimit").data("kendoGrid");
      let selectedItem = grid.dataItem(grid.select());
      this.customer = selectedItem;
      window.console.log(this.customer, "mCustomer");
      this.$emit("onUpdate", selectedItem);
    },
    async loadCustomerType() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          customerTypeHandler.get().then((res) => {
            this.customerTypes = res;
            if (this.customerTypes.length > 0) {
              this.mCustomerType = this.customerTypes[0];
            }
          });
        }, 10);
      });
    },
    async loadCustomerCenter(search) {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.customerLimits = [];
          let groupId = "";
          let customerTypeId = "";
          const group = this.mCustomerGroup || {};
          const cusType = this.mCustomerType || {};
          groupId = group.id || "";
          customerTypeId = cusType.id || "";
          let isDonor = false;
          if (this.appType === "npo") {
            isDonor = true;
          }
          const strSearch = search || "";
          window.console.log("strFilter", strSearch);
          //   const strFilterV1 = isDonor + "&ctid=" + customerTypeId + "&grid=" + groupId +"&search=" + strSearch;
          this.params = {
            isDonor: isDonor,
            ctid: customerTypeId,
            grid: groupId,
            key: this.paging,
            search: search,
          };
          this.showLoading = true;
          this.disabledNextPage(true);
          customerHandler
            // .center(customerTypeId, groupId, strSearch, strFilter)
            // .centerv1(strFilterV1)
            .centerv1(this.params)
            .then((res) => {
              if (res.data.statusCode === 200) {
                this.showLoading = false;
                const responseData = res.data.data || [];
                const total = res.data.total || 0;
                this.showLoading = false;
                this.customerLimits = responseData;
                this.paging = res.data.key;
                window.console.log("key", res.data.key);
                this.txnCustomerCreditTerm.push(responseData);

                this.toalPerPage = this.customerLimits.length;
                this.totalCustomer = total;

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

    callback() {
      if (this.$route.params !== null && this.$route.params.hasOwnProperty("data")) {
        const customer = this.$route.params.data;
        const index = this.customerLimits.findIndex((item) => {
          return customer.id === item.id;
        });
        if (index < 0) {
          this.customerLimits.push(customer);
        } else {
          this.customerLimits.splice(index, 1, customer);
        }
      }
      window.console.log("im changed", this.$route.params);
    },
    // async loadAttachment() {
    //   new Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve("resolved");
    //       if (this.$route.params.hasOwnProperty("id")) {
    //         this.showLoadingAtch = true;
    //         const strFilter = "?id=" + this.$route.params.id;
    //         billingHandler.attachmentList(strFilter).then((res) => {
    //           if (res.data.statusCode === 200) {
    //             this.showLoadingAtch = false;
    //             this.attachmentList = res.data.data;
    //           }
    //         });
    //       }
    //     }, 10);
    //   });
    // },
    async loadPage(that) {
      $(".page-customer-credit-term").html(`
                <span class="mt-2 bycuscredit-term-item-returned">0</span><br/>
                <div style="display: flex; flex-direction: 'row'">
                    <button class="bycuscredit-term-next-page" title="previous" style="width: 24px; font-size: 19px; margin-top: -6px;"> < </button>
                    <ul class="bycuscredit-term-page-number page_scroll" style="display: flex;list-style: none; padding-left: 0px;">
                        <li style="padding: 6px; padding-bottom: 0px;"  data-page="1" class="bycuscredit-term-page-link text-bold-link" >1</li>
                    </ul>
                    <button class="bycuscredit-term-next-page" title="next" style="width: 24px; font-size: 19px; margin-top: -6px;"> > </button>
                </div>
            `);
      $(document).on("click", ".bycuscredit-term-page-link", function () {
        const page = $(this).data("page");
        $(".bycuscredit-term-page-link").removeClass("text-bold-link");
        $(this).addClass("text-bold-link");
        that.backToPage(that, page - 1);
        window.console.log(page - 1);
      });
      // $(document).on('click', '.bycus-next-page', function () {
      $(".bycuscredit-term-next-page").click(function () {
        const page_number = $(this)
          .parent()
          .children(".bycuscredit-term-page-number")
          .find("li")
          .last()
          .data("page");
        window.console.log("bycuscredit-term-page_number", page_number);
        const isPrevious = $(this).attr("title");
        if (isPrevious == "previous") {
          const currectpage = $(".text-bold-link").data("page");

          if (currectpage == 1) {
            return;
          }
          $(".bycuscredit-term-page-link").removeClass("text-bold-link");
          $(`.bycuscredit-term-page-link:eq(${currectpage - 1})`).addClass(
            "text-bold-link"
          );
          that.backToPage(that, currectpage - 2);
          window.console.log("this currectpage back", currectpage - 2);
        } else {
          $(".bycuscredit-term-page-link").removeClass("text-bold-link");
          that.loadCustomerCenter(that.search);
          $(this)
            .parent()
            .children(".bycuscredit-term-page-number")
            .append(
              `<li class="bycuscredit-term-page-link text-bold-link" style="padding: 6px;padding-bottom: 0px;" data-page="${
                page_number + 1
              }">${page_number + 1}</li>`
            );
        }
        window.console.log("this", page_number + 1);
      });
    },
    itemRetuned(that) {
      let totalRow = 0;
      that.txnCustomerCreditTerm.forEach((k) => {
        totalRow += k.length;
      });
      $(".bycuscredit-term-item-returned").text(
        "Items returned (" + totalRow + " of " + that.totalCustomer + ")"
      );
    },
    disabledNextPage(value) {
      $(".bycuscredit-term-next-page").prop("disabled", value);
    },
    backToPage(that, index) {
      try {
        const byCustomer = that.txnCustomerCreditTerm.at(index);
        that.customerLimits = byCustomer;
        // that.refreshGridData(customer)
        window.console.log("that.txnCustomerCreditTerm[index]", byCustomer);
      } catch (e) {
        window.console.log("ERROR on backToPage", index);
      }
    },
  },
  async mounted() {
    await this.loadCustomerType();
    await this.loadCustomerGroup();
  },
  computed: {
    appType() {
      return dataStore.productType;
    },
  },
  watch: {
    // $route: "callback",
  },
};
</script>
<style scoped>
@media (max-width: 576px) {
  .v-tab {
    min-width: auto !important;
  }

  .paddingLeft {
    margin-left: 15px;
  }
}

.grid-center.center_heigth {
  height: 356px !important;
}
</style>
