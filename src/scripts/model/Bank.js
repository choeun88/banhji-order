/* Cookie */
const cookieJS = require("@/cookie.js");
const { instituteId } = cookieJS.getCookie();

export default class Bank {
    constructor(data = {}) {
        this.uuid           = data.uuid || ''
        this.abbr           = data.abbr || ''
        this.number         = data.number || ''
        this.name           = data.name || ''
        this.address        = data.address || ''
        this.phone          = data.phone || ''
        this.email          = data.email || ''        
        this.swift_code     = data.swift_code || ''
        this.institute_id   = data.institute_id || instituteId       
        this.is_deleted     = data.is_deleted || 0
    }
    
    constuct(data) {
        this.constructor(data);
    }
}