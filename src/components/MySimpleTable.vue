<template>
    <v-row class="px-1">
        <v-simple-table class="attachment_table" style="width:100% !important;">
            <template v-slot:default>
                <thead>
                    <tr>
                        <th  v-for="item in myTableData.header" :key="item">{{$t(item)}} </th>
                    </tr>
                </thead>
                <tbody>
                <tr  v-for="(item, index) in myTableData.data" :key="index">
                    <td v-for="(sub_item, index) in item" :key="index">{{sub_item}}</td>
                    <td>
                        <slot name="action"></slot>
                    </td>
                </tr>
                </tbody>
            </template>
        </v-simple-table>
    </v-row>    
</template>
<script>
export default {
    name: "BankConnection",
    props:{
        myHeader:Array,
        myValue: Object,
        myTableData:Object,
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