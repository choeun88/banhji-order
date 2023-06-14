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
          <span class="text-capitalize text-left">
            {{ $t("sale_summary") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="text-capitalize text-left">
            {{ $t("sale_detail_by_sale_unit_and_order_type") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="text-capitalize text-left">
            {{ $t("sale_summary_by_payment_method") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
          <span class="hidden-sm-and-down text-capitalize text-left">
            {{ $t("sale_summary_by_campaigns") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="text-capitalize text-left">
            {{ $t("employee_sale_summary") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="text-capitalize text-left">
            {{ $t("sale_summary_by_partner") }}
          </span>
        </v-tab>
        
        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 pr-0">
              <Summary :sSumary="s1" />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 pr-0">
              <BySaleUnitAndType :saleDetails="s5"/>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 pr-0">
              <ByPaymentMethod :saleMethods="s2" />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 pr-0">
              <ByCampaigns :saleCampaign="s3" />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 pr-0">
              <EmployeeSaleSummary :saleEmps="s4" />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 pr-0">
              <ByPartner :salePartners="s6" />
            </v-card-text>
          </v-card>
        </v-tab-item>
        
        
      </v-tabs>
      
    </v-col>
  </v-row>
</template>

<script>
// import DatePickerComponent from "@/components/custom_templates/DatePickerComponent";
import { i18n } from '@/i18n';
const commerceHandler = require("@/scripts/commerce/handler/commerceHandler")
const cookieJS = require("@/cookie.js");
import kendo from "@progress/kendo-ui"
const { instituteId } = cookieJS.getCookie()
export default {
  name: "SaleReports",
  props: {saleReport: {}},
  components: {
    ByPaymentMethod: () => import("./ByPaymentMethod"),
    ByCampaigns: () => import("./ByCampaigns"),
    EmployeeSaleSummary: () => import("./EmployeeSaleSummary"),
    ByPartner: () => import("./ByPartner"),
    BySaleUnitAndType: () => import("./BySaleUnitAndType"),
    Summary: () => import ("./Summary"),
    // "app-datepicker": DatePickerComponent,
  },
  data: () => ({
    isHide: false,
    startDate: new Date().toISOString().substring(0, 10),
    endDate: new Date().toISOString().substring(0, 10),
    register: '',
    registers: [],
    activeStore: localStorage.getItem(instituteId + 'commStore') != null ? JSON.parse(localStorage.getItem(instituteId + 'commStore')) : {},
    mDateSorter: 3,
    allCount: true,
    allRegister: [],
    txns: [],
    number_format: 'n2',
    btxns: [],
    s1: [],
    s2: [],
    s3: [],
    s4: [],
    s5: [],
    s6: []
  }),
  computed: {
    dateSorters() {
        return [
            {id: 1, name: i18n.t('today')},
            {id: 2, name: i18n.t('this_week')},
            {id: 3, name: i18n.t('this_month')},
            {id: 4, name: i18n.t('this_year')}
        ]
    }
  },
  watch: {
    'saleReport': 'prepareData',
  },
  methods: {
    prepareData(){
      window.console.log(this.saleReport, 's sum sale tab')
      this.s1 = this.saleReport.saleSummary
      this.s2 = this.saleReport.saleMethod
      this.s3 = this.saleReport.saleCampaign
      this.s4 = this.saleReport.saleEmp
      this.s5 = this.saleReport.saleDetail
      this.s6 = this.saleReport.salePartner
    },
    hideTabs() {
      this.isHide = !this.isHide;
    },
    search(key){
      let st = new Date(this.startDate + ' 00:00:00').getTime().toString();
      let ed = new Date(this.endDate + ' 23:59:59').getTime().toString();
      this.txns = []
      let d = {
          epsAtt: {
              ':dateSk': this.activeStore.pk + '/salesumarry',
              ':startDate': st,
              ':endDate': ed,
          },
          index: 'dateSk-searchDate-index',
          keyCondition: 'dateSk = :dateSk and searchDate between :startDate and :endDate',
          key: key
      }
      if(this.register != ''){
        d = {
            epsAtt: {
                ':regiPk': this.register + '/salesumarry',
                ':startDate': st,
                ':endDate': ed,
            },
            index: 'regiPk-searchDate-index',
            keyCondition: 'regiPk = :regiPk and searchDate between :startDate and :endDate',
            key: key
        }
      }
      this.showLoading = true
      let ds = this.$refs.saleSummary.kendoWidget(),
          total = ds.total()
      if(Object.keys(key).length <= 0){
          ds.data([])
      }
      commerceHandler.reportGets(d).then(res => {
          let data = res.data.data.Items
          if(data.length > 0){
              data.sort(function (a, b) {
                  return parseFloat(new Date(a.issuedDate).getTime()) - parseFloat(new Date(b.issuedDate).getTime())
              })
              data.forEach(d => {
                  if(d.txnNumber != ''){
                      let register = this.allRegister.filter((r)=>{return r.pk == d.regiPk.replace("/salesumarry", "")})
                      // window.console.log(register, this.allRegister, d.regiPk)
                      let comission = d.comission || 0
                      ds.insert(total, {
                          issuedDate: d.issuedDate,
                          register: register[0].name,
                          number: d.txnNumber,
                          subTotal: d.subTotal,
                          dis: d.dis,
                          comission: comission,
                          tax: d.tax,
                          cashier: d.cashier,
                          number_format: this.number_format,
                          amount: d.amount
                      })
                  }
              })
              if(res.data.data.hasOwnProperty('LastEvaluatedKey')){
                  let dkey = res.data.data.LastEvaluatedKey
                  this.search(dkey)
              }else{
                  this.showLoading = false
              }
          }else{
              this.showLoading = false
          }
      })
    }, 
    onSorterChanges(val) {
        let today = new Date()
        switch (val) {
            case 1:
                this.startDate = kendo.toString(today, 'yyyy-MM-dd')
                this.endDate = kendo.toString(today, 'yyyy-MM-dd')
                break
            case 2:
                var first = today.getDate() - today.getDay(),
                    last = first + 6
                this.startDate = kendo.toString(new Date(today.setDate(first)), 'yyyy-MM-dd')
                this.endDate = kendo.toString(new Date(today.setDate(last)), 'yyyy-MM-dd')
                break
            case 3:
                this.startDate = kendo.toString(new Date(today.getFullYear(), today.getMonth(), 1), 'yyyy-MM-dd')
                this.endDate = kendo.toString(new Date(today.getFullYear(), today.getMonth(), 31), 'yyyy-MM-dd')
                break
            case 4:
                this.startDate = kendo.toString(new Date(today.getFullYear(), 0, 1), 'yyyy-MM-dd')
                this.endDate = kendo.toString(new Date(today.getFullYear(), 11, 31), 'yyyy-MM-dd')
                break
            default:
                this.startDate = ""
                this.endDate = ""
        }
    },
    loadRegister(){
        commerceHandler.registerGets().then(res => {
            let d = res.data.data
            if(d.length > 0){
                let rr = []
                d.forEach(r=>{
                    if(r.store == this.activeStore.pk){
                        rr.push(r)
                    }
                })
                this.allRegister = d
                this.registers = rr
            }
        })
    },
  },
  mounted: async function () {
      await this.loadRegister()
      this.onSorterChanges(3)
  }
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
