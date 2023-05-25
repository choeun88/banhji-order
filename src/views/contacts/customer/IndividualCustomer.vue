<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="12" sm="12">
          <v-card
            outlined
            dense
            class="pa-4 no_border rounded-sm"
            color="white"
          >
            <v-row>
              <v-col
                class="bigSide py-0"
                sm="12"
                cols="12"
                style="transition: 0.3s ease-in"
                :class="{ hide_big_bar_class: isHideBar }"
              >
                <div class="function_header">
                  <h2>{{ $t("individual_customer") }}</h2>
                  <v-icon @click="cancel()" class="float-right close_icon"
                    >close
                  </v-icon>
                </div>

                <div class="function_content">
                  <!-- Form -->
                  <v-form ref="form" v-model="valid">
                    <v-row class="px-6">
                      <v-col>
                        <v-row>
                          <v-col sm="4" cols="12" class="pb-0">
                            <label class="label mb-0">{{
                              $t("customer_type")
                            }}</label>
                            <v-select
                              class="mt-1"
                              :items="customerTypes"
                              placeholder="customer Type"
                              item-text="name"
                              item-value="id"
                              :disabled="disabledMe"
                              tage="Customer Type"
                              v-on:change="customerTypeChange"
                              :rules="[
                                (v) =>
                                  v ? !!v['id'] || $t('is_required') : '',
                              ]"
                              v-model="customer.customerType"
                              return-object
                              outlined
                            />

                            <label class="label mb-0">{{
                              $t("registered_date")
                            }}</label>
                            <app-datepicker
                              :initialDate="customer.registeredDate"
                              @emitDate="registeredDate = $event"
                            />
                          </v-col>
                          <v-col sm="4" cols="12" class="pb-0">
                            <label class="label mb-0"
                              >{{ $t("customer_name") }}*</label
                            >
                            <v-text-field
                              class="mt-1"
                              v-model="customer.name"
                              outlined
                              :rules="nameRules"
                              required
                            />
                            <label class="label mb-0">{{
                              $t("alternative_name")
                            }}</label>
                            <v-text-field
                              class="mt-1"
                              tage="Alternative Name"
                              v-model="customer.alternativeName"
                              outlined
                            />
                          </v-col>
                          <v-col sm="4" cols="12" class="pb-0">
                            <label class="label mb-0">{{ $t("number") }}</label>
                            <v-row class="pt-1 pb-0">
                              <v-col sm="2" cols="3" class="py-0 pr-0">
                                <div class="code_text text-uppercase">
                                  {{
                                    customer.customerType
                                      ? customer.customerType.abbr
                                      : ""
                                  }}
                                </div>
                              </v-col>
                              <v-col sm="10" cols="8" class="py-0 d-flex pl-0">
                                <v-text-field
                                  class="custom-border flex-1"
                                  :disabled="disableNumber"
                                  v-model="customer.number"
                                  outlined
                                  :rules="[(v) => !!v || 'Number is required']"
                                  required
                                />
                                <div class="text-uppercase ml-1">
                                  <v-checkbox
                                    class="mt-0"
                                    :disabled="disabledMe"
                                    @change="onCheckChanged"
                                    v-model="customer.autoNumber"
                                    :label="`Auto`"
                                  />
                                </div>
                              </v-col>
                            </v-row>
                            <label class="mb-0 text-uppercase">{{
                              $t("banhji_consumer_id")
                            }}</label>
                            <v-text-field
                              class="mt-1"
                              tage="Banhji id"
                              v-model="customer.consumerId"
                              outlined
                            />
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                    <div
                      style="
                        background-color: #ffffff;
                        height: 16px;
                        width: 100%;
                      "
                    ></div>
                    <!-- Grid -->
                    <v-tabs
                      slider-color="#ffffff"
                      v-model="model_tabs"
                      class="individual_tabs"
                    >
                      <v-tab>
                        <span class="text-uppercase">{{
                          $t("contact_address")
                        }}</span>
                      </v-tab>
                      <!-- <v-tab>
                        <span class="text-uppercase">{{
                          $t("payment_billing")
                        }}</span>
                      </v-tab> -->
                      <!-- <v-tab>
                        <span class="text-uppercase">{{ $t("account") }}</span>
                      </v-tab> -->
                      <!-- <v-tab>
                        <span class="text-uppercase">{{
                          $t("note_on_invoice")
                        }}</span>
                      </v-tab> -->
                      <v-tab>
                        <span class="text-uppercase">{{ $t("image") }}</span>
                      </v-tab>
                      <!-- item 1 -->
                      <v-tab-item>
                        <p class="color_grey">
                          {{ $t("add_inv_contact_customer") }}
                        </p>
                        <v-row>
                          <v-col class="py-0" sm="4" cols="12">
                            <label class="label mb-0">{{ $t("gender") }}</label>
                            <v-select
                              class="mt-1"
                              :items="genderItem"
                              item-text="name"
                              item-value="name"
                              tage="Gender"
                              v-model="gender"
                              placeholder="Male"
                              outlined
                            >
                            </v-select>
                            <label class="mb-0">{{ $t("dob") }}</label>
                            <app-datepicker
                              :initialDate="dob"
                              @emitDate="dob = $event"
                            />
                          </v-col>
                          <v-col class="py-0" sm="4" cols="12">
                            <label class="mb-0">{{ $t("phone_number") }}</label>
                            <v-text-field
                              class="mt-1"
                              tage="Phone Number"
                              v-model="phone"
                              outlined
                            />
                          </v-col>
                          <v-col class="py-0" sm="4" cols="12">
                            <label class="mb-0">{{ $t("email") }}</label>
                            <v-text-field
                              class="mt-1"
                              tage="Email"
                              v-model="email"
                              outlined
                            />
                          </v-col>
                          <v-col class="py-0" sm="12" cols="12">
                            <v-dialog v-model="dialogM2" max-width="500px">
                              <template v-slot:activator="{ on }">
                                <v-btn
                                  color="primary"
                                  rounded
                                  class="btn_create_new float-right mb-4"
                                  @click="onNewAddressClick"
                                  v-on="on"
                                  >{{ $t("add_new_address") }}
                                </v-btn>
                              </template>
                              <v-card>
                                <div class="modal_header">
                                  <v-card-title>{{
                                    $t("address")
                                  }}</v-card-title>
                                  <v-icon
                                    class="btn_close"
                                    @click="dialogM2 = false"
                                  >
                                    close
                                  </v-icon>
                                </div>
                                <v-card-text class="modal_text_content">
                                  <v-row class="mt-2">
                                    <v-col cols="12" sm="6" class="py-0">
                                      <label class="mb-0">{{
                                        $t("address_name")
                                      }}</label>
                                      <v-text-field
                                        class="mt-1"
                                        tage="Address Name"
                                        v-model="address.name"
                                        outlined
                                      />
                                      <label class="label mb-0">{{
                                        $t("address_type")
                                      }}</label>
                                      <v-select
                                        class="mt-1"
                                        :items="addressType"
                                        tage="Address Type"
                                        v-model="address.type"
                                        outlined
                                      />
                                      <label class="mb-0">{{
                                        $t("address_line_2")
                                      }}</label>
                                      <v-text-field
                                        class="mt-1"
                                        v-model="address.line2"
                                        tage="Address Line 2"
                                        outlined
                                      />
                                    </v-col>
                                    <v-col sm="6" cols="12" class="py-0">
                                      <label class="mb-0">{{
                                        $t("country")
                                      }}</label>
                                      <v-select
                                        class="mt-1"
                                        :items="countries"
                                        tage="Address Country"
                                        v-model="address.country"
                                        item-value="abbreviation"
                                        :item-text="
                                          (item) =>
                                            `${item.abbreviation} - ${item.country}`
                                        "
                                        return-object
                                        outlined
                                      />
                                      <label class="mb-0">{{
                                        $t("address_line_1")
                                      }}</label>
                                      <v-text-field
                                        class="mt-1"
                                        v-model="address.line1"
                                        tage="Address Line 1"
                                        outlined
                                      />
                                    </v-col>
                                  </v-row>
                                </v-card-text>
                                <v-card-actions
                                  class="
                                    modal_footer
                                    d-flex
                                    justify-space-between
                                  "
                                >
                                  <v-btn
                                    color="primary"
                                    outlined
                                    class="black--text text-capitalize"
                                    @click="dialogM2 = false"
                                    >{{ $t("cancel") }}
                                  </v-btn>
                                  <v-btn
                                    @click="onSaveCloseAddress"
                                    color="primary"
                                    class="white--text text-capitalize"
                                  >
                                    {{ $t("save_close") }}
                                  </v-btn>
                                </v-card-actions>
                              </v-card>
                            </v-dialog>
                            <v-simple-table
                              class="exchange-table my-4"
                              style="clear: right"
                            >
                              <kendo-datasource
                                ref="gridAddressDS"
                                :data="addressList"
                              />
                              <kendo-grid
                                id="gridAddress"
                                class="grid-function"
                                :data-source-ref="'gridAddressDS'"
                                :editable="false"
                                :scrollable-virtual="true"
                              >
                                <kendo-grid-column
                                  :field="'no'"
                                  :title="$t('no')"
                                  :template="rowNumberTmpl"
                                  :width="40"
                                  :column-menu="false"
                                  :headerAttributes="{
                                    style: 'background-color: #EDF1F5;',
                                    class: 'text-center',
                                  }"
                                  :attributes="{ style: 'text-align: center' }"
                                />
                                <kendo-grid-column
                                  :field="'name'"
                                  :title="$t('name')"
                                  :attributes="{ class: 'tb_name_td' }"
                                  :width="50"
                                  :template="'<span>#=name#</span>'"
                                  :headerAttributes="{
                                    style: 'background-color: #EDF1F5',
                                  }"
                                />
                                <kendo-grid-column
                                  :field="'type'"
                                  :title="$t('type')"
                                  :width="90"
                                  :template="'<span>#=type#</span>'"
                                  :headerAttributes="{
                                    style: 'background-color: #EDF1F5',
                                  }"
                                />
                                <kendo-grid-column
                                  :field="''"
                                  :title="$t('action')"
                                  :width="70"
                                  :command="[
                                    {
                                      iconClass: 'k-icon k-i-edit',
                                      text: 'Edit',
                                      click: goEditAddress,
                                    },
                                  ]"
                                  :headerAttributes="{
                                    style:
                                      'text-align: left; background-color: #EDF1F5',
                                  }"
                                />
                              </kendo-grid>
                            </v-simple-table>
                          </v-col>
                        </v-row>
                      </v-tab-item>
                      <!-- item 2 -->
                      <!-- <v-tab-item eager>
                        <p class="color_grey">
                          {{ $t("payment_billing_desc") }}
                        </p>
                        <v-row>
                          <v-col class="py-0" sm="4" cols="12">
                            <label class="label mb-0"
                              >{{ $t("customer_group") }}
                              <v-icon
                                size="18"
                                color="red"
                                @click="loadCustomerGroup"
                                >refresh</v-icon
                              ></label
                            >
                            <v-select
                              class="mt-1"
                              v-model="mCustomerGroup"
                              :items="customerGroups"
                              item-value="id"
                              item-text="name"
                              @change="customerGroupChanged"
                              return-object
                              tage="Customer Group"
                              placeholder="Group A"
                              outlined
                            />
                            <label class="mb-0">{{ $t("payment_term") }}</label>
                            <v-select
                              class="mt-1"
                              v-model="mPaymentTerm"
                              :items="paymentTerms"
                              item-value="id"
                              item-text="name"
                              :disabled="false"
                              :rules="[
                                (v) =>
                                  v ? !!v['id'] || $t('is_required') : '',
                              ]"
                              return-object
                              placeholder="Payment_term"
                              tage="Payment_term"
                              outlined
                            />
                            <label class="mb-0"
                              >{{ $t("qr_payment") }}
                              <v-icon
                                size="18"
                                color="red"
                                @click="loadPaymentOption"
                                >refresh</v-icon
                              ></label
                            >
                            <v-select
                              class="mt-1"
                              :items="qrPayment"
                              :item-text="
                                (item) => `${item.code} - ${item.name}`
                              "
                              v-model="customer.qrPayment"
                              return-object
                              clearable
                              outlined
                            />
                          </v-col>
                          <v-col class="py-0" sm="4" cols="12">
                            <label class="mb-0"
                              >{{ $t("default_price_level") }}
                              <v-icon
                                size="18"
                                color="red"
                                @click="loadPriceLevel"
                                >refresh</v-icon
                              ></label
                            >
                            <v-select
                              class="mt-1"
                              v-model="customer.priceLevel"
                              :items="priceLevel"
                              item-value="id"
                              item-text="name"
                              :rules="[
                                (v) =>
                                  v ? !!v['id'] || $t('is_required') : '',
                              ]"
                              return-object
                              placeholder="Price Level"
                              tage="Default Price Level"
                              outlined
                            />

                            <label class="mb-0"
                              >{{ $t("cash_payment") }}
                              <v-icon
                                size="18"
                                color="red"
                                @click="loadPaymentOption"
                                >refresh</v-icon
                              ></label
                            >
                            <v-select
                              class="mt-1"
                              :items="cashPayment"
                              tage="Cash Payment"
                              :rules="[
                                (v) =>
                                  v ? !!v['id'] || $t('is_required') : '',
                              ]"
                              :item-text="
                                (item) => `${item.code} - ${item.name}`
                              "
                              v-model="customer.cashPayment"
                              return-object
                              outlined
                            />
                            <label class="mb-0"
                              >{{ $t("bank_transfer") }}
                              <v-icon
                                size="18"
                                color="red"
                                @click="loadPaymentOption"
                                >refresh</v-icon
                              ></label
                            >
                            <v-select
                              class="mt-1"
                              :items="bankTransfer"
                              :item-text="
                                (item) => `${item.code} - ${item.name}`
                              "
                              v-model="customer.bankTransfer"
                              return-object
                              clearable
                              outlined
                            />
                          </v-col>
                          <v-col class="py-0" sm="4" cols="12">
                            <label class="mb-0"
                              >{{ $t("default_discount") }}
                              <v-icon
                                size="18"
                                color="red"
                                @click="loadDiscountItems"
                                >refresh</v-icon
                              ></label
                            >
                            <v-select
                              class="mt-1"
                              v-model="mDiscountItem"
                              :items="discountItems"
                              item-value="id"
                              item-text="name"
                              return-object
                              tage="Default Discount"
                              placeholder="0% discount"
                              outlined
                            />
                            <label class="mb-0"
                              >{{ $t("bill_payment") }}
                              <v-icon
                                size="18"
                                color="red"
                                @click="loadPaymentOption"
                                >refresh</v-icon
                              ></label
                            >
                            <v-select
                              class="mt-1"
                              :items="billPayment"
                              tage="Bill Payment"
                              :item-text="
                                (item) => `${item.code} - ${item.name}`
                              "
                              v-model="customer.billPayment"
                              return-object
                              clearable
                              outlined
                            />
                          </v-col>
                        </v-row>
                      </v-tab-item> -->
                      <!-- item3 -->
                      <!-- <v-tab-item eager>
                        <v-row>
                          <v-col sm="12" class="py-0" cols="12">
                            <p class="mb-0 color_grey">
                              {{ $t("acc_tax_individual_desc") }}
                            </p>
                          </v-col>
                          <v-col sm="4" cols="12">
                            <label class="label mb-0">{{
                              $t("account_receivable")
                            }}</label>
                            <v-select
                              class="mt-1"
                              v-model="mAccReceivable"
                              :loading="accReceivable.length === 0"
                              :items="accReceivable"
                              :rules="[
                                (v) =>
                                  v ? !!v['id'] || $t('is_required') : '',
                              ]"
                              item-value="id"
                              :item-text="
                                (item) =>
                                  `${item.number} - ${
                                    this.$store.state.accounting
                                      .accountLanguage === 'English'
                                      ? item.name
                                      : item.local_name
                                  }`
                              "
                              return-object
                              placeholder="Account Receivable"
                              tage="Account Receivable"
                              outlined
                            />
                          </v-col>
                          <v-col sm="4" cols="12">
                            <label class="label mb-0">{{
                              $t("sale_deposit")
                            }}</label>
                            <v-select
                              class="mt-1"
                              v-model="mAccDeposit"
                              :loading="accDeposit.length === 0"
                              :items="accDeposit"
                              :rules="[
                                (v) =>
                                  v ? !!v['id'] || $t('is_required') : '',
                              ]"
                              item-value="id"
                              :item-text="
                                (item) =>
                                  `${item.number} - ${
                                    this.$store.state.accounting
                                      .accountLanguage === 'English'
                                      ? item.name
                                      : item.local_name
                                  }`
                              "
                              return-object
                              tage="Sale Deposit"
                              :disabled="disabledMe"
                              placeholder="Sale Deposit Account"
                              outlined
                            />
                          </v-col>
                          <v-col sm="4" cols="12">
                            <label class="label mb-0">{{
                              $t("unearn_revenue_account")
                            }}</label>
                            <v-select
                              class="mt-1"
                              v-model="mUnearnRevenue"
                              :loading="unearnRevenue.length === 0"
                              :items="unearnRevenue"
                              :rules="[
                                (v) =>
                                  v ? !!v['id'] || $t('is_required') : '',
                              ]"
                              item-value="id"
                              :item-text="
                                (item) =>
                                  `${item.number} - ${
                                    this.$store.state.accounting
                                      .accountLanguage === 'English'
                                      ? item.name
                                      : item.local_name
                                  }`
                              "
                              return-object
                              tage="Unearn revenue"
                              placeholder="Unearn revenue"
                              outlined=""
                            >
                            </v-select>
                          </v-col>
                        </v-row>
                      </v-tab-item> -->
                      <!-- <v-tab-item eager>
                        <p class="color_grey">
                          {{ $t("note_individual_desc") }}
                        </p>
                        <editor
                          ref="invoiceNoteEditor"
                          :resizable-content="true"
                          :resizable-toolbar="true"
                          :value="customer.noteOnInvoice"
                          style="height: 120px"
                          class="mt-1"
                          rows="10"
                          cols="30"
                        />
                      </v-tab-item> -->
                      <v-tab-item eager>
                        <v-col sm="12" class="">
                          <h2 class="mb-2 font_18 width_100">
                            {{ $t("customer_image") }}
                          </h2>
                          <v-row>
                            <v-col sm="5" cols="12" lass="pt-2">
                              <p class="color_grey font_14">
                                {{ $t("add_funct_prod_variant_desc3") }}
                              </p>
                            </v-col>
                            <v-col sm="7" cols="12" class="py-0">
                              <v-img width="100px" height="150px" :src="src" />
                              <label>
                                <input
                                  type="file"
                                  name="image"
                                  id="image"
                                  :rules="fileSizeRules"
                                  accept=".png, .jpg, .jpeg"
                                  ref="fileupload"
                                  @change="onFileChange"
                                />
                              </label>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-tab-item>
                    </v-tabs>
                  </v-form>
                </div>
                <div class="mt-3">
                  <v-alert type="warning" v-model="alert" dismissible>
                    <span v-html="errorMessage" />
                  </v-alert>
                  <v-btn
                    color="primary"
                    outlined
                    class="black--text text-capitalize"
                    @click="cancel"
                    >{{ $t("cancel") }}
                  </v-btn>
                  <v-btn
                    color="primary"
                    class="white--text float-right text-capitalize"
                    :disabled="btnDisabled"
                    @click="onSaveClose('close')"
                    >{{ $t("save_close") }}
                  </v-btn>
                  <v-btn
                    color="secondary"
                    style="margin-right: 10px !important"
                    class="white--text float-right text-capitalize"
                    :disabled="btnDisabled"
                    @click="onSaveClose('new')"
                    :hidden="hiddenButton"
                    >{{ $t("save_new") }}
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <LoadingMe
        :isLoading="showLoading"
        :fullPage="false"
        :myLoading="true"
        :alertMessage="loadingAlert"
        :color="loadingColorAlert"
        :alertText="loadingTextAlert"
      />
    </v-container>
  </v-app>
