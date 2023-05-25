<template>
  <v-row class="">
    <v-col sm="12" cols="12" class="pt-0">
      <v-tabs>
        <v-tab>
          <span class="text-uppercase">
            {{ $t("list") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="text-uppercase">
            {{ $t("detail") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="text-uppercase">
            {{ $t("summary") }}
          </span>
        </v-tab>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <PaymentOption />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="">
              <ReceiptByPaymentOptions />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="">
              <ReceiptByPaymentOptionSummary />
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "CustomerDeposits",
  components: {
    PaymentOption: () => import("./PaymentOption"),
    ReceiptByPaymentOptions: () => import("./ReceiptByPaymentOptions"),
    ReceiptByPaymentOptionSummary: () => import("./ReceiptByPaymentOptionSummary"),
  },
  data: () => ({}),
  watch: {},
  methods: {},
};
</script>
<style scoped>
/* .v-menu__content{
  top: 141px !important;
  left: 1098px !important;
} */
.v-menu__content .v-list .v-list-item {
  min-height: 35px !important;
}

.tab_wrapper {
  position: relative;
  display: inherit;
}

.v-tab {
  min-width: 30px;
  font-size: 17px;
  text-transform: capitalize;
}

.v-icon--left {
  margin-right: 0px;
}

.theme--light.v-tabs > .v-tabs-bar {
  border-bottom: 1px solid #ddd !important;
}

.menuable__content__active {
  left: 448px !important;
}

.v-tab--active {
  background-color: #e5effa;
  color: #000;
}

.theme--light.v-tabs >>> .v-tabs-bar {
  border-bottom: 1px solid #ddd !important;
}

.v-card__text {
  padding: 0 !important;
}
</style>
