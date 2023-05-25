<template>
    <v-row class="">
        <v-col sm="10" cols="12" class="pt-0">
            <h2 class="mb-0 font_20">{{ $t("customer_group") }}</h2>
            <p class="mb-0">{{ $t("customer_group_desc") }}</p>
        </v-col>
        <v-col sm="2" cols="12" class="pt-0">
            <v-dialog v-model="dialogM2" max-width="700px">
                <template v-slot:activator="{ on }">
                    <v-btn
                        class="white--text float-right text-capitalize"
                        color="primary"
                        v-on="on"
                        @click="onNewClick"
                    >
                        {{ $t("create_new") }}
                    </v-btn>
                </template>
                <v-card>
                    <div class="modal_header">
                        <v-card-title>{{ $t("customer_group") }}</v-card-title>
                        <v-icon @click="dialogM2 = false">close</v-icon>
                    </div>
                    <v-card-text class="modal_text_content">
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-row>
                                <v-col sm="6" cols="12" class="">
                                    <label class="label">{{ $t("group_name") }}</label>
                                    <v-text-field
                                        class="mt-1"
                                        outlined
                                        placeholder=""
                                        :rules="[(v) => !!v || $t('name_is_required')]"
                                        tage="GroupName"
                                        v-model="customerGroup.name"
                                    />

                                </v-col>
                                <v-col sm="6" cols="12" class="pb-0">
                                    <v-row>
                                        <v-col sm="11" cols="11" class="py-0">
                                            <label class="label">{{
                                                    $t("default_discount_rate")
                                                }}</label>
                                            <v-select
                                                class="mt-1"
                                                id="default_price_level"
                                                :items="discountItems"
                                                item-text="name"
                                                tage="DefaultPriceLevel"
                                                item-value="id"
                                                v-model="mDiscountItem"
                                                :rules="[(v) => !!v['id'] || $t('is_required')]"
                                                outlined
                                                return-object
                                            />
                                        </v-col>
                                        <v-col sm="1" cols="1" class="pl-0 py-0">
                                            <v-icon class="float-left mt-9" size="15">
                                                mdi-percent
                                            </v-icon>
                                        </v-col>
                                    </v-row>
                                    <!-- <label class="label">{{ $t("default_price_level") }}</label>
                                    <v-select
                                      class="mt-1"
                                      id="default_price_level"
                                      :items="priceLevel"
                                      item-text="name"
                                      tage="DefaultPriceLevel"
                                      item-value="id"
                                      :rules="[(v) => !!v['id'] || $t('is_required')]"
                                      v-model="mPriceLevel"
                                      outlined
                                      return-object
                                    /> -->
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                    <v-card-actions class="modal_footer">
                        <v-row>
                            <v-col sm="6" cols="6" class="py-0">
                                <v-btn
                                    color="black"
                                    outlined
                                    class=" text-capitalize black--text float-left"
                                    @click="dialogM2 = false"
                                >{{ $t("cancel") }}
                                </v-btn>
                            </v-col>
                            <v-col sm="6" cols="6" class="py-0">
                                <v-btn
                                    color="primary"
                                    class="px-3  white--text text-capitalize float-right"
                                    @click.native="onSaveClose"
                                >
                                    {{ $t("save_close") }}
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-col>
        <v-col sm="12" cols="12">
            <template>
                <LoadingMe
                    :isLoading="showLoading"
                    :fullPage="false"
                    :myLoading="true"
                    type="loading"
                />
                <kendo-datasource ref="gridCustomerGroupDS" :data="customerGroupList"/>
                <kendo-grid
                    id="gridCustomerGroup"
                    class="grid-function"
                    :data-source-ref="'gridCustomerGroupDS'"
                    :editable="false"
                    :scrollable-virtual="true"
                >
                    <kendo-grid-column
                        :field="'no'"
                        :title="$t('no')"
                        :template="rowNumberTmpl"
                        :width="40"
                        :column-menu="false"
                        :headerAttributes="{
              style: 'background-color: #EDF1F5;',
              class: 'text-center',
            }"
                        :attributes="{ style: 'text-align: center' }"
                    />
                    <kendo-grid-column
                        :field="'name'"
                        :title="$t('name')"
                        :width="50"
                        :attributes="{ class: 'tb_name_td' }"
                        :template="'<span>#=name#</span>'"
                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                    />
                    <kendo-grid-column
                        :field="'discountItem'"
                        :title="$t('discount')"
                        :width="90"
                        :template="'<span>#=discountItem.name#</span>'"
                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                    />
                    <kendo-grid-column
                        :field="''"
                        :title="$t('action')"
                        :width="70"
                        :command="[
              { iconClass: 'k-icon k-i-edit', text: 'Edit', click: goEdit },
            ]"
                        :headerAttributes="{
              style: 'text-align: left; background-color: #EDF1F5',
            }"
                    />
                </kendo-grid>
            </template>
        </v-col>
    </v-row>
