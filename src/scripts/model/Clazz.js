const defualtData = {
    id : "",
    code : "",
    name : "",
}

function setDefaultData(obj){
    if(obj){
        if(obj.hasOwnProperty("id")){
            if(obj.id === ""){
                return defualtData;
            }else{
                return obj;
            }
        }else{
            return defualtData;
        }
    }else{
        return defualtData;
    }
}

export default class Clazz {
    constructor(data = {}) {
        this.id                 = data.id || ''
        this.code               = data.code || ''
        this.name               = data.name || ''
        this.isShow             = data.isShow || false
        this.isSystem           = data.isSystem || 0
        this.type               = data.type || ''
        this.description        = data.description || ''
        this.clazz              = setDefaultData(data.clazz)
        this.clazzId            = data.clazzId || ''
        this.classType          = setDefaultData(data.classType)
        this.classTypeId        = data.classTypeId || ''
        this.classGroup         = setDefaultData(data.classGroup)
        this.classGroupId       = data.classGroupId || ''
        this.classSubGroup      = setDefaultData(data.classSubGroup)
        this.classSubGroupId    = data.classSubGroupId || ''
     }

    constuct(data) {
        this.constructor(data);
    }
}