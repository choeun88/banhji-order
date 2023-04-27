export default class Variants {
    constructor(data = {}) {
        this.id = data.id || ''
        this.name = data.name || ''
        this.code = data.code || ''

    }

    constuct(data) {
        this.constructor(data);
    }
}