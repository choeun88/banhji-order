<template>
    <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        offset-y
        max-width="290px"
        min-width="290px">
        <template v-slot:activator="{ on, attrs }">
            <v-text-field
                placeholder="Month Of"
                class="mt-1"
                v-model="monthOfFormatted"
                append-icon="event"
                @click:append="menu = true"
                readonly
                outlined
                v-bind="attrs"
                v-on="on"
            ></v-text-field>
        </template>
        <v-date-picker
            v-model="monthOf"
            @change="emitMonthOf(),onChanged()"
            type="month"
            :min="min"
            :max="max"
            :locale="monthLocale"
            no-title
        />
    </v-menu>
</template>

<script>
    import kendo from '@progress/kendo-ui';

    /* Store */
    import store from "@/store"
    const institute = store.state.institute.institute

    export default {
        name: 'MonthOfPicker',
        props: ['initMonthOf', 'initMin', 'initMax'],
        data () {
            return {
                menu        : false,
                monthOf     : new Date().toISOString().substr(0, 7),
                min         : institute.fiscalDate[0].first_fiscal_year,
                max         : '',
                monthLocale : 'en-us'
            }
        },
        methods: {
            initialData(){
                this.monthOf = this.initMonthOf;
            },
            initialMin(){
                this.min = this.initMin;
            },
            initialMax(){
                this.max = this.initMax;
            },
            emitMonthOf () {
                this.menu = false;
                this.$emit('emitMonthOf', this.monthOf);
            },
            onChanged() {
                this.$emit('onChanged');
            },
        },
        watch: {
            initMonthOf: "initialData",
            initMin: "initialMin",
            initMax: "initialMax",
            locale(){
                if(this.locale == 'kh'){
                    this.monthLocale = 'km-kh'
                }else{
                    this.monthLocale = 'en-us'
                }
            }
        },
        computed: {
			monthOfFormatted () {
                return this.monthOf ? kendo.toString(new Date(this.monthOf), 'MM-yyyy') : ''
			},
            locale(){
                return this.$route.params.locale 
            }
        },
        mounted () {
            /* Initial data */
            this.initialData();
            this.initialMin();
            this.initialMax();
        }
    }
</script>