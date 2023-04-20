export default class LoyaltyApp {
    constructor(data = {}) {
        this.id = data.id || ''
        this.name = data.name || ''
        this.issuedDate = data.issuedDate || new Date().toISOString().substr(0, 7)
        this.address = data.address || ''
        this.longtitute = data.longtitute || ''
        this.latetitute = data.latetitute || ''
        this.phone = data.phone || ''
        this.rewards = data.rewards || []
        this.status = data.status || 'active'
        this.userPin = data.userPin || []
        this.user = data.user || {}
    }

    constuct(data) {
        this.constructor(data);
    }
}