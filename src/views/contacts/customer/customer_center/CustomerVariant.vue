<template>
  <v-row>
    <v-row style="width: 104%">
      <v-col sm="12" cols="12" class="px-7">
        <v-simple-table>
          <template v-slot:default>
            <tbody>
              <tr>
                <td class="text-uppercase">{{ $t("name") }}</td>
                <td class="text-left text-bold">{{ customer.name || "" }}</td>
              </tr>
              <tr>
                <td class="text-uppercase">{{ $t("banhji_institute_id") }}</td>
                <td class="text-left text-bold">{{ customer.consumerId }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>

    <LoadingMe
      :isLoading="showLoading"
      :fullPage="false"
      type="loading"
      :myLoading="true"
    />
    <v-col sm="12" cols="12" class="px-1">
      <v-card outlined color="white" class="pa-0">
        <v-col sm="12" cols="12" class="py-0">
          <template>
            <kendo-datasource
              ref="gridCustomerVariantDS"
              :type="'JSON'"
              :data="cusVariantList"
              :server-paging="false"
            />
            <kendo-grid
              id="gridCustomerVariant"
              class="grid-function"
              :data-source-ref="'gridCustomerVariantDS'"
              :toolbar="toolbarTemplate"
              :column-menu="false"
              :editable="true"
              :navigatable="true"
              :sortable="false"
              :disabled="true"
              :resizable="true"
              :scrollable-virtual="true"
              ><kendo-grid-column
                :field="'sku'"
                :title="$t('sku')"
                :width="150"
                :filterable="true"
                :attributes="{
                  style: 'text-align: left; ',
                }"
                :headerAttributes="{
                  style: 'background-color: #EDF1F5;text-align: left',
                }"
              />
              <kendo-grid-column
                :field="'item.name'"
                :title="$t('item')"
                :width="200"
                :filterable="true"
                :attributes="{
                  style: 'text-align: left; ',
                }"
                :headerAttributes="{
                  style: 'background-color: #EDF1F5;text-align: left',
                }"
              />

              <kendo-grid-column
                :field="'code'"
                :title="$t('code')"
                :attributes="{
                  class: 'tb_name_td',
                }"
                :editable="
                  () => {
                    return true;
                  }
                "
                :filterable="false"
                :width="110"
                :headerAttributes="{
                  style: 'background-color: #EDF1F5',
                }"
              />
              <kendo-grid-column
                :field="'desc'"
                :title="$t('description')"
                :attributes="{
                  class: 'tb_name_td',
                }"
                :editable="
                  () => {
                    return true;
                  }
                "
                :filterable="false"
                :width="200"
                :headerAttributes="{
                  style: 'background-color: #EDF1F5',
                }"
              />
            </kendo-grid>
          </template>
        </v-col>
      </v-card>
    </v-col>

    <div style="overflow: auto" class="cus-var-pager pl-5"></div>
  </v-row>
</template>
<script>
// import { DropDownList } from "@progress/kendo-vue-dropdowns";
import kendo from "@progress/kendo-ui";
// import { uuid } from "vue-uuid";
import ItemLineModel from "@/scripts/sku-connect/model/ItemLine";
// const uomConversionHandler = require("@/scripts/uomConversionHandler");
// const priceLevelHandler = require("@/scripts/priceLevelHandler");
const uomPriceHandler = require("@/scripts/uomPriceHandler");
const balanceHandler = require("@/scripts/balance/handler/balanceHandler");
// const settingHandler = require("@/scripts/settingsHandler");
const $ = kendo.jQuery;
const defaultItem = { ["name"]: "Select ...", ["id"]: null };
// const supplierHandler = require("@/scripts/supplierHandler");
const itemLineModel = new ItemLineModel({});

