export default class Group {
    constructor(data = {}) {
        this.id = data.id || ''
        this.name = data.name || ''
        this.apply = data.apply || 'all'
        this.nature = data.nature || 'point_card'
        this.type = data.type || 'physical'
        this.stores = data.stores || []
        this.campaign = data.campaign || ''
        this.user = data.user || {}
        this.price = data.price || 0
        this.startPoint = data.startPoint || 0
        this.pointEarn =  data.pointEarn || 0
    }

    constuct(data) {
        this.constructor(data);
    }
}