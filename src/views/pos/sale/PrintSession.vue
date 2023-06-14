<template>
    <v-container fluid class="py-0" :class="miniVariant == true ? 'pl-9' : ''">
        <LoadingMe
            :isLoading="showLoading"
            style="padding: 0"
            :fullPage="false"
            :myLoading="true" />
        <v-row style="width: 1000px; margin: 0 auto;" id="invoiceContent">
            <v-col class="bloglogo" sm="4" cols="4" style="border-bottom: 0.2px solid;">
                <img
                    class="mt-0 logo"
                    style="border-radius: 100px;border: 3px solid black;"
                    :src="logoUrl"
                    height="150"
                    width="150"
                    alt=""
                />
            </v-col>
            <v-col sm="8" cols="8" class="text-lett pb-0"  style="border-bottom: 0.2px solid;margin-top: 15px;">
                <v-simple-table>
                    <template v-slot:default>
                        <tbody class="tb-pong">
                            <tr>
                                <td class="text-left px-0">
                                    {{$t('vattin')}}
                                </td>
                                <td class="text-center pl-0">:</td>
                                <td class="text-right px-0">
                                    {{ institute.vatTin }}
                                </td>
                            </tr>
                            <tr>
                                <td class="text-left px-0">
                                    {{$t('address')}}
                                </td>
                                <td class="text-center pl-0">:</td>
                                <td class="text-right px-0">
                                    {{ institute.companyAddress }}
                                </td>
                            </tr>
                            <tr>
                                <td class="text-left px-0">
                                    {{$t('phone')}}
                                </td>
                                <td class="text-center pl-0">:</td>
                                <td class="text-right px-0">
                                    {{ institute.companyPhone }}
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-col>
            <v-col sm="6" cols="6" class="px-0">
                <v-simple-table>
                    <template v-slot:default>
                        <tbody class="tb-pong">
                            <tr>
                                <td class="text-left pr-0">
                                    {{$t('session_num')}}
                                </td>
                                <td class="text-center pl-0">:</td>
                                <td class="text-right">
                                    {{ session.number }}
                                </td>
                            </tr>
                            <tr>
                                <td class="text-left pr-0">
                                    {{$t('store')}}
                                </td>
                                <td class="text-center pl-0">:</td>
                                <td class="text-right">
                                    {{ session.store.name}}
                                </td>
                            </tr>
                           
                        </tbody>
                    </template>
                </v-simple-table>
            </v-col>
            <v-col sm="6" cols="6" class="px-0 colright">
                <v-simple-table>
                    <template v-slot:default>
                        <tbody class="tb-pong">
                            <tr>
                                <td class="text-left pr-0">
                                    {{$t('print_date')}}
                                </td>
                                <td class="text-center pl-0">:</td>
                                <td class="text-right">
                                    {{ dateTimeFormat(new Date()) }}
                                </td>
                            </tr>
                            <tr>
                                <td class="text-left pr-0">
                                    {{$t('register')}}
                                </td>
                                <td class="text-center pl-0">:</td>
                                <td class="text-right">
                                    {{ counterName }}
                                </td>
                            </tr>
                  
                        </tbody>
                    </template>
                </v-simple-table>
            </v-col>
            <v-col sm="12" cols="12" class="pl-0">
                <v-simple-table class="" >
                        <template v-slot:default>
                            <thead class="th_invoice">
                                <tr>
                                    <th class=" th_invoice text-left">
                                        {{$t('start_date')}}
                                    </th>
                                    <th class=" th_invoice text-left">
                                         {{ dateTimeFormat(session.startDate) }}
                                    </th>
                                    <th class=" th_invoice text-left">
                                        {{$t('end_date')}}
                                    </th>
                                    <th class=" th_invoice_r text-left">
                                       {{ dateTimeFormat(session.endDate) }}
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="">
                                <tr >
                                    <td class="th_invoice"> {{$t('close_by')}}</td>
                                    <td class="th_invoice"> {{ session.closeBy}} </td>
                                    <td class="th_invoice"> {{$t('start_amount')}}</td>
                                    <td class="th_invoice_r">{{ session.openAmount}}</td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>

                    <v-simple-table>
                        <template v-slot:default>
                            <tbody class="tb-pong">
                                <tr>
                                    <td class="text-left px-0 pt-2 tb_border_b">
                                        {{$t('total_amount')}}
                                    </td>
                                    <td class="text-right px-0 pt-2 tb_border_b">
                                        {{ numberFormat(session.totalSale) }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-left px-0 tb_border_b">
                                        {{$t('total_cash_receipt')}}
                                    </td>
                                    <td class="text-right px-0 tb_border_b">
                                        {{ numberFormat(session.totalCash) }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-left px-0 tb_border_b">
                                        {{$t('total_discount')}}
                                    </td>
                                    <td class="text-right px-0 tb_border_b">
                                        {{ numberFormat(session.totalDis) }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-left px-0 tb_border_b">{{$t('total_invoce')}} </td>
                                    <td class="text-right px-0 tb_border_b">
                                        {{ numberFormat(session.totalCredit) }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-left px-0 tb_border_b">{{$t('cash_receipt_by_bank_wallet')}}</td>
                                    <td class="text-right px-0 tb_border_b">
                                        {{ numberFormat(session.totalBankWallet) }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-left px-0 tb_border_b">
                                        {{$t('cash_receipt_by_card')}}
                                    </td>
                                    <td class="text-right px-0 tb_border_b">
                                        {{ numberFormat(session.totalCard) }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-left px-0 tb_border_b">
                                        {{$t('cash_receipt_by_loyalty')}}
                                    </td>
                                    <td class="text-right px-0 tb_border_b">
                                        {{ numberFormat(session.loyalCreditCard) }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-left px-0 tb_border_b">
                                        {{$t('cash_receipt_by_khqr')}}
                                    </td>
                                    <td class="text-right px-0 tb_border_b">
                                        {{ numberFormat(session.khqr) }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-left px-0 tb_border_b">
                                        {{$t('pay_by_point')}}
                                    </td>
                                    <td class="text-right px-0 tb_border_b">
                                        {{ numberFormat(session.pointPay) }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-left px-0 tb_border_b">
                                        {{$t('total_purchase_order')}}
                                    </td>
                                    <td class="text-right px-0 tb_border_b">
                                        {{ numberFormat(session.preOrder) }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-left px-0 tb_border_b">
                                        {{$t('other_charge')}}
                                    </td>
                                    <td class="text-right px-0 tb_border_b">
                                        {{ numberFormat(session.otherCharge) }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-left px-0 tb_border_b">
                                        {{$t('modifier_amount')}}
                                    </td>
                                    <td class="text-right px-0 tb_border_b">
                                        {{ numberFormat(session.modiAmount) }}
                                    </td>
                                </tr>
                                
                            </tbody>
                        </template>
                    </v-simple-table>
            </v-col>
            <!-- Txns -->
            <v-col v-if="isloadTxn" sm="12" cols="12" class="pl-0">
                <v-simple-table class="" >
                    <template v-slot:default>
                        <thead class="th_invoice">
                            <tr>
                                <th class=" th_invoice text-center" style="border-right: 1px solid;">
                                    {{$t('transaction')}}
                                </th>
                            </tr>
                        </thead>
                    </template>
                </v-simple-table>
                <v-simple-table class="" >
                    <template v-slot:default>
                        <thead class="th_invoice">
                            <tr>
                                <th class=" th_invoice text-left">
                                    {{$t('number')}}
                                </th>
                                <th class=" th_invoice text-left">
                                    {{$t('cashier')}}
                                </th>
                                <th class=" th_invoice_r text-left">
                                    {{$t('date')}}
                                </th>
                                <th class=" th_invoice_r text-left">
                                    {{$t('discount')}}
                                </th>
                                <th class=" th_invoice_r text-left">
                                    {{$t('amount')}}
                                </th>
                            </tr>
                        </thead>
                        <tbody  class="">
                            <tr v-for="t in txns" v-bind:key="t.pk">
                                <td class="th_invoice"> {{ t.txnNumber}}</td>
                                <td class="th_invoice"> {{ t.cashier}}</td>
                                
                                <td class="th_invoice"> {{ dateTimeFormat(t.issuedDate) }} </td>
                                <td class="th_invoice"> {{ numberFormat(t.dis) }}</td>
                                <td class="th_invoice_r">{{ numberFormat(t.amount) }}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-col>
            <!-- Credit Txns -->
            <v-col v-if="isloadCreditTxn" sm="12" cols="12" class="pl-0">
                <v-simple-table class="" >
                    <template v-slot:default>
                        <thead class="th_invoice">
                            <tr>
                                <th class=" th_invoice text-center" style="border-right: 1px solid;">
                                    {{$t('credit_transaction')}}
                                </th>
                            </tr>
                        </thead>
                    </template>
                </v-simple-table>
                <v-simple-table class="" >
                        <template v-slot:default>
                            <thead class="th_invoice">
                                <tr>
                                    <th class=" th_invoice text-left">
                                        {{$t('number')}}
                                    </th>
                                    <th class=" th_invoice text-left">
                                        {{$t('cashier')}}
                                    </th>
                                    <th class=" th_invoice_r text-left">
                                        {{$t('date')}}
                                    </th>
                                    <th class=" th_invoice_r text-left">
                                        {{$t('discount')}}
                                    </th>
                                    <th class=" th_invoice_r text-left">
                                        {{$t('amount')}}
                                    </th>
                                </tr>
                            </thead>
                            <tbody  class="">
                                <tr v-for="t in creditTxns" v-bind:key="t.pk">
                                    <td class="th_invoice"> {{ t.txnNumber}}</td>
                                    <td class="th_invoice"> {{ t.cashier}}</td>
                                    
                                    <td class="th_invoice"> {{ dateTimeFormat(t.issuedDate) }} </td>
                                    <td class="th_invoice"> {{ numberFormat(t.dis) }}</td>
                                    <td class="th_invoice_r">{{ numberFormat(t.amount) }}</td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
            </v-col>
            <!-- Save & Cancel -->
            <v-col sm="12" cols="12">
                <div class="function_footer text-right">
                    <!-- <v-btn color="secondary" class="mr-2 white--text text-capitalize"
                        @click="closeForm">
                        {{ $t('close') }}
                    </v-btn> -->
                    <v-btn color="primary" class="float-right white--text text-capitalize"
                        @click="printHTML">
                        {{ $t('print') }}
                    </v-btn>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { i18n } from "@/i18n";
import kendo from "@progress/kendo-ui"
const $ = kendo.jQuery
// import { uuid } from "vue-uuid"
// import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'
const commerceHandler = require("@/scripts/commerce/handler/commerceHandler")
// import CashCountModel from "@/scripts/commerce/model/CashCount"
const cookieJS = require("@/cookie.js");
const { instituteId } = cookieJS.getCookie()
const cookie = cookieJS.getCookie();
const intHandler = require("@/scripts/instituteHandler")
export default {
    name: "PrintSession",
    props: {session: {}},
    data: () => ({
        miniVariant: false,
        institute: {},
        showLoading: false,
        // setting: localStorage.getItem(instituteId + 'commRSetting') != null ? JSON.parse(localStorage.getItem(instituteId + 'commRSetting')) : {},
        logoUrl: '',
        isloadTxn: false,
        registers: [],
        counterName: '',
        txns: [],
        decimal: 2,
        //credit
        isloadCreditTxn: false,
        creditTxns: [],
        //bank wallet
        activeStore: localStorage.getItem(instituteId + 'commStore') != null ? JSON.parse(localStorage.getItem(instituteId + 'commStore')) : {},
        bankWallets: [],
        setting: {},
    }),  
    methods: {
        numberFormat(value) {
            return kendo.toString(parseFloat(value), `n${this.decimal}`);
        },
        loadRegister(){
            window.console.log('load register')
            commerceHandler.registerGets().then(res => {
                let d = res.data.data
                if(d.length > 0){
                    this.registers = d
                    let r = this.registers.filter((o)=>{
                        return o.pk == this.session.register
                    })
                    if(r.length > 0){
                        window.console.log(this.registers, this.session, r, 'register name')
                        this.counterName = r[0].name
                    }
                }
            })
        },
        dateTimeFormat(date){
            return kendo.toString(new Date(date), 'dd/MMM/yyyy HH:mm:ss');
        },
        closeForm(){
            $('#closePrintSession').click()
        },
        printHTML(){
            let styleTemplate = `<style>
                * {
                    padding: 0;
                    margin: 0;
                    font-size: .98em;
                    font-family: 'Hanuman', Arial;
                    color: #000!important;
                }
                body {
                    background-color: #fff!important;
                    background: #fff!important;
                }
                #invoiceContent {
                    padding: 2.5%;
                    width: 95%;
                }
                .col-4{
                    float: left;
                    width: 33%;
                    min-height: 12em;
                }
                .col-8{
                    float: left;
                    width: 66%;
                    min-height: 12em;
                }
                h2.mt-4 {
                    margin-top: 16px;
                    font-size: 2em;
                    margin-bottom: 16px;
                }
                .col-6{
                    float: left;
                    width: 48%;
                    margin-top: 20px;
                }
                .itemlist {
                    min-height: 550px;
                }
                .col-6-right {
                    float: right;
                }
                .col-12{
                    float: left;
                    width: 100%;
                    margin-top: 20px;
                }
                th, td.tb_receipt{
                    border: 1px solid #000;
                    padding: 20px;
                    background-color: #eee!important;
                    background: #eee!important;
                    font-size: 1em;
                }
                td.tb_receipt{
                    font-size: .98em;
                    background-color: #fff!important;
                    background: #fff!important;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                .text-right {
                    text-align: right;
                }
                .covertotal {
                    padding-top: 20px;
                    border-top: 1px solid;
                }
                .covertotal td {
                    font-size: 1.2em;
                    padding: 3px;
                }
                .powerbanhji {
                    margin: 10px;
                    font-size: 1.5em;
                    text-align: center;
                }
            </style>`
            if(this.setting.receiptTemplate == '80mm'){
                styleTemplate = `<style>
                    * {
                        padding: 0;
                        margin: 0;
                        font-size: 12px;
                        font-family: 'Hanuman', Arial;
                        color: #000!important;
                    }
                    img.logo {
                        width: 150px;
                        height: auto;
                    }
                    .vat{
                        width: 50%;
                    }
                    body {
                        background-color: #fff!important;
                        background: #fff!important;
                    }
                    #invoiceContent {
                        padding: 2.5%;
                        width: 95%;
                    }
                    .col-4{
                        float: left;
                        width: 100%;
                        min-height: 160px;
                        text-align: center;
                        border: none!important;
                    }
                    .col-8{
                        float: left;
                        width: 100%;
                        padding-bottom: 15px;
                    }
                    h2.mt-4 {
                        font-size: 16px;
                        text-align: center;
                        background: #eee!important;
                        padding: 5px;
                    }
                    .col-6{
                        float: left;
                        width: 100%;
                    }
                    .col-6-right {
                        float: right;
                    }
                    .col-12{
                        float: left;
                        width: 100%;
                    }
                    th, td.tb_receipt{
                        border: 1px solid #000;
                        padding: 5px;
                        background-color: #eee!important;
                        background: #eee!important;
                        font-size: 11px;
                    }
                    td.tb_receipt{
                        font-size: 12px;
                        background-color: #fff!important;
                        background: #fff!important;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                    }
                    .text-right {
                        text-align: right;
                    }
                    .covertotal {
                        padding-top: 20px;
                        border-top: 1px solid;
                    }
                    .covertotal td {
                        font-size: 12px;
                    }
                    .powerbanhji {
                        margin: 5px;
                        font-size: 16px;
                        text-align: center;
                    }
                </style>`
            }else if(this.setting.receiptTemplate == '58mm'){
                styleTemplate = `<style>
                    * {
                        padding: 0;
                        margin: 0;
                        font-size: 10px;
                        font-family: 'Hanuman', Arial;
                        color: #000!important;
                    }
                    img.logo {
                        width: 80px;
                        height: auto;
                    }
                    .vat{
                        width: 50%;
                    }
                    body {
                        background-color: #fff!important;
                        background: #fff!important;
                    }
                    #invoiceContent {
                        padding: 1%;
                        width: 98%;
                    }
                    .col-4{
                        float: left;
                        width: 100%;
                        min-height: 160px;
                        text-align: center;
                        border: none!important;
                    }
                    .col-8{
                        float: left;
                        width: 100%;
                        padding-bottom: 15px;
                    }
                    h2.mt-4 {
                        font-size: 14px;
                        text-align: center;
                        background: #eee!important;
                        padding: 2px;
                    }
                    .col-6{
                        float: left;
                        width: 100%;
                    }
                    .col-6-right {
                        float: right;
                    }
                    .col-12{
                        float: left;
                        width: 100%;
                    }
                    th, td.tb_receipt{
                        border: 1px solid #000;
                        padding: 2px;
                        background-color: #eee!important;
                        background: #eee!important;
                        font-size: 10px;
                    }
                    td.tb_receipt{
                        font-size: 11px;
                        background-color: #fff!important;
                        background: #fff!important;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                    }
                    .text-right {
                        text-align: right;
                    }
                    .covertotal {
                        padding-top: 5px;
                        border-top: 1px solid;
                    }
                    .covertotal td {
                        font-size: 10px;
                    }
                    .powerbanhji {
                        margin: 5px;
                        font-size: 14px;
                        text-align: center;
                    }
                </style>`
            }else if(this.setting.receiptTemplate == 'A5'){
                styleTemplate = `<style>
                    * {
                        padding: 0;
                        margin: 0;
                        font-size: 10px;
                        font-family: 'Hanuman', Arial;
                        color: #000!important;
                    }
                    img.logo {
                        width: 100px;
                        height: auto;
                    }
                    body {
                        background-color: #fff!important;
                        background: #fff!important;
                    }
                    .vat {
                        width: 40%;
                    }
                    #invoiceContent {
                        padding: 1%;
                        width: 98%;
                    }
                    .col-4{
                        float: left;
                        width: 25%;
                        min-height: 130px;
                    }
                    .col-8{
                        float: left;
                        width: 75%;
                        min-height: 115px;
                    }
                    h2.mt-4 {
                        font-size: 18px;
                        margin-bottom: 14px;
                    }
                    .col-6{
                        float: left;
                        width: 48%;
                        margin-top: 15px;
                    }
                    .itemlist {
                        min-height: 280px;
                    }
                    .col-6-right {
                        float: right;
                    }
                    .col-12{
                        float: left;
                        width: 100%;
                        margin-top: 15px;
                    }
                    th, td.tb_receipt{
                        border: 1px solid #000;
                        padding: 10px;
                        background-color: #eee!important;
                        background: #eee!important;
                        font-size: 13px;
                    }
                    td.tb_receipt{
                        font-size: 12px;
                        background-color: #fff!important;
                        background: #fff!important;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                    }
                    .text-right {
                        text-align: right;
                    }
                    .covertotal {
                        padding-top: 10px;
                        border-top: 1px solid;
                    }
                    .covertotal td {
                        font-size: 12px;
                    }
                    .powerbanhji {
                        margin: 10px;
                        font-size: 16px;
                        text-align: center;
                    }
                    .th_invoice, .th_invoice_r {
                        padding: 10px;
                        border: 1px solid #000;
                    }
                    .tb_border_b {
                        padding: 10px 0;
                        border-bottom: 1px dotted #000;
                    }
                    .colright {
                        float: right!important;
                    }
                </style>`
            }
            window.console.log(this.setting.receiptTemplate, 'form')
            var  Win;
            Win = window.open('', '', 'width=1048, height=900');
            var printableContent = '',
                win = Win,
                doc = win.document.open();
            var htmlStart = 
            '<meta charset="utf-8" /><title></title><link href="https://raw.githubusercontent.com/choeun88/css/main/kendo.common.min.css" rel="stylesheet" type="text/css">' +
            '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' +
            '<link href="https://fonts.googleapis.com/css2?family=Hanuman:wght@100;400;900&display=swap" rel="stylesheet">' +
            '<link href="https://raw.githubusercontent.com/choeun88/css/main/printreceipt.css" rel="stylesheet">' + 
            styleTemplate +
            '</head><body><div class="row-fluid" >' +
            '<div id="invoicecontent" style="background: none!important;color: #000!important;" class="k-content document-body">';
            var htmlEnd = '</div></div></body></html>';
            printableContent = $('#invoiceContent').html();
            // window.console.log(htmlStart + printableContent + htmlEnd, 'pp')
            doc.write(htmlStart + printableContent + htmlEnd);
            doc.close();
            setTimeout(function(){
                win.print();
                win.close();
            },1000);
        },
        loadSession(id) {
            this.showLoading = true 
            commerceHandler.sessionGet(id).then(res=>{
                this.showLoading = false
                this.session = res.data.data[0]
                this.loadRegister()
                if(this.session.status != 'close'){
                    this.$snotify.error(i18n.t('session_not_yet_close'));
                }
            })
        },
        // load txn
        txnCom(){
            this.showLoading = false
            if(this.txns.length > 0){
                this.isloadTxn = true 
            }
        },
        bindTxn(d){
            d.forEach(dd=>{
                this.txns.push(dd)
            })
        },
        loadTxn(key){
            window.console.log('load txn')
            let d = {
                epsAtt: {
                    ':sesPk': this.session.pk + '/txn',
                    ':startDate': new Date(this.session.startDate).getTime().toString(),
                    ':endDate': new Date(this.session.endDate).getTime().toString(),
                },
                index: 'sesPk-searchDate-index',
                keyCondition: 'sesPk = :sesPk and searchDate between :startDate and :endDate',
                key: key
            }
            this.showLoading = true
            commerceHandler.reportGets(d).then(res => {
                window.console.log(res, 'res txn')
                let data = res.data.data
                if(data.Items.length > 0){
                    this.bindTxn(data.Items)
                    if(data.hasOwnProperty('LastEvaluatedKey')){
                        this.loadTxn(data.LastEvaluatedKey)
                    }else{
                        this.txnCom()
                    }
                }else{
                    this.txnCom()
                }
            })
        },
        // load credit txn
        creditTxnCom(){
            this.showLoading = false
            if(this.creditTxns.length > 0){
                this.isloadCreditTxn = true 
            }
        },
        bindCreditTxn(d){
            d.forEach(dd=>{
                this.creditTxns.push(dd)
            })
        },
        loadCreditTxn(key){
            window.console.log('load txn')
            let d = {
                epsAtt: {
                    ':sesPk': this.session.pk + '/txninv',
                    ':startDate': new Date(this.session.startDate).getTime().toString(),
                    ':endDate': new Date(this.session.endDate).getTime().toString(),
                },
                index: 'sesPk-searchDate-index',
                keyCondition: 'sesPk = :sesPk and searchDate between :startDate and :endDate',
                key: key
            }
            this.showLoading = true
            commerceHandler.reportGets(d).then(res => {
                window.console.log(res, 'res credit txn')
                let data = res.data.data
                if(data.Items.length > 0){
                    this.bindCreditTxn(data.Items)
                    if(data.hasOwnProperty('LastEvaluatedKey')){
                        this.loadCreditTxn(data.LastEvaluatedKey)
                    }else{
                        this.creditTxnCom()
                    }
                }else{
                    this.creditTxnCom()
                }
            })
        },
        // setting
        async checkSetting(){
            const f = this.setting.sessionForm
            window.console.log(this.setting, 'setting')
            //show txn
            if(f.showTxn == 1 || f.showTxn == true){
                this.isloadTxn = false
                this.txns = []
                this.loadTxn({})
            }
            //show credit
            if(f.showCredit == 1 || f.showCredit == true){
                this.isloadCreditTxn = false
                this.creditTxns = []
                this.loadCreditTxn({})
            }
            //bank wallet
            if(f.bankW == 1 || f.bankW == true){
                await this.loadBankWallet()
            }
        },
        async loadBankWallet() {
            this.showLoading = true
            commerceHandler.settingGet(this.activeStore.pk).then(res => {
                this.showLoading = false
                if (res.data.statusCode === 200) {
                    const data = res.data.data
                    // let d = data.filter((o) => {return o.type == 'retail'})
                    if (data.length > 0) {
                        // this.g = new generalSettingModel(data[0])
                        this.bankWallets = data[0].bankWallet
                        window.console.log(this.bankWallets, 'bw')
                    }
                }
            })
        },
        loadPrimaryImage(){
            commerceHandler.getImage(instituteId, cookie.creator).then(res=>{
                window.console.log(res, 'image res')
                if(res.length > 0){
                    this.logoUrl = res[0].url
                }
            })
        },
        loadSetting(){
            this.showLoading = true
            commerceHandler.settingGet(this.session.register).then(res => {
                this.showLoading = false
                if (res.data.statusCode === 200) {
                    const data = res.data.data
                    if (data.length > 0) {
                        this.data = data[0]
                        this.setting = this.data
                        this.checkSetting()
                    }
                }
            })
        },
        async initData() {
            this.loadRegister()
            await this.loadSetting()
            window.console.log(this.session, 'session')
        },
    },
    components: {
        // 'app-datepicker': DatePickerComponent,
        LoadingMe: () => import(`@/components/Loading`),
    },
    computed:{
    },
    created: async function () {
        await intHandler.init().then(res=>{
            this.institute = res.data.data
            window.console.log(this.institute, 'inst res')
        })
        intHandler.getImage(cookie.creator).then(res=>{
            // window.console.log(res, 'inst image res')
            if(res.length > 0){
                this.logoUrl = res[0].url || ''
            }
        })
    },
    mounted: async function (){
        await this.initData()
    },
    watch: {
        '$route': 'initData'
    }
};
</script>
<style scoped>
    .tb_border_b{
        border-bottom: 2px dotted !important;
    }
    .tb_receipt{
        border: 0.2px solid black;
        border-right: 0px;
    }
    .tb_receipt_r{
        border: 0.2px solid black;
    }
    .th_invoice{
        border: 0.2px solid black;
        border-right: 0px;
        color: black !important;
        font-weight: 700;
    }
    .th_invoice_r{
        border: 0.2px solid black;
        color: black !important;
        font-weight: 700;
    }
    #pin > .theme--light.v-input input {
        max-height: 32px;
        font-size: 2rem !important;
        text-align: center;
    }
    .v-image__image--cover {
        background-size: contain;
        margin-top: 5px;
    }
    .v-image__image {
        background-position: top center !important;
    }
    .b-cash:before {
        color: #ffffff;
    }   
    .b-loyalty:before {
        content: "\e91b";
        color: #ffffff;
    }
    .btn-right .v-btn__content i{
       font-size: 40px;
    }
    .btn-right .v-btn__content{
       display: block !important;
    }
    h6{
       color: #2a2b2b;
       font-size: 0.6rem !important; 
       font-family: "Niradei-bold", serif !important;
       padding-top: 5px;
    }
    
    .btn-right{
        background-color: #ffffff !important;
        border-bottom: 1px solid;
        border-color: #e5e5e6 !important;
        width: 100%;
        height: 12% !important;
        text-align: center;
        padding: 0 3px !important;
        border-radius: 0px !important;  
    }
    .v-tab {
        justify-content: left;
        font-size: 20px;
    }

    .v-tab--active {
        background-color: rgb(255, 255, 255);
    }

    .tab_setting .v-tab--active {
        font-weight: 700;
        color: #000;
    }

    .v-tab--active {
        background-color: #ffffff !important;
        border-bottom: 4px solid #92d050;
        border-left: none;
    }

    p {
        color: rgba(0, 0, 0, 0.87);
    }
    .theme--light.v-tabs-items {
        background-color: #FFFFFF;
        height: 550px !important;
        overflow: scroll !important;
    }
    
    .sale-container{
        max-width: 1870px !important;
    }
    .theme--light.v-tabs-items {
        background-color: #ffffff00 !important;
    }
    .card-item{
        background-color: #ffffff00;
        border: 0.2px solid #dcdcdc33;
        border-radius: 0;
    }
    .catagory-btn{
        width: 100%;
        background-color: #ffffff !important;
        border: 0.2px solid #e4e4e6;
    }
    .v-btn__content{
        font-family: "Niradei-Bold", serif !important;
        display: block !important;
    }
    .btn_h2{
        font-size: 22px;
    }
    .sidebar-left{
        -webkit-box-flex: 0;
        -ms-flex: 0 0 12.666667%;
        flex: 0 0 12.666667%;
        max-width: 12.666667%;
    }
    .sidebar-left2{
        -webkit-box-flex: 0;
        -ms-flex: 0 0 38.666667%;
        flex: 0 0 38.666667%;
        max-width: 38.666667%;
    }
    .sidebar-left3{
    -webkit-box-flex: 0;
    -ms-flex: 0 0 7.000000%;
    flex: 0 0 7.000000%;
    max-width: 7.000000%;
    }
    .container h2 {
        font-size: 17px;
        margin-bottom: 0;
    }
    .btn-sidebar{
        justify-content: space-between !important;
        background-color: #fff !important;
        font-family: "Niradei-bold", serif !important;
    }

    .b-payment:before {
        content: "\e91f";
        color: #ffffff;
    }
    .b-banking:before {
        content: "\e90e";
        color: #ffffff;
    }
    .btn-money {
        background-color: #969696 !important;
        color: white;
    }
    
    .calculator{
        border: 1px solid gainsboro;
    }
    .receipt-btn{
        min-width: 22% !important;
        height: 50px !important;
        padding: 10px !important;
        margin: 5px;
    }
    .apply-btn{
        min-width: 33% !important;
        height: 50px !important;
        padding: 5px !important;
        margin: 5px;
    }
    .calculator-btn{
       min-width: 18% !important;
        margin: 4px;
        padding: 0 10px !important;
    }
    .calculator-btn-1{
        min-width: 20% !important;
        margin: 4px;
        padding: 0 2px !important;
        font-size: 13px !important;
        letter-spacing: inherit;
        font-weight: bold;
    }
    .pay-btn{
        width: 100%;
        border: 1px solid #e0e0e0;
    }
    .v-text-field__detail .field-pos{
        display:none !important;
    }
    .btn-funtion{
        font-size: 14px;
        width: 100% !important;
        display: flex;
        justify-content: space-between;
    }
    .function_content {
        padding: 0px;
        border-bottom: none !important;
        background-color: #f8f8f9;
    }
    .notification{
        background-color: #ed263a;
        width: auto;
        margin-left: 2px;
        color: #fff;

    }
    .v-btn.v-size--default {
        font-size: 1.2rem;
    }
    .b-search.b:before {
        color: #d7d3d3 !important;
    }
    /* pin */
    body {
      height: 95vh;
      background-color: #181c26 !important;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -webkit-align-items: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      -webkit-justify-content: center;
      -ms-flex-pack: center;
      justify-content: center;
      font-family: Open Sans;
    }

    body.wrong {
      -webkit-animation: bg-red 1s ease-in;
      animation: bg-red 1s ease-in;
    }

    body.correct {
      -webkit-animation: bg-green 1s ease-in;
      animation: bg-green 1s ease-in;
    }

    #inspiration {
      position: fixed;
      right: 1em;
      bottom: 1em;
    }

    #inspiration a {
      display: inline-block;
      text-decoration: none;
      font-weight: bold;
      color: white;
      -webkit-transition: all 1s ease;
      transition: all 1s ease;
    }

    #inspiration a:hover { color: #212121; }

    #inspiration p {
      margin: 0;
      padding-left: .4em;
      display: inline-block;
      color: rgba(255, 255, 255, 0.6);
    }
    #pin {
        background-color: #ffffff !important;
        width: 90%;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
        /* padding: 1em; */
        border-radius: .3em;
        /* box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.3); */
        margin: auto;
        color: rgb(155 27 46);;
        }

    .dots {
      width: 50%;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-justify-content: space-around;
      -ms-flex-pack: distribute;
      justify-content: space-around;
      padding: 1em;
      padding-top: 3em;
    }

    .dot {
      position: relative;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 0.8em;
      width: 0.8em;
      height: 0.8em;
      -webkit-transform: scale3d(0.7, 0.7, 0.7);
      transform: scale3d(0.7, 0.7, 0.7);
    }

    .dot.active {
      -webkit-animation: growDot .5s ease;
      animation: growDot .5s ease;
      -webkit-animation-fill-mode: forwards;
      animation-fill-mode: forwards;
    }

    .dot.wrong {
      -webkit-animation: wrong .9s ease;
      animation: wrong .9s ease;
    }

    .dot.correct {
      -webkit-animation: correct .9s ease;
      animation: correct .9s ease;
    }

    .cancelPin {
      width: 25%;
      margin-left: 10%;
      margin-top: 10%;
    }
    .letter_spacing{
        letter-spacing:initial;
        font-size: 12px !important;
    }

    #pin p { font-size: 1.2em; }

    .numbers {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-flex-flow: row wrap;
      -ms-flex-flow: row wrap;
      flex-flow: row wrap;
      -webkit-box-align: center;
      -webkit-align-items: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-justify-content: space-around;
      -ms-flex-pack: distribute;
      justify-content: space-around;
      -webkit-align-content: flex-end;
      -ms-flex-line-pack: end;
      align-content: flex-end;
      margin: 1em 0;
    }

    .number {
      position: relative;
      width: 2.5em;
      height: 2.5em;
      margin: 0.5em;
      border-radius: 2.5em;
      border: 2px solid rgb(154 27 46);
      text-align: center;
      line-height: 2.5em;
      font-weight: 400;
      font-size: 1.8em;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      -webkit-transition: all .5s ease;
      transition: all .5s ease;
      cursor: pointer;
    }

    .number:hover { color: rgba(243, 134, 134, 0.5); }

    .number:hover:before { border: 2px solid rgba(255, 255, 255, 0.5); }

    .number:before {
      content: "";
      position: absolute;
      left: -2px;
      width: 2.5em;
      height: 2.5em;
      border: 2px solid rgba(255, 255, 255, 0.1);
      border-radius: 2.5em;
      -webkit-transition: all .5s ease;
      transition: all .5s ease;
    }
    .number.grow:before {
        -webkit-animation: grow .6s ease;
        animation: grow .6s ease;
        }
    @-webkit-keyframes 
    growDot {  100% {
    background: white;
    -webkit-transform: scale3d(0.9, 0.9, 0.9);
    transform: scale3d(0.9, 0.9, 0.9);
    }
    }
    @keyframes 
    growDot {  100% {
    background: white;
    -webkit-transform: scale3d(0.9, 0.9, 0.9);
    transform: scale3d(0.9, 0.9, 0.9);
    }
    }
    @-webkit-keyframes 
    grow {  50% {
    -webkit-transform: scale3d(1.5, 1.5, 1.5);
    transform: scale3d(1.5, 1.5, 1.5);
    }
    100% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
    }
    }
    @keyframes 
    grow {  50% {
    -webkit-transform: scale3d(1.5, 1.5, 1.5);
    transform: scale3d(1.5, 1.5, 1.5);
    }
    100% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
    }
    }
    @-webkit-keyframes 
    wrong {  20% {
    background: crimson;
    }
    40% {
    -webkit-transform: translate(-15px, 0);
    transform: translate(-15px, 0);
    }
    60% {
    -webkit-transform: translate(10px, 0);
    transform: translate(10px, 0);
    }
    80% {
    -webkit-transform: translate(-5px, 0);
    transform: translate(-5px, 0);
    }
    }
    @keyframes 
    wrong {  20% {
    background: crimson;
    }
    40% {
    -webkit-transform: translate(-15px, 0);
    transform: translate(-15px, 0);
    }
    60% {
    -webkit-transform: translate(10px, 0);
    transform: translate(10px, 0);
    }
    80% {
    -webkit-transform: translate(-5px, 0);
    transform: translate(-5px, 0);
    }
    }
    @-webkit-keyframes 
    correct {  20% {
    background: limegreen;
    }
    40% {
    -webkit-transform: translate(0, -15px);
    transform: translate(0, -15px);
    }
    60% {
    -webkit-transform: translate(0, 10px);
    transform: translate(0, 10px);
    }
    80% {
    -webkit-transform: translate(0, -5px);
    transform: translate(0, -5px);
    }
    }
    @keyframes 
    correct {  20% {
    background: limegreen;
    }
    40% {
    -webkit-transform: translate(0, -15px);
    transform: translate(0, -15px);
    }
    60% {
    -webkit-transform: translate(0, 10px);
    transform: translate(0, 10px);
    }
    80% {
    -webkit-transform: translate(0, -5px);
    transform: translate(0, -5px);
    }
    }
    @-webkit-keyframes 
    bg-red {  50% {
    background: crimson;
    }
    }
    @keyframes 
    bg-red {  50% {
    background: crimson;
    }
    }
    @-webkit-keyframes 
    bg-green {  50% {
    background: limegreen;
    }
    }
    @keyframes 
    bg-green {  50% {
    background: limegreen;
    }
    }
    #pin >.v-input input {
        text-align: center !important;
        font-size: 35px !important;
    }
    .td-invioce td{
        border: thin solid rgba(0, 0, 0, 0.12);
    }
    .tb-pong td{
        height: 30px !important;
    }
    .th-invoice th{
      border-top: thin solid rgba(0, 0, 0, 0.12) !important;  
    }
    .v-list-item-left {
        padding: 0 10px !important;
    }
    .theme--light.v-divider{
        border-color: rgb(0 0 0 / 0%);
    }


    /* Surface pro */
    @media only screen and (min-width : 1400px){
        .btn-funtion{
            font-size: 14px !important;
        }
        .v-application--is-ltr .v-btn__content .v-icon--left {
            margin-right: 8px;
        }
        .v-btn__content .v-icon.v-icon--left, .v-btn__content .v-icon.v-icon--right {
            font-size: 18px;
            height: 18px;
            width: 18px;
        }
        .calculator-btn{
            font-size: 14px;
        }
        
    }
   @media only screen and (min-device-height : 720px) and (max-device-width : 1280px) {
    
        /** Surface Pro styles here **/
        .btn-funtion{
            font-size: 12px !important;
        }
        .v-application--is-ltr .v-btn__content .v-icon--left {
            margin-right: 5px;
        }
        .v-btn__content .v-icon.v-icon--left, .v-btn__content .v-icon.v-icon--right {
            font-size: 16px;
            height: 10px;
            width: 10px;
        }
        .calculator-btn{
            font-size: 12px;
        }
    }
    .angle_action {
        right: 0;
        z-index: 10;
        position: absolute;
        top: 60px;
    }
    .angle_action_small {
        right: 12px;
        z-index: 10;
        position: absolute;
        top: 60px;
    }
    .b-order_type:before {
        content: "\e933";
        color: #ffffff;
        font-size: 22px;
    }
    .b-reward_s:before {
        content: "\e937";
        color: #ffffff;
        font-size: 22px;
    }
    .b-promotion:before {
        content: "\e936";
        color: #ffffff;
        font-size: 22px;
    }
    .b-count_guest:before {
        content: "\e935";
        color: #ffffff;
        font-size: 22px;
    }
    .b-note_s:before {
        content: "\e932";
        color: #ffffff;
        font-size: 22px;
    }
    .b-delivery_s:before {
        content: "\e931";
        color: #ffffff;
        font-size: 22px;
    }
    .b-parksale:before {
        content: "\e934";
        color: #ffffff;
        font-size: 22px;
    }
    .b-invoice_s:before {
        content: "\e930";
        color: #ffffff;
        font-size: 22px;
    }

</style>