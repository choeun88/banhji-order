<template>
    <v-select
        :loading="loading"
        class="mt-1"
        placeholder="Select Bank Account"
        v-model="bankAccount"
        :items="bankAccounts"
        item-text="number"
        item-value="uuid"
        @change="emitBankAccount"
        return-object
        outlined>
        <template slot="selection" slot-scope="{ item }">
            {{ item.number }} ({{ item.currency.code }})
        </template>
        <template slot="item" slot-scope="{ item }">
            {{ item.bank.abbr }} {{ item.number }} ({{ item.currency.code }})
        </template>
    </v-select>
</template>

<script>
import {BankAccountModel} from "@/scripts/model/AppModels";

const {bankAccountHandler} = require("@/scripts/AppHandlers");

export default {
    name: 'BankAccountDropDownList',
    props: {
        initBankAccount: {
            type: Object,
        },
    },
    data() {
        return {
            bankAccount: new BankAccountModel(),
            bankAccounts: [],
            loading: false
        }
    },
    methods: {
        emitBankAccount() {
            this.$emit('emitBankAccount', new BankAccountModel(this.bankAccount));
        },
    },
    watch: {
        initBankAccount() {
            this.bankAccount = this.initBankAccount;
        }
    },
    created() {
        this.loading = true
        // Call Bank Account List
        bankAccountHandler.getAll()
            .then(res => {
                let bankAccountList = [];
                res.data.forEach(value => {
                    let bankAcct = new BankAccountModel(value);
                    bankAccountList.push(bankAcct);
                });
                this.bankAccounts = bankAccountList;
                this.loading = false
            })
    },
    mounted() {
        /* Initial Bank Account */
        this.bankAccount = this.initBankAccount;
    }
}
</script>