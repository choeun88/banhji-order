/* Store */
import store from "@/store"
import CustomerModel from "@/scripts/model/Customer";
const institute = store.state.institute.institute
export default class Invoice {
    constructor(data = {}) {
            this.id                         = data.id || ''
            this.uuid                       = data.uuid || '' // qldb id
            this.type                       = data.type || ''
            this.journal_uuid               = data.journal_uuid || ''
            this.number                     = data.number || ''
            this.referenceNo                = data.referenceNo || ''
            this.abbr                       = data.abbr || ''
            this.transactionDate            = data.transactionDate || new Date().toISOString().substring(0, 10)
            this.transactionDateTZ          = data.transactionDateTZ || new Date().toISOString()
            this.dueDate                    = data.dueDate || new Date().toISOString().substring(0, 10)
            this.monthOf                    = data.monthOf || new Date().toISOString().substring(0, 10)
            this.customer                   = data.customer ||new CustomerModel({})
            this.transactionType            = data.transactionType || {}
            this.paymentTerm                = data.paymentTerm || {}
            this.approvedTerm               = data.approvedTerm || {}
            this.discountPromotion          = data.discountPromotion || {}
            this.receivableAcc              = data.receivableAcc || {}
            this.unearnRevenueAcc           = data.unearnRevenueAcc || {} // for revenue recognition
            this.currency                   = data.currency || {}
            this.baseCurrency               = data.baseCurrency || {}
            this.rate                       = data.rate || 1
            this.txnRate                    = data.txnRate || 1
            this.taxExchangeRate            = data.taxExchangeRate || {}
            this.exchangeRate               = data.exchangeRate || {}
            this.exchangeRateDeposit        = data.exchangeRateDeposit || {}
            this.exchangeAmount             = data.exchangeAmount || 0
            this.priceLevel                 = data.priceLevel || {}
            this.itemLines                  = data.itemLines || {}
            this.segment                    = data.segment || {}
            this.location                   = data.location || {}
            this.project                    = data.project || {}
            this.saleChannel                = data.saleChannel || {}
            this.employee                   = data.employee || {}
            this.billingAddress             = data.billingAddress || {}
            this.deliveryAddress            = data.deliveryAddress || {}
            this.deliveryDateTime           = data.deliveryDateTime || new Date().toISOString().substring(0, 10)
            this.transactionNote            = data.transactionNote || ''
            this.journalNote                = data.journalNote || ''
            this.subTotal                   = data.subTotal || 0
            this.exchangeSubTotal           = data.exchangeSubTotal || 0
            this.total                      = data.total || 0
            this.exchangeTotal              = data.exchangeTotal || 0
            this.discountTotal              = data.discountTotal || 0
            this.otherChargeTotal           = data.otherChargeTotal || 0
            this.specificDiscountTotal      = data.specificDiscountTotal || 0
            this.deliveryFee                = data.deliveryFee || 0
            this.totalTaxAmount             = data.totalTaxAmount || 0
            this.depositAmount              = data.depositAmount || 0
            this.depositDeduction           = data.depositDeduction || 0
            this.exchangeDepositDeduction   = data.exchangeDepositDeduction || 0
            this.remainingAmount            = data.remainingAmount || 0
            this.amountDue                  = data.amountDue || 0
            this.currentBalance             = data.currentBalance || 0
            this.balance                    = data.balance || 0
            this.creditLimit                = data.creditLimit || 0
            this.saveOption                 = data.saveOption || 1 // 0: Draft , 1: Save
            this.status                     = data.status || 1 // 0: Pending , 1: Active , 2: Waiting Approval , 3: rejected
            this.approvedBy                 = data.approvedBy || {}
            this.rejectedBy                 = data.rejectedBy || {}
            this.formTemplate               = data.formTemplate || {}
            this.specificDiscountItem       = data.specificDiscountItem || {}
            this.otherCharge                = data.otherCharge || []
            this.otherChargeLine            = data.otherChargeLine || []
            this.otherChargeAmount          = data.otherChargeAmount || 0
            this.paymentOptionOnline        = data.paymentOptionOnline || {}
            this.paymentOptionKHQR          = data.paymentOptionKHQR || {}
            this.paymentOptionWBMobile      = data.paymentOptionWBMobile || {}
            this.paymentOptionBankTransfer  = data.paymentOptionBankTransfer || {}
            this.lateFee                    = data.lateFee || {}
            this.paymentCode                = data.paymentCode || ''
            this.publicLink                 = data.publicLink || ''
            this.taxListTotal               = data.taxListTotal || {}
            this.dateFormat                 = institute.dateFormat
            this.createdAt                  = data.createdAt || new Date()
            this.saveSend                   = data.saveSend || false
            this.deleted                    = data.deleted || 0
            this.dr                             = data.dr || 0
            this.cr                             = data.cr || 0
            this.jRaw                           = data.jRaw || 0
            this.paymentScheme                  = data.paymentScheme || {
                    method: {}, number: 1
            }

            this.sourceTransaction              = data.sourceTransaction || [] // ref to Sale Order
            this.attachment                     = data.attachment || {}

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
            this.billPayment                    = data.billPayment || {}
            this.qrPayment                      = data.qrPayment || {}
            this.bankTransfer                   = data.bankTransfer || {}
            this.cashPayment                    = data.cashPayment || {}
            this.cardPayment                    = data.cardPayment || {}

            this.refFrom                        = data.refFrom || []
            this.refTo                          = data.refTo || []
            this.saleTaxDetail                  = data.saleTaxDetail || []
            this.cashBasicIncomeAcc             = data.cashBasicIncomeAcc || []
            this.OtherChargeAmount              = data.OtherChargeAmount || 0

            this.isJournal                      = data.isJournal || 1 // [ 0 = no record journal, 1 = record journal]
            this.journalStatus                  = data.journalStatus || 0 // [ 0 = no journal , 1 = journal success , 2 = journal error ]
            this.batchNumber                    = data.batchNumber || '' // reference number from billing app
            this.filterBy                       = data.filterBy || 'Name',
            this.nrd                            = data.nrd || false // Non refundable deposit
            this.dnReason                       = data.dnReason || '' // Debit Note reason
            this.invoiceRefNum                  = data.invoiceRefNum || {} // Debit Note
            this.nrdRefNum                      = data.nrdRefNum || {} // Revenue recognition
            this.doRefNum                       = data.doRefNum || {} // reference sale oder from Delivery order
            this.tobeAdd                        = data.tobeAdd || 'Sale Order' // to be add from Sale orde or Delivery order
            this.deliveryTime                   = data.deliveryTime || new Date()
            this.txnDateDeposit                 = data.txnDateDeposit || new Date()
            this.refNum                         = data.refNum || '' // RUPP
            this.studentId                      = data.studentId || '' // RUPP
            this.subscriptions                  = data.subscriptions || [] // Subscriptions

            this.saleOder                       = data.saleOder || {}
            this.deliveryOrder                  = data.deliveryOrder || []
            this.cfNumber                       = data.cfNumber || '' // Delivery order confirmation number
            this.cfDate                         = data.cfDate || new Date().toISOString().substring(0, 10) // Delivery order confirmation date
            this.totalQty                       = data.totalQty || 0 // for delivery order
            this.cfirmdo                        = data.cfirmdo || 0 // confirm do qty
            
            this.so                             = data.so || 0 // sale order when add delivery order
            this.selectedDOIds                  = data.selectedDOIds || [] // sale order when add delivery order
            this.dos                            = data.dos || [] // sale order when add delivery orders
            this.doLines                        = data.doLines || [] // sale order when add delivery orders
        }
    constuct(data) {
        this.constructor(data);
    }
}