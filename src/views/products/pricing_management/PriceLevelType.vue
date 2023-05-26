<template>
  <v-row>
    <v-col sm="12" cols="12" class="grayBg px-6">
      <v-card color="white" class="pa-3 no_border" elevation="0">
        <v-row>
          <v-col sm="8" class="py-0">
              <h2 class="mb-1 font_20">{{ $t("price_level_type") }}</h2>
            <p class="mb-0">{{ $t('price_level_type_desc') }}</p>
          </v-col>
        </v-row>
        <v-row class="mt-0">
          <v-col sm="12" cols="12" class="pb-0">
            <template>
              <kendo-datasource ref="priceTypeDS"
                                :data="itemList"/>
              <kendo-grid id="gridPriceType" class="grid-function"
                          :data-source-ref="'priceTypeDS'"
                          :editable="false"
                          :navigatable="true"
                          :noRecords="true"
                          :scrollable-virtual="true">
                <kendo-grid-column
                    :field="'no'"
                    :title="'no'"
                    :template="rowNumberTmpl"
                    :width="50"
                    :column-menu="false"
                    :headerAttributes="{ style: 'background-color: #EDF1F5;', class: 'text-center'	}"
                    :attributes="{style: 'text-align: center'}"/>
                <kendo-grid-column
                    :field="'name'"
                    :attributes="{class:'tb_name_td'}"
                    :title="$t('name')"
                    :width="120"
                    :template="'<span>#=name#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                <!--                                <kendo-grid-column-->
                <!--                                    :field="'action'"-->
                <!--                                    :title="$t('action')"-->
                <!--                                    :width="70"-->
                <!--                                    :command="[{iconClass: 'k-icon k-i-edit', text: 'Edit', click: goEdit }]"-->
                <!--                                    :headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"/>-->
              </kendo-grid>
            </template>
            <LoadingMe
                :isLoading="showLoading"
                :fullPage="false"
                :myLoading="true"/>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-dialog persistent v-model="dialogM" max-width="400px">
      <v-card>
        <div class="modal_header">
          <v-card-title>{{ $t('type') }}</v-card-title>
          <v-icon class="btn_close" @click="dialogM = false">close</v-icon>
        </div>
        <v-card-text class="modal_text_content">
          <v-row>
            <v-col sm="6" cols="12" class="pb-0">
              <label>{{ $t('name') }}</label>
              <v-text-field class=" my-2"
                            v-model="priceLevelType.name"
                            outlined
                            tage="priceLevelType"
                            clearable/>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="px-5 py-2">
          <v-row>
            <v-col sm="6" cols="6" class="py-0 text-left">
              <v-btn color="black" outlined
                     class=" text-capitalize  black--text float-left"
                     @click="dialogM = false">{{ $t('cancel') }}
              </v-btn>
            </v-col>
            <v-col sm="6" cols="6" class="py-0 text-right">
              <v-btn color="primary" class="px-3  white--text text-capitalize"
                     @click="onSaveClose">
                {{ $t('save_close') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import PriceLevelTypeModel from "@/scripts/price-level-type/model/PriceLevelType";
import kendo from "@progress/kendo-ui";

const $ = require("jquery")
const priceLevelHandler = require("@/scripts/priceLevelHandler")
const priceLevelTypeModel = new PriceLevelTypeModel({})
export default {
  data: () => ({
    priceLevelType: priceLevelTypeModel,
    itemList: [],
    showLoading: false,
    dialogM: false,
    group: {field: 'type'},
  }),
  props: {},
  methods: {
    rowNumberTmpl(dataItem) {
      let ds = this.$refs.priceTypeDS.kendoWidget(),
          index = ds.indexOf(dataItem);
      return index + 1;
    },
    goEdit(e) {
      e.preventDefault();
      let grid = kendo.jQuery("#gridPriceType").data("kendoGrid");
      let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
      this.priceLevelType = dataItem
      this.dialogM = true
    },
    close() {
      this.dialogM = false
    },
    clear() {
      this.itemList = []
    },
    async onSaveClose() {
      new Promise(resolve => {
        setTimeout(() => {
          resolve('resolved');
          let data = {
            "id": this.priceLevelType.id ? this.priceLevelType.id : '',
            "name": this.priceLevelType.name
          }
          priceLevelHandler.priceLevelTypeCreate(data).then(response => {
            if (response.data.statusCode === 201) {
              this.priceLevelType.name = ''
              this.dialogM = false
              this.loadPriceLevelType()
            }
          }).catch(e => {
            this.errors.push(e)
          })
        }, 300);
      })
    },
    async loadPriceLevelType() {
      new Promise(resolve => {
        setTimeout(() => {
          resolve('resolved');
          this.showLoading = true
          priceLevelHandler.priceLevelTypeList().then(res => {
            if (res.data.statusCode === 200) {
              this.showLoading = false
              this.itemList = res.data.data
            }
          })
        }, 300);
      })
    },
  },
  mounted: async function () {
    await this.loadPriceLevelType()
  },
  computed: {},
  components: {
    LoadingMe: () => import(`@/components/Loading`)
  },
};
</script>

<style scoped>
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

.lightGrey {
  background: #F8F8F9;
}

.text_tip {
  font-size: 9px;
  line-height: 10px;
}

.grid-function table th {
  background-color: #fff !important;
  text-align: left;
  font-family: 'Niradei-Bold', serif;
  font-size: 11px !important;
  color: #000 !important;
  border-top: thin solid rgba(0, 0, 0, 0.12);
  border-bottom: 3px solid rgba(0, 0, 0, 0.12) !important;
  border-left-style: dotted !important;
  text-transform: uppercase;
  vertical-align: middle;
  padding: 8px 12px !important;
}

.grid-function .k-grid-header .k-grid-filter, .grid-function .k-grid-header .k-header-column-menu {
  bottom: 3px !important;
}

@media (max-width: 576px) {
}
</style>
