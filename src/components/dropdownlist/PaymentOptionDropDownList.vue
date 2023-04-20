<template>
    <div>
        <input :id="id" style="width: 100%; margin-top: 4px"/>
    </div>
</template>

<script>
import kendo from "@progress/kendo-ui";
import PaymentOptionModel from "@/scripts/model/PaymentOptionDetail";

const apiUrl = require('@/api/setting');
export default {
    name: 'PaymentOptionDropDownList',
    components: {},
    props: {
        initPaymentOption: {
            type: Object,
        },
        initType: {
            type: String
        }
    },
    data() {
        return {
            pmOption: new PaymentOptionModel({}),
            pmOptionList: [],
            type: '',
            url: apiUrl.payment_option_detail + '?optionType=' + this.initType,
            id: 'ddlPaymentOption_' + Math.floor(Math.random() * 1000)
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
                this.pmOption = new PaymentOptionModel(selectedItem);
                this.$emit('onChange', this.pmOption);
            }
        },
        bindData(url) {
            kendo.jQuery('#' + this.id).kendoDropDownList({
                dataTextField: "bankAccountName",
                dataValueField: "lineId",
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
                    group: {field: 'name'}
                }),
                change: this.onChange,
                filter: 'contains'
            });
        },
    },
    watch: {
        initPaymentOption() {
            this.pmOption = this.initPaymentOption;
        },
        initType() {
            this.type = this.initType;
        },
    },
    async created() {
        // this.loadData(this.url);
    },
    async mounted() {
        this.bindData(this.url);
        /* Initial obj */
        this.pmOption = this.initPaymentOption;
        this.type = this.initType;
        // this.$emit('onChange', this.pmOption);
        // create DropDownList from input HTML element
        // await this.loadData('', this.supBaseUrl);
    }
}
</script>