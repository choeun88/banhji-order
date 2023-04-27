export default class LoanSchedule {
    constructor (data = {}) {
        this.uuid = data.uuid || ''
        this.order_number = data.order_number || 0
        this.payment_date = data.payment_date || ''
        this.paid_date = data.paid_date || ''
        this.expected_amount = data.expected_amount || 0
        this.paid_amount = data.paid_amount || 0
    }

    construct(data) {
        this.constructor(data)
    }
}