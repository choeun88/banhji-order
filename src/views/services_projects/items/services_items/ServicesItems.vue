<template>
  <v-row class="">
    <v-col sm="4" cols="12" class="py-0 pr-2">
      <div class="d-flex">
        <v-card class="pa-3 white--text" elevator="0" style="width: 80%" color="primary">
          <div class="d-flex justify-space-between">
            <h3 class="center_left_title text-uppercase">
              {{ $t("total_services") }}
            </h3>
            <h1>{{ totalService }}</h1>
          </div>
        </v-card>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs"
              style="height: 47px !important"
              class="text-bold ml-2 px-2 white--text"
              v-on="on"
              to="service"
            >
              {{ $t("new") }}
            </v-btn>
          </template>
        </v-menu>
      </div>
      <v-card outlined dense color="grayBg" class="pa-3 no_border mb-4">
        <div class="d-flex">
          <v-text-field
            class=""
            outlined
            :placeholder="$t('name')"
            append-icon="search"
            v-model="search"
            @change="onSearch(search)"
            clearable
          />
          <v-btn icon @click="loadData">
            <v-icon>refresh</v-icon>
          </v-btn>
        </div>
        <v-select
          class=""
          tage="Product Category"
          v-model="mCategory"
          :items="categories"
          item-value="id"
          :item-text="(item) => `${item.abbr} - ${item.name}`"
          @change="onCategoryChanged('')"
          return-object
          :placeholder="$t('category')"
          clearable
          outlined
        />
        <v-select
          class=""
          :items="groups"
          v-model="mGroup"
          item-value="id"
          item-text="name"
          @change="onCategoryChanged('')"
          return-object
          :placeholder="$t('group')"
          clearable
          outlined
        />
        <v-select
          tage="Product Sub Group"
          v-model="mSubGroup"
          :items="subGroup"
          item-value="id"
          :item-text="(item) => `${item.abbr} - ${item.name}`"
          @change="onCategoryChanged('')"
          return-object
          :placeholder="$t('sub_group')"
          clearable
          outlined
        />
        <div style="overflow: auto" class="page-service-center"></div>
      </v-card>
      <v-card outlined dense color="grayBg" class="pa-3 no_border hidden-sm-and-down">
        <v-card outlined dense class="no_border hidden-sm-and-down">
          <!-- loading -->
          <div>
            <LoadingMe
              :isLoading="showLoading"
              type="loading"
              :fullPage="false"
              :myLoading="true"
            />
          </div>
          <kendo-datasource
            ref="serviceItemCenterDS"
            :data="ServiceCenterList"
            :schema="gridSchema"
            :sort="sortDefinition"
          >
          </kendo-datasource>
          <kendo-grid
            id="gridServiceCenter"
            class="grid-center center_heigth"
            :change="onChanged"
            :data-source-ref="'serviceItemCenterDS'"
            :selectable="true"
            :persistSelection="true"
            :noRecords="true"
            :scrollable="true"
            :navigatable="true"
            :height="535"
            :pageable-numeric="false"
            :pageable-previous-next="false"
            :pageable-messages-display="'Showing {2} data items'"
          >
            <kendo-grid-column
              :field="'name'"
              :template="'<span>#=sku# - #=name#</span>'"
              :title="'Name'"
              :group-header-template="'#=value#'"
            />
          </kendo-grid>
        </v-card>
      </v-card>
    </v-col>
    <v-col sm="8" cols="12" class="py-0 pl-2">
      <v-tabs>
        <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-information-variant</v-icon>
          </span>
          <span class="hidden-sm-and-down text-uppercase">
            {{ $t("info") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
          <span class="hidden-sm-and-down text-uppercase">
            {{ $t("txn_") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
          <span class="hidden-sm-and-down text-uppercase">
            {{ $t("uom") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
          <span class="hidden-sm-and-down text-uppercase">
            {{ $t("price") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
          <span class="hidden-sm-and-down text-uppercase">
            {{ $t("image") }}
          </span>
        </v-tab>

        <!-- <v-btn
          to="service"
          color="primary"
          class="text-capitalize white--text absRight"
          >{{ $t("add_service") }}
        </v-btn> -->
        <v-tab-item>
          <v-col sm="12" cols="12" class="pt-0 pr-0 pl-0">
            <v-row class="grayBg">
              <v-col sm="12" cols="12" class="">
                <v-card outlined color="white" class="pa-3">
                  <Info :service="info" @onUpdate="callback" />
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-tab-item>
        <v-tab-item>
          <v-col sm="12" cols="12" class="pt-0 pr-0 pl-0">
            <v-row class="grayBg">
              <v-col sm="12" cols="12" class="">
                <v-card outlined color="white" class="pa-3">
                  <Transactions :service="info" />
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-tab-item>
        <v-tab-item>
          <v-col sm="12" cols="12" class="pt-0 pr-0 pl-0">
            <v-row class="grayBg">
              <v-col sm="12" cols="12" class="">
                <v-card outlined color="white" class="pa-3">
                  <Uom :service="info" />
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-tab-item>
        <v-tab-item>
          <v-col sm="12" cols="12" class="pt-0 pr-0 pl-0">
            <v-row class="grayBg">
              <v-col sm="12" cols="12" class="">
                <v-card outlined color="white" class="pa-3">
                  <Price :service="info" />
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-tab-item>
        <v-tab-item>
          <v-col sm="12" cols="12" class="pt-0 pr-0 pl-0">
            <v-row class="grayBg">
              <v-col sm="12" cols="12" class="">
                <v-card outlined color="white" class="pa-3">
                  <Images :service="info" @onUpdate="callback" />
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-tab-item>
      </v-tabs>
    </v-col>
  </v-row>
</template>
<script>
import kendo from "@progress/kendo-ui";

const $ = kendo.jQuery;
// const serviceItemHandler = require("@/scripts/serviceItemHandler");
const categoryHandler = require("@/scripts/categoryHandler");
const groupHandler = require("@/scripts/groupHandler");
const subGroupHandler = require("@/scripts/subGroupHandler");
const productHandler = require("@/scripts/productHandler");
// ac biz
const loanHandler = require("@/scripts/loanHandler")
import {dataStore} from '@/observable/store'

export default {
  // props: ['service'],
  components: {
    Transactions: () => import(`./Transactions`),
    Info: () => import(`./Info`),
    Uom: () => import(`./Uom`),
    Price: () => import(`./Price`),
    Images: () => import(`./Images`),
    LoadingMe: () => import(`@/components/Loading`),
  },
  data: () => ({
    serviceItems: [],
    isLoaded: true,
    showLoading: false,
    info: {},
    mCategory: "",
    categories: [],
    search: "",
    gridSchema: {
      model: {
        id: "id",
      },
    },
    groups: [],
    mGroup: {},
    mSubGroup: {},
    subGroups: [],
    subGroup: [],
    totalService: 0,

    txnServiceCenter: [],
    ServiceCenterList: [],
    toalServicePerPage: 0,
    sortDefinition: [{ field: "sku", dir: "asc" }],
    paging: {},
    action: "",
    params: {},
  }),
  watch: {
    service() {
      window.console.log("hello");
    },
  },
  async mounted() {
    await this.loadCategory();
    await this.loadGroup();
    await this.loadSubGroup();
    this.loadPage(this);
    this.itemRetuned(this);
    this.disabledNextPage(true);
  },
  methods: {
    async loadData() {
      await this.loadCategory();
      await this.loadGroup();
      await this.loadSubGroup();
    },
    async serviceInfo() {
      this.$emit("onUpdate", this.service);
    },
    async onChanged() {
      let grid = kendo.jQuery("#gridServiceCenter").data("kendoGrid");
      let selectedItem = grid.dataItem(grid.select());
      this.info = selectedItem;
      if (this.info.hasOwnProperty("saleUOM")) {
        const sUOMId = this.info.saleUOM.id;
        if (sUOMId.startsWith("s-") === false) {
          this.info.saleUOM.id = "s-" + sUOMId;
        } else {
          this.info.saleUOM.id = sUOMId;
        }
      }
      if (this.info.hasOwnProperty("purchaseUOM")) {
        const pUOMId = this.info.purchaseUOM.id;
        if (pUOMId.startsWith("p-") === false) {
          this.info.purchaseUOM.id = "p-" + pUOMId;
        } else {
          this.info.purchaseUOM.id = pUOMId;
        }
      }
      this.$emit("onUpdate", selectedItem);
      window.console.log("service", this.info);
    },
    // async loadProducts() {
    //   this.isLoaded = true;
    //   this.showLoading = true;
    //   new Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve("resolved");
    //       serviceItemHandler.get().then((res) => {
    //         this.showLoading = false;
    //         this.isLoaded = false;
    //         this.serviceItems = res;
    //         window.console.log(res);
    //       });
    //     }, 100);
    //   });
    // },
    async onCategoryChanged(search) {
      const groupId = (this.mGroup || {}).id || "";
      this.subGroup = this.subGroups.filter((k) => k.group.id === groupId);
      if (this.subGroup.length === 0) {
        this.mSubGroup = {};
      }
      this.txnServiceCenter = [];
      this.loadPage(this);
      this.paging = {};
      this.loadVariantCenter(search);
    },
    async loadGroup() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.isLoaded = true;
          this.showLoading = true;
          const param = {
            pattern: "grp#Service",
          };
          groupHandler.getAllv2(param).then((res) => {
            this.groups = res.data.data; // filter((m) => m.category.type.name === "Service");
            window.console.log(res, "group");
          });
        }, 10);
      });
    },
    async loadCategory() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.isLoaded = true;
          this.showLoading = true;
          const param = {
            pattern: "cat#Service",
          };
          categoryHandler.getAllv2(param).then((res) => {
            if(this.appType == 'Supply' || this.appType == 'Marketing' || this.appType == 'Service'){
                this.loadBizSetting(res.data.data);
              } else {
                this.showLoading = false;
                this.isLoaded = false;
                this.categories = res.data.data;
                if (this.categories.length > 0) {
                  this.mCategory = this.categories[0];
                  this.onCategoryChanged();
                }
              }
          });
        }, 10);
      });
    },
    callback(service) {
      // this.service = service
      const index = this.serviceItems.findIndex((item) => {
        return service.id === item.id;
      });
      if (index < 0) {
        this.serviceItems.push(service);
      } else {
        this.serviceItems.splice(index, 1, service);
      }
      // window.console.log('from Info', this.serviceItems)
    },
    async loadSubGroup() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          const param = {
            pattern: "sgr#Service",
          };
          subGroupHandler.getAllv2(param).then((res) => {
            this.showLoading = false;
            this.subGroups = res.data.data;
          });
        }, 10);
      });
    },
    onSearch(search) {
      this.txnServiceCenter = [];
      this.loadPage(this);
      this.paging = {};
      this.loadVariantCenter(search);
    },
    async loadVariantCenter(search) {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.ServiceCenterList = [];
          const category = this.mCategory || {};
          const categoryId = category.id || "";
          const group = this.mGroup || {};
          const groupId = group.id || "";
          const subGroup = this.mSubGroup || {};
          const subGroupId = subGroup.id || "";
          // const switch_ = this.switchModelVariant || 0;
          this.params = {
            ctid: categoryId,
            grid: groupId,
            sgid: subGroupId,
            key: this.paging,
            search: search,
            // searchAs: switch_ ? 1 : 0,
            type: "Service",
          };
          this.showLoading = true;
          this.disabledNextPage(true);
          productHandler.center(this.params).then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoading = false;
              let responseData = res.data.data || [];
              let total = res.data.total || 0;
              if(this.appType == 'Supply' || this.appType == 'Marketing' || this.appType == 'Service') {
                let newData = []
                responseData.forEach(resD => {
                  this.categories.forEach(cat => {
                    if(resD.category.id === cat.id){
                      newData.push(resD)
                    }
                  })
               })
               responseData = newData
               total = responseData.length
              }
              this.showLoading = false;
              this.ServiceCenterList = responseData;
              this.paging = res.data.key;
              window.console.log("key", res.data.key);
              this.txnServiceCenter.push(responseData);

              this.toalServicePerPage = this.ServiceCenterList.length;
              this.totalService = total;

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
    async loadPage(that) {
      $(".page-service-center").html(`
                <span class="mt-2 by-service-center-item-returned">0</span><br/>
                <div style="display: flex; flex-direction: 'row'">
                    <button class="by-service-center-next-page" title="previous" style="width: 24px; font-size: 19px; margin-top: -6px;"> < </button>
                    <ul class="by-service-center-page-number page_scroll" style="display: flex;list-style: none; padding-left: 0px;">
                        <li style="padding: 6px; padding-bottom: 0px;"  data-page="1" class="by-service-center-page-link text-bold-link" >1</li>
                    </ul>
                    <button class="by-service-center-next-page" title="next" style="width: 24px; font-size: 19px;margin-top: -6px;"> > </button>
                </div>
            `);
      $(document).on("click", ".by-service-center-page-link", function () {
        const page = $(this).data("page");
        $(".by-service-center-page-link").removeClass("text-bold-link");
        $(this).addClass("text-bold-link");
        that.backToPage(that, page - 1);
        window.console.log(page - 1);
      });
      // $(document).on('click', '.bycus-next-page', function () {
      $(".by-service-center-next-page").click(function () {
        const page_number = $(this)
          .parent()
          .children(".by-service-center-page-number")
          .find("li")
          .last()
          .data("page");
        window.console.log("by-service-center-page_number", page_number);
        const isPrevious = $(this).attr("title");
        if (isPrevious == "previous") {
          const currectpage = $(".text-bold-link").data("page");

          if (currectpage == 1) {
            return;
          }
          $(".by-service-center-page-link").removeClass("text-bold-link");
          $(`.by-service-center-page-link:eq(${currectpage - 1})`).addClass(
            "text-bold-link"
          );
          that.backToPage(that, currectpage - 2);
          window.console.log("this currectpage back", currectpage - 2);
        } else {
          $(".by-service-center-page-link").removeClass("text-bold-link");
          that.loadVariantCenter(that.search);
          $(this)
            .parent()
            .children(".by-service-center-page-number")
            .append(
              `<li class="by-service-center-page-link text-bold-link" style="padding: 6px; padding-bottom: 0px;" data-page="${
                page_number + 1
              }">${page_number + 1}</li>`
            );
        }
        window.console.log("this", page_number + 1);
      });
    },
    itemRetuned(that) {
      let totalRow = 0;
      that.txnServiceCenter.forEach((k) => {
        totalRow += k.length;
      });
      $(".by-service-center-item-returned").text(
        "Items returned (" + totalRow + " of " + that.totalService + ")"
      );
    },
    disabledNextPage(value) {
      $(".by-service-center-next-page").prop("disabled", value);
    },
    backToPage(that, index) {
      try {
        const byProduct = that.txnServiceCenter.at(index);
        that.ServiceCenterList = byProduct;
        // that.refreshGridData(customer)
        window.console.log("that.txnServiceCenter[index]", byProduct);
      } catch (e) {
        window.console.log("ERROR on backToPage", index);
      }
    },
    async loadBizSetting(allCat) {
      loanHandler.businessSettingGet().then(res => {
        this.showLoading = true
        if (res.data.statusCode === 200) {
          this.showLoading = false
          let s = res.data.data.filter((obj) => {
            return obj.type == dataStore.businessType
          })
          if (s.length > 0) {
            if (s[0].serviceCategories.length > 0) {
              let cates = []
              s[0].serviceCategories.forEach(m => {
                let ca = allCat.filter((o) => {return o.id == m.id})
                if(ca.length > 0){
                  cates.push(ca[0])
                }
              })
              this.categories = cates
              if (this.categories.length > 0) {
                  this.mCategory = this.categories[0];
                  this.onCategoryChanged();
              }
            }
          } 
        }
      })
    },
  },
  computed:{
    appType(){
      return dataStore.productType;
    }
  }
};
</script>
<style scoped>
.v-tab {
  justify-content: left;
}

.v-tab--active {
  background-color: rgb(255, 255, 255);
}

.v-menu__content {
  top: 141px !important;
  left: 1098px !important;
}

.v-menu__content .v-list .v-list-item {
  min-height: 35px !important;
}

.tab_wrapper {
  position: relative;
  display: inherit;
}

.v-tab {
  min-width: 30px;
  font-size: 15px;
  text-transform: capitalize;
}

.v-icon--left {
  margin-right: 0px;
}

.Light_grey {
  background-color: #f8f8f9 !important;
}

.theme--light.v-tabs >>> .v-tabs-bar {
  border-bottom: none !important;
}

.v-tabs-bar {
  border-bottom: none !important;
}

.v-card__text {
  padding: 0 !important;
}

.v-window-item--active {
  padding-left: 12px !important;
  padding-right: 12px !important;
}

.grayBg {
  background-color: #f8f8f9;
}

.v-tab--active {
  background-color: #e5effa;
  color: #000;
}

@media (max-width: 576px) {
  .v-tab {
    min-width: auto !important;
  }

  .paddingLeft {
    margin-left: 15px;
  }
}
</style>
