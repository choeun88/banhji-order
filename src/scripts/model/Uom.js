import { UomCategoryModel } from "@/scripts/model/AppModels";

export default class Uom {
    constructor(data = {}) {
        this.id = data.id || ''
        this.name = data.name || ''
        this.category = data.category || new UomCategoryModel()
    }

    constuct(data) {
        this.constructor(data);
    }
}