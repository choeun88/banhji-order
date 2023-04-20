<template>
    <v-select
        :loading="loading"
        class="mt-1"
        placeholder="Select Account Group"
        v-model="accountGroup"
        :items="accountGroups"
        item-text="name"
        item-value="uuid"
        @change="emitAccountGroup();onChanged()"
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
import store from "@/store";
import AccountGroupModel from "@/scripts/model/AccountGroup";

export default {
    name: 'AccountGroupDropDownList',
    props: {
        initAccountGroup: {
            type: Object,
        },
        initAccountTypeCode: {
            type: Number,
        }
    },
    data() {
        return {
            accountGroup : new AccountGroupModel(),
            accountGroups : [],
            loading : false
        }
    },
    methods: {
        async initialize () {
            this.loading = true;

            // Call List
            this.accountGroups = await this.$store.dispatch('accounting/getGroups');

            this.loading = false;
        },
        initialData(){
            this.accountGroup = this.initAccountGroup;
        },
        emitAccountGroup() {
            let accountGroup = new AccountGroupModel();
            if(this.accountGroup){
                accountGroup = this.accountGroup;
            }
            this.$emit('emitAccountGroup', accountGroup);
        },
        onChanged() {
            this.$emit('onChanged');
        },
        filterByTypeCode(){
            this.accountGroups = store.state.accounting.groups.filter(i => i.type_code === this.initAccountTypeCode);
        }
    },
    watch: {
        initAccountGroup : "initialData",
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