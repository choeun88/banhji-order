<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pt-0">
            <h2 class="mb-0">{{ $t('customer_project') }}</h2>
            <v-btn to="project" class="white--text float-right text-capitalize" color="primary">
                {{ $t('new_project') }}
            </v-btn>
            <p class="mb-0">{{ $t('sale_channel_desc') }} </p>
        </v-col>

        <v-col sm="12" cols="12">
            <template>
                <LoadingMe :isLoading="showLoading" :fullPage="true" :myLoading="true"/>
                <kendo-datasource ref="gridProjectDS"
                                  :data="projectList"/>
                <kendo-grid id="gridProject" class="grid-function"
                            :data-source-ref="'gridProjectDS'"
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
                        :field="'code'"
                        :title="$t('code')"
                        :width="50"
                        :template="'<span>#=code#</span>'"
                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                    <kendo-grid-column
                        :field="'name'"
                        :title="$t('name')"
                        :attributes="{class:'tb_name_td'}"
                        :width="90"
                        :template="'<span>#=name#</span>'"
                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                    <kendo-grid-column
                        :field="'description'"
                        :title="$t('description')"
                        :width="90"
                        :template="'<span>#=description#</span>'"
                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                    <kendo-grid-column
                        :field="'noOfCustomer'"
                        :title="$t('customers')"
                        :width="90"
                        :template="'<span>#=noOfCustomer#</span>'"
                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                    <kendo-grid-column
                        :field="'noOfSupplier'"
                        :title="$t('suppliers')"
                        :width="90"
                        :template="'<span>#=noOfSupplier#</span>'"
                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                    <kendo-grid-column
                        :field="''"
                        :title="$t('action')"
                        :width="70"
                        :command="[{iconClass: 'k-icon k-i-edit', text: 'Edit', click: goEdit }]"
                        :headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"/>
                </kendo-grid>
            </template>
        </v-col>
    </v-row>
</template>

<script>
import ProjectModel from "@/scripts/model/Project";
import kendo from "@progress/kendo-ui";

const projectModel = new ProjectModel({})
const $ = require("jquery")
const projectHandler = require("@/scripts/projectHandler")

export default {
    components: {
        LoadingMe: () => import(`@/components/Loading`),
    },
    data: () => ({
        dialogM2: '',
        showLoading: true,
        mCustomer: '',
        customerList: [],
        project: projectModel,
        projectList: [],
        entries: [],
        isLoading: false,
    }),
    props: {},
    computed: {},
    watch: {
        '$route': 'callback'
    },
    created() {
    },
    methods: {
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.gridProjectDS.kendoWidget(),
                index = ds.indexOf(dataItem)
            return index + 1
        },
        goEdit(e) {
            e.preventDefault();
            let grid = kendo.jQuery("#gridProject").data("kendoGrid");
            let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
            this.$router.push({
                path: 'project' + `/${dataItem.id}`,
                params: {id: dataItem.id},
                query: {type: 'edit'}
            })
        },
        close() {
            this.dialogM2 = false;
        },
        async loadProjects() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.showLoading = true
                    projectHandler.list().then(res => {
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            this.projectList = res.data.data
                        }
                    })
                }, 300)
            })
        },
        callback() {
            if (this.$route.params !== null && this.$route.params.hasOwnProperty('data')) {
                const project = this.$route.params.data
                let flag = false
                this.projectList.forEach(function (part, index, item) {
                    if ((item[index].id === project.id)) {
                        item[index] = project
                        flag = true
                    }
                    item[index]['no'] = index++
                })
                window.console.log(this.projectList)
                if (flag === false) {
                    this.projectList.push(project)
                }
                let dataSource = new kendo.data.DataSource({
                    data: this.projectList
                });
                let grid = $('#gridProject').data("kendoGrid");
                dataSource.read();
                grid.setDataSource(dataSource)

            }
        },
    },
    mounted: async function () {
        await this.loadProjects()
    }
};
</script>
<style scoped>
.k-animation-container {
    z-index: 10003
}

.k-dropdown {
    width: 100%;
    margin-top: 12px;
}
</style>