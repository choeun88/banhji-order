<template>
    <v-row class="px-1">
        <v-col sm="3" cols="12" class="pb-0">
           <h2>{{$t('categories')}}</h2>
        </v-col>
        <v-col sm="9" cols="12" class="pl-0">
            <v-row>
                <v-col sm="4" cols="12">
                    <v-img class="" width="100%" :src="require(`@/assets/images/${pic}`)"/>
                    <v-row>
                        <v-col sm="3" class="pr-1">
                            <v-img class="" width="100%" @click="ChooseImage" :src="require(`@/assets/images/${pic}`)"/> 
                        </v-col>
                        <v-col sm="3" class="pl-1">
                            <v-img class="" width="100%" @click="ChooseImage"  :src="require(`@/assets/images/${pic}`)"/> 
                        </v-col>
                         <v-col sm="3" class="pl-1">
                            <v-img class="" width="100%" @click="ChooseImage"  :src="require(`@/assets/images/${pic}`)"/> 
                        </v-col>
                        <v-col sm="3" class="pl-1">
                            <v-img class="" width="100%" @click="ChooseImage"  :src="require(`@/assets/images/${pic}`)"/> 
                        </v-col>
                    </v-row>
                    <p class="mb-0">{{desc}}</p>
                    <p style="color: #e8c7a6">{{price}}</p>
                </v-col>
                <v-col sm="4" cols="12">
                    <v-img class="" width="100%" :src="require(`@/assets/images/${pic}`)"/>
                    <v-row>
                        <v-col sm="3" class="pr-1">
                            <v-img class="" width="100%" :src="require(`@/assets/images/${pic}`)"/> 
                        </v-col>
                        <v-col sm="3" class="pl-1">
                            <v-img class="" width="100%" :src="require(`@/assets/images/${pic}`)"/> 
                        </v-col>
                         <v-col sm="3" class="pl-1">
                            <v-img class="" width="100%" :src="require(`@/assets/images/${pic}`)"/> 
                        </v-col>
                        <v-col sm="3" class="pl-1">
                            <v-img class="" width="100%" :src="require(`@/assets/images/${pic}`)"/> 
                        </v-col>
                    </v-row>
                    <p class="mb-0">{{desc}}</p>
                    <p style="color: #e8c7a6">{{price}}</p>
                </v-col>
                <v-col sm="4" cols="12">
                    <v-img class="" width="100%" :src="require(`@/assets/images/${pic}`)"/>
                    <v-row>
                        <v-col sm="3" class="pr-1">
                            <v-img class="" width="100%" :src="require(`@/assets/images/${pic}`)"/> 
                        </v-col>
                        <v-col sm="3" class="pl-1">
                            <v-img class="" width="100%" :src="require(`@/assets/images/${pic}`)"/> 
                        </v-col>
                         <v-col sm="3" class="pl-1">
                            <v-img class="" width="100%" :src="require(`@/assets/images/${pic}`)"/> 
                        </v-col>
                        <v-col sm="3" class="pl-1">
                            <v-img class="" width="100%" :src="require(`@/assets/images/${pic}`)"/> 
                        </v-col>
                    </v-row>
                    <p class="mb-0">{{desc}}</p>
                    <p style="color: #e8c7a6">{{price}}</p>
                </v-col>
                <v-col sm="4" cols="12">
                    <v-img class="" width="100%" :src="require(`@/assets/images/${pic}`)"/>
                    <v-row>
                        <v-col sm="3" class="pr-1">
                            <v-img class="" width="100%" :src="require(`@/assets/images/${pic}`)"/> 
                        </v-col>
                        <v-col sm="3" class="pl-1">
                            <v-img class="" width="100%" :src="require(`@/assets/images/${pic}`)"/> 
                        </v-col>
                         <v-col sm="3" class="pl-1">
                            <v-img class="" width="100%" :src="require(`@/assets/images/${pic}`)"/> 
                        </v-col>
                        <v-col sm="3" class="pl-1">
                            <v-img class="" width="100%" :src="require(`@/assets/images/${pic}`)"/> 
                        </v-col>
                    </v-row>
                    <p class="mb-0">{{desc}}</p>
                    <p style="color: #e8c7a6">{{price}}</p>
                </v-col>
            </v-row>
        
        </v-col>
    </v-row>    
</template>
<script>
export default {
    name: "Catalog",
    props:{
        catalogData:Object
    },
    data() {
        return {
            pic: "aba.png",
            desc: "Lorem Ipsum is simply dummy text of the printing.",
            price: "$1,232.00",
            url: ''
        }
    },
 
    methods:{
      ChooseImage(imUrl){
          this.$emit('ChooseImage');
          this.url = imUrl;
      }
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