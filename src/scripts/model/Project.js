export default class Project {
    constructor(data = {}) {
        this.id = data.id || ''
        this.name = data.name || ''
        this.code = data.code || ''
        this.description = data.description || ''
        this.customer = data.customer || {}
    }

    constuct(data) {
        this.constructor(data);
    }
}