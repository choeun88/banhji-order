export default class Partner {
    constructor(data = {}) {
        this.id = data.id || ''
        this.name = data.name || ''
        this.customerId = data.customerId || ''
        this.vendorId = data.vendorId || ''
        this.settlementMethod = data.settlementMethod || 'cash'
        this.saleChannelId = data.saleChannelId || ''
        this.customer = data.customer || {}
        this.vendor = data.vendor || {}
        this.user = data.user || {}
        this.img = data.img || {}
        this.campaigns = data.campaigns || []
        this.isEditImg = data.isEditImg || false
    }

    constuct(data) {
        this.constructor(data);
    }
}