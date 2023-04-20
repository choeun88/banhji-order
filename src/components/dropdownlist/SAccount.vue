<template>
    <v-select
        class="mt-1"
        :loading="loading"
        placeholder="Select Account"
        v-model="account"
        :items="accounts"
        :item-text="(item) => `${item.number} - ${language ==='English' ? item.name : item.local_name}`"
        item-value="uuid"
        @change="emitAccount"
        return-object
        clearable
        outlined>
        <template slot="item" slot-scope="{ item }">
           {{ item.number }} - {{ language ==='English' ? item.name : item.local_name }}
        </template>
    </v-select>
</template>

<script>
import store from "@/store";

export default {
    name: 'SAccountDropDownList',
    props: {
        initAccount: {
            type: Object,
        },
        initAccountTypeCode: {
            type: Number,
        },
        initAccountGroupCode: {
            type: Number,
        },
    },
    data() {
        return {
            account : null,
            accounts : [],
            loading : false,
        }
    },
    computed:{
        language(){
            return store.state.accounting.accountLanguage
        }
    },
    methods: {
        async initialize () {
            this.loading = true;
            
            // Call List
            this.accounts = await this.$store.dispatch('accounting/getAccounts');

            this.loading = false;
        },
        initialData(){
            this.account = this.initAccount;
        },
        emitAccount() {
            this.$emit('emitAccount', this.account);
        },
        filterByTypeCode(){
            this.accounts = store.state.accounting.accounts.filter(i => i.type_code === this.initAccountTypeCode);
        },
        filterByGroupCode(){
            this.accounts = store.state.accounting.accounts.filter(i => i.group_code === this.initAccountGroupCode);
        },
    },
    watch: {
        initAccount: "initialData",
        initAccountTypeCode : "filterByTypeCode",
    },
    created() {
        /* Initialize */
        this.initialize();
    },
    mounted() {
        /* Initial Data */
        this.initialData();
    }
}
</script>