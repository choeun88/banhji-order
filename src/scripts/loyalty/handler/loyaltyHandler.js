const apiUrl 	    = require('@/apiUrl.js')
const axios 	    = require('axios')

module.exports.rewardCreate = async (data) => {
    try {
        // window.console.log(data, 'handler')
        const response = await axios.post(apiUrl.loyalty.rewardCreate, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.rewardGets = async function () {
    try {
        const response = await axios.get(apiUrl.loyalty.rewardGets)

        return response
    } catch (error) {
        window.console.log(error)
    }
}
module.exports.rewardGet = async function (id) {
    try {
        const response = await axios.get(apiUrl.loyalty.rewardGet + '/' + id)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.deleteReward = async (data) => {
    try {
        // window.console.log(data, 'handler')
        const response = await axios.post(apiUrl.loyalty.rewardDelete, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.loyaltyCardSettingCreate = async (data) => {
    try {
        // window.console.log(data, 'handler')
        const response = await axios.post(apiUrl.loyalty.loyaltyCardSettingCreate, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.loyaltyCardSettingGet = async function (data) {
    try {
        const response = await axios.post(apiUrl.loyalty.loyaltyCardSettingGet, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.groupGet = async function () {
    try {
        const response = await axios.get(apiUrl.loyalty.groupGet)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.groupCreate = async (data) => {
    try {
        const response = await axios.post(apiUrl.loyalty.groupCreate, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.nationalGet = async function () {
    try {
        // const response = await axios.get('https://restcountries.com/v3.1/all')
        const response = await axios.get('https://countriesnow.space/api/v0.1/countries/iso')
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.loyaltyCardCreate = async (data) => {
    try {
        // window.console.log(data, 'handler')
        const response = await axios.post(apiUrl.loyalty.loyaltyCardCreate, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.loyaltyCardGets = async function () {
    try {
        const response = await axios.get(apiUrl.loyalty.loyaltyCardGets)

        return response
    } catch (error) {
        window.console.log(error)
    }
}
module.exports.loyaltyCardGet = async function (id) {
    try {
        const response = await axios.get(apiUrl.loyalty.loyaltyCardGet + '/' + id)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.searchCard = async function (data) {
    try {
        const response = await axios.post(apiUrl.loyalty.loyaltySearchCard, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.loyaltyCardDel = async (data) => {
    try {
        // window.console.log(data, 'handler')
        const response = await axios.post(apiUrl.loyalty.loyaltyCardDel, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.loyaltyAppCreate = async (data) => {
    try {
        // window.console.log(data, 'handler')
        const response = await axios.post(apiUrl.loyalty.loyaltyAppCreate, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.loyaltyAppGets = async function () {
    try {
        const response = await axios.get(apiUrl.loyalty.loyaltyAppGets)

        return response
    } catch (error) {
        window.console.log(error)
    }
}
module.exports.loyaltyAppGet = async function (id) {
    try {
        const response = await axios.get(apiUrl.loyalty.loyaltyAppGet + '/' + id)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
// gift card
module.exports.giftCardCreate = async (data) => {
    try {
        // window.console.log(data, 'handler')
        const response = await axios.post(apiUrl.loyalty.giftCardCreate, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.giftCardGets = async function () {
    try {
        const response = await axios.get(apiUrl.loyalty.giftCardGets)

        return response
    } catch (error) {
        window.console.log(error)
    }
}
module.exports.giftCardGet = async function (id) {
    try {
        const response = await axios.get(apiUrl.loyalty.giftCardGet + '/' + id)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.deleteGiftCard= async (data) => {
    try {
        // window.console.log(data, 'handler')
        const response = await axios.post(apiUrl.loyalty.giftCardDelete, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
// point
module.exports.pointGets = async function (data) {
    try {
        const response = await axios.post(apiUrl.loyalty.pointGets, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.pointCreate = async function (data) {
    try {
        const response = await axios.post(apiUrl.loyalty.pointCreate, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
// loyalty program
module.exports.loyaltyCreate = async function (data) {
    try {
        window.console.log(data)
        const response = await axios.post(apiUrl.loyalty.loyaltyCreate, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.loyaltyGets = async function () {
    try {
        const response = await axios.get(apiUrl.loyalty.loyaltyGets)

        return response
    } catch (error) {
        window.console.log(error)
    }
}
module.exports.loyaltyGet = async function (id) {
    try {
        const response = await axios.get(apiUrl.loyalty.loyaltyGet + '/' + id)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.generalGets = async function (data) {
    try {
        const response = await axios.post(apiUrl.loyalty.generalGets, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.verifyCode = async function (data) {
    try {
        const response = await axios.post(apiUrl.loyalty.verifyCode, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.updateCard = async function (data) {
    try {
        const response = await axios.post(apiUrl.loyalty.updateCard, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.importCard = async function (data) {
    try {
        const response = await axios.post(apiUrl.loyalty.importCard, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.searchCardTxn = async function (data) {
    try {
        const response = await axios.post(apiUrl.loyalty.searchCardTxn, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}