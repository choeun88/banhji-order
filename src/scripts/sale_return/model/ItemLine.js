/* Store */
import store from "@/store"
import OtherChargeModel from "@/scripts/model/OtherCharge";

const institute = store.state.institute.institute

export default class ItemLine {
    constructor(data = {}) {
        this.id = data.id || ''
        this.number = data.number || ''
        this.serviceDate = data.serviceDate || new Date().toISOString().substr(0, 10)
        this.serviceDateTo = data.serviceDateTo || new Date().toISOString().substr(0, 10)
        this.item = data.item || {}
        this.description = data.description || ''
        this.qoh = data.qoh || 0
        this.qty = data.qty || 1
        this.conversionRate = data.conversionRate || 1
        this.wac = data.wac || 0
        this.po = data.po || 0
        this.so = data.so || 0
        this.buom = data.buom || {}
        this.uom = data.uom || {}
        this.price = data.price || 0
        this.amount = data.amount || 0
        this.adjAmount = data.adjAmount || 0
        this.exchangeAmount = data.exchangeAmount || 0
        this.discountPercent = data.discountPercent || 0
        this.discountAmount = data.discountAmount || 0
        this.discountExchangeAmount = data.discountExchangeAmount || 0
        this.discountItem = data.discountItem || {}
        this.specificTax = data.specificTax || {}
        this.specificTaxAmount = data.specificTaxAmount || 0
        this.specificTaxExchangeAmount = data.specificTaxExchangeAmount || 0
        this.publicLightingTax = data.publicLightingTax || {}
        this.publicLightingTaxAmount = data.publicLightingTaxAmount || 0
        this.publicLightingTaxExchangeAmount = data.publicLightingTaxExchangeAmount || 0
        this.otherTax = data.otherTax || {}
        this.otherTaxAmount = data.otherTaxAmount || 0
        this.otherTaxExchangeAmount = data.otherTaxExchangeAmount || 0
        this.vatTax = data.vatTax || {}
        this.vatTaxAmount = data.vatTaxAmount || 0
        this.vatTaxExchangeAmount = data.vatTaxExchangeAmount || 0
        this.includeTaxAmount = data.includeTaxAmount || 0
        this.includeTaxExchangeAmount = data.includeTaxExchangeAmount || 0
        this.saleUnit = data.saleUnit || {}
        this.modifier = data.modifier || {}
        this.otherChargeItem = data.otherChargeItem || new OtherChargeModel({})
        this.otherChargeAmount = data.otherChargeAmount || 0
        this.otherChargeExchangeAmount = data.otherChargeExchangeAmount || 0
        this.employee = data.employee || []
        this.class1 = data.class1 || {}
        this.class2 = data.class2 || {}
        this.class3 = data.class3 || {}
        this.class4 = data.class4 || {}
        this.class5 = data.class5 || {}
        this.deleted = data.deleted || 0
        this.dateFormat = institute.dateFormat
        this.decimalFormat = 'n2'
        this.sourceTransaction = data.sourceTransaction || {}
        this.sourceTransactionRef = data.sourceTransactionRef || {}
    }

    constuct(data) {
        this.constructor(data);
    }
}