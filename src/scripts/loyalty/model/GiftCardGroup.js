export default class GiftCardGroup {
    constructor(data = {}) {
        this.id = data.id || ''
        this.name = data.name || ''
        this.apply = data.apply || 'all'
        this.nature = data.nature || 'point_card'
        this.type = data.type || 'physical'
        this.user = data.user || {}
    }

    constuct(data) {
        this.constructor(data);
    }
}