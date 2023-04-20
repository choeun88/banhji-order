<template>
    <div>
        <input :id="id" style="width: 100%; margin-top: 4px"/>
    </div>
</template>

<script>
import kendo from "@progress/kendo-ui";
import CategoryModel from "@/scripts/model/Categories";

const apiUrl = require('@/api/product');

export default {
    name: 'CategoryDropDownList',
    components: {},
    props: {
        initCategory: {
            type: Object,
        },
        initModel: {
            type: Object
        }
    },
    data() {
        return {
            category: new CategoryModel({}),
            selectValue: {},
            categoryList: [],
            type: '',
            url: apiUrl.category_get,
            id: 'ddlProduct_' + Math.floor(Math.random() * 1000)
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
                this.category = new CategoryModel(selectedItem);
                this.$emit('onChange', this.category);
                // await this.selectItem(this.initModel)
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
                            // const res = response.data.filter(row => row.type.name === "Product")
                            // if (res.length > 0) {
                            //     const row = res[0]
                            //     // this.category = row
                            //     // const dropId = kendo.jQuery('#' + this.id).data("kendoDropDownList");
                            //     // dropId.value(row);
                            //
                            //     this.selectItem(row)
                            //     // window.console.log(' this.category = row', this.category)
                            // }
                            this.selectItem()
                            return response.data.filter(row => row.type.name === "Product")
                        },
                    },
                    // group: {}//{field: 'type.name'}
                }),
                // dataBound: this.onDataBound,
                change: this.onChange,
                filter: 'contains',
                optionLabel: '-- Select --'
            });
            // this.selectItem()
        },
        async selectItem() {
            // do stuff
            window.console.log('selectItem', this.initModel)
            if (this.initModel) {
                const id = this.initModel.id || ''
                if (id !== '') {
                    const dropId = kendo.jQuery('#' + this.id).data("kendoDropDownList")
                    dropId.value(id)
                    // dropId.trigger("change")
                }
            }
        },
        async onDataBound() {
            // // do stuff
            // window.console.log('onDataBound', this.initModel)
            // if (this.initModel) {
            //     const id = this.initModel.id || ''
            //     if (id !== '') {
            //         const dropId = kendo.jQuery('#' + this.id).data("kendoDropDownList")
            //         dropId.value(id)
            //         dropId.trigger("change")
            //     }
            // }
        }
    },
    watch: {
        initCategory() {
            this.category = this.initCategory;
        },
        initModel() {
            if (this.selectValue) {
                this.selectValue = this.initModel;
                this.selectItem()
            }
        },
    },
    async created() {
        // this.loadData(this.url);
    },
    async mounted() {
        /* Initial obj */
        this.bindData(this.url);
        this.category = this.initCategory;
        this.selectValue = this.initModel;
        // this.type = this.initType;
        // this.$emit('onChange', this.pmOption);
        // create DropDownList from input HTML element
        // await this.loadData('', this.supBaseUrl);
    }
}
</script>