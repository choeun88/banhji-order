<template>
    <v-autocomplete
        class="mt-1"
        :loading="loading"
        placeholder="Search Donor"
        @change="emitDonor(), onChanged()"
        v-model="donor"
        :items="donors"
        item-text="name"
        item-value="id"
        hide-no-data
        hide-selected
        return-object
        clearable
        outlined
    >
        <template slot="selection" slot-scope="{ item }">
            {{ item.number }} - {{ item.name }}
        </template>
        <template slot="item" slot-scope="{ item }">
            {{ item.number }} - {{ item.name }}
        </template>
    </v-autocomplete>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'DonorDropDownList',
    props: {
        initDonor: {
            type: Object,
        },
    },
    data() {
        return {
            donor : null,
            loading : false,
        }
    },
    methods: {
        async initialize () {
            this.loading = true;
            
            // Call List
            await this.$store.dispatch('donors/getList')

            this.loading = false;
        },
        initialData(){
            this.donor = this.initDonor;
        },
        emitDonor() {
            this.$emit('emitDonor', this.donor);
        },
        onChanged() {
            this.$emit('onChanged');
        },
    },
    watch: {
        initDonor: "initialData"
    },
    computed: mapState({
        donors: state => state.donors.list
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