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
            {{ $t("cash_sale") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
          <span class="hidden-sm-and-down text-capitalize text-left">
            {{ $t("credit_sale") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
          <span class="hidden-sm-and-down text-capitalize text-left">
            {{ $t("internal_usage") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
          <span class="hidden-sm-and-down text-capitalize text-left">
            {{ $t("pre_order") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
          <span class="hidden-sm-and-down text-capitalize text-left">
            {{ $t("other_order") }}
          </span>
        </v-tab>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 pr-0">
              <CashSale :cashSale="cashSales"/>
            </v-card-text>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 pr-0">
              <CreditSale :creditSale="creditSales" />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 pr-0">
              <InternalUsage :internalUsage="internalUsages"/>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 pr-0">
              <PreOrder :preOrder="preOrders" />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 pr-0">
              <OtherOrder :otherOrder="otherOrders" />
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
      
    </v-col>
  </v-row>
</template>

<script>
import { i18n } from '@/i18n';
export default {
  name: "TxnTabReport",
  components: {
    CashSale: () => import("./CashSale"),
    CreditSale: () => import("./CreditSale"),
    InternalUsage: () => import("./InternalUsage"),
    PreOrder: () => import("./PreOrder"),
    OtherOrder: () => import("./OtherOrder")
  },
  data: () => ({
    isHide: false,
    creditSales: [],
    cashSales: [],
    internalUsages: [],
    preOrders: [],
    otherOrders: [],
  }),
  watch: {
    'transactions': 'prepareData',
  },
  props: {transactions: {}},
  methods: {
    hideTabs() {
      this.isHide = !this.isHide;
    },
    prepareData(){
      window.console.log(this.transactions, 'transaction tab')
      this.cashSales = []
      this.creditSales = []
      this.internalUsages = []
      this.preOrders = []
      this.otherOrders = []
      if(this.transactions.length > 0){
        this.transactions.forEach(c=>{
          if(c.paymentMethod == 'cash' || c.paymentMethod == 'bank' || c.paymentMethod == 'card' || c.paymentMethod == 'khqr'){
            this.cashSales.push({
              register: c.registerName,
              number: c.txnNumber,
              issuedDate: c.issuedDate,
              subTotal: c.subTotal,
              discount: c.discount,
              comission: c.comission,
              tax: c.tax,
              total: c.total,
              paymentMethod: i18n.t(c.paymentMethod),
              userPin: c.pinUser
            })
          }
          if(c.isCredit){
            this.creditSales.push({
              register: c.registerName,
              number: c.txnNumber,
              issuedDate: c.issuedDate,
              subTotal: c.subTotal,
              discount: c.discount,
              comission: c.comission,
              tax: c.tax,
              total: c.total,
              paymentMethod: c.paidBy,
              userPin: c.pinUser
            })
          }
          if(c.type == 'internal'){
            this.internalUsages.push({
              register: c.registerName,
              number: c.txnNumber,
              issuedDate: c.issuedDate,
              subTotal: c.subTotal,
              discount: c.discount,
              comission: c.comission,
              tax: c.tax,
              total: c.total,
              userPin: c.pinUser
            })
          }
          if(c.type == 'preorder'){
            this.preOrders.push({
              register: c.registerName,
              number: c.txnNumber,
              issuedDate: c.issuedDate,
              subTotal: c.subTotal,
              discount: c.discount,
              comission: c.comission,
              tax: c.tax,
              total: c.total,
              paymentMethod: i18n.t(c.paymentMethod),
              userPin: c.pinUser
            })
          }
          if(c.type == 'otherorder'){
            this.otherOrders.push({
              register: c.registerName,
              number: c.txnNumber,
              issuedDate: c.issuedDate,
              subTotal: c.subTotal,
              discount: c.discount,
              tax: c.tax,
              total: c.total,
              orderFrom: c.orderFrom
            })
          }
        })
      }
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
