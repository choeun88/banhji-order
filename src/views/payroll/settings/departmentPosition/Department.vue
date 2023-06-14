<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pt-0">
            <h2 class="mb-0 font_20">{{$t('department')}}</h2>
            <v-dialog v-model="dialogm2" max-width="380px">
                <template v-slot:activator="{ on }">
                    <v-btn color="primary" class=" text-capitalize white--text float-right" v-on="on" @click="onNewClick">
                        {{$t('create_new')}}
                    </v-btn>
                </template>
                <v-card>
                    <div class="modal_header">
                    <v-card-title>{{$t('department')}}</v-card-title>
                    <v-icon  @click="dialogm2 = false">close</v-icon>
                    </div>
                    <v-card-text class="modal_text_content">
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-row>
                                <v-col sm="12" cols="12" class="pb-0">
                                    <label class="label">{{$t('name')}}</label>
                                    <v-text-field class="mt-1"
                                        outlined
                                        tage="Name"
                                        v-model="dapartment.name"
                                        :rules="[v => !!v || $t('field_is_required')]"
                                        placeholder=""/>
                                    <label class="label">{{$t('location')}}</label>
                                    <v-select class="mt-1"
                                        id="acc_type_selector"
                                        :items="locationList"
                                        item-text="name"
                                        item-value="id"
                                        v-model="locationSelected"
                                        :rules="[v => !!v || $t('field_is_required')]"
                                        outlined
                                        return-object/>
                                    <label class="label">{{$t('segment')}}</label>
                                    <v-select class="mt-1"
                                        id="acc_type_selector"
                                        :items="segmentList"
                                        item-text="name"
                                        :rules="[v => !!v || $t('field_is_required')]"
                                        item-value="id"
                                        v-model="segmentSelected"
                                        outlined
                                        return-object/>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                    <v-card-actions class="modal_footer">
                        <v-row>
                            <v-col sm="6" cols="6" class="py-0 text-left">
                                <v-btn color="black" outlined class=" text-capitalize  black--text float-left" @click="dialogm2 = false">{{$t('cancel')}}</v-btn>
                            </v-col>
                            <v-col sm="6" cols="6" class="py-0 text-right">
                                <v-btn color="primary" class="px-3  white--text text-capitalize" @click="onSaveClose">{{$t('save_close')}}
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-actions>

                </v-card>
            </v-dialog>
            <p class="mb-0">{{$t('department_desc')}} </p>
        </v-col>

        <v-col sm="12" cols="12" class="py-0">
            <template>
                <kendo-datasource ref="departmentDS" :data="departmentList" />
                <kendo-grid
                    id="gridDepartment"
                    class="grid-function"
                    :data-source-ref="'departmentDS'"
                    :editable="false"
                    :scrollable-virtual="true"
                    :column-menu="false">
                <kendo-grid-column
                    :field="'name'"
                    :title="$t('name')"
                    :template="'<span>#=name#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                <kendo-grid-column
                    :field="'location'"
                    :title="$t('location')"
                    :template="'<span>#= location.name || ``#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                <kendo-grid-column
                    :field="'segment'"
                    :title="$t('segment')"
                    :template="'<span>#= segment.name || ``#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                <kendo-grid-column
                    :field="''"
                    :title="$t('action')"
                    :width="100"
                    :command="[{iconClass: 'k-icon k-i-edit', text: 'Edit',click: goEdit}]"
                    :headerAttributes="{style: 'text-align: right; background-color: #EDF1F5'}"/>
                </kendo-grid>
            </template>
            <LoadingMe
                :isLoading="showLoading"
                :fullPage="false"
                :myLoading="true"
                type="loading"
            />
        </v-col>
    </v-row>
</template>

<script>
    import Department from '@/scripts/model/Department'
    const departmentModel = new Department({})
    const payrollHandler = require("@/scripts/payrollHandler")
    const locationHandler = require("@/scripts/locationHandler")
    const settingsHandler = require("@/scripts/settingsHandler")
    import kendo from "@progress/kendo-ui";
    const $ = kendo.jQuery;
    export default {
        components: {
            LoadingMe: () => import("@/components/Loading"),
        },
        data: () => ({
            dialogm1: '',
            valid: true,
            dialogm2: false,
            compeletLoading: true,
            dapartment: departmentModel,
            locationList: [],
            departmentList: [],
            segmentList: [],
            locationSelected: '',
            segmentSelected: '',
            option: 1,
            showLoading: true,
        }),
        props: {},
        computed: {},
        watch: {
            dialogm2(val) {
                val || this.close()
            },
        },
        created() {
        },
        methods: {
            goEdit(e){
                new Promise(resolve => {
                    setTimeout(() => {
                    resolve('resolved');
                    e.preventDefault();
                    let grid = kendo.jQuery("#gridDepartment").data("kendoGrid");
                    let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
                    window.console.log(dataItem)
                    this.dapartment = dataItem
                    this.locationSelected ={
                        address:    dataItem.location.address || '',
                        code:       dataItem.location.code || '',
                        createdAt:  dataItem.location.createdAt || '',
                        name:       dataItem.location.name || '',
                        id:         dataItem.location.id || '',
                    }
                    this.segmentSelected ={
                        code:       dataItem.segment.code,
                        createdAt:  dataItem.segment.createdAt,
                        id:         dataItem.segment.id,
                        isSystem:   dataItem.segment.isSystem,
                        name:       dataItem.segment.name,
                        subOf:      dataItem.segment.subOf
                    }
                    this.dialogm2 = true
                    }, 300);
                })
            },
            onNewClick() {
                this.option = 1
                this.clear()
            },
            async onSaveClose() {
                if (!this.$refs.form.validate()) {
                    this.$refs.form.validate()
                    return
                }
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        let data = {
                            "id": this.dapartment.id ? this.dapartment.id : '',
                            "name": this.dapartment.name,
                            "location": this.locationSelected,
                            "segment": this.segmentSelected,
                        }
                        payrollHandler.createDepartment(data).then(response => {
                            if (response.data.statusCode === 201) {
                                const res = response.data
                                const index = this.departmentList.findIndex(item => {
                                    return (res.data.id === item.id)
                                })
                                if (this.departmentList.length === 0) {
                                    this.loadDepartment()
                                } else {
                                    if (index < 0) {
                                        this.departmentList.push(res.data)
                                    } else {
                                         this.departmentList.splice(index, 1, res.data)
                                    }
                                }
                                this.$snotify.success('Success')
                                this.clear()
                                this.close()
                                
                            }
                        }).catch(e => {
                            this.$snotify.error('Something went wrong')
                            this.errors.push(e)
                        })
                    }, 300);
                })
            },
            async loadDepartment(){
                let param = {
                    location_id: ''
                }
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        payrollHandler.getDepartment(param).then(res => {
                            this.departmentList = res
                            this.showLoading=  false
                        })
                    }, 300);
                })
            },
            close() {
                this.dialogm2 = false
            },
            clear() {
                this.locationSelected = ''
                this.segmentSelected   = ''
                this.dapartment = {}
            },
            async loadLocation() {
                 new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        locationHandler.list().then(res => {
                            if(res.data.statusCode === 200){
                                this.locationList = res.data.data
                            }
                           
                        })
                    }, 300);
                })
            },
            async loadSegment() {
                 new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        settingsHandler.getSeg().then(res => {
                            if(res.data.statusCode === 200){
                                this.segmentList = res.data.data
                            }
                        })
                    }, 300);
                })
            },
        },
        mounted: async function () {
            this.loadDepartment()
            this.loadLocation()
            this.loadSegment()
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

    @media (max-width: 576px) {

    }
</style>