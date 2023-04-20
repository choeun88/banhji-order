<template>
    <v-row class="px-1">
        <v-col sm="4" cols="12" class="pb-0">
            <v-card  elevation="1">
                <v-img class="" width="100%" :src="require(`@/assets/images/${imageName}`)"/>
            </v-card>
        </v-col>
        <v-col sm="6" cols="12">

        </v-col>
    </v-row>    
</template>
<script>
export default {
    name: "ProductImage",
    props:{
        imageName: String,
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