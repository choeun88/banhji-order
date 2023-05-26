export default class LateFee {
    constructor(data = {}) {
        this.id = data.id || ''
        this.code = data.code || ''
        this.name = data.name || ''
        this.amount = data.amount || '0'
        this.nature = data.nature || ''
        this.description = data.description || ''
        this.account = data.account || {}
        this.currency = data.currency || {}
        this.method = data.method || {}
        this.status = data.status || 1
        this.deleted = data.deleted || 0
        this.createdAt = data.createdAt || new Date().toJSON()
    }

    constuct(data) {
        this.constructor(data);
    }
}
