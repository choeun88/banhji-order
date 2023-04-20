<template>
    <v-select
        :loading="loading"
        class="mt-1"
        placeholder="Select Bank Account Type"
        v-model="bankAccountTypeId"
        :items="bankAccountTypes"
        item-text="name"
        item-value="uuid"
        @change="emitBankAccountTypeId"
        outlined/>
</template>

<script>
const {bankAccountHandler} = require("@/scripts/AppHandlers");

export default {
    name: 'BankAccountTypeDropDownList',
    props: ['initBankAccountTypeId'],
    data() {
        return {
            bankAccountTypeId: '',
            bankAccountTypes: [],
            loading: false
        }
    },
    methods: {
        emitBankAccountTypeId() {
            this.$emit('emitBankAccountTypeId', this.bankAccountTypeId);
        },
    },
    watch: {
        initBankAccountTypeId() {
            this.bankAccountTypeId = this.initBankAccountTypeId;
        }
    },
    created() {
        this.loading = true
        // Call Bank Account Type List
        bankAccountHandler.getAllTypes()
            .then(res => {
                this.bankAccountTypes = res.data;
                this.loading = false
            })
    },
    mounted() {
        /* Initial Bank Account Type */
        this.bankAccountTypeId = this.initBankAccountTypeId;
    }
}
</script>