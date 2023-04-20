<template>
    <v-select
        class="mt-1"
        :loading="loading"
        placeholder="Select Secondary Account"
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
    name: 'SecondaryAccountDropDownList',
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
        initPrimaryAccountId: {
            type: String,
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
            await this.$store.dispatch('accounting/getSecondaryAccounts');

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
            this.accounts = this.secondaryAccounts.filter(i => i.type_code === this.initAccountTypeCode);
        },
        filterByGroupCode(){
            this.accounts = this.secondaryAccounts.filter(i => i.group_code === this.initAccountGroupCode);
        },
        filterByPrimaryAccountId () {
            this.accounts = this.secondaryAccounts.filter(i => i.primary_account_uuid === this.initPrimaryAccountId);
        },
    },
    watch: {
        initAccount: "initialData",
        initAccountTypeCode : "filterByTypeCode",
        initPrimaryAccountId : "filterByPrimaryAccountId"
    },
    computed: mapState({
        secondaryAccounts: state => state.accounting.secondaryAccounts,
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