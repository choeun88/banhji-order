<template>
    <v-autocomplete
        class="mt-1"
        :loading="loading"
        :placeholder="$t('select_cash_account')"
        @change="emitAccount();onChanged();"
        v-model="account"
        :items="accounts"
        :item-text="(item) => `${item.number} - ${language ==='English' ? item.name : item.local_name}`"
        item-value="uuid"
        :disabled="disabled"
        hide-no-data
        hide-selected
        return-object
		clearable
        outlined>
        <template slot="item" slot-scope="{ item }">
             {{ item.number }} - {{ language ==='English' ? item.name : item.local_name }}
        </template>
    </v-autocomplete>
</template>

<script>
import { mapGetters } from 'vuex';
import AccountModel from "@/scripts/model/Account";

export default {
    name: 'CashAccountDropDownList',
    props: {
        initAccount: {
            type: Object,
        },
        disabled: Boolean,
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
            await this.$store.dispatch('accounts/getList');

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
    computed: {
        ...mapGetters({
            accounts: 'accounts/cash',
            language: "accounting/language",
        }),
    },
    created() {
        this.initialize();
    },
    mounted() {
        /* Initial Obj */
        this.initialData();
    }
}
</script>