const axios = require('axios');
const instance = axios.create();
const apiUrl = require('@/apiUrl.js');
const baseUrl = process.env.VUE_APP_API;
/* Cookie */
const cookieJS = require("@/cookie.js");
const { instituteId, creator } = cookieJS.getCookie();

// INITIAL INSTITUTE
module.exports.init = async () => {
    try {
        return await axios.get(apiUrl.institute.company_getOne + instituteId);
    } catch (error) {
        window.console.error(error);
    }
}

// SAVE
module.exports.saveIntitute = async (data) => {
    try {
        const response = await axios.post(apiUrl.institute.company_add + `${creator}`, data);
        return response;
    } catch (error) {
        window.console.error(error);
    }
}

module.exports.getCompany = async function (id) {
    try {
        const result = await axios.get(apiUrl.institute.company_get + id)
        return result.data.data
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getImage = async function (useId) {
    try {
        const result = await axios.get(baseUrl + `/users/saveimage/user/usr-${useId}/list?instituteId=${instituteId}`)
        return result.data.data
    } catch (error) {
        window.console.error(error)
    }
}


module.exports.getOneCompany = async function (id) {
    try {
        const result = await axios.get(apiUrl.institute.company_getOne + id)
        // window.console.log('institute',apiUrl.institute.company_getOne + id)
        return result.data.data
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.addCompany = async function (id) {
    try {
        const result = await axios.get(apiUrl.institute.company_add + id)
        return result.data.data
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.saveImageProfile = async function (data) {
    try {
        const response = await axios.post(apiUrl.institute.save_image, data)
        return response.data.data
    } catch (err) {
        window.console.error(err)
    }
}

module.exports.getBt = async function () {
    try {
        const response = await instance.get(apiUrl.institute.bt)
        return response.data.business_types
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.getSector = async function () {
    try {
        const response = await axios.get(apiUrl.institute.sector_get)
        return response.data.data
    } catch (err) {
        window.console.log(err)
    }
}

module.exports.getBo = async function () {
    try {
        const response = await axios.get(apiUrl.institute.bo)
        return response.data.data
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.getTaxRegime = async function () {
    try {
        const response = await instance.get(apiUrl.institute.taxRegime)

        return response.data
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.getRoles = async function () {
    try {
        const response = await instance.get(apiUrl.institute.role_get + instituteId + '/user/' + `usr-${creator}` + '/list')

        return response.data.data
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getPlanRoles = async function () {
    try {
        const response = await instance.get(apiUrl.institute.plan_role_get + instituteId + '/user/' + `usr-${creator}` + '/planrole')
        return response.data.data
    } catch (error) {
        window.console.error(error)
    }
}