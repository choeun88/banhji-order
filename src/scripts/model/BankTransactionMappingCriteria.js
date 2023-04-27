export default class BankTransactionMappingCriteria {
    constructor(data = {}) {
        this.uuid               = data.uuid || ''
        this.field              = data.field || ''
        this.field2             = data.field2 || ''
        this.operator           = data.operator || ''
        this.value              = data.value || ''
    }
    
    constuct(data) {
        this.constructor(data);
    }
}