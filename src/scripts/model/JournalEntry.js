import kendo from "@progress/kendo-ui";
import { AccountModel, CurrencyModel, ContactModel, UserModel } from "@/scripts/model/AppModels";

/* Cookie */
const cookieJS = require("@/cookie.js");
const { instituteId } = cookieJS.getCookie();

export default class JournalEntry {
    /*
    * data should be the data that send back from server side which has the same.
    * when data doesn't have the fields the object will ignore that field.
    */
    constructor (data = {}) {
        this.uuid                   = data.uuid || '';
        this.journal_uuid           = data.journal_uuid || '';
        this.account                = data.account || Object.assign({}, new AccountModel());
        this.account_uuid           = data.account_uuid || this.account.uuid;
        this.secondary_acc_uuid     = data.secondary_acc_uuid || ''
        this.description            = data.description || '';
        this.primary_contact        = data.primary_contact || Object.assign({}, new ContactModel());
        this.secondary_contacts     = data.secondary_contacts || [];
        this.ref_number             = data.ref_number || '';// Uses: [contract_number in Fund Receipt,...]
        this.amount                 = kendo.parseFloat(data.amount) || 0;
        this.tax_code               = data.tax_code || '';
        this.payment_method         = data.payment_method || {};
        this.currency               = data.currency || Object.assign({}, new CurrencyModel());
        this.exchange_rate_uuid     = data.exchange_rate_uuid || '';
        this.exchange_rate          = kendo.parseFloat(data.exchange_rate) || 0;
        this.exchanged_amount       = kendo.parseFloat(this.amount) * kendo.parseFloat(this.exchange_rate);
        this.tax_amount             = kendo.parseFloat(data.tax_amount) || 0;
        this.exchanged_tax_amount   = kendo.parseFloat(this.tax_amount) * kendo.parseFloat(this.exchange_rate);
        this.is_reconciled          = data.is_reconciled || 0;
        this.is_settled             = data.is_settled || 0; // for advance settlement & reimbursement
        this.class_1_uuid           = data.class_1_uuid || '';
        this.class_2_uuid           = data.class_2_uuid || '';
        this.class_3_uuid           = data.class_3_uuid || '';
        this.class_4_uuid           = data.class_4_uuid || '';
        this.class_5_uuid           = data.class_5_uuid || '';
        this.payment_method_as      = data.payment_method_as || '';
        this.institute_id           = data.institute_id || instituteId;
        this.is_deleted             = data.is_deleted || 0;

        // Trackable Entity
        this.created_by 			= data.created_by || Object.assign({}, new UserModel());
        this.modified_by            = data.modified_by || Object.assign({}, new UserModel());
        this.created_date           = data.created_date || null;
        this.modified_date          = data.modified_date || null;
    }

    construct(data) {
        this.constructor(data);
    }
}
