<template>
    <div>
        <input :id="id" style="width: 100%; margin-top: 4px"/>
    </div>
</template>

<script>
import kendo from "@progress/kendo-ui";
import {UomModel} from "@/scripts/model/AppModels";

const apiUrl = require('@/api/product');
export default {
    name: 'UOMDropDownList',
    components: {},
    props: {
        initUOM: {
            type: Object,
        }
    },
    data() {
        return {
            uom: new UomModel({}),
            uoms: [],
            type: '',
            url: apiUrl.uom_get,
            id: 'ddlUOM_' + Math.floor(Math.random() * 1000)
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
                this.uom = new UomModel(selectedItem);
                this.$emit('onChange', this.uom);
            }
        },
        bindData(url) {
            kendo.jQuery('#' + this.id).kendoDropDownList({
                dataTextField: "name",
                dataValueField: "id",
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
                            if (response.data.length > 0) {
                                const row = response.data[0]
                                this.$emit('onChange', row);
                            }
                            return response.data;
                        },
                    },
                    group: {field: 'category.name'}
                }),
                change: this.onChange,
                index: 1,
                filter: 'contains',
                optionLabel: '-- Select --'
            });
        },
    },
    watch: {
        initUOM() {
            this.uom = this.initUOM;
        },
    },
    async created() {
        // this.loadData(this.url);
    },
    async mounted() {
        this.bindData(this.url);
        /* Initial obj */
        this.uom = this.initUOM;
        // this.type = this.initType;
        // this.$emit('onChange', this.pmOption);
        // create DropDownList from input HTML element
        // await this.loadData('', this.supBaseUrl);
    }
}
</script>