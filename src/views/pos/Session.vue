<template>
 <v-row class="">
    <v-container class="px-0 pt-4" >
      <v-col cols="12" class="pt-0">
        <v-card outlined dense color="white" class=" no_border" elevation="0" height="680" style="overflow-y: auto;">
            <div class="modal_header">
                <v-card-title>{{ $t("start_of_day") }}</v-card-title>
                <v-icon
                    @click="close()"
                    style="cursor: pointer; font-size: 30px;"
                    color="grey"
                    class="float-right mt-n1">close
                </v-icon>
            </div>
            <v-col sm="12" cols="12" class="mb-4">
              <v-dialog 
                v-model="pinActivate"
                persistent 
                max-width="350px">
                  <v-form ref="form" v-model="valid" lazy-validation>
                      <template>
                          <!-- <v-container> -->
                          <div id="pin" class="m-auto my-4">
                              <!-- <v-text-field
                                  class="mt-4"
                                  v-model="pin"
                                  placeholder=""
                                  :type="'password'"
                                  :rules="[v => !!v || $t('pin_is_required') ]"
                              />
                              <h2 v-if="incorrect">{{$t("wrong_pin")}}</h2> -->
                              <v-otp-input
                                  length="4"
                                  v-model="pin"
                                  plain
                                  @change="searchPin"
                                  :rules="[v => !!v || 'PIN is required']"
                                  type="password"
                              ></v-otp-input>
                              <h2 v-if="incorrect">{{$t("wrong_pin")}}</h2>
                              <div class="numbers">
                                  <div @click="pinClick(1)" class="number">1</div>
                                  <div @click="pinClick(2)" class="number">2</div>
                                  <div @click="pinClick(3)" class="number">3</div>
                                  <div @click="pinClick(4)" class="number">4</div>
                                  <div @click="pinClick(5)" class="number">5</div>
                                  <div @click="pinClick(6)" class="number">6</div>
                                  <div @click="pinClick(7)" class="number">7</div>
                                  <div @click="pinClick(8)" class="number">8</div>
                                  <div @click="pinClick(9)" class="number">9</div>
                                  <div @click="pinClick('clear')" class="number" style="">{{$t("ac")}}</div>
                                  <div @click="pinClick(0)" class="number">0</div>
                                  <div @click="searchPin" class="number" style="background-color: rgb(154 27 46);color: #ffff;">{{$t("go")}}</div>
                              </div>
                          </div>
                          <!-- </v-container> -->
                      </template>
                  </v-form>
              </v-dialog>
              <v-dialog v-model="dialogM3" max-width="350px">
                <template v-slot:activator="{ on }">
                  <v-btn
                    @click="addNewSession"
                    v-show="allowAddSession"
                    color="primary"
                    class=" white--text float-right text-capitalize"
                    v-on="on"
                  >
                    {{ $t("start_of_day") }}
                  </v-btn>
                </template>
                <v-card>
                  <div class="modal_header">
                    <v-card-title>{{ $t("session") }}</v-card-title>
                    <v-icon @click="dialogM3 = false">close</v-icon>
                  </div>

                  <v-card-text class="modal_text_content">
                    <v-row>
                      <v-col sm="12" cols="12" class="pb-0">

                        <label>{{ $t("number") }}</label>
                        <v-text-field
                          class="mt-1"
                          disabled
                          v-model="s.number"
                          outlined
                          clearable
                        />
                      </v-col>
                      <v-col sm="12" cols="12" class="py-0">
                        <label class="label">{{ $t("register") }}</label>
                        <v-select
                            class="mt-1"
                            item-text="name"
                            item-value="pk"
                            v-model="s.register"
                            :items="registers"
                            @change="registerChange"
                            :placeholder="$t('select')"
                            outlined>
                        </v-select>
                      </v-col>
                      <v-col sm="12" cols="12" class="py-0">
                        <label class="label">{{ $t("start_date") }}</label>
                        <app-datepicker
                          :initialDate="s.startDate"
                          @emitDate="s.startDate = $event"/>
                      </v-col>
                      <v-col sm="12" cols="12" class="pb-0">
                        <div class="d-flex">
                          <label style="padding: 10px;background: #eee;line-height: 21px;height: 40px;margin-top: 4px;border-radius: 3px;">USD</label>
                          <v-text-field
                            class="mt-1"
                            outlined
                            v-model="s.amtUSD"
                            clearable
                          />
                          <label style="padding: 10px;background: #eee;line-height: 21px;height: 40px;margin-top: 4px;border-radius: 3px;margin-left: 5px;">KHR</label>
                          <v-text-field
                            class="mt-1"
                            outlined
                            v-model="s.amtKHR"
                            clearable
                          />
                      </div>
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-card-actions class="modal_footer">
                    <v-row>
                      <v-col sm="6" cols="6" class="py-0 text-left">
                        <v-btn
                          color="black"
                          outlined
                          class=" text-capitalize  black--text float-left"
                          @click="dialogM3 = false"
                          >{{ $t("cancel") }}
                        </v-btn>
                      </v-col>
                      <v-col sm="6" cols="6" class="py-0 text-right">
                        <v-btn
                          color="primary"
                          class="px-3  white--text text-capitalize"
                            @click="openSession"
                        >
                          {{ $t("save") }}
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-col>
            <v-col sm="12" cols="12">
              <LoadingMe
                :isLoading="showLoading"
                :fullPage="false"
                type="loading"
                :myLoading="true"
              />
              <template>
                <v-simple-table class="attachment_table">
                  <template v-slot:default>
                    <thead>
                      <tr>
                          <th width="10" style="width: 5%">{{ $t('no') }}</th>
                          <th width="30" style="width: 12%">{{ $t('number') }}</th>
                          <th width="30">{{ $t('register') }}</th>
                          <th width="30">{{ $t('start_date') }}</th>
                          <th width="30">{{ $t('end_date') }}</th>
                          <th width="30" style="width: 13%">{{ $t('session_key') }}</th>
                          <th width="10" style="width: 5%">{{ $t('status') }}</th>
                          <th width="40">{{ $t('action') }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(s, index) in sessions" v-bind:key="s.pk">
                        <td>{{index + 1}}</td>
                        <td>{{s.number}}</td>
                        <td>{{s.registerObj.name}}</td>
                        <td>{{ kendo.toString(new Date(s.startDate), 'yyyy-MM-dd h:m tt') }}</td>
                        <td>{{ s.endDate != '' ? kendo.toString(new Date(s.endDate), 'yyyy-MM-dd h:m tt') : ''}}</td>
                        <td>{{ s.sesKey || ''}}</td>
                        <td>{{ $t(s.status)}}</td>
                        <td>
                          <v-btn v-if="s.isEnd == 1" style="background-color: orange!important;" class="btn_edit_setting orange-darken-2" @click="printSession(s)">
                            <v-icon class="white--text" size="14">mdi-printer-pos-check</v-icon>
                            <span class="capitalize ml-1 white--text font_14">{{ $t('print') }}</span>
                          </v-btn>
                          <v-btn v-if="!s.isEnd == 1" style="font-size: 12px!important;" class="btn_edit_setting" @click="endSession(s)">
                            <!-- <v-icon class="white--text" size="14">mdi-cancel</v-icon> -->
                            <span class="capitalize ml-1 white--text font_12">{{ $t('end') }}</span>
                          </v-btn>
                          <v-btn v-if="!s.isEnd == 1" style="margin-left: 5px;font-size: 12px!important;" class="purple btn_edit_setting" @click="revokeKey(s)">
                            <!-- <v-icon class="white--text" size="14">mdi-wrench</v-icon> -->
                            <span class="capitalize ml-1 white--text font_12">{{ $t('reset_key') }}</span>
                          </v-btn>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </template>
            </v-col>
        </v-card>
      </v-col>
      <!-- Print Session-->
      <v-dialog
            v-model="dialogPrintSession"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
        >
            <template v-slot:activator="{ on, attrs }">
            </template>
            <v-card style="background-color: #f8f8f9;width: 400px;">
                <v-container>
                    <v-card outlined dense class="px-3 no_border mt-4" color="white">
                        <div class="modal_header">
                            <v-card-title>{{ $t("session") }}</v-card-title>
                            <v-icon
                                @click="dialogPrintSession = false"
                                style="cursor: pointer; font-size: 40px;"
                                color="grey"
                                id="closePrintSession"
                                class="float-right mt-n1">close
                            </v-icon>
                        </div>
                        <v-card-text class="modal_text_content">
                            <v-row>
                                <v-col sm="12" cols="12" class="pr-0 py-0 border_right_lightgrey">
                                    <v-row class="mx-1" style="height: 100%;">
                                        <PrintSession :session="session"/>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        <v-divider/>
                    </v-card>
                </v-container>
            </v-card>
        </v-dialog>
    </v-container>
  </v-row>
</template>
<script>
import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'
const commerceHandler = require("@/scripts/commerce/handler/commerceHandler")
const intHandler = require("@/scripts/instituteHandler")
const cookieJS = require("@/cookie.js");
const cookie = cookieJS.getCookie();
const { instituteId } = cookieJS.getCookie()
import JSZip from "jszip";

window.JSZip = JSZip;
import {i18n} from "@/i18n";
import kendo from "@progress/kendo-ui";
// const $ = kendo.jQuery
export default {
  components: {
    LoadingMe: () => import(`@/components/Loading`),
    'app-datepicker': DatePickerComponent,
    PrintSession: () => import("./sale/PrintSession"),
  },
  data: () => ({
    institute: {},
    startDate: "",
    kendo: kendo,
    showLoading: false,
    dialogM3: false,
    dialogM2: false,
    schemaDefinition: {
      model: {
        id: "id",
      },
    },
    loggedUser: {
      id: cookie.creator,
      name: cookie.email,
    },
    valid: false,
    s: {},
    lastNumber: 1,
    showPin: false,
    register: '',
    registers: [],
    isPin: false,
    pinActivate: false,
    pin: '',
    pinData: [],
    activePin: {
        name: '',
        pinCode: ''
    },
    incorrect: false,
    sessions: [],
    allowAddSession: false,
    registerData: [],
    activeStore: localStorage.getItem(instituteId + 'commStore') != null ? JSON.parse(localStorage.getItem(instituteId + 'commStore')) : {},
    session: {},
    dialogPrintSession: false,
  }),
  methods: {
    async revokeKey(s){
      window.console.log(s)
      this.s = s
      this.s.id = s.pk
      this.s.sesKey = Math.floor((Math.random() * 100000000) + 1)
      await this.checkNumber()
      this.s.sesKey = this.s.sesKey.toString()
      this.s.sesStatus = "1"
      this.s.isReset = 1
      // window.console.log(this.s, 'session')
      commerceHandler.sessionCreate(this.s).then(response => {
        this.showLoading = false
        window.console.log(response)
        if (response.data.statusCode === 201) {
            this.$snotify.success('Update Successfully')
            this.loadSession()
            this.loadRegister()
            this.closeAddSession()
        }
        ///
      })
    },
    printSession(d) {
        // e.preventDefault();
        // let grid = kendo.jQuery("#gridSaleUnitItem").data("kendoGrid")
        // // let dataSource = grid.dataSource
        // let dataItem = grid.dataItem($(e.currentTarget).closest("tr"))
        window.console.log(d, 'print session')
        this.showLoading = true
        commerceHandler.sessionGet(d.pk).then(res=>{
          this.showLoading = false
          window.console.log(res, 'res from session')
          this.session = res.data.data[0]
          this.$emit("onUpdate", this.session);
          this.dialogPrintSession = true
        })
    },
    async endSession(d) {
        // e.preventDefault();
        // let grid = kendo.jQuery("#gridSaleUnitItem").data("kendoGrid")
        // let d = grid.dataItem($(e.currentTarget).closest("tr"))
        // window.console.log(d, 'end session')
        // this.s = {
        //   number: d.number,
        //   startDate: d.startDate,
        //   endDate: new Date().getTime(),
        //   status: 'end',
        //   openAmount: d.openAmount,
        //   register: d.register,
        //   openBy: d.openBy,
        //   closeBy: '',
        //   searchNum: d.searchNum,
        //   searchName: d.searchName,
        //   searchDate: d.searchDate,
        //   lastNumber: d.lastNumber,
        //   id: d.pk,
        //   isEnd: 1,
        //   store: {
        //     id: this.activeStore.pk,
        //     name: this.activeStore.name,
        //   },
        //   // update 
        //   totalSale: 0,
        //   totalCash: 0,
        //   totalDis: 0,
        //   totalCredit: 0,
        //   totalBankWallet: 0,
        //   totalCard: 0,
        //   loyalCreditCard: 0,
        //   khqr: 0,
        //   preOrder: 0,
        //   otherCharge: 0,
        //   modiAmount: 0
        // }
        this.s = d
        this.s.id = d.pk
       
        this.isEOD = true
        this.showLoading = true
        this.isPin = false
        await commerceHandler.settingGet(d.register).then(res => {
          this.showLoading = false
          if (res.data.statusCode === 200) {
              const data = res.data.data
              if (data.length > 0) {
                if(data[0].sessionPin == true){
                  this.isPin = true
                }
              }
          }
        })
        if(this.isPin == true){
          this.pinActivate = true
        }else{
          this.saveEndDay()
        }
    },
    saveEndDay(){
      this.s.status = 'end'
      this.s.endDate = new Date().getTime()
      this.s.isEnd = 1
      this.s.sesStatus = '3'
      this.s.isReset = 0
      commerceHandler.sessionCreate(this.s).then(response => {
        this.showLoading = false
        window.console.log(response)
        if (response.data.statusCode === 201) {
            this.$snotify.success('Update Successfully')
            this.loadSession()
            this.loadRegister()
        }
      })
    },
    rowNumberTmpl(dataItem) {
      let ds = this.$refs.gridSaleUnitItemDS.kendoWidget(),
        index = ds.indexOf(dataItem);
      return index + 1;
    },
    searchPin(){
        window.console.log(this.pin, 'pin')
        let activePin = this.pinData.filter((o) => {return o.pinCode == this.pin})
        window.console.log(activePin, 'actvie pin')
        if(activePin.length > 0){
            this.activePin = activePin[0]
            this.pin = ''
            this.pinActivate = false
            if(this.isEOD == false){
              this.s.name = this.activePin.name
              this.s.openBy = this.activePin.name
              this.s.searchName = 'SES#' + this.activePin.name 
              this.saveSession()
            }else{
              this.s.closeBy = this.activePin.name
              this.saveEndDay()
            }
        }else{
            this.pin = ''
            this.activePin = {
                name: '',
                pinCode: ''
            }
        }
    },
    // pinClick(num){
    //     this.incorrect = false
    //     if(num == 'clear'){
    //         this.pin = ''
    //     }else{
    //         this.pin = this.pin + num.toString()
    //     }
    // },
    pinClick(num){
        this.incorrect = false
        if(num == 'clear'){
            this.pin = ''
        }else{
            this.pin = this.pin + num.toString()
            // window.console.log(this.pin, 'click pin')
            if(this.pin.length == 4){
                this.searchPin()
            }
        }
    },
    async addNewSession(){
      this.showPin = false
      this.s = {
        number: '',
        startDate: new Date().toISOString().substr(0, 10),
        endDate: '',
        status: 'open',
        openAmount: 0,
        amtKHR: 0,
        amtUSD: 0,
        register: '',
        openBy: '',
        closeBy: '',
        searchNum: '',
        searchName: 'SES#NONE',
        searchDate: '',
        lastNumber: this.lastNumber,
        isEnd: 0,
        store: {
          id: this.activeStore.pk,
          name: this.activeStore.name,
        },
        // update 
        totalSale: 0,
        totalCash: 0,
        totalDis: 0,
        totalCredit: 0,
        totalBankWallet: 0,
        totalCard: 0,
        loyalCreditCard: 0,
        khqr: 0,
        pointPay: 0,
        preOrder: 0,
        otherCharge: 0,
        modiAmount: 0,
        //loyalty
        topUpCounter: 0,
        topUpGCard: 0,
        saleGiftCard: 0,
        saleVoucher: 0,
        saleLCard: 0,
        saleLCardAmount: 0
      }
      this.s.register = this.registers[0].pk
      this.registerChange()
      await this.loadSesNumber()
      this.isEOD = false
    },
    loadSesNumber(){
      this.showLoading = true
      commerceHandler.sesNumGenerate().then(res => {
        this.showLoading = false
        this.lastNumber = parseInt(res.data.data) + 1
        this.s.lastNumber = this.lastNumber
        this.generatNumber(res.data.data)
      })
    },
    generatNumber(num){
      this.s.number = 'SES' + this.pad(num, 6)
      this.s.searchNum = 'SES#' + 'SES' + this.pad(num, 6)
    },
    openSession(){
      // this.dialogM3 = false
      if(this.isPin == true){
        this.pinActivate = true
      }else{
        this.saveSession()
      }
    },
    pad (str, max) {
      window.console.log(str, max, 'pad')
      str = str.toString();
      return str.length < max ? this.pad("0" + str, max) : str;
    },
    zeroPad(num) {
      return String(num).padStart(6, '0')
    },
    initialData(){
      this.startDate = this.initStartDate;
    },
    emitStartDate() {
      this.$emit('emitStartDate', this.startDate)
    },
    cancel() {
      this.dialogM3 = false;
    },
    close() {
      this.$router.go(-1);
    },
    loadRegister(){
      commerceHandler.registerGets().then(res => {
          let d = res.data.data
          if(d.length > 0){
              let rr = []
              d.forEach(r=>{
                if(r.store == this.activeStore.pk){
                  rr.push(r)
                }
              })
              let registers = rr.filter((o) => {return o.status == 'open'})
              this.registerData = res.data.data
              if(registers.length == 0){
                this.allowAddSession = false
                this.$snotify.error(i18n.t('no_register'))
                this.closeAddSession()
              }else{
                this.allowAddSession = true
                this.registers = registers
              }
              window.console.log(this.allowAddSession)
          }
      })
    },
    closeAddSession(){
      this.dialogM3 = false
    },
    checkNumber(){
      this.showLoading = true
      let d = {
          sesKey: this.s.sesKey.toString(),
          sesStatus: "1"
      }
      this.showLoading = true
      commerceHandler.keyGet(d).then(res => {
          let data = res.data.data
          if(data.Items.length > 0){
              this.s.sesKey = Math.floor((Math.random() * 100000000) + 1)
          }
      })
    },
    async saveSession(){
      this.showLoading = true
      this.s.startDate = new Date().getTime()
      this.s.searchDate = 'SES#' + new Date(this.s.startDate).getTime()
      this.s.shifts = []
      this.s.store = this.activeStore
      let i = this.institute
      let inst = {
        banhjiId: i.banhjiId,
        baseCurrency: i.baseCurrency,
        companyAddress: i.companyAddress,
        companyEmail: i.companyEmail,
        companyPhone: i.companyPhone,
        id: i.id,
        name: i.name,
        userId: i.userId,
        vatTin: i.vatTin
      }
      this.s.ins = inst
      this.s.user = this.loggedUser
      let re = this.registers.filter((o)=>{return o.pk == this.s.register})
      this.s.registerObj = re[0]
      this.s.sesKey = Math.floor((Math.random() * 100000000) + 1)
      if(this.s.sesKey < 10000000){
        this.s.sesKey = Math.floor((Math.random() * 100000000) + 1)
      }
      await this.checkNumber()
      this.s.sesKey = this.s.sesKey.toString()
      this.s.sesStatus = "1"
      this.s.userAgent = ""
      this.s.guest = 0
      this.s.txns = 0
      window.console.log(this.s, 'session')
      this.s.isReset = 0
      commerceHandler.sessionCreate(this.s).then(response => {
        this.showLoading = false
        window.console.log(response)
        if (response.data.statusCode === 201) {
            this.$snotify.success('Update Successfully')
            this.loadSession()
            this.loadRegister()
            this.closeAddSession()
        }
        ///
      })
    },
    registerChange(){
      this.showLoading = true
      this.isPin = false
      commerceHandler.settingGet(this.s.register).then(res => {
          this.showLoading = false
          if (res.data.statusCode === 200) {
              const data = res.data.data
              if (data.length > 0) {
                if(data[0].sessionPin == true){
                  this.isPin = true
                }
              }
          }
      })
    },
    async loadPin() {
        this.showLoading = true
        commerceHandler.pinGets().then(res => {
            this.showLoading = false
            if (res.data.statusCode === 200) {
                const data = res.data.data
                if (data.length > 0) {
                  this.pinData = data
                }
            }
        })
    },
    loadSession(){
      this.showLoading = true
      commerceHandler.sessionGets().then(res => {
          this.showLoading = false
          if (res.data.statusCode === 200) {
              const data = res.data.data
              if (data.length > 0) {
                data.sort(function (a, b) {
                    return parseFloat(b.lastNumber) - parseFloat(a.lastNumber)
                })
                this.sessions = data.filter((o) => {return o.store.pk == this.activeStore.pk})
                window.console.log(this.sessions, 'ss')
              }
          }
      })
    }
  },
  mounted: async function () {
      await this.loadRegister()
      await this.loadPin()
      await this.loadSession()
      await intHandler.init().then(res=>{
          this.institute = res.data.data
      })
  }
};
</script>

<style scoped>
  #pin > .theme--light.v-input input {
          max-height: 32px;
          font-size: 2rem !important;
          text-align: center;
      }
      .v-image__image--cover {
          background-size: contain;
          margin-top: 5px;
      }
      .v-image__image {
          background-position: top center !important;
      }
      .b-cash:before {
          color: #ffffff;
      }   
      .b-loyalty:before {
          content: "\e91b";
          color: #ffffff;
      }
      .btn-right .v-btn__content i{
        font-size: 40px;
      }
      .btn-right .v-btn__content{
        display: block !important;
      }
      h6{
        color: #2a2b2b;
        font-size: 0.6rem !important; 
        font-family: "Niradei-bold", serif !important;
        padding-top: 5px;
      }
      
      .btn-right{
          background-color: #ffffff !important;
          border-bottom: 1px solid;
          border-color: #e5e5e6 !important;
          width: 100%;
          height: 12% !important;
          text-align: center;
          padding: 0 3px !important;
          border-radius: 0px !important;  
      }
      .v-tab {
          justify-content: left;
          font-size: 20px;
      }

      .v-tab--active {
          background-color: rgb(255, 255, 255);
      }

      .tab_setting .v-tab--active {
          font-weight: 700;
          color: #000;
      }

      .v-tab--active {
          background-color: #ffffff !important;
          border-bottom: 4px solid #92d050;
          border-left: none;
      }

      p {
          color: rgba(0, 0, 0, 0.87);
      }
      .theme--light.v-tabs-items {
          background-color: #FFFFFF;
          height: 550px !important;
          overflow: scroll !important;
      }
      
      .sale-container{
          max-width: 1870px !important;
      }
      .theme--light.v-tabs-items {
          background-color: #ffffff00 !important;
      }
      .card-item{
          background-color: #ffffff00;
          border: 0.2px solid #dcdcdc33;
          border-radius: 0;
      }
      .catagory-btn{
          width: 100%;
          background-color: #ffffff !important;
          border: 0.2px solid #e4e4e6;
      }
      .v-btn__content{
          font-family: "Niradei-Bold", serif !important;
          display: block !important;
      }
      .btn_h2{
          font-size: 22px;
      }
      .sidebar-left{
          -webkit-box-flex: 0;
          -ms-flex: 0 0 12.666667%;
          flex: 0 0 12.666667%;
          max-width: 12.666667%;
      }
      .sidebar-left2{
          -webkit-box-flex: 0;
          -ms-flex: 0 0 38.666667%;
          flex: 0 0 38.666667%;
          max-width: 38.666667%;
      }
      .sidebar-left3{
      -webkit-box-flex: 0;
      -ms-flex: 0 0 7.000000%;
      flex: 0 0 7.000000%;
      max-width: 7.000000%;
      }
      .container h2 {
          font-size: 17px;
          margin-bottom: 0;
      }
      .btn-sidebar{
          justify-content: space-between !important;
          background-color: #fff !important;
          font-family: "Niradei-bold", serif !important;
      }

      .b-payment:before {
          content: "\e91f";
          color: #ffffff;
      }
      .b-banking:before {
          content: "\e90e";
          color: #ffffff;
      }
      .btn-money {
          background-color: #969696 !important;
          color: white;
      }
      
      .calculator{
          border: 1px solid gainsboro;
      }
      .receipt-btn{
          min-width: 22% !important;
          height: 50px !important;
          padding: 10px !important;
          margin: 5px;
      }
      .apply-btn{
          min-width: 33% !important;
          height: 50px !important;
          padding: 5px !important;
          margin: 5px;
      }
      .calculator-btn{
        min-width: 18% !important;
          margin: 4px;
          padding: 0 10px !important;
      }
      .calculator-btn-1{
          min-width: 20% !important;
          margin: 4px;
          padding: 0 2px !important;
          font-size: 13px !important;
          letter-spacing: inherit;
          font-weight: bold;
      }
      .pay-btn{
          width: 100%;
          border: 1px solid #e0e0e0;
      }
      .v-text-field__detail .field-pos{
          display:none !important;
      }
      .btn-funtion{
          font-size: 14px;
          width: 100% !important;
          display: flex;
          justify-content: space-between;
      }
      .function_content {
          padding: 0px;
          border-bottom: none !important;
          background-color: #f8f8f9;
      }
      .notification{
          background-color: #ed263a;
          width: auto;
          margin-left: 2px;
          color: #fff;

      }
      .v-btn.v-size--default {
          font-size: 1.2rem;
      }
      .b-search.b:before {
          color: #d7d3d3 !important;
      }
      /* pin */
      body {
        height: 95vh;
        background-color: #181c26 !important;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
        font-family: Open Sans;
      }

      body.wrong {
        -webkit-animation: bg-red 1s ease-in;
        animation: bg-red 1s ease-in;
      }

      body.correct {
        -webkit-animation: bg-green 1s ease-in;
        animation: bg-green 1s ease-in;
      }

      #inspiration {
        position: fixed;
        right: 1em;
        bottom: 1em;
      }

      #inspiration a {
        display: inline-block;
        text-decoration: none;
        font-weight: bold;
        color: white;
        -webkit-transition: all 1s ease;
        transition: all 1s ease;
      }

      #inspiration a:hover { color: #212121; }

      #inspiration p {
        margin: 0;
        padding-left: .4em;
        display: inline-block;
        color: rgba(255, 255, 255, 0.6);
      }
      #pin {
          background-color: #ffffff !important;
          width: 90%;
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
          -webkit-justify-content: center;
          -ms-flex-pack: center;
          justify-content: center;
          -webkit-box-align: center;
          -webkit-align-items: center;
          -ms-flex-align: center;
          align-items: center;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -webkit-flex-direction: column;
          -ms-flex-direction: column;
          flex-direction: column;
          /* padding: 1em; */
          border-radius: .3em;
          /* box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.3); */
          margin: auto;
          color: rgb(155 27 46);;
          }

      .dots {
        width: 50%;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-justify-content: space-around;
        -ms-flex-pack: distribute;
        justify-content: space-around;
        padding: 1em;
        padding-top: 3em;
      }

      .dot {
        position: relative;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 0.8em;
        width: 0.8em;
        height: 0.8em;
        -webkit-transform: scale3d(0.7, 0.7, 0.7);
        transform: scale3d(0.7, 0.7, 0.7);
      }

      .dot.active {
        -webkit-animation: growDot .5s ease;
        animation: growDot .5s ease;
        -webkit-animation-fill-mode: forwards;
        animation-fill-mode: forwards;
      }

      .dot.wrong {
        -webkit-animation: wrong .9s ease;
        animation: wrong .9s ease;
      }

      .dot.correct {
        -webkit-animation: correct .9s ease;
        animation: correct .9s ease;
      }

      .cancelPin {
        width: 25%;
        margin-left: 10%;
        margin-top: 10%;
      }
      .letter_spacing{
          letter-spacing:initial;
          font-size: 12px !important;
      }

      #pin p { font-size: 1.2em; }

      .numbers {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-flow: row wrap;
        -ms-flex-flow: row wrap;
        flex-flow: row wrap;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-justify-content: space-around;
        -ms-flex-pack: distribute;
        justify-content: space-around;
        -webkit-align-content: flex-end;
        -ms-flex-line-pack: end;
        align-content: flex-end;
        margin: 1em 0;
      }

      .number {
        position: relative;
        width: 2.5em;
        height: 2.5em;
        margin: 0.5em;
        border-radius: 2.5em;
        border: 2px solid rgb(154 27 46);
        text-align: center;
        line-height: 2.5em;
        font-weight: 400;
        font-size: 1.8em;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-transition: all .5s ease;
        transition: all .5s ease;
        cursor: pointer;
      }

      .number:hover { color: rgba(243, 134, 134, 0.5); }

      .number:hover:before { border: 2px solid rgba(255, 255, 255, 0.5); }

      .number:before {
        content: "";
        position: absolute;
        left: -2px;
        width: 2.5em;
        height: 2.5em;
        border: 2px solid rgba(255, 255, 255, 0.1);
        border-radius: 2.5em;
        -webkit-transition: all .5s ease;
        transition: all .5s ease;
      }
      .number.grow:before {
          -webkit-animation: grow .6s ease;
          animation: grow .6s ease;
          }
      @-webkit-keyframes 
      growDot {  100% {
      background: white;
      -webkit-transform: scale3d(0.9, 0.9, 0.9);
      transform: scale3d(0.9, 0.9, 0.9);
      }
      }
      @keyframes 
      growDot {  100% {
      background: white;
      -webkit-transform: scale3d(0.9, 0.9, 0.9);
      transform: scale3d(0.9, 0.9, 0.9);
      }
      }
      @-webkit-keyframes 
      grow {  50% {
      -webkit-transform: scale3d(1.5, 1.5, 1.5);
      transform: scale3d(1.5, 1.5, 1.5);
      }
      100% {
      -webkit-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1);
      }
      }
      @keyframes 
      grow {  50% {
      -webkit-transform: scale3d(1.5, 1.5, 1.5);
      transform: scale3d(1.5, 1.5, 1.5);
      }
      100% {
      -webkit-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1);
      }
      }
      @-webkit-keyframes 
      wrong {  20% {
      background: crimson;
      }
      40% {
      -webkit-transform: translate(-15px, 0);
      transform: translate(-15px, 0);
      }
      60% {
      -webkit-transform: translate(10px, 0);
      transform: translate(10px, 0);
      }
      80% {
      -webkit-transform: translate(-5px, 0);
      transform: translate(-5px, 0);
      }
      }
      @keyframes 
      wrong {  20% {
      background: crimson;
      }
      40% {
      -webkit-transform: translate(-15px, 0);
      transform: translate(-15px, 0);
      }
      60% {
      -webkit-transform: translate(10px, 0);
      transform: translate(10px, 0);
      }
      80% {
      -webkit-transform: translate(-5px, 0);
      transform: translate(-5px, 0);
      }
      }
      @-webkit-keyframes 
      correct {  20% {
      background: limegreen;
      }
      40% {
      -webkit-transform: translate(0, -15px);
      transform: translate(0, -15px);
      }
      60% {
      -webkit-transform: translate(0, 10px);
      transform: translate(0, 10px);
      }
      80% {
      -webkit-transform: translate(0, -5px);
      transform: translate(0, -5px);
      }
      }
      @keyframes 
      correct {  20% {
      background: limegreen;
      }
      40% {
      -webkit-transform: translate(0, -15px);
      transform: translate(0, -15px);
      }
      60% {
      -webkit-transform: translate(0, 10px);
      transform: translate(0, 10px);
      }
      80% {
      -webkit-transform: translate(0, -5px);
      transform: translate(0, -5px);
      }
      }
      @-webkit-keyframes 
      bg-red {  50% {
      background: crimson;
      }
      }
      @keyframes 
      bg-red {  50% {
      background: crimson;
      }
      }
      @-webkit-keyframes 
      bg-green {  50% {
      background: limegreen;
      }
      }
      @keyframes 
      bg-green {  50% {
      background: limegreen;
      }
      }
      #pin >.v-input input {
          text-align: center !important;
          font-size: 35px !important;
      }
      .td-invioce td{
          border: thin solid rgba(0, 0, 0, 0.12);
      }
      .tb-pong td{
          border-bottom: none !important;
          height: 25px !important;
      }
      .th-invoice th{
        border-top: thin solid rgba(0, 0, 0, 0.12) !important;  
      }
      .v-list-item-left {
          padding: 0 10px !important;
      }
      .theme--light.v-divider{
          border-color: rgb(0 0 0 / 0%);
      }


      /* Surface pro */
      @media only screen and (min-width : 1400px){
          .btn-funtion{
              font-size: 14px !important;
          }
          .v-application--is-ltr .v-btn__content .v-icon--left {
              margin-right: 8px;
          }
          .v-btn__content .v-icon.v-icon--left, .v-btn__content .v-icon.v-icon--right {
              font-size: 18px;
              height: 18px;
              width: 18px;
          }
          .calculator-btn{
              font-size: 14px;
          }
          
      }
    @media only screen and (min-device-height : 720px) and (max-device-width : 1280px) {
      
          /** Surface Pro styles here **/
          .btn-funtion{
              font-size: 12px !important;
          }
          .v-application--is-ltr .v-btn__content .v-icon--left {
              margin-right: 5px;
          }
          .v-btn__content .v-icon.v-icon--left, .v-btn__content .v-icon.v-icon--right {
              font-size: 16px;
              height: 10px;
              width: 10px;
          }
          .calculator-btn{
              font-size: 12px;
          }
      }
      .angle_action {
          right: 0;
          z-index: 10;
          position: absolute;
          top: 60px;
      }
      .angle_action_small {
          right: 12px;
          z-index: 10;
          position: absolute;
          top: 60px;
      }
      .b-order_type:before {
          content: "\e933";
          color: #ffffff;
          font-size: 22px;
      }
      .b-reward_s:before {
          content: "\e937";
          color: #ffffff;
          font-size: 22px;
      }
      .b-promotion:before {
          content: "\e936";
          color: #ffffff;
          font-size: 22px;
      }
      .b-count_guest:before {
          content: "\e935";
          color: #ffffff;
          font-size: 22px;
      }
      .b-note_s:before {
          content: "\e932";
          color: #ffffff;
          font-size: 22px;
      }
      .b-delivery_s:before {
          content: "\e931";
          color: #ffffff;
          font-size: 22px;
      }
      .b-parksale:before {
          content: "\e934";
          color: #ffffff;
          font-size: 22px;
      }
      .b-invoice_s:before {
          content: "\e930";
          color: #ffffff;
          font-size: 22px;
      }
  .function_footer {
    padding: 15px;
    display: inline-block;
  }

  p {
    color: rgba(0, 0, 0, 0.87);
  }

  .actionBtn {
    height: 47.2px !important;
  }

  .text_tip {
    font-size: 9px;
    line-height: 10px;
  }
  @media (min-width: 1264px){
    .body-app {
      max-width: 1110px;
      }
    }
  @media (min-width: 1904px){
        .body-app {
            max-width: 1440px;
        }
    }

  @media (max-width: 576px) {
  }
</style>
