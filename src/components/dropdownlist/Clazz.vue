<template>
	<div class="kendo_dropdown_custom">
        <hierarchicaldatasource ref="remoteDataSource"
            :transport-read-url="urlPath"
            transport-read-data-type="json"
            schema-model-id="id"
            schema-model-children="items"
            schema-model-has-children="hasChildren"
            :schema-parse="parseResponse"
            :sort="sort">
        </hierarchicaldatasource>

		<dropdowntree ref="classDDT"
            data-source-ref="remoteDataSource"
            v-model="selectedItem"
            data-text-field="name"
            data-value-field="id"
            :change="onDropdownTreeChanges"
            tagMode="single"
            template="#= item.code # - #= item.name #"
            :placeholder="'filter Class'"
            :enable="enable"
            style="width: 100%;">
		</dropdowntree>
	</div>
</template>

<script>
// import kendo from "@progress/kendo-ui";
import Helper from "@/helper.js";
import { DropDownTree } from '@progress/kendo-dropdowntree-vue-wrapper';
import { HierarchicalDataSource } from '@progress/kendo-datasource-vue-wrapper';
import store from '@/store';

const apiUrl = require('@/apiUrl.js');

export default {
    name: 'ClassDropDownTree',
    components: {
      'dropdowntree': DropDownTree,
      'hierarchicaldatasource': HierarchicalDataSource,
    },
    props: {
        initSelectedItem: { type: String },
        initEnable: { type: Boolean },
    },
    data: () => {
        return {
            selectedItem: "",
            enable: true,
            sort: { field: "code", dir: "asc" },
            urlPath : apiUrl.setting.class_get + "?type=class_item&clazzId=&classTypeId=&classGroupId=",
        }
    },
    methods: {
        initialData(){
            this.selectedItem = this.initSelectedItem;
        },
        initialEnable () {
            this.enable = this.initEnable;
        },
        onChanged() {
            this.$emit('onChanged');
        },
        onDropdownTreeChanges() {
            let ddt = this.$refs.classDDT.kendoWidget();
            
            this.$emit('emitSelectedItems', ddt.value());
            this.onChanged();
        },
        /* Parse Response */
        parseResponse(response){
            if(response){
                /* Add to store */
                store.dispatch('classes/addList', response.data);

                return Helper.reformDataToHierarchicalDataSource(response.data);
            }
        },
    },
    watch: {
        initSelectedItem: "initialData",
        initEnable : "initialEnable",
    },
    mounted() {
        /* Initial Data */
        this.initialData();
        this.initialEnable();
    }
}
</script>