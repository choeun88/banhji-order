<template>
    <v-select
        v-model="year"
        :items="years"
        @change="emitYear"
        append-icon="mdi-calendar"
        menu-props="auto"
        label="Select Year"
        outlined
    ></v-select>
</template>

<script>

export default {
    name: 'YearPicker',
    props: ['initialYear'],
    data() {
        return {
            year : '',
            years : [],
        }
    },
    methods: {
        emitYear() {
            this.$emit('emitYear', this.year);
        },
        onChanged() {
            this.$emit('onChanged');
        },
    },
    watch: {
        initialYear() {
            this.year = this.initialYear;
        }
    },
    created() {
        let today = new Date(),
            currentYear = today.getFullYear(),
            interval = 30,
            years = [];

        for (let i = currentYear - interval; i <= currentYear; i++) {
            years.push(i);
        }

        this.years = years;
    },
    mounted() {
        /* Initial Date */
        this.year = this.initialYear;
    }
}
</script>