export default class LoyaltyProgram {
    constructor(data = {}) {
        this.id = data.id || ''
        this.name = data.name || ''
        this.code = data.code || ''
        this.effectiveDate = data.effectiveDate || new Date().toISOString().substr(0, 10)
        this.isEndDate = data.isEndDate || false
        this.endDate = data.endDate || new Date().toISOString().substr(0, 10)
        this.description = data.description || ''
        this.type = data.type || 'amount'
        // Rule
        this.amountPerPoint = data.amountPerPoint || 1
        this.percentageSale = data.percentageSale || 100
        this.stores = data.stores || []
        // Rank promotion
        this.isRankPromotion = data.isRankPromotion || false
        this.rankBy = data.rankBy || 'month'
        this.rankLines = data.rankLines || []
        // Expire
        this.isPointExpire = data.isPointExpire || false
        this.expireAmount = data.expireAmount || 1
        this.expireBy = data.expireBy || 'month'
        this.isRankPromo = data.isRankPromo || false
        // User
        this.user = data.user || {}
    }

    constuct(data) {
        this.constructor(data);
    }
}