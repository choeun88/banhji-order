<template>
    <v-row>
        <v-col sm="12" cols="12" class="grayBg px-6 pl-3">
            <v-card color="white" class="pa-3 no_border" elevation="0">
                <!-- <v-row>
                    <v-col sm="12" cols="12" class="py-0">
                        <h2 class="mb-0 font_20">{{ $t('sale_summary') }}</h2>
                    </v-col>
                </v-row> -->

                <v-row>
                    <v-col sm="12" cols="12">
                        <!-- <v-row class="">
                            <v-col sm="2" cols="12" class="py-0">
                                <v-select class="mt-1"
                                    :items="dateSorters"
                                    v-model="mDateSorter"
                                    item-text="name"
                                    item-value="id"
                                    @change="onSorterChanges"
                                    outlined
                                />
                            </v-col>
                          <v-col sm="3" cols="12" class="py-0">
                            <app-datepicker
                              :initialDate="startDate"
                              @emitDate="startDate = $event"
                            />
                          </v-col>

                          <v-col sm="3" cols="12" class="py-0">
                            <app-datepicker
                              :initialDate="endDate"
                              @emitDate="endDate = $event"
                            />
                          </v-col>

                          <v-col sm="2" cols="12" class="py-0">
                            <v-select
                                class="mt-1"
                                item-text="name"
                                item-value="pk"
                                v-model="register"
                                :items="registers"
                                :placeholder="$t('register')"
                                outlined>
                            </v-select>
                          </v-col>
                          <v-col sm="2" cols="1" class="py-0 mt-1">
                            <v-btn color="primary white--text" @click="search({})">
                              <i
                                class="b-search"
                                style="font-size: 18px; color: #fff !important"
                              />
                            </v-btn>
                          </v-col>
                        </v-row> -->
                        <gridFullScreen>
                            <template>
                                <kendo-datasource
                                    ref="saleSummary"
                                    :group="group"
                                    :data="sSumary" />
                                <kendo-grid
                                    id="saleSummary" class="grid-function"
                                    :data-source-ref="'saleSummary'"
                                    :editable="false"
                                    :groupable="true"
                                    :column-menu="true"
                                    :noRecords="true"

                                    :sortable="true"
                                    :excel-file-name="$t('sale_summary')+'.xlsx'"
                                    :excel-filterable="true"
                                    :excel-all-pages="true"
                                    :toolbar="['excel']"

                                    :scrollable-virtual="true">
                                    <kendo-grid-column
                                        :field="'sesNum'"
                                        :title="$t('session')"
                                        :width="120"
                                        :column-menu="false"
                                        :headerAttributes="{style: 'background-color: #EDF1F5;',class: 'text-products px-1' }"
                                    />
                                    <kendo-grid-column
                                        :field="'registerName'"
                                        :title="$t('register')"
                                        :width="100"
                                        :hidden="true"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                    <kendo-grid-column
                                        :field="'txnNumber'"
                                        :title="$t('number')"
                                        :width="180"
                                        :attributes="{style: 'text-align: right; ', class:'tb_name_td'}"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                    <kendo-grid-column
                                        :field="'issuedDate'"
                                        :title="$t('issued_date')"
                                        :width="200"
                                        :template="'#= kendo.toString(new Date(issuedDate), `yyyy-MMM-dd hh:mm tt`)#'"
                                        :attributes="{style: 'text-align: right; ', class:'tb_name_td'}"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                    <kendo-grid-column
                                        :field="'cashier'"
                                        :title="$t('cashier')"
                                        :width="200"
                                        :hidden="true"
                                        :attributes="{style: 'text-align: right; ', class:'tb_name_td'}"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                    <kendo-grid-column
                                        :field="'subTotal'"
                                        :title="$t('sub_total')"
                                        :width="150"
                                        :template="'#= subTotal.toFixed(2) #'"
                                        :attributes="{style: 'text-align: right; ', class:'tb_name_td'}"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                    <kendo-grid-column
                                        :field="'discount'"
                                        :title="$t('discount')"
                                        :width="150"
                                        :template="'#= discount.toFixed(2) #'"
                                        :attributes="{style: 'text-align: right; ', class:'tb_name_td'}"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                    <kendo-grid-column
                                        :field="'comission'"
                                        :title="$t('sale_comission')"
                                        :template="'#= comission.toFixed(2) #'"
                                        :width="150"
                                        :attributes="{style: 'text-align: right; ', class:'tb_name_td'}"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                    <kendo-grid-column
                                        :field="'tax'"
                                        :title="$t('vat')"
                                        :template="'#= tax.toFixed(2) #'"
                                        :width="150"
                                        :attributes="{style: 'text-align: right; ', class:'tb_name_td'}"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                    <kendo-grid-column
                                        :field="'total'"
                                        :template="'#= total.toFixed(2) #'"
                                        :title="$t('total_amount')"
                                        :width="150"
                                        :attributes="{style: 'text-align: right; ', class:'tb_name_td'}"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                </kendo-grid>
                                <LoadingMe
                                    :isLoading="showLoading"
                                    :fullPage="false"
                                    type="loading"
                                    :myLoading="true"/>
                            </template>
                        </gridFullScreen>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
