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
          <span class="text-capitalize text-left">
            {{ $t("loyalty_card_list") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
          <span class="text-capitalize text-left">
            {{ $t("point_transaction") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
          <span class="hidden-sm-and-down text-capitalize text-left">
            {{ $t("top_up_transaction") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
          <span class="hidden-sm-and-down text-capitalize text-left">
            {{ $t("sale_gift_card") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
          <span class="hidden-sm-and-down text-capitalize text-left">
            {{ $t("sale_voucher") }}
          </span>
        </v-tab>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 pr-0">
              <LoyaltyCardList :cardList="cardList" />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 pr-0">
              <PointTransaction :pointTxns="pointTxns" />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 pr-0">
              <TopUpTransaction :topUpTxns="topUpTxns" />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 pr-0">
              <SaleGiftCard :saleGTxns="saleGTxns" />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 pr-0">
              <SaleVoucher :saleVTxns="saleVTxns" />
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
  name: "LoyaltyReport",
  components: {
    LoyaltyCardList: () => import("./LoyaltyCardList"),
    PointTransaction: () => import("./PointTransaction"),
    TopUpTransaction: () => import("./TopUpTransaction"),
    SaleGiftCard: () => import("./SaleGiftCard"),
    SaleVoucher: () => import("./SaleVoucher"),
  },
  data: () => ({
    isHide: false,
    cardList: [],
    pointTxns: [],
    topUpTxns: [],
    saleGTxns: [],
    saleVTxns: []
  }),
  watch: {
    'loyaltyReport': 'prepareData',
    'transactions': 'prepareData',
  },
  props: {loyaltyReport: [], transactions: []},
  methods: {
    hideTabs() {
      this.isHide = !this.isHide;
    },
    prepareData(){
      this.cardList = []
      if(this.loyaltyReport.length > 0){
        this.cardList =  this.loyaltyReport
        this.$emit("onUpdate", this.cardList);
      }
      this.pointTxns = []
      this.topUpTxns = []
      this.saleGTxns = []
      this.saleVTxns = []
      if(this.transactions.length > 0){
        this.transactions.forEach(t=>{
          // point transation
          let type = ''
          let point = 0
          if(Object.keys(t.pointEarn).length > 0){
            type = 'earn'
            point = t.pointEarn.pointEarn
          }
          if(t.paidBy == 'Point'){
            type = 'pay'
            point = t.total
          }
          if(type != ''){
            let card = t.pointPaid || {}
            let cnum = card.cardNum || ''
            let cphone = card.phoneNum || ''
            let cname = card.name || ''
            let cpaid = card.paidBy || ''
            this.pointTxns.push({
              register: t.registerName,
              cardNum: cnum,
              cardPhone: cphone,
              cardName: cname,
              cardPaid: i18n.t(cpaid),
              type: i18n.t(type.toLowerCase()),
              number: t.txnNumber,
              subTotal: t.subTotal,
              discount: t.discount,
              comission: t.comission,
              tax: t.tax,
              issuedDate: t.issuedDate,
              total: t.total,
              point: point
            })
          }
          // top up transaction
          if(t.isTopUpCounter || t.isTopUpGCard){
            this.topUpTxns.push({
              register: t.registerName,
              function: t.isTopUpCounter ? i18n.t('counter') : i18n.t('gift_card') + ' ('+ t.giftCard.number +')',
              number: t.txnNumber,
              subTotal: t.subTotal,
              discount: t.discount,
              comission: t.comission,
              tax: t.tax,
              issuedDate: t.issuedDate,
              total: t.total
            })
          }
          // sale gift card
          if(t.isSaleGCard){
            let cnum = ''
            let gcard = t.giftCard || {}
            if(Object.keys(gcard).length > 0){
              cnum = gcard.number
            }
            this.saleGTxns.push({
              register: t.registerName,
              cardNum: cnum,
              number: t.txnNumber,
              subTotal: t.subTotal,
              discount: t.discount,
              tax: t.tax,
              issuedDate: t.issuedDate,
              total: t.total
            })
          }
          // sale voucher
          if(t.isSaleVoucher){
            let cnum = ''
            let gcard = t.voucher || {}
            if(Object.keys(gcard).length > 0){
              cnum = gcard.number
            }
            this.saleVTxns.push({
              register: t.registerName,
              cardNum: cnum,
              number: t.txnNumber,
              subTotal: t.subTotal,
              discount: t.discount,
              tax: t.tax,
              issuedDate: t.issuedDate,
              total: t.total
            })
          }
        })
        this.$emit("onUpdate", this.pointTxns);
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
