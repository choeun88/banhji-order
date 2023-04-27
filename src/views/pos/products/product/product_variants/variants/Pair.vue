<template>
    <v-row>
      <v-col sm="12" cols="12">
        <div>
          <LoadingMe
            :isLoading="showLoading"
            :fullPage="false"
            type="loading"
            :myLoading="true"
          />
        </div>

        <v-card outlined class="no_border rounded-sm" color="white">
          <v-col sm="12" cols="12" class="py-0">
            <template>
              <kendo-datasource
                ref="gridPairDS"
                :type="'JSON'"
                :data="transactions"
                :change="dataSourceChangedCustomer"
                :server-paging="false"
              />
              <kendo-grid
                id="gridPair"
                class="grid-function"
                :data-source-ref="'gridPairDS'"
                :column-menu="false"
                :editable="true"
                :navigatable="true"
                :sortable="false"
                :disabled="true"
                :resizable="true"
                :scrollable-virtual="true"
              >
                <kendo-grid-column
                  :field="'obj'"
                  :title="$t('name')"
                  :width="200"
                  :filterable="true"
                  :template="itemTemplate"
                  :editor="ItemDropDownEditor"
                  :attributes="{
                    style: 'text-align: left; ',
                  }"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5;text-align: left',
                  }"
                />
                <kendo-grid-column
                  :field="'obj'"
                  :title="$t('sku')"
                  :width="200"
                  :filterable="true"
                  :template="skuTemplate"
                  :attributes="{
                    style: 'text-align: left; ',
                  }"
                  :editable="
                    () => {
                      return false;
                    }
                  "
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5;text-align: left',
                  }"
                />
              </kendo-grid>
            </template>
          </v-col>
          <!-- <div style="overflow: auto" class="invoice-log-pager"></div> -->
        </v-card>
        <v-col sm="12" cols="12" class="pt-2">
          <v-btn color="primary" class="float-left btn_plus mr-2" @click="addRowCus">
            <v-icon size="" class="ma-1">mdi-plus</v-icon>
          </v-btn>
          <v-btn
            @click="onSaveClose"
            color="primary"
            class="float-right white--text text-capitalize"
            >{{ $t("save") }}
          </v-btn>
        </v-col>
      </v-col>
    </v-row>