// import DatePickerComponent from "@/components/custom_templates/DatePickerComponent";
const commerceHandler = require("@/scripts/commerce/handler/commerceHandler")
const cookieJS = require("@/cookie.js");
const { instituteId } = cookieJS.getCookie()
import kendo from "@progress/kendo-ui"
import { i18n } from '@/i18n';
import JSZip from "jszip";
window.JSZip = JSZip;
export default {
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        gridFullScreen: () => import("@/components/gridFullScreen"),
        // "app-datepicker": DatePickerComponent,
    },
    data: () => ({
        showLoading: false,
        loadingAlert: false,
        loadingColorAlert: '',
        loadingTextAlert: '',
        startDate: new Date().toISOString().substring(0, 10),
        endDate: new Date().toISOString().substring(0, 10),
        register: '',
        registers: [],
        activeStore: localStorage.getItem(instituteId + 'commStore') != null ? JSON.parse(localStorage.getItem(instituteId + 'commStore')) : {},
        mDateSorter: 3,
        allCount: true,
        allRegister: [],
        number_format: 'n2',
        txns: [],
        group: {field: 'sesNum'},
    }),
    props: {sSumary: {}},
    watch: {
        // 'sSumary': 'prepareData'
    },
    computed: {
        dateSorters() {
            return [
                {id: 1, name: i18n.t('today')},
                {id: 2, name: i18n.t('this_week')},
                {id: 3, name: i18n.t('this_month')},
                {id: 4, name: i18n.t('this_year')}
            ]
        }
    },
    methods: {
        subTotalTmpl(dataItem) {
            return kendo.toString(parseFloat(dataItem.subTotal), 'n2')
        },
        cashierTmpl(dataItem) {
            const item = dataItem.pinUser;
            if (item) {
                let u = item.name || ''
                return `<span>${u}</span>`;
            } else {
                return ``;
            }
        },
        regiTmpl(dataItem) {
            const item = dataItem.register;
            if (item) {
                let register = this.allRegister.filter((r)=>{return r.pk == item})
                if(register.length == 0){
                    return '';
                }
                let regi = register[0]
                return `<span>${regi.name ? regi.name : ``}</span>`;
            } else {
                return ``;
            }
        },
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.saleSummary.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        search(key){
            let st = new Date(this.startDate + ' 00:00:00').getTime().toString();
            let ed = new Date(this.endDate + ' 23:59:59').getTime().toString();
            this.txns = []
            let d = {
                epsAtt: {
                    ':dateSk': this.activeStore.pk + '/salesumarry',
                    ':startDate': st,
                    ':endDate': ed,
                },
                index: 'dateSk-searchDate-index',
                keyCondition: 'dateSk = :dateSk and searchDate between :startDate and :endDate',
                key: key
            }
            if(this.register != ''){
                d = {
                    epsAtt: {
                        ':regiPk': this.register + '/salesumarry',
                        ':startDate': st,
                        ':endDate': ed,
                    },
                    index: 'regiPk-searchDate-index',
                    keyCondition: 'regiPk = :regiPk and searchDate between :startDate and :endDate',
                    key: key
                }
            }
            this.showLoading = true
            let ds = this.$refs.saleSummary.kendoWidget(),
                total = ds.total()
            if(Object.keys(key).length <= 0){
                ds.data([])
            }
            commerceHandler.reportGets(d).then(res => {
                let data = res.data.data.Items
                if(data.length > 0){
                    data.sort(function (a, b) {
                        return parseFloat(new Date(a.issuedDate).getTime()) - parseFloat(new Date(b.issuedDate).getTime())
                    })
                    data.forEach(d => {
                        if(d.txnNumber != ''){
                            let register = this.allRegister.filter((r)=>{return r.pk == d.regiPk.replace("/salesumarry", "")})
                            // window.console.log(register, this.allRegister, d.regiPk)
                            let comission = d.comission || 0
                            ds.insert(total, {
                                issuedDate: d.issuedDate,
                                register: register[0].name,
                                number: d.txnNumber,
                                subTotal: d.subTotal,
                                dis: d.dis,
                                comission: comission,
                                tax: d.tax,
                                cashier: d.cashier,
                                number_format: this.number_format,
                                amount: d.amount
                            })
                        }
                    })
                    if(res.data.data.hasOwnProperty('LastEvaluatedKey')){
                        let dkey = res.data.data.LastEvaluatedKey
                        this.search(dkey)
                    }else{
                        this.showLoading = false
                    }
                }else{
                    this.showLoading = false
                }
            })
        }, 
        onSorterChanges(val) {
            let today = new Date()
            switch (val) {
                case 1:
                    this.startDate = kendo.toString(today, 'yyyy-MM-dd')
                    this.endDate = kendo.toString(today, 'yyyy-MM-dd')
                    break
                case 2:
                    var first = today.getDate() - today.getDay(),
                        last = first + 6
                    this.startDate = kendo.toString(new Date(today.setDate(first)), 'yyyy-MM-dd')
                    this.endDate = kendo.toString(new Date(today.setDate(last)), 'yyyy-MM-dd')
                    break
                case 3:
                    this.startDate = kendo.toString(new Date(today.getFullYear(), today.getMonth(), 1), 'yyyy-MM-dd')
                    this.endDate = kendo.toString(new Date(today.getFullYear(), today.getMonth(), 31), 'yyyy-MM-dd')
                    break
                case 4:
                    this.startDate = kendo.toString(new Date(today.getFullYear(), 0, 1), 'yyyy-MM-dd')
                    this.endDate = kendo.toString(new Date(today.getFullYear(), 11, 31), 'yyyy-MM-dd')
                    break
                default:
                    this.startDate = ""
                    this.endDate = ""
            }
        },
        loadRegister(){
            commerceHandler.registerGets().then(res => {
                let d = res.data.data
                if(d.length > 0){
                    let rr = []
                    d.forEach(r=>{
                        if(r.store == this.activeStore.pk){
                            rr.push(r)
                        }
                    })
                    this.allRegister = d
                    this.registers = rr
                }
            })
        },
        prepareData(){
            window.console.log(this.btxns, 'from sale sumary')
            // let ds = this.$refs.saleSummary.kendoWidget(),
            //     total = ds.total()
            // ds.data([])
            // if(this.btxns.length > 0){
            //     let data = this.btxns
            //     data.sort(function (a, b) {
            //         return parseFloat(new Date(a.issuedDate).getTime()) - parseFloat(new Date(b.issuedDate).getTime())
            //     })
            //     data.forEach(d => {
            //         if(d.txnNumber != ''){
            //             let register = this.allRegister.filter((r)=>{return r.pk == d.register})
            //             // window.console.log(register, this.allRegister, d.regiPk)
            //             let comission = d.comission || 0
            //             ds.insert(total, {
            //                 issuedDate: d.issuedDate,
            //                 register: register[0].name,
            //                 number: d.txnNumber,
            //                 subTotal: d.subTotal,
            //                 dis: d.dis,
            //                 comission: comission,
            //                 tax: d.tax,
            //                 cashier: d.cashier,
            //                 number_format: this.number_format,
            //                 amount: d.amount
            //             })
            //         }
            //     })
            // }
        },
    },
    mounted: async function () {
        await this.loadRegister()
        this.onSorterChanges(3)
        window.console.log(this.sSumary, 'from sale sumary')
    }
};
</script>
<style scoped>
.acc_group header {
    height: 10px !important;
}

table.acc_group tr td {
    border-bottom: 1px solid #ccc;
    padding: 8px;
    vertical-align: middle;
}

table.acc_group tr td:first-child {
    font-weight: 700;
}

table.acc_group tr td:last-child {
    text-align: center;
}

.v-card__actions .v-btn.v-btn {
    padding: 0 16px;
}

.exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
    font-family: 'Niradei-Bold', serif;
    color: #000 !important;
    border-top: 1px solid #000 !important;
    border-bottom: 1px solid #000 !important;
    font-size: 15px !important;
}

.exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > td {
    color: #000 !important;
    padding: 5px !important;
}

.exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:last-child td {
    border-bottom: 1px solid #000 !important;
}

.function_footer {
    padding: 15px;
    display: inline-block;
}

p {
    color: rgba(0, 0, 0, 0.87);
}

.actionBtn {
    height: 47.2px !important;
}

.text_tip {
    font-size: 9px;
    line-height: 10px;
}

@media (max-width: 576px) {

}
</style>
