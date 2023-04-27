export default class TaxType {
    constructor(data = {}) {
        this.id             = data.id || ''
        this.name           = data.name || ''
        this.nameLocale     = data.nameLocale || ''
        this.typeId         = data.typeId || ''
        this.nature         = data.nature || ''
        this.agency         = data.agency || ''
        this.isSystem       = data.isSystem || ''
    }
    constuct(data) {
        this.constructor(data);
    }
}