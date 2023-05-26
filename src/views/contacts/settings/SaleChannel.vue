<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pt-0">
            <h2 class="mb-0">{{ $t('sale_channel') }}</h2>
            <v-dialog v-model="dialogM2" max-width="400px">
                <template v-slot:activator="{ on }">
                    <v-btn class="white--text float-right text-capitalize" color="primary" v-on="on" @click="onNewClick">
                        {{ $t('new_channel') }}
                    </v-btn>
                </template>
                <v-card>
                    <div class="modal_header">
                        <v-card-title>{{ $t('sale_channel') }}</v-card-title>
                        <v-icon class="btn_close" @click="dialogM2 = false">close</v-icon>
                    </div>
                    <v-card-text class="modal_text_content">
                        <v-row>
                            <v-col sm="12" cols="12" class="pb-0">
                                <label class="label">{{ $t('name') }}</label>
                                <p class="text_tip">{{ $t('customer_type_name_desc') }}</p>
                                <v-text-field class="mb-1"
                                              outlined
                                              v-model="saleChannel.name"
                                              tage="Customer Type Name"
                                              placeholder=""/>
                            </v-col>
                            <v-col sm="12" cols="12" class="py-0">
                                <v-row>
                                    <v-col class="py-0" sm="12" cols="12">
                                        <label class="label">{{ $t('nature') }}</label>
                                        <p class="text_tip">{{ $t('nature_customer_desc') }}</p>
                                        <v-select class="mt-2"
                                                  id="acc_type_selector"
                                                  :items="natures"
                                                  item-text="name"
                                                  tage="Nature"
                                                  item-value="id"
                                                  v-model="mNature"
                                                  outlined
                                                  return-object/>
                                    </v-col>
                                </v-row>

                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-divider/>
                    <v-card-actions class="modal_footer">
                        <v-row>
                            <v-col sm="6" cols="6" class="py-0">
                                <v-btn color="primary"
                                       outlined
                                       class=" text-capitalize  black--text float-left"
                                       @click="dialogM2 = false">{{ $t('cancel') }}
                                </v-btn>
                            </v-col>
                            <v-col sm="6" cols="6" class="py-0">
                                <v-btn color="primary"
                                       class=" white--text text-capitalize float-right"
                                       @click.native="onSaveClose">
                                    {{ $t('save_close') }}
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-actions>

                </v-card>
            </v-dialog>
            <p class="mb-0">{{ $t('sale_channel_desc') }} </p>
        </v-col>

        <v-col sm="12" cols="12">
            <template>
                <LoadingMe :isLoading="showLoading" :fullPage="true" :myLoading="true"/>
                <kendo-datasource ref="gridSaleChannelDS"
                                  :data="saleChannelList"/>
                <kendo-grid id="gridSaleChannel" class="grid-function"
                            :data-source-ref="'gridSaleChannelDS'"
                            :editable="false"
                            :scrollable-virtual="true">
                    <kendo-grid-column
                        :field="'no'"
                        :title="$t('no')"
                        :template="rowNumberTmpl"
                        :width="40"
                        :column-menu="false"
                        :headerAttributes="{ style: 'background-color: #EDF1F5;', class: 'text-center'	}"
                        :attributes="{style: 'text-align: center'}"/>
                    <kendo-grid-column
                        :field="'name'"
                        :title="$t('name')"
                        :attributes="{class:'tb_name_td'}"
                        :width="50"
                        :template="'<span>#=name#</span>'"
                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                    <kendo-grid-column
                        :field="'nature'"
                        :title="$t('nature')"
                        :width="90"
                        :template="'<span>#=nature#</span>'"
                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                    <kendo-grid-column
                        :field="''"
                        :title="$t('action')"
                        :width="70"
                        :command="[{ iconClass: 'k-icon k-i-edit', text: 'Edit', click: goEdit }]"
                        :headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"/>
                </kendo-grid>
            </template>
        </v-col>
    </v-row>
</template>

<script>
import SaleChannelModel from "@/scripts/model/SaleChannel";
import kendo from "@progress/kendo-ui";

const $ = require("jquery")
const saleChannelHandler = require("@/scripts/saleChannelHandler")
const saleChannelModel = new SaleChannelModel({})


export default {
    components: {
        LoadingMe: () => import(`@/components/Loading`),
    },
    data: () => ({
        dialogM2: '',
        showLoading: true,
        natures: [
            'Online', 'Offline'
        ],
        mNature: '',
        saleChannel: saleChannelModel,
        saleChannelList: []
    }),
    props: {},
    computed: {},
    watch: {},
    created() {
    },
    methods: {
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.gridSaleChannelDS.kendoWidget(),
                index = ds.indexOf(dataItem)
            return index + 1
        },
        onNewClick() {
            this.saleChannel = {}
            this.saleChannel.id = undefined
        },
        goEdit(e) {
            e.preventDefault()
            let grid = kendo.jQuery("#gridSaleChannel").data("kendoGrid")
            let dataItem = grid.dataItem($(e.currentTarget).closest("tr"))
            this.saleChannel = dataItem
            this.mNature = dataItem.nature

            this.dialogM2 = true
        },
        close() {
            this.dialogM2 = false;
        },
        async onSaveClose() {
            // if (!this.$refs.form.validate()) {
            //   this.$refs.form.validate()
            //   return
            // }
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    let data = {
                        id: this.saleChannel.id ? this.saleChannel.id : '',
                        name: this.saleChannel.name,
                        nature: this.mNature
                    }
                    saleChannelHandler.create(data).then(response => {
                        if (response.data.statusCode === 201) {
                            const res = response.data.data
                            const index = this.saleChannelList.findIndex(item => {
                                return (res.id === item.id)
                            })
                            if (this.saleChannelList.length === 0) {
                                this.loadSaleChannel()
                            } else {
                                if (index < 0) {
                                    this.saleChannelList.push(res)
                                } else {
                                    this.saleChannelList.splice(index, 1, res)
                                }
                            }

                            this.$snotify.success('Success')
                            this.close()
                            // this.$refs.form.reset()
                        }
                    }).catch(e => {
                        this.$snotify.error('Something went wrong')
                        this.errors.push(e)
                    })

                }, 300);
            })
        },
        async loadSaleChannel() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.showLoading = true
                    saleChannelHandler.get().then(res => {
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            this.saleChannelList = res.data.data
                        } else {
                            this.showLoading = false
                        }

                    })
                }, 300);
            })
        },
    },
    mounted: async function () {
        await this.loadSaleChannel()
    }
};
</script>