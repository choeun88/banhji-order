// import { AccountTypeModel, AccountGroupModel } from "@/scripts/model/AppModels";

export default class AccountEntryDetail {
    constructor(data = {}) {
        this.back_date_transaction  = data.back_date_transaction || 0
        this.balance                = data.balance || 0
        this.ending_balance         = data.ending_balance || 0
        this.future_date_transaction= data.future_date_transaction || 0
        this.entries_detail         = data.entries_detail || []
    }
    
    constuct(data) {
        this.constructor(data);
    }
}