</template>

<script>
import { i18n } from "@/i18n";
import DatePickerComponent from "@/components/custom_templates/DatePickerComponent";
import { uuid } from "vue-uuid";
import CustomerModel from "@/scripts/model/Customer";
import kendo from "@progress/kendo-ui";
// import { Editor } from "@progress/kendo-editor-vue-wrapper";
import { PAYMENT_OPINION_TYPE } from "@/scripts/default_setup/Setting";
import PaymentOptionModel from "@/scripts/model/PaymentOption";
import PaymentTermModel from "@/scripts/model/PaymentTerm";

const customerModel = new CustomerModel({});
const accountHandler = require("@/scripts/handler/accounting/account");
const customerHandler = require("@/scripts/customerHandler");
const customerTypeHandler = require("@/scripts/customerTypeHandler");
const settingHandler = require("@/scripts/settingHandler");
const settingsHandler = require("@/scripts/settingsHandler");
const paymentOptionHandler = require("@/scripts/paymentOptionHandler");
const otherHandler = require("@/scripts/otherHandler");
const warehouseHandler = require("@/scripts/warehouseHandler");
const priceLevelHandler = require("@/scripts/priceLevelHandler");
const discountItemHandler = require("@/scripts/discountItemHandler");
const customerGroupHandler = require("@/scripts/customerGroupHandler");
// import { DropDownList } from "@progress/kendo-vue-dropdowns";

