<template>
  <v-row>
    <v-col sm="12" cols="12" class="pt-0">
      <v-tabs>
        <v-tab>
          <span class="text-uppercase">
            {{ $t("directory") }}
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
        <v-tab>
          <span class="text-uppercase">
            {{ $t("margin") }}
          </span>
        </v-tab>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 px-0">
              <Directory />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 px-0">
              <ServiceSaleTransaction />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 px-0">
              <ServiceSummary />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 px-0">
              <Margin />
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "ServiceReportTab",
  data: () => ({
    isHide: false,
  }),
  props: {},
  methods: {
    hideTabs() {
      this.isHide = !this.isHide;
    },
  },
  components: {
    ServiceSaleTransaction: () => import("./ServicesSaleTransactions"),
    ServiceSummary: () => import("./ServiceSummary"),
    Directory: () => import("./ServiceDiretory"),
    Margin: () => import("./MarginAnalysis"),
  },
};
</script>
<style scoped>
.v-tab {
  min-width: 30px;
  font-size: 16px;
  text-transform: capitalize;
}

.tab_setting .v-tab--active {
  font-weight: 700;
  color: #000;
  background-color: rgb(248 248 249) !important;
  border-left: none;
}
.tabs_2 .v-tab--active {
  background-color: #f8f8f9 !important;
  border-bottom: 4px solid #92d050;
  border-left: none;
}
.theme--light.v-card > .v-card__text,
.theme--light.v-card .v-card__subtitle {
  color: rgba(0, 0, 0, 1) !important;
}
.v-tab--active {
  background-color: #e5effa;
  color: #000;
}
</style>
