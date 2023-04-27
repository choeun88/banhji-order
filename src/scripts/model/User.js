export default class User {
    constructor(data = {}) {
        this.id             = data.id || ''
        this.user_name      = data.user_name || ''
        this.first_name     = data.first_name || ''
        this.last_name      = data.last_name || ''
        this.email          = data.email || ''

        // Username
        if(data.email){
            this.user_name = data.email;
        }

        // First Name
        if(data.firstName){
            this.first_name = data.firstName;
        }

        // Last Name
        if(data.lastName){
            this.last_name = data.lastName;
        }
    }
    
    constuct(data) {
        this.constructor(data);
    }
}