</template>

<script>
import CustomerGroupModel from "@/scripts/model/CustomerGroup";
import kendo from "@progress/kendo-ui";

const $ = kendo.jQuery
const customerGroupHandler = require("@/scripts/customerGroupHandler");
const customerGroupModel = new CustomerGroupModel({});
const discountItemHandler = require("@/scripts/discountItemHandler");
const OPTION_TYPE = "?type=Sale";
export default {
    components: {LoadingMe: () => import(`@/components/Loading`)},
    data: () => ({
        dialogM2: false,
        showLoading: true,
        valid: true,
        // priceLevel: [],
        // mPriceLevel: {},
        mDiscountItem: {},
        customerGroupList: [],
        discountItems: [],
        customerGroup: customerGroupModel,
    }),
    props: {},
    computed: {},
    watch: {
        dialogm2(val) {
            val || this.close();
        },
    },
    created() {
    },
    methods: {
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.gridCustomerGroupDS.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        goEdit(e) {
            e.preventDefault();
            let grid = kendo.jQuery("#gridCustomerGroup").data("kendoGrid");
            let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
            this.customerGroup = dataItem;
            // this.mPriceLevel = dataItem.priceLevel;
            this.mDiscountItem = dataItem.discountItem;
            this.dialogM2 = true;
        },
        close() {
            this.dialogM2 = false;
        },
        onNewClick() {
            this.clear();
            this.customerGroup.id = undefined;
            this.customerGroup.discountItem = 0;
        },
        clear() {
            this.customerGroup = {};
        },
        async onSaveClose() {
            if (!this.$refs.form.validate()) {
                this.$refs.form.validate();
                return;
            }
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    let data = {
                        id: this.customerGroup.id ? this.customerGroup.id : "",
                        name: this.customerGroup.name,
                        // priceLevel: this.mPriceLevel,
                        discountItem: this.mDiscountItem,
                    };
                    customerGroupHandler
                        .create(data)
                        .then((response) => {
                            if (response.data.statusCode === 201) {
                                const res = response.data.data;
                                const index = this.customerGroupList.findIndex((item) => {
                                    return res.id === item.id;
                                });
                                if (this.customerGroupList.length === 0) {
                                    this.loadCustomerGroup();
                                }
                                if (index < 0) {
                                    this.customerGroupList.push(res);
                                } else {
                                    this.customerGroupList.splice(index, 1, res);
                                }
                                this.$refs.form.reset();
                                this.$snotify.success("Success");
                                this.close();
                            }
                        })
                        .catch((e) => {
                            this.$snotify.error("Something went wrong");
                            this.errors.push(e);
                        });
                }, 10);
            });
        },
        async loadCustomerGroup() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.showLoading = true;
                    customerGroupHandler.get().then((res) => {
                        this.showLoading = false;
                        this.customerGroupList = res;
                    });
                }, 10);
            });
        },
        async loadDiscountItems() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.showLoading = true;
                    discountItemHandler.list(OPTION_TYPE).then((res) => {
                        if (res.data.statusCode === 200) this.showLoading = false;
                        this.discountItems = res.data.data;
                    });
                }, 10);
            });
        },
    },
    mounted: async function () {
        await this.loadCustomerGroup();
        await this.loadDiscountItems();
    },
};
</script>
<style scoped>
.attachment_table table tr th {
    height: 55px !important;
}

@media (max-width: 576px) {
}
</style>
