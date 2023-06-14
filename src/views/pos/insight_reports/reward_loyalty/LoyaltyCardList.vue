<template>
    <v-row>
        <v-col sm="12" cols="12" class="grayBg px-6 pl-3">
            <v-card color="white" class="pa-3 no_border" elevation="0">
                <v-row>
                    <v-col sm="12" cols="12">
                        <gridFullScreen>
                            <template>
                                <kendo-datasource
                                    ref="cardListDS"
                                    :type="'JSON'"
                                    :data="cardList"
                                    :group="group"
                                    :server-paging="false"/>
                                <kendo-grid
                                    id="cardListDS" class="grid-function"
                                    v-on:databound="dataBound"
                                    :data-source-ref="'cardListDS'"
                                    :editable="false"
                                    :groupable="true"
                                    :column-menu="true"
                                    :noRecords="true"
                                    :sortable="true"
                                    :excel-file-name="$t('loyalty_card_list')+'.xlsx'"
                                    :excel-filterable="true"
                                    :excel-all-pages="true"
                                    :toolbar="['excel']"
                                    :scrollable-virtual="true">
                                    <kendo-grid-column
                                        :command="[
                                            {
                                                iconClass: 'k-icon k-i-plus',
                                                text: $t('view_txn'),
                                                click: veiwTxn,
                                                className: 'k-state-disabled isSerialNumber btn-plus',
                                            }
                                        ]"
                                        :width="190"
                                        :hidden="false"
                                        :headerAttributes="{style:'text-align: right; background-color: #EDF1F5',}"
                                    />
                                    <kendo-grid-column
                                        :field="'register'"
                                        :title="$t('register')"
                                        :width="150"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                    
                                    <kendo-grid-column
                                        :field="'cardNum'"
                                        :title="$t('card_number')"
                                        :width="150"
                                        :attributes="{style: 'text-align: right; ', class:'tb_name_td'}"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                    <kendo-grid-column
                                        :field="'serial'"
                                        :title="$t('serial')"
                                        :width="150"
                                        :attributes="{style: 'text-align: right; ', class:'tb_name_td'}"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                    <kendo-grid-column
                                        :field="'status'"
                                        :title="$t('status')"
                                        :width="150"
                                        :attributes="{style: 'text-align: right; ', class:'tb_name_td'}"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                    <kendo-grid-column
                                        :field="'group'"
                                        :title="$t('group')"
                                        :width="150"
                                        :attributes="{style: 'text-align: right; ', class:'tb_name_td'}"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                    <kendo-grid-column
                                        :field="'ownername'"
                                        :title="$t('owner_name')"
                                        :width="150"
                                        :attributes="{style: 'text-align: right; ', class:'tb_name_td'}"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                    <kendo-grid-column
                                        :field="'gender'"
                                        :title="$t('gender')"
                                        :hidden="true"
                                        :width="150"
                                        :attributes="{style: 'text-align: right; ', class:'tb_name_td'}"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                    <kendo-grid-column
                                        :field="'phone'"
                                        :title="$t('phone')"
                                        :width="150"
                                        :attributes="{style: 'text-align: right; ', class:'tb_name_td'}"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                    <kendo-grid-column
                                        :field="'email'"
                                        :title="$t('email')"
                                        :width="150"
                                        :hidden="true"
                                        :attributes="{style: 'text-align: right; ', class:'tb_name_td'}"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                    <kendo-grid-column
                                        :field="'dob'"
                                        :title="$t('dob')"
                                        :width="150"
                                        :hidden="true"
                                        :attributes="{style: 'text-align: right; ', class:'tb_name_td'}"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                        
                                    <kendo-grid-column
                                        :field="'lastVisit'"
                                        :title="$t('last_visit_date')"
                                        :width="150"
                                        :attributes="{style: 'text-align: right; ', class:'tb_name_td'}"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                    <kendo-grid-column
                                        :field="'totalPoint'"
                                        :title="$t('total_point')"
                                        :width="150"
                                        :attributes="{style: 'text-align: right; ', class:'tb_name_td'}"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                    />
                                    <kendo-grid-column
                                        :field="'pointPay'"
                                        :title="$t('point_pay')"
                                        :width="150"
                                        :attributes="{style: 'text-align: right; ', class:'tb_name_td'}"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                    />
                                    <kendo-grid-column
                                        :field="'earnPoint'"
                                        :title="$t('earn_point')"
                                        :width="150"
                                        :attributes="{style: 'text-align: right; ', class:'tb_name_td'}"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                    />
                                </kendo-grid>
                            </template>
                        </gridFullScreen>
                    </v-col>
                </v-row>
                <v-dialog v-model="dialogS" max-width="700px" eager persistent>
                    <v-card>
                        <div class="modal_header">
                            <v-card-title>{{ $t("transaction") }}</v-card-title>
                            <v-icon @click="dialogS = false">close</v-icon>
                        </div>
                        <v-card-text class="modal_text_content">
                            <v-row>
                                <LoadingMe
                                :isLoading="showLoading"
                                :fullPage="false"
                                type="loading"
                                :myLoading="true"/>
                                <v-row class="">
                                    <v-col sm="3" cols="12" class="py-0">
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
                                    <v-col sm="2" cols="1" class="py-0 mt-1">
                                        <v-btn color="primary white--text" @click="search({})">
                                            <i
                                                class="b-search"
                                                style="font-size: 18px; color: #fff !important"
                                            />
                                        </v-btn>
                                    </v-col>
                                </v-row>


                                <v-col sm="12" cols="12" class="pt-0">
                                    <kendo-datasource
                                        ref="dataSource1"
                                        :group="groupa"
                                        :data="txns"
                                    />
                                    <kendo-grid
                                        id="dataSource1"
                                        class="grid-function"
                                        :data-source-ref="'dataSource1'"
                                        :sortable="false"
                                        :filterable="false"
                                        :column-menu="true"
                                        :editable="true"
                                        :excel-file-name="$t('card_transactions')+'.xlsx'"
                                        :excel-filterable="true"
                                        :excel-all-pages="true"
                                        :toolbar="['excel']"
                                        :scrollable-virtual="true"
                                    >
                                        <kendo-grid-column
                                            :field="'cardNum'"
                                            :title="$t('card_number')"
                                            :width="150"
                                            :hidden="true"
                                            :attribute="{class: 'k-state-disabled'}"
                                            :headerAttributes="{style: 'background-color: #EDF1F5', }"
                                        />
                                        <kendo-grid-column
                                            :field="'issuedDate'"
                                            :title="$t('date')"
                                            :width="150"
                                            :template="'#= kendo.toString(new Date( parseFloat(sk)), `yyyy-MMM-dd hh:mm tt`)#'"
                                            :attribute="{class: 'k-state-disabled'}"
                                            :headerAttributes="{style: 'background-color: #EDF1F5', }"
                                        />
                                        <kendo-grid-column
                                            :field="'store'"
                                            :title="$t('store')"
                                            :width="150"
                                            :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                        />
                                        <kendo-grid-column
                                            :field="'txnNumber'"
                                            :title="$t('number')"
                                            :width="150"
                                            :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                        />
                                        <kendo-grid-column
                                            :field="'point'"
                                            :title="$t('amount')"
                                            :width="150"
                                            :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                        />
                                        <kendo-grid-column
                                            :field="'type'"
                                            :title="$t('type')"
                                            :width="150"
                                            :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                        />
                                    </kendo-grid>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-dialog>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import kendo from "@progress/kendo-ui";
