'use strict'

const store = require("./institute.js")
const jwt = require("jsonwebtoken")
const {data} = require('@/observable/store')
const { dataStore } = require("@/observable/store.js")
module.exports.cookie = {
    init: () => getCookieData()
}

let getCookie = function (cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
    }
    return "";
}

let getCookieData =  function (){
    // var cookie = getCookie ('banhji-token')
    let cookie = getCookie('banhji-token-commerce' + process.env.VUE_APP_MODE );
    // window.console.log(cookie, 'cookier')
    if (cookie !== ''){
        // store.default.state.cookies = JSON.parse(cookie);
        // let data = JSON.parse(cookie)
        // store.default.state.cookies.accessToken = data.accessToken
        // store.default.state.cookies.refreshToken = data.refreshToken
        // store.default.state.cookies.expiresIn = data.expiresIn
        // store.default.state.cookies.email = data.email
        // store.default.state.cookies.instituteId = data.instituteId
        // store.default.state.cookies.creator = data.creator
        data.cookie = cookie
        jwt.verify(cookie,process.env.VUE_APP_JWT_SESCRET, (err, decoded) => {
            if (!err){
                store.default.state.cookies = decoded;
                dataStore.isValidUser = true
                // window.console.log("true ver")
            }else{
                dataStore.isValidUser = false
                // window.console.log("false ver")
            }
        });
    }
}