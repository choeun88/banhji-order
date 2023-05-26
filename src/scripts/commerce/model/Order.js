export default class Order {
    constructor(data = {}) {
        this.id = data.id || ''
        this.cusName = data.cusName || ''
        this.cusPhone = data.cusPhone || ''
        this.items = data.items || []
        this.dateTime = data.dateTime || new Date()
        this.time = data.time || ''
        this.address = data.address || ''
        this.discount = data.discount || 0
        this.subTotal = data.subTotal || 0
        this.discount = data.discount || 0
        this.total = data.total || 0
        this.orderType = data.orderType || 'delivery'
        this.saleChannel = data.saleChannel || 'facebook'
    }

    constuct(data) {
        this.constructor(data);
    }
}