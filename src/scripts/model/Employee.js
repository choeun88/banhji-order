export default class Employee {
    constructor(data = {}) {
        this.id                     = data.id || ''
        this.abbr                   = data.abbr || ''
        this.number                 = data.number || ''
        this.prefix                 = data.prefix || {}
        this.employeeId             = data.employeeId || ''
        this.name                   = data.name || ''
        this.firstName              = data.firstName || ''
        this.firstNameLocale        = data.firstNameLocale || ''
        this.lastName               = data.lastName || ''
        this.lastNameLocale         = data.lastNameLocale || ''
        this.gender                 = data.gender || ''
        this.employeeType           = data.employeeType || ''
        this.dob                    = data.dob || new Date().toISOString().substr(0, 10)
        this.identityId             = data.identityId || ''
        this.identityType           = data.identityType || ''
        this.address                = data.address || ''
        this.phone                  = data.phone || ''
        this.email                  = data.email || ''
        this.salaryAcc              = data.salaryAcc || {}
        this.salaryAdvanceAcc       = data.salaryAdvanceAcc || {}
        this.payrollLiabilitie      = data.payrollLiabilitie || {}
        this.image                  = data.image || {}
        this.country                = data.country || {}
        this.nationality            = data.nationality || {}
        this.maritalStatus          = data.maritalStatus || {}
        this.noOfChildren           = data.noOfChildren || 0
        this.bank                   = data.bank || {}
        this.bankAccount            = data.bankAccount || ''
        this.paymentPeriod          = data.paymentPeriod || {}
        this.status                 = data.status || 1
        this.natureEmployee         = data.natureEmployee || ''
        this.paymentMethod          = data.paymentMethod || {}
        this.spouseName             = data.spouseName || ''
        this.spouseGender           = data.spouseGender || ''
        this.spouseNatureEmployee   = data.spouseNatureEmployee || ''
        this.workingStatus          = data.workingStatus || ''
        this.file                   = data.file || ''
        this.attachFile             = data.attachFile || ''
        this.loggedUser             = data.loggedUser || {}
        
        // Map with B Kethya's fields
        if(data.uuid){
            this.id = data.uuid;
        }else if(data.id){
            this.uuid = data.id;
        }

        // if(data.number){
        //     this.employeeId = data.abbr + data.prefix.separator + data.number;
        // }
    }

    constuct(data) {
        this.constructor(data);
    }
}