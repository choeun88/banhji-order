import AccountGroupModel from "@/scripts/model/AccountGroup.js";
import AccountTypeModel from "@/scripts/model/AccountType.js";
import UserModel from "@/scripts/model/User.js";

/* Cookie */
const cookieJS = require("@/cookie.js");
const { instituteId } = cookieJS.getCookie();

export default class Account {
    constructor(data = {}) {
        this.uuid               = data.uuid || ''
        this.primary_account_uuid = data.primary_account_uuid || ''
        this.secondary_type_uuid = data.secondary_type_uuid || ''
        this.type_code          = data.type_code || 0
        this.group_code         = data.group_code || 0
        this.banhjiAccCode      = data.banhjiAccCode || ''
        this.banhji_account_number = data.banhji_account_number || ''
        this.number             = data.number || ''
        this.name               = data.name || ''
        this.local_name         = data.local_name || ''
        this.description        = data.description || ''
        this.balance_as_of      = data.balance_as_of || 0
        this.base_currency_balance = data.base_currency_balance || 0
        // this.base_currency_sub_total = data.base_currency_sub_total || [0]
        // this.other_currency_sub_total = data.other_currency_sub_total || [0]
        this.institute          = data.institute || instituteId // uuid
        this.account_type       = Object.assign({}, new AccountTypeModel(data.account_type))
        this.account_group      = Object.assign({}, new AccountGroupModel(data.account_group))
        this.parent_account     = data.parent_account || {}
        this.bank_account       = data.bank_account || {}
        this.reconcile_require  = data.reconcile_require || 0
        this.status             = data.status || 1
        this.is_secondary       = data.is_secondary || 0
        this.is_taxable         = data.is_taxable || 0
        this.is_in_used         = data.is_in_used || 0
        this.is_deleted         = data.is_deleted || 0
        this.is_deleteable      = data.is_deleteable || 0

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