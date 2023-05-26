<template>
    <div>
        <input :id="id" style="width: 100%; margin-top: 4px" />
    </div>
</template>

<script>
import kendo from "@progress/kendo-ui";
import OtherChargeModel from "@/scripts/model/OtherCharge";

const apiUrl = require('@/api/item');
export default {
    name: 'OtherChargeDropdownList',
    components: {},
    props: {
        initOtherCharge: {
            type: Object,
        },
        // initType: {
        //     type: String
        // }
    },
    data() {
        return {
            otherCharge: new OtherChargeModel({}),
            otherChargeList: [],
            type: '',
            url: apiUrl.other_charge_get,
            id: 'ddlOtherCharge_' + Math.floor(Math.random() * 1000)
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
                this.otherCharge = new OtherChargeModel(selectedItem);
                this.$emit('onChange', this.otherCharge);
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
        initOtherCharge() {
            this.otherCharge = this.initOtherCharge;
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
        this.otherCharge = this.initOtherCharge;
        // this.type = this.initType;
        // this.$emit('onChange', this.otherCharge);
        // create DropDownList from input HTML element
        // await this.loadData('', this.supBaseUrl);
    }
}
</script>