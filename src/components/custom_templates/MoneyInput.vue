<template>
  <v-text-field ref="field"
                v-model="value"
                class=" col-sm-6"
                outlined
                @change="emitValue"/>
</template>

<script>
import AutoNumeric from "autonumeric"

export default {
  name: "MoneyInput",
  props: ['initValue'],
  data() {
    return {
      value: (this.initValue),
    }
  },
  mounted() {
     new AutoNumeric(this.$refs.field.$refs.input, AutoNumeric.getPredefinedOptions().decimalPlaces)
    // window.console.log(d.rawValue)
    // return d
    // return this.input_val
  },
  methods: {
    emitValue() {
      this.$emit('emitValue', (this.value))
    },
  },
  watch: {
    initValue() {
      this.value = this.initValue
    }
  }
};
</script>