export default {
  name: "CustomerVariant",
  props: {
    customer: {},
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
    // mUOM: {},
    menuDate: false,
    gridSchema: {
      model: {
        id: "id",
      },
    },
    dateFormat: "dd-MM-yyyy",

    txnCustomerVariant: [],
    paging: {},
    totalVariantBal: 0,
    totalVariantBalPerPage: 0,

    supplierList: [],
    supplier: {},
    textField: "name",
    defaultItem: defaultItem,
    dataItemKey: "id",
    filter: "",
    supBaseUrl: balanceHandler.customerVendors(),
    pattern: "sup-bal",
    conectTo: 1,
    itemLine: itemLineModel,
    logDetailList: [],
    showLoadingTxn: false,
    logTabIndex: 0,
    cusVariantList: [],
  }),
  methods: {
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
        const ds = this.$refs.gridCustomerVariantDS.kendoWidget();
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
    // async dataSourceChangedCustomer(e) {
    //   if (e.field) {
    //     let dataRow = e.items[0];
    //     let item;
    //     switch (e.field) {
    //       case "obj":
    //         item = dataRow.obj || {};
    //         dataRow.set("id", item.id);
    //         window.console.log("dataRow", dataRow);
    //         this.checkDuplicateArrayCustomer();
    //         break;
    //       default:
    //         break;
    //     }
    //   }
    // },
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
    dataBound: function (e) {
      this.checkGridDuplictyValue(e);
    },
    removeRow(e) {
      e.preventDefault();
      const grid = kendo.jQuery("#gridCustomerVariant").data("kendoGrid"),
        dataSource = grid.dataSource,
        dataItem = grid.dataItem($(e.currentTarget).closest("tr"));

      if (dataSource.total() > 1) {
        dataSource.remove(dataItem);
        // this.autoCalculate();
      }
    },
    itemTemplate(dataItem) {
      const item = dataItem.obj;
      if (item) {
        return `<span>${item.name || ``}</span>`;
      } else {
        return ``;
      }
    },
    addRowCus() {
      let ds = this.$refs.gridCustomerVariantDS.kendoWidget(),
        total = ds.total();
      this.itemLine.itemId = this.itemId; //uuid.v1();
      this.itemLine.sku = this.sku; //uuid.v1();
      if (total < 10) {
        ds.insert(total, this.itemLine);
      }
    },
    formatDateWithTime(dataItem) {
      return kendo.toString(
        new Date(dataItem.appliedDate),
        `${dataItem.dateFormat} h:mm tt`
      );
    },
    excelExport: function (e) {
      // const pivot = this.$refs.gridTransactionDS.kendoWidget()
      // pivot.saveAsExcel()
      window.console.log(e.data);
    },
    initToolbar(that) {
      try {
        let grid = $("#gridCustomerVariant").data("kendoGrid");
        let gridElement = grid.element;
        let toolbarElement = gridElement.find(".k-grid-toolbar");
        toolbarElement.on("click", ".k-pager-refresh", function (e) {
          e.preventDefault();
          onReloadData(that);
        });
      } catch (error) {
        window.console.log("error initToolbarV", error);
      }
      function onReloadData(that) {
        that.onSearch();
      }
    },
    exportToExcel() {
      const grid = $("#gridVariantCost").data("kendoGrid");
      grid.saveAsExcel();
    },
    toolbarTemplate: function () {
      const templateHtml =
        // "<span>" +
        // '<a class="k-pager-excel k-link k-button excel" title="Export to Excel"> <span class="k-icon k-i-excel"></span>Export to excel </a>' +
        // "</span><span>&nbsp;&nbsp;</span>" +
        // '<span style="position:absolute; right:5px">' +
        // "</span>" +
        "<span>" +
        '<a class="k-pager-refresh k-link k-button reload" title="Refresh"><span class="k-icon k-i-reload"></span> Refresh </a>' +
        "</span>";

      return kendo.template(templateHtml);
    },
    close() {
      // window.history.go(-1)
      this.dialogm2 = false;
    },
    async loadCustomerVariant(type) {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          window.console.log("this.itemId", this.itemId);
          this.cusVariantList = [];
          if (this.itemId) {
            this.params = {
              key: this.paging,
              id: this.itemId || "",
              type: type,
            };
            this.showLoading = true;
            // this.disabledNextPage(true);
            uomPriceHandler.skuConnectAll(this.params).then((res) => {
              if (res.data.statusCode === 200) {
                this.showLoading = false;
                const responseData = res.data.data || [];
                const total = res.data.total || 0;
                this.showLoading = false;
                this.cusVariantList = responseData;
                this.paging = res.data.key;
                window.console.log("key", res.data.key);
                this.txnCustomerVariant.push(responseData);

                // this.toalVariantBalPerPage = this.ItemList.length;
                this.totalVariantBal = total;

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
          }
        }, 10);
      });
    },
    async loadPage(that) {
      $(".cus-var-pager").html(`
                <span class="mt-2 variant-pager-item-returned">0</span><br/>
                <div style="display: flex; flex-direction: 'row'">
                    <button class="variant-pager-next-page" title="previous" style="width: 24px; font-size: 19px; margin-top: -6px;"> < </button>
                    <ul class="variant-pager-page-number page_scroll" style="display: flex;list-style: none; padding-left: 0px;">
                        <li style="padding: 6px; padding-bottom: 0px;"  data-page="1" class="variant-pager-page-link text-bold-link" >1</li>
                    </ul>
                    <button class="variant-pager-next-page" title="next" style="width: 24px; font-size: 19px;margin-top: -6px;"> > </button>
                </div>
            `);
      $(document).on("click", ".variant-pager-page-link", function () {
        const page = $(this).data("page");
        $(".variant-pager-page-link").removeClass("text-bold-link");
        $(this).addClass("text-bold-link");
        that.backToPage(that, page - 1);
        window.console.log(page - 1);
      });
      // $(document).on('click', '.bycus-next-page', function () {
      $(".variant-pager-next-page").click(function () {
        const page_number = $(this)
          .parent()
          .children(".variant-pager-page-number")
          .find("li")
          .last()
          .data("page");
        window.console.log("variant-pager-page_number", page_number);
        const isPrevious = $(this).attr("title");
        if (isPrevious == "previous") {
          const currectpage = $(".text-bold-link").data("page");

          if (currectpage == 1) {
            return;
          }
          $(".variant-pager-page-link").removeClass("text-bold-link");
          $(`.variant-pager-page-link:eq(${currectpage - 1})`).addClass("text-bold-link");
          that.backToPage(that, currectpage - 2);
          window.console.log("this currectpage back", currectpage - 2);
        } else {
          $(".variant-pager-page-link").removeClass("text-bold-link");
          that.loadCustomerVariant();
          $(this)
            .parent()
            .children(".variant-pager-page-number")
            .append(
              `<li class="variant-pager-page-link text-bold-link" style="padding: 6px; padding-bottom: 0px;" data-page="${
                page_number + 1
              }">${page_number + 1}</li>`
            );
        }
        window.console.log("this", page_number + 1);
      });
    },
    itemRetuned(that) {
      let totalRow = 0;
      that.txnCustomerVariant.forEach((k) => {
        totalRow += k.length;
      });
      $(".variant-pager-item-returned").text("Items returned (" + totalRow + ")");
    },
    disabledNextPage(value) {
      $(".variant-pager-next-page").prop("disabled", value);
    },
    backToPage(that, index) {
      try {
        const byProduct = that.txnCustomerVariant.at(index);
        that.cusVariantList = byProduct;
        // that.refreshGridData(customer)
        window.console.log("that.txnCustomerVariant[index]", byProduct);
      } catch (e) {
        window.console.log("ERROR on backToPage", index);
      }
    },
    onSearch() {
      this.txnCustomerVariant = [];
      this.loadPage(this);
      this.paging = {};
      this.loadCustomerVariant("cus-variant");
    },
  },
  mounted: async function () {
    await this.initToolbar(this);
    // this.loadInstitutes()
    this.loadPage(this);
    this.itemRetuned(this);
    this.disabledNextPage(true);
    this.onSearch();
  },
  watch: {
    // '$route': "onSearch",
    customer() {
      if (this.customer !== undefined) {
        this.showLoading = true;
        this.onSearch();
        this.showLoading = false;
      }
    },
  },
  computed: {
    info() {
      return this.customer || {};
    },
    itemId() {
      const product = this.customer || {};
      return product.id || "";
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
