import { AccountModel, JournalEntryModel, ClassModel } from "@/scripts/model/AppModels";

export default class JournalEntryExtended extends JournalEntryModel {
    /*
    * data should be the data that send back from server side which has the same.
    * when data doesn't have the fields the object will ignore that field.
    */
    constructor (data = {}) {
        super(data);

        this.dr = data.dr || 0;
        this.cr = data.cr || 0;
        this.secondary_account = data.secondary_account || Object.assign({}, new AccountModel());
        this.class1 = data.class1 || new ClassModel();
        this.class2 = data.class2 || new ClassModel();
        this.class3 = data.class3 || new ClassModel();
        this.class4 = data.class4 || new ClassModel();
        this.class5 = data.class5 || new ClassModel();
    }

    construct(data) {
        this.constructor(data);
    }
}
