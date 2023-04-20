<template>
    <v-select
        class="mt-1"
        :loading="loading"
        placeholder="Select Currency"
        v-model="currency"
        :items="currencies"
        item-text="name"
        item-value="code"
        @change="emitCurrency();onChanged();"
        return-object
        outlined>
        <template slot="selection" slot-scope="{ item }">
            {{ item.code }} - {{ item.name }}
        </template>
        <template slot="item" slot-scope="{ item }">
            {{ item.code }} - {{ item.name }}
        </template>
    </v-select>
</template>

<script>
import { mapState } from 'vuex';
import CurrencyModel from "@/scripts/model/Currency";

export default {
    name: 'CurrencyDropDownList',
    props: {
        initCurrency: {
            type: Object,
        },
    },
    data() {
        return {
            currency : new CurrencyModel(),
            loading : false,
        }
    },
    methods: {
        async initialize () {
            this.loading = true;
            
            // Call List
            await this.$store.dispatch('currencies/getList')

            this.loading = false;
        },
        initialData(){
            this.currency = this.initCurrency;
        },
        emitCurrency() {
            let currency = new CurrencyModel();
            if(this.currency){
                currency = this.currency;
            }
            this.$emit('emitCurrency', currency);
        },
        onChanged() {
            this.$emit('onChanged');
        },
    },
    watch: {
        initCurrency: "initialData"
    },
    computed: mapState({
        currencies: state => state.currencies.list
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