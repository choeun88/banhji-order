<template>
    <div>
        <v-select
            :loading="loading"
            v-model="budget"
            :items="budgetList"
            item-text="name"
            item-value="uuid"
            @change="emitBudget"
            :placeholder="$t('select_budget')"
            :disabled="disabled"
            return-object
            class="mt-1"
            outlined />
    </div>
</template>

<script>
/* Vuex */
import { mapGetters } from 'vuex';

import BudgetExtendedModel from "@/scripts/model/BudgetExtended.js";
const BudgetTypes = require("@/scripts/default_setup/BudgetTypes.js");
const Dimensions = require("@/scripts/default_setup/Dimensions.js");

export default {
    name: 'BudgetDropdownlist',
    props: {
        initBudget: {
            type: Object,
        },
        initFiscalDateId: {
            type: String,
        },
        initDimension: {
            type: String,
        },
        initBudgetType: {
            type: String,
        },
    },
    data() {
        return {
            budget: new BudgetExtendedModel(),
            fiscalDateId: "",
            dimension: Dimensions.SEGMENT,
            budgetType: BudgetTypes.STANDARD,
            budgetList: [],
            loading: false,
            disabled: false,
        }
    },
    methods: {
        async initialize(){
            this.loading = true;

            await this.$store.dispatch('budgets/getList');

            this.loading = false;
        },
        initialData(){
            this.budget = this.initBudget;
            this.dimension = this.initDimension;
            this.budgetType = this.initBudgetType;
        },
        emitBudget() {
            let budget = new BudgetExtendedModel();
            if(this.budget){
                budget = this.budget;
            }
            
            this.$emit('emitBudget', budget);
        },
        onFiscalDateChanges(){
            this.fiscalDateId = this.initFiscalDateId;
            if(this.fiscalDateId !== ""){
                this.filterBudget();
            }
        },
        onBudgetTypeChanges () {
            /* Clear */
            this.budgetList = [];
            this.emitBudget();
            
            this.budgetType = this.initBudgetType;
            this.filterBudget();
        },
        onDimensionChanges () {
            /* Clear */
            this.budgetList = [];
            this.emitBudget();
            
            this.dimension = this.initDimension;
            this.filterBudget();
        },
        async filterBudget(){
            /* Clear */
            this.budget = new BudgetExtendedModel();
            this.emitBudget();
            
            switch (this.dimension) {
                case Dimensions.SEGMENT:
                    this.budgetList = this.budgetSegments.filter((item) => item.fiscal_year.uuid === this.fiscalDateId);
                    break;

                case Dimensions.LOCATION:
                    this.budgetList = this.budgetLocations.filter((item) => item.fiscal_year.uuid === this.fiscalDateId);
                    break;

                case Dimensions.PROJECT:
                    this.budgetList = this.budgetProjects.filter((item) => item.fiscal_year.uuid === this.fiscalDateId);
                    break;
            
                default:
                    break;
            }
        },
    },
    watch: {
        initBudget: "initialData",
        initDimension: "onDimensionChanges",
        initBudgetType: "onBudgetTypeChanges",
        initFiscalDateId: "onFiscalDateChanges",
    },
    computed: {
        ...mapGetters({
            budgetSegments: 'budgets/segment',
            budgetLocations: 'budgets/location',
            budgetProjects: 'budgets/project',
        }),
    },
    created () {
        this.initialize();
    },
    mounted() {
        /* Initial Data */
        this.initialData();
    }
}
</script>