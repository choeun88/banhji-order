// import { LoanTypeModel, AccountModel, PaymentTermModel, CurrencyModel } from "@/scripts/model/AppModels";

/* Cookie */
const cookieJS = require("@/cookie.js");
const { instituteId } = cookieJS.getCookie();

export default class Loan {
    /*
    * data should be the data that send back from server side which has the same.
    * when data doesn't have the fields the Loan object will ignore that field.
    */
    constructor (data = {}) {
        this.uuid = data.uuid || ''
        this.number = data.number || ''
        this.name = data.name || ''
        this.description = data.description || ''
        this.date = data.date || ''
        this.request_date = data.request_date || ''
        this.approved_date = data.approved_date || ''
        this.active_date = data.active_date || ''
        this.closeDate = data.close_date || ''
        this.expiry_date = data.expiry_date || ''
        this.first_payment_date = data.first_payment_date || ''
        this.duration = data.duration || 0
        this.type = data.type || {}
        this.status = data.status || ''
        this.request_amount = data.request_amount || 0
        this.approved_amount = data.approved_amount || 0
        this.outstanding_amount = data.outstanding_amount || 0
        this.available_credit = data.available_credit || 0
        this.interest_rate = data.interest_rate || 0.00
        this.monthly_repayment = data.monthly_repayment || 0
        this.bank = data.bank || {}
        this.currency = data.currency || {}
        this.account = data.account || {}
        this.payment_term = data.payment_term || {}
        this.details = data.details || []
        this.schedule = data.schedule || []
        this.institute_id = data.institute_id || instituteId
    }

    construct(data) {
        this.constructor(data)
    }

}
