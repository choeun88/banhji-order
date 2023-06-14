<template>
    <v-row>
        <v-col sm="12" cols="12" class="grayBg px-6 pl-3">
            <v-card color="white" class="pa-3 no_border" elevation="0">
                <v-row>
                    <v-col sm="12" cols="12" class="py-0">
                        <h2 class="mb-0 font_20">{{ $t('sale_summary_by_campaigns') }}</h2>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col sm="12" cols="12">
                        <gridFullScreen>
                            <template>
                                <kendo-datasource
                                    ref="byCampaign"
                                    :type="'JSON'"
                                    :data="saleCampaign"
                                    :server-paging="false"/>
                                <kendo-grid
                                    id="byCampaign" class="grid-function"
                                    :data-source-ref="'byCampaign'"
                                    :editable="false"
                                    :groupable="true"
                                    :column-menu="true"
                                    :noRecords="true"

                                    :sortable="true"
                                    :excel-file-name="$t('sale_summary_by_campaigns')+'.xlsx'"
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
                                        :field="'register'"
                                        :title="$t('register')"
                                        :width="150"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                    <kendo-grid-column
                                        :field="'name'"
                                        :title="$t('campaign')"
                                        :width="150"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                    <kendo-grid-column
                                        :field="'issuedDate'"
                                        :title="$t('date')"
                                        :width="150"
                                        :template="'#= kendo.toString(new Date(issuedDate), `yyyy-MMM-dd hh:mm tt`)#'"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                    <kendo-grid-column
                                        :field="'number'"
                                        :title="$t('number')"
                                        :width="150"
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
                                    :myLoading="true"
                                    :color="loadingColorAlert"
                                    :alertText="loadingTextAlert"/>
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
// const commerceHandler = require("@/scripts/commerce/handler/commerceHandler")
// const cookieJS = require("@/cookie.js");
// const { instituteId } = cookieJS.getCookie()
import JSZip from "jszip";
window.JSZip = JSZip;
export default {
    name:'ReportSaleByCampaigns',
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        gridFullScreen: () => import("@/components/gridFullScreen"),
    },
    data: () => ({
        showLoading: false,
        loadingAlert: false,
        loadingColorAlert: '',
        loadingTextAlert: '',
        // activeStore: localStorage.getItem(instituteId + 'commStore') != null ? JSON.parse(localStorage.getItem(instituteId + 'commStore')) : {},
        startDate: new Date().toISOString().substring(0, 10),
        endDate: new Date().toISOString().substring(0, 10),
        allRegister: [],
        registers: []
    }),
    props: {saleCampaign: {}},
    computed: {},
    methods: {
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.byCampaign.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        // regiTmpl(dataItem) {
        //     const item = dataItem.register;
        //     if (item) {
        //         let register = this.allRegister.filter((r)=>{return r.pk == item})
        //         if(register.length == 0){
        //             return '';
        //         }
        //         window.console.log(regi)
        //         let regi = register[0]
        //         return `<span>${regi.name ? regi.name : ``}</span>`;
        //     } else {
        //         return ``;
        //     }
        // },
        // loadRegister(){
        //     commerceHandler.registerGets().then(res => {
        //         let d = res.data.data
        //         if(d.length > 0){
        //             let rr = []
        //             d.forEach(r=>{
        //                 if(r.store == this.activeStore.pk){
        //                     rr.push(r)
        //                 }
        //             })
        //             this.allRegister = d
        //             this.registers = rr
        //         }
        //     })
        // },
    },
    mounted: async function () {
        // await this.loadRegister()
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
