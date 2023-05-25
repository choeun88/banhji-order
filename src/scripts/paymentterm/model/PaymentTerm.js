/* Store */
import store from "@/store"
const institute = store.state.institute.institute

export default class PaymentTerm {
    constructor(data = {}) {
            this.id                         = data.id || ''
            this.customer                   = data.customer || {}
            this.vendor                     = data.vendor || {}
            this.customerId                 = data.customerId || ''
            this.vendorId                   = data.vendorId || ''
            this.effectiveDate              = data.effectiveDate || new Date().toJSON()
            this.effectiveDate_             = data.effectiveDate_ || new Date().toJSON()
            this.term                       = data.term || {}
            this.termId                     = data.termId || ''

            this.loggedUser                 = data.loggedUser || {}
            this.dateFormat                 = institute.dateFormat
            this.createdAt                  = data.createdAt || new Date()
            this.deleted                    = data.deleted || 0
        }

    constuct(data) {
        this.constructor(data);
    }
}