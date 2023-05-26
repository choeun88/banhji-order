export default class SaleChannel {
    constructor(data = {}) {
        if (!data) {
            this.id = data.id || ''
            this.name = data.name || ''
            this.nature = data.nature || {}
        } else {
            this.id = ''
            this.name = ''
            this.nature = ''
        }
    }

    constuct(data) {
        this.constructor(data);
    }
}