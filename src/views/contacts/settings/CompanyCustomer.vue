<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col sm="12" cols="12">
          <v-card outlined dense class="pa-4 no_border rounded-sm" color="white">
            <v-row>
              <v-col
                class="bigSide py-0"
                sm="12"
                cols="12"
                style="transition: 0.3s ease-in"
                :class="{ hide_big_bar_class: isHideBar }"
              >
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-card outlined dense class="no_border">
                    <h2>
                      <span v-if="appType != 'npo' && !checkFunding">{{
                        $t("company_customer")
                      }}</span>
                      <span v-else>{{ $t("donor") }}</span>
                    </h2>
                    <v-icon @click="cancel()" class="float-right close_icon"
                      >close
                    </v-icon>
                  </v-card>
                  <v-card
                    outlined
                    dense
                    class="px-3 no_border mb-3"
                    color="grayBg"
                    height="255px;"
                  >
                    <v-row class="pb-3">
                      <v-col sm="4" cols="12" class="py-0">
                        <label class="label mb-0">{{ $t("type") }}</label>
                        <v-select
                          class="mt-1"
                          :items="customerTypes"
                          placeholder="Type"
                          item-text="name"
                          :rules="[(v) => (v ? !!v['id'] || $t('is_required') : '')]"
                          v-on:change="customerTypeChange"
                          v-model="customer.customerType"
                          :disabled="disabledMe"
                          return-object
                          outlined
                        />
                      </v-col>
                      <v-col sm="4" cols="12" class="py-0">
                        <label class="label mb-0">{{ $t("name") }}</label>
                        <v-text-field
                          class="mt-1"
                          v-model="customer.name"
                          outlined
                          :rules="[(v) => !!v || 'Name is required']"
                          required
                        />
                      </v-col>
                      <v-col sm="4" cols="12" class="py-0">
                        <label class="label mb-0">{{ $t("number") }}</label>
                        <v-row class="pt-1 pb-0">
                          <v-col sm="2" cols="2" class="py-0 pr-0">
                            <div class="code_text text-uppercase">
                              {{
                                customer.customerType ? customer.customerType.abbr : ""
                              }}
                            </div>
                          </v-col>
                          <v-col sm="10" cols="10" class="py-0 d-flex pl-0">
                            <v-text-field
                              class="disable_alert custom-border"
                              :disabled="disableNumber"
                              v-model="customer.number"
                              outlined
                              :rules="[(v) => !!v || $t('is_required')]"
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
                      </v-col>
                      <v-col sm="4" cols="12" class="py-0">
                        <label class="label mb-o" style="">{{
                          $t("registered_date")
                        }}</label>
                        <app-datepicker
                          :initialDate="customer.registeredDate"
                          @emitDate="registeredDate = $event"
                        />
                      </v-col>
                      <v-col sm="4" cols="12" class="py-0">
                        <label class="label mb-0">{{ $t("alternative_name") }}</label>
                        <v-text-field
                          class="mt-1"
                          tage="Alternative Name"
                          v-model="customer.alternativeName"
                          outlined
                        />
                      </v-col>
                      <v-col sm="4" cols="12" class="py-0">
                        <label class="label mb-0 text-uppercase">{{
                          $t("vat_no")
                        }}</label>
                        <v-text-field
                          class="mt-1"
                          tage="Tax Id"
                          v-model.trim="customer.taxId"
                          :rules="[(v) => !!v || 'VAT No. id is required']"
                          outlined
                        />
                      </v-col>
                      <v-col sm="4" cols="12" class="py-0">
                        <label class="label mb-0">{{ $t("sub_of_customer") }}</label>
                        <v-col
                          sm="12"
                          cols="12"
                          style="padding-bottom: 10px !important"
                          class="kendo_dropdown_custom px-0 pt-0"
                        >
                          <dropdownlist
                            :data-items="customerList"
                            @change="onChange"
                            :value="customer.subOf"
                            :data-item-key="dataItemKey"
                            :text-field="textField"
                            :default-item="defaultItem"
                            :filterable="true"
                            :required="false"
                            :disabled="false"
                            :loading="loading"
                            :valid="validCustomer"
                            @filterchange="onFilterChange"
                          >
                          </dropdownlist>
                        </v-col>
                      </v-col>
                    </v-row>
                  </v-card>
                  <!-- Tabs -->
                  <v-tabs slider-color="#ffffff" class="individual_tabs mb-3">
                    <v-tab>
                      <span class="text-uppercase">{{ $t("contact_address") }}</span>
                    </v-tab>
                    <!-- <v-tab v-if="appType != 'npo'">
                      <span class="text-uppercase">{{ $t("payment_billing") }}</span>
                    </v-tab> -->
                    <!-- <v-tab v-if="appType != 'npo'">
                      <span class="text-uppercase">{{ $t("account") }}</span>
                    </v-tab> -->
                    <!-- <v-tab>
                      <span class="text-uppercase">{{ $t("contact_person") }}</span>
                    </v-tab> -->
                    <!-- <v-tab>
                      <span class="text-uppercase">{{ $t("note") }}</span>
                    </v-tab> -->
                    <v-tab>
                      <span class="hidden-sm-and-up"><v-icon left>mdi-pen</v-icon></span>
                      <span class="hidden-sm-and-down text-uppercase"
                        >{{ $t("image") }}
                      </span>
                    </v-tab>

                    <v-tab-item eager>
                      <p class="color_grey">
                        {{ $t("add_inv_contact_customer") }}
                      </p>
                      <v-row>
                        <v-col sm="4" cols="12" class="py-0">
                          <label class="label mb-0">{{ $t("phone_number") }}</label>
                          <v-text-field
                            class="mt-1"
                            tage="Phone Number"
                            v-model.trim="phone"
                            outlined
                          />
                        </v-col>
                        <v-col sm="4" cols="12" class="py-0">
                          <label class="mb-0">{{ $t("website") }}</label>
                          <v-text-field
                            class="mt-1"
                            v-model="website"
                            tage="Company Website"
                            outlined
                          />
                        </v-col>
                        <v-col sm="4" cols="12" class="py-0">
                          <label class="mb-0">{{ $t("email") }}</label>
                          <v-text-field
                            class="mt-1"
                            tage="Email"
                            v-model.trim="email"
                            outlined
                          />
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col sm="8" cols="12" class="py-0">
                          <label class="mb-0">{{ $t("description") }}</label>
                          <v-textarea
                            no-resize
                            height="40px"
                            class="mt-1 textareas"
                            v-model="description"
                            rows="3"
                            outlined
                          />
                        </v-col>
                        <v-col v-if="appType != 'npo'" sm="4" cols="12" class="py-0">
                          <label class="mb-0">{{ $t("banhji_institute_id") }}</label>
                          <v-text-field
                            class="disable_alert mt-1"
                            tage="Banhji id"
                            v-model.trim="customer.consumerId"
                            outlined
                          />
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col sm="12" cols="12" class="py-0">
                          <!-- <v-dialog persistent v-model="dialogM2" max-width="500px">
                            <template v-slot:activator="{ on }">
                              <v-btn
                                color="primary"
                                rounded
                                class="float-right white--text mb-4"
                                v-on="on"
                                @click="onNewAddressClick"
                                >{{ $t("add_new_address") }}
                              </v-btn>
                            </template>
                            <v-card>
                              <div class="modal_header">
                                <v-card-title>{{ $t("address") }}</v-card-title>
                                <v-icon @click="dialogM2 = false">close </v-icon>
                              </div>
                              <v-divider />
                              <v-card-text class="modal_text_content">
                                <v-row class="mt-2">
                                  <v-col sm="6" cols="12" class="py-0">
                                    <label class="mb-0">{{ $t("address_name") }}</label>
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
                                    <label class="mb-0">{{ $t("address_line_2") }}</label>
                                    <v-text-field
                                      class="mt-1"
                                      v-model="address.line2"
                                      tage="Address Line 2"
                                      outlined
                                    />
                                  </v-col>
                                  <v-col sm="6" cols="12" class="py-0">
                                    <label class="mb-0">{{ $t("country") }}</label>
                                    <v-select
                                      class="mt-1"
                                      :items="countries"
                                      tage="Address Country"
                                      v-model="address.country"
                                      item-value="abbreviation"
                                      :item-text="
                                        (item) => `${item.abbreviation} - ${item.country}`
                                      "
                                      return-object
                                      outlined
                                    />
                                    <label class="mb-0">{{ $t("address_line_1") }}</label>
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
                                class="modal_footer d-flex justify-space-between"
                              >
                                <v-btn
                                  outlined
                                  color="primary"
                                  class="black--text"
                                  @click="dialogM2 = false"
                                  >{{ $t("cancel") }}
                                </v-btn>
                                <v-btn
                                  @click="onSaveCloseAddress"
                                  class="white--text"
                                  color="primary"
                                  >{{ $t("save_close") }}
                                </v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-dialog> -->
                          <v-simple-table class="exchange-table" style="clear: right">
                            <kendo-datasource
                              ref="gridAddressDSCusCompany"
                              :data="addressList"
                            />
                            <kendo-grid
                              id="gridAddressCusCompany"
                              class="grid-function"
                              :data-source-ref="'gridAddressDSCusCompany'"
                              :editable="true"
                              :resizable="true"
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
                                :attributes="{ class: 'tb_name_td' }"
                                :title="$t('name')"
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
                                :editor="addressTypeDropdownEditor"
                                :headerAttributes="{
                                  style: 'background-color: #EDF1F5',
                                }"
                              />
                              <kendo-grid-column
                                :field="'country'"
                                :title="$t('country')"
                                :width="90"
                                :template="'<span>#=country.country || ``#</span>'"
                                :editor="countryDropdownEditor"
                                :headerAttributes="{
                                  style: 'background-color: #EDF1F5',
                                }"
                              />
                              <kendo-grid-column
                                :field="'line1'"
                                :title="$t('line1')"
                                :width="90"
                                :headerAttributes="{
                                  style: 'background-color: #EDF1F5',
                                }"
                              />
                              <kendo-grid-column
                                :field="'line2'"
                                :title="$t('line2')"
                                :width="90"
                                :headerAttributes="{
                                  style: 'background-color: #EDF1F5',
                                }"
                              />
                              <kendo-grid-column
                                :field="''"
                                :title="$t(' ')"
                                :width="50"
                                :command="[
                                  {
                                    iconClass: 'k-icon k-i-trash',
                                    text: ' ',
                                    click: removeRow,
                                  },
                                ]"
                                :headerAttributes="{
                                  style: 'text-align: left; background-color: #EDF1F5',
                                }"
                              />
                            </kendo-grid>
                          </v-simple-table>
                          <v-col sm="12" cols="12" class="pt-2">
                            <v-btn
                              color="primary"
                              class="float-left btn_plus mr-2"
                              @click="addRow"
                            >
                              <v-icon size="" class="ma-1">mdi-plus</v-icon>
                            </v-btn>
                          </v-col>
                          <!--                          <v-container class="px-0" fluid>-->
                          <!--                            <v-checkbox-->
                          <!--                                v-model="customer.isDonor"-->
                          <!--                                :label="$t('is_donor')"></v-checkbox>-->
                          <!--                          </v-container>-->
                          <!-- <v-row>
                                                      <v-col sm="8">
                                                        <p class="color_grey">
                                                          {{ $t("all_longitude") }}
                                                        </p>
                                                      </v-col>
                                                      <v-col sm="4">
                                                        <v-btn color="primary" class="">{{
                                                          $t("view_map")
                                                        }}</v-btn>
                                                      </v-col>
                                                    </v-row>
                                                    <v-row>
                                                      <v-col sm="6">
                                                        <label class="mb-0">{{ $t("longitude") }}</label>
                                                        <v-text-field
                                                          class="mt-1"
                                                          tage="Longitude"
                                                          v-model="longitude"
                                                          placeholder="Longitude"
                                                          outlined
                                                        />
                                                      </v-col>
                                                      <v-col sm="6">
                                                        <label class="mb-0">{{ $t("latitude") }}</label>
                                                        <v-text-field
                                                          class="mt-1"
                                                          placeholder="Latitude"
                                                          tage="Latitude"
                                                          v-model="latitude"
                                                          outlined
                                                        />
                                                      </v-col>
                                                    </v-row> -->
                        </v-col>
                      </v-row>
                    </v-tab-item>
                    <!-- item 2 -->
                    <!-- <v-tab-item v-if="appType != 'npo'" eager>
                      <p class="color_grey">{{ $t("payment_billing_desc") }}</p>
                      <v-row>
                        <v-col class="py-0" sm="4" cols="12">
                          <label class="label mb-0"
                            >{{ $t("customer_group") }}
                            <v-icon size="18" color="red" @click="loadCustomerGroup"
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
                            placeholder="Group A"
                            outlined
                          />

                          <label class="mb-0"
                            >{{ $t("default_price_level") }}
                            <v-icon size="18" color="red" @click="loadPriceLevel"
                              >refresh</v-icon
                            ></label
                          >
                          <v-select
                            class="mt-1"
                            v-model="customer.priceLevel"
                            :items="priceLevel"
                            item-value="id"
                            item-text="name"
                            return-object
                            :rules="[(v) => (v ? !!v['id'] || $t('is_required') : '')]"
                            placeholder="Price Level"
                            tage="Default Price Level"
                            outlined
                          />
                          <label class="mb-0"
                            >{{ $t("qr_payment") }}
                            <v-icon size="18" color="red" @click="loadPaymentOption"
                              >refresh</v-icon
                            ></label
                          >
                          <v-select
                            class="mt-1"
                            :items="qrPayment"
                            :item-text="(item) => `${item.code} - ${item.name}`"
                            v-model="customer.qrPayment"
                            return-object
                            clearable
                            outlined
                          />
                        </v-col>
                        <v-col class="py-0" sm="4" cols="12">
                          <label class="mb-0">{{ $t("payment_term") }}</label>
                          <v-select
                            class="mt-1"
                            v-model="mPaymentTerm"
                            :items="paymentTerms"
                            item-value="id"
                            item-text="name"
                            :disabled="false"
                            :rules="[(v) => !!v || $t('is_required')]"
                            return-object
                            placeholder="Payment_term"
                            tage="Payment_term"
                            outlined
                          />
                          <label class="mb-0"
                            >{{ $t("cash_payment") }}
                            <v-icon size="18" color="red" @click="loadPaymentOption"
                              >refresh</v-icon
                            ></label
                          >
                          <v-select
                            class="mt-1"
                            :items="cashPayment"
                            tage="Cash Payment"
                            :rules="[(v) => (v ? !!v['id'] || $t('is_required') : '')]"
                            :item-text="(item) => `${item.code} - ${item.name}`"
                            v-model="customer.cashPayment"
                            return-object
                            outlined
                          />
                          <label class="mb-0"
                            >{{ $t("bank_transfer") }}
                            <v-icon size="18" color="red" @click="loadPaymentOption"
                              >refresh</v-icon
                            ></label
                          >
                          <v-select
                            class="mt-1"
                            :items="bankTransfer"
                            :rules="[(v) => !!v || 'Bank transfer is required']"
                            :item-text="(item) => `${item.code} - ${item.name}`"
                            v-model="customer.bankTransfer"
                            return-object
                            outlined
                          />
                        </v-col>
                        <v-col class="py-0" sm="4" cols="12">
                          <label class="mb-0"
                            >{{ $t("default_discount") }}
                            <v-icon size="18" color="red" @click="loadDiscountItems"
                              >refresh</v-icon
                            >
                          </label>
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
                            <v-icon size="18" color="red" @click="loadPaymentOption"
                              >refresh</v-icon
                            ></label
                          >
                          <v-select
                            class="mt-1"
                            :items="billPayment"
                            tage="Bill Payment"
                            :item-text="(item) => `${item.code} - ${item.name}`"
                            v-model="customer.billPayment"
                            return-object
                            clearable
                            outlined
                          />
                        </v-col>
                      </v-row>
                    </v-tab-item> -->
                    <!-- item3 -->
                    <!-- <v-tab-item eager v-if="appType != 'npo'">
                      <v-row>
                        <v-col cols="12" class="py-0">
                          <p class="color_grey">
                            {{ $t("acc_tax_individual_desc") }}
                          </p>
                        </v-col>
                        <v-col class="py-0" sm="4" cols="12">
                          <label class="label mb-0">{{ $t("account_receivable") }}</label>
                          <v-autocomplete
                            class="mt-1"
                            :loading="accReceivable.length === 0"
                            v-model="mAccReceivable"
                            :items="accReceivable"
                            item-value="id"
                            :item-text="
                              (item) =>
                                `${item.number} - ${
                                  this.$store.state.accounting.accountLanguage ===
                                  'English'
                                    ? item.name
                                    : item.local_name
                                }`
                            "
                            return-object
                            :rules="[(v) => (v ? !!v['id'] || $t('is_required') : '')]"
                            placeholder="Account Receivable"
                            tage="Account Receivable"
                            outlined
                          >
                          </v-autocomplete>
                        </v-col>
                        <v-col class="py-0" sm="4" cols="12">
                          <label class="label mb-0">{{ $t("sale_deposit") }}</label>
                          <v-autocomplete
                            class="mt-1"
                            v-model="mAccDeposit"
                            :loading="accDeposit.length === 0"
                            :items="accDeposit"
                            :disabled="disabledMe"
                            item-value="id"
                            :item-text="
                              (item) =>
                                `${item.number} - ${
                                  this.$store.state.accounting.accountLanguage ===
                                  'English'
                                    ? item.name
                                    : item.local_name
                                }`
                            "
                            return-object
                            tage="Sale Deposit"
                            :rules="[(v) => (v ? !!v['id'] || $t('is_required') : '')]"
                            placeholder="Sale Deposit Account"
                            outlined
                          >
                          </v-autocomplete>
                        </v-col>
                        <v-col class="py-0" sm="4" cols="12">
                          <label class="label mb-0">{{
                            $t("unearn_revenue_account")
                          }}</label>
                          <v-autocomplete
                            class="mt-1"
                            v-model="mUnearnRevenueAcc"
                            :loading="uneanRevenueAcc.length === 0"
                            :items="uneanRevenueAcc"
                            item-value="id"
                            :item-text="
                              (item) =>
                                `${item.number} - ${
                                  this.$store.state.accounting.accountLanguage ===
                                  'English'
                                    ? item.name
                                    : item.local_name
                                }`
                            "
                            return-object
                            :rules="[(v) => (v ? !!v['id'] || $t('is_required') : '')]"
                            tage="Unearned Revenue"
                            placeholder="Unearned Revenue"
                            outlined=""
                          >
                          </v-autocomplete>
                        </v-col>
                        <v-col class="py-0" sm="4" cols="12">
                          <label class="label mb-0">{{
                            $t("default_tax")
                          }}</label>
                          <v-select
                            class="mt-1"
                            v-model="mVat"
                            :items="vat"
                            item-value="id"
                            item-text="defaultTax"
                            return-object
                            tage="Default Tax"
                            placeholder="VAT (10%)"
                            outlined
                          >
                          </v-select>
                        </v-col>
                      </v-row>
                    </v-tab-item> -->
                    <!-- item4  cotact person-->
                    <!-- <v-tab-item eager>
                      <v-row>
                        <v-col class="py-0" cols="5">
                          <p class="color_grey">
                            {{ $t("cusotmer_func_contact_person") }}
                          </p>
                        </v-col>
                        <v-col class="py-0" cols="7">
                          <v-dialog persistent v-model="dialogM3" max-width="400px">
                            <template v-slot:activator="{ on }">
                              <v-btn
                                color="primary"
                                rounded
                                class="white--text float-left mb-4"
                                @click="onNewContactPersonClick"
                                v-on="on"
                                >{{ $t("add_new_contact_person") }}
                              </v-btn>
                            </template>
                            <v-card>
                              <div class="modal_header">
                                <v-card-title>{{ $t("address") }}</v-card-title>
                                <v-icon class="btn_close" @click="dialogM3 = false"
                                  >close
                                </v-icon>
                              </div>
                              <v-card-text class="modal_text_content">
                                <v-row>
                                  <v-col cols="12">
                                    <label class="mb-0">{{ $t("contact_name") }}</label>
                                    <v-text-field
                                      class="mt-1"
                                      v-model="contactPerson.name"
                                      tage="Contact Name"
                                      outlined
                                    />
                                    <label class="label mb-0">{{ $t("position") }}</label>
                                    <v-text-field
                                      class="mt-1"
                                      v-model="contactPerson.position"
                                      tage="Position"
                                      outlined
                                    />
                                    <label class="mb-0">{{ $t("phone") }}</label>
                                    <v-text-field
                                      class="mt-1"
                                      v-model="contactPerson.phone"
                                      tage="Phone"
                                      outlined
                                    />
                                    <label class="mb-0">{{ $t("email") }}</label>
                                    <v-text-field
                                      class="mt-1"
                                      v-model="contactPerson.email"
                                      tage="Email"
                                      outlined
                                    />
                                  </v-col>
                                </v-row>
                              </v-card-text>
                              <v-divider />
                              <v-card-actions
                                class="modal_footer d-flex justify-space-between"
                              >
                                <v-btn
                                  class="black--text"
                                  outlined
                                  color="primary"
                                  @click="dialogM3 = false"
                                  >{{ $t("cancel") }}
                                </v-btn>
                                <v-btn
                                  class="white--text"
                                  color="primary"
                                  @click="onSaveCloseContactPerson"
                                >
                                  {{ $t("save_close") }}
                                </v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col sm="12" cols="12">
                          <v-simple-table class="exchange-table" style="clear: right">
                            <kendo-datasource
                              ref="gridContactPersonDS"
                              :data="contactPersonList"
                            />
                            <kendo-grid
                              id="gridContactPerson"
                              class="grid-function"
                              :data-source-ref="'gridContactPersonDS'"
                              :editable="false"
                              :scrollable-virtual="true"
                            >
                              <kendo-grid-column
                                :field="'no'"
                                :title="$t('no')"
                                :template="rowNumberTmplPerson"
                                :width="40"
                                :column-menu="false"
                                :headerAttributes="{
                                  style: 'background-color: #EDF1F5;',
                                  class: 'text-center',
                                }"
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
                                :field="'position'"
                                :title="$t('position')"
                                :width="90"
                                :template="'<span>#=position#</span>'"
                                :headerAttributes="{
                                  style: 'background-color: #EDF1F5',
                                }"
                              />
                              <kendo-grid-column
                                :field="'phone'"
                                :title="$t('phone')"
                                :width="90"
                                :template="'<span>#=phone#</span>'"
                                :headerAttributes="{
                                  style: 'background-color: #EDF1F5',
                                }"
                              />
                              <kendo-grid-column
                                :field="'email'"
                                :title="$t('email')"
                                :width="90"
                                :template="'<span>#=email#</span>'"
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
                                    click: goEditContactPerson,
                                  },
                                ]"
                                :headerAttributes="{
                                  style: 'text-align: left; background-color: #EDF1F5',
                                }"
                              />
                            </kendo-grid>
                          </v-simple-table>
                        </v-col>
                      </v-row>
                    </v-tab-item> -->
                    <!-- Tab payment billing -->
                    <v-tab-item eager>
                      <p class="color_grey">{{ $t("note_individual_desc") }}</p>
                      <editor
                        ref="invoceNoteEditor"
                        :resizable-content="true"
                        :resizable-toolbar="true"
                        :value="customer.noteOnInvoice"
                        style="height: 120px"
                        class="mt-1"
                        rows="10"
                        cols="30"
                      />
                    </v-tab-item>
                    <v-tab-item eager>
                      <v-col sm="12" class="pa-0">
                        <h2 class="mb-2 font_20 width_100">
                          {{ $t("default_image") }}
                        </h2>
                        <v-row>
                          <v-col sm="5" cols="12" class="py-0">
                            <p class="color_grey font_14 mb-0">
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

                  <v-divider />
                  <v-card outlined dense class="no_border function_footer">
                    <v-alert type="warning" v-model="alert" dismissible>
                      <span v-html="errorMessage" />
                    </v-alert>
                    <v-btn
                      color="primary"
                      outlined
                      class="float-left black--text text-capitalize"
                      @click="cancel"
                      >{{ $t("cancel") }}
                    </v-btn>
                    <v-btn
                      color="primary"
                      class="ml-2 float-right white--text text-capitalize"
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
                  </v-card>
                </v-form>
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
import CompanyCustomerModel from "@/scripts/model/CompanyCustomer";
import { dataStore } from "@/observable/store";

