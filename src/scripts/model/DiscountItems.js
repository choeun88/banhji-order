import { AccountModel } from "@/scripts/model/AppModels";

export default class DiscountItems {
    constructor(data = {}) {
        this.id = data.id || ''
        this.code = data.code || ''
        this.name = data.name || ''
        this.amount = data.amount || 0
        this.nature = data.nature || ''
        this.description = data.description || ''
        this.account = data.account || new AccountModel()
        this.status = data.status || 1
        this.type = data.type || ''
        

        // Map with B Kethya's fields
        if(data.uuid){
            this.id = data.uuid;
        }else if(data.id){
            this.uuid = data.id;
        }

        this.is_inuse = data.is_inuse || 0
    }

    constuct(data) {
        this.constructor(data);
    }
}
