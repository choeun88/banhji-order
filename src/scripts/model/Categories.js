export default class Categories {
    constructor(data = {}) {
        this.id = data.id || ''
        this.abbr = data.abbr || ''
        this.name = data.name || ''
        this.color = data.color || '#9fcc63'
        this.img = data.img || ''
        this.type = data.type || {}
        this.inventoryAcc = data.inventoryAcc || {}
        this.incomeAcc = data.incomeAcc || {}
        this.costOfGoodsSoldAcc = data.costOfGoodsSoldAcc || {}
        this.fixedAssetAcc = data.fixedAssetAcc || {}
        this.depreciationAcc = data.depreciationAcc || {}
        this.AccumulateDepAcc = data.AccumulateDepAcc || {}
        this.account = data.account || {}
        this.defaultTax = data.defaultTax || {}
        this.purchaseTax = data.purchaseTax || {}
        this.specificTax = data.specificTax || {}
        this.otherTax = data.otherTax || {}
    }

    constuct(data) {
        this.constructor(data);
    }
}
