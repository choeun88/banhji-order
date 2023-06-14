<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <div style="background-color: #fff; padding: 0 0 5px;">
                <v-tabs class="tabs_2">
                    <v-tab>
                        <span class="hidden-sm-and-up">
                            <v-icon left>mdi-pen</v-icon>
                        </span>
                        <span class="hidden-sm-and-down text-uppercase text-left">
                            {{ $t('department') }}
                        </span>
                    </v-tab>
                    <v-tab>
                        <span class="hidden-sm-and-up">
                            <v-icon left>mdi-pen</v-icon>
                        </span>
                        <span class="hidden-sm-and-down text-uppercase text-left">
                            {{ $t('position') }}
                        </span>
                    </v-tab>
                    <v-tab-item >
                        <v-row>
                            <v-col style="background: #fff" sm="12" cols="12" class="py-0">
                               <Department/>
                            </v-col>
                        </v-row>
                    </v-tab-item>
                    <v-tab-item >
                        <v-row>
                            <v-col style="background: #fff" sm="12" cols="12" class="py-0">
                               <Position/>
                            </v-col>
                        </v-row>
                    </v-tab-item>
                </v-tabs>
            </div>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: '',
        data: () => ({
            isHide: false
        }),
        props: {},
        methods: {
            clickMe(data) {
                this.$router.push(`${data.link}`);
            }, 
            hideTabs(){
				this.isHide = !this.isHide;
			},
        },
        components: {
            Department:           () => import('./Department'),
            Position:            () => import('./Position')
        },
    };
</script>
<style scoped>
    .arr_icon {
        color: #2CA01C;
    }
    .arr_icon1 {
        color: #4c9aff;
        color: #2CA01C;
    }
    .v-tab {
        min-width: 30px;
        font-size: 16px;
        text-transform: capitalize;
    }

    .v-tab--active {
        background-color: rgb(255, 255, 255);
    }

    .tab_setting .v-tab--active {
        font-weight: 700;
        color: #000;
        background-color: #ffffff !important;
        border-bottom: 4px solid #92d050;
        border-left: none;

    }
    .tabs_2 .v-tab--active{
        background-color: #F8F8F9 !important;
        border-bottom: 4px solid #92d050;
        border-left: none;

    }

    /* .v-tab--active {
    } */

    p {
        color: rgba(0, 0, 0, 0.87);
    }

</style>