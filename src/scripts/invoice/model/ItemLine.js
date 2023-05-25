/* Store */
import store from "@/store"
import OtherChargeModel from "@/scripts/model/OtherCharge";
const institute = store.state.institute.institute

export default class ItemLine {
    constructor(data = {}) {
        this.id = data.id || ''
        this.qid = data.qid || '' // quote line id
        this.soid = data.soid || '' // so line id
        this.poid = data.poid || '' // po line id
        this.doid = data.doid || '' // do line id
        this.number = data.number || ''
        this.serviceDate = data.serviceDate || new Date().toISOString().substring(0, 10)
        this.serviceDateTo = data.serviceDateTo || new Date().toISOString().substring(0, 10)
        this.bzItem = data.bzItem || {}
        this.item = data.item || {}
        this.description = data.description || ''
        this.qoh = data.qoh || 0
        this.qty = data.qty || 1
        this.cfQty = data.cfQty || 0 // Confirm delivery order quantity
        this.recogQty = data.recogQty || 0 // revenue recognition
        this.nrdQty = data.nrdQty || 0 // revenue recognition
        this.invQty = data.invQty || 0 // Qty used in invoice for sale order

        this.soQty = data.soQty || 0 // delivery order: from Sale order or Invoice qty
        this.doQty = data.doQty || 0 // delivery order qty
        this.qQty = data.qQty || 0 // sale quote qty
        this.invdQty = data.invdQty || 0 // invoiced qty = (invQty - soQty) or (invQty - doQty)

        this.qPrice = data.qPrice || 0 // sale quote price
        this.soPrice = data.soPrice || 0 // sale order price
        this.invPrice = data.invPrice || 0 // invoice price
        this.invdAmount = data.invdAmount || 0 // invoiced amount
        this.sodAmount = data.sodAmount || 0 // sum up the sale order amount have been used in invoiced
        this.doPrice = data.doPrice || 0 // Delivery order price

        this.conversionRate = data.conversionRate || 1
        this.wac = data.wac || 0
        this.po = data.po || 0
       
        this.poUom = data.poUom || {}
        this.poQty = data.poQty || 0
        this.poPrice = data.poPrice || 0
        this.poCost = data.poCost || 0

        this.so = data.so || 0
        this.buom = data.buom || {}
        this.uom = data.uom || {}
        this.price = data.price || 0
        this.cost = data.cost || 0
        this.amount = data.amount || 0
        this.amountWithoutTax = data.amountWithoutTax || 0
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
        this.otherChargeItem = data.otherChargeItem || new OtherChargeModel({})
        this.otherChargeAmount = data.otherChargeAmount || 0
        this.otherChargeExchangeAmount = data.otherChargeExchangeAmount || 0
        this.otherTaxAmount = data.otherTaxAmount || 0
        this.otherTaxExchangeAmount = data.otherTaxExchangeAmount || 0
        this.vatTax = data.vatTax || {}
        this.vatTaxAmount = data.vatTaxAmount || 0
        this.vatTaxExchangeAmount = data.vatTaxExchangeAmount || 0
        this.includeTaxAmount = data.includeTaxAmount || 0
        this.includeTaxExchangeAmount = data.includeTaxExchangeAmount || 0
        this.saleUnit = data.saleUnit || {}
        this.modifier = data.modifier || {}
        this.employee = data.employee || []
        this.class1 = data.class1 || {}
        this.class2 = data.class2 || {}
        this.class3 = data.class3 || {}
        this.class4 = data.class4 || {}
        this.class5 = data.class5 || {}
        this.deleted = data.deleted || 0
        this.dateFormat = institute.dateFormat
        this.decimalFormat = 'n2'
        // this.sourceTransaction = data.sourceTransaction || {}
        // this.sourceTransactionRef = data.sourceTransactionRef || {}
        this.totalReceived = data.totalReceived || 0
        this.isEditable = data.isEditable || false
        this.recStatus = data.recStatus || 1
        this.doStatus = data.doStatus || 1 // for Sale Order from delivery order
        this.qStatus = data.qStatus || 1 // for Sale Order from delivery order
        this.soStatus = data.soStatus || 1 // for Sale Order from delivery order
        this.invStatus = data.invStatus || 1 // for Sale Order from Invoice
        this.subOfCustomer = data.subOfCustomer || {}
        this.reff = data.reff  || '' // reference from such as from sale quote, sale order ..
        this.reffNum = data.reffNum  || '' // reference from such as from sale quote, sale order ..
        this.txnId = data.txnId  || '' // id from transaction quote/sale order
        this.soXRate = data.soXRate  || 1 // this is exchange rate of transaction sale order
        this.invXRate = data.invXRate  || 1 // this is exchange rate of transaction invoice
        this.cusId = data.cusId || '',
        this.poXRate = data.poXRate || 1
        this.poVat = data.poVat || {},
        this.editQty = data.editQty || false,
        this.editUOM = data.editUOM || false,
        this.editItem = data.editItem || false
    }

    constuct(data) {
        this.constructor(data);
    }
}