const customerModel = new CustomerModel({});
const accountHandler = require("@/scripts/handler/accounting/account");
const customerHandler = require("@/scripts/customerHandler");
const customerTypeHandler = require("@/scripts/customerTypeHandler");
const settingHandler = require("@/scripts/settingHandler");
const paymentOptionHandler = require("@/scripts/paymentOptionHandler");
const paymentTermHandler = require("@/scripts/paymentTermHandler");
const otherHandler = require("@/scripts/otherHandler");
const warehouseHandler = require("@/scripts/warehouseHandler");
const priceLevelHandler = require("@/scripts/priceLevelHandler");
const discountItemHandler = require("@/scripts/discountItemHandler");
const customerGroupHandler = require("@/scripts/customerGroupHandler");
import { DropDownList } from "@progress/kendo-vue-dropdowns";
import kendo from "@progress/kendo-ui";

const instituteHandler = require("@/scripts/instituteHandler");
import { Editor } from "@progress/kendo-editor-vue-wrapper";
import PaymentOptionModel from "@/scripts/model/PaymentOption";
import { PAYMENT_OPINION_TYPE } from "@/scripts/default_setup/Setting";
import PaymentTermModel from "@/scripts/model/PaymentTerm";

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
const cookieJS = require("@/cookie.js");
const cookie = cookieJS.getCookie();
const instituteId = cookie.instituteId;

