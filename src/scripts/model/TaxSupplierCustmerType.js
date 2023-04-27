export default class TaxSupplierCustmerType {
    constructor(data = {}) {
        this.id             = data.id || ''
        this.name           = data.name || ''
    }
    constuct(data) {
        this.constructor(data);
    }
}