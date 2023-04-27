export default class PurchaseFormContent {
    constructor(data = {}) {

        this.id = data.id || ''
        this.serviceDate = data.serviceDate || false
        this.serviceDateTo = data.serviceDateTo || false
        this.discountItem = data.discountItem || false
        this.class1 = data.class1 || false
        this.class2 = data.class2 || false
        this.class3 = data.class3 || false
        this.class4 = data.class4 || false
        this.class5 = data.class5 || false
        this.decimal = data.decimal || 2
        this.purchaseQuote = data.purchaseQuote || ''
        this.purchaseOrder = data.purchaseOrder || ''
    }

    constuct(data) {
        this.constructor(data);
    }
}