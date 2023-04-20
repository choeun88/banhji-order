<template>
    <div>
        <input :id="id" style="width: 100%; margin-top: 4px" />
    </div>
</template>

<script>
import kendo from "@progress/kendo-ui";
import SaleUnitItemModel from "@/scripts/model/SaleUnitItems";

const apiUrl = require('@/api/item');
export default {
    name: 'SaleUnitDropdownList',
    components: {},
    props: {
        initSaleUnit: {
            type: Object,
        },
        // initType: {
        //     type: String
        // }
    },
    data() {
        return {
            saleUnit: new SaleUnitItemModel({}),
            saleUnitList: [],
            type: '',
            url: apiUrl.saleUnit_item_get,
            id: 'ddlSaleUnit_' + Math.floor(Math.random() * 1000)
        }
    },
    // computed: mapState({
    //     segments: state => state.segments.all
    // }),
    methods: {
        async onChange(ev) {
            if (ev) {
                const selectedIndex = ev.sender.select();
                const selectedItem = ev.sender.dataItem(selectedIndex).toJSON();
                this.saleUnit = new SaleUnitItemModel(selectedItem);
                this.$emit('onChange', this.saleUnit);
            }
        },
        bindData(url) {
            kendo.jQuery('#' + this.id).kendoDropDownList({
                dataTextField: "name",
                dataValueField: "id",
                optionLabel: "--- Select ---",
                autoBind: true,
                dataSource: new kendo.data.DataSource({
                    transport: {
                        read: {
                            url: url,
                        },
                        dataType: "json",
                    },
                    schema: {
                        model: {
                            id: "id"
                        },
                        data: (response) => {
                            // remove default select
                            // if (response.data.length > 0) {
                            //     const row = response.data[0]
                            //     this.$emit('onChange', row);
                            // }
                            return response.data;
                        },
                    },
                    //group: {field: 'name'}
                }),
                // index: 0,
                change: this.onChange,
                filter: 'contains'
            });
        },
    },
    watch: {
        initSaleUnit() {
            this.saleUnit = this.initSaleUnit;
        },
        // initType() {
        //     this.type = this.initType;
        // },
    },
    async created() {
        // this.loadData(this.url);
    },
    async mounted() {
        this.bindData(this.url);
        /* Initial obj */
        this.saleUnit = this.initSaleUnit;
        // this.type = this.initType;
        // this.$emit('onChange', this.saleUnit);
        // create DropDownList from input HTML element
        // await this.loadData('', this.supBaseUrl);
    }
}
</script>