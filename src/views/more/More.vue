<template>
  <v-row>
    <v-col sm="10" cols="12" class="pt-0">
    </v-col>
    <v-col sm="2" cols="12" class="pt-0">
      <v-dialog v-model="dialogM3" max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn
            color="primary"
            class="text-capitalize white--text float-right"
            v-on="on"
            @click="onNewClick"
          >
            {{ $t("create_new") }}
          </v-btn>
        </template>
        <v-card>
          <div class="modal_header">
            <v-card-title>{{ $t("event") }}</v-card-title>
            <v-icon class="btn_close" @click="dialogM3 = false">close</v-icon>
          </div>
          <v-card-text class="modal_text_content">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col sm="12" cols="12" class="pb-0">
                  <label class="label">{{ $t("name") }}</label>
                  <v-text-field
                    class="mt-1"
                    outlined
                    :rules="[
                      (v) => !!v || $t('name_is_required'),
                      (v) => (v && v.length > 2) || $t('character_3'),
                    ]"
                    required
                    placeholder=""
                    v-model="event.name"
                  />
                </v-col>
                <v-col sm="12" cols="12" class="py-0">
                  <v-row>
                    <v-col sm="6" cols="6" class="pt-0">
                      <label class="label">{{ $t("date") }}</label>
                      <app-datepicker
                          :initialDate="event.date"
                          @emitDate="event.date = $event"/>
                    </v-col>
                    <v-col sm="6" cols="6" class="pt-0">
                      <label class="label">{{ $t("campus") }}</label>
                      <v-select
                          class="mt-1"
                          v-model="event.campus"
                          :items="campus"
                          item-value="id"
                          item-text="name"
                      />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row>
                <v-col sm="12" cols="12" class="py-0">
                  <v-card outlined dense class="px-3 py-0 rounded-0">
                    <v-row>
                      <v-col sm="12" cols="12" class="pb-0">
                        <!--                                                <h2 class="font_20 mb-0">{{ $t('account_tax') }}</h2>-->
                      </v-col>
                      <v-col sm="6" cols="12" class="py-0">
                        
                        <label class="label">{{ $t("short_description") }}</label>
                        <v-textarea v-model="event.shortDesc" label="Description"></v-textarea>
                      </v-col>
                      
                      <v-col sm="6" cols="12" class="py-0">
                        <h2 class="mb-2 font_20 width_100">
                          {{ $t("image") }}
                        </h2>
                        <v-row>
                          <v-col sm="6" cols="12" lass="pt-2">
                            <!-- <p class="color_grey font_14">
                              {{ $t("add_funct_prod_variant_desc3") }}
                            </p> -->
                            <v-btn
                              class="float-left btn_cancel"
                              @click="handleUpload"
                            >
                              {{ $t("upload") }}
                            </v-btn>
                          </v-col>
                          <v-col
                            v-if="src !== ''"
                            sm="6"
                            cols="12"
                            class="py-0"
                          >
                            <v-img width="150px" height="150px" :src="src" />
                          </v-col>
                          <v-col sm="6" cols="12">
                            <label>
                              <input
                                hidden
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
                    </v-row>
                  </v-card>
                </v-col>
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
                  :disabled="btnEnable"
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
    </v-col>

    <v-col sm="12" cols="12">
      <template>
        <LoadingMe
          :isLoading="showLoading"
          type="loading"
          :fullPage="false"
          :myLoading="true"
        />
        <kendo-datasource ref="gridCategoryDS" :data="categoryList" />
        <kendo-grid
          id="gridModiCategory"
          class="grid-function"
          :data-source-ref="'gridCategoryDS'"
          :editable="false"
          :toolbar="toolbarTemplate"
          :excel-export="excelExport"
          :excel-file-name="'CategoryList.xlsx'"
          :excel-filterable="true"
          :scrollable-virtual="true"
        >
          <kendo-grid-column
            :field="'no'"
            :title="$t('no')"
            :template="rowNumberTmpl"
            :width="20"
            :column-menu="false"
            :headerAttributes="{
              style: 'background-color: #EDF1F5;',
              class: 'text-center',
            }"
            :attributes="{ style: 'text-align: center' }"
          />
          <kendo-grid-column
            :field="'abbr'"
            :title="$t('abbr')"
            :width="50"
            :template="'<span>#=abbr#</span>'"
            :headerAttributes="{ style: 'background-color: #EDF1F5' }"
          />
          <kendo-grid-column
            :field="'color'"
            :title="$t('color')"
            :width="30"
            :template="'<div><span style=background-color:#=color#>#=color#</span></div>'"
            :headerAttributes="{ style: 'background-color: #EDF1F5' }"
          />
          <kendo-grid-column
            :field="'name'"
            :attributes="{ class: 'tb_name_td' }"
            :title="$t('name')"
            :width="150"
            :template="'<span>#=name#</span>'"
            :headerAttributes="{ style: 'background-color: #EDF1F5' }"
          />
          <kendo-grid-column
            :field="''"
            :title="$t('action')"
            :width="50"
            :command="[
              { iconClass: 'k-icon k-i-edit', text: $t('edit'), click: goEdit },
            ]"
            :headerAttributes="{
              style: 'background-color: #EDF1F5;',
              class: 'text-center',
            }"
            :attributes="{ style: 'text-align: center' }"
          />
        </kendo-grid>
      </template>
    </v-col>
    <div style="overflow: auto" class="category-list"></div>
  </v-row>
