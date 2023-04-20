<template>
    <v-row class="px-1">
        <v-col sm="6" offset-sm="3" cols="12">
            <v-row>
                <v-col sm="12" cols="12" class="pb-0">
                    <v-img class="" width="60%" :src="`${info.image}`"/>
                </v-col>
                <v-col sm="12" cols="12" class="pt-5 pb-0">
                    <p class="mb-2">{{ $t('please_select_the_account') }}</p>
                    <slot name="account"/>
                    <p class="mb-0 mt-3">{{ $t('if_you_need_support') }}
                        <router-link to="`${info.image}`">{{ info.email }}</router-link>
                        {{ info.phone }}
                    </p>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
<script>
export default {
    name: "BankConnection",
    props: {
        info: {
            image: String,
            email: String,
            phone: String,
            address: String
        },

    },
    data() {
        return {
            pic: "amret.png"
        }
    },

    methods: {}
}
</script>