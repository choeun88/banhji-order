
export default class PriceLevelType {
    constructor(data = {}) {
            this.id                         = data.id || ''
            this.name                       = data.name || ''
            this.isSystem                   = data.isSystem || 0
            this.createdAt                  = data.createdAt || new Date().toISOString().substr(0, 10)
        }

    constuct(data) {
        this.constructor(data);
    }
}