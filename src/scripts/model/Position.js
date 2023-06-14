export default class Position {
    constructor(data = {}) {
        this.id = data.id || ''
        this.name = data.name || ''
        this.department = data.department || {}
        this.lavel = data.lavel || ''
    }

    constuct(data) {
        this.constructor(data);
    }
}