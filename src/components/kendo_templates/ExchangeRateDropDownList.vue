<template>
  <v-select
      :loading="loading"
      class="mt-1"
      placeholder="Select Exchange Rate"
      :rules="[(v) =>!!v ||'Currency is required']"
      @change="emitCurrencyExchangeRate"
      v-model="currencyExchangeRate"
      :items="currencyExchangeRates"
      item-text="code"
      item-value="sk"
      return-object
      required
      outlined>
    <template slot="selection" slot-scope="{ item }">
      {{ item.name }}
    </template>
    <template slot="item" slot-scope="{ item }">
      {{ item.code }} - {{ item.name }}
    </template>
  </v-select>
</template>

<script>
import {ExchangeRateModel} from "@/scripts/model/AppModels";

const {exchangeRateHandler} = require("@/scripts/AppHandlers");

export default {
  name: 'ExchangeRateDropDownList',
  props: {
    initCurrencyExchangeRate: {
      type: ExchangeRateModel,
    },
  },
  data() {
    return {
      currencyExchangeRate: new ExchangeRateModel(),
      currencyExchangeRates: [],
      loading: false
    }
  },
  methods: {
    emitCurrencyExchangeRate() {
      this.$emit('emitCurrencyExchangeRate', new ExchangeRateModel(this.currencyExchangeRate));
    },
  },
  watch: {
    initCurrencyExchangeRate() {
      this.currencyExchangeRate = this.initCurrencyExchangeRate;
    }
  },
  created() {
    this.loading = true
    // Call Currency List
    exchangeRateHandler.getAll()
        .then(res => {
          if (res) {
            let xrateList = [];
            res.data.data.forEach(value => {
              let xrate = new ExchangeRateModel(value);
              xrateList.push(xrate);
            });
            this.currencyExchangeRates = xrateList;
          }
          this.loading = false
        })
  },
  mounted() {
    /* Initial Currency */
    this.currencyExchangeRate = this.initCurrencyExchangeRate;
  }
}
</script>