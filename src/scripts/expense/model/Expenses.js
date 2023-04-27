import {ExpenseEntryExtendedModel} from "@/scripts/model/AppModels";

/* Store */
// import store from "@/store"
// const institute = store.state.institute.institute

export default class Expenses {
    constructor(data = {}) {
            this.id                         = data.id || ''
            this.uuid                       = data.uuid || '' // expense id from accounting service
            this.type                       = data.type || ''
            this.journal_uuid               = data.journal_uuid || ''
            this.number                     = data.number || ''
            this.paymentCode                = data.paymentCode || ''
            this.referenceNo                = data.referenceNo || ''
            this.abbr                       = data.abbr || ''
            this.transactionDate            = data.transactionDate || new Date().toISOString().substr(0, 10)
            this.dueDate                    = data.dueDate || new Date().toISOString().substr(0, 10)
            this.monthOf                    = data.monthOf || new Date().toISOString().substr(0, 10)
            this.billDate                   = data.billDate || new Date().toISOString().substr(0, 10)
            this.billNumber                 = data.billNumber || ''
            this.additionalCostSupplier     = data.additionalCostSupplier || {}
            this.useForOption               = data.useForOption || 0 // 0=None, 1=Reimburst, 2=Cash Advance
            this.use_for_transaction_uuid   = data.use_for_transaction_uuid || 0
            // this.madeWithOption             = data.madeWithOption || 0 // 0=Credit, 1=R/C
            this.supplier                   = data.supplier || {}
            this.transactionType            = data.transactionType || {}
            this.paymentTerm                = data.paymentTerm || {}
            this.transactionNote            = data.transactionNote || ''
            this.journalNote                = data.journalNote || ''

            this.currency                   = data.currency || {}
            this.baseCurrency               = data.baseCurrency || {}

            this.rate                       = data.rate || 1
            this.txnRate                    = data.txnRate || 1
            this.exchangeRate               = data.exchangeRate || {}
            this.exchangeAmount             = data.exchangeAmount || 0

            this.itemLines                  = data.itemLines || new ExpenseEntryExtendedModel()
            this.account                    = data.account || {} // expenses are made with account

            this.segment                    = data.segment || {}
            this.location                   = data.location || {}
            this.project                    = data.project || {}
            this.employee                   = data.employee || {}
            this.supplierDiscountItem       = data.supplierDiscountItem || []

            this.subTotal                   = data.subTotal || 0
            this.total                      = data.total || 0
            this.exchangeTotal              = data.exchangeTotal || 0
            this.discountTotal              = data.discountTotal || 0
            this.purchaseTax                = data.purchaseTax || 0
            this.whdTax                     = data.whdTax || 0
            this.depositAmount              = data.depositAmount || 0
            this.depositDeduction           = data.depositDeduction || 0
            this.exchangeDepositDeduction   = data.exchangeDepositDeduction || 0
            this.remainingAmount            = data.remainingAmount || 0
            this.amountDue                  = data.amountDue || 0

            this.saveOption                 = data.saveOption || 1 // 0: Draft , 1: Save
            this.status                     = data.status || 1 // 0: Pending , 1: Active , 2: Waiting Approval , 3: rejected
            this.approvedBy                 = data.approvedBy || {}
            this.rejectedBy                 = data.rejectedBy || {}
            this.formTemplate               = data.formTemplate || {}
            this.loggedUser                 = data.loggedUser || {}

            this.dateFormat                 = data.dateFormat || '' //institute.dateFormat
            this.createdAt                  = data.createdAt || new Date()
            this.saveSend                   = data.saveSend || false
            this.deleted                    = data.deleted || 0
            this.usedForPurchase            = data.usedForPurchase || 1

            this.saleTaxDetail              = data.saleTaxDetail || []
            this.refFrom                    = data.refFrom || []
            this.purchaseOrder              = data.purchaseOrder || {}
        }

    constuct(data) {
        this.constructor(data);
    }
}