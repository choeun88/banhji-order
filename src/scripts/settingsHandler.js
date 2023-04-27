const axios = require('axios')
const apiUrl = require('../apiUrl.js')

// Get SubClassByClass
module.exports.byClassURL = function () {
  try {
    // const response = apiUrl.setting.class_subclass_get

    return apiUrl.setting.class_subclass_get
  } catch (error) {
    window.console.error(error)
  }
}

// Get One
module.exports.getClazz = async function (val) {
  try {
    const response = await axios.get(apiUrl.setting.class_get, {
      params: {
        type: val.type,
        clazzId: val.clazzId || '',
        classTypeId: val.classTypeId || '',
        classGroupId: val.classGroupId || '',
        active: val.active 
      }
    })

    return response
  } catch (error) {
    window.console.error(error)
  }
}

// save
module.exports.create = async (data) => {
  try {
    const response = await axios.post(apiUrl.setting.class_post, data)
    return response
  } catch (error) {
    window.console.error(error)
  }
}

// Get One
module.exports.getSeg = async function (id = '', status) {
  try {
    if (id !== '') {
      const response = await axios.get(apiUrl.setting.segment_get + '?id=' + id)
      return response
    } else {
      const response = await axios.get(apiUrl.setting.segment_get + '?status=' + status)
      return response
    }
  } catch (error) {
    window.console.error(error)
  }
}

module.exports.getSegByNatur = function (para) {
    try {
        const response = apiUrl.setting.segment_by_nature_get + "?nature="+ para.nature
        return response

    } catch (error) {
        window.console.error(error)
    }
}

// save
module.exports.createSeg = async (data) => {
  try {
    const response = await axios.post(apiUrl.setting.segment_post, data)
    return response
  } catch (error) {
    window.console.error(error)
  }
}
module.exports.getSegType = async function (status) {
  try {
    let chStatus =  status != undefined ? status : ''
    const response = await axios.get(apiUrl.setting.segment_type_get + `?status=${chStatus}`)
    return response
  } catch (error) {
    window.console.error(error)
  }
}
module.exports.createSegType = async (data) => {
  try {
    const response = await axios.post(apiUrl.setting.segment_type_post, data)
    return response
  } catch (error) {
    window.console.error(error)
  }
}
// save sub class
module.exports.createSubClass = async (data) => {
  try {
    const response = await axios.post(apiUrl.setting.subclass_post, data)
    return response
  } catch (error) {
    window.console.error(error)
  }
}

// Get prefix list
module.exports.getPrefixes = async function () {
  try {
    const response = await axios.get(apiUrl.setting.prefix_get)

    return response
  } catch (error) {
    window.console.error(error)
  }
}

// Get payment term
module.exports.getPaymentTerm = async function (strFilter = '') {
  try {
    const response = await axios.get(apiUrl.setting.payment_setting_get + strFilter)

    return response
  } catch (error) {
    window.console.error(error)
  }
}
// save payment term
module.exports.addPaymentTerm = async (data) => {
  try {
    const response = await axios.post(apiUrl.setting.payment_setting_post, data)
    return response
  } catch (error) {
    window.console.error(error)
  }
}

// Get other account
module.exports.getOtherAccount = async function (strFilter = '') {
  try {
    const response = await axios.get(apiUrl.setting.other_account_get + strFilter)
    return response
  } catch (error) {
    window.console.error(error)
  }
}

// Get form setting by formType
module.exports.getFormSetting = async function (strFilter = '') {
  try {
    const response = await axios.get(apiUrl.setting.form_get + strFilter)
    return response
  } catch (error) {
    window.console.error(error)
  }
}
module.exports.deleteFormSetting = async function (strFilter = '') {
  try {
    const response = await axios.get(apiUrl.setting.form_delete + strFilter)
    return response
  } catch (error) {
    window.console.error(error)
  }
}

// Post form setting
module.exports.formSettingCreate = async (data) => {
  try {
    const response = await axios.post(apiUrl.setting.form_post, data)
    return response
  } catch (error) {
    window.console.error(error)
  }
}

module.exports.deleteDimension = async function (data) {
  try {
    const response = await axios.post(apiUrl.setting.delete_dimension, data)
    return response
  } catch (error) {
    window.console.error(error)
  }
}
module.exports.nbcXRate = async function (data) {
  try {
    return await axios.post(apiUrl.setting.nbc_xrate, data)
  } catch (error) {
    window.console.error(error)
  }
}
module.exports.taxType = async function (data = '') {
  try {
    return await axios.get(apiUrl.tax_setting.tax_type_get + '/' + data)
  } catch (error) {
    window.console.error(error)
  }
}
module.exports.institutes = async function () {
  try {
    return await axios.get(apiUrl.setting.institutes)
  } catch (error) {
    window.console.error(error)
  }
}
// customer report
module.exports.addCtr = async function (data) {
  try {
    return await axios.post(apiUrl.setting.ctr_post, data)
  } catch (error) {
    window.console.error(error)
  }
}
module.exports.getCtr = async function () {
  try {
    return await axios.get(apiUrl.setting.ctr_get)
  } catch (error) {
    window.console.error(error)
  }
}
module.exports.deletCustomerReport = async (id) => {
  try {
    return await axios.delete(apiUrl.setting.ctr_delete + '?id=' + id)
  } catch (error) {
    window.console.error(error)
  }
}
