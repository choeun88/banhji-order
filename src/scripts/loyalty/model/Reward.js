export default class Reward {
    constructor(data = {}) {
        this.id = data.id || ''
        this.name = data.name || ''
        this.code = data.code || ''
        this.effectiveDate = data.effectiveDate || new Date().toISOString().substr(0, 10)
        this.isEndDate = data.isEndDate || false
        this.endDate = data.endDate || new Date().toISOString().substr(0, 10)
        // Stores
        this.stores = data.stores || []
        this.pointAmount = data.pointAmount || 1 
        // Reward
        this.rewardBase = data.rewardBase || 'amountBase'
        this.rewardType = data.rewardType || 'fixed'
        this.rewardAmount = data.rewardAmount || 1
        this.rewardAmountType = data.rewardAmountType || 'amount'
        this.rewardVarian = data.rewardVarian || []
        this.productBaseOn = data.productBaseOn || 'all'
        this.rewardProductCategory = data.rewardProductCategory || []
        this.rewardProductGroup = data.rewardProductGroup || []
        this.rewardProduct = data.rewardProduct || []
        // user
        this.user = data.user || {}
    }

    constuct(data) {
        this.constructor(data);
    }
}