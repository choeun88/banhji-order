<template>
    <v-app class="zoom-in">
        <v-container>
            <v-row>
                <v-col sm="12" cols="12" class="pb-0">
                    <v-card color="white" class="pa-4 no_border" elevation="0">
                        <v-row>
                            <v-col sm="12" cols="12" class="tab_wrapper py-0">
                                <v-tabs v-model="active_in_tabs">
                                    <v-row>
                                        <v-col sm="10" cols="10" class="py-0 pr-0" style="display: inherit;">
                                      
                                            <v-tab>
                                                <span>
                                                    {{ $t('products') }}
                                                </span>
                                            </v-tab>
                                            <!-- <v-tab>
                                                <span>
                                                    {{ $t('price') }}
                                                </span>
                                            </v-tab>
                                            <v-tab>
                                                <span>
                                                    {{ $t('sale_unit') }}
                                                </span>
                                            </v-tab>
                                            <v-tab>
                                                <span>
                                                    {{ $t('count_adjustment') }}
                                                </span>
                                            </v-tab>
                                            <v-tab>
                                                <span>
                                                    {{ $t('barcode_print') }}
                                                </span>
                                            </v-tab>
                                            <v-tab>
                                                <span>
                                                    {{ $t('transfer') }}
                                                </span>
                                            </v-tab> -->
                                      
                                        </v-col>
                                        <!-- <v-col sm="2" cols="2" class="px-0">
                                            Dropdown New
                                            <v-menu
                                                nudge-bottom="4"
                                                bottom
                                                offset-y
                                                origin="bottom top"
                                                transition="scroll-y-reverse-transition"
                                            >
                                                <template v-slot:activator="{ on }">
                                                    <span class="hidden-sm-and-up">
                                                        <div class="dropdown_transactions ml-6">
                                                            <v-icon v-on="on" left>mdi-plus</v-icon>
                                                        </div>
                                                    </span>
                                                    <span class="hidden-sm-and-down">
                                                        <v-btn icon v-on="on" class="dropdown_transactions" style="right: 0;">
                                                            <v-icon size="17" class="ma-1">mdi-plus</v-icon>
                                                                {{ $t('new') }}
                                                            <v-icon size="" class="ma-1">expand_more</v-icon>
                                                        </v-btn>
                                                    </span>
                                                </template>
        
                                                <v-list>
                                                    <v-list-item link route to="inventory_adjustment">
                                                        <v-list-item-title>{{ $t('inventory_adjustment') }}</v-list-item-title>
                                                    </v-list-item>
                                                    <v-list-item link route to="product">
                                                        <v-list-item-title>{{ $t('add_product') }}</v-list-item-title>
                                                    </v-list-item>
                                                    <v-list-item link route to="product_import">
                                                        <v-list-item-title>{{ $t('import_product') }}</v-list-item-title>
                                                    </v-list-item>
                                                    <v-list-item link route to="catalog">
                                                        <v-list-item-title>{{ $t('add_catalog') }}</v-list-item-title>
                                                    </v-list-item>
                                                </v-list>
                                            </v-menu>
                                        </v-col> -->
                                    </v-row>
                                    <v-tab-item>
                                        <v-card flat>
                                            <v-card-text class="">
                                                <Product/>
                                            </v-card-text>
                                        </v-card>
                                    </v-tab-item>
                                    <!-- <v-tab-item>
                                        <v-card flat>
                                            <v-card-text class="">
                                                <PriceTab/>
                                            </v-card-text>
                                        </v-card>
                                    </v-tab-item>
                                    <v-tab-item>
                                        <v-card flat>
                                            <v-card-text class="">
                                                <SaleUnitTab/>
                                            </v-card-text>
                                        </v-card>
                                    </v-tab-item>
                                    <v-tab-item>
                                        <v-card flat>
                                            <v-card-text class="">
                                                <CountAdjustment/>
                                            </v-card-text>
                                        </v-card>
                                    </v-tab-item>
                                    <v-tab-item>
                                        <v-card flat>
                                            <v-card-text class="">
                                                <BarcodePrint/>
                                            </v-card-text>
                                        </v-card>
                                    </v-tab-item>
                                    <v-tab-item>
                                        <v-card flat>
                                            <v-card-text class="">
                                                <BarcodePrint/>
                                            </v-card-text>
                                        </v-card>
                                    </v-tab-item> -->


                        
                                </v-tabs>
                                
                            </v-col>

                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
/* Cookie */
const cookieJS = require("@/cookie.js");
const cookie = cookieJS.getCookie();

import {dataStore, data} from '@/observable/store'
export default {
    name: "",
    components: {
        // Product: () => import('./product/Products.vue'),
        // SaleUnitTab: () => import('./SaleUnitTab.vue'),
        // PriceTab: () => import('../commerce/PriceTab.vue'),
        // CountAdjustment: () => import("../products/count_adjustment/CountAdjustment"),
        // BarcodePrint: () => import("./BarcodePrint.vue")
    },
    computed: {
        user() {
            return cookie.user
        },
        productType(){
            return dataStore.productType
        }
    },
    data: () => ({
        active_in_tabs: data.product_tab_main,
    }),
    watch: {},
    methods: {
        clickMe(data) {
            this.$route.push(data.link);
        }
    }
};
</script>
<style scoped>
/* .v-menu__content{
  top: 141px !important;
  left: 1098px !important;
} */
.v-menu__content .v-list .v-list-item {
    min-height: 35px !important;
}

.tab_wrapper {
    position: relative;
    display: inherit;
}

.v-tab {
    min-width: 30px;
    font-size: 20px;
    text-transform: capitalize;
}

.v-icon--left {
    margin-right: 0px;
}

.theme--light.v-tabs > .v-tabs-bar {
    border-bottom: 1px solid #ddd !important;
}



.v-tab--active {
    background-color: #E5EFFA;
    color: #000;
}

.theme--light.v-tabs >>> .v-tabs-bar {
    border-bottom: 1px solid #ddd !important;
}

.v-card__text {
    padding: 0 !important;
}
</style>