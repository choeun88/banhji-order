/* Store */
export default class ItemLine {
    constructor(data = {}) {
        this.itemId = data.itemId || ''
        this.sku = data.sku || ''
        this.id = data.id || ''
        this.name = data.name || ''
        this.code = data.code || ''
        this.description = data.description || ''
        this.obj = data.obj || {}
    }

    constuct(data) {
        this.constructor(data);
    }
}