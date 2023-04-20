<template>
    <v-select
        class="mt-1"
        v-model="budgetType"
        :items="budgetTypes"
        item-text="text"
        item-value="value"
        @change="emitBudgetType();onChanged();"
        outlined>
    </v-select>
</template>

<script>
export default {
    name: 'BudgetTypeDropDownList',
    props: ["initBudgetType"],
    data() {
        return {
            budgetType: "segment",
            budgetTypes: [
                { text: "Segment", value: "segment" },
                { text: "Business Unit", value: "location" },
                { text: "Project", value: "project" },
            ],
        }
    },
    methods: {
        initialData(){
            this.budgetType = this.initBudgetType;
        },
        emitBudgetType() {
            this.$emit('emitBudgetType', this.budgetType);
        },
        onChanged() {
            this.$emit('onChanged');
        },
    },
    watch: {
        initBudgetType: "initialData",
    },
    mounted() {
        /* Initial Data */
        this.initialData();
    }
}
</script>