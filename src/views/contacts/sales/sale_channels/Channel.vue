<template>
  <v-row class="">
    <v-col sm="12" cols="12" class="grayBg px-6">
      <v-card min-height="564" color="white" class="pa-3 no_border" elevation="0">
        <v-row>
          <v-col sm="10" cols="12" class="pt-0">
            <h2 class="mb-0 font_020">{{ $t("sale_channel_list") }}</h2>
            <p class="mb-0">{{ $t("sale_channel_desc") }}</p>
          </v-col>
          <v-col sm="2" cols="12">
            <v-dialog persistent v-model="dialogM2" max-width="400px">
              <template v-slot:activator="{ on }">
                <v-btn
                  class="white--text float-right text-upper"
                  color="primary"
                  v-on="on"
                  @click="onNewClick"
                >
                  {{ $t("new_channel") }}
                </v-btn>
              </template>
              <v-card>
                <div class="modal_header">
                  <v-card-title>{{ $t("sale_channels") }}</v-card-title>
                  <v-icon @click="dialogM2 = false">close</v-icon>
                </div>
                <v-card-text class="modal_text_content">
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-row>
                      <v-col sm="12" cols="12" class="pb-0">
                        <label class="label">{{ $t("name") }}</label>
                        <v-text-field
                          class="mb-1"
                          outlined
                          v-model="saleChannel.name"
                          tage="Customer Type Name"
                          :rules="[(v) => !!v || $t('is_required')]"
                          placeholder=""
                        />
                      </v-col>
                      <v-col sm="12" cols="12" class="py-0">
                        <label class="label">{{ $t("nature") }}</label>
                        <v-select
                          class="mt-2"
                          id="acc_type_selector"
                          :items="natures"
                          item-text="name"
                          tage="Nature"
                          item-value="id"
                          :rules="[(v) => !!v || $t('is_required')]"
                          v-model="mNature"
                          outlined
                          return-object
                        />
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
                <v-divider />
                <v-card-actions class="modal_footer">
                  <v-row>
                    <v-col sm="6" cols="6" class="py-0">
                      <v-btn
                        color="black"
                        outlined
                        class="text-capitalize black--text float-left"
                        @click="dialogM2 = false"
                        >{{ $t("cancel") }}
                      </v-btn>
                    </v-col>
                    <v-col sm="6" cols="6" class="py-0">
                      <v-btn
                        color="primary"
                        class="px-3 white--text text-capitalize float-right"
                        @click.native="onSaveClose"
                        :disabled="btnDisabled"
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
                :fullPage="false"
                type="loading"
                :myLoading="true"
              />
              <kendo-datasource ref="gridSaleChannelDS" :data="saleChannelList" />
              <kendo-grid
                id="gridSaleChannel"
                class="grid-function"
                :data-source-ref="'gridSaleChannelDS'"
                :editable="false"
                :toolbar="toolbarTemplate"
                :scrollable-virtual="true"
              >
                <kendo-grid-column
                  :field="'name'"
                  :title="$t('name')"
                  :width="200"
                  :attributes="{ class: 'tb_name_td' }"
                  :template="'<span>#=name#</span>'"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'nature'"
                  :title="$t('nature')"
                  :width="200"
                  :template="'<span>#=nature#</span>'"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="''"
                  :title="$t('action')"
                  :width="100"
                  :command="[
                    {
                      iconClass: 'k-icon k-i-edit',
                      text: 'Edit',
                      click: goEdit,
                    },
                  ]"
                  :headerAttributes="{
                    style: 'text-align: left; background-color: #EDF1F5',
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
import SaleChannelModel from "@/scripts/model/SaleChannel";
import kendo from "@progress/kendo-ui";

const $ = kendo.jQuery;
const saleChannelHandler = require("@/scripts/saleChannelHandler");
const saleChannelModel = new SaleChannelModel({});

import JSZip from "jszip";

window.JSZip = JSZip;

export default {
  components: {
    LoadingMe: () => import(`@/components/Loading`),
  },
  data: () => ({
    dialogM2: "",
    showLoading: true,
    natures: ["Online", "Offline"],
    mNature: "",
    saleChannel: saleChannelModel,
    saleChannelList: [],
    valid: true,
    btnDisabled: false,
  }),
  props: {},
  computed: {},
  watch: {},
  created() {},
  methods: {
    rowNumberTmpl(dataItem) {
      let ds = this.$refs.gridSaleChannelDS.kendoWidget(),
        index = ds.indexOf(dataItem);
      return index + 1;
    },
    onNewClick() {
      this.btnDisabled = false;
      this.saleChannel = {};
      this.saleChannel.id = undefined;
    },
    goEdit(e) {
      e.preventDefault();
      let grid = kendo.jQuery("#gridSaleChannel").data("kendoGrid");
      let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
      this.saleChannel = dataItem;
      this.mNature = dataItem.nature || "";

      this.dialogM2 = true;
    },
    close() {
      this.dialogM2 = false;
    },
    async onSaveClose() {
      if (!this.$refs.form.validate()) {
        this.$refs.form.validate();
        return;
      }
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          let data = {
            id: this.saleChannel.id ? this.saleChannel.id : "",
            name: this.saleChannel.name,
            nature: this.mNature,
          };
          this.showLoading = true;
          this.btnDisabled = true;
          saleChannelHandler
            .create(data)
            .then((response) => {
              if (response.data.statusCode === 201) {
                this.showLoading = false;
                this.btnDisabled = false;
                this.loadSaleChannel();
                this.$snotify.success("Success");
                this.close();
                // this.$refs.form.reset()
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
    async loadSaleChannel() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = true;
          saleChannelHandler.get().then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoading = false;
              this.saleChannelList = res.data.data;
            } else {
              this.showLoading = false;
            }
          });
        }, 300);
      });
    },

    toolbarTemplate: function () {
      const templateHtml =
        // '<span>' +
        // '<a class="k-pager-excel k-link k-button excel" title="Export to Excel"> <span class="k-icon k-i-excel"></span>Export to excel </a>' +
        // '</span><span>&nbsp;&nbsp;</span>' +
        // '<span style="position:absolute; right:5px">' +
        // '</span>' +
        "<span>" +
        '<a class="k-pager-refresh k-link k-button reload" title="Refresh"><span class="k-icon k-i-reload"></span> Refresh </a>' +
        "</span>";

      return kendo.template(templateHtml);
    },
    exportToExcel() {
      const grid = $("#gridSaleChannel").data("kendoGrid");
      grid.saveAsExcel();
    },
    excelExport: function (e) {
      // const pivot = this.$refs.gridTransactionDS.kendoWidget()
      // pivot.saveAsExcel()
      window.console.log(e.data);
    },
    initToolbar(that) {
      let grid = $("#gridSaleChannel").data("kendoGrid");
      let gridElement = grid.element;
      let toolbarElement = gridElement.find(".k-grid-toolbar");
      toolbarElement.on("click", ".k-pager-refresh", function (e) {
        e.preventDefault();
        onReloadData(that);
      });
      toolbarElement.on("click", ".k-pager-excel", function (e) {
        e.preventDefault();
        onExportExcel(that);
      });

      function onReloadData(that) {
        that.loadSaleChannel();
      }

      function onExportExcel(that) {
        that.exportToExcel();
      }
    },
  },
  mounted: async function () {
    await this.loadSaleChannel();
    await this.initToolbar(this);
  },
};
</script>
