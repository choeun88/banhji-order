<template>
  <v-row>
    <v-col sm="12" cols="12" class="pt-0 px-6">
      <v-row class="grayBg" style="width: 104%">
        <!-- <v-col cols="12">
          {{ customerName }}
        </v-col> -->
        <v-col sm="12" cols="12" class="">
          <v-card outlined color="white" class="pa-3">
            <v-row class="">
              <v-col sm="5" cols="12" class="pt-0">
                <v-card
                  outlined
                  dense
                  class="pa-3 rounded-4 no_border white--text"
                  color="secondary"
                  height="60px"
                >
                  <h3 class="text-left font_12 flex-1 text-uppercase">
                    {{ $t("credit_limit") }}
                  </h3>
                  <h3 class="text-right flex-1font_20">
                    {{ numberFormat(creditLimitAmount) }}
                  </h3>
                </v-card>
              </v-col>
              <v-col sm="4" cols="12" class="pt-0">
                <v-card
                  outlined
                  dense
                  class="pa-3 rounded-4 no_border white--text"
                  color="third"
                  height="60px"
                >
                  <h3 class="text-left text-uppercase font_12 flex-1">
                    {{ $t("usage%") }}
                  </h3>
                  <h3 class="text-right font_20 flex-1">
                    {{ numberFormat(creditUsage) }} %
                  </h3>
                </v-card>
              </v-col>
              <v-col sm="3" cols="1" class="pt-0 d-flex">
                <v-btn
                  color="primary white--text mr-1 text-capitalize"
                  style="width: 40px;height: 100% !important;"
                  @click="onSearch"
                >
                  <i class="b-search" style="font-size: 16px; color: #fff !important" />
                </v-btn>
                <v-btn @click="onNew" color="primary white--text" style="width: 40px;height: 100% !important;">
                  {{ $t("new") }}
                </v-btn>
              </v-col>
            </v-row>

            <v-row class="">
              <v-col sm="12" cols="12" class="py-0">
                <LoadingMe
                  :isLoading="showLoading"
                  :fullPage="false"
                  type="loading"
                  :myLoading="true"
                />
                <kendo-datasource ref="creditLimitDS" :data="clPaymentItem" />
                <kendo-grid
                  id="gridCreditLimit"
                  class="grid-function"
                  :data-source-ref="'creditLimitDS'"
                  :sortable="false"
                  :column-menu="true"
                  :editable="false"
                  :resizable="false"
                  :noRecords="true"
                  :scrollable-virtual="true"
                >
                  <kendo-grid-column
                    :title="$t('no.')"
                    :width="55"
                    :column-menu="false"
                    :template="rowNumberTmpl"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5;',
                      class: 'text-products',
                    }"
                    :attributes="{
                      style: 'text-align: products',
                    }"
                  />

                  <kendo-grid-column
                    :field="'amount'"
                    :title="$t('amount')"
                    :template="'<span>#=kendo.toString(parseFloat(amount), decimalFormat)#</span>'"
                    :width="190"
                    :attributes="{ style: 'text-align: right; ' }"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5',
                    }"
                  />
                  <kendo-grid-column
                    :field="'effectiveDate'"
                    :title="$t('effective_date')"
                    :template="'<span>#=kendo.toString(new Date(effectiveDate), dateFormat)#</span>'"
                    :width="110"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5',
                    }"
                  />
                  <kendo-grid-column
                    :command="{
                      iconClass: 'k-icon k-i-edit',
                      text: $t('edit'),
                      click: goEdit,
                      class: 'btn-plus',
                    }"
                    :title="$t('action')"
                    :width="80"
                    :headerAttributes="{
                      style: 'text-align: left; background-color: #EDF1F5',
                    }"
                  />
                </kendo-grid>
              </v-col>
              <div style="overflow: auto" class="credit-limit-pager"></div>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-dialog persistent v-model="dialog" max-width="600px">
        <v-card>
          <div class="modal_header">
            <v-card-title>{{ $t("credit_limit") }}</v-card-title>
            <v-icon class="btn_close" @click="dialog = false">close</v-icon>
          </div>
          <v-card-text class="modal_text_content">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col sm="6" cols="12" class="">
                  <label class="label">{{ $t("customer") }}</label>
                  <b>
                    <p>{{ customerName }}</p></b
                  >
                  <!--                  <v-select-->
                  <!--                      class="mt-1"-->
                  <!--                      outlined-->
                  <!--                      placeholder=""-->
                  <!--                      :rules="[(v) => !!v || $t('is_required')]"/>-->
                  <!--                  <label class="label">{{ $t("current_credit_limit") }}</label>-->
                  <!--                  <v-text-field-->
                  <!--                      outlined-->
                  <!--                      class="mt-1"-->
                  <!--                      placeholder=""/>-->
                  <!--                  <label class="label">{{ $t("%change") }}</label>-->
                  <!--                  <v-select-->
                  <!--                    outlined-->
                  <!--                    placeholder=""-->
                  <!--                    class="mt-1"-->
                  <!--                  />-->
                </v-col>

                <v-col sm="6" cols="12" class="pb-0">
                  <label class="label">{{ $t("effective_date") }}</label>
                  <app-datepicker
                    :initialDate="creditLimit.effectiveDate_"
                    @emitDate="creditLimit.effectiveDate_ = $event"
                  />
                  <label class="label">{{ $t("new_credit_limit") }}</label>
                  <v-text-field
                    outlined
                    type="number"
                    v-model="creditLimit.amount"
                    min="1"
                    class="mt-1"
                    placeholder=""
                    :rules="[(v) => !!v || $t('must_be_greater_than_0')]"
                  />
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions class="modal_footer">
            <v-row>
              <v-col sm="6" cols="6" class="py-0">
                <v-btn
                  color="black"
                  outlined
                  class="text-capitalize black--text float-left"
                  @click="dialog = false"
                  >{{ $t("cancel") }}
                </v-btn>
              </v-col>
              <v-col sm="6" cols="6" class="py-0">
                <v-btn
                  color="primary"
                  :disabled="disabled"
                  class="px-3 white--text text-capitalize float-right"
                  @click.native="onSaveClose"
                >
                  {{ $t("save_close") }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>
<script>
// import {i18n} from "@/i18n";
import CreditLimitModel from "@/scripts/creditLimit/model/CreditLimit";
import kendo from "@progress/kendo-ui";
const $ = kendo.jQuery;

const creditLimitHandler = require("@/scripts/creditLimit/handler/creditLimitHandler");
const creditLimitModel = new CreditLimitModel({});

const cookieJS = require("@/cookie.js");
const cookie = cookieJS.getCookie();
// const TYPE = "Customer";
import Helper from "@/helper.js";
export default {
  name: "CreditLimit",
  props: ["customer"],
  data: () => ({
    creditLimitItem: [],
    clPaymentItem: [],
    dialog: false,
    showLoading: false,
    valid: true,
    // effectiveDate: new Date().toISOString().substr(0, 10),
    creditLimit: creditLimitModel,
    loggedUser: {
      id: cookie.creator,
      name: cookie.email,
    },
    creditLimitAmount: 0,
    creditUsage: 0,
    decimalFormat: "n2",
    disabled: false,

    txnclPaymentItem: [],
    totalPMTBal: 0,
    totalPMTBalPerPage: 0,
    paging: {},
    action: "",
    params: {},
  }),
  methods: {
    onDateChange() {
      window.console.log(
        "effectiveDate",
        this.creditLimit.effectiveDate,
        this.creditLimit.effectiveDate_
      );
    },
    clearGrid() {
      this.clPaymentItem = [];
    },
    onNew() {
      this.creditLimit.id = "";
      this.creditLimit.amount = 0;
      this.dialog = true;
    },
    numberFormat(value) {
      return kendo.toString(parseFloat(value), this.decimalFormat);
    },
    rowNumberTmpl(dataItem) {
      let ds = this.$refs.creditLimitDS.kendoWidget(),
        index = ds.indexOf(dataItem);
      return index + 1;
    },
    goEdit(e) {
      e.preventDefault();
      let grid = kendo.jQuery("#gridCreditLimit").data("kendoGrid");
      let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
      this.creditLimit = new CreditLimitModel(dataItem);
      this.creditLimit.effectiveDate_ = dataItem.effectiveDate
      this.dialog = true;
      window.console.log(this.creditLimit, "creditLimit");
    },
    removeRow(e) {
      e.preventDefault();
      const grid = kendo.jQuery("#gridCreditLimit").data("kendoGrid"),
        dataSource = grid.dataSource,
        dataItem = grid.dataItem($(e.currentTarget).closest("tr"));

      if (dataSource.total() > 1) {
        dataSource.remove(dataItem);
      }
    },
    close() {
      this.dialog = false;
    },
    onSaveClose() {
      if (!this.$refs.form.validate()) {
        this.$refs.form.validate();
        return;
      }
      window.console.log("(this.customerId", this.customerId);
      if (this.customerId) {
        const customer_ = {
          id: this.customer.id || "",
          name: this.customer.name || "",
        };
        const amount = this.creditLimit.amount;
        if (parseFloat(amount) > 0) {
          this.creditLimit["customerId"] = this.customerId;
          this.creditLimit["customer"] = customer_;
          this.creditLimit["vendor"] = {
            id: "",
            name: "",
          };
          this.creditLimit["deleted"] = 0;
          this.creditLimit["type"] = "Customer";
          this.creditLimit["loggedUser"] = this.loggedUser;
          this.creditLimit["effectiveDate"] = new Date(this.creditLimit.effectiveDate_)
            .toISOString()
            .substring(0, 10);
          this.creditLimit["effectiveDate_"] = Helper.toISODate(this.creditLimit.effectiveDate_)
          this.disabled = true;
          // this.showLoading = true
          creditLimitHandler
            .create(this.creditLimit)
            .then((response) => {
              if (response.data.statusCode === 201) {
                // this.showLoading = false
                this.disabled = false;
                this.$snotify.success("Successfully");
                this.close();
                this.onSearch();
                // this.loadCreditLimitUsage();
              }
            })
            .catch((e) => {
              // this.showLoading = false
              this.disabled = false;
              this.$snotify.error("Something went wrong");
              this.errors.push(e);
            });
        } else {
          this.$snotify.error("Invalid Amount");
        }
      }
    },
    async loadCreditLimitUsage() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          if (this.customerId) {
            const strFilter = "?id=" + this.customerId + "&type=bal" + "&pattern=bal-cus";
            this.showLoading = true;
            creditLimitHandler.creditUsage(strFilter).then((res) => {
              if (res.data.statusCode === 200) {
                const response = res.data.data;
                this.creditLimitAmount = response.creditLimitAsOfToday || 0;
                this.creditUsage = response.usage || 0;
                this.decimalFormat = response.decimalFormat || "n2";
                this.showLoading = false;
              } else {
                this.showLoading = false;
              }
            });
          }
        }, 10);
      });
    },
    async loadPage(that) {
      $(".credit-limit-pager").html(`
                <label class="label pmt-credit-limit-cus-item-returned">0</label>
                <div style="display: flex; flex-direction: 'row'">
                    <button class="pmt-credit-limit-cus-next-page" title="previous" style="width: 24px; font-size: 19px;"> < </button>
                    <ul class="pmt-credit-limit-cus-page-number" style="display: flex;list-style: none; padding-left: 0px;">
                        <li style="padding: 6px;"  data-page="1" class="pmt-credit-limit-cus-page-link text-bold-link" >1</li>
                    </ul>
                    <button class="pmt-credit-limit-cus-next-page" title="next" style="width: 24px; font-size: 19px;"> > </button>
                </div>
            `);
      $(document).on("click", ".pmt-credit-limit-cus-page-link", function () {
        const page = $(this).data("page");
        $(".pmt-credit-limit-cus-page-link").removeClass("text-bold-link");
        $(this).addClass("text-bold-link");
        that.backToPage(that, page - 1);
        window.console.log(page - 1);
      });
      // $(document).on('click', '.pmt-credit-limit-cus-next-page', function () {
      $(".pmt-credit-limit-cus-next-page").click(function () {
        const page_number = $(this)
          .parent()
          .children(".pmt-credit-limit-cus-page-number")
          .find("li")
          .last()
          .data("page");
        window.console.log("pmt-credit-limit-cus-page_number", page_number);
        const isPrevious = $(this).attr("title");
        if (isPrevious == "previous") {
          const currectpage = $(".text-bold-link").data("page");

          if (currectpage == 1) {
            return;
          }
          $(".pmt-credit-limit-cus-page-link").removeClass("text-bold-link");
          $(`.pmt-credit-limit-cus-page-link:eq(${currectpage - 1})`).addClass(
            "text-bold-link"
          );
          that.backToPage(that, currectpage - 2);
          window.console.log("this currectpage back", currectpage - 2);
        } else {
          $(".pmt-credit-limit-cus-page-link").removeClass("text-bold-link");
          window.console.log("params", that.params);
          that.searchTransaction(that.action);
          $(this)
            .parent()
            .children(".pmt-credit-limit-cus-page-number")
            .append(
              `<li class="pmt-credit-limit-cus-page-link text-bold-link" style="padding: 6px;" data-page="${
                page_number + 1
              }">${page_number + 1}</li>`
            );
        }
        window.console.log("this", page_number + 1);
      });
    },
    itemRetuned(that) {
      let totalRow = 0;
      that.txnclPaymentItem.forEach((k) => {
        totalRow += k.length;
      });
      $(".pmt-credit-limit-cus-item-returned").text("Items returned (" + totalRow + ")");
    },
    disabledNextPage(value) {
      $(".pmt-credit-limit-cus-next-page").prop("disabled", value);
    },
    backToPage(that, index) {
      try {
        window.console.log("Length of txnclPaymentItem", that.txnclPaymentItem.length);
        const byCustomer = that.txnclPaymentItem.at(index);
        that.transactions = byCustomer;
        // that.refreshGridData(customer)
        window.console.log("that.txnclPaymentItem[index]", byCustomer);
      } catch (e) {
        window.console.log("ERROR on backToPage", index);
      }
    },
    onSearch(search) {
      this.txnclPaymentItem = [];
      this.loadPage(this);
      this.paging = {};
      this.loadCreditLimitCenter(search);
      this.loadCreditLimitUsage();
    },
    async loadCreditLimitCenter() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.clPaymentItem = [];
          this.params = {
            key: this.paging,
            pattern: "cl#cus",
            id: this.customerId,
          };
          this.showLoading = true;
          this.disabledNextPage(true);
          creditLimitHandler.getV2(this.params).then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoading = false;
              const responseData = res.data.data || [];
              const total = res.data.total || 0;
              this.showLoading = false;
              this.clPaymentItem = responseData;
              this.paging = res.data.key;
              window.console.log("key", res.data.key);
              this.txnclPaymentItem.push(responseData);

              this.totalPMTBalPerPage = this.clPaymentItem.length;
              this.totalPMTBal = total;

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
  },
  components: {
    LoadingMe: () => import(`@/components/Loading`),
    "app-datepicker": () => import("@/components/custom_templates/DatePickerComponent"),
  },
  computed: {
    customerName() {
      if (this.customer) {
        // const cus = this.customer || {};
        // const id = cus.id || "";
        // if (id) {
        //   // this.loadCreditLimit();
        //   // this.loadCreditLimitUsage();
        // }
        return this.customer.name || "";
      }
      return "";
    },
    customerId() {
      if (this.customer) {
        const cus = this.customer || {};
        const id = cus.id || "";
        if (id) {
          return this.customer.id || "";
        }
      }
      return "";
    },
  },
  mounted: async function () {
    this.loadPage(this);
    this.itemRetuned(this);
    this.disabledNextPage(true);
  },
  watch: {
    customer() {
      this.clearGrid();
    },
  },
};
</script>
