import kendo from "@progress/kendo-ui";
import Helper from "@/helper.js";
import { UserModel } from "@/scripts/model/AppModels";

/* Store */
// import store from "@/store"
// const institute = store.state.institute.institute

export default class Journal {
    constructor(data = {}) {
        this.uuid                       = data.uuid || '';
        this.number                     = data.number || '';
        this.description                = data.description || '';
        this.journal_type               = data.journal_type || '';
        this.journal_date               = data.journal_date || new Date().toISOString().substr(0, 10)
        this.month_of                   = data.month_of || '';
        this.currency_code              = data.currency_code || '';
        this.buinsess_unit_uuid         = data.buinsess_unit_uuid || '';
        this.location_uuid              = data.location_uuid || '';
        this.project_uuid               = data.project_uuid || '';
        this.segment_uuid               = data.segment_uuid || '';
        this.journal_entries            = data.journal_entries || [];
        this.transaction_type           = data.transaction_type || null;
        this.transaction_sources        = data.transaction_sources || [];
        this.cash_advance               = data.cash_advance || ''; // uuid
        // this.ref_number                 = data.ref_number || '';
        this.link_transaction           = data.link_transaction || '';
        this.referral_transaction_uuid  = data.referral_transaction_uuid || ''; // Could be InvoiceId, CashAdvanceId...
        this.institute                  = data.institute || ''//institute.id;
        this.fiscal_year                = Helper.getFiscalDateByDate(this.journal_date);
        this.is_draft                   = data.is_draft || 0;
        this.is_reversed                = data.is_reversed || 0;
        this.is_deleted                 = data.is_deleted || 0;
        this.prefix_format              = data.prefix_format || '';
        this.base_currency              = data.base_currency || ''//institute.baseCurrency;

        // Trackable Entity
        this.created_by                 = data.created_by || new UserModel();
        this.modified_by                = data.modified_by || new UserModel();
        this.created_date               = data.created_date || null;
        this.modified_date              = data.modified_date || null;

        // Month Of
        if(data.journal_date && data.month_of === ''){
            this.month_of = kendo.toString(new Date(data.journal_date), 'yyyy-MM');
        }
    }
    
    constuct(data) {
        this.constructor(data);
    }
}