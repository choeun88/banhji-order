/* Store */
import store from "@/store"
const institute = store.state.institute.institute

export default class ItemLine {
    constructor(data = {}) {
        this.id = data.id || ''
        this.serviceDate = data.serviceDate || new Date().toISOString().substring(0, 10)
        this.serviceDateTo = data.serviceDateTo || new Date().toISOString().substring(0, 10)
        this.item = data.item || {}
        this.description = data.description || ''
        this.qoh = data.qoh || 0
        this.bValue = data.bValue || 0
        this.conversionRate = data.conversionRate || 0
        this.count = data.count || 0
        this.different = data.different || 0
        this.cost = data.cost || 1
        this.buom = data.buom || {}
        this.amount = data.amount || 0
        this.adjAmount = data.adjAmount || 0
        this.conversionRate = data.conversionRate || 1

        this.class1 = data.class1 || {}
        this.class2 = data.class2 || {}
        this.class3 = data.class3 || {}
        this.class4 = data.class4 || {}
        this.class5 = data.class5 || {}
        this.deleted = data.deleted || 0
        this.dateFormat = institute.dateFormat
        this.decimalFormat = 'n2'
    }

    constuct(data) {
        this.constructor(data);
    }
}