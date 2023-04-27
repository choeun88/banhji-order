export default class Loan {
    /*
    * data should be the data that send back from server side which has the same.
    * when data doesn't have the fields the Loan Detail object will ignore that field.
    */
    constructor (data = {}) {
        this.uuid = data.uuid || ''
        this.journal_uuid = data.journal_uuid || ''
        this.account_uuid = data.account_uuid || ''
        this.description = data.description || ''
        this.amount = data.amount || 0
        this.date = data.date || ''
        this.txn_type = data.txn_type || ''
    }

    construct(data) {
        this.constructor(data)
    }

}
