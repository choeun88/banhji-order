<template>
    <div>
        <v-select
            :loading="loading"
            v-model="selectedProjects"
            :items="projects"
            item-text="name"
            item-value="id"
            @change="emitProject"
            placeholder="Select Projects"
            multiple
            class="mt-1"
            style="height: 50px !important;"
            outlined
        >
            <template v-slot:prepend-item>
                <v-list-item
                    ripple
                    @click="toggle"
                >
                    <v-list-item-action>
                        <v-icon :color="selectedProjects.length > 0 ? 'indigo darken-4' : ''">
                            {{ icon }}
                        </v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            Select All
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-divider class="mt-2"></v-divider>
            </template>

            <template v-slot:selection="{ item, index }">
                <v-chip v-if="index === 0">
                    <span>{{ item.name }}</span>
                </v-chip>
                <span v-if="index === 1" class="font_14">
                    (+{{ selectedProjects.length - 1 }} others)
                </span>
            </template>

        </v-select>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'ProjectListItemGroup',
    props: {
        initProject: {
            type: Array,
        },
    },
    data() {
        return {
            selectedProjects: [],
            loading: false
        }
    },
    methods: {
        async loadData () {
            this.loading = true;
            
            // Call List
            await this.$store.dispatch('projects/getList')

            this.loading = false;
        },
        emitProject() {
            this.$emit('emitProject', this.selectedProjects);
        },
        toggle() {
            this.$nextTick(() => {
                if (this.likesAllFruit) {
                    this.selectedProjects = [];
                } else {
                    let ids = [];
                    this.projects.forEach(value => {
                        ids.push(value.id);
                    });
                    this.selectedProjects = ids;
                }
                this.emitProject();
            })
        },
    },
    watch: {
        initProject() {
            this.selectedProjects = this.initProject;
        }
    },
    computed: {
        ...mapState({
            projects: state => state.projects.list
        }),
        likesAllFruit() {
            return this.selectedProjects.length === this.projects.length
        },
        likesSomeFruit() {
            return this.selectedProjects.length > 0 && !this.likesAllFruit
        },
        icon() {
            if (this.likesAllFruit) return 'mdi-close-box'
            if (this.likesSomeFruit) return 'mdi-minus-box'
            return 'mdi-checkbox-blank-outline'
        },
    },
    created() {
        this.loadData();
    },
    mounted() {
        /* Initial Segment */
        this.selectedProjects = this.initProject;
    }
}
</script>