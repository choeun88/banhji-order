// import { UserModel, ContactModel, CurrencyModel } from "@/scripts/model/AppModels";
import { UserModel, ContactModel } from "@/scripts/model/AppModels";

// import store from "@/store";
// const institute = store.state.institute.institute;

export default class CashAdvance {
    constructor(data = {}) {
        this.uuid                       = data.uuid || '';
        this.number                     = data.number || '';
        this.ref_number                 = data.ref_number || '';
        this.description                = data.description || '';
        this.currency                   = data.currency || {}//new CurrencyModel(institute.baseCurrency);

        // Advance
        this.advance_date               = data.advance_date || new Date().toISOString().substr(0, 10);
        this.expected_settlement_date   = data.expected_settlement_date || null;
        this.details                    = data.details || [];
        
        // Request Advance
        this.requested_date             = data.requested_date || null;
        this.expected_date              = data.expected_date || null;
        this.purpose                    = data.purpose || '';
        this.request_amount             = data.request_amount || 0;
        this.requested_by               = data.requested_by || new ContactModel();

        // Approve
        this.approve_date               = data.approve_date || null;
        this.approve_amount             = data.approve_amount || 0;
        this.approved_by                = data.approved_by || new ContactModel();

        // Settlement
        this.settled_date               = data.settled_date || null;
        this.settlement_uuid            = data.settlement_uuid || null;
        this.is_settled                 = data.is_settled || 0;
        this.prefix_format              = data.prefix_format || '';

        this.journal_uuid               = data.journal_uuid || '';
        this.institute_id               = data.institute_id || ''//institute.id;
        this.status                     = data.status || '';
        this.is_draft                   = data.is_draft || 0;
        this.is_deleted                 = data.is_deleted || 0;

        //Sidebar
        this.project_uuid               = data.project_uuid || '';
        this.segment_uuid               = data.segment_uuid || '';
        this.location_uuid              = data.location_uuid || '';
        this.month_of                   = data.month_of || '';
        
        // Trackable Entity
        this.created_by                 = data.created_by || new UserModel();
        this.modified_by                = data.modified_by || new UserModel();
        this.created_date               = data.created_date || null;
        this.modified_date              = data.modified_date || null;
    }
    
    constuct(data) {
        this.constructor(data);
    }
}

/*
    //user submitted the request. user point of view should be submitted.
    REQUEST("pending"),
    // request is under reviewing.
    REVIEWING("reviewing"),
    // advance is approved.
    APPROVED("approved"),
    // advance was rejected.
    REJECTED("rejected"),
    // advance is processing the money.
    PROCESSING("processing"),
    // advance cash have been deliver to requester.
    ADVANCED("advanced"),
    SETTLED("settled");
*/