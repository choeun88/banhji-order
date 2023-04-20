export default class Campaign {
    constructor(data = {}) {
        this.id = data.id || ''
        this.name = data.name || ''
        this.number = data.number || ''
        this.serialNumber = data.serialNumber || ''
        this.customer = data.customer || ''
        this.type = data.type || ''
        this.user = data.user || {}
    }

    constuct(data) {
        this.constructor(data);
    }
}