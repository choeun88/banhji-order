export default class ProductVariants {
    constructor(data = {}) {
            this.id = data.id || ''
            this.productId = data.productId || ''
            this.name = data.name || ''
            this.sku = data.sku || ''
            this.type = data.type || {}
            this.category = data.category || {}
            this.group = data.group || {}
            this.product = data.product || {}
            this.subGroup = data.subGroup || {}
            this.warehouse = data.warehouse || {}
            this.inventoryAcc = data.inventoryAcc || {}
            this.incomeAcc = data.incomeAcc || {}
            this.costOfGoodsSoldAcc = data.costOfGoodsSoldAcc || {}

            this.attribute = data.attribute || {}
            this.uom = data.uom || {}
            this.priceLevel = data.priceLevel || {}
            this.reOrderQty = data.reOrderQty || 0
            this.saleDescription = data.saleDescription || ''
            this.description = data.description || ''
            this.brand = data.brand || {}
            this.countryOrigin = data.countryOrigin || {}
           
            this.barcode = data.barcode || ''
            this.isForPOS = data.isForPOS || false
            this.useAsFavorite = data.useAsFavorite || false
            this.isNegativeSale = data.isNegativeSale || false
            this.isForEcommerce = data.isForEcommerce || false
            this.isNegativeSaleForSaleChannel = data.isNegativeSaleForSaleChannel || false
            this.minOrderQty = data.minOrderQty || 0
            this.maxOnlineStock = data.maxOnlineStock || 0
            this.reUsed = data.reUsed || false
            this.status = data.status || 1

            this.isFavorite = data.isFavorite || false
            this.thumb = data.thumb || ''

            this.price = data.price || 0,
            this.cost = data.cost || 0
            this.nature = data.nature || {}
            this.nfs = data.nfs || false // not for sale
            this.vrn = data.vrn || ''
    }

    construct(data) {
        this.constructor(data);
    }
}