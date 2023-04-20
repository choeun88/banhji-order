<template>
  <v-select
      :loading="loading"
      class="mt-1"
      placeholder="Select Method"
      v-model="paymentMethod"
      :items="paymentOptions"
      item-text="name"
      item-value="id"
      @change="emitPaymentMethod"
      return-object
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
import {PaymentMethodModel} from "@/scripts/model/AppModels";

const {paymentOptionHandler} = require("@/scripts/AppHandlers");

export default {
  name: 'PaymentMethodDropDownList',
  props: {
    initPaymentMethod: {
      type: PaymentMethodModel,
    },
  },
  data() {
    return {
      paymentMethod: new PaymentMethodModel(),
      paymentOptions: [],
      loading: false
    }
  },
  methods: {
    emitPaymentMethod() {
      this.$emit('emitPaymentMethod', new PaymentMethodModel(this.paymentMethod));
    },
  },
  watch: {
    initPaymentMethod() {
      this.paymentMethod = this.initPaymentMethod;
    }
  },
  created() {
    this.loading = true
    // Call Payment Method List
    paymentOptionHandler.getAll()
        .then(res => {
          if (res) {
            let pmdList = [];
            res.data.data.forEach(value => {
              let pmd = new PaymentMethodModel(value);
              pmdList.push(pmd);
            });
            this.paymentOptions = pmdList;
          }
          this.loading = false
        })
  },
  mounted() {
    /* Initial Payment Method */
    this.paymentMethod = this.initPaymentMethod;
  }
}
</script>