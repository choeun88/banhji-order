<template>
    <v-row>
        <v-col sm="12" cols="12" class="grayBg px-6 pl-3">
            <v-card color="white" class="pa-3 no_border" elevation="0">
                <v-row>
                    <v-col sm="12" cols="12" class="py-0">
                        <h2 class="mb-0 font_20">{{ $t('sale_detail_by_sale_unit_and_order_type') }}</h2>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col sm="12" cols="12">
                        <gridFullScreen>
                            <template>
                                <kendo-datasource
                                    ref="saleDetail"
                                    :group="group"
                                    :data="saleDetails" />
                                <kendo-grid
                                    id="saleDetail" class="grid-function"
                                    :data-source-ref="'saleDetail'"
                                    :editable="false"
                                    :groupable="true"
                                    :column-menu="true"
                                    :noRecords="true"
                                    :sortable="true"
                                    :excel-file-name="$t('sale_detail')+'.xlsx'"
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
                                        :width="120"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                    <kendo-grid-column
                                        :field="'number'"
                                        :title="$t('number')"
                                        :width="180"
                                        :attributes="{style: 'text-align: right; ', class:'tb_name_td'}"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                    <kendo-grid-column
                                        :field="'issuedDate'"
                                        :title="$t('issued_date')"
                                        :width="200"
                                        :attributes="{style: 'text-align: right; ', class:'tb_name_td'}"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                    <kendo-grid-column
                                        :field="'orderTime'"
                                        :title="$t('order_time')"
                                        :width="200"
                                        :attributes="{style: 'text-align: right; ', class:'tb_name_td'}"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                    <kendo-grid-column
                                        :field="'billTime'"
                                        :title="$t('bill_time')"
                                        :width="200"
                                        :attributes="{style: 'text-align: right; ', class:'tb_name_td'}"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                    />
                                    <kendo-grid-column
                                        :field="'saleUnit'"
                                        :title="$t('sale_unit')"
                                        :width="200"
                                        :attributes="{style: 'text-align: right; ', class:'tb_name_td'}"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                    />
                                    <kendo-grid-column
                                        :field="'orderType'"
                                        :title="$t('order_type')"
                                        :width="200"
                                        :attributes="{style: 'text-align: right; ', class:'tb_name_td'}"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                    />
                                    <kendo-grid-column
                                        :field="'cusType'"
                                        :title="$t('customer_type')"
                                        :width="200"
                                        :attributes="{style: 'text-align: right; ', class:'tb_name_td'}"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                    />
                                    <kendo-grid-column
                                        :field="'cusName'"
                                        :title="$t('customer_name')"
                                        :width="200"
                                        :attributes="{style: 'text-align: right; ', class:'tb_name_td'}"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                    />
                                    <kendo-grid-column
                                        :field="'localMen'"
                                        :title="$t('local_men')"
                                        :width="200"
                                        :hidden="true"
                                        :attributes="{style: 'text-align: right; ', class:'tb_name_td'}"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                    />
                                    <kendo-grid-column
                                        :field="'localWomen'"
                                        :title="$t('local_women')"
                                        :width="200"
                                        :hidden="true"
                                        :attributes="{style: 'text-align: right; ', class:'tb_name_td'}"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                    />
                                    <kendo-grid-column
                                        :field="'forMen'"
                                        :title="$t('for_men')"
                                        :width="200"
                                        :hidden="true"
                                        :attributes="{style: 'text-align: right; ', class:'tb_name_td'}"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                    />
                                    <kendo-grid-column
                                        :field="'forWomen'"
                                        :title="$t('for_women')"
                                        :width="200"
                                        :hidden="true"
                                        :attributes="{style: 'text-align: right; ', class:'tb_name_td'}"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                    />
                                    <kendo-grid-column
                                        :field="'totalGuest'"
                                        :title="$t('total_guest')"
                                        :width="200"
                                        :attributes="{style: 'text-align: right; ', class:'tb_name_td'}"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                    />
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

export default {
    components: {
        gridFullScreen: () => import("@/components/gridFullScreen"),
        LoadingMe: () => import(`@/components/Loading`),
    },
    data: () => ({
        group: {field: 'sesNum'},
        showLoading: false,
        loadingAlert: false,
        loadingColorAlert: '',
        loadingTextAlert: '',
        startDate: new Date().toISOString().substring(0, 10),
        endDate: new Date().toISOString().substring(0, 10),
        desserts: [
          {
            n: '1',
            store: 'Abcd',
            number: '123456',
            saleUnit: '1',
            Cashhier: '1',
            date : '1',
            time: '1',
            oderType: '1',
            customerName: 'abc',
            localMen: '1',
            localWomen: '1',
            forMen: '1',
            forWomen: '1',
            subTotal : '1',
            discount: '1',
            saleComission: '1',
            vat: '1',
            totalAmount: '1',
          },
          {
            n: '2',
            store: 'Abcd',
            number: '123456',
            saleUnit: '1',
            Cashhier: '1',
            date : '1',
            time: '1',
            oderType: '1',
            customerName: 'abcd',
            localMen: '1',
            localWomen: '1',
            forMen: '1',
            forWomen: '1',
            subTotal : '1',
            discount: '1',
            saleComission: '1',
            vat: '1',
            totalAmount: '1',
          },
          
        ],
    }),
    props: {saleDetails: {}},
    computed: {},
    methods: {
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.saleDetail.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
    },
};
</script>
<style scoped>
.v-application--is-ltr .v-data-table > .v-data-table__wrapper > table > tbody > tr > th, .v-application--is-ltr .v-data-table > .v-data-table__wrapper > table > thead > tr > th, .v-application--is-ltr .v-data-table > .v-data-table__wrapper > table > tfoot > tr > th {
    text-align: left;
    border: 0.2px solid cadetblue !important;
}
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
.grid_fullscreens{
  position: absolute; 
  z-index: 200; 
  right: -10px;
  padding: 10px; 
  top:-35px !important; 
}
.v-data-table__wrapper > table > thead > tr > th {
    color: #000 !important;
    font-weight: 700;}

</style>
