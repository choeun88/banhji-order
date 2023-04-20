export default class LoyaltyCardSetting {
    constructor(data = {}) {
        this.id = data.id || ''
        this.allowPointLimit = data.allowPointLimit || false
        this.allowExpire = data.allowExpire || false
        this.allowStatus = data.allowStatus || false
        this.defaultStatus = data.defaultStatus || 'open'
        this.activation = data.activation || {
            allowSelectCustomer: false,
            searchCard: 'number',
            dob: false,
            address: false,
            email: false,
            facebook: false,
            telegram: false,
            nationality: false,
            other: false
        }
        this.user = data.user || {}
    }

    constuct(data) {
        this.constructor(data);
    }
}