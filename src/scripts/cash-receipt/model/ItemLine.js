/* Store */
import store from "@/store"
const institute = store.state.institute.institute

export default class ItemLine {
    constructor(data = {}) {
        this.id                 = data.id || '' // invoice number
        this.lineId             = data.lineId || ''
        this.tick               = data.tick || false
        this.refNum             = data.refNum || ''
        this.crn                = data.crn || ''
        this.customer           = data.customer || {}
        this.cashBasicIncomeAcc = data.cashBasicIncomeAcc || []
        this.receivableAcc      = data.receivableAcc || {}
        this.unearnRevenueAcc   = data.unearnRevenueAcc || {}
        this.paymentCode        = data.paymentCode || ''
        this.referenceNo        = data.referenceNo || ''
        this.dueDate            = data.dueDate || new Date().toISOString().substring(0, 10)
        this.transactionDate    = data.transactionDate || new Date().toISOString().substring(0, 10)
        this.amount             = data.amount || 0
        this.paidAmount         = data.paidAmount || 0
        this.paidAmountTobase   = data.paidAmountTobase || 0
        this.amountTobePaid     = data.amountTobePaid || 0
        this.paymentOption      = data.paymentOption || {}
        this.bankReferenceNo    = data.bankReferenceNo || ''
        this.paymentTerm        = data.paymentTerm || {}
        this.penalty            = data.penalty || 0
        this.discount           = data.discount || 0
        this.exchangePenalty    = data.exchangePenalty || 0
        this.exchangePenaltyTxn = data.exchangePenaltyTxn || 0
        this.exchangeDiscountTxn= data.exchangeDiscountTxn || 0
        this.paidAmountTxn      = data.paidAmountTxn || 0
        this.exchangeDiscount   = data.exchangeDiscount || 0
        this.overDue            = data.overDue || 0
        this.deleted            = data.deleted || 0
        this.rate               = data.rate || 1
        this.rateTobase         = data.rateTobase || 1
        this.txnRate            = data.txnRate || 1
        this.txnNote            = data.txnNote || ''
        this.exchangeRate       = data.exchangeRate || {}
        this.currency           = data.currency || {}
        this.currencyCode       = data.currencyCode || ''
        this.status             = data.status || 0
        this.type               = data.type || ''
        this.transactionType    = data.transactionType || {}
        this.dateFormat         = institute.dateFormat
        this.decimalFormat      = data.decimalFormat
        this.optionType         = data.optionType || ''
        this.segment            = data.segment || {}
        this.location           = data.location || {}
        this.project            = data.project || {}
        this.saleChannel        = data.saleChannel || {}
        this.taxList            = data.taxList || {}
        this.invoiceAmount      = data.invoiceAmount || {}
        this.lateFee            = data.lateFee || {}
        this.nrd                = data.nrd || false
        this.subscriptions      = data.subscriptions || ''
    }

    constuct(data) {
        this.constructor(data);
    }
}