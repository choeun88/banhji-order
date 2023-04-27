export default class Zone {
    constructor(data = {}) {
        this.id        = data.id || ''
        this.name      = data.name || ''
        this.code      = data.code || ''
        this.type      = data.type || ''
        this.wh        = data.wh || ''
    }

    constuct(data) {
        this.constructor(data);
    }
}