const instituteHandler = require("@/scripts/instituteHandler");

const $ = kendo.jQuery;
const textField = "name";
const keyField = "id";
const defaultItem = { [textField]: "Select customer...", [keyField]: null };
const emptyItem = { [textField]: "loading ..." };
const pageSize = 10;

const loadingData = [];
while (loadingData.length < pageSize) {
  loadingData.push({ ...emptyItem });
}
const OPTION_TYPE = "?type=Sale";
const strFilterTerm = "?type=pmt-customer";
const cookieJS = require("@/cookie.js");
const cookie = cookieJS.getCookie();
const instituteId = cookie.instituteId;

export default {
  name: "IndividualCustomer",
  props: ["id"],
  components: {
    LoadingMe: () => import(`@/components/Loading`),
    "app-datepicker": DatePickerComponent,
    // dropdownlist: DropDownList,
    // editor: Editor,
  },
  data: () => ({
    model_tabs: 0,
    isHideBar: false,
    showLoading: false,
    loadingAlert: false,
    loadingColorAlert: "",
    loadingTextAlert: "",
    dialogM2: false,
    alert: false,
    addressType: ["Billing", "Delivery", "Contact"],
    deliveryMethod: [],
    genderItem: customerHandler.gender(),
    valid: false,
    valid2: true,
    customer: customerModel,
    customerTypes: [],
    subOfCustomerItem: [],
    subOfCustomer: [],
    billByParent: [],
    contactAddress: [],
    paymentBilling: [],
    accountTax: [],
    customerList: [],
    defaultTaxOnShipping: [],
    mDefaultTaxOnShipping: {},
    tax: [],
    vat: [],
    mVat: {},
    customerBillToItem: [],
    customerBillTo: [],
    countries: [],
    address: {
      id: "",
      name: "",
      type: "",
      country: {},
      line1: "",
      line2: "",
    },
    paymentOptions: [],
    paymentTerms: [],
    wareHouses: [],
    mPaymentMethod: {},
    mPaymentTerm: {},
    mWareHouse: {},
    accReceivable: [],
    mAccReceivable: {},
    accDeposit: [],
    mAccDeposit: {},
    unearnRevenue: [],
    mUnearnRevenue: {},
    priceLevel: [],
    mPriceLevel: {},
    discountItems: [],
    customerGroups: [],
    mDiscountItem: {},
    mCustomerGroup: {},
    registeredDate: new Date().toISOString().substring(0, 10),
    imgFile: "",
    src: "",
    fileSizeRules: [
      (files) =>
        !files ||
        !files.some((file) => file.size > 1024 * 1024) ||
        "Image size should be less than 1 MB!",
    ],
    nameRules: [(v) => !!v || "Name is required"],
    newClick: false,
    popupSettings: {
      height: "250px",
    },
    defaultItem: defaultItem,
    baseUrl: customerHandler.search(),
    init: { method: "GET", accept: "application/json", headers: [] },
    pendingRequest: undefined,
    requestStarted: false,
    skip: 0,
    tempSkip: null,
    total: 0,
    filter: "",
    textField: "name",
    dataItemKey: "id",
    baseCurrencyCode: "",
    loggedUser: {
      id: cookie.creator,
      name: cookie.email,
    },
    cashPayment: [],
    billPayment: [],
    qrPayment: [],
    bankTransfer: [],
    addressList: [],
    lastNumber: 1,
    disableNumber: false,
    btnDisabled: false,
    disabledMe: false,
    phone: "",
    email: "",
    gender: {name: 'Male'},
    dob: new Date().toISOString(),
  }),
  methods: {
    async loadInstituteInfo() {
      new Promise((resolve) => {
        setTimeout(() => {
          instituteHandler.getOneCompany(instituteId).then((res) => {
            const company = res;
            if (company.hasOwnProperty("baseCurrency")) {
              if (company.baseCurrency.hasOwnProperty("code")) {
                this.baseCurrencyCode = company.baseCurrency.code;
              }
            }
          });
          resolve("resolved");
        }, 200);
      });
    },
    upload() {
      let data = {
        file: this.imgFile,
      };
      customerHandler.upload(data).then((res) => {
        window.console.log(res, "upload");
      });
    },
    close(data) {
      this.customer = new CustomerModel({});
      this.$router.push({
          name: "contacts",
          params: {
            data: data,
          },
        });
      // if (this.$route.params.query !== undefined) {
      //   window.console.log(this.$route.params.query, "id--");
      //   window.history.go(-1);
      // } else {
      //   // window.console.log(data, 'id-cus--')
        
      // }
    },
    requestData(skip, filter) {
      const url = this.baseUrl + `?filter=${filter}`;
      // `search?$filter='${filter}'&$skip=${skip}&$top=${pageSize}&$count=true`;
      this.requestStarted = true;
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then(this.afterFetch);
    },
    onChange(event) {
      const value = event.value;
      if (value && value[textField] === emptyItem[textField]) {
        return;
      }
      this.customer.subOfCustomer = value;
    },
    afterFetch(json) {
      this.customerList = json.data;
    },
    onFilterChange(event) {
      const filter = event.filter.value;
      // this.resetCach();
      this.requestData(0, filter);
      // this.dataItems = loadingData;
      // this.skip = 0;
      this.filter = filter;
    },
    onNewAddressClick() {
      this.newClick = true;
      this.address = {};
    },
    async loadCountry() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          otherHandler.country().then((res) => {
            this.showLoading = false;
            this.countries = res;
          });
        }, 10);
      });
    },
    onSaveCloseAddress() {
      if (this.addresses) {
        if (this.newClick) {
          this.address.id = uuid.v1();
          this.addresses.push({
            id: this.address.id,
            name: this.address.name,
            type: this.address.type,
            country: this.address.country,
            line1: this.address.line1,
            line2: this.address.line2,
          });
        } else {
          const addr = this.address;
          const index = this.addresses.findIndex((item) => {
            return addr.id === item.id;
          });
          if (index < 0) {
            this.addresses.push(addr);
          } else {
            this.addresses.splice(index, 1, addr);
          }
        }
      }
      this.addressList = this.addresses;
      window.console.log(this.addressList);
      this.dialogM2 = false;
    },
    goEditAddress(e) {
      this.newClick = false;
      e.preventDefault();
      let grid = kendo.jQuery("#gridAddress").data("kendoGrid");
      let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
      window.console.log(dataItem);
      this.address = {
        id: dataItem.id,
        name: dataItem.name,
        line1: dataItem.line1,
        line2: dataItem.line2,
        type: dataItem.type,
        country: {
          abbreviation: dataItem.country.abbreviation || "",
          country: dataItem.country.country || "",
        },
      };
      this.mCountry = dataItem.country;
      this.dialogM2 = true;
    },
    rowNumberTmpl(dataItem) {
      let ds = this.$refs.gridAddressDS.kendoWidget(),
        index = ds.indexOf(dataItem);
      return index + 1;
    },
    onFileChange(e) {
      // const file = e.target.files[0];
      let input = e.target;
      // Ensure that you have a file before attempting to read it
      if (input.files && input.files[0]) {
        if (input.files[0].size > 1024 * 1024) {
          e.preventDefault();
          alert("File too big (> 1MB)");
          this.src = "";
          this.imgFile = "";
          this.$refs.fileupload.value = null;
        } else {
          // create a new FileReader to read this image and convert to base64 format
          let reader = new FileReader();
          // Define a callback function to run, when FileReader finishes its job
          reader.onloadend = (e) => {
            // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
            // Read image as base64 and set to imageData
            this.imgFile = e.target.result;
          };
          // Start the reader job - read file as a data url (base64 format)
          reader.readAsBinaryString(input.files[0]);
          // this.url = input.files[0]
          this.src = URL.createObjectURL(e.target.files[0]);
        }
      }
    },
    async loadCustomerGroup() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = true;
          customerGroupHandler
            .get()
            .then((res) => {
              this.showLoading = false;
              this.customerGroups = res;
            })
            .catch((err) => {
              this.showLoading = false;
              window.console.log("error", err);
            });
        }, 10);
      });
    },
    async customerGroupChanged() {
      this.mDiscountItem = this.mCustomerGroup.hasOwnProperty("discountItem")
        ? this.mCustomerGroup.discountItem
        : {};
      this.mPriceLevel = this.mCustomerGroup.hasOwnProperty("priceLevel")
        ? this.mCustomerGroup.priceLevel
        : {};
    },
    async loadPriceLevel() {
      this.showLoading = true;
      priceLevelHandler
        .get()
        .then((res) => {
          this.priceLevel = res;
          this.showLoading = false;
          if (this.priceLevel.length > 0) {
            this.mPriceLevel = this.priceLevel[0];
            this.customer.priceLevel = this.priceLevel[0];
          }
        })
        .catch((err) => {
          this.showLoading = false;
          window.console.log("PL err", err);
        });
    },
    async initData() {
      // window.console.log("me", this.customer);
      if (this.$route.params.id) {
        await this.loadSingleCustomer();
      } else {
        this.clear();
      }
      // else {
      //   this.clear()
      //   // this.loadPaymentTerm();
      // }
    },
    clear() {
      // const cusType = this.customer.customerType || {};
      this.customer = new CustomerModel();
      // this.customer.customerType = cusType;
      this.addressList = [];
      this.disabledMe = false;
      this.hiddenButton = false;
      this.disableNumber = false;
      this.phone = ""
      this.email = ""
      this.gender = {name: 'Male'}
      this.dob =new Date().toISOString() 
    },
    customerTypeChange() {
      // window.console.log('cus type changed', this.customer.type)
      if (this.customer.hasOwnProperty("customerType")) {
        const cusType = this.customer.customerType || {};
        this.mPaymentMethod = cusType.paymentOption;
        this.mPaymentTerm = cusType.paymentTerm || {};
        // this.customer.paymentTerm = cusType.paymentTerm || {}
        this.mVat = cusType.saleTax;
        // this.mDefaultTaxOnShipping = this.customer.type.defaultTaxOnShipping
        this.mAccReceivable = cusType.receivableAcc;
        this.mAccDeposit = cusType.saleDepositAcc;
        this.mUnearnRevenue = cusType.unearnRevenueAcc || {};
        this.customer.priceLevel = this.customer.customerType.priceLevel;

        this.customer.billPayment = cusType.billPayment;
        this.customer.qrPayment = cusType.qrPayment;
        this.customer.cashPayment = cusType.cashPayment;
        this.customer.bankTransfer = cusType.bankTransfer;
        // Load Prefix
        // this.customer.number = this.pad(1, 8);
        this.onCheckChanged();
      }
      // let match = this.customerItem.filter(m => m.customerType.name === this.customerType.name).map(item => {
      //     return {
      //         id: item.uuid,
      //     }
      // })
      // window.console.log(match.length)
      // let num = match.length + 1
      // this.customer.number = this.pad(num, 6)
      // // window.console.log(this.pad(num, 6))
      // window.console.log(this.customer.number)
      // Vue.nextTick()
    },
    pad(value, length) {
      return ("0".repeat(length) + value).slice(-length);
    },
    removeRow() {},
    numberChange() {
      let oldnum = this.customer.number;
      let match1 = this.customerItem
        .filter((m) => m.number === this.customer.number)
        .map((item) => {
          return {
            id: item.uuid,
          };
        });
      if (match1.length > 0) {
        this.customer.number = oldnum;
        // this.customerTypeChange()
        this.$snotify.error("Number is exist!");
      }
    },
    errorMessage() {},
    addRow() {},
    cancel() {
      this.$swal({
        title: i18n.t("msg_title_warning"),
        text: i18n.t("msg_discard"),
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: i18n.t("cancel"),
        confirmButtonColor: "#4d4848",
        cancelButtonColor: "#ED1A3A",
        confirmButtonText: i18n.t("discard"),
      }).then((result) => {
        if (result.value) {
          this.clear();
          this.$router.go(-1);
        }
      });
    },
    async onSaveClose(save) {
      window.console.log(1, save);
      // const editorNote = this.$refs.invoiceNoteEditor.kendoWidget();
      // this.customer.noteOnInvoice = editorNote.value();
      if (!this.$refs.form.validate()) {
        // window.console.log("in validation");
        // if(Object.keys(this.mPaymentTerm).length === 0){
        //   this.model_tabs = 2;
        window.scrollTo({ behavior: "smooth", top: 20 });
        this.$snotify.error(i18n.t("please_fill_all_required_in_each_tabs"));
        // }
        return;
      }
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          // window.console.log(this.mShipVAT)
          let data = {
            id: this.customer.id || "",
            name: this.customer.name,
            alternativeName: this.customer.alternativeName,
            customerType: this.customer.customerType,
            type: "Individual",
            crn: this.customer.crn,
            abbr: this.customer.customerType.abbr,
            number: this.customer.number,
            subOfCustomer: this.customer.subOfCustomer,
            registeredDate: this.registeredDate,
            billingType: this.customer.billingType,
            consumerId: this.customer.consumerId,
            isDonor: false,
            taxId: "",
            status: this.customer.status,
            deleted: this.customer.deleted,
            contactAddress: {
              gender: this.gender,
              phoneNumber: this.phone,
              email: this.email,
              dob: this.dob,
              address: this.addressList,
              latitude: this.latitude,
              longitude: this.longitude,
            },
            paymentBilling: {
              customerGroup: this.mCustomerGroup,
              paymentTerm: this.mPaymentTerm,
              paymentOption: this.mPaymentMethod,
              assignTo: {},
              // warehouse: this.mWareHouse,
              // creditLimit: this.creditLimit,
              discountItem: this.mDiscountItem,
              priceLevel: this.customer.priceLevel,
            },
            paymentTerm: new PaymentTermModel(this.mPaymentTerm),
            accountTax: {
              receivableAcc: this.mAccReceivable,
              saleDepositAcc: this.mAccDeposit,
              unearnRevenueAcc: this.mUnearnRevenue,
              saleTax: this.mVat,
            },
            noteOnInvoice: this.customer.noteOnInvoice,
            file: this.imgFile,
            image: this.customer.image,
            attachFile: {},
            loggedUser: this.loggedUser,
            priceLevel: this.customer.priceLevel,
            cashPayment: new PaymentOptionModel(this.customer.cashPayment),
            qrPayment: new PaymentOptionModel(this.customer.qrPayment),
            bankTransfer: new PaymentOptionModel(this.customer.bankTransfer),
            billPayment: new PaymentOptionModel(this.customer.billPayment),

            autoNumber: this.customer.autoNumber || true,
          };
          // window.console.log(data, "data");
          this.showLoading = true;
          this.btnDisabled = true;
          customerHandler
            .create(data)
            .then((response) => {
              if (response.data.statusCode === 201) {
                // this.loadCustomerType()
                this.clear();
                this.showLoading = false;
                this.btnDisabled = false;
                if (save == "close") {
                  // this.loadAccount();
                  // this.loadTax();
                  this.close(response.data.data);
                } else {
                  // this.loadAccount();
                  // this.loadTax();
                  this.clear();
                }
                // this.$refs.form.reset()
                this.$snotify.success("Successfully");
              } else {
                this.showLoading = false;
                this.btnDisabled = false;
              }
            })
            .catch(() => {
              this.showLoading = false;
              this.btnDisabled = false;
              this.$snotify.error("Something went wrong");
            });
        }, 10);
      });
    },
    async loadCustomerType() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          customerTypeHandler.get().then((res) => {
            this.customerTypes = res.filter((m) => {
              return m.nature.name.includes("Individual");
            });
            // window.console.log("customerTypes", this.customerTypes);
            // window.console.log(res)
            // if (this.customerTypes.length > 0) {
            //   this.customer["customerType"] = this.customerTypes[0];
            //   this.customerTypeChange();
            // }
          });
        }, 10);
      });
    },
    async loadAccount() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          accountHandler.getAll().then((res) => {
            this.showLoading = false;
            //Receivable Account
            this.accReceivable = res.data
              .filter((m) => m.account_type.number === 7)
              .map((item) => {
                return {
                  id: item.uuid,
                  uuid: item.uuid,
                  name: item.name,
                  local_name: item.local_name,
                  number: item.number,
                  is_taxable: item.is_taxable,
                  banhjiAccCode: item.banhjiAccCode,
                  group_code: item.group_code,
                  parent_account: item.parent_account,
                  type_code: item.type_code,
                  account_type: item.account_type,
                };
              });
            if (this.accReceivable.length > 0) {
              this.mAccReceivable = this.accReceivable[0];
            }
            //Deposit Account
            this.accDeposit = res.data
              .filter(
                (m) =>
                  m.account_type.number === 20 || m.account_type.number === 28
              )
              .map((item) => {
                return {
                  id: item.uuid,
                  uuid: item.uuid,
                  name: item.name,
                  local_name: item.local_name,
                  number: item.number,
                  is_taxable: item.is_taxable,
                  banhjiAccCode: item.banhjiAccCode,
                  group_code: item.group_code,
                  parent_account: item.parent_account,
                  type_code: item.type_code,
                  account_type: item.account_type,
                };
              });
            if (this.accDeposit.length > 0) {
              this.mAccDeposit = this.accDeposit[0];
            }
            //Unearn revenue Account
            this.unearnRevenue = res.data
              .filter((m) => m.account_type.number === 20)
              .map((item) => {
                return {
                  id: item.uuid,
                  uuid: item.uuid,
                  name: item.name,
                  local_name: item.local_name,
                  number: item.number,
                  is_taxable: item.is_taxable,
                  banhjiAccCode: item.banhjiAccCode,
                  group_code: item.group_code,
                  parent_account: item.parent_account,
                  type_code: item.type_code,
                  account_type: item.account_type,
                };
              });
            if (this.unearnRevenue.length > 0) {
              this.mUnearnRevenue = this.unearnRevenue[0];
            }
          });
        }, 10);
      });
    },
    async loadTax() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          settingHandler.get().then((res) => {
            this.showLoading = false;
            this.tax = res;
            let vAT = this.tax.filter(
              (m) => m.taxType.typeId === 1 && m.transactionType === "Sale"
            ); // valuable tax
            this.vat = vAT; // valuable tax
            if (this.vat.length > 0) {
              this.mVat = this.vat[0];
            }

            // let vATs = this.tax.filter(m => m.abbr === 'ST') // Shipping Tax
            // this.defaultTaxOnShipping = vATs[0]['subOf'] // valuable tax
            // if (this.defaultTaxOnShipping.length > 0) {
            //     this.mDefaultTaxOnShipping = this.defaultTaxOnShipping[0]
            // }
          });
        }, 10);
      });
    },
    async loadPaymentOption() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          const strFilter = "?optionType=Customer";
          this.showLoading = true;
          paymentOptionHandler
            .list(strFilter)
            .then((res) => {
              this.showLoading = false;
              const data = res.data.data || [];
              this.cashPayment = data.filter(
                (m) => m.type === PAYMENT_OPINION_TYPE.CASH_PAYMENT
              );
              this.billPayment = data.filter(
                (m) => m.type === PAYMENT_OPINION_TYPE.BILL_PAYMENT
              );
              this.qrPayment = data.filter(
                (m) => m.type === PAYMENT_OPINION_TYPE.QR_PAYMENT
              );
              this.bankTransfer = data.filter(
                (m) => m.type === PAYMENT_OPINION_TYPE.BANK_TRANSFER
              );
            })
            .catch(() => {
              this.showLoading = false;
            });
        }, 10);
      });
    },
    async loadPaymentTerm() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          settingsHandler.getPaymentTerm(strFilterTerm).then((res) => {
            this.showLoading = false;
            this.paymentTerms = [];
            if (res.data.statusCode === 200) {
              this.paymentTerms = res.data.data;
              if (this.paymentTerms.length > 0) {
                this.mPaymentTerm = this.paymentTerms.filter(
                  (k) => k.name === "COD"
                )[0];
              }
            }
          });
        }, 10);
      });
    },
    async loadSingleCustomer() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          window.console.log("this.$route.params.id", this.$route.params.id);
          if (
            this.$route.params.id
          ) {
            this.showLoading = true;
            this.btnDisabled = false;
            this.disableNumber = true
            customerHandler.get(this.$route.params.id).then((res) => {
              if (res.data.statusCode === 200) {
                this.showLoading = false;
                const resultData = res.data.data;
                if (resultData.length > 0) {
                  let checkOldNote = resultData[0].noteOnInvoice;
                  if (typeof checkOldNote == "object") {
                    resultData[0].noteOnInvoice = "";
                  }
                  const response = resultData[0];
                  const cusType = response.customerType || {};
                  this.customer = response;
                  this.registeredDate = this.customer.registeredDate || "";
                  window.console.log("this.customer", this.customer);
                  const paymentBilling = this.customer.paymentBilling || {};
                  const accountTax = this.customer.accountTax || {};
                  this.mCustomerGroup = paymentBilling.customerGroup || {};
                  this.mPaymentTerm = paymentBilling.paymentTerm || {};
                  this.mPaymentMethod = paymentBilling.paymentOption || {};
                  this.mWareHouse = paymentBilling.warehouse || {};
                  this.mDiscountItem = paymentBilling.discountItem || {};
                  // this.mPriceLevel = this.customer.paymentBilling.hasOwnProperty("priceLevel") ? this.customer.paymentBilling.priceLevel : {};
                  this.mAccReceivable = accountTax.receivableAcc || {};
                  this.mUnearnRevenue = accountTax.unearnRevenueAcc || {};
                  this.mAccDeposit = accountTax.saleDepositAcc || {};
                  this.mVat = accountTax.saleTax || {};
                  this.mPriceLevel = this.customer.priceLevel || {};
                  const contact_address = this.customer.contactAddress || {};
                  const address = contact_address.address || [];
                  this.phone = contact_address.phoneNumber || "";
                  this.email = contact_address.email || "";
                  this.dob = contact_address.dob || "";
                  this.gender = contact_address.gender || "";

                  if (address.length > 0) {
                    this.addressList = address;
                  }
                  // this.mDefaultTaxOnShipping = this.customer.accountTax.hasOwnProperty('defaultTaxOnShipping') ? this.customer.accountTax.defaultTaxOnShipping : {}
                  const hasImg = this.customer.hasOwnProperty("image");
                  this.src = "";
                  let imgUrl = "";
                  if (hasImg) {
                    if (this.customer.image.hasOwnProperty("default")) {
                      imgUrl = this.customer.image.default.thumb;
                      this.src =
                        "https://s3-ap-southeast-1.amazonaws.com/images.banhji/" +
                        imgUrl;
                    }
                  }
                  // this.hasTxn(this.customer.id);
                  this.disabledMe = true;
                  // this.customer.autoNumber = false;
                  window.console.log("this.customerTypes", this.customerTypes);
                  const customerType = this.customerTypes.filter(
                    (k) => k.id === cusType.id
                  )[0];
                  // this.customer.customerType = customerType;
                  window.console.log("customer.customerType", customerType, 'cusType', cusType);
                }
              } else {
                this.showLoading = false;
              }
            });
          }
        }, 10);
      });
    },
    async loadCustomerBillTo() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          otherHandler.customerBillTo().then((res) => {
            this.customerBillToItem = res;
            if (this.customerBillToItem.length > 0) {
              this.customerBillTo = this.customerBillToItem[0];
            }
          });
        }, 10);
      });
    },
    async loadTaxAndAccountByCustomerType() {},
    async loadWareHouses() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          warehouseHandler.getWarehouseSettingAll().then((res) => {
            this.showLoading = false;
            this.wareHouses = res;
            if (this.wareHouses.length > 0) {
              this.mWareHouse = this.wareHouses[0];
            }
          });
        }, 10);
      });
    },
    async loadDiscountItems() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = true;
          discountItemHandler.list(OPTION_TYPE).then((res) => {
            if (res.data.statusCode === 200) this.showLoading = false;
            this.discountItems = res.data.data;
            if (this.discountItems.length > 0) {
              this.mDiscountItem = this.discountItems[0];
            }
          });
        }, 10);
      });
    },
    async loadSubOfCustomer() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = true;
          customerHandler.list().then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoading = false;
              this.customerList = res.data.data;
            }
          });
        }, 10);
      });
    },
    async loadLastNumber() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          if (this.customer.customerType) {
            const abbr = this.customer.customerType.abbr || "";
            const strFilter = {
              abbr: abbr,
              type: "Individual",
            };
            if (abbr) {
              this.showLoading = true;
              customerHandler.lastNumber(strFilter).then((res) => {
                if (res.data.statusCode === 200) {
                  this.showLoading = false;
                  const number = res.data.data;
                  this.lastNumber = this.pad(number.lastNumber || 1, 7);
                  this.customer.number = this.lastNumber;
                } else {
                  this.showLoading = false;
                }
              });
            }
          }
        }, 10);
      });
    },
    onCheckChanged() {
      if (!this.$route.params.id) {
        if (this.customer.autoNumber) {
          this.disableNumber = true;
          this.loadLastNumber();
        } else {
          this.disableNumber = false;
        }
      }
    },
    async hasTxn(id) {
      if (id) {
        const strFilter = "?id=" + id;
        customerHandler.hasTxn(strFilter).then((res) => {
          if (res.data.statusCode === 200) {
            const response = res.data.data;
            this.disabledMe = !response.delete;
          } else {
            this.disabledMe = false;
          }
        });
      }
    },
    fromWatch() {
      window.console.log("Watch");
      this.loadSingleCustomer();
    },
  },
  watch: {
    // id() {
    //     // this.product = this.selectedProduct
    //     window.console.log(this.id, "watch");
    //     if (this.id !== undefined) {
    //         this.loadSingleCustomer();
    //     }
    // },
    $route: "fromWatch",
    // checkId() {
    //   window.console.log("watch id=====", this.checkId);
    //   if (this.$route.params.id !== undefined) {
    //     this.loadSingleCustomer();
    //     // this.loadPaymentTerm()
    //   }
    // },
  },
  mounted: async function () {
    this.loadCustomerType();
    // this.loadInstituteInfo();
    this.requestData(0, this.filter);
    // this.loadTax();
    this.loadPaymentOption();
    this.loadPaymentTerm();
    // this.loadCustomerBillTo();
    this.initData();
  },
  created: async function () {
    await this.loadAccount();
    // await this.loadWareHouses();
    this.loadPriceLevel();
    this.loadDiscountItems();
    this.loadCustomerGroup();
    this.loadCountry();
    // await this.loadSubOfCustomer()
  },
  computed: {
    checkId() {
      return this.$route.params.id;
    },
    virtual: function () {
      return {
        pageSize: pageSize,
        // @ts-ignore
        skip: this.skip,
        // @ts-ignore
        total: this.total,
      };
    },
    hiddenButton: {
      get: function () {
        return this.$route.query.type == "edit";
      },
      set: function (newValue) {
        window.console.log("newValue--", !newValue);
        return !newValue;
      },
    },
  },
  destroyed() {
    // this.resetCach()
  },
};
</script>

<style scoped>
.k-dropdown {
  width: 100%;
  margin-top: 4px;
}

.function_content .label {
  margin-bottom: 10px;
  display: inline-block;
}

.v-tab.v-tab {
  color: inherit;
  font-size: 16px !important;
}

@media (min-width: 1264px) {
  .container {
    /* max-width: 1250px; */
    max-width: 1080px;
  }
}

@media (max-width: 576px) {
  .pt-6.col-sm-5.col-12 {
    padding-top: 0 !important;
  }

  .code_text {
    width: 100%;
  }

  .phone_no_pt {
    padding-top: 0 !important;
  }

  .select_template,
  .save_option {
    margin-bottom: 10px;
  }
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
  border-bottom: 1px solid #000 !important;
}

.exchange-table.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:last-child
  td {
  border-bottom: 1px solid #000 !important;
}

.v-slide-group__content {
  background-color: #f8f8f9 !important;
}

.v-tab--active {
  background-color: #ffffff !important;
  border-left: none;
}

.function_content {
  padding: 0;
  border-bottom: 1px solid #ddd;
  background-color: #f8f8f9;
}
</style>
