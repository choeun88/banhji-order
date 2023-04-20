<template>
  <v-container>
    <v-row  color="white" class="my_row">
      <v-col style="margin: 0 auto;" sm="12" md="6" cols="12" class="screen_small pr-0">
        <v-card
            color="white"
            class="pa-10 rounded-0 no_border wrapper_form"
            height="365px"
        >
          <h1 style="padding:15px;" class="mb-6 line_40">{{ $t("please_sign_in") }}</h1>
          <v-row>
            <v-col sm="12" md="12" cols="12" style="padding: 0;max-width: 90%;text-align: left; margin-left: 30px;" class="screen_small pr-0">
              <label>Username</label>
              <v-text-field
                class="pt-1"
                outlined
                v-model="username"
                placeholder="Username"
                
                :rules="[(v) => !!v || $t('is_required')]"
                required
              />
            </v-col>
            <v-col sm="12" md="12" style="padding: 0;max-width: 90%;text-align: left; margin-left: 30px;" cols="12" class="screen_small pr-0">
              <label>Password</label>
              <v-text-field
                class="pt-1"
                outlined
                v-model="pwd"
                placeholder="Password"
                type="password"
                :rules="[(v) => !!v || $t('is_required')]"
                required
              />
            </v-col>
            <v-col style="padding: 0;text-align: left; margin-left: 30px;" cols="6" sm="5">
              <v-btn
                  color="primary"
                  @click="Login"
                  style="background-color: orange;"
                  class="text-bold btn_signup  "
              >{{ $t("sign_in") }}
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <!-- <v-col cols="12" style="position: relative;">
        <div class="footer text-center" style="text-align: center">

          <p class="font_13"
          >&copy; {{ year }} {{ $t("footer_desc") }}</p
          >

        </div>
      </v-col> -->
    </v-row>
  </v-container>
</template>
<script>
// const cookieJS = require("@/cookie.js");
import jwt from "jsonwebtoken";
const commerceHandler = require("@/scripts/commerce/handler/commerceHandler")
export default {
  data: () => ({
    year: new Date().getFullYear(),
    username: '',
    pwd: '',
  }),
  methods: {
    async setCookie(cname, cvalue, exdays, domain) {
			const d = new Date();
			d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
			const expires = "expires=" + d.toUTCString();
			document.cookie =
			cname + "=" + cvalue + ";" + expires + ";domain=" + domain + ";path=/";
		},
    async Login() {
      // const login = cookieJS.login(this.username, this.pwd);
      let d = {
        username: this.username,
        password: this.pwd
      }
      await commerceHandler.storeLogin(d).then(res=>{
        window.console.log(res, 'res back from login')
        if(res.data.data.status){
          const data = {
            token: res.data.data.token
          };
          let tokenName= "banhji-order-token" + process.env.VUE_APP_MODE
          let token = jwt.sign(data, process.env.VUE_APP_JWT_SESCRET, {
            expiresIn: 86400,
          });
          this.setCookie(
            tokenName,
            token,
            9999,
            ''
          );
          this.$snotify.success('Success full')
          window.location.reload()
        }else{
          // this.username = ''
          // this.pwd = ''
          alert('Username & Password incorrect')
        }
      })
      // if(login){
      //   const data = {
      //     token: new Date().getTime()
      //   };
      //   let tokenName= "nlf-token" + process.env.VUE_APP_MODE
      //   let token = jwt.sign(data, process.env.VUE_APP_JWT_SESCRET, {
      //     expiresIn: 86400,
      //   });
      //   await this.setCookie(
      //     tokenName,
      //     token,
      //     9999,
      //     ''
      //   );
      //   this.$snotify.success('Success full')
      //   window.location.reload()
      // }else{
      //   // this.username = ''
      //   // this.pwd = ''
      //   alert('Username & Password incorrect')
      // }
    },
  },
};
</script>

<style scoped>
.link_app {
  display: block;
  padding: 10px;
}

.v-btn--outlined {
  border: thin solid #d6d6d6 !important;
}

.link_app:hover {
  background: rgb(226, 226, 226);
}

.stepwizard-step p {
  margin-top: 10px;
}

.stepwizard-row {
  display: table-row;
}

.stepwizard {
  display: table;
  width: 100%;
  position: relative;
}

.stepwizard-step button[disabled] {
  opacity: 1 !important;
  filter: alpha(opacity=100) !important;
}

.stepwizard-step {
  display: table-cell;
  text-align: center;
  position: relative;
}

.btn-circle {
  width: 30px;
  height: 30px;
  text-align: center;
  padding: 2px 0;
  font-size: 20px;
  line-height: 1.428571429;
  border-radius: 15px;
  font-weight: 700;
  background-color: #000;
  color: #fff;
}

.btn-circle p {
  color: #000;
  font-size: 25px;
  font-weight: 700;
  float: left;
  text-align: left;
  position: absolute;
  top: -3px;
  right: 0;
  margin-top: 0;
}

.btn-primary p {
  color: #007bff;
}

.btn-circle.btn-primary {
  background-color: #007bff !important;
}

.img_center {
  height: 70px;
  display: block;
  margin: auto;
}

.my_row {
  margin-top: 11% !important;
}

@media (max-width: 768px) {
  .screen_small {
    margin-top: 0px;
  }

  .screen_small3 {
    margin-top: 60px;
  }

  .my_row {
    margin-top: 4% !important;
  }
}

.footer {
  color: #333;
  font-size: 16px;
  height: auto;
  float: left;
  width: 80%;
  position: fixed;
  bottom: 0;
  padding: 15px 0;
}

.text-truly {
  width: 80%;
  line-height: 40px;
  font-size: 36px;
}

@media (max-width: 768px) {
  .footer {
    color: #333;
    font-size: 16px;
    height: auto;
    float: left;
    width: 100%;
    position: relative;
    bottom: 0;
    padding: 15px 0;
  }

  .text_pwd {
    line-height: 11px !important;
  }
}

@media (max-width: 992px) {
  .screen_small {
    padding-left: 15px !important;
    padding-right: 15px !important;
  }

  .text-that-also {
    font-size: 18px;
    width: 100% !important;
    line-height: 25px;
  }

  .text_pwd {
    line-height: 11px !important;
  }

  .screen_small2 {
    margin-top: 200px !important;
  }

  .text-truly {
    width: 100%;
  }
}

@media (max-width: 1030px) {
  .text-that-also {
    font-size: 18px;
    width: 100% !important;
    line-height: 25px;
  }

  .text-truly {
    width: 100%;
  }

  .text_pwd {
    line-height: 11px !important;
  }
}

.line_13 {
  line-height: 13px;
}

.line_40 {
  line-height: 40px;
}

.to_access {
  font-size: 40px;
  line-height: 49px;
  font-family: "Niradei-Light", serif !important;
}

.that_also {
  font-size: 21px;
  color: #fff;
  line-height: 26px;
  font-family: 'Niradei-Light';
}
</style>
