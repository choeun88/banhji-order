export default class Card {
    constructor(data = {}) {
        this.id = data.id || ''
        this.cardNumber = data.cardNumber || ''
        this.serial = data.serial || ''
        this.issuedDate = data.issuedDate || new Date().toISOString().substr(0, 7)
        this.isLimit = data.isLimit || false
        this.limitType = data.limitType || 'day'
        this.limitAmount = data.limitAmount || 0
        this.limitAmountType = data.limitAmountType || 'percentage'
        this.rewardPrograms = data.rewardPrograms || []
        this.expireDate = data.expireDate || new Date().toISOString().substr(0, 7)
        this.status = data.status || 'open'
        this.group = data.group || {}
        this.apply = data.apply || 'all'
        this.stores = data.stores || []
        this.customerId = data.customerId || ''
        this.nature = data.nature || 'point_card'
        this.type = data.type || 'virtual'
        this.nfcNumber = data.nfcNumber || ''
        this.isNFC = data.isNFC || false
        this.code = data.code || ''
        // activation
        this.activateName = data.activateName || ''
        this.activatePhone = data.activatePhone || ''
        this.activateDob = data.activateDob || new Date().toISOString().substr(0, 7)
        this.activateAddress = data.activateAddress || ''
        this.activateEmail = data.activateEmail || ''
        this.activateFacebook = data.activateFacebook || ''
        this.activateTelegram = data.activateTelegram || ''
        this.activateOther = data.activateOther || ''
        this.activateGender = data.activateGender || 'male'
        this.activateNationality = data.activateNationality || 'KH'
        this.user = data.user || {}
        this.totalPoint = data.totalPoint || 0
        this.session = data.session || {}
        this.isSaleCard = data.isSaleCard || false
        this.topUpCounter = data.topUpCounter || 0
        this.topUpGCard = data.topUpGCard || 0
        this.earnPoint = data.earnPoint || 0
        this.pointExpire  = data.pointExpire || 0
        this.pointPay = data.pointPay || 0
    }

    constuct(data) {
        this.constructor(data);
    }
}