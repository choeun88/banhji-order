<template>
    <v-select
        :loading="loading"
        class="mt-1"
        placeholder="Select Cash Account"
        v-model="account"
        :items="accounts"
        :item-text="(item) => `${item.number} - ${language ==='English' ? item.name : item.local_name}`"
        item-value="uuid"
        @change="emitAccount(), onChanged()"
        return-object
        clearable
        outlined>
        <!-- <template slot="selection" slot-scope="{ item }">
            {{ item.number }} - {{ item.name }}
        </template> -->
        <template slot="item" slot-scope="{ item }">
            {{ item.number }} - {{ language ==='English' ? item.name : item.local_name }}
        </template>
    </v-select>
</template>

<script>
import { mapState } from 'vuex';
import AccountModel from "@/scripts/model/Account";

const AccountTypeCode = require("@/scripts/default_setup/AccountTypeCode");

export default {
    name: 'CashAccountDropDownList',
    props: {
        initAccount: {
            type: Object,
        },
    },
    data() {
        return {
            account: new AccountModel(),
            loading: false
        }
    },
    methods: {
        async initialize () {
            this.loading = true;
            
            // Call List
            await this.$store.dispatch('accounting/getAccounts');

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
        onChanged() {
            this.$emit('onChanged')
        },
    },
    watch: {
        initAccount: "initialData"
    },
    computed: mapState({
        accounts: state => state.accounting.accounts.filter(i => ~AccountTypeCode.CASH_ACCOUNTS.indexOf(i.account_type.code)),
        language: state => state.accounting.accountLanguage
    }),
    created() {
        this.initialize();
    },
    mounted() {
        /* Initial Obj */
        this.initialData();
    }
}
</script>