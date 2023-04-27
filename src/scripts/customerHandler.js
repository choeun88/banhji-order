const axios = require('axios')
const apiUrl = require('../apiUrl.js')
const unknown = require('../api/unknown')

// Gender
module.exports.gender = function () {
  try {
    const gender = unknown.gender
    // const response = await axios.get(unknown.gender)

    return gender
  } catch (error) {
    window.console.error(error)
  }
}
// Search
module.exports.search = function (strFilter = '') {
  try {
    const response = apiUrl.customer.customer_search + strFilter
    return response
  } catch (error) {
    window.console.error(error)
  }
}
module.exports.searchv1 = function () {
  try {
    const response = apiUrl.customer.customer_searchv1
    return response
  } catch (error) {
    window.console.error(error)
  }
}
// Center
module.exports.center = async function (customerTypeId, customerGroupId, search, strFilter = '') {
  try {
    let response = []
    if (search !== '' && search !== null && search !== 'null' && search !== undefined && search !== 'undefined') {
      response = await axios.get(apiUrl.customer.customer_center + '/' + customerTypeId + '/center/' + customerGroupId + '/' + search + strFilter)
      return response
    } else {
      response = await axios.get(apiUrl.customer.customer_center + '/' + customerTypeId + '/center/' + customerGroupId + strFilter)
      return response
    }
  } catch (error) {
    window.console.error(error)
  }
}
// Center
module.exports.centerv1 = async function (strFilter = '') {
  try {
    return await axios.post(apiUrl.customer.customer_centerv1, strFilter)
  } catch (error) {
    window.console.error(error)
  }
}
module.exports.centerURLV1 = function () {
  try {
    return apiUrl.customer.customer_centerv1
  } catch (error) {
    window.console.error(error)
  }
}
// List
module.exports.list = async function () {
  try {
    const response = await axios.get(apiUrl.customer.customer_get)

    return response
  } catch (error) {
    window.console.error(error)
  }
}

// GET ALL BY DAWINE
module.exports.getAll = async () => {
  try {
    const response = await axios.get(apiUrl.customer.customer_get)

    return response
  } catch (error) {
    window.console.error(error)
  }
}

// GET ALL DONORS BY DAWINE
module.exports.getAllDonors = async () => {
  try {
    const response = await axios.post(apiUrl.customer.customer_centerv1, {
      isDonor: true,
      ctid: '',
      grid: '',
      key: {},
      search: ''
    })
    return response
  } catch (error) {
    window.console.error(error)
  }
}

// Get One
module.exports.get = async function (id) {
  try {
    const response = await axios.get(apiUrl.customer.customer_getOne + id)

    return response
  } catch (error) {
    window.console.error(error)
  }
}

// save
module.exports.create = async (data) => {
  try {
    const response = await axios.post(apiUrl.customer.customer_post, data)
    return response
  } catch (error) {
    window.console.error(error)
  }
}

// upload
module.exports.upload = async (data) => {
  try {
    const response = await axios.post('https://ck3f4yltlf.execute-api.ap-southeast-1.amazonaws.com/dev/v1/uploads/file/upload', data)
    return response
  } catch (error) {
    window.console.error(error)
  }
}
// update
// module.exports.update = async (id, data) => {
//     try {
//         const response = await axios.put(apiUrl.customer.customer_group_put + id, data)
//
//         return response
//     } catch (error) {
//         window.console.error(error)
//     }
// }
module.exports.directory = async function (val) {
  try {
    // const response = await axios.get(apiUrl.customer.customer_directory, {
    //     params: {
    //         search: val.search,
    //         type: val.type
    //     }
    // })
    const response = await axios.post(apiUrl.customer.customer_directory, val)
    return response
  } catch (error) {
    window.console.error(error)
  }
}

// Todo: Payment term report
module.exports.paymentTermReport = async function (strFilter = '') {
  try {
    return await axios.get(apiUrl.customer.payment_term_report + '/' + strFilter)
  } catch (error) {
    window.console.error(error)
  }
}

module.exports.importCreate = async (data) => {
  try {
    const response = await axios.post(apiUrl.customer.importCreate, data)
    return response
  } catch (error) {
    window.console.error(error)
  }
}
module.exports.importVendorCreate = async (data) => {
  try {
    const response = await axios.post(apiUrl.customer.importVendorCreate, data)
    return response
  } catch (error) {
    window.console.error(error)
  }
}
module.exports.importEmpCreate = async (data) => {
  try {
    const response = await axios.post(apiUrl.customer.importEmpCreate, data)
    return response
  } catch (error) {
    window.console.error(error)
  }
}
module.exports.importServiceCreate = async (data) => {
  try {
    const response = await axios.post(apiUrl.customer.importServiceCreate, data)
    return response
  } catch (error) {
    window.console.error(error)
  }
}
module.exports.importSaleUnitCreate = async (data) => {
  try {
    const response = await axios.post(apiUrl.customer.importSaleUnitCreate, data)
    return response
  } catch (error) {
    window.console.error(error)
  }
}
// todo: check customer has transaction , can be delete
module.exports.hasTxn = async (strFilter) => {
  try {
    return await axios.get(apiUrl.customer.has_txn + strFilter)
  } catch (error) {
    window.console.error(error)
  }
}
// todo: update status customer to delete
module.exports.update = async (strFilter) => {
  try {
    return await axios.put(apiUrl.customer.customer_put, strFilter)
  } catch (error) {
    window.console.error(error)
  }
}

// todo: customer auto number generate
module.exports.lastNumber = async (strFilter) => {
  try {
    return await axios.post(apiUrl.customer.customer_lastNumber, strFilter)
  } catch (error) {
    window.console.error(error)
  }
}

module.exports.fundingCreate = async (data) => {
  try {
    const response = await axios.post(apiUrl.customer.funding_post, data)
    return response
  } catch (error) {
    window.console.error(error)
  }
}
module.exports.fundingGet = async function () {
  try {
    const response = await axios.get(apiUrl.customer.funding_get)
    return response.data
  } catch (error) {
    window.console.error(error)
  }
}

module.exports.customerDetail = async function (strFilter = '') {
  try {
    return await axios.get(apiUrl.customer.customer_linev1 + strFilter)
  } catch (error) {
    window.console.error(error)
  }
}