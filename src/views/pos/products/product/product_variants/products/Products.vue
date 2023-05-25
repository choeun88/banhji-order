<template>
    <v-row>
        <v-col sm="12" cols="12" class="">
            <v-card outlined dense class="no_border">
                <v-row class="mt-0  ml-2">
                    <v-col sm="3" class="pt-0 d-flex">
                        <i style="font-size:80px" class="b-product" />
                        <div class="ml-2">
                            <h2 class="font_60 line_46">20</h2>
                            <h3>{{$t('low_stock')}}</h3>
                        </div>
                    </v-col>
                    <v-col sm="3" class="pt-0 d-flex" >
                        <i style="font-size:80px" class="b-product red_icon" />
                        <div class="ml-2">
                            <h2 class="font_60 line_46">20</h2>
                            <h3>{{$t('out_of_stock')}}</h3>
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col sm="4" cols="12" class="py-0">
                        <v-text-field outlined
                                      :placeholder="$t('name')"
                                      append-icon="search"
                                      v-model="search"
                                      @change="onCategoryChanged"
                                      clearable/>
                    </v-col>

                    <v-col sm="4" cols="12" class="py-0">
                        <v-select class=""
                                  tage="Product Category"
                                  v-model="mCategory"
                                  :items="categories"
                                  item-value="id"
                                  :item-text="item =>`${item.abbr} - ${item.name}`"
                                  @change="onCategoryChanged"
                                  return-object
                                  :placeholder="$t('category')"
                                  clearable
                                  outlined/>
                    </v-col>
                    <v-col sm="4"  cols="12" class="py-0">
                        <v-btn
                            color="primary"
                            class=" white--text float-right"
                            to="product"
                        >
                            {{ $t("new_product") }}
                        </v-btn>
                    </v-col>
                </v-row>
                <!-- loading -->
                <div v-if="isLoaded">
                    <LoadingMe
                        :isLoading="showLoading"
                        type="loading"
                        :fullPage="false"
                        :myLoading="true"/>
                </div>
                <v-card outlined dense class="no_border">
                    <!-- loading -->
                    <div v-if="!isLoaded">
                        <LoadingMe
                            :isLoading="showLoading"
                            :fullPage="false"
                            type="loading"
                            :myLoading="true"/>
                    </div>

                    <kendo-datasource ref="dataSource"
                                      :data="products"
                                      :schema="gridSchema"
                                      :group="groupDefinition"/>
                    <kendo-grid id="gridProducts"
                                class="grid-function"
                                :data-source-ref="'dataSource'"
                                :style="{width: '100%'}"
                                :noRecords="true"
                                :scrollable-virtual="true">

                        <kendo-grid-column
                            :field="'name'"
                            :attributes="{class:'tb_name_td'}"
                            :title="$t('name')"
                            :width="200"
                            :template="'<span>#=name#</span>'"
                            :groupHeaderColumnTemplate="'#=value#'"
                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                        <kendo-grid-column
                            :field="'images'"
                            :title="$t('image')"
                            :width="70"
                            :template="loadImage"
                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                        <kendo-grid-column
                            :field="'product'"
                            :title="$t('category')"
                            :template="category"
                            :width="100"
                            :headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"/>
                        <kendo-grid-column
                            :field="'sku'"
                            :title="$t('sku')"
                            :width="100"
                            :headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"/>
                        <kendo-grid-column
                            :field="'uom'"
                            :title="$t('uom')"
                            :width="100"
                            :template="uomTmp"
                            :headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"/>
                        <kendo-grid-column
                            :field="'reOrderQty'"
                            :title="$t('recorder')"
                            :width="100"
                            :template="'<span>#=reOrderQty#</span>'"
                            :attributes="{ style: 'text-align: right'}"
                            :headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"/>
                        <kendo-grid-column
                            :field="''"
                            :title="$t('action')"
                            :width="100"
                            :command="[{ text: $t('edit_product'), click: goEditProduct }, { text: $t('new_variant'), click: goNewVariant }]"
                            :headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"/>
                    </kendo-grid>
                </v-card>
            </v-card>
        </v-col>


    </v-row>
</template>
<script>
const $ = require("jquery")
const productHandler = require("@/scripts/productHandler")
const categoryHandler = require("@/scripts/categoryHandler")
import kendo from '@progress/kendo-ui'

