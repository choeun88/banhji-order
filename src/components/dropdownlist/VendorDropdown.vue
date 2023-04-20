<template>
    <div class="mt-1">
        <dropdownlist
            :auto-bind="true"
            :ref="'ds'"
            :data-source-ref="'datasource'"
            :data-text-field="'name'"
            :filter="'contains'"
            v-on:change="onChange"
            @filtering="onFiltering"
            :index="0"
            return-object
            :data-value-field="'id'"
            :options-label="'Select a vendor...'">
        </dropdownlist>
        <datasource ref="datasource"
                    :type="'json'"
                    :data="vendors">
        </datasource>
    </div>
</template>

<script>
import {DropDownList} from '@progress/kendo-dropdowns-vue-wrapper';
import {DataSource} from '@progress/kendo-datasource-vue-wrapper';
import supplierHandler from "@/scripts/supplierHandler";
import SupplierModel from "@/scripts/model/Supplier";
// import {mapState} from "vuex";

export default {
    name: 'VendorDropdownList',
    components: {
        'dropdownlist': DropDownList,
        'datasource': DataSource
    },
    props: {
        initVendor: {
            type: Object,
        },
    },
    data() {
        return {
            vendor: null,
            loading: false,
            vendors: [],
            supBaseUrl: supplierHandler.search(),
        }
    },
    // computed: mapState({
    //     segments: state => state.segments.all
    // }),
    methods: {
        afterFetch(json) {
            this.vendors = json.data;
            this.$refs.ds.kendoWidget().setDataSource(this.vendors)
        },
        async onFiltering(e) {
            if (e.filter) {
                await this.loadData(e.filter.value, this.supBaseUrl)
            } else {
                await this.loadData('', this.supBaseUrl)
            }
        },
        async onChange(ev) {
            if (ev) {
                const selectedIndex = ev.sender.select();
                const selectedItem = ev.sender.dataItem(selectedIndex).toJSON();
                this.vendor = new SupplierModel(selectedItem)
                this.$emit('onChange', this.vendor);
            }
        },
        loadData(filter, baseUrl) {
            this.loading = true;
            const url = baseUrl + `?filter=${filter}`;
            fetch(url)
                .then((response) => {
                    if (response) {
                        return response.json();
                    }
                })
                .then(this.afterFetch);
            this.loading = false;
        },
    },
    watch: {
        initVendor() {
            this.vendor = this.initVendor;
        },
    },
    async created() {
        this.loadData('', this.supBaseUrl);
    },
    async mounted() {
        /* Initial obj */
        this.vendor = this.initVendor;
        // await this.loadData('', this.supBaseUrl);
    }
}
</script>