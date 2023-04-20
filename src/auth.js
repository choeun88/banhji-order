const cookieJS = require("@/cookie.js");
const cookie = cookieJS.getCookie();
module.exports.init = async () => {
    if (!cookie) {
        let name = 'nlf-token' + process.env.VUE_APP_MODE
        window.console.log(name, 'nanna')
        document.cookie = name+'=; Max-Age=-99999999;';
    }
}