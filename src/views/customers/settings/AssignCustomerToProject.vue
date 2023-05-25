<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col cols="12" sm="12">
                    <v-card
                        outlined
                        dense
                        class="pa-4 no_border rounded-sm"
                        color="white">
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-card outlined dense class="no_border">
                                <h2 class="mb-0">{{ $t("project") }}</h2>
                                <v-icon
                                    onclick="window.history.go(-1); return false;"
                                    style="cursor: pointer; color: #333; font-size: 40px;"
                                    class="float-right">close
                                </v-icon>
                            </v-card>
                            <v-card outlined dense class="px-3 no_border" color="grayBg">
                                <v-row>
                                    <v-col sm="3" cols="12" class="pb-0">
                                        <label class="label  mb-0">{{ $t("name") }}</label>
                                        <v-text-field
                                            class="mt-1"
                                            tage="Catalog Name"
                                            v-model="project.name"
                                            :placeholder="$t('name')"
                                            outlined/>
                                    </v-col>
                                    <v-col sm="3" cols="12" class="pb-0">
                                        <label class="label  mb-0 mt-1" style="">{{
                                                $t("code")
                                            }}</label>
                                        <v-text-field
                                            class="mt-1"
                                            tage="Number"
                                            v-model="project.code"
                                            outlined/>
                                    </v-col>
                                    <v-col sm="3" cols="12" class="pb-0">
                                        <label class="label  mb-0 mt-1" style="">{{
                                                $t("description")
                                            }}</label>
                                        <v-text-field
                                            class="mt-1"
                                            tage="Description"
                                            v-model="project.description"
                                            outlined/>
                                    </v-col>
                                </v-row>
                            </v-card>
                            <v-card outlined dense class="no_border mb-1" color="white">
                                <v-row>
                                    <v-col sm="5" cols="12" class="">
                                        <v-row>
                                            <v-col sm="12">
                                                <h3 class=" mb-0">
                                                    {{ $t("product_to_add_into_this_catalog") }}
                                                </h3>
                                            </v-col>
                                            <v-col cols="12">
                                                <kendo-datasource ref="customerDS"
                                                                  :data="customerList"/>
                                                <kendo-grid id="gridLeft" class="grid-function"
                                                            :data-source-ref="'customerDS'"
                                                            :editable="true"
                                                            :scrollable-virtual="true">
                                                    <kendo-grid-column
                                                        :field="'no'"
                                                        :title="$t('no')"
                                                        :template="rowNumberTmplL"
                                                        :width="45"
                                                        :column-menu="false"
                                                        :headerAttributes="{ style: 'background-color: #EDF1F5;', class: 'text-center'	}"
                                                        :attributes="{style: 'text-align: center'}"/>
                                                    <kendo-grid-column
                                                        :field="'customer'"
                                                        :title="$t('customer')"
                                                        :width="150"
                                                        :template="'<span>#=customer.number# - #=customer.name#</span>'"
                                                        :editor="customerDropDownEditor"
                                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                                    <kendo-grid-column
                                                        :field="''"
                                                        :title="$t('action')"
                                                        :width="70"
                                                        :command="[{ iconClass: 'k-icon k-i-trash', text: 'Delete', click: removeRowL }]"
                                                        :headerAttributes="{style: 'text-align: right; background-color: #EDF1F5'}"/>
                                                </kendo-grid>

                                                <v-btn color="primary" @click="addRowL"
                                                       class="float-left rounded-0 white--text mt-3">
                                                    <v-icon size="" class="ma-1">mdi-plus</v-icon>
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                    <v-col sm="5" cols="12" class="">
                                        <v-row>
                                            <v-col sm="12">
                                                <h3 class=" mb-0">
                                                    {{ $t("product_to_add_into_this_catalog") }}
                                                </h3>
                                            </v-col>
                                            <v-col cols="12">
                                                <kendo-datasource ref="supplierDS"
                                                                  :data="supplierList"/>
                                                <kendo-grid id="gridRight" class="grid-function"
                                                            :data-source-ref="'supplierDS'"
                                                            :editable="true"
                                                            :scrollable-virtual="true">
                                                    <kendo-grid-column
                                                        :field="'no'"
                                                        :title="$t('no')"
                                                        :template="rowNumberTmplR"
                                                        :width="45"
                                                        :column-menu="false"
                                                        :headerAttributes="{ style: 'background-color: #EDF1F5;', class: 'text-center'	}"
                                                        :attributes="{style: 'text-align: center'}"/>
                                                    <kendo-grid-column
                                                        :field="'supplier'"
                                                        :title="$t('supplier')"
                                                        :width="150"
                                                        :template="'<span>#=supplier.number# - #=supplier.name#</span>'"
                                                        :editor="SupplierDropDownEditor"
                                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                                    <kendo-grid-column
                                                        :field="''"
                                                        :title="$t('action')"
                                                        :width="70"
                                                        :command="[{ iconClass: 'k-icon k-i-trash', text: 'Delete', click: removeRowR }]"
                                                        :headerAttributes="{style: 'text-align: right; background-color: #EDF1F5'}"/>
                                                </kendo-grid>
                                                <v-btn color="primary" @click="addRowR"
                                                       class="float-left rounded-0 white--text mt-3">
                                                    <v-icon size="" class="ma-1">mdi-plus</v-icon>
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-row>
                            </v-card>
                            <v-divider/>
                            <v-card outlined dense class="no_border function_footer">
                                <v-btn @click="cancel"
                                       color="black"
                                       outlined
                                       class="text-capitalize  black--text float-left"
                                >{{ $t("cancel") }}
                                </v-btn>

                                <v-btn @click="onSaveClose"
                                       color="primary"
                                       class="float-right  white--text text-capitalize"
                                >{{ $t("save_close") }}
                                </v-btn>

                            </v-card>
                        </v-form>
                    </v-card>
                </v-col>
            </v-row>
            <LoadingMe :isLoading="showLoading" :fullPage="true" :myLoading="true"/>
        </v-container>
    </v-app>
