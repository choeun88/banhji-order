export default class BankAccountType {
    constructor(data = {}) {
        this.uuid       = data.uuid || ''
        this.code       = data.code || ''
        this.type_of    = data.type_of || ''
        this.name       = data.name || ''
    }
    
    constuct(data) {
        this.constructor(data);
    }
}