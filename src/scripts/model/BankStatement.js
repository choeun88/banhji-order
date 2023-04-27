import { UserModel } from "@/scripts/model/AppModels";

/* Cookie */
const cookieJS = require("@/cookie.js");
const { instituteId } = cookieJS.getCookie();

export default class BankStatement {
    constructor(data = {}) {
        this.uuid               = data.uuid || ''
        this.bank_uuid          = data.bank_uuid || ''
        this.bank_acc_uuid      = data.bank_acc_uuid || ''
        this.reconcile_uuid     = data.reconcile_uuid || '' // if has = reconciled
        this.journal_entry_uuid = data.journal_entry_uuid || ''
        this.bank_acc_number    = data.bank_acc_number || ''
        this.transaction_type   = data.transaction_type || ''
        this.statement_date     = data.statement_date || null
        this.entry_date         = data.entry_date || null
        this.details            = data.details || ''
        this.extra_details      = data.extra_details || ''
        this.funds_code         = data.funds_code || ''
        this.bank_ref           = data.bank_ref || ''
        this.amount             = data.amount || 0
        this.balance            = data.balance || 0
        this.currency           = data.currency || ''
        this.source             = data.source || '' // bank_feed / imported
        this.institute_id       = data.institute_id || instituteId
        this.is_reversal        = data.is_reversal || 0

        // Trackable Entity
        this.created_by                 = data.created_by || new UserModel();
        this.modified_by                = data.modified_by || new UserModel();
        this.created_date               = data.created_date || null;
        this.modified_date              = data.modified_date || null;
    }
    
    constuct(data) {
        this.constructor(data)
    }
}