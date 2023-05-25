export default class Customer {
    constructor(data = {}) {
        this.id = data.id || ''
        this.type = data.type || {}
        this.crn = data.crn || ''
        this.isDonor = data.isDonor || false
        this.customerType = data.customerType || {}
        this.number = data.number || ''
        this.subOf = data.subOf || {}
        this.billingType = data.billingType || {}
        this.name = data.name || ''
        this.studentId = data.studentId || '' // from CAMIS
        this.application = data.application || '' // from other third party
        this.registeredDate = data.registeredDate || new Date().toISOString()
        this.alternativeName = data.alternativeName || ''
        this.consumerId = data.consumerId || ''
        this.contactAddress = data.contactAddress || {
            gender: {},
            phoneNumber: '',
            email: '',
            dob: new Date().toISOString().substring(0, 10),
            address: [],
            latitude: '',
            longitude: '',
            website: '',
            description: ''
        }
        this.paymentBilling = data.paymentBilling || {
            customerGroup: {},
            paymentTerm: {},
            priceLevel: {},
            paymentMethod: {},
            assignTo: {},
            warehouse: {},
            discountItem: {},
            creditLimit: 0
        }
        this.accountTax = data.accountTax || {
            receivableAcc: {},
            saleDepositAcc: {},
            saleDiscountAcc: {},
            defaultTax: {},
            expenseAcc: {}
        }
        this.fromInstitute = data.fromInstitute || ''
        this.noteOnInvoice = data.noteOnInvoice || ''
        this.image = data.image || {}
        this.attachFile = data.attachFile || {}
        this.contactPerson = data.contactPerson || []
        this.cashPayment = data.cashPayment || {}
        this.qrPayment = data.qrPayment || {}
        this.billPayment = data.billPayment || {}
        this.bankTransfer = data.bankTransfer || {}
        this.priceLevel = data.priceLevel || {}
        this.taxId = data.taxId || ''
        this.status = data.status || 1
        this.deleted = data.deleted || 0
        this.autoNumber = data.autoNumber || true
        this.paymentTerm = data.paymentTerm || {}

        // Map with B Kethya's fields
        if(data.uuid){
            this.id = data.uuid;
        }else if(data.id){
            this.uuid = data.id;
        }
    }

    constuct(data) {
        this.constructor(data);
    }
}
