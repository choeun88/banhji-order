export default class Reward {
    constructor(data = {}) {
        this.id = data.id || ''
        this.name = data.name || ''
        this.code = data.code || ''
        this.effectiveDate = data.effectiveDate || new Date().toISOString().substr(0, 10)
        this.isEndDate = data.isEndDate || false
        this.endDate = data.endDate || new Date().toISOString().substr(0, 10)
        this.description = data.description || ''
        // Rule
        this.amountPerPoint = data.amountPerPoint || 1
        this.percentageSale = data.percentageSale || 100
        this.pointPerReward = data.pointPerReward || 1
        this.stores = data.stores || []
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
        // Rank promotion
        this.isRankPromotion = data.isRankPromotion || false
        this.rankPromotionBy = data.rankPromotionBy || 'day'
        // Expire
        this.isPointExpire = data.isPointExpire || false
        this.expireAmount = data.expireAmount || 1
        this.expireBy = data.expireBy || 'day'
        // Branch
        this.branches = data.branches || []
        this.user = data.user || {}
    }

    constuct(data) {
        this.constructor(data);
    }
}