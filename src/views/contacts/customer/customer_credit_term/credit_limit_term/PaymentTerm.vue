<template>
  <v-row>
    <v-col sm="12" cols="12" class="grayBg px-6">
      <v-card color="white" class="pa-3 no_border" elevation="0">
        <v-row>
          <!-- <v-col cols="12">
              {{customerName}}
           </v-col> -->
          <v-col cols="12">
            <v-btn @click="onNew" color="primary float-right white--text">
              {{ $t("new") }}
            </v-btn>
            <v-btn
              color="primary white--text mt-1 ml-1 text-capitalize"
              style="width: 40px"
              @click="onSearch"
            >
              <i class="b-search" style="font-size: 16px; color: #fff !important" />
            </v-btn>
          </v-col>
        </v-row>

        <LoadingMe
          :isLoading="showLoading"
          :fullPage="false"
          type="loading"
          :myLoading="true"
        />
        <kendo-datasource ref="customerTermItemDS" :data="paymentItem" />
        <kendo-grid
          id="gridCustomerTerms"
          class="grid-function"
          :data-source-ref="'customerTermItemDS'"
          :sortable="false"
          :column-menu="true"
          :editable="false"
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
            :field="'term.name'"
            :title="$t('term')"
            :width="200"
            :headerAttributes="{
              style: 'background-color: #EDF1F5',
            }"
          />
          <kendo-grid-column
            :field="'effectiveDate'"
            :title="$t('date')"
            :template="'<span>#=kendo.toString(new Date(effectiveDate), dateFormat)#</span>'"
            :width="200"
            :attributes="{
              style: 'text-align: center',
            }"
            :headerAttributes="{
              style: 'background-color: #EDF1F5; text-align:center;',
            }"
          />
          <kendo-grid-column
            :command="{
              iconClass: 'k-icon k-i-edit',
              text: $t('edit'),
              click: goEdit_,
              class: 'btn-plus',
            }"
            :title="$t('action')"
            :width="80"
            :attributes="{
              style: 'text-align: products',
            }"
            :headerAttributes="{
              style: 'text-align: left; background-color: #EDF1F5',
            }"
          />
        </kendo-grid>
      </v-card>
      <div style="overflow: auto" class="pmt-pager"></div>
      <v-dialog persistent v-model="dialog" max-width="600px">
        <v-card>
          <div class="modal_header">
            <v-card-title>{{ $t("payment_term") }}</v-card-title>
            <v-icon class="" @click="dialog = false">close</v-icon>
          </div>
          <v-card-text class="modal_text_content">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col sm="6" cols="12" class="">
                  <label class="label">{{ $t("customer") }}</label>
                  <b
                    ><p>{{ customerName }}</p></b
                  >
                </v-col>

                <v-col sm="6" cols="12" class="pb-0">
                  <label class="label">{{ $t("effective_date") }}</label>
                  <app-datepicker
                    :initialDate="paymentTerm.effectiveDate_"
                    @emitDate="paymentTerm.effectiveDate_ = $event"
                  />
                  <label class="label">{{ $t("new_term") }}</label>
                  <v-select
                    class="mt-1"
                    :items="terms"
                    item-value="id"
                    item-text="name"
                    v-model="paymentTerm.term"
                    :rules="[(v) => !!v['id'] || 'term is required']"
                    return-object
                    outlined
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
import PaymentTermModel from "@/scripts/paymentterm/model/PaymentTerm";
import paymentTermHandler from "@/scripts/paymentterm/handler/paymentTermHandler";
import settingHandler from "@/scripts/settingsHandler";
import kendo from "@progress/kendo-ui";
const $ = kendo.jQuery;
import TermModel from "@/scripts/model/PaymentTerm";
// const creditLimitHandler = require("@/scripts/creditLimit/handler/creditLimitHandler");
const paymentTermModel = new PaymentTermModel({});

