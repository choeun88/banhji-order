export default class Event {
    constructor(data = {}) {
        this.id             = data.id || ''
        this.name           = data.name || ''
        this.enName         = data.enName || ''
        this.date           = data.date || ''
        this.campus         = data.campus || ''
        this.shortDesc      = data.shortDesc || ''
        this.enDesc         = data.enDesc || ''
        this.isEditImg      = data.isEditImg || false
        this.image          = data.image || ''
    }

    constuct(data) {
        this.constructor(data);
    }
}