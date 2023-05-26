<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pt-0">
            <h2 class="mb-0">{{$t('employee')}}</h2>
            <p class="mb-0">{{$t('employee_desc')}} </p>
            <v-dialog v-model="dialogm2" max-width="600px">
                <template v-slot:activator="{ on }">
                    <v-btn class="white--text float-right text-capitalize" color="primary" v-on="on" @click="onNewClick">
                        {{$t('assign_customer')}}
                    </v-btn>
                </template>
                <v-card>
                    <div class="modal_header">
                        <v-card-title>{{$t('assign_employee_to_customer')}}</v-card-title>
                        <v-icon class="btn_close" @click="dialogm2 = false">close</v-icon>
                    </div>
                    <v-card-text class="modal_text_content">
                        <v-row>
                            <v-col sm="8" cols="12" class="pb-0">
                                <label class="label">{{$t('employee_to_be_assign')}}</label>
                                <p class="text_tip">{{$t('employee_to_be_assign_desc')}}</p>
                                <v-text-field class="mt-1"
                                              outlined
                                              tage="Employee to be assign"
                                              placeholder=""/>
                            </v-col>
                            <v-col sm="4" cols="12" class="mt-6 pb-0">
                                <p class="mb-0 ">{{$t('employee_to_be_assign_text_right')}}</p>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col sm="4" cols="4" class="py-0">
                                <v-select class=""
                                          :items="suppliers"
                                          :rules="[v => !!v || 'Term  is required']"
                                          return-object
                                          outlined
                                />
                            </v-col>
                            <v-col sm="2" cols="2" class="py-0 pl-0">
                                <v-btn class="btn_search" @click="searchTransaction"
                                       style="background-color: rgb(237, 241, 245)">
                                    <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
                                </v-btn>
                            </v-col>
                            <v-col sm="4" cols="5" class="py-0">
                                <p class="mb-0">{{$t('number_of_customer_selected_in_the_employee')}}</p>
                            </v-col>
                            <v-col sm="2" cols="1" class="pb-0 pl-0">
                                <p class="mb-0 text-bold" style="font-size: 35px">{{$t('50')}}</p>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col sm="12" cols="12" class="pb-0">
                                <kendo-listbox id="optional" class="custom-list-box"
                                               :draggable="true"
                                               :connect-with="'selected'"
                                               :drop-sources="['selected']"
                                               :toolbar-tools="['moveUp', 'moveDown', 'transferTo', 'transferFrom', 'transferAllTo', 'transferAllFrom', 'remove']"
                                               style="height:280px; width: 48%">
                                    <option>Steven White</option>
                                    <option>Nancy King</option>
                                    <option>Nancy Davolio</option>
                                    <option>Robert Davolio</option>
                                    <option>Michael Leverling</option>
                                    <option>Andrew Callahan</option>
                                    <option>Michael Suyama</option>
                                </kendo-listbox>
                                <kendo-listbox id="selected" class="ml-2"
                                               :draggable="true"
                                               :connect-with="'optional'"
                                               :drop-sources="['optional']"
                                               style="height:280px; width: 48%">
                                </kendo-listbox>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-divider/>
                    <v-card-actions class="modal_footer">
                        <v-row>
                            <v-col sm="6" cols="6" class="py-0">
                                <v-btn color="primary"
                                              outlined
                                              class=" text-capitalize  black--text float-left" @click="dialogm2 = false">{{$t('cancel')}}</v-btn>
                            </v-col>
                            <v-col sm="6" cols="6" class="py-0">
                                <v-btn color="primary"
                                              class=" white--text text-capitalize float-right" @click.native="OnSaveClick(false,option)">
                                    {{$t('save_close')}}
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-actions>

                </v-card>
            </v-dialog>
        </v-col>

        <v-col sm="12" cols="12">
            <template>
                <v-simple-table class="attachment_table">
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th class="text-uppercase">{{$t('employee')}}</th>
                            <th class="text-uppercase">{{$t('no_of_customer')}}</th>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>General Suppliers</td>
                            <td class="text-bold">GS</td>
                            <td>
                                 <v-btn class="btn_edit_setting">
                                    <v-icon class="white--text" size="14">mdi-pen</v-icon>
                                    <span class="capitalize ml-1 white--text font_14">{{$t('edit')}}</span>
                                </v-btn>
                            </td>
                        </tr>
                        <tr>
                            <td>Non-Taxable Business - uppliers</td>
                            <td class="text-bold">GS</td>
                            <td>
                                <v-btn class="btn_edit_setting">
                                    <v-icon class="white--text" size="14">mdi-pen</v-icon>
                                    <span class="capitalize ml-1 white--text font_14">{{$t('edit')}}</span>
                                </v-btn>
                            </td>
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </template>
        </v-col>

        <v-col sm="12" cols="12">
            <v-dialog v-model="dialogm1" max-width="600px">
                <template v-slot:activator="{ on }">
                    <v-btn class="white--text float-right text-capitalize" color="primary" v-on="on" @click="onNewClick">
                        {{$t('assign_location')}}
                    </v-btn>
                </template>
                <v-card>
                    <div class="modal_header">
                        <v-card-title>{{$t('assign_employee_to_location')}}</v-card-title>
                        <v-icon class="btn_close" @click="dialogm1 = false">close</v-icon>
                    </div>
                    <v-card-text class="modal_text_content">
                        <v-row>
                            <v-col sm="8" cols="12" class="pb-0">
                                <label class="label">{{$t('employee_to_be_assign')}}</label>
                                <p class="text_tip">{{$t('employee_to_be_assign_desc')}}</p>
                                <v-text-field class="mt-1"
                                              outlined
                                              tage="Employee to be assign"
                                              placeholder=""/>
                            </v-col>
                            <v-col sm="4" cols="12" class="mt-6 pb-0">
                                <p class="mb-0 ">{{$t('employee_to_be_assign_text_right')}}</p>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col sm="6" cols="5" class="py-0">
                                <p class="mb-0">{{$t('number_of_location_selected_in_the_employee')}}</p>
                            </v-col>
                            <v-col sm="2" cols="1" class="pb-0 pl-0">
                                <p class="mb-0 text-bold" style="font-size: 35px">{{$t('50')}}</p>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col sm="12" cols="12" class="pb-0">
                                <kendo-listbox id="optional" class="custom-list-box"
                                               :draggable="true"
                                               :connect-with="'selected'"
                                               :drop-sources="['selected']"
                                               :toolbar-tools="['moveUp', 'moveDown', 'transferTo', 'transferFrom', 'transferAllTo', 'transferAllFrom', 'remove']"
                                               style="height:280px; width: 48%">
                                    <option>Steven White</option>
                                    <option>Nancy King</option>
                                    <option>Nancy Davolio</option>
                                    <option>Robert Davolio</option>
                                    <option>Michael Leverling</option>
                                    <option>Andrew Callahan</option>
                                    <option>Michael Suyama</option>
                                </kendo-listbox>
                                <kendo-listbox id="selected" class="ml-2"
                                               :draggable="true"
                                               :connect-with="'optional'"
                                               :drop-sources="['optional']"
                                               style="height:280px; width: 48%">
                                </kendo-listbox>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-divider/>
                    <v-card-actions class="pa-4">
                        <v-row>
                            <v-col sm="6" cols="6" class="py-0">
                                <v-btn color="black"
                                       outlined
                                       class=" text-capitalize  black--text float-left" @click="dialogm1 = false">{{$t('cancel')}}</v-btn>
                            </v-col>
                            <v-col sm="6" cols="6" class="py-0">
                                <v-btn color="primary"
                                       class="px-3  white--text text-capitalize float-right" @click.native="OnSaveClick(false,option)">
                                    {{$t('save_close')}}
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-actions>

                </v-card>
            </v-dialog>
        </v-col>
        <v-col sm="12" cols="12">
            <template>
                <v-simple-table class="attachment_table">
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th class="text-uppercase">{{$t('employee')}}</th>
                            <th class="text-uppercase">{{$t('location')}}</th>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>General Suppliers</td>
                            <td class="text-bold">GS</td>
                            <td>
                                <v-btn class="btn_edit_setting">
                                    <v-icon class="white--text" size="14">mdi-pen</v-icon>
                                    <span class="capitalize ml-1 white--text font_14">{{$t('edit')}}</span>
                                </v-btn>
                            </td>
                        </tr>
                        <tr>
                            <td>Non-Taxable Business - uppliers</td>
                            <td class="text-bold">GS</td>
                            <td>
                                <v-btn class="btn_edit_setting">
                                    <v-icon class="white--text" size="14">mdi-pen</v-icon>
                                    <span class="capitalize ml-1 white--text font_14">{{$t('edit')}}</span>
                                </v-btn>
                            </td>
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </template>
        </v-col>
    </v-row>
