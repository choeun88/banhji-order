export default class TaxList {
    constructor(data = {}) {
        this.id             = data.id || ''
        this.subId          = data.subId || ''
        this.defaultTax     = data.defaultTax || ''
        this.transac        = data.transac || ''
        this.desc           = data.desc || ''
        this.acc            = data.acc || ''
        this.taxBase        = data.taxBase || ''
        this.rate           = data.rate || ''
        this.baseAmount     = data.baseAmount || ''
        this.natureTaxPayer = data.natureTaxPayer || ''
        this.isClone        = data.isClone || ''
        this.isSystem       = data.isSystem || ''
    }
    constuct(data) {
        this.constructor(data);
    }
}