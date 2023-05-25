export default class CustomerType {
    constructor(data = {}) {

        this.id = data.id || ''
        this.name = data.name || ''
        this.abbr = data.abbr || ''
        this.nature = data.nature || {}
        this.receivableAcc = data.receivableAcc || {}
        this.priceLevel = data.priceLevel || {}
        this.saleTax = data.saleTax || {}
        this.saleDepositAcc = data.saleDepositAcc || {}
        this.saleDiscountAcc = data.saleDiscountAcc || {}
        this.unearnRevenueAcc = data.unearnRevenueAcc || {}
        this.paymentTerm = data.paymentTerm || {}
        this.billPayment = data.billPayment || {}
        this.qrPayment = data.qrPayment || {}
        this.bankTransfer = data.bankTransfer || {}
        this.cashPayment = data.cashPayment || {}

    }

    constuct(data) {
        this.constructor(data);
    }
}