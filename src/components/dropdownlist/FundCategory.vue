<template>
    <v-select
        class="mt-1"
        :loading="loading"
        placeholder="Select Fund Category"
        v-model="fundCategory"
        :items="fundCategories"
        item-text="name"
        item-value="id"
        @change="emitFundCategory();onChanged();"
        return-object
        outlined />
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'FundCategoryDropDownList',
    props: {
        initFundCategory: {
            type: Object,
        },
    },
    data() {
        return {
            fundCategory : null,
            loading : false,
        }
    },
    methods: {
        async initialize () {
            this.loading = true;
            
            // Call List
            await this.$store.dispatch('fundCategories/getList')

            this.loading = false;
        },
        initialData(){
            this.fundCategory = this.initFundCategory;
        },
        emitFundCategory() {
            this.$emit('emitFundCategory', this.fundCategory);
        },
        onChanged() {
            this.$emit('onChanged');
        },
    },
    watch: {
        initFundCategory: "initialData"
    },
    computed: mapState({
        fundCategories: state => state.fundCategories.list
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