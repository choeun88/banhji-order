export default class Department {
    constructor(data = {}) {
        if (!data) {
            this.id = data.id || ''
            this.name = data.name || ''
            this.location = data.location || {}
            this.segment = data.segment || {}
        } else {
            this.id = ''
            this.name = ''
            this.location = {}
            this.segment = {}
        }
    }

    constuct(data) {
        this.constructor(data);
    }
}