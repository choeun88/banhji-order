<template>
    <v-select
        class="mt-1"
        :loading="loading"
        placeholder="Select Contract"
        v-model="contract"
        :items="contracts"
        item-text="referenceNo"
        item-value="id"
        @change="emitContract"
        return-object
        clearable
        outlined>
    </v-select>
</template>

<script>
const TransactionHandler = require("@/scripts/transactionHandler");

export default {
    name: 'ContractDropDownList',
    props: {
        initContract: {
            type: Object,
        },
        initParams: {
            type: Object,
        },
    },
    data() {
        return {
            contract : null,
            contracts : [],
            loading : false,
        }
    },
    methods: {
        search () {
            this.loading = true;
            let params = this.initParams;
            
            // Call List
            TransactionHandler.getByFilters({
                params: params
            })
            .then((res)=>{
                if(res){
                    this.contracts = res.data.data;
                }
            })
            .finally(()=>{
                this.loading = false;
            });
        },
        initialData(){
            this.contract = this.initContract;
        },
        emitContract() {
            this.$emit('emitContract', this.contract);
        },
    },
    watch: {
        initContract: "initialData",
        initParams : "search",
    },
    mounted() {
        /* Initial Data */
        this.initialData();
    }
}
</script>