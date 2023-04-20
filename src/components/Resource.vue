<template>
  <div class="box" >
    <div  class="box_resource " :class="{' f_right' : !show, ' f_right2': show}">
      <div>
        
      </div>
    </div>
  </div>
</template>
<script>
import { i18n } from "@/i18n";
import { data } from "@/observable/store";
export default {
  name: "RoureceDetial",
  components: {
    // LoadingMe: () => import(`@/components/Loading`),
  },
  data: () => ({
    // show: data.show
    keyword: "",
    search: "",
    searchResult: [],
    isLoading: false,
  }),
  computed: {
    show() {
      return data.show;
    },
    key() {
      return data.keyword;
    },
    resources() {
      return data.resources;
    },
    lang() {
      return i18n.locale;
    },
  },
  methods: {
  },
  watch: {
  },
  mounted() {
  },
};
</script>
<style scoped>
.headerbox {
  background: #fff;
  height: 65px;
  top: 0px;
  left: 0px;
  right: 0px;
}
.slidefromright {
    animation: slidefromrightFrame ease 0.6s;
    -webkit-animation: slidefromrightFrame ease 0.6s;
    -moz-animation: slidefromrightFrame ease 0.6s;
    -o-animation: slidefromrightFrame ease 0.6s;
    -ms-animation: slidefromrightFrame ease 0.6s;
}

/*Animation*/
@keyframes slidefromrightFrame {
    0% {
        right: -500px; 
    }
    100% {
        right: 0px;
    }
}
.slidefromleft{
      animation: slidefromrightFrameLeft ease 0.6s;
    -webkit-animation: slidefromrightFrameLeft ease 0.6s;
    -moz-animation: slidefromrightFrameLeft ease 0.6s;
    -o-animation: slidefromrightFrameLeft ease 0.6s;
    -ms-animation: slidefromrightFrameLeft ease 0.6s;
}
/*Animation*/
@keyframes slidefromrightFrameLeft {
    0% {
        right: 0px; 
    }
    100% {
        right: -500px;
    }
}
.box_resource {
  border: 1px solid #e5e5e5;
  position: fixed;
  height: 91vh;
  z-index: 4;
  width: 320px;
  box-shadow: 17px -2px 114px -60px rgb(0 0 0 / 75%);
  background: #f8f8f9;
  bottom: 0px;
  font-family: 'Niradei-Light';
  /* right: 0px; */
}
.f_right{
  right:-500px;
  transition:  ease 0.6s; 
}
.f_right2{
  right: 0px;
  transition:  ease 0.6s; 
}
.scroll {
  height: 91vh;
  overflow-y: auto;
  position: relative;
}
.res_img {
  margin: auto;
  display: block;
  width: 100%;
}
.scroll::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px #dfdfdf;
  /* border-radius: 14px; */
  background-color: #ffffff;
}
table,tr,td{
  border-collapse: collapse;
}
table td{
  border: thin solid rgba(0, 0, 0, 0.12) !important;
  padding:2px !important;
}
.font_16{
  font-size: 16px !important;
}

table{
  width: 100% !important;
}
.scroll::-webkit-scrollbar {
  height: 10px;
  width: 10px;
  background-color: #9f9f9f;
}

.scroll::-webkit-scrollbar-thumb {
  /* border-radius: 6px; */
  /* -webkit-box-shadow: inset 0 0 6px rgb(0 0 0 / 30%); */
  background-color: #cecece;
}
.content_table_resource table{
    border-collapse: collapse;
}
.content_table_resource table tr td,th{
    border: thin solid rgba(0, 0, 0, 0.12) !important;
    font-family: 'Niradei-Light' !important;
    padding: 2px;
}
</style>
