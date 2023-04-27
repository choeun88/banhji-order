import { UserModel, AccountModel, ContactModel, JournalModel, JournalEntryModel } from "@/scripts/model/AppModels";

/* Cookie */
const cookieJS = require("@/cookie.js");
const { instituteId } = cookieJS.getCookie();

export default class AdvanceSettlement {
    constructor(data = {}) {
        this.uuid                       = data.uuid || ''
        this.number                     = data.number || ''
        this.description                = data.description || ''

        this.cash_advance_uuid          = data.cash_advance_uuid || ''
        this.settlement_date            = data.settlement_date || new Date().toISOString().substr(0, 10)
        this.settled_by                 = data.settled_by || new ContactModel() // Employee
        this.institute_id               = data.institute_id || instituteId

        this.cash_account               = data.cash_account || new AccountModel()
        this.cash_amount                = data.cash_amount || 0.00

        this.journal                    = data.journal || new JournalModel()
        this.journal_entries            = data.journal_entries || [new JournalEntryModel()]
        this.is_draft                   = data.is_draft || 0
        this.is_deleted                 = data.is_deleted || 0
        this.prefix_format              = data.prefix_format || '';

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