import { UserModel } from "@/scripts/model/AppModels";

/* Cookie */
const cookieJS = require("@/cookie.js");
const { instituteId } = cookieJS.getCookie();

export default class VarianceRule {
    constructor(data = {}) {
        this.uuid               = data.uuid || ''
        this.name               = data.name || ''
        this.period             = data.period || ''
        this.rule               = data.rule || ''
        this.value              = data.value || 0
        this.account_group_code = data.account_group_code || 0
        this.segment_uuuid      = data.segment_uuuid || ''
        this.institute_id       = data.institute_id || instituteId // uuid
        this.is_deleted         = data.is_deleted || 0

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