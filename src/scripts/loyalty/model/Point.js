export default class Point {
    constructor(data = {}) {
        this.id = data.id || ''
        this.card = data.card || ''
        this.amount = data.amount || 0
        this.expire = data.expire || ''
        this.type = data.type || ''
        this.txnId = data.txnId || ''
    }

    constuct(data) {
        this.constructor(data);
    }
}