export default class UOMServicePrice {
    constructor(data = {}) {
        this.id = data.id || ''
        this.serviceId = data.serviceId || ''
        this.uom = data.uom || {}
        this.types = data.types || {}
        this.price = data.price || 0
        this.value = data.value || 0
        this.priceLevel = data.priceLevel || {}
        this.base = data.base || 100
        this.data = data.data || {}
        this.appliedDate = data.appliedDate || new Date().toISOString().substr(0, 10)

    }

    constuct(data) {
        this.constructor(data);
    }
}
