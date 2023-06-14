<template>
    <v-row>
        <v-col sm="12" cols="12" class="grayBg px-6 pl-3">
            <v-card color="white" class="pa-3 no_border" elevation="0">
                <v-row>
                    <v-col sm="12" cols="12">
                        <gridFullScreen>
                            <template>
                                <kendo-datasource
                                    ref="otherOrderDS"
                                    :group="group"
                                    :data="otherOrder" />
                                <kendo-grid
                                    id="otherOrderDS" class="grid-function"
                                    :data-source-ref="'otherOrderDS'"
                                    :editable="false"
                                    :groupable="true"
                                    :column-menu="true"
                                    :noRecords="true"
                                    :sortable="true"
                                    :excel-file-name="$t('other_orders')+'.xlsx'"
                                    :excel-filterable="true"
                                    :excel-all-pages="true"
                                    :toolbar="['excel']"
                                    :scrollable-virtual="true">
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
                                        :template="'#= kendo.toString(new Date(issuedDate), `yyyy-MMM-dd hh:mm tt`)#'"
                                        :attributes="{style: 'text-align: right; ', class:'tb_name_td'}"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                    <kendo-grid-column
                                        :field="'orderFrom'"
                                        :title="$t('order_from')"
                                        :width="200"
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
                            </template>
                        </gridFullScreen>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: "TxnOtherOrderReport",
    components: {
        gridFullScreen: () => import("@/components/gridFullScreen"),
    },
    data: () => ({
        group: {field: 'orderFrom'},
    }),
    props: {otherOrder: {}},
    watch: {},
    computed: {
    },
    methods: {
    },
    mounted: async function () {
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
