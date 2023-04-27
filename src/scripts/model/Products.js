export default class Products {
    constructor(data = {}) {
        this.id = data.id || ''
        this.name = data.name || ''
        this.sku = data.sku || ''
        this.category = data.category || {}
        this.group = data.group || {}
        this.subGroup = data.subGroup || {}
        this.priceLevel = data.priceLevel || {}
        this.saleDescription = data.saleDescription || ''
        this.purchaseDescription = data.purchaseDescription || ''
        this.uom = data.uom || {}
        this.price = data.price || 0
        this.cost = data.cost || 0
        this.reOrderQTY = data.reOrderQTY || 1
        this.warehouse = data.warehouse || {}
        this.inventoryAcc = data.inventoryAcc || {}
        this.incomeAcc = data.incomeAcc || {}
        this.costOfGoodsSoldAcc = data.costOfGoodsSoldAcc || {}
        this.defaultTax = data.defaultTax || {}
        this.purchaseTax = data.purchaseTax || {}
        this.specificTax = data.specificTax || {}
        this.otherTax = data.otherTax || {}
        this.formTemplate = data.formTemplate || {}
        this.variant = data.variant || {}
        this.canBeSold = data.canBeSold || false
        this.canBeProduce = data.canBeProduce || false
        this.canBeRent = data.canBeRent || false
        this.canBePurchase = data.canBePurchase || false
        this.isFavorite = data.isFavorite || false
        this.batchTracked = data.batchTracked || 1
        this.isSerialNumber = data.isSerialNumber || 2
        this.batchOrSerial = data.batchOrSerial || 0 // [0= None, 1= batch, 2= serial]
        this.status = data.status || 1
        this.deleted = data.deleted || 0
        this.reUsed = data.reUsed || false

    }

    constuct(data) {
        this.constructor(data);
    }
}