<template>
    <div class='demo-section k-header'>
        <input :id="id" style="width: 100%; margin-top: 4px"/>
        <script :id="templateId" type="text/x-kendo-template">
            <strong> #: (connectId || number) # - #: name #</strong>
        </script>
    </div>
</template>

<script>
import kendo from "@progress/kendo-ui";
import CustomerModel from "@/scripts/model/Customer";
import customerHandler from "@/scripts/customerHandler";

const apiUrl = require('@/api/customer');
const $ = kendo.jQuery
export default {
    name: 'CustomerDropDownList',
    components: {},
    props: {
        initCustomer: {
            type: Object,
        },
        initModel: {
            type: Object
        },
        initDisabled: {
            type: Boolean
        }
    },
    data() {
        return {
            customer: new CustomerModel({}),
            selectValue: {},
            customerList: [],
            type: '',
            enable: true,
            url: apiUrl.customer_centerv1,
            id: 'ddlCustomer_' + Math.floor(Math.random() * 1000),
            templateId: 'ddlTemplate_' + Math.floor(Math.random() * 1000)
        }
    },
    // computed: mapState({
    //     segments: state => state.segments.all
    // }),
    methods: {
        async showLoadingIcon() {
            $('.k-i-arrow-s').addClass('k-loading')
        },
        async hideLoadingIcon() {
            setTimeout(function () {
                $('.k-i-arrow-s').removeClass('k-loading')
            }, 3000)
        },
        async customerDetail(id) {
            const strFilter = '?id=' + id
            if (id !== '') {
                this.showLoadingIcon()
                customerHandler.customerDetail(strFilter).then((res) => {
                    if (res.data.statusCode === 200) {
                        const lines = res.data.data || []
                        lines.forEach(item => {
                            this.customer = {
                                id: item.id,
                                type: item.type || {},
                                isDonor: item.isDonor || false,
                                crn: item.crn || '',
                                customerType: item.customerType || {},
                                number: item.number || '',
                                numberName: (item.number || '') + ' - ' + (item.name || ''),
                                name: item.name || '',
                                alternativeName: item.alternativeName || '',
                                taxId: item.taxId || '',
                                consumerId: item.consumerId || '',
                                registeredDate: item.registeredDate || '',
                                customerGroup: item.customerGroup,
                                receivableAcc: item.receivableAcc,
                                saleDepositAcc: item.saleDepositAcc,
                                saleDiscountAcc: item.saleDiscountAcc,
                                priceLevel: item.priceLevel,
                                billPayment: item.billPayment,
                                cashPayment: item.cashPayment || {},
                                qrPayment: item.qrPayment || {},
                                nature: item.nature,
                                image: item.image || {},
                                noteOnInvoice: item.noteOnInvoice || '',
                                billingAddress: item.billingAddress,
                                contactPerson: item.contactPerson,
                                deliveryAddress: item.deliveryAddress,
                                email: item.email,
                                baseCurrency: item.baseCurrency,
                                decimalFormat: item.decimalFormat
                            };
                        })
                        this.$emit('onChange', this.customer);
                    } else {
                        this.$emit('onChange', {});
                    }
                })
            }
            return []
        },
        async onChange(ev) {
            if (ev) {
                const selectedIndex = ev.sender.select();
                const selectedItem = ev.sender.dataItem(selectedIndex).toJSON();
                await this.customerDetail(selectedItem.id || '')
                // if (line) {
                //     this.$emit('onChange', this.customer);
                // }
                // await this.selectItem(this.initModel)
            }
        },
        bindData(url) {
            kendo.jQuery('#' + this.id).kendoDropDownList({
                dataTextField: "name",
                dataValueField: "id",
                dataFilter: "contains",
                enable: this.enable,
                valueTemplate: kendo.template(kendo.jQuery('#' + this.templateId).html()),
                template: kendo.template(kendo.jQuery('#' + this.templateId).html()),
                optionLabelTemplate: '<span>-- Please select --</span>',
                optionLabel: '-- Select --',
                dataSource: new kendo.data.DataSource({
                    transport: {
                        read: {
                            url: url,
                        },
                        dataType: "json",
                    },
                    schema: {
                        model: {
                            id: "id",
                        },
                        data: (response) => {
                            this.selectItem()
                            return response.data
                        },
                    },
                    sort: [
                        {field: "name", dir: "asc"}
                    ],
                    // group: {}//{field: 'type.name'}
                }),
                filtering: function (ev) {
                    const filterValue = ev.filter != undefined ? ev.filter.value : "";
                    ev.preventDefault();
                    this.dataSource.filter({
                        logic: "or",
                        filters: [
                            {
                                field: "name",
                                operator: "contains",
                                value: filterValue
                            },
                            {
                                field: "number",
                                operator: "contains",
                                value: filterValue
                            },
                            {
                                field: "connectId",
                                operator: "contains",
                                value: filterValue
                            },
                            {
                                field: "crn",
                                operator: "contains",
                                value: filterValue
                            }
                        ],
                    });
                },
                // dataBound: this.onDataBound,
                change: this.onChange,
                filter: 'contains'
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
        initCustomer() {
            this.customer = this.initCustomer;
        },
        initDisabled() {
            this.enable = this.initDisabled;
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
        this.customer = this.initCustomer;
        this.disabled = this.initDisabled;
        this.selectValue = this.initModel;
        // this.type = this.initType;
        // this.$emit('onChange', this.pmOption);
        // create DropDownList from input HTML element
        // await this.loadData('', this.supBaseUrl);
    }
}
</script>
<style>
.demo-section {
    width: auto;
}

.demo-section h2 {
    text-transform: uppercase;
    font-size: 1.2em;
    margin-bottom: 10px;
}
</style>