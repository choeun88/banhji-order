import AccountTypeModel from "@/scripts/model/AccountType";
import UserModel from "@/scripts/model/User";

/* Cookie */
const cookieJS = require("@/cookie.js");
const { instituteId } = cookieJS.getCookie();

export default class AccountGroup {
    constructor(data = {}) {
        this.uuid               = data.uuid || ''
        this.primary_group_uuid = data.primary_group_uuid || ''
        this.code               = data.code || 0
        this.type_code          = data.type_code || 0
        this.name               = data.name || ''
        this.local_name         = data.local_name || ''
        this.description        = data.description || ''
        this.institute_id       = data.institute_id || instituteId
        this.accounts           = data.accounts || []
        this.account_type       = Object.assign({}, new AccountTypeModel(data.account_type))

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