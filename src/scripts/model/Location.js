export default class Location {
    constructor(data = {}) {
        this.id             = data.id || ''
        this.name           = data.name || ''
        this.enName         = data.enName || ''
        this.phone          = data.phone || ''
        this.email          = data.email || ''
        this.address        = data.address || ''
        this.enAddress      = data.enAddress || ''
        this.mapLink        = data.mapLink || ''
        this.services       = data.services || ''
        this.isEditImg      = data.isEditImg || false
        this.image          = data.image || ''
    }

    constuct(data) {
        this.constructor(data);
    }
}