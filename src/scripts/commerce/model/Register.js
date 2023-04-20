export default class Register {
    constructor(data = {}) {
        this.id = data.id || ''
        this.name = data.name || ''
        this.code = data.code || ''
        this.searchNum = data.searchNum || ''
        this.status = data.status || ''
        this.shifts = data.shifts || 1
        this.store = data.store || ''
        this.user = data.user || {}
        this.lockDelete = data.lockDelete || 'no'
        this.phone = data.phone || ''
        this.address = data.address || ''
        this.logo = data.logo || {}
        this.vat = data.vat || ''
        this.secretCode = data.secretCode || ''
        this.isEditImg = data.isEditImg || false
    }

    constuct(data) {
        this.constructor(data);
    }
}