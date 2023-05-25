/* Store */
import store from "@/store"
const institute = store.state.institute.institute

export default class RecurringDetail {
    constructor(data = {}) {
        this.id                     = data.id || ''
        this.name                   = data.name || ''
        this.referenceNo            = data.referenceNo || ''
        this.txnId                  = data.txnId || ''
        this.txnDate                = data.transactionDate || new Date().toISOString().substr(0, 10)
        this.txnNextDate            = data.txnNextDate || new Date().toISOString().substr(0, 10)
        this.transactionType        = data.transactionType || {}
        this.status                 = data.status || 1 //1: Open, 2: Used
        this.amount                 = data.amount || 0
        this.customer               = data.customer || {}
        this.type                   = data.type || {}
        this.dateFormat             = institute.dateFormat
    }

    constuct(data) {
        this.constructor(data);
    }
}