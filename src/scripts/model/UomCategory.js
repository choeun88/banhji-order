export default class UomCategory {
    constructor(data = {}) {
        this.id = data.id || ''
        this.name = data.name || ''
    }

    constuct(data) {
        this.constructor(data);
    }
}