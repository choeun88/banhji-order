<template>
    <v-select
        :loading="loading"
        class="mt-1"
        placeholder="Select Account Type"
        v-model="accountType"
        :items="accountTypes"
        item-text="name"
        item-value="code"
        @change="emitAccountType();onChanged();"
        return-object
        outlined>
         <template slot='selection' slot-scope='{ item }'>
            {{ item.code }} - {{ item.name }}
        </template>
        <template slot='item' slot-scope='{ item }'>
            {{ item.code }} - {{ item.name }}
        </template>
         </v-select>
</template>

<script>
import { mapState } from 'vuex';
import AccountTypeModel from "@/scripts/model/AccountType";

export default {
    name: 'AccountTypeDropDownList',
    props: {
        initAccountType: {
            type: Object,
        },
    },
    data() {
        return {
            accountType : new AccountTypeModel(),
            loading : false
        }
    },
    methods: {
        async initialize () {
            this.loading = true;

            // Call List
            await this.$store.dispatch('accounting/getSecondaryTypes');

            this.loading = false;
        },
        initialData(){
            this.accountType = this.initAccountType;
        },
        emitAccountType() {
            let accountType = new AccountTypeModel();
            if(this.accountType){
                accountType = this.accountType;
            }
            this.$emit('emitAccountType', accountType);
        },
        onChanged() {
            this.$emit('onChanged');
        },
    },
    watch: {
        initAccountType: "initialData",
    },
    computed: mapState({
        accountTypes: state => state.accounting.secondaryTypes
    }),
    created() {
        this.initialize();
    },
    mounted() {
        /* Initial Data */
        this.initialData();
    }
}
</script>