</template>

<script>
    const axios = require('axios')
    const apiUrl = require('../../../apiUrl.js')
    // const store = require("../../institute.js")
    // const accountGroup = require("../../scripts/model/AcountGroup")
    // const institute_id = store.default.state.cookies.instituteId
    import {i18n} from '@/i18n'

    export default {
        components: {},
        data: () => ({
            dialogm1: '',
            dialogm2: false,
            compeletLoading: true,
            isFullpage: false,
            snackbar: false,
            textStatus: 'Success',
            color: '#3DA72E',
            timeout: 6000,
            x: 'right',
            y: 'top',
            accountTypes: [],
            accountType: {
                name: '',
                nature: '',
                statement_group: '',
                number: 0,
            },
            paymentOptions: [],
            paymentMethod: {
                id: '',
                code: '',
                name: '',
                account: [],
                type: 'pmd',
                digital: 0
            },
            headers: [
                {
                    text: i18n.t('name'),
                    align: 'start',
                    sortable: false,
                    value: 'name',
                },
                {text: i18n.t('description'), value: 'description', sortable: false,},
                {text: i18n.t('account_type'), value: 'account_type', sortable: false, align: ' d-none'},
                {text: i18n.t('account_type'), value: 'account_type.name', sortable: false,},
                {text: i18n.t('action'), value: 'actions', sortable: false},
            ],
            option: 1
        }),
        props: {},
        computed: {},
        watch: {
            dialogm2(val) {
                val || this.close()
            },
        },
        created() {
        },
        methods: {
            async onEditClick(value) {
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        this.paymentMethod = value
                        this.accountType = value.account
                        this.dialogm2 = true
                        this.option = 2
                    }, 300);
                })
            },
            onNewClick() {
                this.option = 1
                this.clear()
            },
            OnSaveClick(isNew, option) {
                //eslint-disable-next-line no-console
                let self = this
                let url, method = ''
                if (option === 1) { // Create
                    url = apiUrl.wcap_setting_post
                    method = 'post'
                } else if (option === 2) { // Update
                    url = apiUrl.wcap_setting_put + self.paymentMethod.id
                    method = 'put'
                }

                let data = {
                    code: self.paymentMethod.code,
                    name: self.paymentMethod.name,
                    type: 'pmd',
                    account: self.accountType,
                    digital: self.paymentMethod.digital === undefined ? 0 : self.paymentMethod.digital
                }
                window.console.log(method, option)
                axios({
                    method: method,
                    url: url,
                    data: data
                }).then(function (response) {
                    if (response.status === 200) {
                        self.snackbar = true
                        self.textStatus = "Success"
                        self.color = "#3DA72E"
                        if (isNew === false) {
                            // clear form
                            self.loadPayment('pmd')
                            self.dialogm2 = false
                            self.clear()
                        }
                    }
                }).catch(function (error) {
                    self.snackbar = true
                    self.textStatus = "Failed"
                    self.color = "#EF5350"
                    //eslint-disable-next-line no-console
                    console.log(error)
                });
            },
            close() {
                this.dialogm2 = false
            },
            clear() {
                this.accountType = []
                this.paymentMethod = []
            },
            async loadAccountTypes() {
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved')
                        axios.get(apiUrl.account_type_list_get)
                            .then(res => {
                                this.accountTypes = res.data
                            })
                    }, 300)
                })
            },
            async loadPayment(type) {
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved')
                        axios.get(apiUrl.wcap_setting_get + type)
                            .then(res => {
                                this.paymentOptions = res.data.data
                            })
                    }, 300)
                })
            },
        },
        mounted: async function () {
            this.loadAccountTypes()
            this.loadPayment('pmd')
        }
    };
</script>
<style scoped>
    @media (max-width: 576px) {

    }
</style>