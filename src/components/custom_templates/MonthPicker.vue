
<template>
    <v-menu
        v-model="menu"
        :close-on-content-click="false"
        max-width="290">

        <template v-slot:activator="{ on, attrs }">
            <v-text-field
                :class="top ? top: 'mt-1'"
                :value="monthOf"
                readonly
                outlined
                append-icon="event"
                v-on="on"
                v-bind="attrs"
                :rules="[v => !!v || $t('field_is_required')]"
                @click:append="menu = true"/>
        </template>

        <v-date-picker
            v-model="monthOf"
            type="month"
            :min="min"
            :locale="monthLocale"
            @change="emitMonth(),onChanged()"
            no-title
        />
    </v-menu>
</template>

<script>

export default {
    name: 'MonthPicker',
    props: ['initialMonth','min','top'],
    data() {
        return {
            menu: false,
            monthOf: '',
            monthLocale: ''
        }
    },
    methods: {
        emitMonth() {
            this.menu = false;
            this.$emit('emitMonth', this.monthOf);
        },
        onChanged() {
            this.$emit('onChanged')
        },
    },
    watch: {
        initialMonth() {
            this.monthOf = this.initialMonth;

        },
        locale(){
            if(this.locale == 'kh'){
                this.monthLocale = 'km-kh'
            }else{
                this.monthLocale = 'en-us'   
            }
        }
    },
    mounted(){
        this.monthOf = this.initialMonth;
    },
    computed:{
        locale(){
            return this.$route.params.locale 
        }
    }
   
}
</script>