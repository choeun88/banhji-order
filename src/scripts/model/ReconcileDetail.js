import { CurrencyModel } from "@/scripts/model/AppModels";

export default class ReconcileDetail {
    constructor(data = {}) {
        this.order              = data.order || 0
        this.currency           = data.currency || new CurrencyModel()
        this.note               = data.note || ''
        this.unit               = data.unit || 0
        this.amount             = data.amount || 0
        this.remark             = data.remark || ''
        this.exchange_rate      = data.exchange_rate || 0
        this.exchanged_amount   = data.exchanged_amount || 0
    }
    
    constuct(data) {
        this.constructor(data)
    }
}