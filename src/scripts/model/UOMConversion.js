export default class UOMConversion {
    constructor(data = {}) {
        this.id = data.id || ''
        this.variantId = data.variantId || ''
        this.fromUOM = data.fromUOM || {}
        this.toUOM = data.toUOM || {}
        this.rate = data.rate || 1
        this.code = data.code || ''
        this.type = data.type || 1 // [ 1 = Non-Tax , 2 = Tax ]
        this.conversionRate = data.conversionRate || 1
        this.vatTax = data.vatTax || {}
        this.purchaseTax = data.purchaseTax || {}
        this.specificTax = data.specificTax || {}
        this.otherTax = data.otherTax || {}
        this.publicLightingTax = data.publicLightingTax || {}
    }

    constuct(data) {
        this.constructor(data);
    }
}