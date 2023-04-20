<template>
    <v-select class="mt-1"
        :loading="loading"
        placeholder="Select Term"
        v-model="paymentTerm"
        :items="paymentTerms"
        item-text="name"
        item-value="id"
        @change="emitPaymentTerm();emitType();onChanged()"
        return-object
        clearable
        outlined/>
</template>

<script>
import { mapState } from 'vuex';
import PaymentTermModel from "@/scripts/model/PaymentTerm";

export default {
    name: 'PaymentTermDropDownList',
    props: {
        initPaymentTerm: {
            type: Object,
        },
        initType: {
            type: String,
        },
    },
    data() {
        return {
            paymentTerm: new PaymentTermModel(),
            type: '',
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
            this.type = this.initType;
        },
        emitPaymentTerm() {
            let paymentTerm = new PaymentTermModel();
            if(this.paymentTerm){
                paymentTerm = this.paymentTerm;
            }
            this.$emit('emitPaymentTerm', paymentTerm);
        },
        emitType() {
            this.$emit('emitType', this.type);
        },
        onChanged() {
            this.$emit('onChanged')
        },
    },
    watch: {
        initPaymentTerm: "initialData",
        initType: "initialData",
    },
    computed: mapState({
        paymentTerms: state => state.paymentTerms.list
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