const OPTION_TYPE = "?type=Sale";
export default {
  name: "CompanyCustomer",
  props: ["id"],
  components: {
    LoadingMe: () => import(`@/components/Loading`),
    "app-datepicker": DatePickerComponent,
    dropdownlist: DropDownList,
    editor: Editor,
  },
  data: () => ({
    isEdit: false,
    isHideBar: false,
    loading: false,
    validCustomer: false,
    showLoading: false,
    loadingAlert: false,
    loadingColorAlert: "",
    loadingTextAlert: "",
    dialogM2: false,
    dialogM3: false,
    alert: false,
    addressType: ["Billing", "Delivery", "Contact"],
    deliveryMethod: [],
    valid: true,
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
    contactPerson: {
      id: "",
      name: "",
      position: "",
      phone: "",
      email: "",
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
    uneanRevenueAcc: [],
    mUnearnRevenueAcc: {},
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
    newClick: false,
    newContactPersonClick: false,
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
    errorMessage: "",
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
    contactPersonList: [],
    lastNumber: 1,
    disableNumber: false,
    btnDisabled: false,
    disabledMe: false,
    phone: "",
    email: "",
    gender: "male",
    dob: new Date().toISOString(),
    contactPersons: [],
    description: "",
    website: "",
    latitude: "",
    longitude: "",
  }),
  methods: {
    countryDropdownEditor(container, options) {
      kendo
        .jQuery('<input name="' + options.field + '"/>')
        .appendTo(container)
        .kendoDropDownList({
          autoBind: true,
          autoWidth: true,
          height: 400,
          filter: "startswith",
          dataTextField: "country",
          dataValueField: "abbreviation",
          template: "<span>#=country || ``#</span>",
          optionLabel: "--Select--",
          dataSource: new kendo.data.DataSource({
            data: this.countries,
          }),
        });
    },
    addressTypeDropdownEditor(container, options) {
      kendo
        .jQuery('<input name="' + options.field + '"/>')
        .appendTo(container)
        .kendoDropDownList({
          autoBind: true,
          autoWidth: true,
          height: 400,
          filter: "startswith",
          optionLabel: "--Select--",
          dataSource: new kendo.data.DataSource({
            data: this.addressType,
          }),
        });
    },
    addRow() {
      let ds = this.$refs.gridAddressDSCusCompany.kendoWidget(),
        total = ds.total();
      this.address.id = uuid.v1();
      if (total < 10) {
        ds.insert(total, this.address);
      }
    },
    isDonorDefault() {
      if (this.appType == "npo" || this.checkFunding) {
        this.customer.isDonor = true;
      } else {
        this.customer.isDonor = false;
      }
      window.console.log(this.customer.isDonor, "check is donor");
    },
    async loadInstituteInfo() {
      new Promise((resolve) => {
        setTimeout(() => {
          instituteHandler.getOneCompany(instituteId).then((res) => {
            const company = res;
            if (company.hasOwnProperty("baseCurrency")) {
              window.console.log(company.baseCurrency, "company");
              if (company.baseCurrency.hasOwnProperty("code")) {
                this.baseCurrencyCode = company.baseCurrency.code;
              }
            }
          });
          resolve("resolved");
        }, 10);
      });
    },
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
    close(data) {
      if (this.$route.params.query !== undefined) {
        window.console.log(this.$route.params.query, "id--");
        window.history.go(-1);
      } else {
        // window.console.log(data, 'id-cus--')
        if (this.appType == "npo" || this.checkFunding) {
          window.history.go(-1);
        } else {
          this.$router.push({
            name: "contacts",
            params: {
              data: data,
            },
          });
        }
      }
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
      this.customer.subOf = value;
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
    onNewContactPersonClick() {
      this.newContactPersonClick = true;
      this.contactPerson = {};
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
      this.dialogM2 = false;
    },
    onSaveCloseContactPerson() {
      if (this.contactPersons) {
        if (this.newContactPersonClick) {
          this.contactPerson.id = uuid.v1();
          this.contactPersons.push({
            id: this.contactPerson.id,
            name: this.contactPerson.name ? this.contactPerson.name : "",
            position: this.contactPerson.position ? this.contactPerson.position : "",
            phone: this.contactPerson.phone ? this.contactPerson.phone : "",
            email: this.contactPerson.email ? this.contactPerson.email : "",
          });
        } else {
          const contactP = this.contactPerson;
          const index = this.contactPersons.findIndex((item) => {
            return contactP.id === item.id;
          });
          if (index < 0) {
            this.contactPersons.push(contactP);
          } else {
            this.c.splice(index, 1, contactP);
          }
        }
      }
      this.contactPersonList = this.contactPersons;
      this.dialogM3 = false;
    },
    goEditAddress(e) {
      this.newClick = false;
      e.preventDefault();
      let grid = kendo.jQuery("#gridAddressCusCompany").data("kendoGrid");
      let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
      this.address = dataItem;
      this.mCountry = dataItem.country;
      this.dialogM2 = true;
    },
    goEditContactPerson(e) {
      this.newClick = false;
      e.preventDefault();
      let grid = kendo.jQuery("#gridContactPerson").data("kendoGrid");
      let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
      this.contactPerson = dataItem;
      this.dialogM3 = true;
    },
    rowNumberTmpl(dataItem) {
      let ds = this.$refs.gridAddressDSCusCompany.kendoWidget(),
        index = ds.indexOf(dataItem);
      return index + 1;
    },
    rowNumberTmplPerson(dataItem) {
      let ds = this.$refs.gridContactPersonDS.kendoWidget(),
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
            .catch(() => {
              this.showLoading = false;
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
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
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
            .catch(() => {
              this.showLoading = false;
            });
        }, 10);
      });
    },
    async initData() {
      // window.console.log('me', this.customer)
      if (this.$route.params.id) {
        await this.loadSingleCustomer();
      } else {
        this.clear();
      }
    },
    clear() {
      // const cusType = this.customer.customerType || {};
      this.customer = new CompanyCustomerModel();
      // this.customer.customerType = cusType;
      this.addressList = [];
      this.contactPersonList = [];
      this.disabledMe = false;
      this.disableNumber = false;
      this.phone = "";
      this.email = "";
      this.website = "";
      this.gender = { name: "Male" };
      this.description = "";
      this.dob = new Date().toISOString();
    },
    customerTypeChange() {
      // window.console.log('cus type changed', this.customer.type)
      if (this.customer.hasOwnProperty("type")) {
        const cusType = this.customer.customerType || {};
        // this.mPaymentMethod = this.customer.type.defaultPaymentMethod;
        this.mPaymentTerm = cusType.paymentTerm || {};
        this.mVat = cusType.saleTax;
        // this.mDefaultTaxOnShipping = this.customer.type.defaultTaxOnShipping
        this.mAccReceivable = cusType.receivableAcc;
        this.mAccDeposit = cusType.saleDepositAcc;
        this.mUnearnRevenueAcc = cusType.unearnRevenueAcc || {};
        this.customer.priceLevel = this.customer.customerType.priceLevel;

        this.customer.billPayment = cusType.billPayment;
        this.customer.qrPayment = cusType.qrPayment;
        this.customer.cashPayment = cusType.cashPayment;
        this.customer.bankTransfer = cusType.bankTransfer;
        // Load Prefix
        // this.customer.number = this.pad(1, 6);
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
    removeRow(e) {
      e.preventDefault();
      const grid = kendo.jQuery("#gridAddressCusCompany").data("kendoGrid"),
        dataSource = grid.dataSource,
        dataItem = grid.dataItem($(e.currentTarget).closest("tr"));

      // if (dataSource.total() > 1) {
      dataSource.remove(dataItem);
      // }
    },
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
    async onSaveClose(save) {
      const editorNote = this.$refs.invoceNoteEditor.kendoWidget();
      this.customer.noteOnInvoice = editorNote.value();
      if (!this.$refs.form.validate()) {
        // this.$refs.form.validate()
        window.scrollTo({ behavior: "smooth", top: 20 });
        this.$snotify.error(i18n.t("please_fill_all_required_in_each_tabs"));
        return;
      }
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          const ds = this.$refs.gridAddressDSCusCompany.kendoWidget();
          const rows = ds.data().map((k) => {
            const country = k.country || {};
            return {
              id: k.id || "",
              name: k.name || "",
              type: k.type || "",
              country: {
                country: country.country || "",
                abbreviation: country.abbreviation || "",
              },
              line1: k.line1 || "",
              line2: k.line2 || "",
            };
          });
          // window.console.log(this.mShipVAT)
          // const dsContactPerson = this.$refs.gridContactPersonDS.kendoWidget();
          // const rowPerson = dsContactPerson.data().map((k) => {
          //   return {
          //     id: k.id || "",
          //     name: k.name || "",
          //     position: k.position || "",
          //     phone: k.phone || "",
          //     email: k.email || "",
          //   };
          // });

          const data = new CompanyCustomerModel({
            id: this.customer.id ? this.customer.id : "",
            name: this.customer.name,
            alternativeName: this.customer.alternativeName,
            customerType: this.customer.customerType,
            type: "Company",
            crn: this.customer.crn,
            isDonor: this.customer.isDonor,
            status: this.customer.status,
            deleted: this.customer.deleted,
            number: this.customer.number,
            instituteId: this.customer.fromInstitute,
            subOf: this.customer.subOf,
            registeredDate: this.registeredDate,
            billingType: this.customer.billingType,
            consumerId: this.customer.consumerId,
            taxId: this.customer.taxId,
            contactAddress: {
              gender: this.gender,
              phoneNumber: this.phone,
              email: this.email,
              dob: this.dob,
              address: rows,
              latitude: this.latitude,
              longitude: this.longitude,
              website: this.website,
              description: this.description,
            },
            paymentBilling: {
              customerGroup: this.mCustomerGroup,
              // paymentTerm: this.mPaymentTerm,
              // paymentMethod: this.mPaymentMethod,
              assignTo: {},
              // warehouse: this.mWareHouse,
              // creditLimit: this.creditLimit,
              discountItem: this.mDiscountItem,
              priceLevel: this.customer.priceLevel,
            },
            accountTax: {
              receivableAcc: this.mAccReceivable,
              saleDepositAcc: this.mAccDeposit,
              unearnRevenueAcc: this.mUnearnRevenueAcc,
              saleTax: this.mVat,
            },
            paymentTerm: new PaymentTermModel(this.mPaymentTerm),
            noteOnInvoice: this.customer.noteOnInvoice,
            // contactPerson: rowPerson,
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
          });
          // window.console.log(data, 'data')
          this.showLoading = true;
          this.btnDisabled = true;
          customerHandler
            .create(data)
            .then((response) => {
              if (response.data.statusCode === 201) {
                // this.loadCustomerType()
                // this.clear()
                this.showLoading = false;
                this.btnDisabled = false;
                if (save == "close") {
                  // this.loadAccount();
                  // this.loadTax();
                  this.clear();
                  this.close(response.data.data);
                } else {
                  // this.loadAccount();
                  // this.loadTax();
                  this.clear();
                }
                this.$snotify.success("Successfully");
              } else {
                this.showLoading = false;
                this.btnDisabled = false;
              }
            })
            .catch((e) => {
              this.showLoading = false;
              this.btnDisabled = false;
              this.$snotify.error("Something went wrong");
              this.errors.push(e);
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
              return !m.nature.name.includes("Individual");
            });
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
          accountHandler.getAllPages().then((res) => {
            this.showLoading = false;
            //Receivable Account
            this.accReceivable = res
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
            if (this.$route.params.id !== "" || this.$route.params.id == undefined) {
              if (this.accReceivable.length > 0) {
                this.mAccReceivable = this.accReceivable[0];
              }
            }
            //Deposit Account
            this.accDeposit = res
              .filter((m) => m.account_type.number === 20 || m.account_type.number === 28)
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
            if (this.$route.params.id !== "" || this.$route.params.id == undefined) {
              if (this.accDeposit.length > 0) {
                this.mAccDeposit = this.accDeposit[0];
              }
            }
            //Unearn revenue Account
            this.uneanRevenueAcc = res
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
            if (this.$route.params.id !== "" || this.$route.params.id == undefined) {
              if (this.uneanRevenueAcc.length > 0) {
                this.mUnearnRevenueAcc = this.uneanRevenueAcc[0];
              }
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
          this.showLoading = true;
          const strFilter = "?optionType=Customer";
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
          paymentTermHandler.getAll().then((res) => {
            this.showLoading = false;
            this.paymentTerms = res.data.data;
            if (this.paymentTerms.length > 0) {
              this.mPaymentTerm = this.paymentTerms.filter((k) => k.name === "COD")[0];
            }
          });
        }, 10);
      });
    },
    async loadSingleCustomer() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          if (this.$route.params.id) {
            this.showLoading = true;
            this.btnDisabled = false;
            this.disableNumber = true;
            customerHandler.get(this.$route.params.id).then((res) => {
              if (res.data.statusCode === 200) {
                this.showLoading = false;
                const result = res.data.data;
                if (result.length > 0) {
                  let checkOldNote = result[0].noteOnInvoice;
                  if (typeof checkOldNote == "object") {
                    res.data.data[0].noteOnInvoice = "";
                  }
                  const response = res.data.data[0];
                  // const cusType = response.customerType || {};
                  this.customer = response;
                  this.registeredDate = this.customer.registeredDate || "";
                  const accountTax = this.customer.accountTax || {};
                  const paymentBilling = this.customer.paymentBilling || {};
                  this.mCustomerGroup = paymentBilling.customerGroup || {};
                  // this.mPaymentTerm = this.customer.paymentBilling.hasOwnProperty("paymentTerm") ? this.customer.paymentBilling.paymentTerm : {};
                  // this.mPaymentMethod = this.customer.paymentBilling.hasOwnProperty("paymentOption") ? this.customer.paymentBilling.paymentOption : {};
                  // this.mWareHouse = this.customer.paymentBilling.hasOwnProperty("warehouse") ? this.customer.paymentBilling.warehouse : {};
                  this.mDiscountItem = paymentBilling.discountItem || {};
                  this.mAccReceivable = accountTax.receivableAcc || {};
                  this.mUnearnRevenueAcc = accountTax.unearnRevenueAcc || {};
                  this.mAccDeposit = accountTax.saleDepositAcc || {};
                  this.mVat = accountTax.saleTax || {};
                  this.mPriceLevel = this.customer.priceLevel || {};
                  const contact_address = this.customer.contactAddress || {};
                  this.addressList = [];
                  this.addressList = contact_address.address || Object.assign([]);
                  this.phone = contact_address.phoneNumber || "";
                  this.email = contact_address.email || "";
                  this.dob = contact_address.dob || "";
                  this.description = contact_address.description || "";
                  this.website = contact_address.website || "";
                  this.gender = contact_address.gender || "";

                  if (contact_address.address) {
                    $("#gridAddressCusCompany")
                      .data("kendoGrid")
                      .dataSource.data(this.addressList);
                  }
                  let contact_person = this.customer.contactPerson;
                  if (contact_person.length > 0) {
                    this.contactPersonList = this.customer.contactPerson;
                    $("#gridContactPerson")
                      .data("kendoGrid")
                      .dataSource.data(this.contactPersonList);
                  }
                  // this.mDefaultTaxOnShipping = this.customer.accountTax.hasOwnProperty('defaultTaxOnShipping') ? this.customer.accountTax.defaultTaxOnShipping : {}
                  const hasImg = this.customer.hasOwnProperty("image");
                  this.src = "";
                  let imgUrl = "";
                  if (hasImg) {
                    if (this.customer.image.hasOwnProperty("default")) {
                      imgUrl = this.customer.image.default.thumb;
                      this.src =
                        "https://s3-ap-southeast-1.amazonaws.com/images.banhji/" + imgUrl;
                    }
                  }
                  this.disabledMe = true;
                  this.hasTxn(this.customer.id);
                  // const customerType = this.customerTypes.filter(
                  //   (k) => k.id === cusType.id
                  // )[0];
                  // window.console.log("customerTypes", customerType);
                  // this.customer.customerType = customerType;
                }
              }
            });
          }
        }, 10);
      });
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
          discountItemHandler
            .list(OPTION_TYPE)
            .then((res) => {
              if (res.data.statusCode === 200) {
                this.showLoading = false;
                this.discountItems = res.data.data;
                if (this.discountItems.length > 0) {
                  this.mDiscountItem = this.discountItems[0];
                }
              }
            })
            .catch(() => {
              this.showLoading = false;
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
              type: "Company",
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
  },
  watch: {
    // id() {
    //     // this.product = this.selectedProduct
    //     window.console.log(this.id, "watch");
    //     if (this.id !== undefined) {
    //         this.loadSingleCustomer();
    //     }
    // },
    // checkId() {
    //   if (this.$route.params.id !== undefined) {
    //     this.loadSingleCustomer();
    //     // this.loadPaymentTerm()
    //   }
    // },
    $route: "loadSingleCustomer",
    checkFunding() {
      this.isDonorDefault();
    },
  },
  mounted: async function () {
    this.requestData(0, this.filter);
    // await this.loadTax();
    await this.loadPaymentOption();
    await this.loadPaymentTerm();
    await this.loadCustomerType();
    await this.loadCustomerBillTo();
    await this.initData();
    this.isDonorDefault();
  },
  created: async function () {
    // await this.loadInstituteInfo();
    await this.loadAccount();
    // await this.loadWareHouses();
    await this.loadPriceLevel();
    await this.loadDiscountItems();
    await this.loadCustomerGroup();
    await this.loadCountry();
    // await this.loadSubOfCustomer()
  },
  computed: {
    checkId() {
      return this.$route.params.id;
    },
    checkFunding() {
      return this.$route.query.funding;
    },
    appType() {
      return dataStore.productType;
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

.v-application--is-ltr .v-text-field .v-input__append-inner {
  margin-top: 0 !important;
}

.v-input__slot {
  background-color: #fff !important;
}

.function_content .label {
  margin-bottom: 10px;
  display: inline-block;
}

.border_radius10 {
  border-radius: 10px !important;
  background-color: #f2f2f2;
}

.pa-3.v-card h4 {
  font-size: 18px;
  color: #333;
}

.pa-3.v-card p {
  font-size: 12px;
  color: #b5b5b5;
}

.attachment_file {
  background-color: #efeded;
  border-radius: 0 !important;
}

.attachment_table.v-data-table table {
  border: thin solid rgba(0, 0, 0, 0.12);
}

.attachment_table table tr th {
  border-left: thin solid rgba(0, 0, 0, 0.12);
  height: 35px;
  border-right: thin solid rgba(0, 0, 0, 0.12);
}

.block_debit,
.block_credit {
  border-bottom: 1px solid #fff;
}

.block_debit p.number,
.block_credit p.number {
  font-size: 25px;
  color: #7f7f7f;
}

.block_debit h5,
.block_credit h5,
.block_difference h5 {
  text-transform: uppercase;
  color: #7f7f7f;
  font-size: 15px;
  font-weight: normal;
}

.block_difference h5 {
  font-size: 18px;
}

.block_difference h5 span {
  font-size: 15px;
}

.custom_grid table th:last-child {
  text-align: right !important;
}

.color_green {
  color: #03b154;
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

.hide_small_bar_class {
  max-width: 0%;
  transition: 0.5s ease-in;
  flex: 0 0 0%;
}

.hide_big_bar_class {
  max-width: 100%;
  transition: 0.5s ease-in;
  flex: 0 0 100%;
}

.info_add {
  background-color: #ffffff;
}

.small_sidebar {
  height: 95%;
  margin-top: 15.4%;
  position: relative;
  padding: 10px;
  background-color: #edf1f5;
}

.iconArrow {
  margin-right: -17px;
  right: 35.8%;
  top: 7%;
  position: absolute;
}

.iconArrowHide {
  top: 7%;
  position: absolute;
  right: 8.6%;
}

.color_grey {
  color: #808080;
}

.card_green {
  min-height: 70px;
  background-color: #00b050 !important;
  color: #ffffff;
}

.lb_bold {
  font-size: 12px;
}

.detial_smallside_p {
  position: absolute;
  bottom: 10px;
}

.card_background {
  background-color: #edf1f5;
  min-height: 120px;
}

.deposite_input {
  width: 100px;
}

.btn_save_draft {
  color: #ffffff;
  background-color: #00b0f0 !important;
  text-transform: capitalize;
}

.save_option {
  background-color: #203864 !important;
}

.btn_add_small {
  height: 27px !important;
  min-width: 25px !important;
  font-size: 10px;
  padding: 0 22px !important;
  background-color: #00b050 !important;
  color: #ffffff;
  border-radius: 0 !important;
}

.list_site_inv {
  background-color: #92d050;
  color: #ffffff;
  font-size: 12px;
}

.list_site_exp {
  background-color: #c5e0b4;
  color: #000000;
  font-size: 12px;
  line-height: 16px;
  min-height: 40px;
}

.checkbox_inv {
  padding: 2px;
  margin-top: 3px;
  margin-right: 2px;
}

.exp_select {
  font-size: 12px !important;
}

.v-tab--active {
  background-color: #f8f8f9 !important;
  border-left: none;
}

.blue_block {
  background-color: #e2f0d9;
  min-height: 100px;
}

.v-window__container {
  padding: 14px !important;
}

.btn_round_new {
  background-color: #00b050 !important;
  color: #ffffff;
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

.v-tab.v-tab {
  color: inherit;
  font-size: 16px !important;
}
</style>
