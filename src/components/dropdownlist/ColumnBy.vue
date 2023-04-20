<template>
    <v-select
        class="mt-1"
        v-model="columnBy"
        :items="columnsBy"
        item-text="text"
        item-value="value"
        @change="emitColumnBy"
        clearable
        outlined>
    </v-select>
</template>

<script>
const { columnsBy } = require("@/scripts/default_setup/DateSearch.js");

export default {
    name: 'ColumnByDropDownList',
    props: ["initColumnBy"],
    data() {
        return {
            columnBy : "1", //Default Total,
            columnsBy : columnsBy,
        }
    },
    methods: {
        initialData(){
            this.columnBy = this.initColumnBy;
        },
        emitColumnBy() {
            this.$emit('emitColumnBy', this.columnBy);
        },
    },
    watch: {
        initColumnBy: "initialData",
    },
    mounted() {
        /* Initial Data */
        this.initialData();
    }
}
</script>