</template>
<script>
  import { i18n } from "../../i18n";
  import kendo from "@progress/kendo-ui";
  const $ = kendo.jQuery;
  import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'
  const nlfHandler = require("@/scripts/handler/nlfHandler");
  export default {
      components: {
      LoadingMe: () => import(`@/components/Loading`),
      'app-datepicker': DatePickerComponent,
      },
      data: () => ({
      palette: [
          "#E6A044",
          "#EBE4E4",
          "#D42E21",
          "#000",
          "#242A34",
          "#9FCC63",
          "#519D36",
      ],
      fileSizeRules: [
          (files) =>
          !files ||
          !files.some((file) => file.size > 1024 * 1024) ||
          "Image size should be less than 1 MB!",
      ],
      src: "",
      dialogM3: false,
      showLoading: true,
      valid: true,
      accLoading: false,
      mItemType: {},
      itemTypes: [],
      // category: categoryModel,
      mAccRevenue: "",
      mAccInventory: "",
      accRevenue: [],
      accInventory: [],
      accCostOfGoodSold: [],
      mAccCostOfGoodSold: {},
      tax: [],
      specificTax: [],
      vat: [],
      purchaseTax: [],
      mPurchaseTax: {},
      mSpecificTax: {},
      mOtherTax: {},
      otherTax: [],
      mVAT: {},
      image: "",
      imgFile: "",
      categoryList: [],
      btnEnable: false,
          event: {},
      txnCategoryList: [],
      totalVariantBal: 0,
      toalCategoryPerPage: 0,
      paging: {},
      action: "",
      params: {},
      coa: [],
      }),
      props: {},
      computed: {
          campus(){
              return [
                  {id: 1, name: i18n.t('meanchey_campus')},
                  {id: 2, name: i18n.t('toulsongke_campus')}
              ]
          }
      },
      watch: {
      dialogM3(val) {
          val || this.close();
      },
      },
      methods: {
          mappingAccount(coa, uuid) {
              const account = coa.filter((k) => k.uuid === uuid);
              return account.map((j) => {
              j.id = j.uuid;
              return {
                  ...j,
              };
              })[0];
          },
          onGetColor() {
              let grid = kendo.jQuery("#colorPickCategoryDS").data("kendoColorPalette");
              this.event.color = grid.value();
          },
          handleUpload() {
              this.$refs["fileupload"].click();
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
          rowNumberTmpl(dataItem) {
              let ds = this.$refs.gridCategoryDS.kendoWidget(),
              index = ds.indexOf(dataItem);
              return index + 1;
          },
          onNewClick() {
              this.btnEnable = false;
              this.category = {};
              this.event.id = undefined;
              // this.mItemType = this.itemTypes[0];
              this.src = "";
              this.image = "";
              this.imgFile = "";
              this.event.date = new Date().toISOString().substr(0, 10);
              this.event.campus = this.campus[0].id
              this.event.name = ''
              this.event.shortDesc = ''
          },
          goEdit(e) {
              e.preventDefault();
              let grid = kendo.jQuery("#gridModiCategory").data("kendoGrid");
              let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
              dataItem.id = dataItem.pk;
              this.category = dataItem;
              window.console.log(this.category, 'sssss')
              this.src = "";
              this.image = dataItem.img || "";
              this.src =
              "https://s3-ap-southeast-1.amazonaws.com/images.banhji/" +
                  dataItem.img.default.thumb || "";
              const incomeAcc = dataItem.incomeAcc || "";
              const inventoryAcc = dataItem.inventoryAcc || "";
              const costOfGoodsSoldAcc = dataItem.costOfGoodsSoldAcc || "";
              this.mAccRevenue = incomeAcc //this.mappingAccount(this.coa, incomeAcc);
              this.mAccInventory = inventoryAcc //this.mappingAccount(this.coa, inventoryAcc);
              this.mAccCostOfGoodSold = costOfGoodsSoldAcc // this.mappingAccount( this.coa, costOfGoodsSoldAcc );
              this.dialogM3 = true;
          },
          close() {
              this.category = {};
              this.loadAccount();
              // this.loadTax()
              this.dialogM3 = false;
          },
          async onSaveClose() {
              if (!this.$refs.form.validate()) {
              this.$refs.form.validate();
              return;
              }
              this.btnEnable = true;
              let data = {
                  ...this.event,
                  image: this.image || "",
              };
              window.console.log(data, 'data')
              this.showLoading = true;
              nlfHandler.eventCreate(data).then((response) => {
                  if (response.data.statusCode === 201) {
                      this.showLoading = false;
                      this.btnEnable = false;
                      this.loadProductCategory();
                      this.close();
                      this.$snotify.success("Success");
                  }
              }).catch((e) => {
                  this.btnEnable = false;
                  this.showLoading = false;
                  this.$snotify.error("Something went wrong");
                  window.console.log(e, 'error');
              });
          },
          async loadEvents() {
              // 
          },
      },
      mounted: async function () {
          await this.loadEvents();
      },
      created: async function () {

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

.v-application .error--text {
  color: #ff5252 !important;
  padding-top: 3px;
  caret-color: #ff5252 !important;
}

@media (max-width: 576px) {
}
</style>
