<template>
  <v-row>
    <v-col class="pt-0 pr-4 pb-0" sm="4" cols="12">
      <div class="d-flex mb-2">
        <v-card class="pa-3 white--text" elevator="0" style="width: 80%; box-shadow: none;" color="primary">
          <div class="d-flex justify-space-between">
            <h3 class="center_left_title text-uppercase">
              {{ $t("total_customers") }}
            </h3>
            <h1>{{ totalCustomer }}</h1>
          </div>
        </v-card>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs"
              @click="rotate = !rotate"
              style="height: 47px !important"
              class="text-bold ml-2 px-2"
              v-on="on"
            >
              {{ $t("new") }}
              <v-icon size="" class="my-1" :class="{ rotate_180: rotate }"
                >expand_more</v-icon
              >
            </v-btn>
          </template>

          <v-list>
            <v-list-item to="individual_customer">
              <v-list-item-title>{{ $t("customer") }}</v-list-item-title>
            </v-list-item>
            <v-list-item to="company_customer">
              <v-list-item-title>{{ $t("company") }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <v-card outlined dense class="pa-3 pb-0 no_border mb-md-4 mb-xs-0" color="grayBg">
        <div class="d-flex">
          <v-text-field
            v-model.trim="search"
            @change="onSearch(search)"
            outlined
            @clear="onSearch(search)"
            :placeholder="$t('search')"
            append-icon="search"
            clearable
          />
          <v-btn icon @click="loadData">
            <v-icon>refresh</v-icon>
          </v-btn>
        </div>
        <v-autocomplete
          :items="customerTypes"
          @change="onCustomerTypeChanged('')"
          item-value="id"
          :loading="customerTypes.length === 0"
          item-text="name"
          v-model="mCustomerType"
          return-object
          :placeholder="$t('type')"
          clearable
          outlined
        >
        </v-autocomplete>
        <v-autocomplete
          v-if="appType != 'npo'"
          :items="customerGroups"
          @change="onCustomerTypeChanged('')"
          item-value="id"
          item-text="name"
          return-object
          v-model="mCustomerGroup"
          :placeholder="$t('customer_group')"
          clearable
          outlined
        >
        </v-autocomplete>
        <!-- <label class="label text-bold"
          >{{ $t("total") }}: {{ toalPerPage }} of {{ totalCustomer }}</label
        > -->
      </v-card>
      <v-card outlined dense class="pa-3 no_border hidden-sm-and-down" color="grayBg">
        <div style="overflow: auto" class="page-customer-center"></div>
        <LoadingMe
          :isLoading="showLoading"
          :fullPage="false"
          type="loading"
          :myLoading="true"
        />
        <kendo-datasource
          ref="customerDS"
          :data="customers"
          :schema="schemaDefinition"
          :sort="sortDefinition"
        />

        <kendo-grid
          id="gridCustomer"
          class="grid-center"
          :change="onChanged"
          :data-source-ref="'customerDS'"
          :selectable="true"
          :persistSelection="true"
          :noRecords="true"
          :scrollable="true"
          :height="314"
          :scrollable-virtual="true"
          :pageable-numeric="false"
          :pageable-previous-next="false"
          :pageable-messages-display="'Showing {2} data items'"
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
      </v-card>
    </v-col>
    <v-col class="pt-0 pb-0" sm="8" cols="12">
      <!--            <v-row>-->
      <!--                <v-col sm="6" cols="12" class="pt-0">-->
      <!--                    <v-card outlined dense color="primary" class="pa-3 no_border" height="88px">-->
      <!--                        <router-link-->
      <!--                            :to="{path: routerTo, query: { type: 'edit'} }">-->
      <!--                            <v-btn class="btn_edit float-right" @click="goEdit" :disabled="btnEnabled">-->
      <!--                                {{ $t('edit') }}-->
      <!--                            </v-btn>-->
      <!--                        </router-link>-->

      <!--                        <span>{{ customer.name }}</span><br/>-->
      <!--                        <span>{{ customer.number }}</span><br/>-->
      <!--                        <span>{{ customer.customerType.name }}</span>-->
      <!--                        &lt;!&ndash;                        <v-tooltip top>&ndash;&gt;-->
      <!--                        &lt;!&ndash;                            <template v-slot:activator="{ on, attrs }">&ndash;&gt;-->
      <!--                        &lt;!&ndash;                                <p class="title" color="whiteR"&ndash;&gt;-->
      <!--                        &lt;!&ndash;                                   dark&ndash;&gt;-->
      <!--                        &lt;!&ndash;                                   v-bind="attrs"&ndash;&gt;-->
      <!--                        &lt;!&ndash;                                   v-on="on">&ndash;&gt;-->
      <!--                        &lt;!&ndash;                                    <span>{{ customer.name }}</span>&ndash;&gt;-->
      <!--                        &lt;!&ndash;                                </p>&ndash;&gt;-->
      <!--                        &lt;!&ndash;                            </template>&ndash;&gt;-->
      <!--                        &lt;!&ndash;&lt;!&ndash;                            <span>{{ customer.name }}</span>&ndash;&gt;&ndash;&gt;-->
      <!--                        &lt;!&ndash;                        </v-tooltip>&ndash;&gt;-->

      <!--                    </v-card>-->

      <!--                </v-col>-->
      <!--                <v-col sm="6" cols="12" class="pt-0">-->
      <!--                    <v-row>-->
      <!--                        <v-col sm="6" cols="12" class="py-0 pl-0">-->
      <!--                            <v-card outlined dense class="pa-2 no_border mb-2 white&#45;&#45;text"-->
      <!--                                    color="primary" height="40px">-->
      <!--                                <p class="mb-0">-->
      <!--                                    <span class="float-left text-uppercase">{{ $t('balance') }}</span>-->
      <!--                                    <span class="float-right text-bold" v-text="forwarded"/>-->
      <!--                                </p>-->
      <!--                            </v-card>-->
      <!--                            <v-card outlined dense class="pa-2 no_border white&#45;&#45;text"-->
      <!--                                    color="primary" height="40px">-->
      <!--                                <p class="mb-0">-->
      <!--                                    <span class="float-left text-uppercase">{{ $t('deposit') }}</span>-->
      <!--                                    <span class="float-right text-bold" v-text="forwarded"/>-->
      <!--                                </p>-->
      <!--                            </v-card>-->
      <!--                        </v-col>-->
      <!--                        <v-col sm="6" cols="12" class="py-0 pl-0">-->
      <!--                            <v-card outlined dense class="pa-2 no_border mb-2 white&#45;&#45;text"-->
      <!--                                    color="third" height="40px">-->
      <!--                                <p class="mb-0">-->
      <!--                                    <span class="float-left text-uppercase">{{ $t('open') }}</span>-->
      <!--                                    <span class="float-right text-bold" v-text="forwarded"/>-->
      <!--                                </p>-->
      <!--                            </v-card>-->
      <!--                            <v-card outlined dense class="pa-2 no_border white&#45;&#45;text"-->
      <!--                                    color="third" height="40px">-->
      <!--                                <p class="mb-0">-->
      <!--                                    <span class="float-left text-uppercase">{{ $t('over_due') }}</span>-->
      <!--                                    <span class="float-right text-bold" v-text="forwarded"/>-->
      <!--                                </p>-->
      <!--                            </v-card>-->
      <!--                        </v-col>-->
      <!--                    </v-row>-->
      <!--                </v-col>-->
      <!--            </v-row>-->
      <v-row>
        <v-col sm="12" cols="12" class="tab_txn_att pt-0 pl-0">
          <v-tabs>
            <v-tab>
              <span class="text-upercase">
                {{ $t("info") }}
              </span>
            </v-tab>
            <v-tab v-if="appType === 'mptc'">
              <span class="text-upercase">
                {{ $t("license") }}
              </span>
            </v-tab>
            <v-tab>
              <span class="text-upercase">
                {{ $t("transactions") }}
              </span>
            </v-tab>
            <v-tab  v-if="!this.$store.state.plansNotAccess.includes(4)">
              <span class="hidden-sm-and-up">
                <v-icon left>mdi-pen</v-icon>
              </span>
              <span class="hidden-sm-and-down text-upercase">
                {{ $t("variant") }}
              </span>
            </v-tab>
            <v-tab>
              <span class="hidden-sm-and-up">
                <v-icon left>mdi-pen</v-icon>
              </span>
              <span class="hidden-sm-and-down text-upercase">
                {{ $t("attachments") }}
              </span>
            </v-tab>
            <v-tab-item>
              <v-row>
                <v-col sm="12" cols="12" class="pt-0 px-6">
                  <v-row class="grayBg" style="width: 104%">
                    <v-col sm="12" cols="12" class="">
                      <v-card outlined color="white" class="pa-3">
                        <Info :customer="customer" />
                      </v-card>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-tab-item>
            <!-- Transactions -->
            <v-tab-item>
              <v-row>
                <v-col sm="12" cols="12" class="pt-0 px-6">
                  <v-row class="grayBg" style="width: 104%">
                    <v-col sm="12" cols="12" class="">
                      <v-card outlined color="white" class="pa-3">
                        <v-row class="">
                          <!-- <v-col sm="4" cols="12" class="pt-1 pb-0">
                            <v-autocomplete
                              class=""
                              :items="dateSorters"
                              v-model="mDateSorter"
                              @change="onSorterChanges"
                              clearable
                              outlined
                              placeholder="ALL"
                            >
                            </v-autocomplete>
                          </v-col> -->

                          <v-col sm="5" cols="12" class="py-0">
                            <app-datepicker
                              :initialDate="startDate"
                              @emitDate="startDate = $event"
                            />
                          </v-col>

                          <v-col sm="5" cols="12" class="py-0">
                            <app-datepicker
                              :initialDate="endDate"
                              @emitDate="endDate = $event"
                            />
                          </v-col>

                          <v-col sm="2" cols="1" class="py-0 mt-1">
                            <v-btn color="primary white--text" @click="onSearchTxn">
                              <i
                                class="b-search"
                                style="font-size: 18px; color: #fff !important"
                              />
                            </v-btn>
                          </v-col>
                        </v-row>

                        <v-row class="">
                          <v-col sm="12" cols="12" class="py-0 bycuscenter-pager">
                            <LoadingMe
                              :isLoading="showLoadingTxn"
                              :fullPage="false"
                              type="loading"
                              :myLoading="true"
                            >
                            </LoadingMe>
                            <kendo-datasource
                              ref="transactionDS"
                              :data="transactionList"
                              :server-paging="false"
                            />
                            <kendo-grid
                              id="gridTransactions"
                              class="grid-function"
                              :data-source-ref="'transactionDS'"
                              :editable="false"
                              :groupale="true"
                              :sortable="true"
                              :column-menu="true"
                              :noRecords="true"
                              :scrollable-virtual="true"
                              :resizable="true"
                              :style="{ width: '100%' }"
                            >
                              <kendo-grid-column
                                :field="'transactionDate'"
                                :title="$t('date')"
                                :width="180"
                                :template="transactionDate"
                                :headerAttributes="{
                                  style: 'background-color: #EDF1F5',
                                }"
                              />
                              <kendo-grid-column
                                :field="'type'"
                                :title="$t('type')"
                                :width="200"
                                :template="'<span>#=type#</span>'"
                                :headerAttributes="{
                                  style: 'background-color: #EDF1F5',
                                }"
                              />
                              <kendo-grid-column
                                :field="'referenceNo'"
                                :title="$t('reference_no')"
                                :width="200"
                                :template="referenceTemplate"
                                :headerAttributes="{
                                  style:
                                    'background-color: #EDF1F5, color: green !important',
                                }"
                              />

                              <kendo-grid-column
                                :field="'xAmount'"
                                :title="$t('amount')"
                                :width="200"
                                :attributes="{ style: 'text-align: right' }"
                                :template="'<span>#=kendo.toString(xAmount, decimalFormat)#</span>'"
                                :headerAttributes="{
                                  style: 'background-color: #EDF1F5',
                                }"
                              />
                              <!-- <kendo-grid-column
                                :field="'status'"
                                :title="$t('status')"
                                :width="200"
                                :template="txnStatus"
                                :headerAttributes="{
                                  style:
                                    'text-align: left; background-color: #EDF1F5',
                                }"
                              /> -->
                            </kendo-grid>
                          </v-col>
                        </v-row>
                        <div style="overflow: auto" class="customer-center-txn"></div>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-tab-item>
            <v-tab-item  v-if="!this.$store.state.plansNotAccess.includes(4)">
              <v-row>
                <v-col sm="12" cols="12" class="pt-0 px-6">
                  <v-row class="grayBg" style="width: 104%">
                    <v-col sm="12" cols="12" class="">
                      <v-card outlined color="white" class="pa-3">
                        <CustomerVariant :customer="customer" />
                      </v-card>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-tab-item>
            <!-- Attachment -->
            <v-tab-item>
              <v-row>
                <v-col sm="12" cols="12" class="pt-0 px-6">
                  <v-row class="grayBg" style="width: 104%">
                    <v-col sm="12" cols="12" class="">
                      <v-card outlined color="white" class="pa-3">
                        <v-row class="">
                          <v-col sm="12" cols="12" class="py-0">
                            <p class="mb-2">
                              {{ $t("file_type") }} [PDF, JPG, JPEG, TIFF, PNG, GIF] - 5MB
                            </p>
                            <template>
                              <v-file-input
                                v-model="files"
                                @change="onFileChange"
                                accept="image/jpg, image/jpeg, application/pdf"
                                :placeholder="$t('attachments')"
                                single
                                prepend-icon="mdi-paperclip"
                              >
                                <template v-slot:selection="{ text }">
                                  <v-chip small label color="primary">
                                    {{ text }}
                                  </v-chip>
                                </template>
                              </v-file-input>
                              <v-text-field
                                v-model="fileDesc"
                                outlined
                                :placeholder="$t('description')"
                                clearable
                              />
                            </template>
                            <v-btn
                              color="primary"
                              class="text-capitalize white--text"
                              @click="uploadFile"
                            >
                              <v-icon size="15" class="mr-2">fa-check</v-icon>
                              {{ $t("upload") }}
                            </v-btn>
                            <template>
                              <LoadingMe
                                :isLoading="showLoadingAtch"
                                :fullPage="false"
                                type="loading"
                                :myLoading="true"
                              >
                              </LoadingMe>
                              <kendo-datasource
                                ref="attachmentDS"
                                :data="attachmentList"
                              />
                              <kendo-grid
                                id="gridAttachment"
                                class="grid-function"
                                :data-source-ref="'attachmentDS'"
                                :editable="false"
                                :scrollable-virtual="true"
                              >
                                <kendo-grid-column
                                  :field="''"
                                  :title="$t('open')"
                                  :width="70"
                                  :template="fileUrl"
                                  :attributes="{ style: 'text-align: center' }"
                                  :headerAttributes="{
                                    style: 'background-color: #EDF1F5',
                                  }"
                                />
                                <kendo-grid-column
                                  :field="'fileName'"
                                  :title="$t('file_name')"
                                  :width="250"
                                  :headerAttributes="{
                                    style: 'background-color: #EDF1F5',
                                  }"
                                />
                                <kendo-grid-column
                                  :field="'description'"
                                  :title="$t('description')"
                                  :width="250"
                                  :headerAttributes="{
                                    style: 'background-color: #EDF1F5',
                                  }"
                                />
                                <kendo-grid-column
                                  :field="'fileType'"
                                  :title="$t('file_type')"
                                  :width="150"
                                  :headerAttributes="{
                                    style:
                                      'background-color: #EDF1F5, color: green !important',
                                  }"
                                />
                                <kendo-grid-column
                                  :field="'size'"
                                  :title="$t('size')"
                                  :width="150"
                                  :template="byteToMB"
                                  :headerAttributes="{
                                    style:
                                      'background-color: #EDF1F5, color: green !important',
                                  }"
                                />
                                <kendo-grid-column
                                  :field="'createdAt'"
                                  :title="$t('date')"
                                  :width="120"
                                  :template="'<span>#= kendo.toString(new Date(createdAt), dateFormat)#</span>'"
                                  :headerAttributes="{
                                    style:
                                      'background-color: #EDF1F5, color: green !important',
                                  }"
                                />
                              </kendo-grid>
                            </template>
                          </v-col>
                        </v-row>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-tab-item>
          </v-tabs>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { dataStore } from "@/observable/store";
