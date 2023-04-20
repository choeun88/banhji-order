export default class CashCount {
    constructor(data = {}) {
        this.id = data.id || ''
        this.notes = data.notes || []
        this.number = data.number || ''
        this.issuedDate = data.issuedDate || ''
        this.varianceAmount = data.varianceAmount || 0
        this.actualAmount = data.actualAmount || 0
        this.amount = data.amount || 0
        this.status = data.status || ''
        this.tranId = data.tranId || ''
        this.sessionId = data.sessionId || ''
    }

    constuct(data) {
        this.constructor(data);
    }
}