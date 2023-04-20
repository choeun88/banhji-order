<template>
    <v-autocomplete
        class="mt-1"
        :loading="loading"
        :placeholder="$t('select_account')"
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
/* Vuex */
import { mapGetters } from 'vuex';
import AccountModel from "@/scripts/model/Account";

export default {
    name: 'AccountPrimaryDropDownList',
    props: {
        initAccount: {
            type: Object,
        },
        initDisabled: {
            type: Boolean,
        },
        disabled: Boolean,
    },
    data() {
        return {
            account : new AccountModel(),
            loading : false,
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
            this.$emit('onChanged');
        },
    },
    watch: {
        initAccount: "initialData",
    },
    computed: mapGetters({
        accounts: 'accounts/primary',
        language: "accounting/language",
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