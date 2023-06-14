const apiUrl 	    = require('@/apiUrl.js')
const axios 	    = require('axios')
const unknown = require('../../../api/unknown')

module.exports.banks = function () {
    try {
        const banks = unknown.bank.sort(function(a, b){
            if(a.name < b.name) { return -1; }
            if(a.name > b.name) { return 1; }
            return 0;
        })
        return banks
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.settingGet = async function (settingId) {
    try {
        const response = await axios.get(apiUrl.commerce.settingGet + '/' + settingId)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.settingCreate = async (data) => {
    try {
        // window.console.log(data, 'handler')
        const response = await axios.post(apiUrl.commerce.settingCreate, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.campaignCreate = async (data) => {
    try {
        // window.console.log(data, 'handler')
        const response = await axios.post(apiUrl.commerce.campaignCreate, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.campaignGets = async function () {
    try {
        const response = await axios.get(apiUrl.commerce.campaignGets)

        return response
    } catch (error) {
        window.console.log(error)
    }
}
module.exports.campaignGet = async function (id) {
    try {
        const response = await axios.get(apiUrl.commerce.campaignGet + '/' + id)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.deleteCampaign = async (data) => {
    try {
        // window.console.log(data, 'handler')
        const response = await axios.post(apiUrl.commerce.campaignDelete, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.rewardCreate = async (data) => {
    try {
        // window.console.log(data, 'handler')
        const response = await axios.post(apiUrl.commerce.rewardCreate, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.rewardGets = async function () {
    try {
        const response = await axios.get(apiUrl.commerce.rewardGets)

        return response
    } catch (error) {
        window.console.log(error)
    }
}
module.exports.rewardGet = async function (id) {
    try {
        const response = await axios.get(apiUrl.commerce.rewardGet + '/' + id)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.deleteReward = async (data) => {
    try {
        // window.console.log(data, 'handler')
        const response = await axios.post(apiUrl.commerce.rewardDelete, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.campCouponGets = async function (id) {
    try {
        const response = await axios.get(apiUrl.commerce.campCouponGets + '/' + id)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.itemSearchURL = function (strFilter = '') {
    try {
        // return apiUrl.product.product_variant_list
        return apiUrl.commerce.itemSearch + strFilter
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.customerSearchURL = function (strFilter = '') {
    try {
        const response = apiUrl.customer.customer_searchv1 + strFilter
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.partnerCreate = async (data) => {
    try {
        // window.console.log(data, 'handler')
        const response = await axios.post(apiUrl.commerce.partnerCreate, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.partnerGets = async function () {
    try {
        const response = await axios.get(apiUrl.commerce.partnerGets)

        return response
    } catch (error) {
        window.console.log(error)
    }
}
module.exports.partnerGet = async function (id) {
    try {
        const response = await axios.get(apiUrl.commerce.partnerGet + '/' + id)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.partnerReward = async (data) => {
    try {
        // window.console.log(data, 'handler')
        const response = await axios.post(apiUrl.commerce.partnerDelete, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.deletePartner = async (data) => {
    try {
        // window.console.log(data, 'handler')
        const response = await axios.post(apiUrl.commerce.deletePartner, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getAllItem = async function (data) {
    try {
        const response = await axios.post(apiUrl.commerce.getAllItem, data)

        return response
    } catch (error) {
        window.console.log(error)
    }
}
module.exports.getPLItem = async function (data) {
    try {
        const response = await axios.post(apiUrl.commerce.getPLItem, data)

        return response
    } catch (error) {
        window.console.log(error)
    }
}
module.exports.storeCreate = async (data) => {
    try {
        // window.console.log(data, 'handler')
        const response = await axios.post(apiUrl.commerce.storeCreate, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.storeGets = async function () {
    try {
        const response = await axios.get(apiUrl.commerce.storeGets)

        return response
    } catch (error) {
        window.console.log(error)
    }
}
module.exports.storeGet = async function (id) {
    try {
        const response = await axios.get(apiUrl.commerce.storeGet + '/' + id)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.registerGets = async function () {
    try {
        const response = await axios.get(apiUrl.commerce.registerGets)

        return response
    } catch (error) {
        window.console.log(error)
    }
}
module.exports.registerCreate = async (data) => {
    try {
        // window.console.log(data, 'handler')
        const response = await axios.post(apiUrl.commerce.registerCreate, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.pinCreate = async (data) => {
    try {
        // window.console.log(data, 'handler')
        const response = await axios.post(apiUrl.commerce.pinCreate, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.pinGets = async function () {
    try {
        const response = await axios.get(apiUrl.commerce.pinGets)

        return response
    } catch (error) {
        window.console.log(error)
    }
}
module.exports.pinGet = async function (id) {
    try {
        const response = await axios.get(apiUrl.commerce.pinGet + '/' + id)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.sesNumGenerate = async function () {
    try {
        const response = await axios.get(apiUrl.commerce.sesNumGenerate)

        return response
    } catch (error) {
        window.console.log(error)
    }
}
module.exports.sessionCreate = async (data) => {
    try {
        // window.console.log(data, 'handler')
        const response = await axios.post(apiUrl.commerce.sessionCreate, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.sessionGets = async function () {
    try {
        const response = await axios.get(apiUrl.commerce.sessionGets)

        return response
    } catch (error) {
        window.console.log(error)
    }
}
module.exports.sessionGet = async function (id) {
    try {
        const response = await axios.get(apiUrl.commerce.sessionGet + '/' + id)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.orderNumberGet = async function (id) {
    try {
        const response = await axios.get(apiUrl.commerce.orderNumberGet + '/' + id)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.txnCreate = async (data) => {
    try {
        // window.console.log(data, 'handler')
        const response = await axios.post(apiUrl.commerce.txnCreate, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.txnGets = async function () {
    try {
        const response = await axios.get(apiUrl.commerce.txnGets)

        return response
    } catch (error) {
        window.console.log(error)
    }
}
module.exports.txnGet = async function (id) {
    try {
        const response = await axios.get(apiUrl.commerce.txnGet + '/' + id)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.txnDel = async (data) => {
    try {
        // window.console.log(data, 'handler')
        const response = await axios.post(apiUrl.commerce.txnDel, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.txnNumberGet = async function (store) {
    try {
        const response = await axios.get(apiUrl.commerce.txnNumberGet + '/' + store)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getGsi2 = async function (data) {
    try {
        const response = await axios.post(apiUrl.commerce.getGsi2, data)

        return response
    } catch (error) {
        window.console.log(error)
    }
}
module.exports.genGets = async function (data) {
    try {
        const response = await axios.post(apiUrl.commerce.genGet, data)
        return response
    } catch (error) {
        window.console.log(error)
    }
}
module.exports.generalGet = async function (data) {
    try {
        const response = await axios.post(apiUrl.commerce.generalGet, data)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.reportGets = async function (data) {
    try {
        const response = await axios.post(apiUrl.commerce.reportGets, data)

        return response
    } catch (error) {
        window.console.log(error)
    }
}
module.exports.cashCountCreate = async function (data) {
    try {
        const response = await axios.post(apiUrl.commerce.cashCountCreate, data)

        return response
    } catch (error) {
        window.console.log(error)
    }
}
module.exports.getImage = async function (instituteId, userId) {
    try {
        const result = await axios.get(apiUrl.save_image + userId + '/list', {params: {instituteId: instituteId}})
        return result.data.data
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.frontDisplay = async (data) => {
    try {
        // window.console.log(data, 'handler')
        const response = await axios.post(apiUrl.commerce.frontDisplay, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.cashCountCreate = async (data) => {
    try {
        // window.console.log(data, 'handler')
        const response = await axios.post(apiUrl.commerce.cashCountCreate, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.keyGet = async function (data) {
    try {
        const response = await axios.post(apiUrl.commerce.keyGet, data)

        return response
    } catch (error) {
        window.console.log(error)
    }
}
module.exports.updateDb = async function (data) {
    try {
        const response = await axios.post(apiUrl.commerce.updateDb, data)

        return response
    } catch (error) {
        window.console.log(error)
    }
}