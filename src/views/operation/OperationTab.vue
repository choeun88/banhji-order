<template>
    <v-app class="zoom-in">
        <v-container>
            <v-row>
                <v-col sm="12" cols="12" class="pb-0">
                    <v-card color="white" class="pa-4 no_border" elevation="0">
                        <v-row>
                            <v-col sm="12" cols="12" class="tab_wrapper py-0">
                                <v-tabs>
                                    
                                    <v-tab>
                                        <span class="hidden-sm-and-up">
                                            <v-icon left>mdi-pen</v-icon>
                                        </span>
                                        <span class="hidden-sm-and-down text-uppercase">
                                            {{$t('staff')}}
                                        </span>
                                    </v-tab>
                                    <v-tab>
                                        <span class="hidden-sm-and-up">
                                            <v-icon left>mdi-pen</v-icon>
                                        </span>
                                        <span class="hidden-sm-and-down text-uppercase">
                                            {{$t('session')}}
                                        </span>
                                    </v-tab>
                                    
                                    <v-tab-item>
                                            <v-row>
                                                <v-col style="background: #fff" sm="12" cols="12" class="py-0">
                                                    <StaffTab/>
                                                </v-col>
                                            </v-row>
                                    </v-tab-item>
                                    <v-tab-item>
                                            <v-row>
                                                <v-col style="background: #fff" sm="12" cols="12" class="pa-0">
                                                    <Session/>
                                                </v-col>
                                            </v-row>
                                    </v-tab-item>
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
    export default {
        data: () => ({}),
        props: {},
        methods: {
            close() {
                this.$router.go(-1);
            },
        },
        mounted() {
        },
        computed: {},
        components: {
            Session:()=> import('../pos/Session'),
            StaffTab: ()=> import('./StaffTab'),
        },
    };
</script>

<style scoped>
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
