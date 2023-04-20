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
import { mapState } from 'vuex';
import AccountModel from "@/scripts/model/Account";

export default {
    name: 'AccountDropDownList',
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
            account : new AccountModel(),
            accounts : [],
            loading : false,
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
            let account = new AccountModel();
            if(this.account){
                account = this.account;
            }
            this.$emit('emitAccount', account);
        },
        filterByTypeCode(){
            this.accounts = this.primaryAccounts.filter(i => i.type_code === this.initAccountTypeCode);
        },
        filterByGroupCode(){
            this.accounts = this.primaryAccounts.filter(i => i.group_code === this.initAccountGroupCode);
        },
    },
    watch: {
        initAccount: "initialData",
        initAccountTypeCode : "filterByTypeCode",
    },
    computed: mapState({
        primaryAccounts: state => state.accounting.accounts,
        language: state => state.accounting.accountLanguage,
    }),
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