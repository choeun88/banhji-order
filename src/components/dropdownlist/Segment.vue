<template>
    <v-select
        class="mt-1"
        :loading="loading"
        placeholder="Select Segment"
        v-model="segment"
        :items="segments"
        item-text="name"
        item-value="id"
        @change="emitSegment();onChanged();"
        :disabled="disabled"
        return-object
        clearable
        outlined />
</template>

<script>
import { mapState } from 'vuex';
import SegmentModel from "@/scripts/model/Segment";

export default {
    name: 'SegmentDropDownList',
    props: {
        initSegment: {
            type: Object,
        },
        initDisabled: {
            type: Boolean,
        },
    },
    data() {
        return {
            segment : new SegmentModel(),
            loading : false,
            disabled : false,
        }
    },
    methods: {
        async initialize () {
            this.loading = true;
            
            // Call List
            await this.$store.dispatch('segments/getList')

            this.loading = false;
        },
        initialData(){
            this.segment = this.initSegment;
            this.disabled = this.initDisabled;
        },
        emitSegment() {
            let segment = new SegmentModel();
            if(this.segment){
                segment = this.segment;
            }
            this.$emit('emitSegment', segment);
        },
        onChanged() {
            this.$emit('onChanged');
        },
    },
    watch: {
        initSegment: "initialData",
        initDisabled: "initialData",
    },
    computed: mapState({
        segments: state => state.segments.list
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