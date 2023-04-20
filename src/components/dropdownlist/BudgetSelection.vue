<template>
    <div>
        <v-select
            class="mt-1"
            :loading="loading"
            v-model="selectedBudgets"
            :items="budgetList"
            item-text="name"
            item-value="uuid"
            @change="emitBudgets"
            :placeholder="$t('select_budget')"
            return-object
            multiple
            outlined
        >
            <template v-slot:prepend-item>
                <v-list-item
                    ripple
                    @click="toggle"
                >
                    <v-list-item-action>
                        <v-icon :color="selectedBudgets.length > 0 ? 'indigo darken-4' : ''">
                            {{ icon }}
                        </v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            Select All
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-divider class="mt-2"></v-divider>
            </template>

            <template v-slot:selection="{ item, index }">
                <v-chip v-if="index === 0">
                    <span>{{ item.name }}</span>
                </v-chip>
                <span v-if="index === 1" class="font_14">
                    (+{{ selectedBudgets.length - 1 }} others)
                </span>
            </template>

        </v-select>
    </div>
</template>

<script>
import { mapState } from 'vuex';

const BudgetTypes = require("@/scripts/default_setup/BudgetTypes.js");
const Dimensions = require("@/scripts/default_setup/Dimensions.js");

export default {
    name: 'BudgetSelection',
    props: {
        initBudgets: {
            type: Array,
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
            selectedBudgets: [],
            fiscalDateId: "",
            dimension: Dimensions.SEGMENT,
            budgetType: BudgetTypes.STANDARD,
            budgetList: [],
            loading: false
        }
    },
    methods: {
        initialData(){
            this.selectedBudgets = this.initBudgets;
            this.budgetType = this.initBudgetType;
        },
        emitBudgets() {
            this.$emit('emitBudgets', this.selectedBudgets);
        },
        onFiscalDateChanges(){
            this.fiscalDateId = this.initFiscalDateId;
            if(this.fiscalDateId !== ""){
                this.loadBudget();
            }
        },
        onDimensionChanges(){
            this.dimension = this.initDimension;
            this.filterByFiscalDate();
        },
        async loadBudget () {
            this.loading = true;

            this.$store.state.budgets.isLoaded = false;
            
            // Call List
            await this.$store.dispatch('budgets/getList');

            this.filterByFiscalDate();

            this.loading = false;
        },
        async filterByFiscalDate(){
            /* Clear */
            this.selectedBudgets = [];
            this.emitBudgets();

            switch (this.dimension) {
                case Dimensions.SEGMENT:
                    this.budgetList = this.budgets.filter((item) => item.fiscal_year.uuid === this.fiscalDateId && item.budget_type === this.budgetType && item.segment_uuid !== "");
                    break;

                case Dimensions.LOCATION:
                    this.budgetList = this.budgets.filter((item) => item.fiscal_year.uuid === this.fiscalDateId && item.budget_type === this.budgetType && item.location_uuid !== "");
                    break;

                case Dimensions.PROJECT:
                    this.budgetList = this.budgets.filter((item) => item.fiscal_year.uuid === this.fiscalDateId && item.budget_type === this.budgetType && item.project_uuid !== "");
                    break;
            
                default:
                    break;
            }
        },
        toggle() {
            this.$nextTick(() => {
                if (this.likesAllFruit) {
                    this.selectedBudgets = [];
                } else {
                    this.selectedBudgets = this.budgetList.slice();
                }
                this.emitBudgets();
            })
        },
    },
    watch: {
        initBudgets: "initialData",
        initBudgetType: "initialData",
        initFiscalDateId: "onFiscalDateChanges",
        initDimension: "onDimensionChanges",
    },
    computed: {
        ...mapState({
            budgets: state => state.budgets.list,
        }),
        likesAllFruit() {
            return this.selectedBudgets.length === this.budgetList.length
        },
        likesSomeFruit() {
            return this.selectedBudgets.length > 0 && !this.likesAllFruit
        },
        icon() {
            if (this.likesAllFruit) return 'mdi-close-box'
            if (this.likesSomeFruit) return 'mdi-minus-box'
            return 'mdi-checkbox-blank-outline'
        },
    },
    mounted() {
        /* Initial Data */
        this.initialData();
    }
}
</script>