/* Cookie */
const cookieJS = require("@/cookie.js");
const { instituteId } = cookieJS.getCookie();

export default class BankTransactionMapping {
    constructor(data = {}) {
        this.uuid               = data.uuid || ''
        this.name               = data.name || ''
        this.type               = data.type || '' // rule/excel_mapping
        this.bank_txn_type      = data.bank_txn_type || '' // Money In/Money Out
        this.bank_uuid          = data.bank_uuid || ''
        this.bank_account_uuid  = data.bank_account_uuid || ''
        this.condition          = data.condition || '' // Logic: AND/OR
        this.criteria           = data.criteria || []
        this.transaction_type   = data.transaction_type || ''
        this.account_uuid       = data.account_uuid || ''
        this.institute_id       = data.institute_id || instituteId
    }
    
    constuct(data) {
        this.constructor(data);
    }
}