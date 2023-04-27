/* Cookie */
const cookieJS = require("@/cookie.js");
const { instituteId } = cookieJS.getCookie();

export default class LoanType {
  constructor (data = {}) {
    this.uuid = data.uuid || '';
    this.name = data.name || '';
    this.code = data.code || '';
    this.description = data.description || '';
    this.institute_id = data.institute_id || instituteId;
  }
  constuct (data) {
    this.constructor(data);
  }
}