<template>
  <v-row>
    <v-col sm="4" cols="12" class="py-0">
      <v-select class="mt-1"
                :items="dateSorters"
                v-model="sorter"
                @change="onSorterChanges"
                outlined
                placeholder="Select"
      />
    </v-col>

    <v-col sm="4" cols="12" class="py-0">
      <app-datepicker :initialDate="startDate" @emitDate="startDate = $event" v-model="startDate"/>
    </v-col>

    <v-col sm="4" cols="12" class="py-0">
      <app-datepicker :initialDate="endDate" @emitDate="endDate = $event" v-model="endDate"/>
    </v-col>
  </v-row>
</template>

<script>
import kendo from '@progress/kendo-ui'
import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'

const {dateSorters} = require("@/scripts/default_setup/DateSearch.js");

export default {
  name: 'SearchDate',
  components: {
    'app-datepicker': DatePickerComponent,
  },
  props: ['initStartDate', 'initEndDate'],
  data() {
    return {
      startDate: this.initStartDate,
      endDate: this.initEndDate,
      dateSorters: dateSorters,
      sorter: 'This Month',
    }
  },
  methods: {
    emitStartDate() {
      this.$emit('emitStartDate', this.startDate)
    },
    emitEndDate() {
      this.$emit('emitEndDate', this.endDate)
    },
    // On Sorter Changes
    onSorterChanges() {
      let today = new Date();

      switch (this.sorter) {
        case "Today":
          this.startDate = kendo.toString(today, 'yyyy-MM-dd');
          this.endDate = kendo.toString(today, 'yyyy-MM-dd');

          break
        case "This Week":
          var first = today.getDate() - today.getDay(),
              last = first + 6;

          this.startDate = kendo.toString(new Date(today.setDate(first)), 'yyyy-MM-dd');
          this.endDate = kendo.toString(new Date(today.setDate(last)), 'yyyy-MM-dd');

          break
        case "This Month":
          this.startDate = kendo.toString(new Date(today.getFullYear(), today.getMonth(), 1), 'yyyy-MM-dd');
          this.endDate = kendo.toString(new Date(today.getFullYear(), today.getMonth() + 1, 0), 'yyyy-MM-dd');

          break
        case "This Year":
          this.startDate = kendo.toString(new Date(today.getFullYear(), 0, 1), 'yyyy-MM-dd');
          this.endDate = kendo.toString(new Date(today.getFullYear(), 11, 31), 'yyyy-MM-dd');
          
          break
        case "Last Month":
          this.startDate = kendo.toString(new Date(today.getFullYear(), today.getMonth(), -30), 'yyyy-MM-dd');
          this.endDate = kendo.toString(new Date(today.getFullYear(), today.getMonth() -1, +31), 'yyyy-MM-dd');

          break
        case "Last Year":
          this.startDate = kendo.toString(new Date(today.getFullYear(), -11, -30), 'yyyy-MM-dd');
          this.endDate = kendo.toString(new Date(today.getFullYear(), -1, +31), 'yyyy-MM-dd');

          break
        default:
          this.startDate = ""
          this.endDate = ""
      }

      this.emitStartDate()
      this.emitEndDate()
    },
  },
  watch: {
    startDate: "emitStartDate",
    endDate: "emitEndDate",
    initStartDate() {
      this.startDate = this.initStartDate
      this.emitStartDate()
    },
    initEndDate() {
      this.endDate = this.initEndDate
    },
  },
  mounted() {
      this.onSorterChanges();
  },
}
</script>