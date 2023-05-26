/* Store */
import store from "@/store"
const institute = store.state.institute.institute

export default class ReportingCurrency {
    constructor(data = {}) {
        this.id                     = data.id || ''
        this.name                   = data.name || ''
        this.code                   = data.code || ''
        this.recordDate             = data.recordDate || new Date().toISOString().substr(0, 10)
        this.source                 = data.source || ''
        this.symbol                 = data.symbol || ''
        this.type                   = data.type || ''
        this.periodType             = data.periodType || ''
        this.period                 = data.period || {}
        this.symbolNative           = data.symbolNative || ''
        this.rate                   = data.rate || 1
        this.method                 = data.method || 1
        this.dateFormat             = institute.dateFormat

    }

    constuct(data) {
        this.constructor(data);
    }
}