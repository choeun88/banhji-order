<template>
    <v-select
        class="mt-1"
        :loading="loading"
        :placeholder="$t('select_location')" 
        v-model="location"
        :items="locations"
        item-text="name"
        item-value="id"
        @change="emitLocation();onChanged();"
        :disabled="disabled"
        return-object
        clearable
        outlined />
</template>

<script>
import { mapState } from 'vuex';
import LocationModel from "@/scripts/model/Location";

export default {
    name: 'LocationDropDownList',
    props: {
        initLocation: {
            type: Object,
        },
        initDisabled: {
            type: Boolean,
        },
    },
    data() {
        return {
            location : new LocationModel(),
            loading : false,
            disabled : false,
        }
    },
    methods: {
        async initialize () {
            this.loading = true;
            
            // Call List
            await this.$store.dispatch('locations/getList')

            this.loading = false;
        },
        initialData(){
            this.location = this.initLocation;
            this.disabled = this.initDisabled;
        },
        emitLocation() {
            let location = new LocationModel();
            if(this.location){
                location = this.location;
            }
            this.$emit('emitLocation', location);
        },
        onChanged() {
            this.$emit('onChanged');
        },
    },
    watch: {
        initLocation: "initialData",
        initDisabled: "initialData",
    },
    computed: mapState({
        locations: state => state.locations.list
    }),
    created() {
        this.initialize();
    },
    mounted() {
        /* Initial obj */
        this.initialData();
    }
}
</script>