</template>

<script>
import ProjectModel from "@/scripts/model/Project";
import kendo from "@progress/kendo-ui";

const projectModel = new ProjectModel({})

const projectHandler = require("@/scripts/projectHandler")
const customerHandler = require("@/scripts/customerHandler")
const supplierHandler = require("@/scripts/supplierHandler")

const $ = require("jquery")

export default {
    name: "AddCatalog",
    props: ['id'],
    components: {
        LoadingMe: () => import(`@/components/Loading`)
    },
    data: () => ({
        showLoading: false,
        customerList: [],
        customers: [],
        customer: {},
        supplier: {},
        valid: true,
        project: projectModel,
        supplierList: []
    }),
    methods: {
        async initData() {
            if (this.$route.params.id !== undefined) {
                await this.loadSingleProject()
            } else {
                this.clear()
            }
        },
        clear() {
            this.project = {}
            this.customers = []
            this.customerList = []
            this.supplierList = []
        },
        addRowL() {
            let ds = this.$refs.customerDS.kendoWidget(),
                total = ds.total();
            ds.insert(total, {
                customer: this.customer
            })
        },
        addRowR() {
            let ds = this.$refs.supplierDS.kendoWidget(),
                total = ds.total();
            ds.insert(total, {
                supplier: this.supplier
            })
        },
        removeRowR(e) {
            e.preventDefault();
            var grid = kendo.jQuery("#gridRight").data("kendoGrid"),
                dataSource = grid.dataSource,
                dataItem = grid.dataItem($(e.currentTarget).closest("tr"));

            if (dataSource.total() > 1) {
                dataSource.remove(dataItem);
            }
        },
        // Remove Row
        removeRowL(e) {
            e.preventDefault();
            var grid = kendo.jQuery("#gridLeft").data("kendoGrid"),
                dataSource = grid.dataSource,
                dataItem = grid.dataItem($(e.currentTarget).closest("tr"));

            if (dataSource.total() > 1) {
                dataSource.remove(dataItem);
            }
        },
        rowNumberTmplL(dataItem) {
            let ds = this.$refs.customerDS.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        rowNumberTmplR(dataItem) {
            let ds = this.$refs.supplierDS.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        customerDropDownEditor(container, options) {
            kendo.jQuery('<input required name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: true,
                    autoWidth: true,
                    height: 400,
                    filter: "contains",
                    dataTextField: "name",
                    dataValueField: "id",
                    headerTemplate: '<div class="dropdown-header k-widget k-header">' +
                        '<span>Customers </span>' +
                        '<span> </span>' +
                        '</div>',
                    template: "<span>#=number# - #=name#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                        serverFiltering: true,
                        transport: {
                            read: {
                                url: customerHandler.search(),
                            },
                            dataType: "json",
                        },
                        schema: {
                            model: {
                                id: "id",
                                fields: {
                                    id: {type: "string"},
                                    type: {type: "string"},
                                    number: {type: "string"},
                                    billingType: {type: "string"},
                                    consumerId: {type: "string"},
                                    taxId: {type: "string"},
                                }
                            },
                            data: function (response) {
                                return response.data;
                            },
                            total: function (response) {
                                return response.data.count;
                            }
                        },
                        // data: this.variants
                    }),

                })
        },
        SupplierDropDownEditor(container, options) {
            kendo.jQuery('<input required name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: true,
                    autoWidth: true,
                    height: 400,
                    filter: "contains",
                    dataTextField: "name",
                    dataValueField: "id",
                    headerTemplate: '<div class="dropdown-header k-widget k-header">' +
                        '<span>Supplier </span>' +
                        '<span></span>' +
                        '</div>',
                    template: "<span>#=name#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                        serverFiltering: true,
                        transport: {
                            read: {
                                url: supplierHandler.search(),
                            },
                            dataType: "json",
                        },
                        schema: {
                            model: {
                                id: "id",
                                fields: {
                                    id: {type: "string"},
                                    type: {type: "string"},
                                    number: {type: "string"},
                                    billingType: {type: "string"},
                                    consumerId: {type: "string"},
                                    taxId: {type: "string"},
                                }
                            },
                            data: function (response) {
                                return response.data;
                            },
                            total: function (response) {
                                return response.data.count;
                            }
                        },
                        // data: this.variants
                    }),

                })
        },
        async onSaveClose() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    let customerDS = this.$refs.customerDS.kendoWidget()
                    let supplierDS = this.$refs.supplierDS.kendoWidget()
                    let data = {
                        id: this.$route.params.id,
                        name: this.project.name,
                        code: this.project.code,
                        description: this.project.description,
                        customers: customerDS.data(),
                        suppliers: supplierDS.data(),
                        type: this.$route.params.id ? this.$route.query.type : 'new'
                    }
                    projectHandler.create(data).then(response => {
                        if (response.data.statusCode === 201) {
                            this.$snotify.success('Success')
                            this.close(response.data.data)
                        }
                    }).catch(e => {
                        this.$snotify.error('Something went wrong')
                        this.errors.push(e)
                    })
                })
            })
        },
        cancel() {
            window.history.go(-1)
        },
        close(data) {
            // window.history.go(-1)
            this.$router.push({
                name: 'Customers', params: {
                    data: data
                }
            })
        },
        async loadSingleProject() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    projectHandler.get(this.$route.params.id).then(response => {
                        if (response.data.statusCode === 200) {
                            this.project = response.data.data[0]
                            if (this.project.hasOwnProperty('customers')) {
                                this.customerList = this.project.customers
                            }
                            if (this.project.hasOwnProperty('suppliers')) {
                                this.supplierList = this.project.suppliers
                            }
                        }
                    }).catch(e => {
                        this.$snotify.error('Something went wrong')
                        this.errors.push(e)
                    })
                })
            })
        },
    },
    mounted: async function () {
        await this.initData()
    },
    watch: {
        id() {
            // this.product = this.selectedProduct
            window.console.log(this.id, 'watch')
            if (this.id !== undefined) {
                this.loadSingleProject()
            } else {
                this.clear()
            }
        }
    },

};
</script>

<style scoped>
.dropdown-header {
    border-width: 0 0 1px 0;
    text-transform: uppercase;
}

.dropdown-header > span {
    display: inline-block;
    padding: 10px;
}

.dropdown-header > span:first-child {
    width: 50px;
}

.k-list-container > .k-footer {
    padding: 10px;
}

.function_content {
    padding: 0 25px 25px;
    border-bottom: 0;
    background-color: #fff !important;
}

@media (min-width: 1264px) {
    .container {
        /* max-width: 1185px; */
        max-width: 1080px !important;
    }
}

.grayBg {
    background-color: #F8F8F9;
}

@media (max-width: 576px) {
    ..mb-6 {
        margin-bottom: 0 !important;
    }
}

.section2 {
    border: 1px solid #d6d7d8;
}

.border_grey {
    border: 1px solid #d6d7d8;
}

.attachment_table {
    width: 100%;
}

.my_radio [type="radio"] + label {
    position: relative;
    padding: 6px;
    grid-template-columns: 15% 80% !important;
    display: grid;
}

.upload_btn {
    padding: 10px 6px;
    text-align: center;
    color: white;
    margin-top: 15px;
    margin-bottom: none !important;
    border-radius: 22px;
    background: #92d050;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: transparent !important;
}
</style>