const $ = kendo.jQuery
import DatePickerComponent from "@/components/custom_templates/DatePickerComponent";
const loyaltyHandler = require("@/scripts/loyalty/handler/loyaltyHandler")
import { i18n } from '@/i18n';
export default {
    name:"LoyaltyCardList",
    components: {
        gridFullScreen: () => import("@/components/gridFullScreen"),
        "app-datepicker": DatePickerComponent,
        LoadingMe: () => import(`@/components/Loading`),
    },
    data: () => ({
        group: {field: 'group'},
        groupa: {field: 'type'},
        dialogS: false,
        showLoading: false,
        txns: [],
        startDate: new Date().toISOString().substring(0, 10),
        endDate: new Date().toISOString().substring(0, 10),
        mDateSorter: 3,
        activeItm: {}
    }),
    props: {cardList: {}},
    mounted: async function () {
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
    methods: {
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
        search(key){
            window.console.log(this.activeItm)
            let st = new Date(this.startDate + ' 00:00:00').getTime().toString();
            let ed = new Date(this.endDate + ' 23:59:59').getTime().toString();
            this.txns = []
            let d = {
                expValue: {
                    ':pk': this.activeItm.pk + '#txn',
                    ':startDate': st,
                    ':endDate': ed,
                },
                condition: 'pk = :pk and sk between :startDate and :endDate',
                type: '',
                key: key
            }
            if(Object.keys(key).length == 0){
                this.txns = []
            }
            let ds = this.$refs.dataSource1.kendoWidget(),
                total = ds.total()
            this.showLoading = true
            loyaltyHandler.generalGets(d).then(res => {
                let data = res.data.data.Items
                window.console.log(data, 'res from loyalty card')
                if(data.length > 0){
                    data.sort(function (a, b) {
                        return parseFloat(new Date(b.issuedDate).getTime()) - parseFloat(new Date(a.issuedDate).getTime())
                    })
                    window.console.log(data, 'res card txn')
                    data.forEach(d=>{
                        d.type = i18n.t(d.type)
                        d.cardNum = this.activeItm.cardNum
                        ds.insert(total, d)
                    })
                    if(res.data.data.hasOwnProperty('LastEvaluatedKey')){
                        let dkey = res.data.data.LastEvaluatedKey
                        this.search(dkey)
                    }else{
                        this.showLoading = false
                        
                    }
                }else{
                    this.showLoading = false
                    this.loyaltyReport  = {
                        cardList: this.cardList,
                    }
                    this.$emit("onUpdate", this.loyaltyReport);
                }
            })
        },
        veiwTxn(e) {
            e.preventDefault();
            let grid = kendo.jQuery("#cardListDS").data("kendoGrid")
            let dataItem = grid.dataItem($(e.currentTarget).closest("tr"))
            if (dataItem.status != 'open') {
                this.dialogS = true
                this.activeItm = dataItem
                setTimeout(()=>{
                    let ds = this.$refs.dataSource1.kendoWidget()
                    ds.data([])
                }, 500)
            }else{
                this.activeItm = {}
                this.dialogS = false
            }
            
        },
        dataBound: function (e) {
            const grid = kendo.jQuery("#cardListDS").data("kendoGrid")
            const items = e.sender.items();
            items.each(function () {
                let dataItem = grid.dataItem(this);
                kendo
                    .jQuery("tr[data-uid='" + dataItem.uid + "']")
                    .find(".isSerialNumber")
                    .each(function () {
                        window.console.log(dataItem)
                        if (dataItem.statusa != 'open') {
                            kendo.jQuery(this).removeClass("k-state-disabled");
                        } else {
                            kendo.jQuery(this).addClass("k-state-disabled");
                        }
                    });
            });
        },
    },
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
