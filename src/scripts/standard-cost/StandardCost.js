const { dataStore } = require("@/observable/store");
var institute = dataStore.company || {}
export default class StandardCost {
    constructor(data = {}) {
        this.id = data.id || ''
        this.itemId = data.itemId || ''
        this.product = data.product || {}
        this.uom = data.uom || {}
        this.cost = data.cost || 0
        this.currency = institute.baseCurrency
        this.type = data.type || ''
        // this.priceType = data.priceType || 'Standard'
        this.appliedDate = data.appliedDate || ''
    }

    constuct(data) {
        this.constructor(data);
    }
}