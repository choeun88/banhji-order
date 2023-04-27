import { AccountModel, TaxTypeModel } from "@/scripts/model/AppModels";

export default class Tax {
    constructor(data = {}) {
        this.id = data.id || ''
        this.code = data.code || 0
        this.defaultTax = data.defaultTax || ''
        this.defaultTaxLocale = data.defaultTaxLocale || ''
        this.description = data.description || ''
        this.natureTaxPayer = data.natureTaxPayer || ''
        this.formula = data.formula || ''
        this.baseAmount = data.baseAmount || ''
        this.rate = data.rate || 0.00
        this.taxBase = data.taxBase || 0.00
        this.taxType = data.taxType || Object.assign({}, new TaxTypeModel())
        this.account = data.account || Object.assign({}, new AccountModel())
        this.transactionType = data.transactionType || ''
        this.isSystem = data.isSystem || 0

        // Map with B Kethya's fields
        if(data.uuid){
            this.id = data.uuid;
        }else if(data.id){
            this.uuid = data.id;
        }
        
        if(data.name){
            this.defaultTax = data.name;
        }else if(data.defaultTax){
            this.name = data.defaultTax;
        }

    }

    constuct(data) {
        this.constructor(data);
    }
}