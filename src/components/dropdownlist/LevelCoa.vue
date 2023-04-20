<template>
    <v-select
        class="mt-1"
        placeholder="Select Level"
        v-model="levelCoa"
        :items="levelCoas"
        item-text="text"
        item-value="value"
        @change="emitLevelCoa"
        outlined>
    </v-select>
</template>

<script>
export default {
    name: 'LevelCoaDropDownList',
    props: ["initLevelCoa"],
    data() {
        return {
            levelCoa : "",
            levelCoas : [
                { text:"Primary", value:"" },
                { text:"Secondary", value:"/secondary" },
            ],
        }
    },
    methods: {
        initialData(){
            this.levelCoa = this.initLevelCoa;
        },
        emitLevelCoa() {
            this.$emit('emitLevelCoa', this.levelCoa);
        },
    },
    watch: {
        initLevelCoa: "initialData",
    },
    mounted() {
        /* Initial Data */
        this.initialData();
    }
}
</script>