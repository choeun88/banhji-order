export default class GiftCard {
    constructor(data = {}) {
        this.id = data.id || ''
        this.number = data.number || ''
        this.serial = data.serial || ''
        this.nature = data.nature || 'topup'
        this.amount = data.amount || 0
        this.price = data.price || 0
        this.status = data.status || 'open'
        this.itemBy = data.itemBy || 'all'
        this.itemByCategory = data.itemByCategory || []
        this.itemByGroup = data.itemByGroup || []
        this.itemByItem = data.itemByItem || []
        this.lockDelete = data.lockDelete || 'no'
        this.user = data.user || {}
        this.stores = data.stores || []
    }

    constuct(data) {
        this.constructor(data);
    }
}