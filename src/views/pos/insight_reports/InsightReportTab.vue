<template>
    <v-app class="zoom-in">
        <v-container style="padding-top: 10px!important;">
            <LoadingMe
            :isLoading="showLoading"
            :fullPage="false"
            type="loading"
            :myLoading="true"/>
            <v-row class="">
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
                    <v-btn color="primary white--text" @click="search">
                        <i
                            class="b-search"
                            style="font-size: 18px; color: #fff !important"
                        />
                    </v-btn>
                </v-col>
            </v-row>
            <v-row style="margin-top: 0;">
                <v-col sm="12" cols="12">
                <v-card color="white" class="pa-0 no_border" elevation="0">
                    <v-row>
                        <v-card outlined dense color="white" class=" no_border py-0" elevation="0">
                            <v-col sm="12" cols="12" class="">
                                <v-tabs>
                                    <v-tab @click="goTab('sale')">
                                        <span class="hidden-sm-and-up">
                                            <v-icon left>mdi-pen</v-icon>
                                        </span>
                                        <span class="hidden-sm-and-down text-uppercase">
                                            {{ $t('sale') }}
                                        </span>
                                    </v-tab>
                                    <v-tab @click="goTab('item')">
                                        <span class="hidden-sm-and-up">
                                            <v-icon left>mdi-pen</v-icon>
                                        </span>
                                        <span class="hidden-sm-and-down text-uppercase">
                                            {{ $t('items') }}
                                        </span>
                                    </v-tab>
                                    <v-tab @click="goTab('sale')">
                                        <span class="hidden-sm-and-up">
                                            <v-icon left>mdi-pen</v-icon>
                                        </span>
                                        <span class="hidden-sm-and-down text-uppercase">
                                            {{ $t('transactions') }}
                                        </span>
                                    </v-tab>
                                    <v-tab @click="goTab('loyalty')">
                                        <span class="hidden-sm-and-up">
                                            <v-icon left>mdi-pen</v-icon>
                                        </span>
                                        <span class="hidden-sm-and-down text-uppercase">
                                            {{ $t('reward_loyalty') }}
                                        </span>
                                    </v-tab>
                                    <!-- <v-tab>
                                        <span class="hidden-sm-and-up">
                                            <v-icon left>mdi-pen</v-icon>
                                        </span>
                                        <span class="hidden-sm-and-down text-uppercase">
                                            {{ $t('others') }}
                                        </span>
                                    </v-tab> -->

                                    <v-tab-item>
                                        <v-card flat>
                                            <v-card-text class="">
                                                <SaleTab :saleReport="saleReport" />
                                            </v-card-text>
                                        </v-card>
                                    </v-tab-item>

                                    <v-tab-item>
                                        <v-card flat>
                                            <v-card-text class="">
                                                <ItemTab :itemReport="itemReport" />
                                            </v-card-text>
                                        </v-card>
                                    </v-tab-item>
                                    <v-tab-item>
                                        <v-card flat>
                                            <v-card-text class="">
                                                <TransactionsTab :transactions="transactions" />
                                            </v-card-text>
                                        </v-card>
                                    </v-tab-item>
                                    <v-tab-item>
                                        <v-card flat>
                                            <v-card-text class="">
                                            <RewardLoyaltyTab :loyaltyReport="loyaltyReport" :transactions="transactions"  />
                                            </v-card-text>
                                        </v-card>
                                    </v-tab-item>
                                    <!-- <v-tab-item>
                                        <v-card flat>
                                            <v-card-text class="">
                                                <OtherTab/>
                                            </v-card-text>
                                        </v-card>
                                    </v-tab-item> -->
                                </v-tabs>
                            </v-col>
                        </v-card>
                    </v-row> 
                </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
