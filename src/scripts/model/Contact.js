export default class Contact {
    constructor(data = {}) {
        this.uuid = data.uuid || ''
        this.number = data.number || ''
        this.name = data.name || ''
        this.address = data.address || ''
        this.phone = data.phone || ''
        this.email = data.email || ''

        // Map with B Nimol's fields
        if(data.id){
            this.uuid = data.id;
        }
        
        if(data.employeeId){
            this.number = data.employeeId;
        }
    }

    constuct(data) {
        this.constructor(data);
    }
}