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
                v-model="dateTimeFormatted"
                append-icon="event"
                @click:append="menu = true"
                readonly
                outlined
                v-bind="attrs"
                v-on="on"
            ></v-text-field>
        </template>
        <v-datetime-picker
            v-model="dateTime"
            @change="emitDateTime"
        >
        </v-datetime-picker>
    </v-menu>
</template>

<script>
    import kendo from '@progress/kendo-ui'

    export default {
        name: 'DateTimePicker',
        props: ['initDateTime'],
        data () {
            return {
                menu        : false,
                dateTime     : new Date(),
            }
        },
        methods: {
            emitDateTime () {
                this.menu = false;
                this.$emit('emitDateTime', this.dateTime);
            },
        },
        watch: {
            initDateTime () {
                this.dateTime = this.initDateTime;
            }
        },
        computed: {
            dateTimeFormatted () {return this.dateTime ? kendo.toString(new Date(this.dateTime), 'MM-dd-yyyy HH:mm') : ''},
        },
        mounted () {
            this.dateTime = this.initDateTime;
        }
    }
</script>