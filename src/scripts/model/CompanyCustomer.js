export default class CompanyCustomer {
    constructor(data = {}) {
        this.id                 = data.id || ""
        this.name               = data.name || ""
        this.alternativeName    = data.alternativeName || ""
        this.customerType       = data.customerType || {}
        this.type               = data.type || "" 
        this.crn                = data.crn || ""    
        this.isDonor            = data.isDonor || false   
        this.number             = data.number || ""    
        this.instituteId        = data.instituteId || "" 
        this.subOfCustomer      = data.subOfCustomer || ""
        this.registeredDate     = data.registeredDate || ""
        this.billingType        = data.billingType || ""
        this.consumerId         = data.consumerId || ""
        this.taxId              = data.taxId || ""
        this.contactAddress     = data.contactAddress || {}
        this.paymentBilling     = data.paymentBilling || {}
        this.accountTax         = data.accountTax || {}
        this.noteOnInvoice      = data.noteOnInvoice || ""
        this.contactPerson      = data.contactPerson || ""
        this.file               = data.file || ""
        this.image              = data.image || ""
        this.attachFile         = data.attachFile || {}
        this.loggedUser         = data.loggedUser || {}
        this.priceLevel         = data.priceLevel || {}
        this.cashPayment        = data.cashPayment || {}
        this.qrPayment          = data.qrPayment || {}
        this.bankTransfer       = data.bankTransfer || {}
        this.billPayment        = data.billPayment || {}
    }

    constuct(data) {
        this.constructor(data);
    }
}