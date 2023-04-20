<template>
    <div>
        <v-select
            :loading="loading"
            v-model="selectedBudgets"
            :items="budgetList"
            item-text="name"
            item-value="uuid"
            @change="emitBudgets"
            placeholder="Select Budgets"
            multiple
            class="mt-1"
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

import SegmentModel from "@/scripts/model/Segment.js";
import BudgetModel from "@/scripts/model/Budget.js";

export default {
    name: 'BudgetListItemGroup',
    props: {
        initBudgets: {
            type: Array,
        },
        initFiscalYear: {
            type: String,
        },
    },
    data() {
        return {
            selectedBudgets: [],
            budgetList: [],
            loading: false
        }
    },
    methods: {
        async initialize () {
            this.loading = true;
            
            // Call List
            await this.$store.dispatch('budgets/getList');
            await this.$store.dispatch('segments/getList')

            this.loading = false;
        },
        initialData(){
            this.selectedBudgets = this.initBudgets;
        },
        emitBudgets() {
            this.$emit('emitBudgets', this.selectedBudgets);
        },
        filterByFiscalYear(){
            let budgetList = [];

            this.budgets.forEach(value => {
                if(value.fiscal_year.uuid === this.initFiscalYear && value.segment_uuid !== "" && value.project_uuid === ""){
                    let budget = new BudgetModel(value);
                    budget.segment = new SegmentModel(this.segments.find(i => i.id === value.segment_uuid));

                    budgetList.push(budget);
                }
            });

            this.budgetList = budgetList;
        },
        toggle() {
            this.$nextTick(() => {
                if (this.likesAllFruit) {
                    this.selectedBudgets = [];
                } else {
                    let ids = [];
                    this.budgetList.forEach(value => {
                        ids.push(value.uuid);
                    });
                    this.selectedBudgets = ids;
                }
                this.emitBudgets();
            })
        },
    },
    watch: {
        initBudgets: "initialData",
        initFiscalYear: "filterByFiscalYear",
    },
    computed: {
        ...mapState({
            budgets: state => state.budgets.list,
            segments: state => state.segments.list
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
    created() {
        this.initialize();
    },
    mounted() {
        /* Initial Data */
        this.initialData();
    }
}
</script>