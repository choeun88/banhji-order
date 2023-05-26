export default class CustomerGroup {
    constructor(data = {}) {

        this.id = data.id || ''
        this.name = data.name || ''
        this.discountItem = data.discountItem || {}
        this.priceLevel = data.priceLevel || {}

    }

    constuct(data) {
        this.constructor(data);
    }
}