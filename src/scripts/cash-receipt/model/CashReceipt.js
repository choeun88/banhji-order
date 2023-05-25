/* Store */
import store from "@/store"
const institute = store.state.institute.institute

export default class CashReceipt {
    constructor(data = {}) {
            this.id                         = data.id || ''
            this.uuid                       = data.uuid || []
            this.journal_uuid               = data.journal_uuid || ''
            this.number                     = data.number || ''
            this.abbr                       = data.abbr || ''
            this.transactionDate            = data.transactionDate || new Date().toISOString().substr(0, 10)
            this.customer                   = data.customer || {}
            this.transactionType            = data.transactionType || {}
            this.currency                   = data.currency || {}
            this.exchangeAmount             = data.exchangeAmount || 0
            this.exchangeAmountTxn          = data.exchangeAmountTxn || 0
            this.exchangeRate               = data.exchangeRate || 0
            this.itemLine                   = data.itemLine || []
            this.transactionNote            = data.transactionNote || ''
            this.referenceNo                = data.referenceNo || ''
            this.journalNote                = data.journalNote || ''
            this.total                      = data.total || 0
            this.discount                   = data.discount || 0
            this.exchangeDiscount           = data.exchangeDiscount || 0
            this.penalty                    = data.penalty || 0
            this.exchangePenalty            = data.exchangePenalty || 0
            this.exchangePenaltyTxn         = data.exchangePenaltyTxn || 0
            this.exchangeDiscountTxn        = data.exchangeDiscountTxn || 0
            this.paidAmountTxn              = data.paidAmountTxn || 0
            this.saveOption                 = data.saveOption || 1 // 0: Draft , 1: Save
            this.status                     = data.status || 1 // 0: Pending , 1: Active , 2: Waiting Approval , 3: rejected
            this.formTemplate               = data.formTemplate || {}
            this.type                       = data.type || 'Cash Receipt'
            this.jRaw                       = data.jRaw || []
            this.paidOption                 = data.paidOption || ''
            this.paidOptionText             = data.paidOptionText || {}
            this.dateFormat                 = institute.dateFormat
            this.createdAt                  = data.createdAt || new Date()
            this.loggedUser                 = data.loggedUser || {}
            this.approvedBy                 = data.approvedBy || {}
            this.deleted                    = data.deleted || 0
        }

    constuct(data) {
        this.constructor(data);
    }
}