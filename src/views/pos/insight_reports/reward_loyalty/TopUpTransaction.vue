<template>
    <v-row>
        <v-col sm="12" cols="12" class="grayBg px-6 pl-3">
            <v-card color="white" class="pa-3 no_border" elevation="0">
                <v-row>
                    <v-col sm="12" cols="12">
                        <gridFullScreen>
                            <template>
                                <kendo-datasource
                                    ref="topUpTxn"
                                    :type="'JSON'"
                                    :data="topUpTxns"
                                    :group="group"
                                    :server-paging="false"/>
                                <kendo-grid
                                    id="topUpTxn" class="grid-function"
                                    :data-source-ref="'topUpTxn'"
                                    :editable="false"
                                    :groupable="true"
                                    :column-menu="true"
                                    :noRecords="true"
                                    :sortable="true"
                                    :excel-file-name="$t('point_transactions')+'.xlsx'"
                                    :excel-filterable="true"
                                    :excel-all-pages="true"
                                    :toolbar="['excel']"

                                    :scrollable-virtual="true">
                                    <kendo-grid-column
                                        :field="'register'"
                                        :title="$t('register')"
                                        :width="150"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                    <kendo-grid-column
                                        :field="'function'"
                                        :title="$t('function')"
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
                                        :field="'total'"
                                        :template="'#= total.toFixed(2) #'"
                                        :title="$t('total_amount')"
                                        :width="150"
                                        :attributes="{style: 'text-align: right; ', class:'tb_name_td'}"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                    />
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
    name: "TopUpTxnReport",
    components: {
        gridFullScreen: () => import("@/components/gridFullScreen"),
    },
    data: () => ({
        group: {field: 'function'},
    }),
    props: {topUpTxns: {}},
    computed: {},
    methods: {
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
