import { ExpenseEntryModel, ClassModel, UomModel, AccountModel } from "@/scripts/model/AppModels";

export default class ExpenseEntryExtended extends ExpenseEntryModel {
    constructor (data = {}) {
        super(data);

        this.secondary_account = data.secondary_account || Object.assign({}, new AccountModel());
        this.uom        = data.uom || new UomModel()
        this.class1     = data.class1 || new ClassModel()
        this.class2     = data.class2 || new ClassModel()
        this.class3     = data.class3 || new ClassModel()
        this.class4     = data.class4 || new ClassModel()
        this.class5     = data.class5 || new ClassModel()
    }

    construct(data) {
        this.constructor(data)
    }
}
