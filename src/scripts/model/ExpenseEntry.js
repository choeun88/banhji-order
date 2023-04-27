import { JournalEntryModel, DiscountItemModel, TaxModel } from "@/scripts/model/AppModels";

export default class ExpenseEntry extends JournalEntryModel {
    constructor (data = {}) {
        super(data);

        this.uom_uuid   = data.uom_uuid || ''
        this.quantity   = data.quantity || 0.00
        this.mark_up    = data.mark_up || 0.00
        this.price      = data.price || 0.00
        this.billable   = data.billable || 0
        this.discount   = data.discount || Object.assign({}, new DiscountItemModel())
        this.tax_item   = data.tax_item || Object.assign({}, new TaxModel())
        this.discountAs = data.discountAs || ''
        this.decimalFormat = data.decimalFormat || 'n2'
    }

    construct(data) {
        this.constructor(data)
    }
}
