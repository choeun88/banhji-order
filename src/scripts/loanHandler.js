const apiUrl 	    = require('@/apiUrl.js')
const axios 	    = require('axios')

module.exports.productGet = async function () {
    try {
        const response = await axios.get(apiUrl.loan.product_get)

        return response
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.productCreate = async (data) => {
    try {
        const response = await axios.post(apiUrl.loan.product_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.purposeCreate = async (data) => {
    try {
        const response = await axios.post(apiUrl.loan.purpose_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.purposeGet = async function () {
    try {
        const response = await axios.get(apiUrl.loan.purpose_get)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.loanLevelGet = async function () {
    try {
        const response = await axios.get(apiUrl.loan.loan_level_get)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.loanLevelCreate = async (data) => {
    try {
        const response = await axios.post(apiUrl.loan.loan_level_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.decimalGet = async function () {
    try {
        const response = await axios.get(apiUrl.loan.decimal_get)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.decimalCreate = async (data) => {
    try {
        const response = await axios.post(apiUrl.loan.decimal_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.savingGet = async function () {
    try {
        const response = await axios.get(apiUrl.loan.saving_get)

        return response
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.savingCreate = async (data) => {
    try {
        const response = await axios.post(apiUrl.loan.saving_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}


module.exports.memberTypeGet = async function () {
    try {
        const response = await axios.get(apiUrl.loan.member_type_get)

        return response
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.memberTypeCreate = async (data) => {
    try {
        const response = await axios.post(apiUrl.loan.member_type_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
// Group member
module.exports.mainBlockGet = async function () {
    try {
        const response = await axios.get(apiUrl.loan.main_block_get)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.mainBlockCreate = async (data) => {
    try {
        const response = await axios.post(apiUrl.loan.main_block_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.subBlockGet = async function () {
    try {
        const response = await axios.get(apiUrl.loan.sub_block_get)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.subBlockCreate = async (data) => {
    try {
        const response = await axios.post(apiUrl.loan.sub_block_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.zoneGet = async function () {
    try {
        const response = await axios.get(apiUrl.loan.zone_get)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.zoneCreate = async (data) => {
    try {
        const response = await axios.post(apiUrl.loan.zone_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.groupMemberGet = async function () {
    try {
        const response = await axios.get(apiUrl.loan.group_member_get)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.groupMemberCreate = async (data) => {
    try {
        const response = await axios.post(apiUrl.loan.group_member_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}

//shard
module.exports.pricePerShareGet = async function () {
    try {
        const response = await axios.get(apiUrl.loan.price_per_share_get)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.pricePerShareCreate = async (data) => {
    try {
        window.console.log(data, 'handler')
        const response = await axios.post(apiUrl.loan.price_per_share_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.typeOfShareGet = async function () {
    try {
        const response = await axios.get(apiUrl.loan.type_of_share_get)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.typeOfShareCreate = async (data) => {
    try {
        const response = await axios.post(apiUrl.loan.type_of_share_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.memberFeeGet = async function () {
    try {
        const response = await axios.get(apiUrl.loan.member_fee_get)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.memberFeeCreate = async (data) => {
    try {
        const response = await axios.post(apiUrl.loan.member_fee_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.userPinGet = async function () {
    try {
        const response = await axios.get(apiUrl.loan.user_pin_get)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.userPinSearchGet = async function (pin, fun) {
    try {
        const response = await axios.get(apiUrl.loan.userPinSearch + '/' + pin + '/' + fun)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.userPinCreate = async (data) => {
    try {
        const response = await axios.post(apiUrl.loan.user_pin_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.segmentGet = async function () {
    try {
        const response = await axios.get(apiUrl.loan.segment_get)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.segmentCreate = async (data) => {
    try {
        const response = await axios.post(apiUrl.loan.segment_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.penaltyGet = async function () {
    try {
        const response = await axios.get(apiUrl.loan.penalty_get)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.penaltyCreate = async (data) => {
    try {
        const response = await axios.post(apiUrl.loan.penalty_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.shareAccountGet = async function () {
    try {
        const response = await axios.get(apiUrl.loan.share_account_get)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.shareAccountCreate = async (data) => {
    try {
        const response = await axios.post(apiUrl.loan.share_account_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.shareAmountGet = async function () {
    try {
        const response = await axios.get(apiUrl.loan.share_amount_get)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.shareAmountCreate = async (data) => {
    try {
        const response = await axios.post(apiUrl.loan.share_amount_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.loanInterestGet = async function () {
    try {
        const response = await axios.get(apiUrl.loan.loan_interest_get)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.loanInterestCreate = async (data) => {
    try {
        const response = await axios.post(apiUrl.loan.loan_interest_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.savingInterestGet = async function () {
    try {
        const response = await axios.get(apiUrl.loan.saving_interest_get)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.savingInterestCreate = async (data) => {
    try {
        const response = await axios.post(apiUrl.loan.saving_interest_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.accountNameGet = async function () {
    try {
        const response = await axios.get(apiUrl.loan.accountNameGet)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.accountNameCreate = async (data) => {
    try {
        const response = await axios.post(apiUrl.loan.accountNamePost, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.businessSettingGet = async function () {
    try {
        const response = await axios.get(apiUrl.loan.businessSettingGet)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.businessSettingCreate = async (data) => {
    try {
        const response = await axios.post(apiUrl.loan.businessSettingCreate, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.careerGet = async function () {
    try {
        const response = await axios.get(apiUrl.loan.careerGet)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.careerCreate = async (data) => {
    try {
        const response = await axios.post(apiUrl.loan.careerPost, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.livingConditionGet = async function () {
    try {
        const response = await axios.get(apiUrl.loan.livingConditionGet)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.livingConditionCreate = async (data) => {
    try {
        const response = await axios.post(apiUrl.loan.livingConditionPost, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}