/* Store */
import store from "@/store"
const institute = store.state.institute.institute

export default class CreditMemo {
    constructor(data = {}) {
            this.id                         = data.id || ''
            this.uuid                       = data.uuid || '' // qldb id
            this.journal_uuid               = data.journal_uuid || ''
            this.number                     = data.number || ''
            this.referenceNo                = data.referenceNo || ''
            this.abbr                       = data.abbr || ''
            this.transactionDate            = data.transactionDate || new Date().toISOString().substring(0, 10)
            this.customer                   = data.customer || {}
            this.transactionType            = data.transactionType || {}
            this.priceLevel                 = data.priceLevel || {}
            this.currency                   = data.currency || {}
            this.txnRate                    = data.txnRate || 1

            this.amount                     = data.amount || 0
            this.exchangeAmount             = data.exchangeAmount || 0
            this.variance                   = data.variance || 0
            this.varianceAcc                = data.varianceAcc || {}
            this.exchangeVariance           = data.exchangeVariance || 0
            this.exchangeRate               = data.exchangeRate || {}


            this.itemLineAmount             = data.itemLineAmount || 0
            this.itemLineExchangeAmount     = data.itemLineExchangeAmount || 0
            this.itemLineDiscountAmount     = data.itemLineDiscountAmount || 0
            this.itemLineTaxAmount          = data.itemLineTaxAmount || 0
            this.itemLineSubTotal           = data.itemLineSubTotal || 0
            this.otherChargeTotal           = data.otherChargeTotal || 0

            this.applyToAmount              = data.applyToAmount || 0
            this.applyToExchangeAmount      = data.applyToExchangeAmount || 0

            this.depositAmount              = data.depositAmount || 0
            this.exchangeDepositDeduction      = data.exchangeDepositDeduction || 0
            this.refundAmount               = data.refundAmount || 0
            this.exchangeRefundAmount       = data.exchangeRefundAmount || 0
            this.varianceAcc                = data.varianceAcc || 0

            this.itemLines                  = data.itemLines || {}
            this.applyToLines               = data.applyToLines || {}
            this.depositLines               = data.depositLines || {}
            this.cashRefundLines            = data.cashRefundLines || {}
            // this.accountLines               = data.accountLines || {}


            this.segment                    = data.segment || {}
            this.location                   = data.location || {}
            this.project                    = data.project || {}
            this.employee                   = data.employee || {}
            this.status                     = data.status || 1 // 0: Pending , 1: Active , 2: Waiting Approval , 3: rejected
            this.approvedBy                 = data.approvedBy || {}
            this.rejectedBy                 = data.rejectedBy || {}
            this.formTemplate               = data.formTemplate || {}
            this.type                       = data.type || ''
            this.transactionNote            = data.transactionNote || ''
            this.journalNote                = data.journalNote || ''
            this.loggedUser                 = data.loggedUser || {}
            this.createdAt                  = data.createdAt || new Date().toISOString().substring(0, 10)
            this.dateFormat                 = institute.dateFormat || 'dd-MM-yyyy'

            this.itemSubtotal                   = data.itemSubtotal || 0
            this.serviceSubtotal                = data.serviceSubtotal || 0
            this.exchangeItemSubtotal           = data.exchangeItemSubtotal || 0
            this.exchangeServiceSubtotal        = data.exchangeServiceSubtotal || 0

            this.txnItmSubtotal                 = data.txnItmSubtotal || 0
            this.exchangeTxnItmSubtotal         = data.exchangeTxnItmSubtotal || 0

            this.itemDiscount                   = data.itemDiscount || 0
            this.exchangeItemDiscount           = data.exchangeItemDiscount || 0

            this.serviceDiscount                = data.serviceDiscount || 0
            this.exchangeServiceDiscount        = data.exchangeServiceDiscount || 0

            this.txnItmDiscount                 = data.txnItmDiscount || 0
            this.exchangeTxnItmDiscount         = data.exchangeTxnItmDiscount || 0
            this.reason                         = data.reason || ''

            this.saleTaxDetail                  = data.saleTaxDetail || []
            this.refFrom                        = data.refFrom || []
            this.refTo                          = data.refTo || []
            this.customerDiscountItem           = data.customerDiscountItem || []
            this.inclusiveTaxAmount             = data.inclusiveTaxAmount || []
            this.withholdingTaxAmount           = data.withholdingTaxAmount || []
            this.customerOtherChargeItem        = data.customerOtherChargeItem || []
            this.filterBy                       = data.filterBy || 'Name'
            this.offsetInvoice                  = data.offsetInvoice || {}
        }

    constuct(data) {
        this.constructor(data);
    }
}