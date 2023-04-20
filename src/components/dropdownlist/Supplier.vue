<template>
	<v-autocomplete
        class="mt-1"
        :loading="loading"
        placeholder="Search Vendor"
        @change="emitSupplier(), onChanged()"
        v-model="supplier"
        :items="suppliers"
        item-text="name"
        item-value="id"
        hide-no-data
        hide-selected
        return-object
		clearable
        outlined
    ></v-autocomplete>
</template>

<script>
import { mapState } from 'vuex';
import SupplierModel from "@/scripts/model/Supplier";

export default {
	name: 'SupplierDropDownList',
	props: {
		initSupplier: {
			type: Object,
		},
	},
	data() {
		return {
			supplier: new SupplierModel(),
			loading: false
		}
	},
	methods: {
		async initialize () {
            this.loading = true;
            
            // Call List
            await this.$store.dispatch('suppliers/getList');

            this.loading = false;
        },
		initialData(){
            this.supplier = this.initSupplier;
        },
		emitSupplier() {
			this.$emit('emitSupplier', this.supplier);
		},
		onChanged() {
			this.$emit('onChanged')
		},
	},
	watch: {
		initSupplier: "initialData"
	},
	computed: mapState({
        suppliers: state => state.suppliers.list
    }),
	created() {
        this.initialize();
    },
	mounted() {
		/* Initial Supplier Id */
		this.initialData();
	}
}
</script>