</template>
<script>
import kendo from "@progress/kendo-ui";
import ItemLineModel from "@/scripts/sku-connect/model/ItemLine";
const uomPriceHandler = require("@/scripts/uomPriceHandler");
const productVariantHandler = require("@/scripts/productVariantHandler");
const $ = kendo.jQuery;
const itemLineModel = new ItemLineModel({});
const SECOND_DELAY = 1000;
export default {
  name: "VariantPair",
  props: {
    product: {},
  },
  components: {
    // "app-datepicker": () =>
    //   import(`@/components/custom_templates/DatePickerComponent`),
    LoadingMe: () => import(`@/components/Loading`),

    // dropdownlist: DropDownList,
  },
  data: () => ({
    loading: false,
    dialogm2: false,
    showLoading: false,
    valid: true,
    menuDate: false,
    gridSchema: {
      model: {
        id: "id",
      },
    },
    dateFormat: "dd-MM-yyyy",
    itemLine: itemLineModel,
    showLoadingTxn: false,
    logTabIndex: 0,
    transactions: [],
  }),
  methods: {
    onSaveClose() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          if (this.product) {
            const isTrue = this.checkDuplicateArrayVendor();
            if (isTrue === false) {
              const ds = this.$refs.gridPairDS.kendoWidget();
              const rows = ds.data().filter((n) => n.obj.id !== "");
              const lines = rows.map((line) => {
                const obj = line.obj || {};
                return {
                  id: obj.id,
                  itemId: line.itemId || "",
                  sku: line.sku || "",
                  name: obj.name || "",
                };
              });
              const data = {
                itemId: this.itemId || "",
                sku: this.sku || "",
                lines: lines,
              };
              this.showLoading = true;
              uomPriceHandler
                .variantPairAdd(data)
                .then((response) => {
                  if (response.data.statusCode === 201) {
                    this.showLoading = false;
                    this.$snotify.success("Success");
                  }
                })
                .catch((e) => {
                  this.showLoading = false;
                  this.$snotify.error("Something went wrong", e);
                });
            }
          }
        }, 50);
      });
    },
    checkDuplicateArrayVendor() {
      try {
        const ds = this.$refs.gridSKUVendorDS.kendoWidget();
        const rows = ds.data().filter((n) => n.obj.id !== "");
        const uniqueValues = new Set(rows.map((v) => v.id));

        if (uniqueValues.size < rows.length) {
          this.$snotify.error("Duplicate supplier");
          return true;
        }
        return false;
      } catch (error) {
        window.console.log("error duplcaite", error);
        return false;
      }
    },
    checkDuplicateArrayCustomer() {
      try {
        const ds = this.$refs.gridPairDS.kendoWidget();
        const rows = ds.data().filter((n) => n.obj.id !== "");
        const uniqueValues = new Set(rows.map((v) => v.id));

        if (uniqueValues.size < rows.length) {
          this.$snotify.error("Duplicate customer");
          return true;
        }
        return false;
      } catch (error) {
        window.console.log("error duplcaite", error);
        return false;
      }
    },
    async dataSourceChangedCustomer(e) {
      if (e.field) {
        let dataRow = e.items[0];
        let item;
        switch (e.field) {
          case "obj":
            item = dataRow.obj || {};
            dataRow.set("id", item.id);
            window.console.log("dataRow", dataRow);
            this.checkDuplicateArrayCustomer();
            break;
          default:
            break;
        }
      }
    },
    checkGridDuplictyValue(e) {
      window.console.log("e", e);
      const grid = $("#gridSKUVendor").data("kendoGrid"),
        data = grid.dataItems(),
        fields = grid.options.columns.map((x) => x.field),
        checkData = {};

      // Gathering data
      data.forEach((d) => {
        fields.forEach((f) => {
          if (!checkData.hasOwnProperty(f)) checkData[f] = {};
          if (!checkData[f].hasOwnProperty(d[f])) checkData[f][d[f]] = [];

          checkData[f][d[f]].push(d.uid);
        });
      });

      // Checking for duplicity and styling duplicated rows
      window.console.log("checkData", checkData);
      Object.keys(checkData).forEach((k) => {
        Object.keys(checkData[k]).forEach((c) => {
          if (checkData[k][c].length > 1) {
            checkData[k][c].forEach((x) =>
              $(grid.tbody)
                .find('tr[data-uid="' + x + '"]')
                .addClass("duply-row")
            );
          }
        });
      });
    },
    itemTemplate(dataItem) {
      const item = dataItem.obj;
      if (item) {
        return `<span>${item.name || ``}</span>`;
      } else {
        return ``;
      }
    },
    skuTemplate(dataItem) {
      const item = dataItem.obj;
      if (item) {
        return `<span>${item.sku || ``}</span>`;
      } else {
        return ``;
      }
    },
    ItemDropDownEditor(container, options) {
      const filterBy = "Name";
      window.console.log("this.itemId", this.itemId);
      const itmId = this.itemId;
      kendo
        .jQuery('<input name="' + options.field + '"/>')
        .appendTo(container)
        .kendoDropDownList({
          autoBind: true,
          autoWidth: true,
          height: 400,
          delay: SECOND_DELAY,
          filter: "contains",
          dataTextField: "name",
          dataValueField: "id",
          headerTemplate:
            '<div class="dropdown-header k-widget k-header">' +
            "<span>Items </span>" +
            "<span></span>" +
            "</div>",
          template: "<span>#=name#</span>",
          optionLabel: "--- Select ---",
          dataSource: new kendo.data.DataSource({
            serverFiltering: true,
            transport: {
              read: {
                url: productVariantHandler.itemSearchURL(
                  "?plId=" + "&reUsed=1&filterBy=" + filterBy + "&pattern=itm-1-1"
                ),
              },
              dataType: "json",
            },
            schema: {
              model: {
                id: "id",
                fields: {
                  id: { type: "string" },
                  name: { type: "string" },
                  sku: { type: "string" },
                },
              },
              data: function (response) {
                const res = response.data || [];
                window.console.log("this.itemId", itmId);
                return res.filter((itm) => itm.id !== itmId);
              },
              total: function (response) {
                return response.data.count;
              },
            },
          }),
        });
    },
    addRowCus() {
      let ds = this.$refs.gridPairDS.kendoWidget(),
        total = ds.total();
      // this.itemLine.itemId = this.itemId; //uuid.v1();
      this.itemLine.sku = this.sku; //uuid.v1();
      window.console.log("total", total);
      if (total === 0) {
        ds.insert(total, this.itemLine);
      }
    },
    formatDateWithTime(dataItem) {
      return kendo.toString(
        new Date(dataItem.appliedDate),
        `${dataItem.dateFormat} h:mm tt`
      );
    },
    close() {
      // window.history.go(-1)
      this.dialogm2 = false;
    },
    async loadPairItem() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          window.console.log("this.itemId", this.itemId);
          if (this.itemId) {
            this.params = {
              key: this.paging,
              id: this.itemId || "",
            };
            this.showLoading = true;
            // this.disabledNextPage(true);
            uomPriceHandler.variantPairGets(this.params).then((res) => {
              if (res.data.statusCode === 200) {
                this.showLoading = false;
                const responseData = res.data.data || [];
                this.showLoading = false;
                this.transactions = responseData;
                this.paging = res.data.key;
                window.console.log("init", responseData.length);
                if (responseData.length === 0) {
                  window.console.log("init--");
                  this.addRowCus();
                }
              } else {
                window.console.log("init");
                this.addRowCus();
                this.showLoading = false;
              }
            });
          } else {
            this.addRowCus();
          }
        }, 10);
      });
    },
    onSearch() {
      this.loadPairItem();
    },
    initData() {
      // const ds = this.$refs.gridPairDS.kendoWidget();
      // ds.data([]);
      this.addRowCus();
      window.console.log("init");
    },
  },
  mounted: async function () {
    // this.loadConversionList();
    // this.onSearch();
    this.loadPairItem();
  },
  watch: {
    // '$route': "onSearch",
    product() {
      if (this.product !== undefined) {
        this.showLoading = true;
        this.onSearch();
        this.showLoading = false;
      } else {
        // this.initData();
        this.addRowCus();
      }
    },
  },
  computed: {
    sku() {
      const product = this.product || {};
      return product.sku || "";
    },
    itemId() {
      const product = this.product || {};
      return product.id || "";
    },
    baseUOM() {
      if (this.product) {
        if (this.product.hasOwnProperty("uom")) {
          return this.product.uom;
        } else {
          return "";
        }
      } else {
        return "";
      }
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
  > tr.third:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
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
.duply-row {
  background-color: #aa0;
}
</style>
