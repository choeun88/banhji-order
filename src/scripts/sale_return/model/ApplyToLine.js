/* Store */
import { LocationModel, 
    ProductModel, 
    SegmentModel, 
    AccountModel, 
    PaymentTermModel,
    CurrencyModel
} from "@/scripts/model/AppModels"
import LateFee from "@/scripts/model/LateFee"
import PaymentOption from "@/scripts/model/PaymentOption"
import SaleChannel from "@/scripts/model/SaleChannel"
import store from "@/store"
const institute = store.state.institute.institute

export default class ApplyToLine {
    constructor(data = {}) {
        this.id                 = data.id || '' // invoice number
        this.tick               = data.tick || false
        this.crn                = data.crn || ''
        this.customer           = data.customer || Object.assign({})
        this.cashBasicIncomeAcc = data.cashBasicIncomeAcc || []
        this.accReceivable      = new AccountModel(data.accReceivable) || new AccountModel({})
        this.paymentCode        = data.paymentCode || ''
        this.referenceNo        = data.referenceNo || ''
        this.dueDate            = data.dueDate || new Date().toISOString().substring(0, 10)
        this.transactionDate    = data.transactionDate || new Date().toISOString().substring(0, 10)
        this.amount             = data.amount || 0
        this.paidAmount         = data.paidAmount || 0
        this.paidAmountTobase   = data.paidAmountTobase || 0
        this.amountTobePaid     = data.amountTobePaid || 0
        this.paymentOption      = new PaymentOption(data.paymentOption) || new PaymentOption({})
        this.bankReferenceNo    = data.bankReferenceNo || ''
        this.paymentTerm        = new PaymentTermModel(data.paymentTerm) || new PaymentTermModel({})
        this.penalty            = data.penalty || 0
        this.discount           = data.discount || 0
        this.exchangePenalty    = data.exchangePenalty || 0
        this.exchangePenaltyTxn    = data.exchangePenaltyTxn || 0
        this.exchangeDiscountTxn    = data.exchangeDiscountTxn || 0
        this.paidAmountTxn      = data.paidAmountTxn || 0
        this.exchangeDiscount   = data.exchangeDiscount || 0
        this.overDue            = data.overDue || 0
        this.deleted            = data.deleted || 0
        this.rate               = data.rate || 1
        this.rateTobase         = data.rateTobase || 1
        this.txnRate            = data.txnRate || 1
        this.currency           = new CurrencyModel(data.currency) || new CurrencyModel({})
        this.currencyCode       = data.currencyCode || ''
        this.status             = data.status || 0
        this.type               = data.type || ''
        this.transactionType    = data.transactionType || {}
        this.dateFormat         = institute.dateFormat
        this.decimalFormat      = data.decimalFormat
        this.optionType         = data.optionType || ''
        this.segment            = new SegmentModel(data.segment) || new SegmentModel({})
        this.location           = new LocationModel(data.location) || new LocationModel({})
        this.project            = new ProductModel(data.project) || new ProductModel({})
        this.saleChannel        = new SaleChannel(data.saleChannel) || new SaleChannel({})
        this.taxList            = data.taxList || {}
        this.invoiceAmount      = data.invoiceAmount || 0
        this.lateFee            = new LateFee(data.lateFee) || new LateFee({})
        this.nrd                = data.nrd || false,
        this.unearnRevenueAcc   = data.unearnRevenueAcc || {}
    }

    constuct(data) {
        this.constructor(data);
    }
}