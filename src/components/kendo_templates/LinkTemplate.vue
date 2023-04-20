<template>
    <span>
        <a @click="onClickLink" :class="{'link_in_tb_':templateArgs.related,'link_in_tb':!templateArgs.related}" style=" cursor: pointer !important;">{{templateArgs.text}}</a>
    </span>
</template>

<script>
import router from '@/router'
export default {
    name: 'LinkTemplate',
    data() {
        return {
            templateArgs: {}
        }
    },
    methods: {
        onClickLink() {
            router.push({ path: this.templateArgs.url });
        }
    },
}
</script>
<style scoped>
    .link_in_tb{
        font-weight: bold;
        font-family: 'Niradei-Medium';
        cursor: pointer !important;
        color: #ED1A3A !important;
    }
    .link_in_tb_{
        font-weight: bold;
        font-family: 'Niradei-Medium';
        cursor: pointer !important;
        color: #a40e33 !important;
    }
</style>
