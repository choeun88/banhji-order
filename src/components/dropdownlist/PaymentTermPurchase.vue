<template>
    <v-select class="mt-1"
        :loading="loading"
        placeholder="Select Term"
        v-model="paymentTerm"
        :items="paymentTerms"
        item-text="name"
        item-value="id"
        @change="emitPaymentTerm();onChanged()"
        return-object
        clearable
        outlined/>
</template>

<script>
import { mapState } from 'vuex';
import PaymentTermModel from "@/scripts/model/PaymentTerm";

export default {
    name: 'PaymentTermPurchase',
    props: {
        initPaymentTerm: {
            type: Object,
        },
    },
    data() {
        return {
            paymentTerm: new PaymentTermModel(),
            loading: false
        }
    },
    methods: {
        async initialize () {
            this.loading = true;
            
            // Call List
            await this.$store.dispatch('paymentTerms/getList');

            this.loading = false;
        },
        initialData(){
            this.paymentTerm = this.initPaymentTerm;
        },
        emitPaymentTerm() {
            let paymentTerm = new PaymentTermModel();
            if(this.paymentTerm){
                paymentTerm = this.paymentTerm;
            }
            this.$emit('emitPaymentTerm', paymentTerm);
        },
        onChanged() {
            this.$emit('onChanged')
        },
    },
    watch: {
        initPaymentTerm : "initialData"
    },
    computed: mapState({
        paymentTerms: state => state.paymentTerms.list.filter((i) => i.type.toLowerCase() === "pmt-supplier")
    }),
	created() {
        this.initialize();
    },
    mounted() {
        /* Initial Payment Term */
        this.initialData();
    }
}
</script>