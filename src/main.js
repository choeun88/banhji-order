import Vue from 'vue'
import './assets/styles/main.css'
import './assets/styles/snotify.css'
// Import font
import './assets/banhji-accounting/style.css'
// const cookieJS = require("@/cookie.js");
// const cookie = cookieJS.getCookie();
import fullscreen from 'vue-fullscreen'
import VueSweetalert2 from 'vue-sweetalert2'
import Snotify, { SnotifyPosition } from 'vue-snotify'
const authJS = require("@/auth.js");
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'
import router from './router'
import { i18n } from './i18n'
import { Trans } from './plugins/Translation'
import DatetimePicker from 'vuetify-datetime-picker'
import { BarcodesInstaller } from '@progress/kendo-barcodes-vue-wrapper'
//Kendo
import '@progress/kendo-ui'
import '@progress/kendo-theme-default/dist/all.css'
import { DataSource, DataSourceInstaller } from '@progress/kendo-datasource-vue-wrapper'
import { Grid, GridColumn, GridInstaller } from '@progress/kendo-grid-vue-wrapper'
import {  ChartInstaller } from '@progress/kendo-charts-vue-wrapper';
import { ListBox, ListBoxInstaller } from '@progress/kendo-listbox-vue-wrapper';
// import JSZip from 'jszip'

Vue.prototype.$i18nRoute = Trans.i18nRoute.bind(Trans)
Vue.config.productionTip = false
const options = {
	toast: {
		position: SnotifyPosition.rightBottom
	}
}
// notification
Vue.use(Snotify,options)
// notification
export const eventBus = new Vue();
authJS.init().then(() => {
	//Kendo
	Vue.use(GridInstaller)
	Vue.use(DataSourceInstaller)
	Vue.use(ChartInstaller)
	Vue.use(ListBoxInstaller)
	//Kendo

	Vue.use(DatetimePicker)
	Vue.use(fullscreen)
	Vue.use(VueSweetalert2)
	Vue.use(BarcodesInstaller)
	new Vue({
		vuetify,
		store,
		i18n,
		router,
		render: h => h(App),
		components: {
			Grid,
			GridColumn,
			DataSource,
			ListBox
		},
	}).$mount('#app')
})