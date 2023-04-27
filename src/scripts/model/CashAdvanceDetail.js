import { JournalEntryModel, AccountModel } from "@/scripts/model/AppModels";

export default class CashAdvanceDetail extends JournalEntryModel {
    /*
    * data should be the data that send back from server side which has the same.
    * when data doesn't have the fields the object will ignore that field.
    */
    constructor (data = {}) {
        super(data);

        this.secondary_account = data.secondary_account || Object.assign({}, new AccountModel());
    }

    construct(data) {
        this.constructor(data)
    }
}
