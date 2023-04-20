export default class PosTransaction {
    constructor(data = {}) {
        this.id = data.id || ''
        this.total = data.total || 0
        this.subTotal = data.subTotal || 0
        this.discount = data.discount || 0
        this.modiAmt = data.modiAmt || 0
        this.tax = data.tax || 0
        this.itemLines = data.itemLines || ''
        this.customer = data.customer || {}
        this.priceLevel = data.priceLevel || {}
        this.orderNumber = data.orderNumber || ''
        this.lastOrderNum = data.lastOrderNum || 1
        this.session = data.session || {}
        this.register = data.register || ''
        this.store = data.store || ''
        this.pinUser = data.pinUser || {}
        this.guestCount = data.guestCount || {}
        this.saleUnit = data.saleUnit || {}
        this.loyaltyCard = data.loyaltyCard || {}
        this.reward = data.reward || {}
        this.orderType = data.orderType || {}
        this.partner = data.partner || {}
        this.amtReceipt = data.amtReceipt || 0
        this.paidBy = data.paidBy || 'Cash'
        this.exchange = data.exchange || {}
        this.exchangeRate = data.exchangeRate || ''
        this.issuedDate = data.issuedDate || new Date()
        this.type = data.type || 'sale'
        this.cardPay = data.cardPay || {}
        this.bankPay = data.bankPay || {}
        this.txnNumber = data.txnNumber || ''
        this.lastNumber = data.lastNumber || 1
        this.orderDate = data.orderDate || ''
        this.billDate = data.billDate || ''
        this.otherCharge = data.otherCharge || {id: "", name: "", total: 0}
        this.point = data.point || {amount: 0, type: 'earn'}
        this.campaigns = data.campaigns || [] // id: name: amount
        this.isSale = data.isSale || 1
        this.status = data.status || 1
        this.txnId = data.txnId || ''
        this.pointEarn = data.pointEarn || {}
        this.pointPaid = data.pointPaid || {}
        this.warehouseId = data.warehouseId || ''
        this.phoneNumber = data.phoneNumber || ''
    }

    constuct(data) {
        this.constructor(data);
    }
}