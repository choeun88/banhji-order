export default class TaxPayroll {
    constructor(data = {}) {
        this.id             = data.id || ''
        this.name           = data.name || ''
        this.nature         = data.nature || ''
        this.currency       = data.currency || {}
        this.rate           = data.rate || ''
        this.amount         = data.amount || 0
        this.effectiveDate  = data.effectiveDate || ''
        this.account        = data.account || {}
    }
    constuct(data) {
        this.constructor(data);
    }
}