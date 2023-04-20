<template>
    <v-autocomplete
        class="mt-1"
        :loading="loading"
        placeholder="Search Bank"
        @change="emitBank();onChanged();"
        v-model="bank"
        :items="banks"
        item-text="name"
        item-value="uuid"
        hide-no-data
        hide-selected
        return-object
        clearable
        outlined
    ></v-autocomplete>
</template>

<script>
import { mapState } from 'vuex';
import BankModel from "@/scripts/model/Bank";

export default {
    name: 'BankDropDownList',
    props: {
        initBank: {
            type: Object,
        },
    },
    data() {
        return {
            bank : new BankModel(),
            loading : false,
        }
    },
    methods: {
        initialData(){
            this.bank = this.initBank;
        },
        async initialize () {
            this.loading = true;
            
            // Call List
            await this.$store.dispatch('banking/getBanks')

            this.loading = false;
        },
        emitBank() {
            this.$emit('emitBank', this.bank);
        },
        onChanged() {
            this.$emit('onChanged');
        },
    },
    watch: {
        initBank: "initialData"
    },
    computed: mapState({
        banks: state => state.banking.banks
    }),
    created() {
        this.initialize();
    },
    mounted() {
        /* Initial obj */
        this.initialData();
    }
}
</script>