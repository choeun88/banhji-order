<template>
  <div>
    <v-select
      :loading="fiscalDates.length <= 0"
      class="mt-1"
      placeholder="Select Fiscal Date"
      v-model="fiscalDate"
      :items="fiscalDates"
      item-text="start_date"
      item-value="uuid"
      @change="
        emitFiscalDate();
        onChanged();
      "
      return-object
      outlined
    >
      <template slot="selection" slot-scope="{ item }">
        {{ Helper.formatFiscalDate(item.start_date) }} -
        {{ Helper.formatFiscalDate(item.end_date) }}
      </template>
      <template slot="item" slot-scope="{ item }">
        {{ Helper.formatFiscalDate(item.start_date) }} -
        {{ Helper.formatFiscalDate(item.end_date) }}
      </template>
    </v-select>
  </div>
</template>

<script>
import Helper from "@/helper.js";

/* Store */
import store from "@/store";
const institute = store.state.institute.institute;

export default {
  name: "FiscalDateDropDownList",
  props: {
    initFiscalDate: {
      type: Object,
    },
  },
  data() {
    return {
      Helper: Helper,
      fiscalDate: institute.fiscalDate[0],
      fiscalDates: institute.fiscalDate,
    };
  },
  methods: {
    emitFiscalDate() {
      this.$emit("emitFiscalDate", this.fiscalDate);
    },
    onChanged() {
      this.$emit("onChanged");
    },
  },
  watch: {
    initFiscalDate() {
      this.fiscalDate = this.initFiscalDate;
    },
  },
  mounted() {
    /* Initial Fiscal Date */
    this.fiscalDate = this.initFiscalDate;
  },
};
</script>
<style scoped>
.v-select__selections input {
  display: none !important;
}
</style>