import DatePickerComponent from "@/components/custom_templates/DatePickerComponent";
import CustomerModel from "@/scripts/model/Customer";
import kendo from "@progress/kendo-ui";
import LinkTemplate from "@/components/kendo_templates/LinkTemplate";

const customerModel = new CustomerModel({});
const $ = kendo.jQuery;
const customerTypeHandler = require("@/scripts/customerTypeHandler");
const customerGroupHandler = require("@/scripts/customerGroupHandler");
const customerHandler = require("@/scripts/customerHandler");
const billingHandler = require("@/scripts/invoice/handler/billingHandler");
export default {
  name: "CustomerCenter",
  props: ["id"],
  components: {
    LoadingMe: () => import(`@/components/Loading`),
    "app-datepicker": DatePickerComponent,
    Info: () => import("./Info"),
    // Licenses: () => import("./Licenses"),
    CustomerVariant: () => import("./CustomerVariant")
  },
  data: () => ({
    rotate: true,
    showLoading: false,
    showLoadingTxn: false,
    showLoadingAtch: false,
    info: {},
    customers: [],
    txnCustomerCenter: [],
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
    startDate: new Date().toISOString().substring(0, 10),
    endDate: new Date().toISOString().substring(0, 10),
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

    transactionList: [],
    txnCustomerList: [],
    pagingTxn: {},
    toalTxnListPerPage: 0,
    totalTxnList: 0,
  }),
  methods: {
    transactionDate(dataItem) {
      const txnDate = dataItem.transactionDate;
      const dateFormat = dataItem.dateFormat;
      if (txnDate) {
        return kendo.toString(new Date(txnDate), dateFormat + ` hh:mm tt`);
      }
      return "";
    },
    byteToMB(dataItem) {
      const FileSize = dataItem.size || 0; // in MiB
      const marker = 1024; // Change to 1000 if required
      const decimal = 3; // Change as required
      const kiloBytes = marker; // One Kilobyte is 1024 bytes
      const megaBytes = marker * marker; // One MB is 1024 KB
      const gigaBytes = marker * marker * marker; // One GB is 1024 MB
      // const teraBytes = marker * marker * marker * marker; // One TB is 1024 GB

      // return bytes if less than a KB
      if (FileSize < kiloBytes) {
        return FileSize + " Bytes";
      }
      // return KB if less than a MB
      else if (FileSize < megaBytes) {
        return (FileSize / kiloBytes).toFixed(decimal) + " KB";
      }
      // return MB if less than a GB
      else if (FileSize < gigaBytes) {
        return (FileSize / megaBytes).toFixed(decimal) + " MB";
      }
      // return GB if less than a TB
      else {
        return (FileSize / gigaBytes).toFixed(decimal) + " GB";
      }

      /* var FileSize = file.files[0].size / 1024 / 1024; // in MiB
                  if (FileSize > 2) {
                      alert('File size exceeds 2 MiB');
                     // $(file).val(''); //for clearing with Jquery
                  } else {
                              alert('File size' + FileSize);
                  } */
    },
    goEdit() {},
    onFileChange(e) {
      window.console.log("2", e);
      if (e) {
        this.fileDesc = e.name;
        this.fileName = e.name;
        this.fileSize = e.size;
        this.fileType = e.type;
        let input = this.files;
        // Ensure that you have a file before attempting to read it
        if (input) {
          let reader = new FileReader();
          // Define a callback function to run, when FileReader finishes its job
          reader.onloadend = (e) => {
            // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
            // Read image as base64 and set to imageData
            this.imgFile = e.target.result;
          };
          // Start the reader job - read file as a data url (base64 format)
          reader.readAsBinaryString(input);
          this.src = URL.createObjectURL(input);
        }
      }
    },
    async uploadFile() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          if (this.imgFile) {
            const id = this.customer.id || "";
            if (id) {
              const name = this.customer.name || "";
              let data = {
                file: this.imgFile,
                info: {
                  name: this.fileName,
                  description: this.fileDesc,
                  size: this.fileSize,
                  type: this.fileType,
                },
                type: "Contact",
                id: id,
                name: name,
              };
              this.showLoading = true;
              billingHandler.attachment(data).then((res) => {
                if (res.data.statusCode === 201) {
                  this.showLoading = false;
                  this.imgFile = null;
                  this.src = "";
                  this.fileDesc = "";
                  this.fileName = "";
                  this.fileSize = 0;
                  this.fileType = "";
                  this.$snotify.success("Success");
                  this.loadAttachment();
                  // this.txnList = JSON.parse(JSON.stringify(res.data.data))
                  // window.console.log('transactions', this.txnList)
                }
              });
            } else {
              this.showLoading = false;
              this.$snotify.error("Please select customer");
            }
          } else {
            this.showLoading = false;
            this.$snotify.error("Please browse to upload image");
          }
        }, 10);
      });
    },
    fileUrl(dataItem) {
      if (dataItem.fileUrl) {
        return `<a target="_blank" style="color:#ED1A3A !important" href="${dataItem.fileUrl}"><span>Open</span></a>`;
      }
      return ``;
    },
    referenceTemplate(data) {
      let url = "";
      if (data.type === "Invoice") {
        const nrd = data.nrd;
        if (nrd) {
          url = `invoice_view/${data.id}-nrd`;
        } else {
          url = `invoice_view/${data.id}`;
        }
      } else if (data.type === "Sale Quote") {
        url = `sale_quote_view/${data.id}`;
      } else if (data.type === "Delayed Invoice") {
        url = `delayed_invoice_view/${data.id}`;
      } else if (data.type === "Sale Order") {
        url = `sale_order_view/${data.id}`;
      } else if (data.type === "Sale Deposit") {
        url = `sale_deposit_view/${data.id}`;
      } else if (data.type === "Purchase Order") {
        url = `purchase_order_view/${data.id}`;
      } else if (data.type === "Credit Memo") {
        url = `sale_return_view/${data.id}`;
      } else if (data.type === "Debit Memo") {
        url = `purchase_return_view/${data.id}`;
      } else if (data.type === "Inventory Adjustment") {
        url = `inventory_adjustment_view/${data.id}`;
      } else if (data.type === "Purchase") {
        url = `credit_purchase_view/${data.id}`;
      } else if (data.type === "Production Order") {
        url = `production_order_view/${data.id}`;
      } else if (data.type === "Revenue Recognition") {
        url = `revenue_recognition_view/${data.id}`;
      } else if (data.type === "Cash Receipt") {
        url = `cash_receipt/${data.id}`;
      } else if (data.type === "Delivery Order") {
        url = `delivery_order_view/${data.id}`;
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
      this.txnCustomerCenter = [];
      this.loadPage(this);
      this.paging = {};
      this.loadCustomerCenter(search);
    },
    onSearch(search) {
      this.txnCustomerCenter = [];
      this.loadPage(this);
      this.paging = {};
      this.loadCustomerCenter(search);
    },
    async loadCustomerGroup() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          customerGroupHandler.get().then((res) => {
            this.customerGroups = res;
            if (this.customerGroups.length > 0) {
              this.mCustomerGroup = [];
              this.txnCustomerCenter = [];
              this.loadPage(this);
              this.paging = {};
              this.loadCustomerCenter(this.search);
            }
          });
        }, 10);
      });
    },
    async customerInfo() {
      this.$emit("onUpdate", this.customer);
    },
    async onChanged() {
      let grid = kendo.jQuery("#gridCustomer").data("kendoGrid");
      let selectedItem = grid.dataItem(grid.select());
      this.customer = selectedItem;
      this.$emit("onUpdate", selectedItem);
      window.console.log("--", this.customer.id);
      if (this.customer.hasOwnProperty("id")) {
        if (this.customer.id !== "" || this.customer.id !== undefined) {
          // await this.searchTransaction();
          await this.loadAttachment();
        }
      }
    },
    async loadCustomerType() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          customerTypeHandler.get().then((res) => {
            // this.customerTypes = res;
            if (this.appType == "npo") {
              if (res.length != 0) {
                this.customerTypes = res.filter((o) => {
                  const nature = o.nature || {};
                  const name = nature.name || "";
                  if (name.includes("Individual-") === false) {
                    return o;
                  }
                });
              }
            } else {
              this.customerTypes = res;
            }
            if (this.customerTypes.length > 0) {
              this.mCustomerType = this.customerTypes[0];
              const group = this.mCustomerGroup || {};
              if (group.id !== "") {
                this.loadCustomerCenter(this.search);
              }
            }
          });
        }, 10);
      });
    },
    async loadCustomerCenter(search) {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.customers = [];
          let groupId = "";
          let customerTypeId = "";
          const group = this.mCustomerGroup || {};
          const cusType = this.mCustomerType || {};
          groupId = group.id || "";
          customerTypeId = cusType.id || "";
          let isDonor = false;
          const strSearch = search || "";
          window.console.log("strFilter", strSearch);
          //   const strFilterV1 = isDonor + "&ctid=" + customerTypeId + "&grid=" + groupId +"&search=" + strSearch;
          if (search !== "") {
            customerTypeId = "";
            groupId = "";
          }
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
                this.customers = responseData;
                this.paging = res.data.key;
                window.console.log("key", res.data.key);
                this.txnCustomerCenter.push(responseData);

                this.toalPerPage = this.customers.length;
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
        const index = this.customers.findIndex((item) => {
          return customer.id === item.id;
        });
        if (index < 0) {
          this.customers.push(customer);
        } else {
          this.customers.splice(index, 1, customer);
        }
      }
      window.console.log("im changed", this.$route.params);
    },
    async loadAttachment() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          // if (this.$route.params.hasOwnProperty('id')) {
          this.showLoadingAtch = true;
          const strFilter = "?id=" + this.customer.id;
          billingHandler.attachmentList(strFilter).then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoadingAtch = false;
              this.attachmentList = res.data.data;
            }
          });
          // }
        }, 10);
      });
    },
    async loadData() {
      this.clearData();
      await this.loadCustomerType();
      await this.loadCustomerGroup();
    },
    clearData() {
      this.txnCustomerCenter = [];
      this.customers = [];
      this.totalCustomer = 0;
      this.toalPerPage = 0;
      this.paging = {};
      this.action = "";
      this.params = {};
      this.loadPage(this);
    },
    async loadPage(that) {
      $(".page-customer-center").html(`
                <span class="mt-2 bycuscenter-item-returned">0</span><br/>
                <div style="display: flex; flex-direction: 'row'">
                    <button class="bycuscenter-next-page" title="previous" style="width: 24px; font-size: 19px; margin-top: -6px;"> < </button>
                    <ul class="bycuscenter-page-number page_scroll" style="display: flex;list-style: none; padding-left: 0px;">
                        <li style="padding: 6px; padding-bottom: 0px;"  data-page="1" class="bycuscenter-page-link text-bold-link" >1</li>
                    </ul>
                    <button class="bycuscenter-next-page" title="next" style="width: 24px; font-size: 19px;margin-top: -6px;"> > </button>
                </div>
            `);
      $(document).on("click", ".bycuscenter-page-link", function () {
        const page = $(this).data("page");
        $(".bycuscenter-page-link").removeClass("text-bold-link");
        $(this).addClass("text-bold-link");
        that.backToPage(that, page - 1);
        window.console.log(page - 1);
      });
      // $(document).on('click', '.bycus-next-page', function () {
      $(".bycuscenter-next-page").click(function () {
        const page_number = $(this)
          .parent()
          .children(".bycuscenter-page-number")
          .find("li")
          .last()
          .data("page");
        window.console.log("bycuscenter-page_number", page_number);
        const isPrevious = $(this).attr("title");
        if (isPrevious == "previous") {
          const currectpage = $(".text-bold-link").data("page");

          if (currectpage == 1) {
            return;
          }
          $(".bycuscenter-page-link").removeClass("text-bold-link");
          $(`.bycuscenter-page-link:eq(${currectpage - 1})`).addClass("text-bold-link");
          that.backToPage(that, currectpage - 2);
          window.console.log("this currectpage back", currectpage - 2);
        } else {
          $(".bycuscenter-page-link").removeClass("text-bold-link");
          that.loadCustomerCenter(that.search);
          $(this)
            .parent()
            .children(".bycuscenter-page-number")
            .append(
              `<li class="bycuscenter-page-link text-bold-link" style="padding: 6px; padding-bottom: 0px;" data-page="${
                page_number + 1
              }">${page_number + 1}</li>`
            );
        }
        window.console.log("this", page_number + 1);
      });
    },
    itemRetuned(that) {
      let totalRow = 0;
      that.txnCustomerCenter.forEach((k) => {
        totalRow += k.length;
      });
      $(".bycuscenter-item-returned").text(
        "Items returned (" + totalRow + " of " + that.totalCustomer + ")"
      );
    },
    disabledNextPage(value) {
      $(".bycuscenter-next-page").prop("disabled", value);
    },
    backToPage(that, index) {
      try {
        const byCustomer = that.txnCustomerCenter.at(index);
        that.customers = byCustomer;
        // that.refreshGridData(customer)
        window.console.log("that.txnCustomerCenter[index]", byCustomer);
      } catch (e) {
        window.console.log("ERROR on backToPage", index);
      }
    },

    async loadPageTxn(that) {
      $(".customer-center-txn").html(`
                <span class="mt-2 bal-customer-center-txn-item-returned">0</span><br/>
                <div style="display: flex; flex-direction: 'row'">
                    <button class="bal-customer-center-txn-next-page" title="previous" style="width: 24px; font-size: 19px; margin-top: -6px;"> < </button>
                    <ul class="bal-customer-center-txn-page-number page_scroll" style="display: flex;list-style: none; padding-left: 0px;">
                        <li style="padding: 6px; padding-bottom: 0px;"  data-page="1" class="bal-customer-center-txn-page-link text-bold-link" >1</li>
                    </ul>
                    <button class="bal-customer-center-txn-next-page" title="next" style="width: 24px; font-size: 19px;margin-top: -6px;"> > </button>
                </div>
            `);
      $(document).on("click", ".bal-customer-center-txn-page-link", function () {
        const page = $(this).data("page");
        $(".bal-customer-center-txn-page-link").removeClass("text-bold-link");
        $(this).addClass("text-bold-link");
        that.backToPageTxn(that, page - 1);
        window.console.log(page - 1);
      });
      // $(document).on('click', '.bycus-next-page', function () {
      $(".bal-customer-center-txn-next-page").click(function () {
        const page_number = $(this)
          .parent()
          .children(".bal-customer-center-txn-page-number")
          .find("li")
          .last()
          .data("page");
        window.console.log("bal-customer-center-txn-page_number", page_number);
        const isPrevious = $(this).attr("title");
        if (isPrevious == "previous") {
          const currectpage = $(".text-bold-link").data("page");

          if (currectpage == 1) {
            return;
          }
          $(".bal-customer-center-txn-page-link").removeClass("text-bold-link");
          $(`.bal-customer-center-txn-page-link:eq(${currectpage - 1})`).addClass(
            "text-bold-link"
          );
          that.backToPageTxn(that, currectpage - 2);
          window.console.log("this currectpage back", currectpage - 2);
        } else {
          $(".bal-customer-center-txn-page-link").removeClass("text-bold-link");
          that.loadCustomerTxns(that.search);
          $(this)
            .parent()
            .children(".bal-customer-center-txn-page-number")
            .append(
              `<li class="bal-customer-center-txn-page-link text-bold-link" style="padding: 6px; padding-bottom: 0px;" data-page="${
                page_number + 1
              }">${page_number + 1}</li>`
            );
        }
        window.console.log("this", page_number + 1);
      });
    },
    itemRetunedTxn(that) {
      let totalRow = 0;
      that.txnCustomerList.forEach((k) => {
        totalRow += k.length;
      });
      $(".bal-customer-center-txn-item-returned").text(
        "Items returned (" + totalRow + ")"
      );
    },
    disabledNextPageTxn(value) {
      $(".bal-customer-center-txn-next-page").prop("disabled", value);
    },
    backToPageTxn(that, index) {
      try {
        const byProduct = that.txnCustomerList.at(index);
        that.transactionList = byProduct;
        // that.refreshGridData(customer)
        window.console.log("that.txnCustomerList[index]", byProduct);
      } catch (e) {
        window.console.log("ERROR on backToPage", index);
      }
    },
    onSearchTxn(search) {
      this.txnCustomerList = [];
      this.loadPageTxn(this);
      this.pagingTxn = {};
      this.loadCustomerTxns(search);
    },
    async loadCustomerTxns() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.transactionList = [];
          this.params = {
            asOf: this.asOf,
            key: this.pagingTxn,
            id: this.customer.id || "",
            start: this.startDate,
            end: this.endDate,
          };
          this.showLoadingTxn = true;
          this.disabledNextPageTxn(true);
          billingHandler.customerTxn(this.params).then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoadingTxn = false;
              const responseData = res.data.data || [];
              const total = res.data.total || 0;
              this.showLoadingTxn = false;
              this.transactionList = responseData;
              this.paging = res.data.key;
              window.console.log("key", res.data.key);
              this.txnCustomerList.push(responseData);

              this.toalTxnListPerPage = this.transactionList.length;
              this.totalTxnList = total;

              if (Object.keys(this.paging).length > 0) {
                this.disabledNextPageTxn(false);
              } else {
                this.disabledNextPageTxn(true);
              }
              this.itemRetunedTxn(this);
            } else {
              this.showLoadingTxn = false;
            }
          });
        }, 10);
      });
    },
  },
  mounted: async function () {
    await this.loadCustomerType();
    await this.loadCustomerGroup();
    this.loadPage(this);
    this.itemRetuned(this);
    this.disabledNextPage(true);

    this.loadPageTxn(this);
    this.itemRetunedTxn(this);
    this.disabledNextPageTxn(true);
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

  .grid-center.center_heigth_npo {
    height: 466px !important;
  }

  .paddingLeft {
    margin-left: 15px;
  }
}
</style>
