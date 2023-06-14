<template>
  <v-row class="">
    <v-col sm="12" cols="12" class="pt-4 pb-md-0">
      <v-tabs
        vertical
        class="tab_setting"
        slider-color="grayBg"
        slider-size="7"
        :class="{
          tab_product_service_hide: isHide,
          tab_product_service_show: !isHide,
        }"
      >
        <span class="hideAbs">
          <v-icon size="16" class="arr_icon" @click="hideTabs" v-if="!isHide">
            mdi-chevron-left-circle
          </v-icon>
          <v-icon size="16" class="arr_icon1" @click="hideTabs" v-if="isHide">
            mdi-chevron-right-circle
          </v-icon>
        </span>
        <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
          <span class="hidden-sm-and-down text-capitalize text-left">
            {{ $t("sale_summary_by_items_report") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="text-capitalize text-left">
            {{ $t("sale_detail_by_items_report") }}
          </span>
        </v-tab>
        
        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 pr-0">
              <Summary :saleSummary="s1" />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 pr-0">
              <Detail :saleDetail="s1" />
            </v-card-text>
          </v-card>
        </v-tab-item>
        
       
      </v-tabs>
      
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "ItemReport",
  props: {itemReport: {}},
  components: {
    Detail: () => import("./Detail"),
    Summary: () => import("./Summary")
  },
  watch: {
    'itemReport': 'prepareData',
  },
  data: () => ({
    isHide: false,
    s1: []
  }),
  methods: {
    hideTabs() {
      this.isHide = !this.isHide;
    },
    prepareData(){
      window.console.log(this.itemReport, 'item report tab')
      this.s1 = this.itemReport.itemDetail
    },
  },
};
</script>
<style scoped>
.arr_icon {
  color: #2ca01c;
}

.arr_icon1 {
  color: #4c9aff;
  color: #2ca01c;
}

.v-tab {
  justify-content: left;
  font-size: 16px;
}

.v-tab--active {
  background-color: rgb(255, 255, 255);
}

.tab_setting .v-tab--active {
  font-weight: 700;
  color: #000;
}

.v-tab--active {
  background-color: #ffffff !important;
  border-bottom: 4px solid #92d050;
  border-left: none;
}

.tab_product_service_show.theme--light .v-slide-group__content {
  width: 140px !important;
}

p {
  color: rgba(0, 0, 0, 0.87);
}

@media (max-width: 576px) {
  .tab_setting.theme--light.v-tabs.tab_setting > .v-tabs-bar {
    width: 55px !important;
  }

  .hideAbs {
    display: none !important;
  }
}
</style>
