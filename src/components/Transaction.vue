<template>
    <v-row class="white">
        <v-col sm="10" cols="12" class="pb-0">
            <app-searchdate :initStartDate="startDate" @emitStartDate="startDate = $event"
                            :initEndDate="endDate" @emitEndDate="endDate = $event" />
        </v-col>

        <v-col sm="1" cols="1" class="mt-1 pb-0">
            <v-btn class="btn_search" @click="searchTransaction" style="background-color: rgb(237, 241, 245)">
                <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
            </v-btn>
        </v-col>
        <v-col sm="12" cols="12" class="py-0">
            <kendo-datasource 
                ref="transactionDS"
                :data="transactions"
                :sort-field="'journal_date'"
                :sort-dir="'desc'"
                page="1"
                page-size="10" />

            <kendo-grid id="transactionGrid" 
                ref="transactionGrid"
                :data-source-ref="'transactionDS'"
                :noRecords="true"
                :sortable="true"
                :pageable-page-sizes="true"
                :pageable-button-count="5">
                <kendo-grid-column 
                    :field="'journal_date'"
                    :title="$t('date')"
                    :template="'#=kendo.toString(new Date(journal_date), `dd-MM-yyyy`)#'"
                    :headerAttributes="{
                        style: 'text-align: center; background-color: #fff',
                    }"
                    :attributes="{ style: 'text-align: center;' }" />
                <kendo-grid-column 
                    :field="'transaction_type'"
                    :title="$t('type')"
                    :headerAttributes="{
                        style: 'background-color: #fff',
                    }" />
                <kendo-grid-column 
                    :field="'journal_number'"
                    :title="$t('number')"
                    :template="numberTemplate"
                    :headerAttributes="{
                        style: 'background-color: #fff',
                    }" />
                <kendo-grid-column 
                    :field="'description'"
                    :title="$t('description')"
                    :headerAttributes="{
                        style: 'background-color: #fff',
                    }" />
                <kendo-grid-column 
                    :field="'exchanged_amount'"
                    :title="$t('amount')"
                    :format="'{0:n}'"
                    :headerAttributes="{
                        style: 'text-align: right; background-color: #fff',
                    }"
                    :attributes="{ style: 'text-align: right;' }" />
            </kendo-grid>
        </v-col>
    </v-row>
</template>

<script>    
    import kendo from '@progress/kendo-ui';
    import JQuery from 'jquery';
    // import {i18n} from '@/i18n'
    import Helper from "@/helper.js";
    import { AccountModel } from "@/scripts/model/AppModels";

    // const $ = require("jquery");
    const { journalHandler } = require("@/scripts/AppHandlers.js");
    const { EntityType } = require("@/scripts/default_setup/Collections");

    export default {
        name: "Transaction",
        props: {
            initAccount: {
                type: AccountModel,
            },
        },
        components: {
            'app-searchdate': () => import('@/components/custom_templates/SearchDate'),
        },
        data: () => ({
            // Obj
            account             : new AccountModel(),
            transactions        : [],
            // Search Dates  
            startDate          : "",
            endDate            : "",
            Helper              : Helper,
        }),
        methods: {
            // Search Transaction
            searchTransaction() {
                let self = this,
                    sdate = this.startDate,
                    edate = this.endDate;

                if (this.account.uuid) {
                    if (sdate && edate) {
                        sdate = kendo.toString(new Date(sdate), 'yyyy-MM-dd') + 'T00:00:00.000Z';

                        edate = new Date(edate);
                        edate = kendo.toString(edate, 'yyyy-MM-dd') + 'T23:59:59.999Z';
                    } else {
                        sdate = 0;
                        edate = 0;
                    }

                    // Clear
                    let ds = this.$refs.transactionDS.kendoWidget();
                    ds.data([]);

                    this.showLoading = true;
                    journalHandler.getEntryDetailByAccount(this.account.uuid, {
                        params: {
                            start_date: sdate,
                            end_date: edate,
                        }
                    })
                    .then(res => {
                        if(!JQuery.isEmptyObject(res)){
                            this.transactions = res.entries_detail;
                        }
                    })
                    .finally(() => {
                        self.showLoading = false;
                    })
                }
            },
            // Template
            numberTemplate: (dataItem) => {
                // Default link is journal
                let link = Helper.linkTemplate(dataItem.journal_number, `${EntityType.JOURNAL}/view/${dataItem.journal_uuid}`);
                
                // Transaction link
                if(dataItem.referral_transaction_uuid !== ''){
                    return Helper.linkTemplate(dataItem.journal_number, `${dataItem.transaction_type}/view/${dataItem.referral_transaction_uuid}`);
                }
                
                return link;
			},
            // goView (e) {
            //     e.preventDefault();

			// 	let grid = this.$refs.transactionGrid.kendoWidget(),
            //         dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
                    
            //     if(dataItem.referral_transaction_uuid !== ''){
            //         this.$router.push({ path: `${dataItem.transaction_type.toLowerCase()}/view/${dataItem.referral_transaction_uuid}` });
            //     }else{
            //         this.$router.push({ path: `journal/view/${dataItem.journal_uuid}` });
            //     }
            // },
        },
        watch: {
            initAccount () {
                this.account = this.initAccount;
                this.searchTransaction();
            },
        },
        mounted () {
            this.account = this.initAccount;
        }
    };
</script>
<style scoped>
</style>