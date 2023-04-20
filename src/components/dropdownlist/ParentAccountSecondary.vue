<template>
    <v-select
        :loading="loading"
        class="mt-1"
        placeholder="Select Parent Account"
        v-model="parentAccount"
        :items="parentAccounts"
        item-text="name"
        item-value="uuid"
        @change="emitParentAccount();onChanged()"
        return-object
        clearable
        outlined>
        <template slot='selection' slot-scope='{ item }'>
            {{ item.number }} - {{ item.name }}
        </template>
        <template slot='item' slot-scope='{ item }'>
            {{ item.number }} - {{ item.name }}
        </template>
    </v-select>
</template>

<script>
import { mapState } from 'vuex';
import AccountModel from "@/scripts/model/Account";

export default {
    name: 'ParentAccountDropDownList',
    props: {
        initParentAccount: {
            type: Object,
        },
        initSecondaryTypeId: {
            type: String,
        }
    },
    data() {
        return {
            parentAccount: new AccountModel(),
            parentAccounts: [],
            loading: false
        }
    },
    methods: {
        async initialize () {
            this.loading = true;
            
            // Call List
            this.parentAccounts = await this.$store.dispatch('accounting/getSecondaryAccounts');

            this.loading = false;
        },
        initialData(){
            this.parentAccount = this.initParentAccount;
        },
        emitParentAccount() {
            let parentAccount = new AccountModel();
            if(this.parentAccount){
                parentAccount = this.parentAccount;
            }
            this.$emit('emitParentAccount', parentAccount);
        },
        onChanged() {
            this.$emit('onChanged');
        },
        filterByTypeCode(){
            this.parentAccounts = this.accounts.filter((i) => i.type_code === this.initAccountTypeCode);
        },
    },
    watch: {
        initParentAccount: "initialData",
        initAccountTypeCode: "filterByTypeCode",
    },
    computed: mapState({
        accounts: state => state.accounting.accounts,
        language: state => state.accounting.accountLanguage,
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