export default class PriceLevel {
    constructor(data = {}) {
        this.id = data.id || ''
        this.code = data.code || ''
        this.name = data.name || ''
        this.currency = data.currency || {}
        this.type = data.type || {
            id: '',
            name: '',
        }
        this.nature = data.nature || ''
    }

    constuct(data) {
        this.constructor(data);
    }
}