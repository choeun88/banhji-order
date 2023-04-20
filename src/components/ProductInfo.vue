<template>
    <v-row class="px-1">
        <v-col sm="4" cols="12" class="pb-0">
            <v-card  elevation="1">
                <v-img class="" width="100%" :src="require(`@/assets/images/${imageName}`)"/>
            </v-card>
        </v-col>
        <v-col sm="8" cols="12" class="pt-5 pb-0">
            <v-simple-table class="protduct_info">
                    <template v-slot:default>
                        <tbody>
                        <tr>
                            <td class="text-uppercase">{{$t('name')}}</td>
                            <td class="text-bold text-uppercase">{{producInfo.name}}</td>
                        </tr>
                        <tr>
                            <td class="text-uppercase">{{$t('sku')}}</td>
                            <td class="text-bold text-uppercase">{{producInfo.sku}}</td>
                        </tr>
                        <tr>
                            <td class="text-uppercase">{{$t('uom')}}</td>
                            <td class="text-bold text-uppercase">{{producInfo.uom}}</td>
                        </tr>
                        </tbody>
                    </template>
            </v-simple-table>
             <slot/>
        </v-col>
        <v-col sm="12">
            <v-simple-table class="protduct_info">
                <template v-slot:default>
                    <tbody>
                        <tr class="green">
                            <td class="text-uppercase">{{$t('weighted_average_cost')}}</td>
                            <td class="text-bold text-uppercase  text-right text">{{producInfo.avg_cost}}</td>
                        </tr>
                        <tr class="green">
                            <td class="text-uppercase">{{$t('last_purchase_cost')}}</td>
                            <td class="text-bold text-uppercase text-right white--text" >{{producInfo.last_purchase_cost}}</td>
                        </tr>
                        <tr>
                            <td class="text-uppercase"></td>
                            <td class="text-bold text-uppercase"></td>
                        </tr>
                        <tr>
                            <td class="text-uppercase text-bold" >{{$t('value')}}</td>
                            <td class="text-bold text-uppercase primary--text text-right">${{producInfo.value}}</td>
                        </tr>
                        <tr>
                            <td class="text-uppercase" >{{$t('on_hand')}}</td>
                            <td class="text-bold text-uppercase primary--text text-right">{{producInfo.on_hand}}</td>
                        </tr>
                        <tr>
                            <td class="text-uppercase">{{$t('committed_stock')}}</td>
                            <td class="text-bold text-uppercase  primary--text text-right">{{producInfo.commited_stock}}</td>
                        </tr>
                        <tr>
                            <td class="text-uppercase">{{$t('available_stock')}}</td>
                            <td class="text-bold text-uppercase  primary--text text-right">{{producInfo.available_stock}}</td>
                        </tr>
                        <tr>
                            <td class="text-uppercase">{{$t('income_stock')}}</td>
                            <td class="text-bold text-uppercase  primary--text text-right">{{producInfo.income_stock}}</td>
                        </tr>

                    </tbody>
                </template>
            </v-simple-table>
        </v-col>
    </v-row>    
</template>
<script>
export default {
    name: "ProductInfo",
    props:{
        imageName: String,
        name: String,
        sku: String,
        uom: String,
        producInfo: Object

    },
    data() {
        return {
            pic: "amret.png"
        }
    },
 
    methods:{
      
    }
}
</script>
<style scoped>
    .protduct_info tr td{
        border-bottom: thin solid rgba(0, 0, 0, 0.12);
         border-top: thin solid rgba(0, 0, 0, 0.12);
    }
    .protduct_info .green td{
        background-color: #92d050 !important;
    }
</style>