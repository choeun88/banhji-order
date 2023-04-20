/*
 * Last modified : 2/2/21, 4:20 PM in Project banhji-accounting-web-module
 * Copyright (c) 2021. Chandarith Chea under Company BanhJi Fintech Co., Ltd
 * Facebook Profile : https://www.facebook.com/profile.php?id=100011194806947
 * Github Profile : https://github.com/Darith-Mokpost
 * Instagram Profile : https://www.instagram.com/chandarith_chea
 */
const axios = require('axios')
const apiUrl = require('@/apiUrl')

module.exports.formContentPost = async (data) => {
  try {
    // store.default.commit(vueXKey, data)
    const response = await axios.post(apiUrl.pos.formContentPost, data)
    return response
  } catch (error) {
    window.console.error(error)
  }

}

module.exports.formContentGet = async () => {
  try {
    const response = await axios.get(apiUrl.pos.formContentGet)
    return response
  } catch (error) {
    window.console.error(error)
  }
}
module.exports.segmentPost = async (data) => {
  try {
    // store.default.commit(vueXKey, data)
    const response = await axios.post(apiUrl.pos.segmentPost, data)
    return response
  } catch (error) {
    window.console.error(error)
  }

}

module.exports.segmentGet = async () => {
  try {
    const response = await axios.get(apiUrl.pos.segmentGet)
    return response
  } catch (error) {
    window.console.error(error)
  }
}

module.exports.accountNamePost = async (data) => {
  try {
    // store.default.commit(vueXKey, data)
    const response = await axios.post(apiUrl.pos.accountNamePost, data)
    return response
  } catch (error) {
    window.console.error(error)
  }

}

module.exports.accountNameGet = async () => {
  try {
    const response = await axios.get(apiUrl.pos.accountNameGet)
    return response
  } catch (error) {
    window.console.error(error)
  }
}

module.exports.locationPost = async (data) => {
  try {
    // store.default.commit(vueXKey, data)
    const response = await axios.post(apiUrl.pos.locationPost, data)
    return response
  } catch (error) {
    window.console.error(error)
  }

}

module.exports.locationGet = async () => {
  try {
    const response = await axios.get(apiUrl.pos.locationGet)
    return response
  } catch (error) {
    window.console.error(error)
  }
}

module.exports.priceLevelPost = async (data) => {
  try {
    // store.default.commit(vueXKey, data)
    const response = await axios.post(apiUrl.pos.priceLevelPost, data)
    return response
  } catch (error) {
    window.console.error(error)
  }

}

module.exports.priceLevelGet = async () => {
  try {
    const response = await axios.get(apiUrl.pos.priceLevelGet)
    return response
  } catch (error) {
    window.console.error(error)
  }
}

module.exports.customerSettingPost = async (data) => {
  try {
    // store.default.commit(vueXKey, data)
    const response = await axios.post(apiUrl.pos.customerSettingPost, data)
    return response
  } catch (error) {
    window.console.error(error)
  }

}

module.exports.customerSettingGet = async () => {
  try {
    const response = await axios.get(apiUrl.pos.customerSettingGet)
    return response
  } catch (error) {
    window.console.error(error)
  }
}

module.exports.categorySettingPost = async (data) => {
  try {
    // store.default.commit(vueXKey, data)
    const response = await axios.post(apiUrl.pos.categorySettingPost, data)
    return response
  } catch (error) {
    window.console.error(error)
  }

}

module.exports.categorySettingGet = async () => {
  try {
    const response = await axios.get(apiUrl.pos.categorySettingGet)
    return response
  } catch (error) {
    window.console.error(error)
  }
}

module.exports.paymentOptionPost = async (data) => {
  try {
    // store.default.commit(vueXKey, data)
    const response = await axios.post(apiUrl.pos.paymentOptionPost, data)
    return response
  } catch (error) {
    window.console.error(error)
  }

}

module.exports.paymentOptionGet = async () => {
  try {
    const response = await axios.get(apiUrl.pos.paymentOptionGet)
    return response
  } catch (error) {
    window.console.error(error)
  }
}
module.exports.sessionSettingPost = async (data) => {
  try {
    // store.default.commit(vueXKey, data)
    const response = await axios.post(apiUrl.pos.sessionSettingPost, data)
    return response
  } catch (error) {
    window.console.error(error)
  }

}

module.exports.sessionSettingGet = async () => {
  try {
    const response = await axios.get(apiUrl.pos.sessionSettingGet)
    return response
  } catch (error) {
    window.console.error(error)
  }
}

module.exports.saleChannelSettingPost = async (data) => {
  try {
    // store.default.commit(vueXKey, data)
    const response = await axios.post(apiUrl.pos.saleChannelSettingPost, data)
    return response
  } catch (error) {
    window.console.error(error)
  }

}

module.exports.saleChannelSettingGet = async () => {
  try {
    const response = await axios.get(apiUrl.pos.saleChannelSettingGet)
    return response
  } catch (error) {
    window.console.error(error)
  }
}


