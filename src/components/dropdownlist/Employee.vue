<template>
    <v-autocomplete
        class="mt-1"
        :loading="loading"
        placeholder="Search Employee"
        @change="emitEmployee(), onChanged()"
        v-model="employee"
        :items="employees"
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
import EmployeeModel from "@/scripts/model/Employee";

export default {
    name: 'EmployeeDropDownList',
    props: {
        initEmployee: {
            type: Object,
        },
    },
    data() {
        return {
            employee: new EmployeeModel(),
            loading: false,
        }
    },
    methods: {
        initialData(){
            this.employee = this.initEmployee;
        },
        async initialize () {
            this.loading = true;
            
            // Call List
            await this.$store.dispatch('employees/getList');

            this.loading = false;
        },
        emitEmployee() {
            let employee = new EmployeeModel();
            if(this.employee){
                employee = this.employee;
            }
            this.$emit('emitEmployee', employee);
        },
        onChanged() {
            this.$emit('onChanged')
        },
    },
    watch: {
        initEmployee: "initialData"
    },
    computed: mapState({
        employees: state => state.employees.list
    }),
	created() {
        this.initialize();
    },
    mounted() {
        /* Initial Employee */
        this.initialData();
    }
}
</script>