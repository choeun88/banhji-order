export default class UOMPrice {
    constructor(data = {}) {
        this.id = data.id || ''
        this.variantId = data.variantId || ''
        this.uom = data.uom || {}
        this.price = data.price || '0'
        this.priceLevel = data.priceLevel || {}
        this.priceType = data.priceType || 'Standard'
        this.appliedDate = data.appliedDate || ''
        this.appliedDate_ = data.appliedDate_ || ''
        this.vatTax = data.vatTax || {}
        this.purchaseTax = data.purchaseTax || {}
        this.specificTax = data.specificTax || {}
        this.otherTax = data.otherTax || {}
        this.deleted = data.deleted || 0
        this.status = data.status || 1
    }

    constuct(data) {
        this.constructor(data);
    }
}