<template>
    <v-select
        :loadin="statusList.length <= 0"
        class="mt-1"
        v-model="selectedValue"
        :items="statusList"
        item-text="text"
        item-value="value"
        @change="emitStatus"
        outlined />
</template>

<script>
    export default {
        name: 'StatusDropDownList',
        props: ["initStatus"],
        data () {
            return {
                selectedValue : 1,
                statusList : [
                    { text: "Active", value: 1 },
                    { text: "Inactive", value: 0 },
                ],
            }
        },
        methods: {
            emitStatus () {
                this.$emit('emitStatus', this.selectedValue);
            },
        },
        watch: {
            initStatus () {
                this.selectedValue = this.initStatus;
            }
        },
        mounted () {
            /* Initial Obj */
            this.selectedValue = this.initStatus;
        }
    }
</script>