import DatePickerComponent from "@/components/custom_templates/DatePickerComponent";
import { i18n } from '@/i18n';
const commerceHandler = require("@/scripts/commerce/handler/commerceHandler")
const loyaltyHandler = require("@/scripts/loyalty/handler/loyaltyHandler")
const categoryHandler = require("@/scripts/categoryHandler")
const cookieJS = require("@/cookie.js");
import kendo from "@progress/kendo-ui"
const $ = kendo.jQuery
const { instituteId } = cookieJS.getCookie()
export default {
    name: "InsignReport",
    components: {
        SaleTab: () => import('./sale/SaleTab'),
        ItemTab: () => import('./item/ItemTab'),
        TransactionsTab: () => import('./transaction/TransactionsTab'),
        RewardLoyaltyTab: ()=> import('./reward_loyalty/RewardLoyaltyTab'),
        // OtherTab: ()=> import('./other/OtherTab'),
        "app-datepicker": DatePickerComponent,
        LoadingMe: () => import(`@/components/Loading`),
    },
    data: () => ({
        showLoading: false,
        isHide: false,
        startDate: new Date().toISOString().substring(0, 10),
        endDate: new Date().toISOString().substring(0, 10),
        register: '',
        registers: [],
        activeStore: localStorage.getItem(instituteId + 'commStore') != null ? JSON.parse(localStorage.getItem(instituteId + 'commStore')) : {},
        mDateSorter: 3,
        allCount: true,
        allRegister: [],
        sSumary: [],
        saleMethods: [],
        saleCampaigns: [],
        saleEmps: [],
        saleDetails: [],
        salePartners: [],
        txns: [],
        saleReport: {},
        number_format: 'n2',
        itemDetails: [],
        itemReport: {},
        ontab: 'sale',
        categories: [],
        transactions: [],
        loyaltyReport: {},
        cardList: [],
        txnIds: []
    }),
    watch: {},
    methods: {
        goTab(n){
            this.ontab = n
        },
        close() {
            this.$router.go(-1);
        },
        clickMe(data) {
            this.$route.push(data.link);
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
        search(){
            // if(this.ontab == 'sale'){
            //     this.searchSale({})
            // }else if(this.ontab == 'item'){
            //     this.searchItem({})
            // }else if(this.ontab == 'loyalty'){
            //     this.searchSale({})
            // }
            this.searchSale({})
        },
        searchSale(key){
            let st = new Date(this.startDate + ' 00:00:00').getTime().toString();
            let ed = new Date(this.endDate + ' 23:59:59').getTime().toString();
            this.txns = []
            let d = {
                epsAtt: {
                    ':dateSk': this.activeStore.pk + '/txns',
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
                        ':regiPk': this.register + '/txns',
                        ':startDate': st,
                        ':endDate': ed,
                    },
                    index: 'regiPk-searchDate-index',
                    keyCondition: 'regiPk = :regiPk and searchDate between :startDate and :endDate',
                    key: key
                }
            }
            if(Object.keys(key).length == 0){
                this.txnIds = []
                this.saleReport = {}
                this.saleDetails = []
                this.salePartners = []
                this.sSumary = []
                this.saleMethods = []
                this.saleCampaigns = []
                this.saleEmps = []
                this.saleMethods.push({
                    name: i18n.t('cash'),
                    amount: 0,
                })
                this.saleMethods.push({
                    name: i18n.t('card'),
                    amount: 0,
                })
                this.saleMethods.push({
                    name: i18n.t('bank'),
                    amount: 0,
                })
                this.saleMethods.push({
                    name: i18n.t('khqr'),
                    amount: 0,
                })
                this.saleMethods.push({
                    name: i18n.t('point'),
                    amount: 0,
                })
                this.saleMethods.push({
                    name: i18n.t('store_credit'),
                    amount: 0,
                })
                this.saleMethods.push({
                    name: i18n.t('partner'),
                    amount: 0,
                })
            }
            this.showLoading = true
            commerceHandler.reportGets(d).then(res => {
                let data = res.data.data.Items
                if(data.length > 0){
                    data.sort(function (a, b) {
                        return parseFloat(new Date(a.issuedDate).getTime()) - parseFloat(new Date(b.issuedDate).getTime())
                        // let c = b.session.number.a.replace(`/[^0-9\.]+/g`, "")
                        // let d = a.session.number.a.replace(`/[^0-9\.]+/g`, "")
                        // return parseFloat(c) - parseFloat(d)
                    })
                    let paycash = 0, paycard = 0, paybank = 0, paykhqr = 0, paypoint = 0, payscredit = 0, paypatner = 0
                    data.forEach(d => {
                        if(d.type != 'serving'){
                            let register = this.allRegister.filter((r)=>{return r.pk == d.register})
                            let regi = register[0]
                            d.registerName = regi.name
                            this.txnIds.push(d.pk)
                            let cashier = ''
                            // window.console.log(d.pinUser, Object.keys(d.pinUser).length)
                            if(Object.keys(d.pinUser).length > 0){
                                if(d.pinUser.hasOwnProperty('name')){
                                    cashier = d.pinUser.name
                                }
                            }
                            d.cashier = cashier
                            d.sesNum = d.session.number
                            d.issuedDate = kendo.toString(new Date(d.issuedDate), `yyyy-MMM-dd hh:mm tt`)
                            this.sSumary.push(d)
                            if(d.paymentMethod == 'card'){
                                paycard += parseFloat(d.total)
                            }else if(d.paymentMethod == 'bank'){
                                paybank += parseFloat(d.total)
                            }else if(d.paymentMethod == 'khqr'){
                                paykhqr += parseFloat(d.total)
                            }else if(d.paymentMethod == 'point'){
                                paypoint += parseFloat(d.total)
                            }else if(d.paymentMethod == 'storecredit'){
                                payscredit += parseFloat(d.total)
                            }else if(d.paymentMethod == 'partner'){
                                paypatner += parseFloat(d.total)
                            }else{
                                paycash += parseFloat(d.total)
                            }
                            
                            //campaign
                            let cnam = ''
                            if(d.campaigns.length > 0){
                                d.campaigns.forEach(c=>{
                                    cnam += ',' + c.name
                                })
                            }
                            if(cnam != ''){
                                cnam = cnam.substring(1)
                                this.saleCampaigns.push({
                                    sesNum: d.sesNum,
                                    register: regi.name,
                                    name: cnam,
                                    number: d.txnNumber,
                                    subTotal: d.subTotal,
                                    discount: d.discount,
                                    comission: d.comission,
                                    tax: d.tax,
                                    issuedDate: d.issuedDate,
                                    total: d.total
                                })
                            }
                            //employee
                            let emp = d.employee || ''
                            if(emp != ''){
                                this.saleEmps.push({
                                    sesNum: d.sesNum,
                                    register: regi.name,
                                    name: emp,
                                    number: d.txnNumber,
                                    subTotal: d.subTotal,
                                    discount: d.discount,
                                    comission: d.comission,
                                    issuedDate: d.issuedDate,
                                    tax: d.tax,
                                    total: d.total
                                })
                            }
                            //sale detail
                            let saleu = ''
                            if(Object.keys(d.saleUnit).length > 0){
                                saleu = d.saleUnit.name
                            }
                            let ordType = ''
                            if(Object.keys(d.orderType).length > 0){
                                ordType = d.orderType.name
                            } 
                            let cutype = d.customer.type || 'general'
                            if(Object.keys(d.partner).length > 0){
                                cutype = 'partner'
                                this.salePartners.push({
                                    sesNum: d.sesNum,
                                    register: regi.name,
                                    name: d.partner.name,
                                    number: d.txnNumber,
                                    subTotal: d.subTotal,
                                    discount: d.discount,
                                    comission: d.comission,
                                    issuedDate: d.issuedDate,
                                    tax: d.tax,
                                    paymentMethod: d.paidBy,
                                    total: d.total
                                })
                            }
                            let g = d.guestCount
                            g.localMen = g.localMen || 0
                            g.localWomen = g.localWomen || 0
                            g.forMen = g.forMen || 0
                            g.forWomen = g.forWomen || 0
                            let tguest = parseInt(g.localMen) + parseInt(g.localWomen) + parseInt(g.forWomen) + parseInt(g.forMen)
                            this.saleDetails.push({
                                sesNum: d.sesNum,
                                registerName: regi.name,
                                issuedDate: d.issuedDate,
                                number: d.txnNumber,
                                orderTime: d.orderDate != '' ? kendo.toString(new Date(d.orderDate), 'hh:mm tt') : '',
                                billTime: kendo.toString(new Date(d.billDate), 'hh:mm tt'),
                                saleUnit: saleu,
                                orderType: ordType,
                                cusName: d.customer.name,
                                cusType: i18n.t(cutype),
                                localMen: d.guestCount.localMen,
                                localWomen: d.guestCount.localWomen,
                                forMen: d.guestCount.forMen,
                                forWomen: d.guestCount.forWomen,
                                totalGuest: tguest,
                                cashier: cashier,
                                employee: emp,
                                subTotal: d.subTotal,
                                discount: d.discount,
                                comission: d.comission,
                                paymentMethod: d.paidBy,
                                tax: d.tax,
                                total: d.total
                            })
                        }
                    })
                    if(res.data.data.hasOwnProperty('LastEvaluatedKey')){
                        let dkey = res.data.data.LastEvaluatedKey
                        this.search(dkey)
                    }else{
                        this.showLoading = false
                        // window.console.log(this.txns, 'txns')
                        this.saleMethods[0].amount += paycash
                        this.saleMethods[1].amount += paycard
                        this.saleMethods[2].amount += paybank
                        this.saleMethods[3].amount += paykhqr
                        this.saleMethods[4].amount += paypoint
                        this.saleMethods[5].amount += payscredit
                        this.saleMethods[6].amount += paypatner
                        this.saleReport  = {
                            saleSummary: this.sSumary,
                            saleMethod: this.saleMethods,
                            saleCampaign: this.saleCampaigns,
                            saleEmp: this.saleEmps,
                            saleDetail: this.saleDetails,
                            salePartner: this.salePartners
                        }
                        this.$emit("onUpdate", this.saleReport);
                        this.transactions = this.sSumary
                        this.$emit("onUpdate", this.transactions);
                        if(this.ontab == 'loyalty'){
                            this.searchLoyalty({})
                        }else if(this.ontab == 'item'){
                            this.searchItem({})
                        }
                    }
                }else{
                    this.showLoading = false
                    this.saleReport  = {
                        saleSummary: this.sSumary,
                        saleMethod: this.saleMethods,
                        saleCampaign: this.saleCampaigns,
                        saleEmp: this.saleEmps,
                        saleDetail: this.saleDetails,
                        salePartner: this.salePartners
                    }
                    this.$emit("onUpdate", this.saleReport);
                    this.transactions = this.sSumary
                    this.$emit("onUpdate", this.transactions);
                    if(this.ontab == 'loyalty'){
                        this.searchLoyalty({})
                    }else if(this.ontab == 'item'){
                        this.searchItem({})
                    }
                }
            })
            // this.searchItem({})
        },
        searchItem(key){
            let st = new Date(this.startDate + ' 00:00:00').getTime().toString();
            let ed = new Date(this.endDate + ' 23:59:59').getTime().toString();
            this.txns = []
            let d = {
                epsAtt: {
                    ':dateSk': this.activeStore.pk + '/items',
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
                        ':regiPk': this.register + '/items',
                        ':startDate': st,
                        ':endDate': ed,
                    },
                    index: 'regiPk-searchDate-index',
                    keyCondition: 'regiPk = :regiPk and searchDate between :startDate and :endDate',
                    key: key
                }
            }
            if(Object.keys(key).length == 0){
                this.itemReport = {}
                this.itemDetails = []
            }
            this.showLoading = true
            commerceHandler.reportGets(d).then(res => {
                let data = res.data.data.Items
                if(data.length > 0){
                    data.sort(function (a, b) {
                        return parseFloat(new Date(b.issuedDate).getTime()) - parseFloat(new Date(a.issuedDate).getTime())
                    })
                    window.console.log(data, 'data  items')
                    if(data.length > 0){
                        data.forEach(d=>{
                            if($.inArray(d.sk, this.txnIds) != -1) {
                                let cutype = d.cusType || ''
                                let regipk = d.regiPk.replace('/items', '')
                                let register = this.allRegister.filter((r)=>{return r.pk == regipk})
                                let regi = register[0]
                                let catname = ''
                                if(d.categoryId != ''){
                                    let cate = this.categories.filter((c)=>{ return c.id == d.categoryId})
                                    catname = cate[0].name
                                }
                                // window.console.log(cate, 'cate filter')
                                this.itemDetails.push({
                                    register: regi.name,
                                    issuedDate: d.issuedDate,
                                    orderTime: d.orderDate != '' ? kendo.toString(new Date(d.orderDate), 'hh:mm tt') : '',
                                    billTime: kendo.toString(new Date(d.billDate), 'hh:mm tt'),
                                    txnNum: d.txnNum,
                                    saleUnit: d.saleUnit,
                                    orderType: d.orderType,
                                    cusType: cutype != '' ? i18n.t(cutype.toLowerCase()) : i18n.t('general'),
                                    cusName: d.cusName,
                                    itmNum: d.sku,
                                    itmName: d.itmName,
                                    itmOtherName: d.itmOtherName,
                                    paymentMethod: i18n.t(d.paymentMethod.toLowerCase()),
                                    qty: d.qty,
                                    price: d.price,
                                    discount: d.discount,
                                    comission: d.comission || 0,
                                    tax: d.tax,
                                    amount: d.amount,
                                    category: catname
                                })
                            }
                        })
                    }
                    if(res.data.data.hasOwnProperty('LastEvaluatedKey')){
                        let dkey = res.data.data.LastEvaluatedKey
                        this.searchItem(dkey)
                    }else{
                        this.showLoading = false
                        this.itemReport = {
                            itemDetail: this.itemDetails
                        }
                        this.$emit("onUpdate", this.itemReport);
                    }
                }else{
                    this.showLoading = false
                    this.itemReport  = {
                        itemDetail: this.itemDetails
                    }
                    this.$emit("onUpdate", this.itemReport);
                }
            })
        }, 
        searchLoyalty(key){
            let st = new Date(this.startDate + ' 00:00:00').getTime().toString();
            let ed = new Date(this.endDate + ' 23:59:59').getTime().toString();
            this.txns = []
            // let d = {
            //     expValue: {
            //         ':sk': instituteId,
            //         ':pk': 'loyal-lcard-'
            //     },
            //     index: 'sk-pk-index',
            //     condition: 'sk = :sk and begins_with(pk, :pk)',
            //     type: 'report',
            //     key: key
            // }
            let d = {
                expValue: {
                    ':rankPk': this.activeStore.pk + '#card',
                    ':startDate': st,
                    ':endDate': ed,
                },
                index: 'rankPk-searchDate-index',
                condition: 'rankPk = :rankPk and searchDate between :startDate and :endDate',
                type: 'report',
                key: key
            }
            if(this.register != ''){
                d = {
                    expValue: {
                        ':subRank': this.register + '#card',
                        ':startDate': st,
                        ':endDate': ed,
                    },
                    index: 'subRank-searchDate-index',
                    condition: 'subRank = :subRank and searchDate between :startDate and :endDate',
                    key: key,
                    type: 'report'
                }
            }
            if(Object.keys(key).length == 0){
                this.cardList = []
            }
            this.showLoading = true
            loyaltyHandler.generalGets(d).then(res => {
                let data = res.data.data.Items
                window.console.log(data, 'res from loyalty card')
                if(data.length > 0){
                    data.sort(function (a, b) {
                        return parseFloat(new Date(b.issuedDate).getTime()) - parseFloat(new Date(a.issuedDate).getTime())
                    })
                    data.forEach(d=>{
                        let register = this.allRegister.filter((r)=>{return r.pk == d.register})
                        // let regi = register[0]
                        let rname = ''
                        if(register.length > 0){
                            rname = register[0].name
                        }
                        this.cardList.push({
                            pk: d.pk,
                            register: rname,
                            cardNum: d.cardNumber,
                            serial: d.serial,
                            group: d.group.name,
                            status: i18n.t(d.status),
                            statusa: d.status,
                            ownername: d.activateName,
                            gender: i18n.t(d.activateGender),
                            phone: d.activatePhone,
                            email: d.activateEmail,
                            dob: d.activateDob,
                            lastVisit: kendo.toString(new Date(d.lastVisit), 'yyyy-MMM-dd hh:mm tt'),
                            totalPoint: d.totalPoint,
                            pointPay: d.pointPay,
                            earnPoint: d.earnPoint
                        })
                    })
                    if(res.data.data.hasOwnProperty('LastEvaluatedKey')){
                        let dkey = res.data.data.LastEvaluatedKey
                        this.searchLoyalty(dkey)
                    }else{
                        this.showLoading = false
                        this.loyaltyReport = this.cardList
                        this.$emit("onUpdate", this.loyaltyReport);
                    }
                }else{
                    this.showLoading = false
                    this.loyaltyReport = this.cardList
                    this.$emit("onUpdate", this.loyaltyReport);
                }
            })
        }, 
        loadRegister(){
            this.showLoading = true
            commerceHandler.registerGets().then(res => {
                let d = res.data.data
                if(d.length > 0){
                    this.showLoading = false
                    this.allRegister = d
                    this.registers = d
                }
            })
        },
        async loadCategory() {
            this.categories = []
            categoryHandler.get().then((res) => {
                this.categories = res
                window.console.log(res, 'categories')
            });
        },
    },
    mounted: async function () {
        await this.loadRegister()
        await this.loadCategory()
        this.onSorterChanges(3)
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
};
</script>
<style scoped>
/* .v-menu__content{
  top: 141px !important;
  left: 1098px !important;
} */
.v-menu__content .v-list .v-list-item {
    min-height: 35px !important;
}

.tab_wrapper {
    position: relative;
    display: inherit;
}

.v-tab {
    min-width: 30px;
    font-size: 17px;
    text-transform: capitalize;
}

.v-icon--left {
    margin-right: 0px;
}

.theme--light.v-tabs > .v-tabs-bar {
    border-bottom: 1px solid #ddd !important;
}
.menuable__content__active{
    left: 448px !important;
}



.v-tab--active {
    background-color: #E5EFFA;
    color: #000;
}

.theme--light.v-tabs >>> .v-tabs-bar {
    border-bottom: 1px solid #ddd !important;
}

.v-card__text {
    padding: 0 !important;
}
@media (min-width: 1264px){
  .body-app {
    max-width: 1110px;
    }
  }
@media (min-width: 1904px){
      .body-app {
          max-width: 1440px;
      }
  }
</style>
	