export default {
    name: "ProductList",
    inheritAttrs: false,
    components: {
        LoadingMe: () => import(`@/components/Loading`)
    },
    props: {
        productId: {}
    },
    data() {
        return {
            pic: "amret.png",
            search: '',
            value: 'input me',
            list_product: {
                header: [
                    'product_name', 'name', 'sku', 'stock', 'commited_stock', 'incoming_stock'
                ],
                data: [
                    {
                        "date": "My Oum",
                        "type": "89%",
                        "num": "USA",
                        "qty": "89%",
                        "amount": "USA"
                    },
                    {
                        "date": "My Oum",
                        "type": "89%",
                        "num": "USA",
                        "qty": "89%",
                        "amount": "USA"
                    }
                ]
            },
            items: ['Edit Product', 'New Variant'],
            gridSchema: {
                model: {
                    id: "id"
                }
            },
            isLoaded: true,
            showLoading: false,
            products: [],
            categories: [],
            mCategory: {},
            groupDefinition: {
                field: "product.name",
            },
            imgURL: 'https://s3-ap-southeast-1.amazonaws.com/images.banhji/'
        }
    },
    methods: {
        loadImage(dataItem) {
            if (dataItem.hasOwnProperty('images')) {
                if (dataItem.images.hasOwnProperty('default')) {
                    if (dataItem.images.default.hasOwnProperty('thumb')) {
                        const url = this.imgURL + dataItem.images.default.thumb
                        return "<img width='50' height='50' style= 'margin: auto;display: block;' src='" + url + "' />"
                    }
                }
            } else {
                return '<i style="font-size:50px" class="b-product" />';
            }
            return '<i style="font-size:50px" class="b-product" />';
        },
        category(dataItem) {
            if (dataItem.hasOwnProperty('product')) {
                if (dataItem.product.hasOwnProperty('category')) {
                    if (dataItem.product.category.hasOwnProperty('id')) {
                        return dataItem.product.category.name
                    }
                }
            } else {
                return ''
            }
        },
        uomTmp(dataItem) {
            if (dataItem.hasOwnProperty('uom')) {
                if (dataItem.uom.hasOwnProperty('id')) {
                    if (dataItem.uom.hasOwnProperty('toUOM')) {
                        return dataItem.uom.toUOM.name || ''
                    } else {
                        return dataItem.uom.name || ''
                    }
                }
            } else {
                return ''
            }
        },

        callback_() {
            try {
                if (this.$route.params !== null && this.$route.params.hasOwnProperty('data')) {
                    // window.console.log('Products watch')
                    const product = this.$route.params.data
                    this.products.forEach(function (part, index, item) {
                        if ((item[index].productId === product.productId)) {
                            item[index].product = product.product
                        }
                    });
                    let dataSource = new kendo.data.DataSource({
                        data: this.products, group: {field: "product.name"}
                    });
                    let grid = $('#gridProducts').data("kendoGrid");
                    dataSource.read();
                    grid.setDataSource(dataSource);

                }
            } catch (e) {
                window.console.log(e)
            }

        },
        goEditProduct(e) {
            e.preventDefault();
            let grid = kendo.jQuery("#gridProducts").data("kendoGrid");
            let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
            this.$router.push({
                path: 'product' + `/${dataItem.productId}`,
                params: {id: dataItem.productId},
                query: {type: 'edit'}
            })
            // window.console.log(dataItem)
        },
        goNewVariant(e) {
            e.preventDefault();
            let grid = kendo.jQuery("#gridProducts").data("kendoGrid");
            let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
            this.$router.push({
                path: 'product_variant' + `/${dataItem.id}`,
                query: {p: `${dataItem.productId}`, type: 'new'}
            })
            // window.console.log(dataItem)
        },
        /*showDetails: function (e) {
            e.preventDefault();

            let grid = kendo.jQuery("#gridProduct").data("kendoGrid");
            let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));

            alert('"' + dataItem.name + '" details are about to be logged on the console.');
            window.console.log(dataItem);
        },*/
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.dataSource.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        async onCategoryChanged() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    if (this.mCategory) {
                        this.isLoaded = true
                        this.showLoading = true
                        productHandler.filter(this.mCategory.id, this.search).then(res => {
                            this.showLoading = false
                            this.products = res
                        })
                    }
                }, 10);
            })
        },
        async loadCategory() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    categoryHandler.get().then(res => {
                        this.showLoading = false
                        this.categories = res
                        this.categories = this.categories.filter(m => m.type.name === 'Product')
                        if (this.categories.length > 0) {
                            this.mCategory = this.categories[0]
                            this.onCategoryChanged()
                        }
                    })
                }, 10);
            })
        }
    },
    mounted: async function () {
        await this.loadCategory()
    },
    watch: {
        '$route': 'callback_'
    },
    computed: {}
}
</script>
<style scoped>
.attachment_table.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
    border-right: none !important;
}
</style>
