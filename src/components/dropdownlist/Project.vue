<template>
    <v-select
        class="mt-1"
        :loading="loading"
        placeholder="Select Project"
        v-model="project"
        :items="projects"
        item-text="name"
        item-value="id"
        @change="emitProject();onChanged();"
        :disabled="disabled"
        return-object
        clearable
        outlined />
</template>

<script>
import { mapState } from 'vuex';
import ProjectModel from "@/scripts/model/Project";

export default {
    name: 'ProjectDropDownList',
    props: {
        initProject: {
            type: Object,
        },
        initDisabled: {
            type: Boolean,
        },
    },
    data() {
        return {
            project : new ProjectModel(),
            loading : false,
            disabled : false,
        }
    },
    methods: {
        async initialize () {
            this.loading = true;
            
            // Call List
            await this.$store.dispatch('projects/getList')

            this.loading = false;
        },
        initialData(){
            this.project = this.initProject;
            this.disabled = this.initDisabled;
        },
        emitProject() {
            let project = new ProjectModel();
            if(this.project){
                project = this.project;
            }
            this.$emit('emitProject', project);
        },
        onChanged() {
            this.$emit('onChanged');
        },
    },
    watch: {
        initProject: "initialData",
        initDisabled: "initialData",
    },
    computed: mapState({
        projects: state => state.projects.list
    }),
    created() {
        this.initialize();
    },
    mounted() {
        /* Initial obj */
        this.initialData();
    }
}
</script>