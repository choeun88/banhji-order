export default class TaxPayerModel {
    constructor(data = {}) {
        this.id             = data.id || ''
        this.name           = data.name || ''
    }
    constuct(data) {
        this.constructor(data);
    }
}