/* Store */
import store from "@/store"
const institute = store.state.institute.institute

export default class AccountLine {
    constructor(data = {}) {
        this.id = data.id || ''
        this.account = data.account || {}
        this.description = data.description || ''
        this.amount = data.amount || 0
        this.discountItem = data.discountItem || {}
        this.vatTax = data.vatTax || {}
        this.deleted = data.deleted || 0
        this.dateFormat =  institute.dateFormat
    }

    constuct(data) {
        this.constructor(data);
    }
}