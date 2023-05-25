/* Store */
import store from "@/store"
const institute = store.state.institute.institute

export default class Recurring {
    constructor(data = {}) {
        this.id                     = data.id || ''
        this.name                   = data.name || ''
        this.customer               = data.customer || ''
        this.referenceNo            = data.referenceNo || ''
        this.transactionType        = data.transactionType || {}
        this.txnId                  = data.txnId || ''
        this.transactionDate        = data.transactionDate || new Date().toISOString().substr(0, 10)
        this.txnStartDate           = data.txnStartDate || new Date().toISOString().substr(0, 10)
        this.frequency              = data.frequency || 'Monthly'
        this.noOfRecurring          = data.noOfRecurring || 1
        this.status                 = data.status || 1 //1: Open, 2: Used
        this.dateFormat             = institute.dateFormat
    }

    constuct(data) {
        this.constructor(data);
    }
}