const cookieJS = require("@/cookie.js");
const cookie = cookieJS.getCookie();
// const TYPE = "Customer";
export default {
  name: "PaymentTerm",
  props: ["customer"],
  data: () => ({
    showLoading: false,
    paymentItem: [],
    terms: [],
    dialog: false,
    valid: true,
    paymentTerm: paymentTermModel,
    loggedUser: {
      id: cookie.creator,
      name: cookie.email,
    },
    disabled: false,

    txnPaymentItem: [],
    totalPMTBal: 0,
    totalPMTBalPerPage: 0,
    paging: {},
    action: "",
    params: {},
  }),
  components: {
    "app-datepicker": () => import("@/components/custom_templates/DatePickerComponent"),
    LoadingMe: () => import(`@/components/Loading`),
  },
  computed: {
    customerName() {
      if (this.customer) {
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
  methods: {
    clearGrid() {
      this.paymentItem = [];
    },
    onNew() {
      this.paymentTerm.id = "";
      this.paymentTerm.term = {};
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    },
    goEdit_(e) {
      e.preventDefault();
      let grid = kendo.jQuery("#gridCustomerTerms").data("kendoGrid");
      const dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
      const term = dataItem.term || {};
      this.paymentTerm = new PaymentTermModel(dataItem);
      this.paymentTerm.term = this.terms.filter((k) => k.id === (term.id || ""))[0];
      this.dialog = true;
      window.console.log(this.paymentTerm, "paymentItem");
    },
    rowNumberTmpl(dataItem) {
      let ds = this.$refs.customerTermItemDS.kendoWidget(),
        index = ds.indexOf(dataItem);
      return index + 1;
    },
    // async loadPaymentTermList() {
    //   new Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve("resolved");
    //       if (this.customerId) {
    //         const param = {
    //           key: {},
    //           pattern: "ptm#cus",
    //           id: this.customerId,
    //         };
    //         this.showLoading = true;
    //         paymentTermHandler.getV2(param).then((res) => {
    //           if (res.data.statusCode === 200) {
    //             this.paymentItem = res.data.data;
    //             this.showLoading = false;
    //           } else {
    //             this.showLoading = false;
    //           }
    //         });
    //       }
    //     }, 10);
    //   });
    // },
    async loadPayment() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          const strFilter = "?type=pmt-customer";
          settingHandler.getPaymentTerm(strFilter).then((res) => {
            if (res.data.statusCode === 200) {
              this.terms = res.data.data;
            }
          });
        }, 10);
      });
    },
    onSaveClose() {
      if (!this.$refs.form.validate()) {
        this.$refs.form.validate();
        return;
      }
      // window.console.log('(this.customerId', (this.customerId))
      if (this.customerId) {
        const customer_ = {
          id: this.customer.id || "",
          name: this.customer.name || "",
        };

        this.paymentTerm["customerId"] = this.customerId;
        this.paymentTerm["customer"] = customer_;
        this.paymentTerm["deleted"] = 0;
        this.paymentTerm["vendor"] = {};
        this.paymentTerm["type"] = "Customer";
        this.paymentTerm["term"] = new TermModel(this.paymentTerm.term);
        this.paymentTerm["loggedUser"] = this.loggedUser;
        this.paymentTerm["effectiveDate"] = new Date(this.paymentTerm.effectiveDate_)
          .toISOString()
          .substr(0, 10);
        // this.creditLimit['actionType'] = this.$route.params.id ? this.$route.query.type : 'new'
        this.paymentTerm["effectiveDate_"] = new Date(
          this.paymentTerm.effectiveDate_
        ).toJSON();
        // this.showLoading = true
        this.disabled = true;
        paymentTermHandler
          .create(this.paymentTerm)
          .then((response) => {
            if (response.data.statusCode === 201) {
              this.disabled = false;
              // this.showLoading = false
              this.$snotify.success("Successfully");
              this.close();
              this.onSearch();
            }
          })
          .catch((e) => {
            this.disabled = false;
            // this.showLoading = false
            this.$snotify.error("Something went wrong");
            this.errors.push(e);
          });
      }
    },
    async loadPage(that) {
      $(".pmt-pager").html(`
                <label class="label pmt-cus-item-returned">0</label>
                <div style="display: flex; flex-direction: 'row'">
                    <button class="pmt-cus-next-page" title="previous" style="width: 24px; font-size: 19px;"> < </button>
                    <ul class="pmt-cus-page-number" style="display: flex;list-style: none; padding-left: 0px;">
                        <li style="padding: 6px;"  data-page="1" class="pmt-cus-page-link text-bold-link" >1</li>
                    </ul>
                    <button class="pmt-cus-next-page" title="next" style="width: 24px; font-size: 19px;"> > </button>
                </div>
            `);
      $(document).on("click", ".pmt-cus-page-link", function () {
        const page = $(this).data("page");
        $(".pmt-cus-page-link").removeClass("text-bold-link");
        $(this).addClass("text-bold-link");
        that.backToPage(that, page - 1);
        window.console.log(page - 1);
      });
      // $(document).on('click', '.pmt-cus-next-page', function () {
      $(".pmt-cus-next-page").click(function () {
        const page_number = $(this)
          .parent()
          .children(".pmt-cus-page-number")
          .find("li")
          .last()
          .data("page");
        window.console.log("pmt-cus-page_number", page_number);
        const isPrevious = $(this).attr("title");
        if (isPrevious == "previous") {
          const currectpage = $(".text-bold-link").data("page");

          if (currectpage == 1) {
            return;
          }
          $(".pmt-cus-page-link").removeClass("text-bold-link");
          $(`.pmt-cus-page-link:eq(${currectpage - 1})`).addClass("text-bold-link");
          that.backToPage(that, currectpage - 2);
          window.console.log("this currectpage back", currectpage - 2);
        } else {
          $(".pmt-cus-page-link").removeClass("text-bold-link");
          window.console.log("params", that.params);
          that.searchTransaction(that.action);
          $(this)
            .parent()
            .children(".pmt-cus-page-number")
            .append(
              `<li class="pmt-cus-page-link text-bold-link" style="padding: 6px;" data-page="${
                page_number + 1
              }">${page_number + 1}</li>`
            );
        }
        window.console.log("this", page_number + 1);
      });
    },
    itemRetuned(that) {
      let totalRow = 0;
      that.txnPaymentItem.forEach((k) => {
        totalRow += k.length;
      });
      $(".pmt-cus-item-returned").text("Items returned (" + totalRow + ")");
    },
    disabledNextPage(value) {
      $(".pmt-cus-next-page").prop("disabled", value);
    },
    backToPage(that, index) {
      try {
        window.console.log("Length of txnPaymentItem", that.txnPaymentItem.length);
        const byCustomer = that.txnPaymentItem.at(index);
        that.transactions = byCustomer;
        // that.refreshGridData(customer)
        window.console.log("that.txnPaymentItem[index]", byCustomer);
      } catch (e) {
        window.console.log("ERROR on backToPage", index);
      }
    },
    onSearch(search) {
      this.txnPaymentItem = [];
      this.loadPage(this);
      this.paging = {};
      this.loadPaymentTermCenter(search);
    },
    async loadPaymentTermCenter() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.paymentItem = [];
          this.params = {
            key: this.paging,
            pattern: "ptm#cus",
            id: this.customerId,
          };
          this.showLoading = true;
          this.disabledNextPage(true);
          paymentTermHandler.getV2(this.params).then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoading = false;
              const responseData = res.data.data || [];
              const total = res.data.total || 0;
              this.showLoading = false;
              this.paymentItem = responseData;
              this.paging = res.data.key;
              window.console.log("key", res.data.key);
              this.txnPaymentItem.push(responseData);

              this.totalPMTBalPerPage = this.paymentItem.length;
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
  mounted: async function () {
    await this.loadPayment();
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
