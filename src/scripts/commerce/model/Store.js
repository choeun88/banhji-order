export default class Store {
    constructor(data = {}) {
        this.id = data.id || ''
        this.name = data.name || ''
        this.code = data.code || ''
        this.registers = data.registers || []
        this.oldRegisters = data.oldRegisters || []
        this.nature = data.nature || 'retail'
        this.segmentId = data.segmentId || ''
        this.warehouseId = data.warehouseId || ''
        this.saleChannelId = data.saleChannelId || ''
        this.address = data.address || ''
        this.user = data.user || {}
        this.lockDelete = data.lockDelete || 'no'
        this.phone = data.phone || ''
        this.status = data.status || 'active'
        this.allowNegativeStock = data.allowNegativeStock || true
    }

    constuct(data) {
        this.constructor(data);
    }
}