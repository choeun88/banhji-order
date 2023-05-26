import { AccountModel } from "@/scripts/model/AppModels";

export default class PaymentOption {
    constructor(data = {}) {
        this.id         = data.id || ''
        this.code       = data.code || ''
        this.name       = data.name || ''
        this.type       = data.type || ''
        this.optionType = data.optionType || ''
        this.bank       = data.bank || []
        this.account    = data.account || new AccountModel()

        // Map with B Kethya's fields
        if(data.uuid){
            this.id = data.uuid;
        }else if(data.id){
            this.uuid = data.id;
        }
    }
    
    constuct(data) {
        this.constructor(data)
    }
}