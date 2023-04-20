<template>
  <div>
    <div class="loading">
      <loading
        :active.sync="isLoading"
        :is-full-page="fullPage"
        loader="dots"
        background-color="rgba(255, 255, 255, 5)"
        :width="40"
        :height="40"
      >
        <div v-if="myLoading">
          <div v-if="type == undefined || type == ''">
            <img
              hight="150"
              width="150"
              src="../assets/images/banhji-loading.gif"
            />
          </div>
          <div class="wrapper_load" v-else>
            <div
              class="loading_my"
              v-if="type == 'loading' || type == 'Loading'"
            >
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div v-if="type == 'spin' || type == 'Spin'">
              <div class="spinner-box">
                <div class="circle-border">
                  <div class="circle-core"></div>
                </div>
              </div>
            </div>
             <div v-if="type == 'spin2' || type == 'Spin2'">
              <div class="spinner-box">
                <div class="three-quarter-spinner"></div>
              </div>
            </div>
            <div
              class="donut multi"
              v-if="type == 'donut-multi' || type == 'Donut-Dulti'"
            ></div>
            <div
              class="ripple"
              v-if="type == 'ripple' || type == 'Ripple'"
            ></div>
            <div
              class="multi-ripple"
              v-if="type == 'multi-ripple' || type == 'Multi-Ripple'"
            >
              <div></div>
              <div></div>
            </div>
            <div
              class="fancy-spinner"
              v-if="type == 'fancy-spinner' || type == 'Fancy-Spinner'"
            >
              <div class="ring"></div>
              <div class="ring"></div>
              <div class="dot"></div>
            </div>
            <span class="mt-n2">{{ title }} </span>
          </div>
        </div>
      </loading>
    </div>
  </div>
</template>

<script>
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
// import CustomLoading from './CustomLoading'

export default {
  props: [
    "isLoading",
    "fullPage",
    "myLoading",
    "alertMessage",
    "color",
    "alertText",
    "type",
    "title",
  ],
  name: "LoadingMe",
  data() {
    return {
      mode: "",
      snackbar: true,
      visible: false,
      text: "Success",
      timeout: 6000,
      x: "right",
      y: "top",
    };
  },
  components: {
    Loading,
  },
  methods: {},
  watch: {
    alertMessage() {
      this.visible = this.alertMessage;
    },
  },
};
</script>
<style scoped>
.vld-overlay {
  transition: 0.4s ease-in !important;
}
.wrapper_load {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loading_my {
  display: flex;
  justify-content: center;
}
.loading_my div {
  width: 1rem;
  height: 1rem;
  margin: 2rem 0.3rem;
  background: #f44336;
  border-radius: 50%;
  -webkit-animation: 0.9s bounce infinite alternate;
  animation: 0.9s bounce infinite alternate;
}
.loading_my div:nth-child(2) {
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
}
.loading_my div:nth-child(3) {
  -webkit-animation-delay: 0.6s;
  animation-delay: 0.6s;
}

@-webkit-keyframes bounce {
  to {
    opacity: 0.3;
    transform: translate3d(0, -1rem, 0);
  }
}

@keyframes bounce {
  to {
    opacity: 0.3;
    transform: translate3d(0, -1rem, 0);
  }
}
.donut {
  width: 4rem;
  height: 4rem;
  margin: 2rem;
  border-radius: 50%;
  border: 0.3rem solid rgba(151, 159, 208, 0.3);
  border-top-color: #979fd0;
  -webkit-animation: 1.5s spin infinite linear;
  animation: 1.5s spin infinite linear;
}
.donut.multi {
  border-bottom-color: #979fd0;
}

@-webkit-keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.ripple {
  width: 2rem;
  height: 2rem;
  margin: 2rem;
  border-radius: 50%;
  border: 0.3rem solid #979fd0;
  transform: translate(50%);
  -webkit-animation: 1s ripple ease-out infinite;
  animation: 1s ripple ease-out infinite;
}

@-webkit-keyframes ripple {
  from {
    transform: scale(0);
    opacity: 1;
  }
  to {
    transform: scale(1);
    opacity: 0;
  }
}

@keyframes ripple {
  from {
    transform: scale(0);
    opacity: 1;
  }
  to {
    transform: scale(1);
    opacity: 0;
  }
}
.multi-ripple {
  width: 2.6rem;
  height: 2.6rem;
  margin: 2rem;
}
.multi-ripple div {
  position: absolute;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 0.3rem solid #979fd0;
  -webkit-animation: 1.5s ripple infinite;
  animation: 1.5s ripple infinite;
}
.multi-ripple div:nth-child(2) {
  -webkit-animation-delay: 0.5s;
  animation-delay: 0.5s;
}

.fancy-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 5rem;
}
.fancy-spinner div {
  position: absolute;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
}
.fancy-spinner div.ring {
  border-width: 0.5rem;
  border-style: solid;
  border-color: transparent;
  -webkit-animation: 2s fancy infinite alternate;
  animation: 2s fancy infinite alternate;
}
.fancy-spinner div.ring:nth-child(1) {
  border-left-color: #979fd0;
  border-right-color: #979fd0;
}
.fancy-spinner div.ring:nth-child(2) {
  border-top-color: #979fd0;
  border-bottom-color: #979fd0;
  -webkit-animation-delay: 1s;
  animation-delay: 1s;
}
.fancy-spinner div.dot {
  width: 1rem;
  height: 1rem;
  background: #979fd0;
}

@-webkit-keyframes fancy {
  to {
    transform: rotate(360deg) scale(0.5);
  }
}

@keyframes fancy {
  to {
    transform: rotate(360deg) scale(0.5);
  }
}

.spinner-box {
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
}
@keyframes spin {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(359deg);
  }
}

.circle-border {
  width: 70px;
  height: 70px;
  padding: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: linear-gradient(
    0deg,
    rgba(55, 56, 56, 0.1) 33%,
    #9f9f9f 100%
  );
  animation: spin 1s linear 0s infinite;
}
.circle-core {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 50%;
}
.three-quarter-spinner {
  width: 60px;
  height: 60px;
  border: 3px solid rgb(160, 159, 159);
  border-top: 3px solid transparent;
  border-radius: 50%;
  animation: spin .5s linear 0s infinite;
}

</style>
