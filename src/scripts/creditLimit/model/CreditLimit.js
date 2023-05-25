/* Store */
import store from "@/store"
const institute = store.state.institute.institute

export default class CreditLimit {
    constructor(data = {}) {
            this.id                         = data.id || ''
            this.customer                   = data.customer || {}
            this.vendor                     = data.vendor || {}
            this.customerId                 = data.customerId || ''
            this.vendorId                   = data.vendorId || ''
            this.effectiveDate              = data.effectiveDate || new Date().toISOString()
            this.effectiveDate_             = data.effectiveDate_ || new Date().toISOString()
            this.amount                     = data.amount || 1

            this.loggedUser                 = data.loggedUser || {}
            this.dateFormat                 = institute.dateFormat
            this.createdAt                  = data.createdAt || new Date()
            this.deleted                    = data.deleted || 0
            this.type                       = data.type || ''
        }

    constuct(data) {
        this.constructor(data);
    }
}