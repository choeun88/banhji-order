/* Store */
import store from "@/store"
const institute = store.state.institute.institute

export default class DepositLine {
    constructor(data = {}) {
        this.id = data.id || ''
        this.account = data.account || {}
        this.description = data.description || ''
        this.amount = data.amount || 0
        this.exchangeAmount = data.exchangeAmount || 0
        this.deleted = data.deleted || 0
        this.dateFormat = institute.dateFormat
        this.decimalFormat = data.decimalFormat || 'n2'
    }

    constuct(data) {
        this.constructor(data);
    }
}