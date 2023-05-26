<template>
    <v-row class="">
      <v-container class="px-0 pt-4 body-app" >
        <v-card outlined dense color="white" class=" no_border" elevation="0" height="680" style="overflow-y: auto;">
          <LoadingMe
            :isLoading="showLoading"
            type="loading"
            :fullPage="false"
            :myLoading="true"
          />
          <v-dialog v-model="dialogM3" max-width="600px">
            <v-card>
              <div class="modal_header">
                <v-card-title>{{ $t("order") }} - ({{ $t(orderTitle) }})</v-card-title>
                <v-icon class="btn_close" @click="dialogM3 = false">close</v-icon>
              </div>
              <v-card-text class="modal_text_content">
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-row>
                    <v-col sm="6" cols="12" class="pb-0">
                      <label class="label">{{ $t("customer_name") }}</label>
                      <p>{{ item.cusName }}</p>
                    </v-col>
                    <v-col style="padding-left: 0;" sm="6" cols="12" class="pb-0">
                      <label class="label">{{ $t("customer_phone") }}</label>
                      <p>{{ item.cusPhone }}</p>
                    </v-col>
                    <v-col sm="6" cols="6" class="pt-0">
                      <label class="label">{{ $t("date") }}</label>
                      <p>{{formatDateTime(item.issuedDate) }}</p>
                    </v-col>
                    <v-col style="padding-left: 0;" v-if="isReserveOrder" sm="6" cols="6" class="pt-0">
                      <label class="label">{{ $t("pick_up_date") }}</label>
                      <p>{{ pickUpDate }}</p>
                    </v-col>
                    <v-col v-if="isDeliveryOrder" sm="6" cols="6" class="pt-0">
                      <v-row v-if="hasMapLink">
                        <label class="label">{{ $t("google_map") }}</label><br />
                        <a style="width: 100%" target="_blank" :href="item.mapLink">{{ $t('view_map') }}</a>
                      </v-row>
                      <v-row v-else>
                        <label class="label">{{ $t("address") }}</label>
                        <p>{{ deliveryAdd }}</p>
                      </v-row>
                    </v-col>
                    <!-- <v-col v-if="isDeliveryOrder" sm="6" cols="6" class="pt-0">
                      <label class="label">{{ $t("delivery_fee") }}</label>
                      <v-text-field
                        class="mt-1"
                        outlined
                        required
                        placeholder=""
                        @change="calTotal"
                        v-model="deliveryFee"
                      />
                    </v-col> -->
                    <v-col sm="12" cols="12" class="pt-0">
                      <template>
                        <v-simple-table class="attachment_table">
                          <template v-slot:default>
                            <thead>
                              <tr>
                                <th class="text-uppercase">{{ $t('description') }}</th>
                                <th class="text-uppercase">{{ $t('qty') }}</th>
                                <th class="text-uppercase">{{ $t('price') }}</th>
                                <th class="text-uppercase">{{ $t('amount') }}</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="d in item.items" v-bind:key="d.id">
                                <td>{{ d.name }}</td>
                                <td>{{ d.orderamt }}</td>
                                <td>{{ d.price }}</td>
                                <td>{{ d.orderamt * d.price }}</td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </template>
                    </v-col>
                    <v-col sm="3" cols="3" >
                        <label class="label">{{ $t("sub_total") }}</label>
                        <p style="width: 100%;">{{ numberFormat(subTotal) }}</p>
                    </v-col>
                    <v-col sm="3" cols="3" >
                        <label class="label">{{ $t("delivery_fee") }}</label>
                        <p style="width: 100%;">{{ numberFormat(deliveryFee) }}</p>
                    </v-col>
                    <v-col sm="3" cols="3" >
                        <label class="label">{{ $t("discount") }}</label>
                        <p style="width: 100%;">{{ numberFormat(item.discount) }}</p>
                    </v-col>
                    <v-col sm="3" cols="3" >
                        <label class="label">{{ $t("total") }}</label>
                        <p style="width: 100%;font-size: 20px;font-weight: bold;">{{ numberFormat(total) }}</p>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
              <v-card-actions class="modal_footer">
                <v-row>
                  <v-col sm="6" cols="6" class="py-0 text-left">
                    <v-btn
                      color="black"
                      outlined
                      class="text-capitalize black--text float-left"
                      @click="cancelOrder"
                      >{{ $t("cancel") }}
                    </v-btn>
                  </v-col>
                  <v-col sm="6" cols="6" class="py-0 text-right">
                    <v-btn
                      color="primary"
                      class="px-3 white--text text-capitalize"
                      @click="approvOrder"
                    >
                      {{ $t("approve") }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="showOrder" max-width="600px">
            <v-card>
              <div class="modal_header">
                <v-card-title>{{ $t("order") }} - ({{ $t('new_order') }})</v-card-title>
                <v-icon class="btn_close" @click="showOrder = false">close</v-icon>
              </div>
              <v-card-text class="modal_text_content">
                <v-form ref="form" lazy-validation>
                  <v-row>
                    <v-col sm="6" cols="12" class="pb-0">
                      <label class="label">{{ $t("customer_name") }}</label>
                      <v-text-field
                        class="mt-1"
                        outlined
                        required
                        placeholder=""
                        v-model="o.cusName"
                      />
                    </v-col>
                    <v-col style="padding-left: 0;" sm="6" cols="12" class="pb-0">
                      <label class="label">{{ $t("customer_phone") }}</label>
                      <v-text-field
                        class="mt-1"
                        outlined
                        required
                        placeholder=""
                        v-model="o.cusPhone"
                      />
                    </v-col>
                    <v-col sm="6" cols="6" class="pt-0 coverdatetime">
                      <label class="label">{{ $t("date") }}</label>
                      <v-datetime-picker v-model="o.dateTime"></v-datetime-picker>
                    </v-col>
                    <v-col style="padding-left: 0;" sm="6" cols="6" class="pt-0 ">
                      <label class="label">{{ $t("order_type") }}</label>
                      <v-select
                          class="mt-1"
                          v-model="o.orderType"
                          :items="orderTypes"
                          item-value="id"
                          item-text="name"
                      />
                    </v-col>
                    <v-col v-if="o.orderType == 'delivery'" sm="6" cols="6" class="pt-0 ">
                      <label class="label">{{ $t("address") }}</label>
                      <v-text-field
                        class="mt-1"
                        outlined
                        required
                        placeholder=""
                        v-model="o.address"
                      />
                    </v-col>
                    <v-col style="padding-left: 0;" sm="6" cols="6" class="pt-0 ">
                      <label class="label">{{ $t("sale_channel") }}</label>
                      <v-select
                          class="mt-1"
                          v-model="o.saleChannel"
                          :items="saleChannels"
                          item-value="id"
                          item-text="name"
                      />
                    </v-col>
                    <v-col sm="12" cols="12" class="pt-0">
                      <template>
                        <v-simple-table class="attachment_table">
                          <template v-slot:default>
                            <thead>
                              <tr>
                                <th class="text-uppercase">{{ $t('description') }}</th>
                                <th class="text-uppercase">{{ $t('qty') }}</th>
                                <th class="text-uppercase">{{ $t('price') }}</th>
                                <th class="text-uppercase">{{ $t('amount') }}</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="d in o.items" v-bind:key="d.id">
                                <td>{{ d.name }}</td>
                                <td>{{ d.orderamt }}</td>
                                <td>{{ d.price }}</td>
                                <td>{{ d.orderamt * d.price }}</td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </template>
                    </v-col>
                    <v-col sm="3" cols="3" >
                        <label class="label">{{ $t("sub_total") }}</label>
                        <p style="width: 100%;">{{ numberFormat(o.subTotal) }}</p>
                    </v-col>
                    <v-col sm="3" cols="3" >
                        <label class="label">{{ $t("discount") }}</label>
                        <p style="width: 100%;">{{ numberFormat(o.discount) }}</p>
                    </v-col>
                    <v-col sm="3" cols="3" >
                        <label class="label">{{ $t("total") }}</label>
                        <p style="width: 100%;font-size: 20px;font-weight: bold;">{{ numberFormat(o.total) }}</p>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
              <v-card-actions class="modal_footer">
                <v-row>
                  <v-col sm="6" cols="6" class="py-0 text-left">
                  </v-col>
                  <v-col sm="6" cols="6" class="py-0 text-right">
                    <v-btn
                      color="primary"
                      class="px-3 white--text text-capitalize"
                      @click="saveOrder"
                    >
                      {{ $t("save") }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-col sm="12" cols="12" class="">
            <v-row>
              <!-- <v-col sm="2" cols="2">
                Total transaction
              </v-col>
              <v-col sm="2" cols="2">
                Total Reject
              </v-col>
              <v-col sm="2" cols="2">
                Total Approv
              </v-col>
              <v-col sm="2" cols="2">
                Assign deliver
              </v-col> -->
              <v-btn
              class="secondary"
                @click="refreshPage" 
                prepend-icon="mdi-check-circle"
                append-icon="mdi-account-circle"
              >
                <template v-slot:prepend>
                  <v-icon color="success"></v-icon>
                </template>

                Refresh

                <template v-slot:append>
                  <v-icon color="warning"></v-icon>
                </template>
              </v-btn>
              <v-btn
                style="margin-left: 10px;"
                class="primary"
                @click="addOrder" 
                prepend-icon="mdi-check-circle"
                append-icon="mdi-account-circle"
              >
                <template v-slot:prepend>
                  <v-icon color="success"></v-icon>
                </template>

                Add Order

                <template v-slot:append>
                  <v-icon color="warning"></v-icon>
                </template>
              </v-btn>
            </v-row>
            <v-row>
              <v-col sm="12" cols="12">
                <template>
                  <kendo-datasource ref="gridOrderTxn" :data="txns" />
                  <kendo-grid
                    id="gridOrderTxn"
                    class="grid-function"
                    :data-source-ref="'gridOrderTxn'"
                    :editable="false"
                    :excel-file-name="'order_txn.xlsx'"
                    :excel-filterable="true"
                    :scrollable-virtual="true"
                  >
                    <kendo-grid-column
                      :field="'orderNum'"
                      :title="$t('order_number')"
                      :width="50"
                      :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                    />
                    <kendo-grid-column
                      :field="'cusName'"
                      :title="$t('customer_name')"
                      :width="50"
                      :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                    />
                    <kendo-grid-column
                      :field="'cusPhone'"
                      :title="$t('customer_phone')"
                      :width="50"
                      :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                    />
                    <kendo-grid-column
                      :field="'issuedDate'"
                      :title="$t('date')"
                      :width="100"
                      :template="'#= kendo.toString(new Date(issuedDate), `yyyy-MMM-dd hh:mm tt`)#'"
                      :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                    />
                    <kendo-grid-column
                      :field="'discount'"
                      :title="$t('discount')"
                      :width="50"
                      :template="'#= discount.toFixed(2)#'"
                      :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                    />
                    <kendo-grid-column
                      :field="'totalAmt'"
                      :title="$t('total')"
                      :width="50"
                      :template="'#= totalAmt.toFixed(2)#'"
                      :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                    />
                    <kendo-grid-column
                      :field="'orderFrom'"
                      :title="$t('order_from')"
                      :width="50"
                      :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                    />
                    <kendo-grid-column
                      :field="''"
                      :title="$t('action')"
                      :width="50"
                      :command="[
                        { iconClass: 'k-icon k-i-eye', text: $t('review'), click: goEdit },
                      ]"
                      :headerAttributes="{
                        style: 'background-color: #EDF1F5;',
                        class: 'text-center',
                      }"
                      :attributes="{ style: 'text-align: center' }"
                    />
                  </kendo-grid>
                </template>
              </v-col>
            </v-row>
          </v-col>
        </v-card>
      </v-container>
    </v-row>
  </template>
  
  <script>
  const commerceHandler = require("@/scripts/commerce/handler/commerceHandler")
  // const cookieJS = require("@/cookie.js");
  const telegramBotHandler = require("@/scripts/commerce/handler/telegramBotHandler")
  import OrderMedel from "@/scripts/commerce/model/Order"
  
  import kendo from "@progress/kendo-ui";
  const $ = kendo.jQuery;
  import { i18n } from "@/i18n";
  export default {
    name: "Operation",
    components: {
      LoadingMe: () => import(`@/components/Loading`),

    },
    data: () => ({
      isHide: false,
      register: '',
      txns: [],
      showLoading: false,
      item: {},
      stores: [],
      dialogM3: false,
      hasMapLink: false,
      isToday: false,
      pickUpDate: '',
      isReserveOrder: false,
      orderTitle: 'delivery_order',
      isDeliveryOrder: false,
      valid:true,
      deliveryAdd: '',
      deliveryFee: 0,
      subTotal: 0,
      total: 0,
      o: new OrderMedel({}),
      showOrder: false,
    }),
    watch: {},
    methods: {
      //add order
      saveOrder(){
        window.console.log(this.o)
      },
      addOrder(){
        this.o = new OrderMedel({})
        this.showOrder = true
      },
      numberFormat(value){
        return kendo.toString(parseFloat(value), 'n2')
      },
      formatDateTime(value){
        return kendo.toString(new Date(value), 'yyyy-MMM-dd hh:mm tt')
      },
      refreshPage(){
        window.location.reload()
      },
      rowNumberTmpl(dataItem) {
          let ds = this.$refs.gridOrderTxn.kendoWidget(),
          index = ds.indexOf(dataItem);
          return index + 1;
      },
      close() {
          this.$router.go(-1);
      },
      hideTabs() {
        this.isHide = !this.isHide;
      },
      goEdit(e) {
        e.preventDefault();
        let grid = kendo.jQuery("#gridOrderTxn").data("kendoGrid");
        let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
        dataItem.id = dataItem.pk;
        this.item = dataItem;
        let d = this.item
        this.hasMapLink = false
        this.isToday = false
        this.isReserveOrder = false
        this.isDeliveryOrder = false
        if(this.item.function == 'reserve order'){
          this.isReserveOrder = true
          this.orderTitle = 'pick_up_order'
          if(this.item.pickUpFunc == 'today'){
            this.pickUpDate = 'ថ្ងៃនេះ '+this.item.pickUpToday +' ទៀត'
          }else{
            this.pickUpDate = kendo.toString(new Date(this.item.pickUpDate), 'yyyy-MMM-dd hh:mm tt')
          }
        }else if(this.item.function == 'delivery order'){
          this.isDeliveryOrder = true
          this.orderTitle = 'delivery_order'
          if(this.item.mapLink != ''){
            this.hasMapLink = true
          }else{
            let homnum = ''
            if(d.location.homeNum != '' && d.location.homeNum != undefined){
                homnum = 'លេខផ្ទះ៖ ' + d.location.homeNum 
            }
            let streetnum = ''
            if(d.location.streetNum != '' && d.location.streetNum != undefined){
                streetnum = '\nលេខផ្លូវ៖ ' + d.location.streetNum 
            }
            let ladd = ''
            if(d.location.address != '' && d.location.address != undefined){
                ladd = '\nអស័យដ្ឋាន៖ ' + d.location.address
            }
            let lnote = ''
            if(d.location.note != '' && d.location.note != undefined){
                lnote = '\nកំណត់បន្ថែម៖ ' + d.location.note
            }
            this.deliveryAdd = homnum + ',' +
            streetnum +',' +
            ladd + ',' +
            lnote
          }
        }else if(this.item.function == 'delivery & reserve'){
          this.orderTitle = 'delivery_reserve_order'
          this.isDeliveryOrder = true
          this.isReserveOrder = true
          this.pickUpDate = kendo.toString(new Date(this.item.pickUpDate), 'yyyy-MMM-dd hh:mm tt')
          if(this.item.mapLink != ''){
            this.hasMapLink = true
          }else{
            let homnum = ''
            if(d.location.homeNum != '' && d.location.homeNum != undefined){
                homnum = 'លេខផ្ទះ៖ ' + d.location.homeNum 
            }
            let streetnum = ''
            if(d.location.streetNum != '' && d.location.streetNum != undefined){
                streetnum = 'លេខផ្លូវ៖ ' + d.location.streetNum 
            }
            let ladd = ''
            if(d.location.address != '' && d.location.address != undefined){
                ladd = 'អស័យដ្ឋាន៖ ' + d.location.address
            }
            let lnote = ''
            if(d.location.note != '' && d.location.note != undefined){
                lnote = 'កំណត់បន្ថែម៖ ' + d.location.note
            }
            this.deliveryAdd = homnum + ',' +
            streetnum +',' +
            ladd + ',' +
            lnote
          }
        }
        this.deliveryFee = 0
        this.calTotal()
        this.dialogM3 = true
      },
      cancelOrder(){
        if(confirm(i18n.t('are_you_sure_cancel_order'))){
          this.showLoading = true
          let data = {
            ...this.item,
            type: 'cancelorder',
            isPoint: true
          }
          window.console.log(data)
          delete data['prop'];
          delete data['__ob__'];
          telegramBotHandler.madamnomPointCreate(data).then(()=>{
              this.showLoading = false
              this.$snotify.success(i18n.t('successfull'))
              this.loadOrder()
              this.dialogM3 = false
          })
        }
      },
      calTotal(){
        this.subTotal = parseFloat(this.item.subTotal)
        this.total = this.subTotal - this.item.discount + parseFloat(this.deliveryFee)
      },
      loadStore(){
        this.showLoading = true
        this.stores = []
        commerceHandler.storeGets().then((res) => {
          this.showLoading = false
          let d = res.data.data
          if(d.length > 0){
            this.stores = d
          }
        })
      },
      approvOrder(){
        this.showLoading = true
        let data = {
          ...this.item,
          type: 'approvorder',
          isPoint: true,
          deliveryFee: this.deliveryFee,
          total: this.total
        }
        window.console.log(data)
        delete data['prop'];
        delete data['__ob__'];
        telegramBotHandler.madamnomPointCreate(data).then(()=>{
            this.showLoading = false
            this.$snotify.success(i18n.t('successfull'))
            this.loadOrder()
            this.dialogM3 = false
        })
      },
      async loadOrder(key){
        this.showLoading = true
        this.txns = []
        let data = {
          gsi2: 'otherorder#order',
          key: key
        }
        commerceHandler.getGsi2(data).then(res=>{
          let d = res.data.data.Items 
          if(d.length > 0){
            let txns = []
            d.sort(function (a, b) {
              return parseFloat(b.issuedDate) - parseFloat(a.issuedDate)
            })
            d.forEach(data => {
              // this.txns.push(data)
              data.cusName = data.customer.name
              data.cusPhone = data.customer.phone
              txns.push(data)
            })
            this.txns = txns
          }
          this.showLoading = false
        })
        // let d = {
        //     sk: instituteId,
        //     pk: 'otherorder-',
        //     type: 'gsi2',
        //     key: key
        // }
        // await commerceHandler.genGets(d).then(res => {
        //     // window.console.log(res, 'response serving')
        //   let d = res.data.data.Items 
        //   if(d.length > 0){
        //     let txns = []
        //     d.sort(function (a, b) {
        //         return parseFloat(b.issuedDate) - parseFloat(a.issuedDate)
        //     })
        //     d.forEach(data => {
        //       // this.txns.push(data)
        //       data.cusName = data.customer.name
        //       data.cusPhone = data.customer.phone
        //       txns.push(data)
        //     })
        //     this.txns = txns
        //   }
        // })
        window.console.log(this.txns)
      },
    },
    computed: {
      orderTypes(){
        return [
          {id: 'delivery', name: i18n.t('delivery')},
          {id: 'pickup', name: i18n.t('pick_up')}
        ]
      },
      saleChannels(){
        return [
          {id: 'facebook', name: 'Facebook'},
          {id: 'telegram', name: 'Telegram'},
          {id: 'ig', name: 'Instagram'},
          {id: 'call', name: 'Call to store'},
        ]
      },
    },
    mounted: async function (){
      await this.loadOrder({})
      await this.loadStore()
    },
  };
  </script>
  <style scoped>
  .v_slide_group_content_pos{
    white-space: inherit !important;
  }
  .arr_icon {
    color: #2ca01c;
  }
  .coverdatetime .v-text-field {
    margin-top: 0;
    padding-top: 5px!important;
  }
  .arr_icon1 {
    color: #4c9aff;
    color: #2ca01c;
  }
  
  .v-tab {
    justify-content: left;
    font-size: 16px;
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
  
  .tab_product_service_show.theme--light .v-slide-group__content {
    width: 140px !important;
  }
  
  p {
    color: rgba(0, 0, 0, 0.87);
  }
  .v-slide-group__content{
    white-space: normal !important;
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
    .tab_setting.theme--light.v-tabs.tab_setting > .v-tabs-bar {
      width: 55px !important;
    }
  
    .hideAbs {
      display: none !important;
    }
  }
  </style>
  