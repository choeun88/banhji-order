import { SupplierModel, AccountModel, CurrencyModel, ContactModel, UserModel } from "@/scripts/model/AppModels";

/* Cookie */
// const cookieJS = require("@/cookie.js");
// const { instituteId } = cookieJS.getCookie();

export default class Expense {
    constructor(data = {}) {
        this.uuid                       = data.uuid || ''
        this.journal_uuid               = data.journal_uuid || ''
        this.number                     = data.number || ''
        this.expense_date               = data.expense_date || new Date().toISOString().substr(0, 10)
        this.due_date                   = data.due_date || new Date().toISOString().substr(0, 10)
        this.bill_date                  = data.bill_date || new Date().toISOString().substr(0, 10)
        this.bill_number                = data.bill_number || ''
        this.bill_currency              = data.bill_currency || new CurrencyModel()
        this.supplier                   = data.supplier || Object.assign({}, new ContactModel())
        this.employee                   = data.employee || Object.assign({}, new ContactModel())
        this.payment_term               = data.payment_term || '' //uuid
        this.segment_uuid               = data.segment_uuid || ''
        this.location_uuid              = data.location_uuid || ''
        this.project_uuid               = data.project_uuid || ''
        this.month_of                   = data.month_of || ''
        this.additional_cost_supplier   = data.additional_cost_supplier || new SupplierModel()
        this.use_for_option             = data.use_for_option || 0 // 0=Credit, 1=Reimburst, 2=Cash Advance
        // this.made_with_option           = data.made_with_option || 0 // 1=Credit, 2=R/C
        this.transaction_account        = data.transaction_account || Object.assign({}, new AccountModel())
        this.use_for_transaction_uuid   = data.use_for_transaction_uuid || ''
        this.exp_summary_uuid           = data.exp_summary_uuid || ''
        this.voucher_note               = data.voucher_note || ''
        this.journal_note               = data.journal_note || ''
        this.expense_entries            = data.expense_entries || []
        this.template                   = data.template || null
        this.prefix_format              = data.prefix_format || ""
        this.institute_id               = data.institute_id || ''//instituteId
        this.is_draft                   = data.is_draft || 0
        this.is_cleared                 = data.is_cleared || 0 // 0 = open, 1 = paid

        // Trackable Entity
        this.created_by                 = data.created_by || Object.assign({}, new UserModel());
        this.modified_by                = data.modified_by || Object.assign({}, new UserModel());
        this.created_date               = data.created_date || null;
        this.modified_date              = data.modified_date || null;
    }
    
    constuct(data) {
        this.constructor(data);
    }
}